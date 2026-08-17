# DA Tech ajánlatkérő email küldés

A weboldal formja éles környezetben a `/api/request` Cloudflare Pages Function endpointot hívja.
Az endpoint elsődlegesen Cloudflare Email Service `send_email` bindinggal küldi ki az ajánlatkérést.
Resend csak opcionális tartalék lehet.

## Cloudflare Email Service

A `wrangler.jsonc` beállítja:

- `EMAIL` send_email binding
- cél cím: `digital.architecture.tech@gmail.com`
- küldő cím: `hello@da-technology.eu`

Cloudflare-ben az Email Routing / Destination Address legyen engedélyezve és validálva.

## Opcionális Resend fallback

Cloudflare Dashboard -> Workers & Pages -> `da-technology` -> Settings -> Environment variables:

- `RESEND_API_KEY`: Resend API kulcs.

Resend fallbackhez:

1. Hozz létre Resend fiókot.
2. Add hozzá és validáld a `da-technology.eu` domaint.
3. Állítsd be a Resend által kért DNS rekordokat Cloudflare DNS alatt.
4. Hozz létre API kulcsot.
5. Tedd be Cloudflare Pages változóként `RESEND_API_KEY` néven.

## Teszt

1. Nyisd meg: `https://da-technology.eu/contact`
2. Töltsd ki az űrlapot.
3. Küldés után a sikerüzenetnek kell megjelennie.
4. Az emailnek a `digital.architecture.tech@gmail.com` postaládába kell érkeznie.
