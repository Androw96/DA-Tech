const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS
  });
}

function clean(value, maxLength = 2000) {
  return String(value || "").trim().slice(0, maxLength);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildEmailHtml(payload) {
  const rows = [
    ["Projekt", payload.project],
    ["Név", payload.name || "-"],
    ["Email", payload.email],
    ["Nyelv", payload.language],
    ["Forrás", payload.source]
  ];

  const tableRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #dbe8ff;color:#314256;font-weight:700;">${label}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #dbe8ff;color:#071225;">${value}</td>
    </tr>
  `).join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#eef5ff;padding:24px;color:#071225;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #dbe8ff;border-radius:8px;overflow:hidden;">
        <div style="padding:22px 24px;background:linear-gradient(135deg,#071126,#1f63ff);color:#ffffff;">
          <p style="margin:0 0 6px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;">D.A.-Tech</p>
          <h1 style="margin:0;font-size:24px;line-height:1.2;">Új weboldal ajánlatkérés érkezett</h1>
        </div>
        <div style="padding:22px 24px;">
          <table style="width:100%;border-collapse:collapse;margin-bottom:22px;">${tableRows}</table>
          <h2 style="font-size:16px;margin:0 0 10px;">Üzenet</h2>
          <p style="white-space:pre-wrap;line-height:1.6;margin:0;color:#314256;">${payload.message || "-"}</p>
        </div>
      </div>
    </div>
  `;
}

function buildEmailText(payload) {
  return [
    "Új DA Tech ajánlatkérés",
    "",
    `Projekt: ${payload.project}`,
    `Név: ${payload.name || "-"}`,
    `Email: ${payload.email}`,
    "",
    "Üzenet:",
    payload.message || "-",
    "",
    `Forrás: ${payload.source}`,
    `Nyelv: ${payload.language}`,
    `Időpont: ${payload.createdAt}`
  ].join("\n");
}

async function sendViaFormSubmit(payload, subject, to) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      _subject: subject,
      _template: "table",
      _captcha: "false",
      _replyto: payload.email,
      name: payload.name || "-",
      email: payload.email,
      project: payload.project || "-",
      message: payload.message || "-",
      source: payload.source || "-",
      language: payload.language || "-",
      createdAt: payload.createdAt
    })
  });

  const text = await response.text();
  if (!response.ok) {
    console.error("FormSubmit fallback failed", text);
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return { success: true, raw: text };
  }
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: JSON_HEADERS });
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "invalid_json" }, 400);
  }

  const payload = {
    project: clean(body.project, 180),
    name: clean(body.name, 180),
    email: clean(body.email, 240),
    message: clean(body.message, 5000),
    source: clean(body.source, 500),
    language: clean(body.language, 12),
    createdAt: new Date().toISOString()
  };

  if (!isEmail(payload.email)) {
    return jsonResponse({ ok: false, error: "missing_email" }, 400);
  }

  const to = env.REQUEST_TO_EMAIL || "hello@da-technology.eu";
  const fromAddress = env.REQUEST_FROM_EMAIL_ADDRESS || "hello@da-technology.eu";
  const fromName = env.REQUEST_FROM_EMAIL_NAME || "D.A.-Tech";
  const from = env.REQUEST_FROM_EMAIL || `${fromName} <${fromAddress}>`;
  const subject = `Új DA Tech ajánlatkérés: ${payload.project || "weboldal"}`;
  const html = buildEmailHtml(payload);
  const text = buildEmailText(payload);

  if (env.EMAIL && typeof env.EMAIL.send === "function") {
    try {
      const result = await env.EMAIL.send({
        from: { email: fromAddress, name: fromName },
        to,
        replyTo: payload.email,
        subject,
        html,
        text
      });
      return jsonResponse({ ok: true, provider: "cloudflare_email", messageId: result.messageId });
    } catch (error) {
      console.error("Cloudflare email failed", {
        code: error?.code,
        message: error?.message
      });
      if (!env.RESEND_API_KEY) {
        return jsonResponse({
          ok: false,
          error: "cloudflare_email_send_failed",
          code: error?.code || "unknown"
        }, 502);
      }
    }
  }

  if (env.CLOUDFLARE_EMAIL_API_TOKEN) {
    const accountId = env.CLOUDFLARE_ACCOUNT_ID || "5350f9a59bf200e8095355843a0309bb";
    const cloudflareResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.CLOUDFLARE_EMAIL_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: payload.email,
        subject,
        html,
        text
      })
    });

    if (cloudflareResponse.ok) {
      const result = await cloudflareResponse.json();
      return jsonResponse({
        ok: true,
        provider: "cloudflare_email_rest",
        messageId: result.result?.id || result.result?.message_id || null
      });
    }

    const errorText = await cloudflareResponse.text();
    console.error("Cloudflare Email REST failed", errorText);
    if (!env.RESEND_API_KEY) {
      return jsonResponse({ ok: false, error: "cloudflare_email_rest_failed" }, 502);
    }
  }

  if (!env.RESEND_API_KEY) {
    const formSubmitEmail = env.FORMSUBMIT_EMAIL || to;
    const formSubmitResult = await sendViaFormSubmit(payload, subject, formSubmitEmail);
    if (formSubmitResult) {
      return jsonResponse({
        ok: true,
        provider: "formsubmit",
        activationMayBeRequired: true
      });
    }

    return jsonResponse({ ok: false, error: "missing_email_provider" }, 503);
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject,
      html,
      text
    })
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Resend email failed", errorText);
    return jsonResponse({ ok: false, error: "email_send_failed" }, 502);
  }

  return jsonResponse({ ok: true });
}
