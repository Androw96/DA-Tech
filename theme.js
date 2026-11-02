// Loaded in the head so the saved theme is applied before the first paint.
(() => {
  const root = document.documentElement;
  const storageKey = "daTechTheme";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const isTheme = (value) => value === "dark" || value === "light";
  let preference = null;
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (isTheme(stored)) preference = stored;
  } catch { /* Theme switching still works when browser storage is unavailable. */ }

  const labels = {
    hu: { label: "Sötét mód", dark: "Váltás világos módra", light: "Váltás sötét módra" },
    en: { label: "Dark mode", dark: "Switch to light mode", light: "Switch to dark mode" },
    de: { label: "Dunkler Modus", dark: "Zum hellen Modus wechseln", light: "Zum dunklen Modus wechseln" }
  };

  function updateButtons() {
    const text = labels[root.lang] || labels.hu;
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.setAttribute("aria-label", text.label);
      button.setAttribute("aria-checked", String(root.dataset.theme === "dark"));
      button.title = text[root.dataset.theme];
      button.disabled = false;
    });
  }

  function applyTheme() {
    const theme = preference || (systemTheme.matches ? "dark" : "light");
    root.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#050816" : "#f4f7fd";
    updateButtons();
  }

  applyTheme();
  systemTheme.addEventListener("change", () => {
    if (!preference) applyTheme();
  });
  window.addEventListener("storage", (event) => {
    if (event.key !== storageKey && event.key !== null) return;
    preference = isTheme(event.newValue) ? event.newValue : null;
    applyTheme();
  });
  document.addEventListener("DOMContentLoaded", () => {
    updateButtons();
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        preference = root.dataset.theme === "dark" ? "light" : "dark";
        try { window.localStorage.setItem(storageKey, preference); } catch { /* In-memory fallback. */ }
        applyTheme();
      });
    });
    new MutationObserver(updateButtons).observe(root, { attributes: true, attributeFilter: ["lang"] });
  });
})();
