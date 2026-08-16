# DA Tech ajánlatkérő email küldés

A weboldal formja éles környezetben a `/api/request` Cloudflare Pages Function endpointot hívja.
Az endpoint Resend API-val küldi ki az ajánlatkérést.

## Szükséges Cloudflare Pages változók

Cloudflare Dashboard -> Workers & Pages -> `da-technology` -> Settings -> Environment variables:

- `RESEND_API_KEY`: Resend API kulcs.
- `REQUEST_TO_EMAIL`: `digital.architecture.tech@gmail.com`
- `REQUEST_FROM_EMAIL`: például `D.A.-Tech <hello@da-technology.eu>`

Ha a `RESEND_API_KEY` nincs beállítva, a frontend automatikusan megnyitja a mailto email vázlatot.

## Resend beállítás

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
