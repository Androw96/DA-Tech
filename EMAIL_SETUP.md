# DA Tech ajánlatkérő email küldés

A weboldal formja éles környezetben a `/api/request` Cloudflare Pages Function endpointot hívja.
Az endpoint Cloudflare Email Service REST API-val vagy Resend API-val küldi ki az ajánlatkérést.

## Szükséges Cloudflare Pages változók

Cloudflare Dashboard -> Workers & Pages -> `da-technology` -> Settings -> Environment variables:

- `REQUEST_TO_EMAIL`: `digital.architecture.tech@gmail.com`
- `REQUEST_FROM_EMAIL`: például `D.A.-Tech <hello@da-technology.eu>`

Emellett legalább az egyik küldő kulcs kell:

- `CLOUDFLARE_EMAIL_API_TOKEN`: Cloudflare API token Email Sending jogosultsággal.
- `RESEND_API_KEY`: Resend API kulcs.

Ha egyik sincs beállítva, a frontend hibát jelez, mert a mailto vázlatos fallback ki lett véve.

## Cloudflare Email Service beállítás

1. Cloudflare Dashboard -> Compute -> Email Service -> Email Sending.
2. Onboardold a `da-technology.eu` domaint.
3. Add hozzá a Cloudflare által kért SPF/DKIM/DMARC rekordokat.
4. Hozz létre API tokent `Email Sending: Edit` jogosultsággal.
5. Tedd be Cloudflare Pages változóként `CLOUDFLARE_EMAIL_API_TOKEN` néven.

## Alternatív Resend beállítás

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
