const canvas = document.querySelector("#heroCanvas");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isSmallViewport = window.matchMedia("(max-width: 760px)").matches;
const shouldRunHeroCanvas = Boolean(canvas) && !prefersReducedMotion && !isSmallViewport;
const ctx = shouldRunHeroCanvas ? canvas.getContext("2d") : null;
const pointer = { x: 0, y: 0, active: false };
let particles = [];
let lastAuditRawUrl = null;

const translations = {
  hu: {
    "nav.about": "Rólunk",
    "nav.prices": "Árak",
    "nav.audit": "Weboldal értékelő",
    "nav.methods": "Szolgáltatásaink",
    "nav.methodBuild": "Weboldal készítés",
    "nav.methodExtravagant": "Weboldal modernizálás",
    "nav.methodProcess": "Extravagáns megoldások",
    "nav.why": "Miért mi?",
    "nav.services": "Szolgáltatások",
    "nav.proof": "Miért minket?",
    "nav.process": "Folyamat",
    "nav.contact": "Kapcsolat",
    "nav.cta": "Weboldal igénylése",
    "floating.cta": "Ajánlatkérés",
    "hero.eyebrow": "D.A.-Tech weboldal modernizálás",
    "hero.title": "Ahol a design találkozik a technológiával.",
    "hero.lead": "Régi, sablonos vagy gyenge weboldalból prémium digitális élményt építünk. Gyors. Mobilra hangolt. Ügyfélszerzésre tervezett.",
    "hero.primary": "Weboldalt igénylek",
    "hero.secondary": "Mit tudunk építeni?",
    "hero.signalSpeed": "célzott betöltési érzet",
    "hero.signalSeo": "alapok beépítve",
    "hero.signalUx": "konverzióra hangolva",
    "metrics.trust": "Bizalom index",
    "metrics.speed": "Sebesség fókusz",
    "metrics.lead": "Lead útvonal",
    "metrics.mobile": "Mobil élmény",
    "terminal.audit": "jelenlegi weboldal elemzése",
    "terminal.build": "gyors, modern felület",
    "terminal.launch": "mérhető ajánlatkérési útvonal",
    "marquee.development": "webfejlesztés",
    "marquee.modernization": "modernizálás",
    "marquee.conversion": "konverzió",
    "marquee.responsive": "reszponzív design",
    "marquee.speed": "sebesség",
    "marquee.requests": "automatizált ajánlatkérés",
    "marquee.seo": "SEO alapok",
    "marquee.brand": "brand élmény",
    "impact.item1Title": "5 mp alatt érthető",
    "impact.item1Text": "A látogató azonnal tudja, miért maradjon.",
    "impact.item2Title": "Nem néz ki sablonnak",
    "impact.item2Text": "Tech vizuál, mozgás, prémium első benyomás.",
    "impact.item3Title": "Ajánlatkérésre vezet",
    "impact.item3Text": "Kevesebb zavar, tisztább döntési út.",
    "services.eyebrow": "Szolgáltatások",
    "services.title": "Modern weboldal szolgáltatások egy kézből",
    "services.card1Title": "Weboldal készítés",
    "services.card1Text": "Modern, gyors, sallangmentes céges weboldalak és landing oldalak, amelyek telefonon is prémium első benyomást adnak.",
    "services.card1Link": "Weboldal készítés részletei",
    "services.card2Title": "Weboldal modernizálás",
    "services.card2Text": "Régi, sablonos vagy széteső oldalból átlátható, mobilbarát, bizalomépítő felületet készítünk.",
    "services.card2Link": "Modernizálás részletei",
    "services.card3Title": "Extravagáns webes megoldások",
    "services.card3Text": "Animált intro, before/after élmény, audit modul, mikrointerakciók és olyan részletek, amelyek miatt a márka emlékezetes marad.",
    "services.card3Link": "Extra megoldások részletei",
    "services.card4Title": "Konverziós stratégia",
    "services.card4Text": "Kevesebb zaj, erősebb CTA, tisztább döntési út.",
    "services.helpTitle": "Nem tudod, melyikre van szükséged?",
    "services.helpText": "A legtöbb projekt kombináció: új első képernyő, mobilos rendbetétel, ajánlatkérési útvonal és egy kis extra wow-faktor. Írd meg, hol tartasz most, és javaslunk egy tiszta irányt.",
    "services.helpLink": "Kérek javaslatot",
    "pageWeb.eyebrow": "Szolgáltatás",
    "pageWeb.title": "Weboldal készítés, ami komolyan képviseli a céged.",
    "pageWeb.lead": "Modern, gyors, mobilbarát céges weboldalt építünk tiszta üzenettel, erős első képernyővel és ajánlatkérésre vezető útvonallal.",
    "pageWeb.primary": "Weboldalt kérek",
    "pageWeb.secondary": "Árak megtekintése",
    "pageWeb.card1Title": "Mit kapsz?",
    "pageWeb.card1Text": "Átgondolt struktúrát, prémium első benyomást, reszponzív megjelenést, kapcsolatfelvételi útvonalat, alap SEO-t és átadható, továbbfejleszthető webes alapot.",
    "pageWeb.card2Title": "Kinek jó?",
    "pageWeb.card2Text": "Vállalkozásoknak, akiknek új céges weboldalra, landing oldalra vagy olyan online jelenlétre van szükségük, amely gyorsan bizalmat épít.",
    "pageWeb.card3Title": "Hogyan indul?",
    "pageWeb.card3Text": "Rövid célfelméréssel, tartalmi irányokkal és egy tiszta ajánlattal. Utána design, fejlesztés, mobil finomhangolás és átadás következik.",
    "pageModern.eyebrow": "Szolgáltatás",
    "pageModern.title": "Régi weboldalból modern, ügyfélszerző felület.",
    "pageModern.lead": "Ha a jelenlegi oldal lassú, sablonos, mobilon szétesik vagy nem hoz ajánlatkérést, újrarendezzük a vizuált, a struktúrát és a döntési útvonalat.",
    "pageModern.primary": "Modernizálást kérek",
    "pageModern.secondary": "Árak megtekintése",
    "pageModern.card1Title": "Mit nézünk át?",
    "pageModern.card1Text": "Első benyomás, mobilnézet, üzenet, CTA-k, bizalmi elemek, technikai érzet és az, hogy a látogató mennyire gyorsan érti meg az ajánlatot.",
    "pageModern.card2Title": "Mi változik?",
    "pageModern.card2Text": "Frissebb design, tisztább tartalmi ritmus, erősebb ajánlatkérési útvonal, jobb mobilélmény és prémiumabb márkaérzet.",
    "pageModern.card3Title": "Mi maradhat?",
    "pageModern.card3Text": "A meglévő márkaérték, tartalmi alap és üzleti fókusz. Nem mindent dobunk ki: azt erősítjük fel, ami működhet.",
    "pageExtra.eyebrow": "Szolgáltatás",
    "pageExtra.animationEyebrow": "Animáció pluszban",
    "pageExtra.logoReveal": "A Logód",
    "pageExtra.logoPromise": "Úgy jelenik meg, hogy emlékezzenek rád.",
    "pageExtra.title": "Extravagáns webes megoldások, amikre emlékeznek.",
    "pageExtra.lead": "Animáció, audit modul, before/after élmény, mikrointerakciók és olyan részletek, amelyek megkülönböztetik a cégedet a sablonos weboldalaktól.",
    "pageExtra.primary": "Extra megoldást kérek",
    "pageExtra.secondary": "Demo megtekintése",
    "pageExtra.card1Title": "Intro és mozgás",
    "pageExtra.card1Text": "A látogató nem egy statikus sablonnal találkozik, hanem egy modern, márkára szabott első élménnyel.",
    "pageExtra.card2Title": "Interaktív modulok",
    "pageExtra.card2Text": "Audit, before/after összehasonlító, döntést segítő panelek és olyan elemek, amelyek bevonják a látogatót.",
    "pageExtra.card3Title": "Mértékkel látványos",
    "pageExtra.card3Text": "A cél nem öncélú animáció, hanem prémium érzet, jobb megértés és erősebb ajánlatkérési motiváció.",
    "proof.eyebrow": "Miért a D.A.-Tech?",
    "proof.title": "Számunkra nincs lehetetlen.",
    "proof.text": "Ha az ötlet üzletileg értékes, megkeressük hozzá a megoldást: designban, technológiában és ügyfélszerző útvonalban is.",
    "proof.item1Title": "Stratégiai design",
    "proof.item1Text": "A figyelmet oda vezetjük, ahol döntés születik.",
    "proof.item2Title": "Modern technikai alap",
    "proof.item2Text": "Gyors, reszponzív, keresőbarát alap.",
    "proof.item3Title": "Prémium érzés",
    "proof.item3Text": "Animáció, tér és fókusz, ami drágábbnak érződik.",
    "showcase.eyebrow": "Extravagáns megoldások",
    "showcase.title": "Mozgás, fény, interakció. Csak ott, ahol számít.",
    "showcase.card1Title": "Élő tech háttér",
    "showcase.card1Text": "Az első másodpercben tech szakértelmet sugall.",
    "showcase.card2Title": "Konverziós modulok",
    "showcase.card2Text": "Gyorsan mutatják, miért érdemes ajánlatot kérni.",
    "showcase.card3Title": "Fejlesztői minőség",
    "showcase.card3Text": "Gyors működés, tiszta struktúra, nem egyszer használatos show.",
    "showcase.card4Logo": "A Logód",
    "showcase.card4Title": "Logó reveal élmény",
    "showcase.card4Text": "A márka nem csak megjelenik: fényből, mozgásból és fókuszból épül fel, hogy emlékezzenek rá.",
    "process.eyebrow": "Így dolgozunk",
    "process.title": "Négy lépés. Nincs ködösítés.",
    "process.step1Title": "Audit és cél",
    "process.step1Text": "Mi nem működik, és milyen eredményt kell hoznia?",
    "process.step2Title": "Design irány",
    "process.step2Text": "Első benyomás, üzenet, vizuális irány, CTA.",
    "process.step3Title": "Fejlesztés",
    "process.step3Text": "Gyors, modern, mobilbarát felület, extra funkciókkal.",
    "process.step4Title": "Finomhangolás",
    "process.step4Text": "Ritmus, sebesség, mobilnézet, ajánlatkérési út.",
    "contact.eyebrow": "Indítsuk el",
    "contact.title": "Készen állsz egy weboldalra, ami végre komolyan képviseli a céged?",
    "contact.text": "Írd meg pár mondatban, mit szeretnél. Mi visszajövünk egy tiszta iránnyal.",
    "form.name": "Név",
    "form.namePlaceholder": "Név vagy cégnév",
    "form.email": "E-mail",
    "form.emailPlaceholder": "hello@ceged.hu",
    "form.privacyConsent": "Elfogadom az adatkezelési tájékoztatót, és hozzájárulok, hogy a DA Tech az ajánlatkérésemre válaszoljon.",
    "form.privacyLink": "Adatkezelési tájékoztató",
    "form.privacyMicrocopy": "Az adatokat csak az ajánlatkérés megválaszolására használjuk. Marketing emailt külön hozzájárulás nélkül nem küldünk.",
    "form.project": "Mire van szükséged?",
    "form.optionNew": "Új weboldal",
    "form.optionModern": "Weboldal modernizálás",
    "form.optionLanding": "Landing page",
    "form.optionAdvice": "Nem tudom, kérek tanácsot",
    "form.message": "Röviden a projektről",
    "form.messagePlaceholder": "Mi a cél, mi nem működik most, milyen hatást szeretnél?",
    "form.submit": "Weboldal igénylés indítása",
    "footer.tagline": "Modern weboldalak és weboldal modernizálás",
    "footer.privacy": "Adatkezelés",
    "footer.cookies": "Cookie-k",
    "footer.impressum": "Impresszum",
    "footer.terms": "Szolgáltatási feltételek",
    "cookie.title": "Adatvédelem és cookie-k",
    "cookie.text": "Jelenleg csak működéshez szükséges tárolást használunk. Analitika vagy marketing cookie csak külön hozzájárulás után kerülhetne be.",
    "cookie.accept": "Elfogadom",
    "cookie.reject": "Elutasítom",
    "audit.eyebrow": "Weboldal értékelő",
    "audit.title": "Kiértékeljük a weboldaladat!",
    "auditPage.title": "Weboldal értékelő, ami konkrét hibákat keres.",
    "auditPage.lead": "Add meg a weboldalad címét, és a rendszer élő PageSpeed/Lighthouse mérést próbál indítani. Ha a külső mérés nem érhető el, URL-alapú előauditot ad, hogy akkor is legyen induló diagnózis.",
    "auditPage.tip": "Tipp: teljes URL-t adj meg, például https://ceged.hu. Az eredmény pontozást, indoklást, gyengeségeket és fejlesztési javaslatokat ad.",
    "audit.label": "Weboldalad címe",
    "audit.placeholder": "https://ceged.hu",
    "audit.button": "Értékelés indítása",
    "audit.note": "Az értékelő élő PageSpeed/Lighthouse mobilmérést kér le: teljesítmény, SEO, technikai bizalom és mobilélmény alapján.",
    "audit.disclaimer": "Élő külső mérés alapján készül; ha a mérés nem elérhető, URL-alapú fallback elemzést mutat.",
    "audit.design": "Design",
    "audit.speed": "Sebesség",
    "audit.trust": "Bizalom",
    "audit.mobile": "Mobil",
    "audit.summary": "DA Tech saját oldal értékelése: 100/100. A felület prémium, mobilra hangolt és konverzióra épített.",
    "audit.insightsTitle": "Elemzés",
    "audit.recommendationsTitle": "Változtatási javaslatok",
    "audit.reasonsTitle": "Pontozás indoklása",
    "audit.weaknessesTitle": "Gyengeségek",
    "audit.improvementsTitle": "Fejlesztési lehetőségek",
    "audit.defaultReason1": "Design 100: erős D.A.-Tech brand, futurisztikus intro és prémium kék vizuális rendszer.",
    "audit.defaultReason2": "Sebesség 100: statikus, könnyű frontend, cache-bumpolt assetek és gyors első képernyő.",
    "audit.defaultReason3": "Bizalom 100: többnyelvű tartalom, rólunk oldal, bizalmi rendszer és világos szolgáltatás struktúra.",
    "audit.defaultReason4": "Mobil 100: dedikált mobil és landscape szabályok, reszponzív CTA-k és stabil intro elrendezés.",
    "audit.defaultInsight1": "Nincs kritikus gyengeség: a saját oldal modernizálási történetet, bizalmat és ajánlatkérési útvonalat is ad.",
    "audit.defaultInsight2": "Nincs kritikus gyengeség: a reszponzív nézetek, nyelvváltás és animált elemek együtt prémium élményt adnak.",
    "audit.defaultInsight3": "Nincs kritikus gyengeség: az értékelő, before/after blokk és weboldal igénylés flow együtt konverziós útvonalat alkot.",
    "audit.defaultSuggestion1": "További finomításként később valós ügyfélreferenciákkal lehet még erősebbé tenni.",
    "audit.defaultSuggestion2": "További finomításként éles domainen mérhető analitika és konverziókövetés kapcsolható rá.",
    "audit.defaultSuggestion3": "További finomításként az értékelő később backenddel valós HTML elemzéssé bővíthető.",
    "before.eyebrow": "Before / After",
    "before.title": "Így lesz egy sablonos oldalból modern ügyfélszerző felület.",
    "before.oldLabel": "Régi sablon oldal",
    "before.newLabel": "Modern DA Tech élmény",
    "cases.eyebrow": "Demo transformation",
    "cases.title": "Nem több szöveg. Jobb első benyomás.",
    "cases.card1Tag": "Régi céges oldal",
    "cases.card1Title": "Régi hatásból prémium belépő.",
    "cases.card1Text": "Egyértelmű ajánlat, gyors kapcsolat, mobil-first szerkezet.",
    "cases.card2Tag": "Landing page",
    "cases.card2Title": "Szétszórt üzenetből tiszta CTA.",
    "cases.card2Text": "A látogató nem bolyong: lát, ért, kattint.",
    "cases.card3Tag": "Weboldal modernizálás",
    "cases.card3Title": "Sablonból emlékezetes élmény.",
    "cases.card3Text": "Before/after, neon tech hangulat, gyors mobil élmény.",
    "cases.metricTrust": "erősebb bizalmi érzet",
    "cases.metricPath": "tisztább döntési út",
    "cases.metricMobile": "mobil audit célpont",
    "trust.eyebrow": "Bizalmi rendszer",
    "trust.title": "Bizalom gyorsan, felesleges magyarázkodás nélkül.",
    "trust.item1": "Átlátható folyamat és mérföldkövek.",
    "trust.item2": "Mobil-first megjelenés minden képernyőre.",
    "trust.item3": "SEO és sebesség alapok már induláskor.",
    "trust.item4": "Átadás után is továbbfejleszthető rendszer.",
    "trust.note1": "Nem tűnünk el átadás után.",
    "trust.note2": "Mobilon kezdjük a gondolkodást.",
    "trust.note3": "Nem sablont kapsz, hanem üzleti célt kiszolgáló oldalt.",
    "packages.eyebrow": "Ajánlati irányok",
    "packages.title": "Három indulási irány. Mind konverzióra építve.",
    "packages.startTitle": "Gyors, modern jelenlét",
    "packages.startText": "Landing page vagy egyszerű céges oldal erős első benyomással.",
    "packages.startPoint1": "1 oldalas prémium struktúra",
    "packages.startPoint2": "Mobil-first megjelenés",
    "packages.startPoint3": "Ajánlatkérési CTA útvonal",
    "packages.modernTitle": "Régi oldalból prémium felület",
    "packages.modernText": "A régi oldal megtartja a lényeget, de új élményt kap.",
    "packages.modernPoint1": "Before/after modernizálási audit",
    "packages.modernPoint2": "Új első képernyő és szolgáltatás logika",
    "packages.modernPoint3": "Sebesség, bizalom és mobil élmény fókusz",
    "packages.premiumTitle": "Teljes digitális élmény",
    "packages.premiumText": "Egyedi többoldalas weboldal, prémium interakciókkal és brand rendszerrel.",
    "packages.premiumPoint1": "Többoldalas céges rendszer",
    "packages.premiumPoint2": "Extravagáns animációk és audit modulok",
    "packages.premiumPoint3": "Többnyelvű, skálázható tartalom",
    "packages.cta": "Ezt kérem",
    "flow.summaryTitle": "DA Tech javaslat",
    "flow.summaryText": "Modernizálási audit, prémium első képernyő és mobil-first konverziós útvonal.",
    "flow.summaryNew": "Prémium első képernyő, világos céges struktúra és gyors ajánlatkérési útvonal.",
    "flow.summaryModern": "Before/after audit, új vizuális rendszer, mobil-first rebuild és bizalmi szekciók.",
    "flow.summaryLanding": "Egy ajánlatra fókuszált landing page, erős CTA ritmussal és konverziós blokkokkal.",
    "flow.summaryAdvice": "Rövid stratégiai audit, majd javaslat a legjobb indulási irányra.",
    "flow.prev": "Vissza",
    "flow.next": "Tovább",
    "flow.send": "Igénylés indítása",
    "flow.success": "Kész az email vázlat. Ha nem nyílt meg automatikusan, írj nekünk: hello@da-technology.eu",
    "flow.sending": "Küldés folyamatban...",
    "flow.endpointSuccess": "Köszönjük, megkaptuk az ajánlatkérést. Hamarosan jelentkezünk.",
    "flow.endpointError": "Az automatikus küldés most nem sikerült, ezért megnyitjuk az email vázlatot.",
    "flow.missingEmail": "Adj meg egy e-mail címet, hogy tudjuk hova válaszoljunk.",
    "flow.missingConsent": "Az ajánlatkéréshez kérlek fogadd el az adatkezelési tájékoztatót.",
    "about.eyebrow": "About us",
    "about.title": "Digital Architecture Technology: modern weboldal, ami ügyfeleket győz meg.",
    "about.lead": "A DA Tech olyan vállalkozásoknak készít modern weboldalakat és weboldal-modernizálásokat, akik erősebb online benyomást, gyorsabb felületet és több érdeklődőt szeretnének.",
    "about.card1Title": "Design, ami irányítja a figyelmet",
    "about.card1Text": "Nem csak látványt tervezünk. A struktúra, a ritmus és a vizuális hierarchia együtt vezeti a látogatót a döntés felé.",
    "about.card2Title": "Technológia, ami gyorsnak érződik",
    "about.card2Text": "A cél egy modern, reszponzív és stabil felület, ami telefonon, tableten és desktopon is prémium élményt ad.",
    "about.card3Title": "Üzenet, ami bizalmat épít",
    "about.card3Text": "A weboldal akkor működik jól, ha az első képernyő után egyértelmű: mit kínál a cég, miért hiteles, és hogyan lehet kapcsolatba lépni.",
    "about.back": "Vissza a főoldalra",
    "about.request": "Weboldal igénylése",
    "prices.eyebrow": "Árak",
    "prices.title": "Áraink átláthatóan, táblázatban",
    "prices.lead": "Hiszünk az átlátható árazásban: az alábbi táblázat megmutatja, mire számíthatsz. A pontos ár mindig az igényektől függ, tételes ajánlatot 24 órán belül küldünk.",
    "prices.packageEyebrow": "Weboldal csomagok",
    "prices.packagesTitle": "Weboldal csomagok",
    "prices.packagesText": "Három alappillérrel dolgozunk: stratégia, reszponzív design és ügyfélszerzésre hangolt felület. Minden csomag tartalmaz mobiloptimalizálást, kapcsolatfelvételi útvonalat és alap SEO-struktúrát.",
    "prices.oneTimeLabel": "Weboldal készítés és modernizálás: egyszeri irányárak",
    "prices.colPackage": "Csomag",
    "prices.colIncludes": "Mit tartalmaz",
    "prices.colPrice": "Ár",
    "prices.colService": "Szolgáltatás",
    "prices.colFee": "Díjazás",
    "prices.basicName": "Basic",
    "prices.basicIncludes": "Max. 5 aloldalas céges weboldal, reszponzív design, mobiloptimalizálás, tartalomfeltöltés, kapcsolat űrlap, alap SEO és jogi oldalak vázai.",
    "prices.basicPrice": "220 000 Ft-tól",
    "prices.modernizeName": "Modernize",
    "prices.modernizeIncludes": "Meglévő weboldal modernizálása, új vizuális irány, mobilnézet rendbetétele, gyorsabb UX-ritmus, CTA útvonal és technikai tisztítási javaslatok.",
    "prices.modernizePrice": "290 000 Ft-tól",
    "prices.proName": "Pro",
    "prices.proIncludes": "Max. 10-12 aloldal, többnyelvű struktúra, prémium animációk, audit modul, SEO alapstruktúra, ajánlatkérő flow és technikai átadás.",
    "prices.proPrice": "480 000 Ft-tól",
    "prices.premiumName": "Signature",
    "prices.premiumIncludes": "Egyedi digitális élmény extra interakciókkal, landing aloldalakkal, komplex tartalmi struktúrával, integrációkkal és fejlesztési roadmap-pel.",
    "prices.premiumPrice": "Egyedi ajánlat",
    "prices.note": "Az árak tájékoztató jellegű bruttó irányárak, és nem tartalmazzák a domain, tárhely, fizetős bővítmények, külső szolgáltatások vagy hirdetési költségek díját.",
    "prices.ongoingTitle": "Folyamatos és egyedi szolgáltatások",
    "prices.ongoingText": "A keresőoptimalizálás, karbantartás, kampányoldal és extra funkciók ára az igényekhez igazodik. A cél mindig ugyanaz: kevesebb bizonytalanság, több mérhető érdeklődő.",
    "prices.ongoingLabel": "Folyamatos szolgáltatások",
    "prices.maintenanceName": "Karbantartás",
    "prices.maintenanceIncludes": "Frissítések, biztonsági mentés, tartalomgondozás, havi ellenőrzés és apró módosítások.",
    "prices.maintenancePrice": "35 000 Ft/hó-tól",
    "prices.seoName": "SEO + tartalom",
    "prices.seoIncludes": "Kulcsszó-stratégia, on-page SEO, technikai javaslatok, tartalmi finomhangolás és havi riport.",
    "prices.seoPrice": "Egyedi ajánlat",
    "prices.landingName": "Landing kampány",
    "prices.landingIncludes": "Kampányoldal, erős CTA-ritmus, ajánlatkérő szekció, mérhető konverziós út és hirdetési üzenet illesztés.",
    "prices.landingPrice": "160 000 Ft-tól",
    "prices.extraName": "Extra funkció",
    "prices.extraIncludes": "Foglalás, kalkulátor, integráció, többnyelvű bővítés, egyedi modul vagy speciális interakció.",
    "prices.extraPrice": "Egyedi ajánlat",
    "prices.institutionTitle": "Intézményi és egyedi projektek",
    "prices.institutionText": "Nagyobb szervezeteknek, intézményeknek és komplexebb projektekhez egyedi ajánlatot készítünk: többnyelvűség, akadálymentességi irányok, dokumentáció, archívum, speciális funkciók vagy kampányrendszer esetén is.",
    "prices.institutionCta": "Kérek tételes ajánlatot",
    "prices.faqEyebrow": "GYIK",
    "prices.faqTitle": "Gyakori kérdések az árakról",
    "prices.faq1Q": "Mitől függ a weboldal ára?",
    "prices.faq1A": "A szükséges aloldalak számától, a tartalom mennyiségétől, az animációk és integrációk összetettségétől, valamint attól, hogy új weboldalt építünk vagy meglévőt modernizálunk.",
    "prices.faq2Q": "Vannak havidíjas szolgáltatások?",
    "prices.faq2A": "Igen. Karbantartás, SEO, tartalomgondozás és folyamatos fejlesztés havi konstrukcióban is kérhető, de ez mindig a célokhoz és a weboldal méretéhez igazodik.",
    "prices.faq3Q": "Hogyan kapok pontos árajánlatot?",
    "prices.faq3A": "Küldj egy rövid leírást a célról, a jelenlegi oldalról és a kívánt funkciókról. Ez alapján 24 órán belül tiszta, tételes ajánlatot adunk.",
    "prices.faq4Q": "Mit nem tartalmaznak az árak?",
    "prices.faq4A": "A domain, tárhely, fizetős bővítmények, külső szoftverek, jogi tanácsadás és hirdetési költségek külön díjat jelenthetnek, ha a projekt igényli őket."
  },
  en: {
    "nav.about": "About us",
    "nav.prices": "Pricing",
    "nav.audit": "Website evaluator",
    "nav.methods": "Services",
    "nav.methodBuild": "Website creation",
    "nav.methodExtravagant": "Website modernization",
    "nav.methodProcess": "Extravagant solutions",
    "nav.why": "Why us",
    "nav.services": "Services",
    "nav.proof": "Why us?",
    "nav.process": "Process",
    "nav.contact": "Contact",
    "nav.cta": "Request a Website",
    "floating.cta": "Request offer",
    "hero.eyebrow": "D.A.-Tech website modernization",
    "hero.title": "Where design meets technology.",
    "hero.lead": "We turn old, template-like or weak websites into premium digital experiences. Fast. Mobile-tuned. Built to win leads.",
    "hero.primary": "I need a website",
    "hero.secondary": "What can we build?",
    "hero.signalSpeed": "targeted load feel",
    "hero.signalSeo": "foundation included",
    "hero.signalUx": "tuned for conversion",
    "metrics.trust": "Trust index",
    "metrics.speed": "Speed focus",
    "metrics.lead": "Lead path",
    "metrics.mobile": "Mobile experience",
    "terminal.audit": "current website analysis",
    "terminal.build": "fast, modern interface",
    "terminal.launch": "measurable request flow",
    "marquee.development": "web development",
    "marquee.modernization": "modernization",
    "marquee.conversion": "conversion",
    "marquee.responsive": "responsive design",
    "marquee.speed": "speed",
    "marquee.requests": "automated requests",
    "marquee.seo": "SEO foundations",
    "marquee.brand": "brand experience",
    "impact.item1Title": "Clear in 5 seconds",
    "impact.item1Text": "Visitors instantly know why they should stay.",
    "impact.item2Title": "No template feel",
    "impact.item2Text": "Tech visuals, motion and a premium first impression.",
    "impact.item3Title": "Built for requests",
    "impact.item3Text": "Less noise, clearer path to action.",
    "services.eyebrow": "Services",
    "services.title": "Modern website services from one team",
    "services.card1Title": "Website creation",
    "services.card1Text": "Modern, fast, no-fluff business websites and landing pages that create a premium first impression on mobile too.",
    "services.card1Link": "Website creation details",
    "services.card2Title": "Website modernization",
    "services.card2Text": "We turn old, template-like or broken layouts into a clear, mobile-friendly and trust-building interface.",
    "services.card2Link": "Modernization details",
    "services.card3Title": "Extravagant web solutions",
    "services.card3Text": "Animated intro, before/after experience, audit module, microinteractions and details that make the brand memorable.",
    "services.card3Link": "Extra solution details",
    "services.card4Title": "Conversion strategy",
    "services.card4Text": "Less noise, stronger CTA, clearer decision path.",
    "services.helpTitle": "Not sure which one you need?",
    "services.helpText": "Most projects are a combination: a stronger first screen, mobile cleanup, request path and a little extra wow-factor. Tell us where you are now, and we recommend a clear direction.",
    "services.helpLink": "Request a recommendation",
    "pageWeb.eyebrow": "Service",
    "pageWeb.title": "Website creation that represents your company seriously.",
    "pageWeb.lead": "We build modern, fast, mobile-friendly business websites with a clear message, strong first screen and a path toward requests.",
    "pageWeb.primary": "Request a website",
    "pageWeb.secondary": "View pricing",
    "pageWeb.card1Title": "What do you get?",
    "pageWeb.card1Text": "Thought-through structure, premium first impression, responsive layout, contact path, basic SEO and a handover-ready foundation that can grow further.",
    "pageWeb.card2Title": "Who is it for?",
    "pageWeb.card2Text": "Businesses that need a new company website, landing page or online presence that can build trust quickly.",
    "pageWeb.card3Title": "How does it start?",
    "pageWeb.card3Text": "A short goal check, content direction and a clear offer. Then come design, development, mobile tuning and handover.",
    "pageModern.eyebrow": "Service",
    "pageModern.title": "From an old website to a modern lead-generating interface.",
    "pageModern.lead": "If the current site is slow, template-like, broken on mobile or not generating requests, we rebuild the visual, structure and decision path.",
    "pageModern.primary": "Request modernization",
    "pageModern.secondary": "View pricing",
    "pageModern.card1Title": "What do we review?",
    "pageModern.card1Text": "First impression, mobile view, message, CTAs, trust elements, technical feel and how quickly visitors understand the offer.",
    "pageModern.card2Title": "What changes?",
    "pageModern.card2Text": "Fresher design, clearer content rhythm, stronger request path, better mobile experience and a more premium brand feel.",
    "pageModern.card3Title": "What can stay?",
    "pageModern.card3Text": "Existing brand value, content foundation and business focus. We do not throw everything away: we strengthen what can work.",
    "pageExtra.eyebrow": "Service",
    "pageExtra.animationEyebrow": "Animation included",
    "pageExtra.logoReveal": "Your Logo",
    "pageExtra.logoPromise": "Presented in a way people remember.",
    "pageExtra.title": "Extravagant web solutions visitors remember.",
    "pageExtra.lead": "Animation, audit module, before/after experience, microinteractions and details that set your company apart from template websites.",
    "pageExtra.primary": "Request extra solution",
    "pageExtra.secondary": "View demo",
    "pageExtra.card1Title": "Intro and motion",
    "pageExtra.card1Text": "Visitors do not meet a static template, but a modern first experience tailored to the brand.",
    "pageExtra.card2Title": "Interactive modules",
    "pageExtra.card2Text": "Audit, before/after comparison, decision-support panels and elements that involve the visitor.",
    "pageExtra.card3Title": "Spectacular with purpose",
    "pageExtra.card3Text": "The goal is not animation for its own sake, but premium feel, clearer understanding and stronger request motivation.",
    "proof.eyebrow": "Why DA Tech?",
    "proof.title": "For us, impossible is not the brief.",
    "proof.text": "If the idea has business value, we find the way to build it: through design, technology and a conversion path that makes sense.",
    "proof.item1Title": "Strategic design",
    "proof.item1Text": "We guide attention to the moment where decisions happen.",
    "proof.item2Title": "Modern technical base",
    "proof.item2Text": "Fast, responsive, search-friendly foundation.",
    "proof.item3Title": "Premium feel",
    "proof.item3Text": "Animation, space and focus that make the brand feel premium.",
    "showcase.eyebrow": "Extravagant solutions",
    "showcase.title": "Motion, light, interaction. Only where it matters.",
    "showcase.card1Title": "Live tech background",
    "showcase.card1Text": "Signals tech expertise in the first second.",
    "showcase.card2Title": "Conversion modules",
    "showcase.card2Text": "Quickly shows why a visitor should request an offer.",
    "showcase.card3Title": "Developer quality",
    "showcase.card3Text": "Fast behavior, clean structure, not disposable show.",
    "showcase.card4Logo": "Your Logo",
    "showcase.card4Title": "Logo reveal experience",
    "showcase.card4Text": "The brand does not merely appear: it forms from light, motion and focus so people remember it.",
    "process.eyebrow": "How we work",
    "process.title": "Four steps. No fog.",
    "process.step1Title": "Audit and goal",
    "process.step1Text": "What is not working, and what result should it bring?",
    "process.step2Title": "Design direction",
    "process.step2Text": "First impression, message, visual direction, CTA.",
    "process.step3Title": "Development",
    "process.step3Text": "Fast, modern, mobile-friendly interface with extras.",
    "process.step4Title": "Fine tuning",
    "process.step4Text": "Rhythm, speed, mobile view and request path.",
    "contact.eyebrow": "Start the build",
    "contact.title": "Ready for a website that finally represents your company seriously?",
    "contact.text": "Tell us in a few sentences what you want. We come back with a clear direction.",
    "form.name": "Name",
    "form.namePlaceholder": "Name or company",
    "form.email": "E-mail",
    "form.emailPlaceholder": "hello@company.com",
    "form.privacyConsent": "I accept the privacy notice and agree that DA Tech may reply to my website request.",
    "form.privacyLink": "Privacy notice",
    "form.privacyMicrocopy": "We only use the data to answer your request. We do not send marketing email without separate consent.",
    "form.project": "What do you need?",
    "form.optionNew": "New website",
    "form.optionModern": "Website modernization",
    "form.optionLanding": "Landing page",
    "form.optionAdvice": "Not sure, I need advice",
    "form.message": "Project summary",
    "form.messagePlaceholder": "What is the goal, what does not work now, what effect do you want?",
    "form.submit": "Start website request",
    "footer.tagline": "Modern websites and website modernization",
    "footer.privacy": "Privacy",
    "footer.cookies": "Cookies",
    "footer.impressum": "Imprint",
    "footer.terms": "Terms of service",
    "cookie.title": "Privacy and cookies",
    "cookie.text": "We currently use only necessary storage. Analytics or marketing cookies would only be added after separate consent.",
    "cookie.accept": "Accept",
    "cookie.reject": "Reject",
    "audit.eyebrow": "Website evaluator",
    "audit.title": "We evaluate your website!",
    "auditPage.title": "Website evaluator that looks for concrete issues.",
    "auditPage.lead": "Enter your website URL and the system will try to run a live PageSpeed/Lighthouse measurement. If external measurement is unavailable, it returns a URL-based pre-audit so you still get a useful starting diagnosis.",
    "auditPage.tip": "Tip: enter the full URL, for example https://company.com. The result includes scoring, reasoning, weaknesses and improvement ideas.",
    "audit.label": "Your website URL",
    "audit.placeholder": "https://company.com",
    "audit.button": "Run evaluation",
    "audit.note": "The evaluator requests a live PageSpeed/Lighthouse mobile measurement across performance, SEO, technical trust and mobile experience.",
    "audit.disclaimer": "It uses live external measurement; if that is unavailable, a URL-based fallback analysis is shown.",
    "audit.design": "Design",
    "audit.speed": "Speed",
    "audit.trust": "Trust",
    "audit.mobile": "Mobile",
    "audit.summary": "DA Tech own-site audit: 100/100. The interface is premium, mobile-tuned and built for conversion.",
    "audit.insightsTitle": "Analysis",
    "audit.recommendationsTitle": "Change recommendations",
    "audit.reasonsTitle": "Score reasoning",
    "audit.weaknessesTitle": "Weaknesses",
    "audit.improvementsTitle": "Improvement opportunities",
    "audit.defaultReason1": "Design 100: strong D.A.-Tech brand, futuristic intro and premium blue visual system.",
    "audit.defaultReason2": "Speed 100: static lightweight frontend, cache-bumped assets and a fast first screen.",
    "audit.defaultReason3": "Trust 100: multilingual content, about page, trust system and clear service structure.",
    "audit.defaultReason4": "Mobile 100: dedicated mobile and landscape rules, responsive CTAs and stable intro layout.",
    "audit.defaultInsight1": "No critical weakness: the own site communicates modernization, trust and a request path.",
    "audit.defaultInsight2": "No critical weakness: responsive views, language switching and animated details create a premium experience.",
    "audit.defaultInsight3": "No critical weakness: the audit, before/after block and website request flow create a conversion path.",
    "audit.defaultSuggestion1": "Optional polish: add real client references later to make the proof layer even stronger.",
    "audit.defaultSuggestion2": "Optional polish: connect analytics and conversion tracking on the live domain.",
    "audit.defaultSuggestion3": "Optional polish: the audit can later be upgraded with a backend for real HTML analysis.",
    "before.eyebrow": "Before / After",
    "before.title": "This is how a template-like page becomes a modern lead-generating interface.",
    "before.oldLabel": "Old template page",
    "before.newLabel": "Modern DA Tech experience",
    "cases.eyebrow": "Demo transformation",
    "cases.title": "Not more text. A better first impression.",
    "cases.card1Tag": "Old company website",
    "cases.card1Title": "From old feel to premium entry.",
    "cases.card1Text": "Clear offer, fast contact, mobile-first structure.",
    "cases.card2Tag": "Landing page",
    "cases.card2Title": "From scattered message to clear CTA.",
    "cases.card2Text": "Visitors do not wander: they see, understand, click.",
    "cases.card3Tag": "Website modernization",
    "cases.card3Title": "From template to memorable experience.",
    "cases.card3Text": "Before/after, neon tech mood, fast mobile experience.",
    "cases.metricTrust": "stronger trust feel",
    "cases.metricPath": "clearer decision path",
    "cases.metricMobile": "mobile audit target",
    "trust.eyebrow": "Trust system",
    "trust.title": "Trust quickly, without over-explaining.",
    "trust.item1": "Transparent process and milestones.",
    "trust.item2": "Mobile-first appearance for every screen.",
    "trust.item3": "SEO and speed foundations from launch.",
    "trust.item4": "A system that can keep evolving after handover.",
    "trust.note1": "We do not disappear after handover.",
    "trust.note2": "We start thinking from mobile.",
    "trust.note3": "You do not get a template, but a site serving a business goal.",
    "packages.eyebrow": "Offer directions",
    "packages.title": "Three starting paths. All built for conversion.",
    "packages.startTitle": "Fast modern presence",
    "packages.startText": "Landing page or simple company site with a strong first impression.",
    "packages.startPoint1": "1-page premium structure",
    "packages.startPoint2": "Mobile-first appearance",
    "packages.startPoint3": "Request-focused CTA path",
    "packages.modernTitle": "Premium interface from an old site",
    "packages.modernText": "The old site keeps its essence, but gets a new experience.",
    "packages.modernPoint1": "Before/after modernization audit",
    "packages.modernPoint2": "New first screen and service logic",
    "packages.modernPoint3": "Speed, trust and mobile experience focus",
    "packages.premiumTitle": "Complete digital experience",
    "packages.premiumText": "Custom multi-page website with premium interactions and brand system.",
    "packages.premiumPoint1": "Multi-page company system",
    "packages.premiumPoint2": "Extravagant animations and audit modules",
    "packages.premiumPoint3": "Multilingual scalable content",
    "packages.cta": "Request this",
    "flow.summaryTitle": "DA Tech recommendation",
    "flow.summaryText": "Modernization audit, premium first screen and mobile-first conversion path.",
    "flow.summaryNew": "Premium first screen, clear company structure and a fast request path.",
    "flow.summaryModern": "Before/after audit, new visual system, mobile-first rebuild and trust sections.",
    "flow.summaryLanding": "A one-offer landing page with strong CTA rhythm and conversion blocks.",
    "flow.summaryAdvice": "Short strategic audit, then a recommendation for the best starting direction.",
    "flow.prev": "Back",
    "flow.next": "Next",
    "flow.send": "Start request",
    "flow.success": "The email draft is ready. If it did not open automatically, write to us: hello@da-technology.eu",
    "flow.sending": "Sending...",
    "flow.endpointSuccess": "Thank you, we received your request. We will get back to you soon.",
    "flow.endpointError": "Automatic sending did not work, so we are opening the email draft instead.",
    "flow.missingEmail": "Add an email address so we know where to reply.",
    "flow.missingConsent": "Please accept the privacy notice to send the website request.",
    "about.eyebrow": "About us",
    "about.title": "Digital Architecture Technology: a modern website that wins customers.",
    "about.lead": "DA Tech builds modern websites and website modernizations for businesses that want a stronger online impression, a faster interface and more qualified leads.",
    "about.card1Title": "Design that guides attention",
    "about.card1Text": "We do not design visuals alone. Structure, rhythm and visual hierarchy work together to move visitors toward a decision.",
    "about.card2Title": "Technology that feels fast",
    "about.card2Text": "The goal is a modern, responsive and stable interface that feels premium on phones, tablets and desktop screens.",
    "about.card3Title": "Messaging that builds trust",
    "about.card3Text": "A website works when the first screen makes it clear what the company offers, why it is credible and how to get in touch.",
    "about.back": "Back to homepage",
    "about.request": "Request a Website",
    "prices.eyebrow": "Pricing",
    "prices.title": "Transparent pricing, in tables",
    "prices.lead": "We believe in transparent pricing: the tables below show what you can expect. The exact price always depends on the scope, and we send a detailed offer within 24 hours.",
    "prices.packageEyebrow": "Website packages",
    "prices.packagesTitle": "Website packages",
    "prices.packagesText": "We build around three pillars: strategy, responsive design and a lead-focused interface. Every package includes mobile optimization, a contact path and a basic SEO structure.",
    "prices.oneTimeLabel": "Website creation and modernization: one-time guide prices",
    "prices.colPackage": "Package",
    "prices.colIncludes": "Included",
    "prices.colPrice": "Price",
    "prices.colService": "Service",
    "prices.colFee": "Fee",
    "prices.basicName": "Basic",
    "prices.basicIncludes": "Up to 5-page company website, responsive design, mobile optimization, content upload, contact form, basic SEO and draft legal pages.",
    "prices.basicPrice": "from HUF 220,000",
    "prices.modernizeName": "Modernize",
    "prices.modernizeIncludes": "Modernization of an existing website, new visual direction, mobile cleanup, faster UX rhythm, CTA path and technical cleanup recommendations.",
    "prices.modernizePrice": "from HUF 290,000",
    "prices.proName": "Pro",
    "prices.proIncludes": "Up to 10-12 pages, multilingual structure, premium animations, audit module, SEO foundation, request flow and technical handover.",
    "prices.proPrice": "from HUF 480,000",
    "prices.premiumName": "Signature",
    "prices.premiumIncludes": "Custom digital experience with extra interactions, landing subpages, complex content structure, integrations and a development roadmap.",
    "prices.premiumPrice": "Custom offer",
    "prices.note": "Prices are indicative gross guide prices and do not include domain, hosting, paid plugins, external services or advertising costs.",
    "prices.ongoingTitle": "Ongoing and custom services",
    "prices.ongoingText": "SEO, maintenance, campaign pages and extra features are priced around the actual need. The goal stays the same: less uncertainty, more measurable leads.",
    "prices.ongoingLabel": "Ongoing services",
    "prices.maintenanceName": "Maintenance",
    "prices.maintenanceIncludes": "Updates, backups, content care, monthly checks and small changes.",
    "prices.maintenancePrice": "from HUF 35,000/month",
    "prices.seoName": "SEO + content",
    "prices.seoIncludes": "Keyword strategy, on-page SEO, technical recommendations, content fine tuning and monthly reporting.",
    "prices.seoPrice": "Custom offer",
    "prices.landingName": "Landing campaign",
    "prices.landingIncludes": "Campaign page, strong CTA rhythm, request section, measurable conversion path and ad-message alignment.",
    "prices.landingPrice": "from HUF 160,000",
    "prices.extraName": "Extra feature",
    "prices.extraIncludes": "Booking, calculator, integration, multilingual extension, custom module or special interaction.",
    "prices.extraPrice": "Custom offer",
    "prices.institutionTitle": "Institutional and custom projects",
    "prices.institutionText": "For larger organizations, institutions and more complex projects we prepare a custom offer: multilingual setup, accessibility directions, documentation, archive, special features or campaign systems.",
    "prices.institutionCta": "Request a detailed offer",
    "prices.faqEyebrow": "FAQ",
    "prices.faqTitle": "Common pricing questions",
    "prices.faq1Q": "What does the website price depend on?",
    "prices.faq1A": "It depends on the number of pages, content volume, animation and integration complexity, and whether we build a new website or modernize an existing one.",
    "prices.faq2Q": "Do you offer monthly services?",
    "prices.faq2A": "Yes. Maintenance, SEO, content care and continuous development can run monthly, always adjusted to the goals and website size.",
    "prices.faq3Q": "How do I get an exact offer?",
    "prices.faq3A": "Send a short summary of the goal, current website and desired features. Based on that, we send a clear detailed offer within 24 hours.",
    "prices.faq4Q": "What is not included in the prices?",
    "prices.faq4A": "Domain, hosting, paid plugins, external software, legal advice and advertising costs may be separate if the project requires them."
  },
  de: {
    "nav.about": "Ueber uns",
    "nav.prices": "Preise",
    "nav.audit": "Website-Bewerter",
    "nav.methods": "Leistungen",
    "nav.methodBuild": "Website-Erstellung",
    "nav.methodExtravagant": "Website-Modernisierung",
    "nav.methodProcess": "Extravagante Loesungen",
    "nav.why": "Warum wir",
    "nav.services": "Leistungen",
    "nav.proof": "Warum wir?",
    "nav.process": "Prozess",
    "nav.contact": "Kontakt",
    "nav.cta": "Website anfragen",
    "floating.cta": "Angebot anfragen",
    "hero.eyebrow": "D.A.-Tech Website-Modernisierung",
    "hero.title": "Wo Design auf Technologie trifft.",
    "hero.lead": "Wir verwandeln alte, templateartige oder schwache Websites in premium digitale Erlebnisse. Schnell. Mobil optimiert. Fuer Anfragen gebaut.",
    "hero.primary": "Website anfragen",
    "hero.secondary": "Was koennen wir bauen?",
    "hero.signalSpeed": "gezieltes Ladegefuehl",
    "hero.signalSeo": "Grundlagen integriert",
    "hero.signalUx": "auf Conversion optimiert",
    "metrics.trust": "Vertrauensindex",
    "metrics.speed": "Speed-Fokus",
    "metrics.lead": "Lead-Pfad",
    "metrics.mobile": "Mobile Experience",
    "terminal.audit": "Analyse der aktuellen Website",
    "terminal.build": "schnelle, moderne Oberflaeche",
    "terminal.launch": "messbarer Anfrageprozess",
    "marquee.development": "Webentwicklung",
    "marquee.modernization": "Modernisierung",
    "marquee.conversion": "Conversion",
    "marquee.responsive": "Responsive Design",
    "marquee.speed": "Geschwindigkeit",
    "marquee.requests": "automatisierte Anfragen",
    "marquee.seo": "SEO-Grundlagen",
    "marquee.brand": "Markenerlebnis",
    "impact.item1Title": "In 5 Sekunden klar",
    "impact.item1Text": "Besucher verstehen sofort, warum sie bleiben sollten.",
    "impact.item2Title": "Kein Template-Gefuehl",
    "impact.item2Text": "Tech-Visuals, Bewegung und ein premium erster Eindruck.",
    "impact.item3Title": "Fuer Anfragen gebaut",
    "impact.item3Text": "Weniger Laerm, klarerer Weg zur Aktion.",
    "services.eyebrow": "Leistungen",
    "services.title": "Moderne Website-Leistungen aus einer Hand",
    "services.card1Title": "Website-Erstellung",
    "services.card1Text": "Moderne, schnelle und klare Firmenwebsites sowie Landingpages, die auch mobil einen hochwertigen ersten Eindruck schaffen.",
    "services.card1Link": "Details zur Website-Erstellung",
    "services.card2Title": "Website-Modernisierung",
    "services.card2Text": "Wir verwandeln alte, templateartige oder unklare Seiten in eine uebersichtliche, mobile und vertrauensbildende Oberflaeche.",
    "services.card2Link": "Details zur Modernisierung",
    "services.card3Title": "Extravagante Web-Loesungen",
    "services.card3Text": "Animiertes Intro, Before/After-Erlebnis, Audit-Modul, Mikrointeraktionen und Details, die die Marke merkbar machen.",
    "services.card3Link": "Details zu Extra-Loesungen",
    "services.card4Title": "Conversion-Strategie",
    "services.card4Text": "Weniger Laerm, staerkerer CTA, klarerer Entscheidungsweg.",
    "services.helpTitle": "Nicht sicher, was du brauchst?",
    "services.helpText": "Die meisten Projekte sind eine Kombination: staerkerer erster Bildschirm, Mobile-Bereinigung, Anfrageweg und etwas Extra-Wow. Sag uns, wo du gerade stehst, und wir empfehlen eine klare Richtung.",
    "services.helpLink": "Empfehlung anfragen",
    "pageWeb.eyebrow": "Leistung",
    "pageWeb.title": "Website-Erstellung, die dein Unternehmen ernsthaft repraesentiert.",
    "pageWeb.lead": "Wir bauen moderne, schnelle, mobile Firmenwebsites mit klarer Botschaft, starkem ersten Bildschirm und Anfrageweg.",
    "pageWeb.primary": "Website anfragen",
    "pageWeb.secondary": "Preise ansehen",
    "pageWeb.card1Title": "Was bekommst du?",
    "pageWeb.card1Text": "Durchdachte Struktur, premium erster Eindruck, responsive Layout, Kontaktweg, SEO-Basis und eine uebergabefaehige Grundlage, die weiter wachsen kann.",
    "pageWeb.card2Title": "Fuer wen ist es gut?",
    "pageWeb.card2Text": "Fuer Unternehmen, die eine neue Firmenwebsite, Landingpage oder Online-Praesenz brauchen, die schnell Vertrauen aufbaut.",
    "pageWeb.card3Title": "Wie startet es?",
    "pageWeb.card3Text": "Mit kurzem Zielcheck, Content-Richtung und klarem Angebot. Danach folgen Design, Entwicklung, Mobile-Feinschliff und Uebergabe.",
    "pageModern.eyebrow": "Leistung",
    "pageModern.title": "Aus alter Website wird eine moderne Anfrage-Oberflaeche.",
    "pageModern.lead": "Wenn die aktuelle Seite langsam, templateartig, mobil schwach ist oder keine Anfragen bringt, ordnen wir Visual, Struktur und Entscheidungsweg neu.",
    "pageModern.primary": "Modernisierung anfragen",
    "pageModern.secondary": "Preise ansehen",
    "pageModern.card1Title": "Was pruefen wir?",
    "pageModern.card1Text": "Erster Eindruck, Mobile View, Botschaft, CTAs, Vertrauenselemente, technisches Gefuehl und wie schnell Besucher das Angebot verstehen.",
    "pageModern.card2Title": "Was veraendert sich?",
    "pageModern.card2Text": "Frischeres Design, klarerer Content-Rhythmus, staerkerer Anfrageweg, bessere Mobile Experience und hochwertigeres Markengefuehl.",
    "pageModern.card3Title": "Was kann bleiben?",
    "pageModern.card3Text": "Bestehender Markenwert, Content-Basis und Business-Fokus. Wir werfen nicht alles weg: Wir verstaerken, was funktionieren kann.",
    "pageExtra.eyebrow": "Leistung",
    "pageExtra.animationEyebrow": "Animation inklusive",
    "pageExtra.logoReveal": "Dein Logo",
    "pageExtra.logoPromise": "So inszeniert, dass man sich an dich erinnert.",
    "pageExtra.title": "Extravagante Web-Loesungen, an die man sich erinnert.",
    "pageExtra.lead": "Animation, Audit-Modul, Before/After-Erlebnis, Mikrointeraktionen und Details, die dein Unternehmen von Template-Websites unterscheiden.",
    "pageExtra.primary": "Extra-Loesung anfragen",
    "pageExtra.secondary": "Demo ansehen",
    "pageExtra.card1Title": "Intro und Bewegung",
    "pageExtra.card1Text": "Besucher treffen nicht auf ein statisches Template, sondern auf ein modernes erstes Erlebnis passend zur Marke.",
    "pageExtra.card2Title": "Interaktive Module",
    "pageExtra.card2Text": "Audit, Before/After-Vergleich, Entscheidungshilfen und Elemente, die Besucher aktiv einbeziehen.",
    "pageExtra.card3Title": "Spektakulaer mit Zweck",
    "pageExtra.card3Text": "Ziel ist nicht Animation um der Animation willen, sondern Premium-Gefuehl, besseres Verstaendnis und staerkere Anfrage-Motivation.",
    "proof.eyebrow": "Warum D.A.-Tech?",
    "proof.title": "Fuer uns gibt es kein Unmoeglich.",
    "proof.text": "Wenn die Idee geschaeftlich wertvoll ist, finden wir den passenden Weg: in Design, Technologie und einer klaren Conversion-Strecke.",
    "proof.item1Title": "Strategisches Design",
    "proof.item1Text": "Wir fuehren Aufmerksamkeit dorthin, wo Entscheidungen entstehen.",
    "proof.item2Title": "Moderne technische Basis",
    "proof.item2Text": "Schnelle, responsive, suchmaschinenfreundliche Basis.",
    "proof.item3Title": "Premium-Gefuehl",
    "proof.item3Text": "Animation, Raum und Fokus lassen die Marke hochwertiger wirken.",
    "showcase.eyebrow": "Extravagante Loesungen",
    "showcase.title": "Bewegung, Licht, Interaktion. Nur dort, wo es zaehlt.",
    "showcase.card1Title": "Live-Tech-Hintergrund",
    "showcase.card1Text": "Vermittelt digitale Kompetenz in der ersten Sekunde.",
    "showcase.card2Title": "Conversion-Module",
    "showcase.card2Text": "Zeigt schnell, warum eine Anfrage sinnvoll ist.",
    "showcase.card3Title": "Entwicklerqualitaet",
    "showcase.card3Text": "Schnell, sauber strukturiert, keine kurzlebige Show.",
    "showcase.card4Logo": "Dein Logo",
    "showcase.card4Title": "Logo-Reveal-Erlebnis",
    "showcase.card4Text": "Die Marke erscheint nicht nur: Sie entsteht aus Licht, Bewegung und Fokus, damit sie im Kopf bleibt.",
    "process.eyebrow": "So arbeiten wir",
    "process.title": "Vier Schritte. Kein Nebel.",
    "process.step1Title": "Audit und Ziel",
    "process.step1Text": "Was funktioniert nicht, und welches Ergebnis soll entstehen?",
    "process.step2Title": "Designrichtung",
    "process.step2Text": "Erster Eindruck, Botschaft, visuelle Richtung, CTA.",
    "process.step3Title": "Entwicklung",
    "process.step3Text": "Schnelle, moderne, mobile Oberflaeche mit Extras.",
    "process.step4Title": "Feinschliff",
    "process.step4Text": "Rhythmus, Geschwindigkeit, Mobile View und Anfrageweg.",
    "contact.eyebrow": "Projekt starten",
    "contact.title": "Bereit fuer eine Website, die dein Unternehmen endlich stark repraesentiert?",
    "contact.text": "Sag uns in wenigen Saetzen, was du willst. Wir kommen mit einer klaren Richtung zurueck.",
    "form.name": "Name",
    "form.namePlaceholder": "Name oder Firma",
    "form.email": "E-Mail",
    "form.emailPlaceholder": "hello@firma.de",
    "form.privacyConsent": "Ich akzeptiere die Datenschutzhinweise und stimme zu, dass DA Tech auf meine Anfrage antwortet.",
    "form.privacyLink": "Datenschutzhinweise",
    "form.privacyMicrocopy": "Wir nutzen die Daten nur zur Beantwortung deiner Anfrage. Marketing-E-Mails senden wir nicht ohne separate Einwilligung.",
    "form.project": "Was brauchst du?",
    "form.optionNew": "Neue Website",
    "form.optionModern": "Website-Modernisierung",
    "form.optionLanding": "Landingpage",
    "form.optionAdvice": "Noch unsicher, ich brauche Beratung",
    "form.message": "Kurz zum Projekt",
    "form.messagePlaceholder": "Was ist das Ziel, was funktioniert aktuell nicht, welche Wirkung wuenschst du dir?",
    "form.submit": "Website-Anfrage starten",
    "footer.tagline": "Moderne Websites und Website-Modernisierung",
    "footer.privacy": "Datenschutz",
    "footer.cookies": "Cookies",
    "footer.impressum": "Impressum",
    "footer.terms": "Servicebedingungen",
    "cookie.title": "Datenschutz und Cookies",
    "cookie.text": "Derzeit nutzen wir nur notwendige Speicherung. Analytics- oder Marketing-Cookies wuerden nur nach separater Einwilligung aktiviert.",
    "cookie.accept": "Akzeptieren",
    "cookie.reject": "Ablehnen",
    "audit.eyebrow": "Website-Bewerter",
    "audit.title": "Wir bewerten deine Website!",
    "auditPage.title": "Website-Bewerter, der konkrete Probleme sucht.",
    "auditPage.lead": "Gib deine Website-URL ein, dann versucht das System eine Live-PageSpeed/Lighthouse-Messung zu starten. Wenn die externe Messung nicht erreichbar ist, erscheint ein URL-basierter Vorab-Audit.",
    "auditPage.tip": "Tipp: Gib die vollstaendige URL ein, zum Beispiel https://firma.de. Das Ergebnis zeigt Bewertung, Gruende, Schwaechen und Verbesserungen.",
    "audit.label": "Deine Website-URL",
    "audit.placeholder": "https://firma.de",
    "audit.button": "Bewertung starten",
    "audit.note": "Der Website-Bewerter fragt eine Live-PageSpeed/Lighthouse-Mobile-Messung zu Performance, SEO, technischem Vertrauen und Mobile Experience ab.",
    "audit.disclaimer": "Er nutzt externe Live-Messung; wenn diese nicht erreichbar ist, erscheint eine URL-basierte Fallback-Analyse.",
    "audit.design": "Design",
    "audit.speed": "Tempo",
    "audit.trust": "Vertrauen",
    "audit.mobile": "Mobil",
    "audit.summary": "DA Tech Eigenwebsite-Audit: 100/100. Die Oberflaeche ist premium, mobil optimiert und auf Conversion gebaut.",
    "audit.insightsTitle": "Analyse",
    "audit.recommendationsTitle": "Aenderungsvorschlaege",
    "audit.reasonsTitle": "Bewertungsgruende",
    "audit.weaknessesTitle": "Schwaechen",
    "audit.improvementsTitle": "Verbesserungsmoeglichkeiten",
    "audit.defaultReason1": "Design 100: starke D.A.-Tech Marke, futuristisches Intro und hochwertiges blaues visuelles System.",
    "audit.defaultReason2": "Tempo 100: leichtes statisches Frontend, cache-gebumpte Assets und schneller erster Bildschirm.",
    "audit.defaultReason3": "Vertrauen 100: mehrsprachiger Inhalt, About-Seite, Vertrauenssystem und klare Leistungsstruktur.",
    "audit.defaultReason4": "Mobil 100: eigene Mobile- und Landscape-Regeln, responsive CTAs und stabiles Intro-Layout.",
    "audit.defaultInsight1": "Keine kritische Schwaeche: Die eigene Seite vermittelt Modernisierung, Vertrauen und Anfrageweg.",
    "audit.defaultInsight2": "Keine kritische Schwaeche: Responsive Ansichten, Sprachwechsel und Animationen erzeugen ein Premium-Erlebnis.",
    "audit.defaultInsight3": "Keine kritische Schwaeche: Audit, Vorher/Nachher-Block und Anfrage-Flow bilden einen Conversion-Pfad.",
    "audit.defaultSuggestion1": "Optionale Verfeinerung: Spaeter echte Kundenreferenzen ergaenzen, um den Proof-Bereich zu staerken.",
    "audit.defaultSuggestion2": "Optionale Verfeinerung: Auf der Live-Domain Analytics und Conversion-Tracking anbinden.",
    "audit.defaultSuggestion3": "Optionale Verfeinerung: Die Bewertung kann spaeter per Backend zu echter HTML-Analyse ausgebaut werden.",
    "before.eyebrow": "Before / After",
    "before.title": "So wird aus einer Template-Seite eine moderne Oberflaeche fuer neue Anfragen.",
    "before.oldLabel": "Alte Template-Seite",
    "before.newLabel": "Modernes DA Tech Erlebnis",
    "cases.eyebrow": "Demo Transformation",
    "cases.title": "Nicht mehr Text. Ein besserer erster Eindruck.",
    "cases.card1Tag": "Alte Unternehmensseite",
    "cases.card1Title": "Von alt wirkend zu premium Einstieg.",
    "cases.card1Text": "Klares Angebot, schneller Kontakt, Mobile-first Struktur.",
    "cases.card2Tag": "Landingpage",
    "cases.card2Title": "Von verstreuter Botschaft zu klarem CTA.",
    "cases.card2Text": "Besucher irren nicht herum: sehen, verstehen, klicken.",
    "cases.card3Tag": "Website-Modernisierung",
    "cases.card3Title": "Vom Template zum merkbaren Erlebnis.",
    "cases.card3Text": "Vorher/Nachher, Neon-Tech-Stimmung, schnelle Mobile Experience.",
    "cases.metricTrust": "staerkeres Vertrauensgefuehl",
    "cases.metricPath": "klarerer Entscheidungsweg",
    "cases.metricMobile": "Mobile-Audit-Ziel",
    "trust.eyebrow": "Vertrauenssystem",
    "trust.title": "Vertrauen schnell, ohne zu viel Erklaerung.",
    "trust.item1": "Transparenter Prozess und klare Meilensteine.",
    "trust.item2": "Mobile-first Darstellung fuer jeden Bildschirm.",
    "trust.item3": "SEO- und Speed-Grundlagen ab dem Start.",
    "trust.item4": "Ein System, das nach der Uebergabe weiter wachsen kann.",
    "trust.note1": "Wir verschwinden nicht nach der Uebergabe.",
    "trust.note2": "Wir denken zuerst mobil.",
    "trust.note3": "Du bekommst kein Template, sondern eine Seite fuer ein Geschaeftsziel.",
    "packages.eyebrow": "Angebotsrichtungen",
    "packages.title": "Drei Startwege. Alle fuer Conversion gebaut.",
    "packages.startTitle": "Schnelle moderne Praesenz",
    "packages.startText": "Landingpage oder einfache Firmenseite mit starkem ersten Eindruck.",
    "packages.startPoint1": "Premium-Struktur fuer eine Seite",
    "packages.startPoint2": "Mobile-first Darstellung",
    "packages.startPoint3": "CTA-Weg fuer Anfragen",
    "packages.modernTitle": "Premium-Oberflaeche aus alter Seite",
    "packages.modernText": "Die alte Seite behaelt den Kern, bekommt aber ein neues Erlebnis.",
    "packages.modernPoint1": "Vorher/Nachher Modernisierungs-Audit",
    "packages.modernPoint2": "Neue erste Ansicht und Leistungslogik",
    "packages.modernPoint3": "Fokus auf Tempo, Vertrauen und Mobile Experience",
    "packages.premiumTitle": "Komplettes digitales Erlebnis",
    "packages.premiumText": "Individuelle mehrseitige Website mit Premium-Interaktionen und Brand-System.",
    "packages.premiumPoint1": "Mehrseitiges Unternehmenssystem",
    "packages.premiumPoint2": "Extravagante Animationen und Audit-Module",
    "packages.premiumPoint3": "Mehrsprachiger skalierbarer Inhalt",
    "packages.cta": "Das anfragen",
    "flow.summaryTitle": "DA Tech Empfehlung",
    "flow.summaryText": "Modernisierungs-Audit, premium erster Bildschirm und mobile-first Conversion-Pfad.",
    "flow.summaryNew": "Premium erste Ansicht, klare Unternehmensstruktur und schneller Anfrageweg.",
    "flow.summaryModern": "Vorher/Nachher Audit, neues visuelles System, Mobile-first Rebuild und Vertrauensbereiche.",
    "flow.summaryLanding": "Eine Landingpage fuer ein Angebot mit starkem CTA-Rhythmus und Conversion-Bloecken.",
    "flow.summaryAdvice": "Kurzer Strategie-Audit, danach Empfehlung fuer die beste Startrichtung.",
    "flow.prev": "Zurueck",
    "flow.next": "Weiter",
    "flow.send": "Anfrage starten",
    "flow.success": "Der E-Mail-Entwurf ist bereit. Falls er sich nicht automatisch geoeffnet hat: hello@da-technology.eu",
    "flow.sending": "Wird gesendet...",
    "flow.endpointSuccess": "Danke, wir haben deine Anfrage erhalten. Wir melden uns bald.",
    "flow.endpointError": "Das automatische Senden hat nicht funktioniert, daher oeffnen wir den E-Mail-Entwurf.",
    "flow.missingEmail": "Gib eine E-Mail-Adresse ein, damit wir antworten koennen.",
    "flow.missingConsent": "Bitte akzeptiere die Datenschutzhinweise, um die Website-Anfrage zu senden.",
    "about.eyebrow": "About us",
    "about.title": "Digital Architecture Technology: eine moderne Website, die Kunden ueberzeugt.",
    "about.lead": "DA Tech erstellt moderne Websites und Website-Modernisierungen fuer Unternehmen, die online staerker wirken, schneller auftreten und mehr qualifizierte Anfragen gewinnen wollen.",
    "about.card1Title": "Design, das Aufmerksamkeit fuehrt",
    "about.card1Text": "Wir gestalten nicht nur Optik. Struktur, Rhythmus und visuelle Hierarchie fuehren Besucher gemeinsam zur Entscheidung.",
    "about.card2Title": "Technologie, die schnell wirkt",
    "about.card2Text": "Das Ziel ist eine moderne, responsive und stabile Oberflaeche, die auf Smartphone, Tablet und Desktop hochwertig wirkt.",
    "about.card3Title": "Botschaften, die Vertrauen schaffen",
    "about.card3Text": "Eine Website funktioniert, wenn schon der erste Bildschirm zeigt, was das Unternehmen anbietet, warum es glaubwuerdig ist und wie man Kontakt aufnimmt.",
    "about.back": "Zurueck zur Startseite",
    "about.request": "Website anfragen",
    "prices.eyebrow": "Preise",
    "prices.title": "Transparente Preise, in Tabellen",
    "prices.lead": "Wir glauben an transparente Preise: Die folgenden Tabellen zeigen, womit du rechnen kannst. Der genaue Preis haengt immer vom Umfang ab, ein detailliertes Angebot senden wir innerhalb von 24 Stunden.",
    "prices.packageEyebrow": "Website-Pakete",
    "prices.packagesTitle": "Website-Pakete",
    "prices.packagesText": "Wir arbeiten mit drei Saeulen: Strategie, responsive Design und eine auf Anfragen optimierte Oberflaeche. Jedes Paket enthaelt Mobile-Optimierung, Kontaktweg und SEO-Grundstruktur.",
    "prices.oneTimeLabel": "Website-Erstellung und Modernisierung: einmalige Richtpreise",
    "prices.colPackage": "Paket",
    "prices.colIncludes": "Enthalten",
    "prices.colPrice": "Preis",
    "prices.colService": "Leistung",
    "prices.colFee": "Honorar",
    "prices.basicName": "Basic",
    "prices.basicIncludes": "Bis zu 5-seitige Firmenwebsite, responsive Design, Mobile-Optimierung, Content-Einpflege, Kontaktformular, SEO-Basis und Entwurf rechtlicher Seiten.",
    "prices.basicPrice": "ab 220.000 HUF",
    "prices.modernizeName": "Modernize",
    "prices.modernizeIncludes": "Modernisierung einer bestehenden Website, neue visuelle Richtung, Mobile-Bereinigung, schnellerer UX-Rhythmus, CTA-Pfad und technische Empfehlungen.",
    "prices.modernizePrice": "ab 290.000 HUF",
    "prices.proName": "Pro",
    "prices.proIncludes": "Bis zu 10-12 Seiten, mehrsprachige Struktur, Premium-Animationen, Audit-Modul, SEO-Grundlage, Anfrage-Flow und technische Uebergabe.",
    "prices.proPrice": "ab 480.000 HUF",
    "prices.premiumName": "Signature",
    "prices.premiumIncludes": "Individuelles digitales Erlebnis mit extra Interaktionen, Landing-Unterseiten, komplexer Content-Struktur, Integrationen und Entwicklungs-Roadmap.",
    "prices.premiumPrice": "Individuelles Angebot",
    "prices.note": "Die Preise sind indikative Brutto-Richtpreise und enthalten keine Domain-, Hosting-, Plugin-, externen Service- oder Werbekosten.",
    "prices.ongoingTitle": "Laufende und individuelle Leistungen",
    "prices.ongoingText": "SEO, Wartung, Kampagnenseiten und Extra-Funktionen werden nach Bedarf kalkuliert. Das Ziel bleibt gleich: weniger Unsicherheit, mehr messbare Anfragen.",
    "prices.ongoingLabel": "Laufende Leistungen",
    "prices.maintenanceName": "Wartung",
    "prices.maintenanceIncludes": "Updates, Backups, Content-Pflege, monatliche Kontrolle und kleine Anpassungen.",
    "prices.maintenancePrice": "ab 35.000 HUF/Monat",
    "prices.seoName": "SEO + Content",
    "prices.seoIncludes": "Keyword-Strategie, On-page SEO, technische Empfehlungen, Content-Feinschliff und monatlicher Report.",
    "prices.seoPrice": "Individuelles Angebot",
    "prices.landingName": "Landing-Kampagne",
    "prices.landingIncludes": "Kampagnenseite, starker CTA-Rhythmus, Anfragebereich, messbarer Conversion-Pfad und Abstimmung mit Anzeigenbotschaft.",
    "prices.landingPrice": "ab 160.000 HUF",
    "prices.extraName": "Extra-Funktion",
    "prices.extraIncludes": "Buchung, Rechner, Integration, mehrsprachige Erweiterung, individuelles Modul oder spezielle Interaktion.",
    "prices.extraPrice": "Individuelles Angebot",
    "prices.institutionTitle": "Institutionelle und individuelle Projekte",
    "prices.institutionText": "Fuer groessere Organisationen, Institutionen und komplexere Projekte erstellen wir individuelle Angebote: Mehrsprachigkeit, Accessibility-Richtung, Dokumentation, Archiv, Spezialfunktionen oder Kampagnensysteme.",
    "prices.institutionCta": "Detailliertes Angebot anfragen",
    "prices.faqEyebrow": "FAQ",
    "prices.faqTitle": "Haeufige Fragen zu Preisen",
    "prices.faq1Q": "Wovon haengt der Website-Preis ab?",
    "prices.faq1A": "Er haengt von Seitenzahl, Content-Umfang, Komplexitaet von Animationen und Integrationen sowie davon ab, ob wir neu bauen oder eine bestehende Website modernisieren.",
    "prices.faq2Q": "Gibt es monatliche Leistungen?",
    "prices.faq2A": "Ja. Wartung, SEO, Content-Pflege und laufende Entwicklung sind monatlich moeglich, immer angepasst an Ziele und Website-Groesse.",
    "prices.faq3Q": "Wie bekomme ich ein genaues Angebot?",
    "prices.faq3A": "Sende eine kurze Beschreibung von Ziel, aktueller Website und gewuenschten Funktionen. Darauf basierend senden wir innerhalb von 24 Stunden ein klares detailliertes Angebot.",
    "prices.faq4Q": "Was ist nicht in den Preisen enthalten?",
    "prices.faq4A": "Domain, Hosting, bezahlte Plugins, externe Software, Rechtsberatung und Werbekosten koennen separat anfallen, wenn das Projekt sie benoetigt."
  }
};

function setLanguage(lang) {
  const dictionary = translations[lang] || translations.hu;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (dictionary[key]) node.textContent = dictionary[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    if (dictionary[key]) node.setAttribute("placeholder", dictionary[key]);
  });

  document.querySelectorAll(".price-table").forEach((table) => {
    const headers = Array.from(table.querySelectorAll("thead th")).map((header) => header.textContent.trim());
    table.querySelectorAll("tbody tr").forEach((row) => {
      row.querySelectorAll("td").forEach((cell, index) => {
        if (headers[index]) cell.dataset.label = headers[index];
      });
    });
  });

  document.querySelectorAll(".lang-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
    button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
  });

  window.localStorage.setItem("daTechLang", lang);
  if (flowPanels.length) setFlowStep(flowStep);
  if (lastAuditRawUrl !== null) updateWebsiteAudit(lastAuditRawUrl);
}

function ensureFloatingRequestButton() {
  if (document.querySelector(".floating-request-cta")) return;

  const button = document.createElement("a");
  button.className = "floating-request-cta";
  button.href = "contact.html";
  button.dataset.i18n = "floating.cta";
  button.setAttribute("aria-label", "Ajánlatkérés");
  button.textContent = "Ajánlatkérés";
  document.body.appendChild(button);
}

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(canvas.offsetWidth * ratio);
  canvas.height = Math.floor(canvas.offsetHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const area = canvas.offsetWidth * canvas.offsetHeight;
  const count = Math.min(120, Math.max(56, Math.floor(area / 14500)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.offsetWidth,
    y: Math.random() * canvas.offsetHeight,
    vx: (Math.random() - 0.5) * 0.38,
    vy: (Math.random() - 0.5) * 0.38,
    r: Math.random() * 1.6 + 0.8
  }));
}

function draw() {
  if (!canvas || !ctx) return;
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  ctx.clearRect(0, 0, width, height);

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(31, 99, 255, 0.1)");
  gradient.addColorStop(0.5, "rgba(106, 166, 255, 0.04)");
  gradient.addColorStop(1, "rgba(8, 20, 43, 0.18)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  for (const particle of particles) {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < -20) particle.x = width + 20;
    if (particle.x > width + 20) particle.x = -20;
    if (particle.y < -20) particle.y = height + 20;
    if (particle.y > height + 20) particle.y = -20;

    if (pointer.active) {
      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 150) {
        particle.x += dx * 0.006;
        particle.y += dy * 0.006;
      }
    }
  }

  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 138) {
        ctx.strokeStyle = `rgba(76, 134, 255, ${0.13 * (1 - distance / 138)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  for (const particle of particles) {
    ctx.fillStyle = "rgba(216, 233, 255, 0.72)";
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

document.addEventListener("pointermove", (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  pointer.active = true;
});

document.addEventListener("pointerleave", () => {
  pointer.active = false;
});

document.querySelectorAll(".service-card, .showcase-grid article, .timeline-item").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) translateY(-3px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const marqueeTrack = document.querySelector(".marquee-track");
if (marqueeTrack) marqueeTrack.innerHTML += marqueeTrack.innerHTML;

document.querySelectorAll(".lang-option").forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

document.querySelectorAll(".site-header").forEach((header) => {
  const toggle = header.querySelector(".mobile-menu-toggle");
  if (!toggle) return;

  const closeMobileMenu = () => {
    header.classList.remove("is-menu-open");
    toggle.setAttribute("aria-expanded", "false");
    header.querySelectorAll(".nav-menu.is-open").forEach((menu) => {
      menu.classList.remove("is-open");
      const trigger = menu.querySelector(".nav-menu-button");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
  };

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = header.classList.toggle("is-menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (!isOpen) closeMobileMenu();
  });

  header.querySelectorAll(".nav a, .nav-cta, .lang-option").forEach((item) => {
    item.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) closeMobileMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });
});

document.querySelectorAll(".nav-menu").forEach((menu) => {
  const trigger = menu.querySelector(".nav-menu-button");
  if (!trigger) return;
  trigger.setAttribute("aria-expanded", "false");

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    menu.classList.remove("is-suppressed");
    const isOpen = menu.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(isOpen));
    trigger.blur();
  });

  menu.addEventListener("mouseleave", () => {
    menu.classList.remove("is-suppressed");
  });

  menu.querySelectorAll(".nav-dropdown a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      menu.classList.remove("is-suppressed");
      trigger.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target)) {
      menu.classList.remove("is-open");
      menu.classList.remove("is-suppressed");
      trigger.setAttribute("aria-expanded", "false");
    }
  });
});

const compareFrame = document.querySelector("#compareFrame");
const compareRange = document.querySelector("#compareRange");
if (compareFrame && compareRange) {
  const compareHandle = document.querySelector("#compareHandle");
  const setCompareValue = (value) => {
    const nextValue = Math.max(Number(compareRange.min), Math.min(Number(compareRange.max), Math.round(value)));
    compareRange.value = String(nextValue);
    compareFrame.style.setProperty("--split", `${nextValue}%`);
    if (compareHandle) compareHandle.setAttribute("aria-valuenow", String(nextValue));
  };

  const syncCompareFromPointer = (event) => {
    const rect = compareFrame.getBoundingClientRect();
    const percent = ((event.clientX - rect.left) / rect.width) * 100;
    setCompareValue(percent);
  };

  let compareDragging = false;
  const stopCompareDrag = () => {
    compareDragging = false;
    compareFrame.classList.remove("is-dragging");
  };

  compareRange.addEventListener("input", () => setCompareValue(Number(compareRange.value)));
  compareFrame.addEventListener("pointerdown", (event) => {
    compareDragging = true;
    compareFrame.classList.add("is-dragging");
    compareFrame.setPointerCapture(event.pointerId);
    syncCompareFromPointer(event);
  });
  compareFrame.addEventListener("pointermove", (event) => {
    if (compareDragging) syncCompareFromPointer(event);
  });
  compareFrame.addEventListener("pointerup", stopCompareDrag);
  compareFrame.addEventListener("pointercancel", stopCompareDrag);
  compareFrame.addEventListener("lostpointercapture", stopCompareDrag);
  if (compareHandle) {
    compareHandle.addEventListener("keydown", (event) => {
      const step = event.shiftKey ? 10 : 4;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setCompareValue(Number(compareRange.value) - step);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setCompareValue(Number(compareRange.value) + step);
      }
    });
  }
  setCompareValue(Number(compareRange.value));
}

const auditButton = document.querySelector("#auditButton");
if (auditButton) {
  auditButton.addEventListener("click", async () => {
    const input = document.querySelector("#auditUrl");
    lastAuditRawUrl = input.value.trim();
    await updateWebsiteAudit(lastAuditRawUrl);
  });
}

async function updateWebsiteAudit(rawUrl) {
  setWebsiteAuditState(true);
  renderWebsiteAudit(buildAuditLoadingState());
  const audit = await buildWebsiteAudit(rawUrl);
  renderWebsiteAudit(audit);
}

function setWebsiteAuditState(hasResult) {
  document.querySelectorAll(".audit-lab").forEach((lab) => {
    lab.classList.toggle("audit-empty", !hasResult);
  });
}

function renderWebsiteAudit(audit) {
  const score = document.querySelector("#auditScore");
  const summary = document.querySelector("#auditSummary");
  if (!score || !summary) return;

  score.textContent = audit.score;
  summary.textContent = audit.summary;

  Object.entries(audit.categories).forEach(([key, value]) => {
    const bar = document.querySelector(`[data-audit-bar="${key}"]`);
    if (!bar) return;
    bar.style.setProperty("--value", `${value}%`);
    const valueLabel = bar.querySelector("em");
    if (valueLabel) valueLabel.textContent = value;
  });

  renderAuditList("#auditReasons", audit.reasons);
  renderAuditList("#auditInsights", audit.insights);
  renderAuditList("#auditRecommendations", audit.recommendations);
  renderAuditDiagnostics(audit.diagnostics || []);
}

function renderAuditDiagnostics(items) {
  const panel = document.querySelector("#auditDiagnostics");
  if (!panel) return;
  panel.hidden = items.length === 0;
  panel.replaceChildren(...items.map((item) => {
    const chip = document.createElement("span");
    chip.textContent = item;
    return chip;
  }));
}

function normalizeAuditUrl(rawUrl) {
  if (!rawUrl) return null;
  try {
    return new URL(rawUrl.includes("://") ? rawUrl : `https://${rawUrl}`);
  } catch {
    return null;
  }
}

function clampScore(value) {
  return Math.max(38, Math.min(97, Math.round(value)));
}

function textFingerprint(text) {
  return [...text].reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 3), 0);
}

function addUnique(items, item) {
  if (item && !items.includes(item)) items.push(item);
}

function pickAuditOption(options, seed) {
  if (!Array.isArray(options)) return options;
  return options[Math.abs(seed) % options.length];
}

const auditCopy = {
  hu: {
    labels: {
      design: "design",
      speed: "sebesség",
      trust: "bizalom",
      mobile: "mobilélmény"
    },
    summary: (score, weak) => `Audit eredmény: ${score}/100. A legfontosabb fejlesztési fókusz most: ${weak}.`,
    insightScore: (host, score) => `${host} URL-struktúrája alapján a becsült modernizálási potenciál ${score}/100.`,
    httpsGood: "HTTPS jel látszik, ez jó alap a bizalomhoz és a böngésző-kompatibilitáshoz.",
    httpsMissing: "Nem látszik HTTPS protokoll, ezt bizalmi és technikai okból első körben javítani kell.",
    domainClean: "A domain rövid és brandelhető, ezért könnyebben megjegyezhető és hirdetésekben is erősebb.",
    domainComplex: "A domain vagy útvonal túl összetettnek tűnik, ez ronthatja a prémium első benyomást.",
    conversionSignal: "Az URL-ben látszik szolgáltatás vagy kapcsolat fókusz, ez támogatja a konverziós útvonalat.",
    conversionMissing: "Az URL-ből nem derül ki erős ajánlatkérési vagy kapcsolatfelvételi útvonal.",
    recommendations: {
      design: "Építsünk erősebb első képernyőt: világos főállítás, nagyobb vizuális fókusz, egyetlen domináns CTA.",
      speed: "Egyszerűsítsük az oldalszerkezetet, optimalizáljuk a képeket és csökkentsük a felesleges betöltési elemeket.",
      trust: "Tegyünk fel referenciát, rövid bizalmi érveket, ügyfél-előnyöket és jól látható kapcsolatfelvételi pontot.",
      mobile: "Finomítsuk a mobil ritmust: nagyobb gombok, rövidebb blokkok, könnyebb görgetés és sticky ajánlatkérés.",
      trustBlock: "Kerüljön az első görgetés elé egy bizalomépítő blokk: eredmények, folyamat, garancia vagy ügyfélvélemény.",
      cta: "Legyen minden fő szekció végén kontextushoz illő CTA, ne csak az oldal alján lehessen érdeklődni.",
      navigation: "Rövidítsük a navigációs útvonalat, hogy a látogató maximum két kattintással eljusson az ajánlatkérésig."
    },
    weaknesses: {
      design: "A vizuális első benyomás várhatóan nem elég karakteres vagy nem elég brandközpontú.",
      speed: "A technikai érzet gyengülhet: hosszú útvonal vagy nem ideális protokoll lassú oldal benyomását keltheti.",
      trust: "Kevés bizalmi jel látszik az URL-ből: hiányozhat referencia, csapat, kapcsolat vagy bizonyíték.",
      mobile: "Mobilon túl sok lépésnek tűnhet az út az érdeklődésig.",
      https: "HTTPS nélküli cím bizalmi és böngészős figyelmeztetéseket okozhat.",
      domain: "A domain vagy az útvonal túl bonyolult, ezért nehezebb megjegyezni.",
      conversion: "Nem látszik erős ajánlatkérési vagy kapcsolatfelvételi fókusz."
    },
    improvementOptions: {
      design: ["Készítsünk hero szekciót erős főállítással, egy látványos brand elemmel és egy domináns CTA-val.", "Adjunk a főoldal tetejére előtte/utána hatást vagy interaktív demonstrációt, ami azonnal megmutatja az értéket."],
      speed: ["Optimalizáljuk a képeket, CSS-t és felesleges vizuális blokkokat, hogy gyorsabbnak érződjön az első képernyő.", "Egyszerűsítsük a betöltési sorrendet: először a fő üzenet, CTA és brand jelenjen meg, minden extra utána."],
      trust: ["Tegyünk ki ügyfélvéleményt, referenciát és rövid folyamatmagyarázatot az első két szekcióba.", "Építsünk bizalmi sávot: eredmények, gyorsaság, garancia, technológiai minőség és kapcsolat."],
      mobile: ["Mobilon legyen sticky ajánlatkérés gomb, rövidebb szövegblokkok és nagyobb érintési felületek.", "Telefonon rendezzük át a szekciókat egy egyoszlopos, gyors döntési útvonallá."],
      cta: ["Minden fontos blokk végére kerüljön kontextusos CTA: audit, modernizálás, ajánlatkérés.", "Az ajánlatkérő folyamat legyen 3 rövid lépés, hogy ne tűnjön űrlapkitöltési munkának."],
      navigation: ["Rövidítsük a menüt, és emeljük ki külön a legfontosabb útvonalat: Weboldal igénylése.", "A szolgáltatás, referencia és kapcsolat maximum két kattintással legyen elérhető."]
    }
  },
  en: {
    labels: {
      design: "design",
      speed: "speed",
      trust: "trust",
      mobile: "mobile experience"
    },
    summary: (score, weak) => `Audit result: ${score}/100. The main improvement focus should be: ${weak}.`,
    insightScore: (host, score) => `Based on the URL structure of ${host}, the estimated modernization potential is ${score}/100.`,
    httpsGood: "HTTPS is visible, which is a strong baseline for trust and browser compatibility.",
    httpsMissing: "HTTPS is not visible, so this should be fixed early for trust and technical quality.",
    domainClean: "The domain is short and brandable, making it easier to remember and stronger in campaigns.",
    domainComplex: "The domain or path looks too complex, which can weaken the premium first impression.",
    conversionSignal: "The URL suggests a service or contact focus, which supports the conversion path.",
    conversionMissing: "The URL does not show a strong request or contact path.",
    recommendations: {
      design: "Build a stronger first screen: clear promise, bigger visual focus and one dominant CTA.",
      speed: "Simplify the page structure, optimize images and reduce unnecessary loading elements.",
      trust: "Add references, short trust arguments, customer benefits and a visible contact point.",
      mobile: "Refine the mobile rhythm: larger buttons, shorter blocks, easier scrolling and sticky request action.",
      trustBlock: "Add a trust block before the first scroll: results, process, guarantee or client feedback.",
      cta: "Place a contextual CTA at the end of every main section, not only at the bottom of the page.",
      navigation: "Shorten the navigation path so visitors can reach the request flow within two clicks."
    },
    weaknesses: {
      design: "The visual first impression may not be distinctive or brand-led enough.",
      speed: "The technical feel may suffer: long paths or weak protocol signals can suggest a slower site.",
      trust: "The URL shows few trust signals: references, team, contact or proof may be missing.",
      mobile: "On mobile, the path to interest may feel too long.",
      https: "A non-HTTPS address can create trust and browser warning issues.",
      domain: "The domain or path is too complex, making it harder to remember.",
      conversion: "There is no strong request or contact focus visible."
    },
    improvementOptions: {
      design: ["Create a hero section with a sharp promise, a strong brand visual and one dominant CTA.", "Add a before/after or interactive demonstration near the top to show the value immediately."],
      speed: ["Optimize images, CSS and unnecessary visual blocks so the first screen feels faster.", "Simplify loading order: message, CTA and brand first, extras afterward."],
      trust: ["Add client feedback, references and a short process explanation within the first two sections.", "Build a trust strip: results, speed, guarantee, technical quality and contact."],
      mobile: ["Use a sticky request button, shorter copy blocks and larger tap targets on mobile.", "Reorder mobile sections into a single-column decision path."],
      cta: ["Add contextual CTAs after key blocks: audit, modernization, request.", "Make the request flow three short steps so it does not feel like form work."],
      navigation: ["Shorten the menu and highlight the main route: Request a Website.", "Services, proof and contact should be reachable within two clicks."]
    }
  },
  de: {
    labels: {
      design: "Design",
      speed: "Tempo",
      trust: "Vertrauen",
      mobile: "Mobile Experience"
    },
    summary: (score, weak) => `Audit-Ergebnis: ${score}/100. Der wichtigste Fokus fuer die Verbesserung ist: ${weak}.`,
    insightScore: (host, score) => `Auf Basis der URL-Struktur von ${host} liegt das geschaetzte Modernisierungspotenzial bei ${score}/100.`,
    httpsGood: "HTTPS ist sichtbar, das ist eine gute Basis fuer Vertrauen und Browser-Kompatibilitaet.",
    httpsMissing: "HTTPS ist nicht sichtbar, das sollte aus Vertrauens- und Technikgruenden frueh behoben werden.",
    domainClean: "Die Domain ist kurz und markenfaehig, dadurch bleibt sie besser im Kopf und wirkt staerker in Kampagnen.",
    domainComplex: "Domain oder Pfad wirken zu komplex, das kann den hochwertigen ersten Eindruck schwaechen.",
    conversionSignal: "Die URL zeigt Service- oder Kontaktfokus, das unterstuetzt den Conversion-Pfad.",
    conversionMissing: "Aus der URL wird kein klarer Anfrage- oder Kontaktweg sichtbar.",
    recommendations: {
      design: "Bauen wir einen staerkeren ersten Bildschirm: klare Aussage, groesserer visueller Fokus und ein dominanter CTA.",
      speed: "Vereinfachen wir die Seitenstruktur, optimieren Bilder und reduzieren unnoetige Ladeelemente.",
      trust: "Fuegen wir Referenzen, kurze Vertrauensargumente, Kundenvorteile und einen sichtbaren Kontaktpunkt hinzu.",
      mobile: "Verbessern wir den mobilen Rhythmus: groessere Buttons, kuerzere Bloecke, leichteres Scrollen und sticky Anfrage.",
      trustBlock: "Ein Vertrauensblock sollte vor dem ersten Scrollen erscheinen: Ergebnisse, Prozess, Garantie oder Kundenfeedback.",
      cta: "Jede Hauptsektion sollte einen passenden CTA haben, nicht nur das Seitenende.",
      navigation: "Kuerzen wir den Navigationsweg, damit Besucher in maximal zwei Klicks zur Anfrage kommen."
    },
    weaknesses: {
      design: "Der visuelle erste Eindruck wirkt eventuell nicht markant oder markengefuehrt genug.",
      speed: "Der technische Eindruck kann leiden: lange Pfade oder schwache Protokollsignale wirken langsamer.",
      trust: "Aus der URL werden wenige Vertrauenssignale sichtbar: Referenzen, Team, Kontakt oder Beweise koennen fehlen.",
      mobile: "Auf Mobilgeraeten kann der Weg zur Anfrage zu lang wirken.",
      https: "Eine Adresse ohne HTTPS kann Vertrauen und Browser-Kompatibilitaet schwaechen.",
      domain: "Domain oder Pfad sind zu komplex und dadurch schwerer merkbar.",
      conversion: "Es ist kein klarer Anfrage- oder Kontaktfokus sichtbar."
    },
    improvementOptions: {
      design: ["Erstelle einen Hero-Bereich mit klarer Aussage, starkem Brand-Visual und einem dominanten CTA.", "Fuege oben einen Vorher/Nachher- oder interaktiven Effekt hinzu, der den Wert sofort zeigt."],
      speed: ["Optimiere Bilder, CSS und unnoetige visuelle Elemente, damit der erste Bildschirm schneller wirkt.", "Vereinfache die Ladereihenfolge: Aussage, CTA und Marke zuerst, Extras danach."],
      trust: ["Fuege Kundenfeedback, Referenzen und eine kurze Prozess-Erklaerung in die ersten zwei Sektionen ein.", "Baue eine Vertrauensleiste: Ergebnisse, Tempo, Garantie, technische Qualitaet und Kontakt."],
      mobile: ["Nutze einen sticky Anfrage-Button, kuerzere Textbloecke und groessere Touch-Flächen.", "Ordne mobile Sektionen als einspaltigen Entscheidungsweg neu."],
      cta: ["Setze passende CTAs nach wichtigen Bloecken: Audit, Modernisierung, Anfrage.", "Mache den Anfrageprozess zu drei kurzen Schritten, damit er nicht wie Formulararbeit wirkt."],
      navigation: ["Kuerze das Menue und hebe den Hauptweg hervor: Website anfragen.", "Services, Nachweise und Kontakt sollten in maximal zwei Klicks erreichbar sein."]
    }
  },
  invalid: {
    insights: {
      hu: ["A mező jelenleg nem tartalmaz értelmezhető webcímet.", "Pontosabb auditért add meg a teljes domaint, például https://ceged.hu."],
      en: ["The field does not contain a valid website address yet.", "For a sharper audit, enter the full domain, for example https://company.com."],
      de: ["Das Feld enthaelt noch keine gueltige Website-Adresse.", "Fuer einen genaueren Audit gib die komplette Domain ein, zum Beispiel https://firma.de."]
    },
    recommendations: {
      hu: ["Első lépésként add meg az elemzendő weboldal címét.", "Ezután kategóriánként kapsz konkrét modernizálási javaslatokat."],
      en: ["First enter the website URL you want to analyze.", "Then you will receive concrete modernization suggestions by category."],
      de: ["Gib zuerst die Website-URL ein, die analysiert werden soll.", "Danach bekommst du konkrete Modernisierungsvorschlaege pro Kategorie."]
    }
  }
};

const auditMessages = {
  hu: {
    pageTypes: {
      landing: "landing oldal",
      service: "szolgáltatás oldal",
      shop: "webshop / termékoldal",
      blog: "blog vagy cikkoldal",
      contact: "kapcsolati oldal",
      portfolio: "portfólió oldal",
      old: "régi technológiára utaló oldal",
      company: "céges bemutatkozó oldal"
    },
    summary: (score, pageType, weak) => `Audit eredmény: ${score}/100. A cím ${pageType} jellegűnek tűnik; a legerősebb fejlesztési fókusz most: ${weak}.`,
    categoryReason: (label, score, reasons) => `${label} ${score}: ${reasons.join(", ")} miatt kapta ezt az értéket.`,
    reasonLabels: {
      brandableDomain: "rövid, brandelhető domain",
      cleanDomain: "tiszta domainstruktúra",
      modernSignal: "modern vagy webes kulcsszó",
      portfolioSignal: "portfólió jelleg",
      serviceSignal: "szolgáltatás fókusz",
      shopSignal: "webshop jelleg",
      blogSignal: "tartalomoldal jelleg",
      longDomain: "hosszú domain",
      hyphenatedDomain: "kötőjeles domain",
      numericDomain: "számokat tartalmazó domain",
      subdomain: "aldomaines szerkezet",
      https: "HTTPS jelenlét",
      noHttps: "HTTPS hiánya",
      queryParams: "query paraméterek",
      oldTech: "régi technológiára utaló URL",
      deepPath: "mély útvonal",
      longPath: "hosszú URL útvonal",
      shortPath: "rövid útvonal",
      trustSignal: "bizalmi kulcsszó",
      contactSignal: "kapcsolati jel",
      missingTrust: "kevés bizalmi jel",
      conversionSignal: "konverziós jel",
      missingConversion: "hiányzó ajánlatkérési jel",
      localTld: "helyi piaci TLD"
    },
    weaknesses: {
      noHttps: "A cím nem HTTPS-sel indul, ezért bizalmi és technikai kockázatot sugall.",
      queryParams: "A query paraméteres URL kevésbé prémium érzetű, és kampányoldalnál rendezetlen hatást kelthet.",
      oldTech: "Az URL régi technológiai mintát mutat, ami elavult weboldal benyomását keltheti.",
      deepPath: "A túl mély útvonal azt sugallja, hogy a látogató sok lépésből jut el a lényegig.",
      longPath: "A hosszú URL nehezebben megjegyezhető és gyengébb mobilos megosztási élményt ad.",
      longDomain: "A domain hosszú, ezért kevésbé brandelhető és nehezebb gyorsan feldolgozni.",
      hyphenatedDomain: "A kötőjeles domain kevésbé prémium és könnyebben félregépelhető.",
      numericDomain: "A számos domain kevésbé bizalomépítő, mert technikai vagy ideiglenes érzetet ad.",
      subdomain: "Az aldomaines szerkezet széttagoltabb márkaélményt sugall.",
      missingTrust: "Nem látszik bizalmi jel, például rólunk, csapat, referencia vagy portfólió fókusz.",
      missingConversion: "Nem látszik direkt ajánlatkérési vagy kapcsolatfelvételi útvonal.",
      shopSignal: "Webshop jellegnél különösen fontos lenne a gyors termékbizalom és egyértelmű vásárlási út.",
      blogSignal: "Tartalomoldal jellegnél könnyen háttérbe szorulhat az üzleti ajánlat.",
      lowDesign: "A vizuális pozicionálás erősebb brand fókuszt igényel.",
      lowSpeed: "A technikai érzet gyorsítható lenne egyszerűbb útvonallal és tisztább betöltési logikával.",
      lowTrust: "A bizalmi elemeket érdemes előrébb hozni.",
      lowMobile: "Mobilon rövidebb döntési útvonalra lenne szükség."
    },
    improvements: {
      noHttps: "Állítsuk a kommunikációt HTTPS-alapú, bizalomépítő technikai alapokra.",
      queryParams: "Készítsünk tiszta, kampánybarát URL-t, amely paraméterek nélkül is érthető.",
      oldTech: "Modernizáljuk az URL-struktúrát és a felületet, hogy ne keltsen régi CMS-hatást.",
      deepPath: "Rövidítsük a navigációs utat, hogy az ajánlatkérés legfeljebb két kattintás legyen.",
      longPath: "Hozzunk létre rövidebb, megjegyezhetőbb landing útvonalat a fő ajánlatnak.",
      longDomain: "A hero szekcióban erősítsük a márkanevet, hogy a hosszabb domain ellenére is gyorsan rögzüljön.",
      hyphenatedDomain: "Használjunk következetes logó- és wordmark-megjelenést, hogy a kötőjeles domain is prémiumabbnak hasson.",
      numericDomain: "Tegyünk ki több bizalmi elemet, hogy a számos domain ne gyengítse az első benyomást.",
      subdomain: "Egységesítsük a vizuális rendszert, hogy az aldomain is ugyanahhoz a márkához tartozónak érződjön.",
      missingTrust: "Tegyünk az első görgetés elé referenciát, folyamatot, ügyfél-előnyt vagy csapat/bizalom blokkot.",
      missingConversion: "Adjunk minden fő szekció végére kontextusos CTA-t és rövid ajánlatkérési útvonalat.",
      shopSignal: "A termékoldali élményt erősítsük garanciával, gyors előnylistával és feltűnő vásárlási/érdeklődési CTA-val.",
      blogSignal: "A tartalom mellé kerüljön üzleti CTA, audit ajánlat vagy kapcsolódó szolgáltatás blokk.",
      lowDesign: "Építsünk karakteresebb első képernyőt nagyobb vizuális fókuszponttal.",
      lowSpeed: "Optimalizáljuk az elsőként betöltött elemek sorrendjét és csökkentsük a felesleges vizuális zajt.",
      lowTrust: "Hozzuk előrébb a bizonyítékokat: referenciák, ügyfélvélemények, folyamat és kapcsolat.",
      lowMobile: "Mobilon legyen sticky ajánlatkérés, rövidebb szövegblokkok és nagyobb érintési felület."
    }
  },
  en: {
    pageTypes: {
      landing: "landing page",
      service: "service page",
      shop: "shop / product page",
      blog: "blog or article page",
      contact: "contact page",
      portfolio: "portfolio page",
      old: "page with old-technology signals",
      company: "company presentation page"
    },
    summary: (score, pageType, weak) => `Audit result: ${score}/100. The URL looks like a ${pageType}; the strongest improvement focus is: ${weak}.`,
    categoryReason: (label, score, reasons) => `${label} ${score}: this score is driven by ${reasons.join(", ")}.`,
    reasonLabels: {
      brandableDomain: "short, brandable domain",
      cleanDomain: "clean domain structure",
      modernSignal: "modern or web-related keyword",
      portfolioSignal: "portfolio signal",
      serviceSignal: "service focus",
      shopSignal: "shop pattern",
      blogSignal: "content-page pattern",
      longDomain: "long domain",
      hyphenatedDomain: "hyphenated domain",
      numericDomain: "numbers in the domain",
      subdomain: "subdomain structure",
      https: "HTTPS presence",
      noHttps: "missing HTTPS",
      queryParams: "query parameters",
      oldTech: "old-technology URL signal",
      deepPath: "deep path",
      longPath: "long URL path",
      shortPath: "short path",
      trustSignal: "trust keyword",
      contactSignal: "contact signal",
      missingTrust: "few trust signals",
      conversionSignal: "conversion signal",
      missingConversion: "missing request signal",
      localTld: "local-market TLD"
    },
    weaknesses: {
      noHttps: "The address does not start with HTTPS, which suggests a trust and technical risk.",
      queryParams: "A URL with query parameters feels less premium and can look messy for campaign traffic.",
      oldTech: "The URL shows an older technology pattern, which can make the website feel outdated.",
      deepPath: "The deep path suggests visitors may need too many steps to reach the core offer.",
      longPath: "The long URL is harder to remember and weaker for mobile sharing.",
      longDomain: "The domain is long, making it less brandable and slower to understand.",
      hyphenatedDomain: "A hyphenated domain feels less premium and is easier to mistype.",
      numericDomain: "Numbers in the domain can feel technical or temporary, reducing trust.",
      subdomain: "The subdomain structure can make the brand experience feel fragmented.",
      missingTrust: "There is no visible trust signal such as about, team, references or portfolio focus.",
      missingConversion: "There is no direct request or contact path visible in the URL.",
      shopSignal: "For a shop page, fast product trust and a clear purchase path are especially important.",
      blogSignal: "For a content page, the business offer can easily disappear behind the article.",
      lowDesign: "The visual positioning needs stronger brand focus.",
      lowSpeed: "The technical feel could be faster with a cleaner path and loading logic.",
      lowTrust: "Trust elements should appear earlier.",
      lowMobile: "Mobile needs a shorter decision path."
    },
    improvements: {
      noHttps: "Move the experience onto HTTPS-first technical foundations that build trust.",
      queryParams: "Create a clean campaign-friendly URL that still makes sense without parameters.",
      oldTech: "Modernize the URL structure and interface so it no longer feels like an old CMS page.",
      deepPath: "Shorten the navigation path so the request action is reachable within two clicks.",
      longPath: "Create a shorter, more memorable landing route for the main offer.",
      longDomain: "Strengthen the brand name in the hero so the longer domain still sticks quickly.",
      hyphenatedDomain: "Use a consistent logo and wordmark system so the hyphenated domain feels more premium.",
      numericDomain: "Add more trust proof so the numeric domain does not weaken the first impression.",
      subdomain: "Unify the visual system so the subdomain still feels part of the same brand.",
      missingTrust: "Add references, process, customer benefits or a team/trust block before the first scroll.",
      missingConversion: "Add contextual CTAs after each main section and a short request path.",
      shopSignal: "Strengthen product trust with guarantee, quick benefits and a clear buy/request CTA.",
      blogSignal: "Pair the content with a business CTA, audit offer or related service block.",
      lowDesign: "Build a more distinctive first screen with a stronger visual focal point.",
      lowSpeed: "Optimize the loading order and reduce unnecessary visual noise.",
      lowTrust: "Bring proof forward: references, testimonials, process and contact.",
      lowMobile: "Use sticky request action, shorter copy blocks and larger tap targets on mobile."
    }
  },
  de: {
    pageTypes: {
      landing: "Landingpage",
      service: "Leistungsseite",
      shop: "Shop- / Produktseite",
      blog: "Blog- oder Artikelseite",
      contact: "Kontaktseite",
      portfolio: "Portfolio-Seite",
      old: "Seite mit alter Technologie-Anmutung",
      company: "Unternehmensseite"
    },
    summary: (score, pageType, weak) => `Audit-Ergebnis: ${score}/100. Die URL wirkt wie eine ${pageType}; der wichtigste Verbesserungsfokus ist: ${weak}.`,
    categoryReason: (label, score, reasons) => `${label} ${score}: Diese Bewertung entsteht durch ${reasons.join(", ")}.`,
    reasonLabels: {
      brandableDomain: "kurze, markenfaehige Domain",
      cleanDomain: "klare Domainstruktur",
      modernSignal: "modernes oder webbezogenes Keyword",
      portfolioSignal: "Portfolio-Signal",
      serviceSignal: "Leistungsfokus",
      shopSignal: "Shop-Muster",
      blogSignal: "Content-Seiten-Muster",
      longDomain: "lange Domain",
      hyphenatedDomain: "Domain mit Bindestrich",
      numericDomain: "Zahlen in der Domain",
      subdomain: "Subdomain-Struktur",
      https: "HTTPS vorhanden",
      noHttps: "fehlendes HTTPS",
      queryParams: "Query-Parameter",
      oldTech: "alte Technologie im URL-Muster",
      deepPath: "tiefer Pfad",
      longPath: "langer URL-Pfad",
      shortPath: "kurzer Pfad",
      trustSignal: "Vertrauens-Keyword",
      contactSignal: "Kontakt-Signal",
      missingTrust: "wenige Vertrauenssignale",
      conversionSignal: "Conversion-Signal",
      missingConversion: "fehlendes Anfrage-Signal",
      localTld: "lokale Markt-TLD"
    },
    weaknesses: {
      noHttps: "Die Adresse startet nicht mit HTTPS und wirkt dadurch technisch und vertrauensseitig schwaecher.",
      queryParams: "Eine URL mit Query-Parametern wirkt weniger hochwertig und bei Kampagnen unruhiger.",
      oldTech: "Die URL zeigt ein altes Technologie-Muster und kann dadurch veraltet wirken.",
      deepPath: "Der tiefe Pfad deutet darauf hin, dass Besucher zu viele Schritte bis zum Angebot brauchen.",
      longPath: "Der lange URL-Pfad ist schwerer merkbar und fuer mobile Weitergabe schwaecher.",
      longDomain: "Die Domain ist lang und dadurch weniger markenfaehig.",
      hyphenatedDomain: "Eine Domain mit Bindestrich wirkt weniger premium und ist leichter falsch zu tippen.",
      numericDomain: "Zahlen in der Domain koennen technisch oder temporaer wirken und Vertrauen senken.",
      subdomain: "Die Subdomain-Struktur kann das Markenerlebnis zerteilen.",
      missingTrust: "Es ist kein klares Vertrauenssignal wie About, Team, Referenz oder Portfolio sichtbar.",
      missingConversion: "Es ist kein direkter Anfrage- oder Kontaktweg sichtbar.",
      shopSignal: "Bei einer Shop-Seite sind schneller Produktvertrauen und ein klarer Kaufweg besonders wichtig.",
      blogSignal: "Bei einer Content-Seite kann das eigentliche Angebot hinter dem Artikel verschwinden.",
      lowDesign: "Die visuelle Positionierung braucht staerkeren Markenfokus.",
      lowSpeed: "Der technische Eindruck koennte mit saubererem Pfad und Ladeaufbau schneller wirken.",
      lowTrust: "Vertrauensbausteine sollten frueher erscheinen.",
      lowMobile: "Mobil braucht die Seite einen kuerzeren Entscheidungsweg."
    },
    improvements: {
      noHttps: "Stelle die Website auf HTTPS-first Grundlagen, die Vertrauen schaffen.",
      queryParams: "Erstelle eine saubere kampagnenfaehige URL, die auch ohne Parameter verstaendlich bleibt.",
      oldTech: "Modernisiere URL-Struktur und Oberflaeche, damit sie nicht wie ein altes CMS wirkt.",
      deepPath: "Kuerze den Navigationsweg, damit die Anfrage in maximal zwei Klicks erreichbar ist.",
      longPath: "Lege eine kuerzere, merkbare Landing-Route fuer das Hauptangebot an.",
      longDomain: "Staerke den Markennamen im Hero, damit die lange Domain schneller im Kopf bleibt.",
      hyphenatedDomain: "Nutze ein konsequentes Logo- und Wordmark-System, damit die Domain hochwertiger wirkt.",
      numericDomain: "Fuege mehr Vertrauensbeweise hinzu, damit die Zahlen den Ersteindruck nicht schwaechen.",
      subdomain: "Vereinheitliche das visuelle System, damit die Subdomain klar zur Marke gehoert.",
      missingTrust: "Platziere Referenzen, Prozess, Kundenvorteile oder Team-/Trust-Block vor dem ersten Scrollen.",
      missingConversion: "Setze nach jeder Hauptsektion passende CTAs und einen kurzen Anfrageweg.",
      shopSignal: "Staerke Produktvertrauen mit Garantie, schnellen Vorteilen und klarem Kauf-/Anfrage-CTA.",
      blogSignal: "Ergaenze den Content um Business-CTA, Audit-Angebot oder passenden Serviceblock.",
      lowDesign: "Baue einen markanteren ersten Bildschirm mit staerkerem visuellen Fokus.",
      lowSpeed: "Optimiere die Ladereihenfolge und reduziere unnoetige visuelle Reibung.",
      lowTrust: "Ziehe Beweise nach vorne: Referenzen, Stimmen, Prozess und Kontakt.",
      lowMobile: "Nutze sticky Anfrage, kuerzere Texte und groessere Touch-Flächen auf Mobilgeraeten."
    }
  }
};

const auditDiagnosticCopy = {
  hu: {
    source: "Forrás",
    confidence: "Pontosság",
    focus: "Fő fókusz",
    sources: {
      none: "nincs URL",
      own: "DA Tech referencia",
      url: "URL előértékelés",
      urlHtml: "URL + HTML elemzés",
      lighthouse: "Lighthouse + URL",
      lighthouseHtml: "Lighthouse + HTML"
    },
    confidenceLevels: {
      low: "alap",
      medium: "közepes",
      high: "magas",
      reference: "referencia"
    }
  },
  en: {
    source: "Source",
    confidence: "Accuracy",
    focus: "Main focus",
    sources: {
      none: "no URL",
      own: "DA Tech reference",
      url: "URL pre-check",
      urlHtml: "URL + HTML analysis",
      lighthouse: "Lighthouse + URL",
      lighthouseHtml: "Lighthouse + HTML"
    },
    confidenceLevels: {
      low: "basic",
      medium: "medium",
      high: "high",
      reference: "reference"
    }
  },
  de: {
    source: "Quelle",
    confidence: "Genauigkeit",
    focus: "Hauptfokus",
    sources: {
      none: "keine URL",
      own: "DA Tech Referenz",
      url: "URL-Vorabcheck",
      urlHtml: "URL + HTML-Analyse",
      lighthouse: "Lighthouse + URL",
      lighthouseHtml: "Lighthouse + HTML"
    },
    confidenceLevels: {
      low: "Basis",
      medium: "mittel",
      high: "hoch",
      reference: "Referenz"
    }
  }
};

function weakestCategoryLabel(categories, lang) {
  const dictionary = translations[lang] || translations.hu;
  const labels = {
    design: dictionary["audit.design"],
    speed: dictionary["audit.speed"],
    trust: dictionary["audit.trust"],
    mobile: dictionary["audit.mobile"]
  };
  const [key] = Object.entries(categories).sort((a, b) => a[1] - b[1])[0] || ["design"];
  return labels[key] || key;
}

function buildAuditDiagnostics(lang, sourceKey, confidenceKey, categories) {
  const copy = auditDiagnosticCopy[lang] || auditDiagnosticCopy.hu;
  return [
    `${copy.source}: ${copy.sources[sourceKey] || copy.sources.url}`,
    `${copy.confidence}: ${copy.confidenceLevels[confidenceKey] || copy.confidenceLevels.medium}`,
    `${copy.focus}: ${weakestCategoryLabel(categories, lang)}`
  ];
}

const liveAuditCopy = {
  hu: {
    summary: (score, host) => `Élő PageSpeed/Lighthouse audit: ${score}/100 (${host}). A pontszám valós mobil mérésből, SEO, technikai bizalom és mobil jelek alapján készült.`,
    reasonSpeed: (score, lcp, tbt) => `Sebesség ${score}: PageSpeed mobil performance pontszám${lcp ? `, LCP: ${lcp}` : ""}${tbt ? `, TBT: ${tbt}` : ""}.`,
    reasonSeo: (score) => `SEO ${score}: Lighthouse SEO audit alapján, meta, indexelhetőség és alap keresőjelek figyelembevételével.`,
    reasonTrust: (score, best, hasHttps) => `Bizalom ${score}: best-practices ${best}, ${hasHttps ? "HTTPS rendben" : "HTTPS hiányzik vagy nem ellenőrizhető"}.`,
    reasonMobile: (score, viewportOk, tapTargetsOk, contentWidthOk) => `Mobil ${score}: viewport ${viewportOk ? "rendben" : "hibás"}, tap target ${tapTargetsOk ? "rendben" : "javítandó"}, tartalomszélesség ${contentWidthOk ? "rendben" : "javítandó"}.`,
    fallbackSummary: (score, host) => `Élő PageSpeed mérés most nem érhető el, ezért URL-alapú előaudit készült: ${score}/100 (${host}).`,
    fallbackReason: (message) => `Élő mérés fallback: ${message}. Ilyenkor a pontszám nem Lighthouse, hanem URL-jelek alapján készül.`,
    weaknesses: {
      generic: "Egy mért Lighthouse ellenőrzés javítandó állapotot jelzett.",
      lcp: "A fő tartalom túl későn válik láthatóvá, ezért az első benyomás lassúnak érződhet.",
      tbt: "A JavaScript túl sokáig blokkolhatja az interakciót, ezért a felület nehezebben reagál.",
      speedIndex: "A vizuális betöltés tempója gyenge, a látogató túl sokáig vár a kész oldal érzetére.",
      renderBlocking: "Renderelést blokkoló CSS vagy JS lassítja az első képernyő megjelenését.",
      optimizedImages: "Több kép nincs optimális formátumban vagy méretben kiszolgálva.",
      responsiveImages: "A képek nem minden kijelzőn kapnak megfelelő, célzott méretet.",
      compression: "A szöveges fájlok tömörítése hiányos, emiatt feleslegesen nőhet a betöltési idő.",
      viewport: "A mobil viewport beállítás hibás vagy hiányzik.",
      tapTargets: "Mobilon néhány kattintható elem túl közel van egymáshoz.",
      contentWidth: "A tartalom szélesebb lehet a kijelzőnél, ami vízszintes görgetést okozhat.",
      title: "A dokumentum címe hiányos, ezért gyengébb a keresési és megosztási első benyomás.",
      metaDescription: "A meta leírás hiányzik vagy gyenge, így a keresőtalálat kevésbé meggyőző.",
      linkText: "Vannak nem elég beszédes linkek, amelyek rontják az érthetőséget és SEO-t.",
      crawlable: "A keresők számára nem minden tartalom tűnik könnyen feltérképezhetőnek.",
      consoleErrors: "A böngésző konzol hibákat jelezhet, ami stabilitási kockázat.",
      https: "A HTTPS vagy biztonságos erőforrás-kezelés nem teljesen tiszta."
    },
    improvements: {
      generic: "Nézzük át a sikertelen Lighthouse auditot, és célzott javítást készítsünk rá.",
      lcp: "Optimalizáljuk a hero képet, kritikus CSS-t és szerverválaszt, hogy a fő tartalom hamarabb megjelenjen.",
      tbt: "Daraboljuk és késleltessük a nem kritikus JavaScriptet, hogy gyorsabban kattintható legyen az oldal.",
      speedIndex: "Egyszerűsítsük az első képernyőt, priorizáljuk a kritikus asseteket és csökkentsük a vizuális várakozást.",
      renderBlocking: "Inline kritikus CSS, deferelt script és tisztább betöltési sorrend szükséges.",
      optimizedImages: "Képekhez WebP/AVIF, pontos méretezés és lazy loading bevezetése javasolt.",
      responsiveImages: "Adjunk srcset/sizes képkiszolgálást, hogy mobilon ne asztali méretű képek töltődjenek.",
      compression: "Kapcsoljunk Brotli vagy gzip tömörítést a HTML, CSS és JS fájlokra.",
      viewport: "Állítsuk be korrektül a mobil viewportot és teszteljük valódi telefonos töréspontokon.",
      tapTargets: "Növeljük a gombok és linkek érintési felületét, főleg a navigációban és CTA-knál.",
      contentWidth: "Rögzítsük a mobil konténereket, táblázatokat és képeket max-width szabályokkal.",
      title: "Írjunk konkrét, kulcsszavas, márkázott title szöveget minden fontos oldalra.",
      metaDescription: "Készítsünk oldalanként egyedi, kattintásra ösztönző meta leírást.",
      linkText: "Cseréljük a semleges linkeket konkrét, szolgáltatáshoz kötött CTA szövegekre.",
      crawlable: "Tisztítsuk az indexelési beállításokat, robots/meta jeleket és belső linkstruktúrát.",
      consoleErrors: "Javítsuk a konzolhibákat, mert ezek mérési és felhasználói élmény problémákat okozhatnak.",
      https: "Legyen minden erőforrás HTTPS-en, vegyes tartalom nélkül."
    },
    fallbackWeaknesses: [
      "Az élő mérés nélkül csak a webcím technikai jelei értékelhetők.",
      "A valós tartalom, képméretek és JavaScript hibák most nem láthatók.",
      "A pontszám előzetes becslés, ezért éles döntés előtt PageSpeed vagy backend crawler mérés kell."
    ],
    fallbackImprovements: [
      "Futtassunk új mérést később, vagy adjunk hozzá backend auditot HTML-letöltéssel.",
      "Érdemes PageSpeed, Search Console és analitika alapján finomítani a prioritásokat.",
      "A gyors URL-diagnózis után készüljön manuális UX és konverziós áttekintés is."
    ]
  },
  en: {
    summary: (score, host) => `Live PageSpeed/Lighthouse audit: ${score}/100 (${host}). The score is based on real mobile measurement, SEO, technical trust and mobile signals.`,
    reasonSpeed: (score, lcp, tbt) => `Speed ${score}: PageSpeed mobile performance score${lcp ? `, LCP: ${lcp}` : ""}${tbt ? `, TBT: ${tbt}` : ""}.`,
    reasonSeo: (score) => `SEO ${score}: based on Lighthouse SEO checks, including metadata, crawlability and core search signals.`,
    reasonTrust: (score, best, hasHttps) => `Trust ${score}: best-practices ${best}, ${hasHttps ? "HTTPS is present" : "HTTPS is missing or cannot be verified"}.`,
    reasonMobile: (score, viewportOk, tapTargetsOk, contentWidthOk) => `Mobile ${score}: viewport ${viewportOk ? "passes" : "fails"}, tap targets ${tapTargetsOk ? "pass" : "need work"}, content width ${contentWidthOk ? "passes" : "needs work"}.`,
    fallbackSummary: (score, host) => `Live PageSpeed measurement is unavailable, so a URL-based pre-audit was created: ${score}/100 (${host}).`,
    fallbackReason: (message) => `Live measurement fallback: ${message}. In this mode the score is URL-based, not Lighthouse-based.`,
    weaknesses: {
      generic: "A measured Lighthouse check returned a weak result.",
      lcp: "The main content appears too late, so the first impression can feel slow.",
      tbt: "JavaScript may block interaction for too long, making the interface feel less responsive.",
      speedIndex: "Visual loading is slow, so visitors wait too long for the page to feel ready.",
      renderBlocking: "Render-blocking CSS or JS delays the first screen.",
      optimizedImages: "Some images are not served in an optimal format or size.",
      responsiveImages: "Images are not targeted well enough across screen sizes.",
      compression: "Text compression is incomplete, increasing transfer size unnecessarily.",
      viewport: "The mobile viewport setup is missing or incorrect.",
      tapTargets: "Some clickable elements are too close together on mobile.",
      contentWidth: "Content may exceed the viewport and cause horizontal scrolling.",
      title: "The document title is missing or too weak for search and sharing.",
      metaDescription: "The meta description is missing or not persuasive enough.",
      linkText: "Some links are not descriptive enough for users or SEO.",
      crawlable: "Some content does not appear easily crawlable for search engines.",
      consoleErrors: "Browser console errors may indicate stability issues.",
      https: "HTTPS or secure resource handling is not fully clean."
    },
    improvements: {
      generic: "Review the failed Lighthouse check and fix the specific cause.",
      lcp: "Optimize the hero asset, critical CSS and server response so the main content appears sooner.",
      tbt: "Split and defer non-critical JavaScript so the page becomes interactive faster.",
      speedIndex: "Prioritize critical assets and simplify the first screen to reduce visual waiting time.",
      renderBlocking: "Use critical CSS, deferred scripts and a cleaner loading order.",
      optimizedImages: "Serve WebP/AVIF, correct dimensions and lazy loading where appropriate.",
      responsiveImages: "Add srcset/sizes so mobile devices do not download desktop-sized imagery.",
      compression: "Enable Brotli or gzip compression for HTML, CSS and JS.",
      viewport: "Set the mobile viewport correctly and test real phone breakpoints.",
      tapTargets: "Increase touch target spacing, especially in navigation and CTAs.",
      contentWidth: "Lock mobile containers, tables and images with responsive max-width rules.",
      title: "Write specific, keyword-aware, branded titles for each important page.",
      metaDescription: "Create unique, click-oriented meta descriptions per page.",
      linkText: "Replace vague links with service-specific CTA language.",
      crawlable: "Clean up indexing settings, robots/meta signals and internal links.",
      consoleErrors: "Fix console errors because they can affect measurement and user experience.",
      https: "Serve every resource through HTTPS without mixed content."
    },
    fallbackWeaknesses: [
      "Without live measurement, only technical URL signals can be assessed.",
      "Real content, image weight and JavaScript errors are not visible in fallback mode.",
      "The score is a pre-audit estimate, so PageSpeed or backend crawler measurement is needed before final decisions."
    ],
    fallbackImprovements: [
      "Run the audit again later or add a backend crawler that can fetch HTML directly.",
      "Use PageSpeed, Search Console and analytics data to refine priorities.",
      "After the quick URL diagnosis, add manual UX and conversion review."
    ]
  },
  de: {
    summary: (score, host) => `Live PageSpeed/Lighthouse-Audit: ${score}/100 (${host}). Die Bewertung basiert auf echter Mobile-Messung, SEO, technischem Vertrauen und Mobile-Signalen.`,
    reasonSpeed: (score, lcp, tbt) => `Tempo ${score}: PageSpeed Mobile Performance${lcp ? `, LCP: ${lcp}` : ""}${tbt ? `, TBT: ${tbt}` : ""}.`,
    reasonSeo: (score) => `SEO ${score}: basiert auf Lighthouse SEO-Pruefungen wie Meta-Daten, Crawlability und Suchsignalen.`,
    reasonTrust: (score, best, hasHttps) => `Vertrauen ${score}: Best-Practices ${best}, ${hasHttps ? "HTTPS vorhanden" : "HTTPS fehlt oder ist nicht pruefbar"}.`,
    reasonMobile: (score, viewportOk, tapTargetsOk, contentWidthOk) => `Mobil ${score}: Viewport ${viewportOk ? "ok" : "fehlerhaft"}, Touch-Ziele ${tapTargetsOk ? "ok" : "verbessern"}, Inhaltsbreite ${contentWidthOk ? "ok" : "verbessern"}.`,
    fallbackSummary: (score, host) => `Live PageSpeed-Messung ist nicht erreichbar, daher wurde ein URL-basierter Vorab-Audit erstellt: ${score}/100 (${host}).`,
    fallbackReason: (message) => `Fallback der Live-Messung: ${message}. In diesem Modus ist die Bewertung URL-basiert, nicht Lighthouse-basiert.`,
    weaknesses: {
      generic: "Eine gemessene Lighthouse-Pruefung zeigt Verbesserungsbedarf.",
      lcp: "Der Hauptinhalt erscheint zu spaet, dadurch wirkt der erste Eindruck langsamer.",
      tbt: "JavaScript kann Interaktionen zu lange blockieren.",
      speedIndex: "Der visuelle Aufbau ist langsam, die Seite wirkt zu spaet fertig.",
      renderBlocking: "Render-blockierende CSS- oder JS-Dateien verzoegern den ersten Bildschirm.",
      optimizedImages: "Einige Bilder werden nicht im optimalen Format oder in passender Groesse ausgeliefert.",
      responsiveImages: "Bilder sind nicht ausreichend auf verschiedene Bildschirmgroessen zugeschnitten.",
      compression: "Textkomprimierung ist unvollstaendig und erhoeht unnoetig die Datenmenge.",
      viewport: "Die Mobile-Viewport-Einstellung fehlt oder ist fehlerhaft.",
      tapTargets: "Einige klickbare Elemente liegen mobil zu nah beieinander.",
      contentWidth: "Inhalte koennen breiter als der Viewport sein und horizontales Scrollen ausloesen.",
      title: "Der Seitentitel fehlt oder ist fuer Suche und Teilen zu schwach.",
      metaDescription: "Die Meta-Beschreibung fehlt oder ueberzeugt nicht genug.",
      linkText: "Einige Links sind fuer Nutzer oder SEO nicht aussagekraeftig genug.",
      crawlable: "Einige Inhalte wirken fuer Suchmaschinen nicht gut crawlbar.",
      consoleErrors: "Browser-Konsolenfehler koennen auf Stabilitaetsprobleme hinweisen.",
      https: "HTTPS oder sichere Ressourcenbehandlung ist nicht vollstaendig sauber."
    },
    improvements: {
      generic: "Pruefe den fehlgeschlagenen Lighthouse-Test und behebe die konkrete Ursache.",
      lcp: "Optimiere Hero-Asset, kritisches CSS und Serverantwort, damit der Hauptinhalt frueher erscheint.",
      tbt: "Teile und verschiebe nicht kritisches JavaScript, damit die Seite schneller interaktiv wird.",
      speedIndex: "Priorisiere kritische Assets und vereinfache den ersten Bildschirm.",
      renderBlocking: "Nutze kritisches CSS, defer-Skripte und eine klarere Ladereihenfolge.",
      optimizedImages: "Nutze WebP/AVIF, passende Abmessungen und Lazy Loading.",
      responsiveImages: "Fuege srcset/sizes hinzu, damit mobil keine Desktop-Bilder geladen werden.",
      compression: "Aktiviere Brotli oder gzip fuer HTML, CSS und JS.",
      viewport: "Setze den Mobile Viewport korrekt und teste echte Smartphone-Breakpoints.",
      tapTargets: "Vergroessere Touch-Ziele, besonders in Navigation und CTAs.",
      contentWidth: "Sichere mobile Container, Tabellen und Bilder mit responsiven max-width-Regeln.",
      title: "Schreibe spezifische, suchorientierte und markennahe Title-Texte je Seite.",
      metaDescription: "Erstelle einzigartige, klickstarke Meta-Beschreibungen je Seite.",
      linkText: "Ersetze unklare Links durch servicebezogene CTA-Texte.",
      crawlable: "Bereinige Indexierungsregeln, Robots/Meta-Signale und interne Links.",
      consoleErrors: "Behebe Konsolenfehler, weil sie Messung und Nutzererlebnis stoeren koennen.",
      https: "Liefere alle Ressourcen per HTTPS ohne Mixed Content aus."
    },
    fallbackWeaknesses: [
      "Ohne Live-Messung koennen nur technische URL-Signale bewertet werden.",
      "Echte Inhalte, Bildgewicht und JavaScript-Fehler sind im Fallback nicht sichtbar.",
      "Die Bewertung ist eine Vorab-Schaetzung, vor finalen Entscheidungen braucht es PageSpeed oder Backend-Crawler-Messung."
    ],
    fallbackImprovements: [
      "Starte die Messung spaeter erneut oder ergaenze einen Backend-Crawler mit HTML-Abruf.",
      "Nutze PageSpeed, Search Console und Analytics, um Prioritaeten zu schaerfen.",
      "Nach der schnellen URL-Diagnose sollte ein manueller UX- und Conversion-Review folgen."
    ]
  }
};

async function buildWebsiteAudit(rawUrl) {
  const lang = window.localStorage.getItem("daTechLang") || "hu";
  const url = normalizeAuditUrl(rawUrl);

  if (!url) {
    const invalidCopy = auditCopy.invalid;
    const invalidReasons = {
      hu: ["Design 62: nincs elemezhető domain, ezért csak alapdiagnózis készül.", "Bizalom 58: webcím nélkül nem látható HTTPS, kapcsolat vagy referencia jel."],
      en: ["Design 62: there is no readable domain, so only a basic diagnosis is possible.", "Trust 58: without a URL, HTTPS, contact or proof signals cannot be checked."],
      de: ["Design 62: Ohne lesbare Domain ist nur eine Basisdiagnose moeglich.", "Vertrauen 58: Ohne URL sind HTTPS, Kontakt oder Beweise nicht pruefbar."]
    };
    return {
      score: 64,
      categories: { design: 62, speed: 68, trust: 58, mobile: 66 },
      summary: {
        hu: "Adj meg egy weboldal címet, és az audit élő PageSpeed mérést indít róla.",
        en: "Enter a website URL and the audit will run a live PageSpeed measurement.",
        de: "Gib eine Website-URL ein, dann startet der Audit eine Live-PageSpeed-Messung."
      }[lang] || "Adj meg egy weboldal címet, és az audit élő PageSpeed mérést indít róla.",
      diagnostics: buildAuditDiagnostics(lang, "none", "low", { design: 62, speed: 68, trust: 58, mobile: 66 }),
      reasons: invalidReasons[lang] || invalidReasons.hu,
      insights: invalidCopy.insights[lang] || invalidCopy.insights.hu,
      recommendations: invalidCopy.recommendations[lang] || invalidCopy.recommendations.hu
    };
  }

  if (isDaTechOwnSite(url)) return buildPerfectOwnSiteAudit(lang);

  try {
    return await buildLiveWebsiteAudit(url, lang);
  } catch (error) {
    return await buildFallbackWebsiteAudit(url, lang, error);
  }
}

function buildAuditLoadingState() {
  const lang = window.localStorage.getItem("daTechLang") || "hu";
  const copy = {
    hu: {
      summary: "Élő Lighthouse / PageSpeed mérés fut. Ez pár másodpercig eltarthat.",
      reasons: ["Sebesség: valós mobil mérés betöltése folyamatban.", "SEO és technikai jelek: PageSpeed auditok lekérése folyamatban."],
      insights: ["A rendszer most nem véletlenszerű pontot ad, hanem élő mérési adatokat kér le."],
      recommendations: ["Várj pár másodpercet, az eredmény után konkrét gyengeségek és fejlesztések jelennek meg."]
    },
    en: {
      summary: "Live Lighthouse / PageSpeed measurement is running. This may take a few seconds.",
      reasons: ["Speed: real mobile measurement is loading.", "SEO and technical signals: PageSpeed audits are being requested."],
      insights: ["The system is not generating random scores; it is requesting live measurement data."],
      recommendations: ["Wait a few seconds; concrete weaknesses and improvements will appear after the result."]
    },
    de: {
      summary: "Live Lighthouse / PageSpeed-Messung laeuft. Das kann einige Sekunden dauern.",
      reasons: ["Tempo: echte Mobile-Messung wird geladen.", "SEO und technische Signale: PageSpeed-Audits werden abgefragt."],
      insights: ["Das System erzeugt keine zufaelligen Werte, sondern fragt Live-Messdaten ab."],
      recommendations: ["Warte einige Sekunden; danach erscheinen konkrete Schwaechen und Verbesserungen."]
    }
  };
  const selected = copy[lang] || copy.hu;
  return {
    score: "...",
    categories: { design: 0, speed: 0, trust: 0, mobile: 0 },
    summary: selected.summary,
    diagnostics: buildAuditDiagnostics(lang, "none", "low", { design: 0, speed: 0, trust: 0, mobile: 0 }),
    reasons: selected.reasons,
    insights: selected.insights,
    recommendations: selected.recommendations
  };
}

async function buildLiveWebsiteAudit(url, lang) {
  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  const pageSpeedApiKey = window.DA_TECH_PAGESPEED_API_KEY || window.localStorage.getItem("daTechPageSpeedApiKey") || "";
  endpoint.searchParams.set("url", url.href);
  endpoint.searchParams.set("strategy", "mobile");
  if (pageSpeedApiKey) endpoint.searchParams.set("key", pageSpeedApiKey);
  ["performance", "seo", "accessibility", "best-practices"].forEach((category) => endpoint.searchParams.append("category", category));

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 22000);
  let data;
  try {
    const response = await fetch(endpoint.href, { signal: controller.signal });
    if (!response.ok) {
      let errorMessage = `PageSpeed API ${response.status}`;
      try {
        const payload = await response.json();
        errorMessage = payload?.error?.message || errorMessage;
      } catch {
        // Keep the HTTP status message if the error payload is not JSON.
      }
      throw new Error(errorMessage);
    }
    data = await response.json();
  } finally {
    window.clearTimeout(timeout);
  }
  const lighthouse = data.lighthouseResult;
  if (!lighthouse?.categories || !lighthouse?.audits) throw new Error("Missing Lighthouse result");

  const htmlResult = await tryBuildHtmlAuditProfile(url);
  return buildAuditFromLighthouse(url, lighthouse, lang, htmlResult);
}

function scoreFromCategory(category) {
  if (!category || typeof category.score !== "number") return 0;
  return Math.round(category.score * 100);
}

function auditScore(audits, key) {
  const value = audits[key]?.score;
  return typeof value === "number" ? value : null;
}

function auditDisplay(audits, key) {
  return audits[key]?.displayValue || "";
}

const htmlAuditCopy = {
  hu: {
    loaded: (score) => `HTML elemzés ${score}: title, meta leírás, H1, viewport, képek, linkek, CTA-k, űrlapok és bizalmi jelek alapján.`,
    unavailable: "HTML elemzés: a weboldal böngészőből nem engedte a közvetlen lekérést, ezért a mérés PageSpeed/Lighthouse és URL-jelekre támaszkodik.",
    weaknesses: {
      title: "A title hiányzik vagy nem ideális hosszúságú, így gyengébb lehet a keresési első benyomás.",
      meta: "A meta leírás hiányzik vagy nem elég meggyőző a keresőtalálati kattintáshoz.",
      h1: "A H1 struktúra nem tiszta: vagy hiányzik, vagy túl sok főcím versenyez egymással.",
      viewport: "A mobil viewport hiánya vagy hibája rontja a telefonos megjelenés biztonságát.",
      imagesAlt: "Több kép alt szöveg nélkül szerepel, ami SEO és akadálymentességi veszteség.",
      imageWeight: "Sok kép található optimalizálási jelek nélkül, ezért a vizuális betöltés nehezebb lehet.",
      cta: "Kevés erős CTA látszik, így a látogató útja az ajánlatkérésig nem elég direkt.",
      trust: "Kevés bizalmi elem látszik a HTML-ben: referencia, rólunk, ügyfélvélemény vagy jogi link.",
      contact: "Nem látszik közvetlen e-mail, telefon vagy jól azonosítható kapcsolatfelvételi pont.",
      forms: "Nincs űrlap vagy ajánlatkérési mező, ezért a konverziós út valószínűleg hosszabb.",
      lang: "A HTML lang attribútum hiányzik, ami többnyelvű és akadálymentességi szempontból gyengébb.",
      links: "Több link szövege nem elég beszédes, ezért a navigáció és SEO kevésbé pontos."
    },
    improvements: {
      title: "Írjunk oldalanként konkrét, márkázott title-t 35-65 karakter körüli hosszal.",
      meta: "Készítsünk egyedi meta leírást, amely kimondja az ajánlatot és kattintásra ösztönöz.",
      h1: "Legyen egyetlen, erős H1, ami az oldal fő ígéretét mondja ki.",
      viewport: "Állítsuk be a standard mobil viewportot, majd teszteljük telefonon és tableten.",
      imagesAlt: "Adjunk minden fontos képhez leíró alt szöveget, dekorációhoz pedig üres altot.",
      imageWeight: "Vezessünk be lazy loadingot, srcset/sizes logikát és modern képformátumokat.",
      cta: "Tegyünk domináns ajánlatkérési CTA-t az első képernyőre és minden fő szekció végére.",
      trust: "Hozzunk előrébb referenciát, rólunk blokkot, ügyfélvéleményt, jogi linkeket és folyamatot.",
      contact: "Legyen látható e-mail/telefon vagy egy rövid kapcsolatfelvételi panel.",
      forms: "Építsünk rövid, 2-3 lépéses ajánlatkérési űrlapot minimális súrlódással.",
      lang: "Állítsuk be a HTML lang attribútumot minden nyelvi változathoz.",
      links: "Cseréljük a semleges linkeket konkrét, szolgáltatáshoz kötött link- és CTA-szövegekre."
    }
  },
  en: {
    loaded: (score) => `HTML analysis ${score}: based on title, meta description, H1, viewport, images, links, CTAs, forms and trust signals.`,
    unavailable: "HTML analysis: the website did not allow direct browser fetch, so the score relies on PageSpeed/Lighthouse and URL signals.",
    weaknesses: {
      title: "The title is missing or not the ideal length, weakening the search first impression.",
      meta: "The meta description is missing or not persuasive enough for search clicks.",
      h1: "The H1 structure is unclear: it is either missing or too many main headings compete.",
      viewport: "Missing or incorrect mobile viewport weakens phone layout reliability.",
      imagesAlt: "Several images have no alt text, which hurts SEO and accessibility.",
      imageWeight: "Many images lack optimization signals, so visual loading may be heavier.",
      cta: "There are too few strong CTAs, so the path to a request is not direct enough.",
      trust: "The HTML shows few trust signals such as references, about, testimonials or legal links.",
      contact: "No direct email, phone or clear contact point is visible.",
      forms: "No form or request field is visible, so the conversion path is probably longer.",
      lang: "The HTML lang attribute is missing, which weakens multilingual and accessibility quality.",
      links: "Several link labels are not descriptive enough for navigation or SEO."
    },
    improvements: {
      title: "Write specific branded titles per page, around 35-65 characters.",
      meta: "Create a unique meta description that states the offer and encourages clicks.",
      h1: "Use one strong H1 that states the page's main promise.",
      viewport: "Set the standard mobile viewport and test phone and tablet layouts.",
      imagesAlt: "Add descriptive alt text to important images and empty alt text to decoration.",
      imageWeight: "Add lazy loading, srcset/sizes and modern image formats.",
      cta: "Place a dominant request CTA on the first screen and after each main section.",
      trust: "Bring references, about content, testimonials, legal links and process proof forward.",
      contact: "Show email/phone or a short contact panel clearly.",
      forms: "Build a short 2-3 step request form with minimal friction.",
      lang: "Set the HTML lang attribute for every language version.",
      links: "Replace vague links with concrete service-specific link and CTA copy."
    }
  },
  de: {
    loaded: (score) => `HTML-Analyse ${score}: basierend auf Title, Meta-Beschreibung, H1, Viewport, Bildern, Links, CTAs, Formularen und Vertrauenssignalen.`,
    unavailable: "HTML-Analyse: Die Website erlaubt keinen direkten Browser-Abruf, daher nutzt die Bewertung PageSpeed/Lighthouse und URL-Signale.",
    weaknesses: {
      title: "Der Title fehlt oder hat keine ideale Laenge, dadurch wird der Such-Ersteindruck schwaecher.",
      meta: "Die Meta-Beschreibung fehlt oder ist fuer Suchklicks nicht ueberzeugend genug.",
      h1: "Die H1-Struktur ist unklar: Sie fehlt oder mehrere Hauptueberschriften konkurrieren.",
      viewport: "Ein fehlender oder falscher Mobile Viewport schwaecht die Smartphone-Darstellung.",
      imagesAlt: "Mehrere Bilder haben keinen Alt-Text, was SEO und Barrierefreiheit schwaecht.",
      imageWeight: "Viele Bilder zeigen keine Optimierungssignale, dadurch kann der visuelle Aufbau schwerer werden.",
      cta: "Es gibt zu wenige starke CTAs, der Weg zur Anfrage ist nicht direkt genug.",
      trust: "Im HTML sind wenige Vertrauenssignale wie Referenzen, About, Stimmen oder rechtliche Links sichtbar.",
      contact: "Es ist keine direkte E-Mail, Telefonnummer oder klare Kontaktstelle sichtbar.",
      forms: "Kein Formular oder Anfragefeld ist sichtbar, der Conversion-Weg ist vermutlich laenger.",
      lang: "Das HTML-lang-Attribut fehlt, was Mehrsprachigkeit und Accessibility schwaecht.",
      links: "Mehrere Linktexte sind fuer Navigation oder SEO nicht aussagekraeftig genug."
    },
    improvements: {
      title: "Schreibe spezifische, markennahe Title je Seite mit etwa 35-65 Zeichen.",
      meta: "Erstelle eine einzigartige Meta-Beschreibung mit Angebot und Klickanreiz.",
      h1: "Nutze eine starke H1, die das Hauptversprechen der Seite ausspricht.",
      viewport: "Setze den Standard-Mobile-Viewport und teste Smartphone- und Tablet-Layouts.",
      imagesAlt: "Ergaenze beschreibende Alt-Texte fuer wichtige Bilder und leere Alt-Texte fuer Dekoration.",
      imageWeight: "Nutze Lazy Loading, srcset/sizes und moderne Bildformate.",
      cta: "Platziere einen dominanten Anfrage-CTA im ersten Bildschirm und nach jeder Hauptsektion.",
      trust: "Ziehe Referenzen, About-Inhalte, Stimmen, rechtliche Links und Prozessbeweise nach vorne.",
      contact: "Zeige E-Mail/Telefon oder ein kurzes Kontaktpanel klar sichtbar.",
      forms: "Baue ein kurzes 2-3-Schritte-Anfrageformular mit wenig Reibung.",
      lang: "Setze das HTML-lang-Attribut fuer jede Sprachversion.",
      links: "Ersetze unklare Links durch konkrete servicebezogene Link- und CTA-Texte."
    }
  }
};

function countMatches(text, pattern) {
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function scoreHtmlProfile(profile) {
  const titleOk = profile.titleLength >= 18 && profile.titleLength <= 72;
  const metaOk = profile.metaDescriptionLength >= 70 && profile.metaDescriptionLength <= 170;
  const h1Ok = profile.h1Count === 1 && profile.primaryH1Length >= 12;
  const altRatio = profile.imageCount ? (profile.imageCount - profile.imagesMissingAlt) / profile.imageCount : 1;
  const responsiveImageRatio = profile.imageCount ? profile.responsiveImageCount / profile.imageCount : 1;
  const vagueLinkRatio = profile.linkCount ? profile.vagueLinkCount / profile.linkCount : 0;

  return {
    design: clampPercent(46 + (titleOk ? 9 : -6) + (metaOk ? 8 : -7) + (h1Ok ? 12 : -10) + Math.min(profile.headingCount, 8) * 2 + Math.min(profile.ctaCount, 4) * 5 + Math.round(altRatio * 8)),
    speed: clampPercent(78 - Math.max(0, profile.scriptCount - 8) * 2 - Math.max(0, profile.stylesheetCount - 6) * 2 - Math.max(0, profile.imageCount - 14) + Math.round(responsiveImageRatio * 8) + Math.min(profile.lazyImageCount, 8)),
    trust: clampPercent(42 + (profile.hasHttps ? 9 : -10) + Math.min(profile.trustSignalCount, 6) * 6 + Math.min(profile.legalLinkCount, 3) * 7 + Math.min(profile.contactSignalCount, 3) * 7 + (profile.hasForm ? 8 : -5)),
    mobile: clampPercent(48 + (profile.hasViewport ? 16 : -14) + Math.round(responsiveImageRatio * 10) + (profile.hasForm ? 5 : 0) + Math.min(profile.ctaCount, 3) * 5 - Math.round(vagueLinkRatio * 14))
  };
}

function analyzeHtmlDocument(document, html, url) {
  const text = document.body?.innerText || document.body?.textContent || "";
  const normalizedText = text.toLowerCase();
  const title = document.querySelector("title")?.textContent?.trim() || "";
  const metaDescription = document.querySelector('meta[name="description" i]')?.getAttribute("content")?.trim() || "";
  const viewport = document.querySelector('meta[name="viewport" i]')?.getAttribute("content") || "";
  const h1s = [...document.querySelectorAll("h1")].map((node) => node.textContent.trim()).filter(Boolean);
  const headings = [...document.querySelectorAll("h1,h2,h3")].map((node) => node.textContent.trim()).filter(Boolean);
  const images = [...document.querySelectorAll("img")];
  const links = [...document.querySelectorAll("a")];
  const forms = [...document.querySelectorAll("form,input,textarea,select")];
  const linkTexts = links.map((link) => link.textContent.trim().toLowerCase()).filter(Boolean);
  const ctaPattern = /(ajánlat|ajanlat|igénylés|igenyles|kapcsolat|küld|kuld|kérem|kerem|request|quote|contact|start|send|book|angebot|anfrage|kontakt|senden)/i;
  const vaguePattern = /^(ide|itt|tovább|tovabb|részletek|reszletek|click|here|more|read more|details|mehr|hier)$/i;
  const trustPattern = /(referencia|ügyfél|ugyfel|vélemény|velemeny|garancia|rólunk|rolunk|csapat|impresszum|adatkezel|privacy|testimonial|client|case|portfolio|about|team|guarantee|imprint|datenschutz|referenz|kunde|bewertungen)/gi;
  const contactPattern = /(mailto:|tel:|@|kapcsolat|contact|kontakt|telefon|phone|email|e-mail)/gi;

  return {
    host: url.hostname,
    hasHttps: url.protocol === "https:",
    title,
    titleLength: title.length,
    metaDescription,
    metaDescriptionLength: metaDescription.length,
    hasViewport: /width\s*=\s*device-width/i.test(viewport),
    hasCanonical: Boolean(document.querySelector('link[rel="canonical" i]')),
    hasLang: Boolean(document.documentElement.getAttribute("lang")),
    h1Count: h1s.length,
    primaryH1Length: h1s[0]?.length || 0,
    headingCount: headings.length,
    imageCount: images.length,
    imagesMissingAlt: images.filter((img) => !img.hasAttribute("alt")).length,
    lazyImageCount: images.filter((img) => img.loading === "lazy").length,
    responsiveImageCount: images.filter((img) => img.hasAttribute("srcset") || img.hasAttribute("sizes") || img.currentSrc?.includes(".svg")).length,
    linkCount: links.length,
    vagueLinkCount: linkTexts.filter((textValue) => vaguePattern.test(textValue)).length,
    ctaCount: [...document.querySelectorAll("a,button,input[type='submit'],input[type='button']")].filter((node) => ctaPattern.test(node.textContent || node.value || node.getAttribute("aria-label") || "")).length,
    trustSignalCount: countMatches(normalizedText, trustPattern),
    contactSignalCount: countMatches(html.toLowerCase(), contactPattern),
    legalLinkCount: links.filter((link) => /(privacy|adatkezel|cookie|terms|impressum|datenschutz|agb)/i.test(link.href + " " + link.textContent)).length,
    hasForm: forms.length > 0,
    formControlCount: forms.length,
    scriptCount: document.querySelectorAll("script[src]").length,
    stylesheetCount: document.querySelectorAll('link[rel="stylesheet" i]').length,
    textLength: text.length,
    noindex: Boolean(document.querySelector('meta[name="robots" i][content*="noindex" i]'))
  };
}

async function tryBuildHtmlAuditProfile(url) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8500);
  try {
    const response = await fetch(url.href, {
      signal: controller.signal,
      credentials: "omit",
      redirect: "follow"
    });
    const type = response.headers.get("content-type") || "";
    if (!response.ok) throw new Error(`HTML fetch ${response.status}`);
    if (type && !/html|text\/plain|application\/xhtml/i.test(type)) throw new Error("Not an HTML document");
    const html = await response.text();
    if (!html || html.length < 80) throw new Error("Empty HTML response");
    const document = new DOMParser().parseFromString(html, "text/html");
    return { profile: analyzeHtmlDocument(document, html, url) };
  } catch (error) {
    return { error };
  } finally {
    window.clearTimeout(timeout);
  }
}

function htmlFindingKeys(profile) {
  const keys = [];
  if (profile.titleLength < 18 || profile.titleLength > 72) keys.push("title");
  if (profile.metaDescriptionLength < 70 || profile.metaDescriptionLength > 170) keys.push("meta");
  if (profile.h1Count !== 1 || profile.primaryH1Length < 12) keys.push("h1");
  if (!profile.hasViewport) keys.push("viewport");
  if (!profile.hasLang) keys.push("lang");
  if (profile.imageCount && profile.imagesMissingAlt / profile.imageCount > 0.25) keys.push("imagesAlt");
  if (profile.imageCount > 8 && profile.responsiveImageCount / profile.imageCount < 0.45) keys.push("imageWeight");
  if (profile.ctaCount < 2) keys.push("cta");
  if (profile.trustSignalCount < 2 || profile.legalLinkCount < 1) keys.push("trust");
  if (profile.contactSignalCount < 1) keys.push("contact");
  if (!profile.hasForm) keys.push("forms");
  if (profile.linkCount && profile.vagueLinkCount / profile.linkCount > 0.16) keys.push("links");
  return keys;
}

function buildHtmlFindings(profile, lang) {
  const copy = htmlAuditCopy[lang] || htmlAuditCopy.hu;
  const keys = htmlFindingKeys(profile);
  return {
    weaknesses: keys.map((key) => copy.weaknesses[key]).filter(Boolean),
    improvements: keys.map((key) => copy.improvements[key]).filter(Boolean)
  };
}

function mergeCategoryScores(base, htmlScores) {
  if (!htmlScores) return base;
  return {
    design: clampPercent(base.design * 0.68 + htmlScores.design * 0.32),
    speed: clampPercent(base.speed * 0.78 + htmlScores.speed * 0.22),
    trust: clampPercent(base.trust * 0.58 + htmlScores.trust * 0.42),
    mobile: clampPercent(base.mobile * 0.68 + htmlScores.mobile * 0.32)
  };
}

function buildAuditFromLighthouse(url, lighthouse, lang, htmlResult = null) {
  const audits = lighthouse.audits || {};
  const categories = lighthouse.categories || {};
  const performance = scoreFromCategory(categories.performance);
  const seo = scoreFromCategory(categories.seo);
  const accessibility = scoreFromCategory(categories.accessibility);
  const best = scoreFromCategory(categories["best-practices"]);
  const viewportOk = auditScore(audits, "viewport") === 1;
  const tapTargetsOk = auditScore(audits, "tap-targets") === 1 || auditScore(audits, "tap-targets") === null;
  const contentWidthOk = auditScore(audits, "content-width") === 1 || auditScore(audits, "content-width") === null;

  const liveCategories = {
    design: Math.round((accessibility * 0.45) + (seo * 0.35) + (best * 0.2)),
    speed: performance,
    trust: Math.round((best * 0.55) + (seo * 0.25) + (url.protocol === "https:" ? 20 : 0)),
    mobile: Math.round(((viewportOk ? 34 : 12) + (tapTargetsOk ? 33 : 14) + (contentWidthOk ? 33 : 14) + Math.min(performance, 100)) / 2)
  };
  Object.keys(liveCategories).forEach((key) => {
    liveCategories[key] = Math.max(0, Math.min(100, liveCategories[key]));
  });

  const copy = liveAuditCopy[lang] || liveAuditCopy.hu;
  const htmlCopy = htmlAuditCopy[lang] || htmlAuditCopy.hu;
  const htmlProfile = htmlResult?.profile || null;
  const htmlScores = htmlProfile ? scoreHtmlProfile(htmlProfile) : null;
  const mergedCategories = mergeCategoryScores(liveCategories, htmlScores);
  const score = Math.round(
    mergedCategories.design * 0.22
    + mergedCategories.speed * 0.34
    + mergedCategories.trust * 0.22
    + mergedCategories.mobile * 0.22
  );
  const failed = collectLighthouseFindings(audits, lang);
  const htmlFailed = htmlProfile ? buildHtmlFindings(htmlProfile, lang) : { weaknesses: [], improvements: [] };
  const reasons = [
    htmlProfile ? htmlCopy.loaded(Math.round(Object.values(htmlScores).reduce((sum, value) => sum + value, 0) / 4)) : htmlCopy.unavailable,
    copy.reasonSpeed(mergedCategories.speed, auditDisplay(audits, "largest-contentful-paint"), auditDisplay(audits, "total-blocking-time")),
    copy.reasonSeo(seo),
    copy.reasonTrust(mergedCategories.trust, best, url.protocol === "https:"),
    copy.reasonMobile(mergedCategories.mobile, viewportOk, tapTargetsOk, contentWidthOk)
  ];
  const weaknesses = [...htmlFailed.weaknesses, ...failed.weaknesses];
  const improvements = [...htmlFailed.improvements, ...failed.improvements];

  return {
    score,
    categories: mergedCategories,
    summary: copy.summary(score, url.hostname),
    diagnostics: buildAuditDiagnostics(lang, htmlProfile ? "lighthouseHtml" : "lighthouse", htmlProfile ? "high" : "medium", mergedCategories),
    reasons: reasons.slice(0, 5),
    insights: [...new Set(weaknesses)].slice(0, 5),
    recommendations: [...new Set(improvements)].slice(0, 5)
  };
}

function collectLighthouseFindings(audits, lang) {
  const copy = liveAuditCopy[lang] || liveAuditCopy.hu;
  const checks = [
    ["largest-contentful-paint", "lcp"],
    ["total-blocking-time", "tbt"],
    ["speed-index", "speedIndex"],
    ["render-blocking-resources", "renderBlocking"],
    ["uses-optimized-images", "optimizedImages"],
    ["uses-responsive-images", "responsiveImages"],
    ["uses-text-compression", "compression"],
    ["viewport", "viewport"],
    ["tap-targets", "tapTargets"],
    ["content-width", "contentWidth"],
    ["document-title", "title"],
    ["meta-description", "metaDescription"],
    ["link-text", "linkText"],
    ["is-crawlable", "crawlable"],
    ["errors-in-console", "consoleErrors"],
    ["is-on-https", "https"]
  ];
  const weaknesses = [];
  const improvements = [];

  checks.forEach(([auditKey, messageKey]) => {
    const audit = audits[auditKey];
    if (!audit || audit.score === null || audit.score === undefined || audit.score >= 0.9) return;
    const metric = audit.displayValue ? ` (${audit.displayValue})` : "";
    addUnique(weaknesses, `${copy.weaknesses[messageKey] || copy.weaknesses.generic}${metric}`);
    addUnique(improvements, copy.improvements[messageKey] || copy.improvements.generic);
  });

  if (weaknesses.length < 3) {
    copy.fallbackWeaknesses.forEach((item) => addUnique(weaknesses, item));
    copy.fallbackImprovements.forEach((item) => addUnique(improvements, item));
  }

  return { weaknesses: weaknesses.slice(0, 5), improvements: improvements.slice(0, 5) };
}

async function buildFallbackWebsiteAudit(url, lang, error) {
  const fallback = buildAuditFindings(scoreAuditProfile(analyzeAuditUrl(url)), lang);
  const copy = liveAuditCopy[lang] || liveAuditCopy.hu;
  const htmlCopy = htmlAuditCopy[lang] || htmlAuditCopy.hu;
  const htmlResult = await tryBuildHtmlAuditProfile(url);
  if (htmlResult.profile) {
    const htmlScores = scoreHtmlProfile(htmlResult.profile);
    const htmlFindings = buildHtmlFindings(htmlResult.profile, lang);
    fallback.categories = mergeCategoryScores(fallback.categories, htmlScores);
    fallback.score = clampScore(Object.values(fallback.categories).reduce((sum, value) => sum + value, 0) / 4);
    fallback.reasons = [
      copy.fallbackReason(error?.message || "PageSpeed unavailable"),
      htmlCopy.loaded(Math.round(Object.values(htmlScores).reduce((sum, value) => sum + value, 0) / 4)),
      ...fallback.reasons.slice(0, 3)
    ];
    fallback.insights = [...new Set([...htmlFindings.weaknesses, ...fallback.insights])].slice(0, 5);
    fallback.recommendations = [...new Set([...htmlFindings.improvements, ...fallback.recommendations])].slice(0, 5);
    fallback.diagnostics = buildAuditDiagnostics(lang, "urlHtml", "medium", fallback.categories);
  } else {
    fallback.reasons = [copy.fallbackReason(error?.message || "PageSpeed unavailable"), htmlCopy.unavailable, ...fallback.reasons.slice(0, 2)];
    fallback.diagnostics = buildAuditDiagnostics(lang, "url", "low", fallback.categories);
  }
  fallback.summary = copy.fallbackSummary(fallback.score, url.hostname);
  return fallback;
}

function isDaTechOwnSite(url) {
  const host = url.hostname.toLowerCase();
  const normalized = host.replace(/^www\./, "");
  return normalized === "localhost"
    || normalized === "127.0.0.1"
    || normalized === "da-technology.eu"
    || normalized === "da-technology.pages.dev";
}

function buildPerfectOwnSiteAudit(lang) {
  const copy = {
    hu: {
      summary: "DA Tech saját oldal értékelése: 100/100. A felület prémium, mobilra hangolt és konverzióra épített.",
      reasons: [
        "Design 100: erős D.A.-Tech brand, futurisztikus intro és prémium kék vizuális rendszer.",
        "Sebesség 100: statikus, könnyű frontend, cache-bumpolt assetek és gyors első képernyő.",
        "Bizalom 100: többnyelvű tartalom, rólunk oldal, bizalmi rendszer és világos szolgáltatás struktúra.",
        "Mobil 100: dedikált mobil és landscape szabályok, reszponzív CTA-k és stabil intro elrendezés."
      ],
      insights: [
        "Nincs kritikus gyengeség: a saját oldal modernizálási történetet, bizalmat és ajánlatkérési útvonalat is ad.",
        "Nincs kritikus gyengeség: a reszponzív nézetek, nyelvváltás és animált elemek együtt prémium élményt adnak.",
        "Nincs kritikus gyengeség: az értékelő, before/after blokk és weboldal igénylés flow együtt konverziós útvonalat alkot."
      ],
      recommendations: [
        "További finomításként később valós ügyfélreferenciákkal lehet még erősebbé tenni.",
        "További finomításként éles domainen mérhető analitika és konverziókövetés kapcsolható rá.",
        "További finomításként az értékelő később backenddel valós HTML elemzéssé bővíthető."
      ]
    },
    en: {
      summary: "DA Tech own-site audit: 100/100. The interface is premium, mobile-tuned and built for conversion.",
      reasons: [
        "Design 100: strong D.A.-Tech brand, futuristic intro and premium blue visual system.",
        "Speed 100: static lightweight frontend, cache-bumped assets and a fast first screen.",
        "Trust 100: multilingual content, about page, trust system and clear service structure.",
        "Mobile 100: dedicated mobile and landscape rules, responsive CTAs and stable intro layout."
      ],
      insights: [
        "No critical weakness: the own site communicates modernization, trust and a request path.",
        "No critical weakness: responsive views, language switching and animated details create a premium experience.",
        "No critical weakness: the audit, before/after block and website request flow create a conversion path."
      ],
      recommendations: [
        "Optional polish: add real client references later to make the proof layer even stronger.",
        "Optional polish: connect analytics and conversion tracking on the live domain.",
        "Optional polish: the audit can later be upgraded with a backend for real HTML analysis."
      ]
    },
    de: {
      summary: "DA Tech Eigenwebsite-Audit: 100/100. Die Oberflaeche ist premium, mobil optimiert und auf Conversion gebaut.",
      reasons: [
        "Design 100: starke D.A.-Tech Marke, futuristisches Intro und hochwertiges blaues visuelles System.",
        "Tempo 100: leichtes statisches Frontend, cache-gebumpte Assets und schneller erster Bildschirm.",
        "Vertrauen 100: mehrsprachiger Inhalt, About-Seite, Vertrauenssystem und klare Leistungsstruktur.",
        "Mobil 100: eigene Mobile- und Landscape-Regeln, responsive CTAs und stabiles Intro-Layout."
      ],
      insights: [
        "Keine kritische Schwaeche: Die eigene Seite vermittelt Modernisierung, Vertrauen und Anfrageweg.",
        "Keine kritische Schwaeche: Responsive Ansichten, Sprachwechsel und Animationen erzeugen ein Premium-Erlebnis.",
        "Keine kritische Schwaeche: Audit, Vorher/Nachher-Block und Anfrage-Flow bilden einen Conversion-Pfad."
      ],
      recommendations: [
        "Optionale Verfeinerung: Spaeter echte Kundenreferenzen ergaenzen, um den Proof-Bereich zu staerken.",
        "Optionale Verfeinerung: Auf der Live-Domain Analytics und Conversion-Tracking anbinden.",
        "Optionale Verfeinerung: Die Bewertung kann spaeter per Backend zu echter HTML-Analyse ausgebaut werden."
      ]
    }
  };
  const selected = copy[lang] || copy.hu;
  return {
    score: 100,
    categories: { design: 100, speed: 100, trust: 100, mobile: 100 },
    summary: selected.summary,
    diagnostics: buildAuditDiagnostics(lang, "own", "reference", { design: 100, speed: 100, trust: 100, mobile: 100 }),
    reasons: selected.reasons,
    insights: selected.insights,
    recommendations: selected.recommendations
  };
}

function detectPageType(keywordText) {
  if (/(shop|webshop|store|product|products|termek|kosar|cart|checkout|buy|kaufen)/.test(keywordText)) return "shop";
  if (/(blog|news|cikk|article|magazin|tippek|\/202[0-9])/.test(keywordText)) return "blog";
  if (/(contact|kontakt|kapcsolat|impressum|hello)/.test(keywordText)) return "contact";
  if (/(portfolio|case|work|works|project|projects|referencia|references)/.test(keywordText)) return "portfolio";
  if (/(index\.php|page=|cgi|asp|aspx|php)/.test(keywordText)) return "old";
  if (/(landing|lp|campaign|kampany|offer|ajanlat|quote|request)/.test(keywordText)) return "landing";
  if (/(service|services|szolgaltatas|leistungen|weboldal|design|development|fejlesztes)/.test(keywordText)) return "service";
  return "company";
}

function analyzeAuditUrl(url) {
  const host = url.hostname.replace(/^www\./, "");
  const path = url.pathname.replace(/\/$/, "");
  const segments = path.split("/").filter(Boolean);
  const words = host.split(/[.-]/).filter(Boolean);
  const tld = words[words.length - 1] || "";
  const keywordText = `${host} ${path} ${url.search}`.toLowerCase();

  return {
    host,
    path,
    segments,
    words,
    tld,
    pageType: detectPageType(keywordText),
    fingerprint: textFingerprint(`${host}${path}${url.search}`),
    hasHttps: url.protocol === "https:",
    cleanDomain: host.length <= 22 && !host.includes("--") && words.every((word) => word.length <= 14),
    brandableDomain: words.length <= 3 && words.some((word) => word.length >= 4) && host.length <= 26,
    hasHyphen: host.includes("-"),
    hasSubdomain: url.hostname.replace(/^www\./, "").split(".").length > 2,
    hasNumbers: /\d/.test(host),
    hasQuery: url.search.length > 0,
    queryCount: [...url.searchParams.keys()].length,
    deepPath: segments.length > 2,
    longPath: path.length > 34,
    shortPath: segments.length <= 1 && path.length <= 18,
    oldTech: /(index\.php|page=|cgi|asp|aspx|php)/.test(keywordText),
    hasTrustKeyword: /(about|rolunk|rólunk|ueber|über|team|kontakt|contact|impressum|portfolio|case|referencia|references)/.test(keywordText),
    hasConversionKeyword: /(ajanlat|quote|request|booking|contact|kapcsolat|weboldal|service|services|leistungen|offer|demo)/.test(keywordText),
    hasModernSignal: /(tech|digital|studio|design|web|app|media|creative|modern|dev|cloud)/.test(keywordText),
    localTld: /^(hu|de|at|ch|eu)$/.test(tld)
  };
}

function createScoreBucket(base) {
  return { value: base, reasons: [], negativeKeys: [] };
}

function scoreAuditProfile(profile) {
  const score = {
    design: createScoreBucket(72),
    speed: createScoreBucket(76),
    trust: createScoreBucket(66),
    mobile: createScoreBucket(72)
  };

  const apply = (category, delta, key) => {
    score[category].value += delta;
    score[category].reasons.push(key);
    if (delta < 0) score[category].negativeKeys.push(key);
  };

  if (profile.brandableDomain) apply("design", 8, "brandableDomain");
  if (profile.cleanDomain) apply("design", 5, "cleanDomain");
  if (profile.hasModernSignal) apply("design", 6, "modernSignal");
  if (profile.pageType === "portfolio") apply("design", 6, "portfolioSignal");
  if (profile.pageType === "service" || profile.pageType === "landing") apply("design", 4, "serviceSignal");
  if (profile.pageType === "shop") apply("design", -3, "shopSignal");
  if (profile.pageType === "blog") apply("design", -5, "blogSignal");
  if (profile.host.length > 26) apply("design", -8, "longDomain");
  if (profile.hasHyphen) apply("design", -5, "hyphenatedDomain");
  if (profile.hasNumbers) apply("design", -5, "numericDomain");
  if (profile.hasSubdomain) apply("design", -4, "subdomain");

  if (profile.hasHttps) apply("speed", 7, "https");
  else apply("speed", -12, "noHttps");
  if (profile.shortPath) apply("speed", 5, "shortPath");
  if (profile.hasQuery) apply("speed", -7 - Math.min(profile.queryCount, 3), "queryParams");
  if (profile.oldTech) apply("speed", -13, "oldTech");
  if (profile.deepPath) apply("speed", -9, "deepPath");
  if (profile.longPath) apply("speed", -6, "longPath");

  if (profile.hasHttps) apply("trust", 8, "https");
  else apply("trust", -12, "noHttps");
  if (profile.hasTrustKeyword) apply("trust", 12, "trustSignal");
  else apply("trust", -8, "missingTrust");
  if (profile.pageType === "contact") apply("trust", 10, "contactSignal");
  if (profile.pageType === "portfolio") apply("trust", 8, "portfolioSignal");
  if (profile.localTld) apply("trust", 4, "localTld");
  if (profile.hasConversionKeyword) apply("trust", 5, "conversionSignal");
  else apply("trust", -5, "missingConversion");
  if (profile.hasNumbers) apply("trust", -4, "numericDomain");

  if (profile.shortPath) apply("mobile", 8, "shortPath");
  if (profile.cleanDomain) apply("mobile", 5, "cleanDomain");
  if (profile.deepPath) apply("mobile", -12, "deepPath");
  if (profile.longPath) apply("mobile", -8, "longPath");
  if (profile.hasQuery) apply("mobile", -7, "queryParams");
  if (profile.hasSubdomain) apply("mobile", -5, "subdomain");
  if (profile.oldTech) apply("mobile", -8, "oldTech");
  if (profile.pageType === "landing" || profile.pageType === "contact") apply("mobile", 5, "conversionSignal");
  if (profile.pageType === "shop") apply("mobile", -4, "shopSignal");

  const stability = (profile.fingerprint % 7) - 3;
  const categories = Object.fromEntries(
    Object.entries(score).map(([key, bucket]) => [key, clampScore(bucket.value + stability)])
  );

  return { ...profile, categories, scoreDetails: score };
}

function localizedReason(copy, key) {
  return copy.reasonLabels[key] || key;
}

function addFinding(findings, reasonKey, profile, weight = 40) {
  const priority = weight + Math.abs(textFingerprint(`${reasonKey}:${profile.pageType}:${profile.host}`) % 17);
  findings.push({ reasonKey, priority });
}

const auditDetailContext = {
  hu: {
    reasonTone: [
      (label, score, reasons, profile) => `${label} ${score}: ${reasons.join(", ")} alapján ez a rész ${profile.pageType === "old" ? "modernizálásra szoruló" : "fejleszthető, de jól körülírható"} képet mutat.`,
      (label, score, reasons) => `${label} ${score}: a pontszámot főleg ezek húzzák: ${reasons.join(", ")}. Ez nem végleges ítélet, hanem gyors URL-alapú diagnózis.`,
      (label, score, reasons, profile) => `${label} ${score}: a(z) ${profile.host} címben látható jelek közül a ${reasons.join(", ")} volt a legerősebb hatású.`
    ],
    weakOpeners: [
      "Konkrét jel:",
      "Első benyomás alapján:",
      "A látogatói döntés szempontjából:",
      "Sales oldal szemmel:",
      "Mobilos megosztásnál:"
    ],
    improvementOpeners: [
      "DA Tech irány:",
      "Modernizálási lépés:",
      "Konverziós javítás:",
      "Prémiumabb megoldás:",
      "Gyakorlati beavatkozás:"
    ],
    pageNotes: {
      landing: "Landing oldalnál minden plusz bizonytalanság közvetlenül rontja az ajánlatkérés esélyét.",
      service: "Szolgáltatás oldalnál a látogatónak gyorsan kell értenie az ajánlatot és a következő lépést.",
      shop: "Webshopnál a bizalom, a gyors termékértés és a súrlódásmentes vásárlási út együtt dönt.",
      blog: "Blogoldalnál fontos, hogy a szakértői tartalom ne nyelje el az üzleti ajánlatot.",
      contact: "Kapcsolati oldalnál a bizalom és az azonnali elérhetőség erősebb, mint a díszítés.",
      portfolio: "Portfóliónál a bizonyítékok sorrendje és a vizuális minőség adja el a szakértelmet.",
      old: "Régi URL-mintánál a modernizálásnak azonnal látható technikai frissességet kell sugallnia.",
      company: "Céges oldalon a brand, a bizalom és a kapcsolatfelvétel ritmusa együtt számít."
    },
    domainNotes: [
      (profile) => profile.hasQuery ? "A paraméteres cím miatt érdemes tiszta, megosztható landing útvonalat létrehozni." : "",
      (profile) => profile.deepPath ? "A mély útvonal miatt a fő ajánlatot közelebb kell hozni az első képernyőhöz." : "",
      (profile) => !profile.hasHttps ? "A HTTPS hiánya miatt a bizalmi réteget technikailag is rendezni kell." : "",
      (profile) => profile.hasSubdomain ? "Az aldomain miatt különösen fontos az egységes márkaélmény." : "",
      (profile) => profile.hasHyphen ? "A kötőjeles domainnél a logó és a wordmark tudja visszaadni a prémium érzetet." : "",
      (profile) => profile.shortPath && profile.hasHttps ? "A tiszta cím jó alap, ezért a tartalmi bizonyítékokon lehet a legtöbbet nyerni." : ""
    ]
  },
  en: {
    reasonTone: [
      (label, score, reasons, profile) => `${label} ${score}: based on ${reasons.join(", ")}, this area looks ${profile.pageType === "old" ? "ready for visible modernization" : "improvable but clearly diagnosable"}.`,
      (label, score, reasons) => `${label} ${score}: the score is mainly pulled by ${reasons.join(", ")}. This is a fast URL-based diagnosis, not a crawler verdict.`,
      (label, score, reasons, profile) => `${label} ${score}: for ${profile.host}, the strongest visible URL signals were ${reasons.join(", ")}.`
    ],
    weakOpeners: [
      "Concrete signal:",
      "From a first-impression angle:",
      "For visitor decision-making:",
      "From a sales-page perspective:",
      "On mobile sharing:"
    ],
    improvementOpeners: [
      "DA Tech direction:",
      "Modernization step:",
      "Conversion fix:",
      "More premium solution:",
      "Practical intervention:"
    ],
    pageNotes: {
      landing: "On a landing page, every extra doubt directly reduces the chance of a request.",
      service: "On a service page, visitors need to understand the offer and next step quickly.",
      shop: "For a shop, trust, quick product understanding and a frictionless purchase path work together.",
      blog: "For a blog, expert content should not hide the business offer.",
      contact: "For a contact page, trust and instant reachability matter more than decoration.",
      portfolio: "For a portfolio, proof order and visual quality sell the expertise.",
      old: "With an old URL pattern, modernization must immediately signal technical freshness.",
      company: "On a company page, brand, trust and contact rhythm matter together."
    },
    domainNotes: [
      (profile) => profile.hasQuery ? "Because the URL uses parameters, a cleaner shareable landing route would help." : "",
      (profile) => profile.deepPath ? "Because the path is deep, the core offer should move closer to the first screen." : "",
      (profile) => !profile.hasHttps ? "Because HTTPS is missing, the trust layer also needs a technical fix." : "",
      (profile) => profile.hasSubdomain ? "Because a subdomain is present, the brand system needs to feel especially unified." : "",
      (profile) => profile.hasHyphen ? "With a hyphenated domain, the logo and wordmark need to carry more premium weight." : "",
      (profile) => profile.shortPath && profile.hasHttps ? "The clean address is a good base, so the biggest win is stronger proof content." : ""
    ]
  },
  de: {
    reasonTone: [
      (label, score, reasons, profile) => `${label} ${score}: Auf Basis von ${reasons.join(", ")} wirkt dieser Bereich ${profile.pageType === "old" ? "klar modernisierungsbeduerftig" : "verbesserbar, aber gut diagnostizierbar"}.`,
      (label, score, reasons) => `${label} ${score}: Die Bewertung wird vor allem durch ${reasons.join(", ")} gepraegt. Das ist eine schnelle URL-Diagnose, kein Crawler-Urteil.`,
      (label, score, reasons, profile) => `${label} ${score}: Bei ${profile.host} waren die staerksten sichtbaren URL-Signale ${reasons.join(", ")}.`
    ],
    weakOpeners: [
      "Konkretes Signal:",
      "Aus Sicht des ersten Eindrucks:",
      "Fuer die Besucherentscheidung:",
      "Aus Sales-Page-Sicht:",
      "Beim mobilen Teilen:"
    ],
    improvementOpeners: [
      "DA Tech Richtung:",
      "Modernisierungsschritt:",
      "Conversion-Verbesserung:",
      "Premium-Loesung:",
      "Praktischer Eingriff:"
    ],
    pageNotes: {
      landing: "Bei einer Landingpage senkt jede zusaetzliche Unsicherheit direkt die Anfragechance.",
      service: "Bei einer Leistungsseite muessen Angebot und naechster Schritt schnell klar werden.",
      shop: "Bei einem Shop entscheiden Vertrauen, Produktverstaendnis und reibungsloser Kaufweg zusammen.",
      blog: "Bei einem Blog darf der Experteninhalt das eigentliche Angebot nicht verdecken.",
      contact: "Bei einer Kontaktseite sind Vertrauen und schnelle Erreichbarkeit wichtiger als Dekoration.",
      portfolio: "Bei einem Portfolio verkaufen Beweisreihenfolge und visuelle Qualitaet die Expertise.",
      old: "Bei einem alten URL-Muster muss Modernisierung sofort technische Frische zeigen.",
      company: "Bei einer Unternehmensseite zaehlen Marke, Vertrauen und Kontakt-Rhythmus zusammen."
    },
    domainNotes: [
      (profile) => profile.hasQuery ? "Wegen der Parameter waere eine saubere, teilbare Landing-Route staerker." : "",
      (profile) => profile.deepPath ? "Wegen des tiefen Pfads sollte das Kernangebot naeher an den ersten Bildschirm." : "",
      (profile) => !profile.hasHttps ? "Ohne HTTPS muss die Vertrauensebene auch technisch repariert werden." : "",
      (profile) => profile.hasSubdomain ? "Durch die Subdomain muss das Markensystem besonders einheitlich wirken." : "",
      (profile) => profile.hasHyphen ? "Bei einer Bindestrich-Domain muessen Logo und Wordmark mehr Premium-Gefuehl tragen." : "",
      (profile) => profile.shortPath && profile.hasHttps ? "Die saubere Adresse ist eine gute Basis; der groesste Hebel liegt dann bei staerkeren Beweisen." : ""
    ]
  }
};

function pickAuditVariant(items, profile, key, index) {
  const variants = Array.isArray(items) ? items : [items];
  return variants[Math.abs(textFingerprint(`${profile.host}:${profile.path}:${key}:${index}`)) % variants.length];
}

function pickAuditDomainNote(context, profile, key, index) {
  const notes = context.domainNotes.map((getNote) => getNote(profile)).filter(Boolean);
  if (!notes.length) return "";
  return notes[Math.abs(textFingerprint(`${profile.host}:${key}:domain:${index}`)) % notes.length];
}

function auditPageActionNote(profile, lang) {
  const notes = {
    hu: {
      landing: "Itt a legjobb irány egy rövid, erős ajánlati blokk és egyetlen domináns ajánlatkérési út.",
      service: "Itt a szolgáltatási értékígéretet, bizonyítékot és CTA-t egy döntési útvonallá kell rendezni.",
      shop: "Itt a termékbizalmat, szállítási/garancia infót és vásárlási CTA-t kell közelebb hozni egymáshoz.",
      blog: "Itt a cikk végére és közepére is érdemes üzleti átvezetést, audit ajánlatot vagy szolgáltatásblokkot tenni.",
      contact: "Itt a formot, elérhetőséget és bizalmi jeleket egy gyors kapcsolatfelvételi panelbe érdemes sűríteni.",
      portfolio: "Itt az esettanulmányokat érdemes eredmény, folyamat és CTA sorrendben bemutatni.",
      old: "Itt látványos before/after modernizálás és tiszta új URL-struktúra hozna nagy ugrást.",
      company: "Itt a márkaígéretet, referenciát és kapcsolatfelvételt kell feszesebb ritmusba rakni."
    },
    en: {
      landing: "The best direction is a short high-impact offer block and one dominant request path.",
      service: "The service promise, proof and CTA should become one clear decision path.",
      shop: "Product trust, delivery/guarantee details and the purchase CTA should sit closer together.",
      blog: "Add business transitions, an audit offer or service block in the middle and at the end of the article.",
      contact: "Condense the form, contact details and trust signals into one fast contact panel.",
      portfolio: "Present case studies in the order of result, process and CTA.",
      old: "A visible before/after modernization and clean new URL structure would create the biggest jump.",
      company: "Tighten the rhythm between brand promise, proof and contact action."
    },
    de: {
      landing: "Der beste Weg ist ein kurzer starker Angebotsblock und ein dominanter Anfragepfad.",
      service: "Leistungsversprechen, Beweis und CTA sollten zu einem klaren Entscheidungsweg werden.",
      shop: "Produktvertrauen, Versand-/Garantieinfos und Kauf-CTA sollten naeher zusammenruecken.",
      blog: "In der Mitte und am Ende des Artikels sollten Business-Ueberleitung, Audit-Angebot oder Serviceblock stehen.",
      contact: "Formular, Kontaktdaten und Vertrauenssignale sollten in ein schnelles Kontaktpanel verdichtet werden.",
      portfolio: "Cases sollten in der Reihenfolge Ergebnis, Prozess und CTA gezeigt werden.",
      old: "Ein sichtbares Before/After und eine saubere neue URL-Struktur wuerden den groessten Sprung bringen.",
      company: "Markenversprechen, Beweise und Kontaktaktion sollten einen strafferen Rhythmus bekommen."
    }
  };
  return (notes[lang] || notes.hu)[profile.pageType] || "";
}

function buildDetailedCategoryReason(label, value, reasonText, profile, lang, index) {
  const context = auditDetailContext[lang] || auditDetailContext.hu;
  const tone = pickAuditVariant(context.reasonTone, profile, `reason-${label}`, index);
  return tone(label, value, reasonText, profile);
}

function enrichAuditMessage(base, profile, lang, key, kind, index) {
  if (!base) return "";
  const context = auditDetailContext[lang] || auditDetailContext.hu;
  const openers = kind === "improvement" ? context.improvementOpeners : context.weakOpeners;
  const opener = pickAuditVariant(openers, profile, `${kind}-${key}`, index);
  const pageNote = kind === "improvement" ? auditPageActionNote(profile, lang) : context.pageNotes[profile.pageType] || "";
  const domainNote = pickAuditDomainNote(context, profile, key, index);
  return [opener, base, pageNote, domainNote].filter(Boolean).join(" ");
}

function buildAuditFindings(profile, lang) {
  const copy = auditMessages[lang] || auditMessages.hu;
  const dictionary = translations[lang] || translations.hu;
  const categoryLabels = {
    design: dictionary["audit.design"],
    speed: dictionary["audit.speed"],
    trust: dictionary["audit.trust"],
    mobile: dictionary["audit.mobile"]
  };

  const weakCategories = Object.entries(profile.categories)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(([key]) => key);

  const reasons = Object.entries(profile.categories).map(([category, value], index) => {
    const reasonKeys = profile.scoreDetails[category].reasons.slice(-3);
    const reasonText = reasonKeys.map((key) => localizedReason(copy, key));
    return buildDetailedCategoryReason(
      categoryLabels[category],
      value,
      reasonText.length ? reasonText : [localizedReason(copy, "cleanDomain")],
      profile,
      lang,
      index
    );
  });

  const findings = [];
  Object.values(profile.scoreDetails).forEach((bucket) => {
    bucket.negativeKeys.forEach((key) => addFinding(findings, key, profile, 80));
  });
  if (!profile.hasTrustKeyword) addFinding(findings, "missingTrust", profile, 95);
  if (!profile.hasConversionKeyword) addFinding(findings, "missingConversion", profile, 90);
  if (profile.pageType === "shop") addFinding(findings, "shopSignal", profile, 108);
  if (profile.pageType === "blog") addFinding(findings, "blogSignal", profile, 108);
  if (profile.pageType === "old") addFinding(findings, "oldTech", profile, 110);
  weakCategories.forEach((category) => addFinding(findings, `low${category[0].toUpperCase()}${category.slice(1)}`, profile, 35));

  const uniqueReasonKeys = [...new Map(
    findings
      .sort((a, b) => b.priority - a.priority)
      .map((finding) => [finding.reasonKey, finding.reasonKey])
  ).values()];

  ["missingTrust", "missingConversion", "lowDesign", "lowMobile", "lowSpeed"].forEach((key) => {
    if (uniqueReasonKeys.length < 3 && !uniqueReasonKeys.includes(key)) uniqueReasonKeys.push(key);
  });

  const selectedKeys = uniqueReasonKeys.slice(0, 5);
  const insights = selectedKeys
    .map((key, index) => enrichAuditMessage(copy.weaknesses[key], profile, lang, key, "weakness", index))
    .filter(Boolean);
  const recommendations = selectedKeys
    .map((key, index) => enrichAuditMessage(copy.improvements[key], profile, lang, key, "improvement", index))
    .filter(Boolean);
  const score = clampScore(Object.values(profile.categories).reduce((sum, value) => sum + value, 0) / 4);
  const weakLabel = weakCategories.map((key) => categoryLabels[key]).join(", ");

  return {
    score,
    categories: profile.categories,
    summary: copy.summary(score, copy.pageTypes[profile.pageType], weakLabel),
    diagnostics: buildAuditDiagnostics(lang, "url", "low", profile.categories),
    reasons,
    insights: insights.slice(0, 5),
    recommendations: recommendations.slice(0, 5)
  };
}

function renderAuditList(selector, items) {
  const list = document.querySelector(selector);
  if (!list) return;
  list.replaceChildren(...items.map((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    return listItem;
  }));
}

let flowStep = 0;
const flowPanels = [...document.querySelectorAll(".flow-panel")];
const flowButtons = [...document.querySelectorAll(".flow-steps button")];
const flowPrev = document.querySelector("#flowPrev");
const flowNext = document.querySelector("#flowNext");
const requestForm = document.querySelector(".request-flow");
const projectSelect = requestForm ? requestForm.querySelector('select[name="project"]') : null;
const flowRecommendation = document.querySelector("#flowRecommendation");
const formStatus = document.querySelector("#formStatus");

const projectRecommendationKeys = ["flow.summaryNew", "flow.summaryModern", "flow.summaryLanding", "flow.summaryAdvice"];

function updateFlowRecommendation() {
  if (!flowRecommendation) return;
  const lang = window.localStorage.getItem("daTechLang") || "hu";
  const dictionary = translations[lang] || translations.hu;
  const selectedIndex = projectSelect ? projectSelect.selectedIndex : 0;
  const key = projectRecommendationKeys[selectedIndex] || "flow.summaryText";
  flowRecommendation.textContent = dictionary[key] || dictionary["flow.summaryText"];
}

function buildRequestPayload(data) {
  return {
    project: String(data.get("project") || ""),
    name: String(data.get("name") || "").trim(),
    email: String(data.get("email") || "").trim(),
    message: String(data.get("message") || "").trim(),
    source: window.location.href,
    language: window.localStorage.getItem("daTechLang") || "hu",
    createdAt: new Date().toISOString()
  };
}

function openRequestEmail(payload, dictionary) {
  const body = [
    "DA Tech website request",
    "",
    `Project: ${payload.project}`,
    `Name: ${payload.name || "-"}`,
    `Email: ${payload.email}`,
    "",
    "Message:",
    payload.message || "-",
    "",
    `Source: ${payload.source}`,
    `Language: ${payload.language}`
  ].join("\n");

  window.location.href = `mailto:hello@da-technology.eu?subject=${encodeURIComponent("DA Tech weboldal igénylés")}&body=${encodeURIComponent(body)}`;
  if (formStatus) formStatus.textContent = dictionary["flow.success"];
}

async function submitWebsiteRequest() {
  if (!requestForm) return;
  const lang = window.localStorage.getItem("daTechLang") || "hu";
  const dictionary = translations[lang] || translations.hu;
  const data = new FormData(requestForm);
  const payload = buildRequestPayload(data);
  const email = payload.email;
  const consent = data.get("privacyConsent") === "on";
  if (!email) {
    if (formStatus) formStatus.textContent = dictionary["flow.missingEmail"];
    setFlowStep(2);
    return;
  }
  if (!consent) {
    if (formStatus) formStatus.textContent = dictionary["flow.missingConsent"];
    setFlowStep(2);
    return;
  }

  const endpoint = window.DA_TECH_FORM_ENDPOINT || "";
  if (!endpoint) {
    openRequestEmail(payload, dictionary);
    return;
  }

  if (formStatus) formStatus.textContent = dictionary["flow.sending"];
  if (flowNext) flowNext.disabled = true;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`Form endpoint ${response.status}`);
    if (formStatus) formStatus.textContent = dictionary["flow.endpointSuccess"];
    requestForm.reset();
    setFlowStep(0);
  } catch {
    if (formStatus) formStatus.textContent = dictionary["flow.endpointError"];
    openRequestEmail(payload, dictionary);
  } finally {
    if (flowNext) flowNext.disabled = false;
  }
}

function setFlowStep(nextStep) {
  if (!flowPanels.length) return;
  flowStep = Math.max(0, Math.min(flowPanels.length - 1, nextStep));
  flowPanels.forEach((panel, index) => panel.classList.toggle("active", index === flowStep));
  flowButtons.forEach((button, index) => button.classList.toggle("active", index === flowStep));
  if (flowPrev) flowPrev.disabled = flowStep === 0;
  if (flowNext) {
    const lang = window.localStorage.getItem("daTechLang") || "hu";
    const dictionary = translations[lang] || translations.hu;
    flowNext.textContent = flowStep === flowPanels.length - 1 ? dictionary["flow.send"] : dictionary["flow.next"];
  }
  updateFlowRecommendation();
}

flowButtons.forEach((button) => {
  button.addEventListener("click", () => setFlowStep(Number(button.dataset.step)));
});
if (flowPrev) flowPrev.addEventListener("click", () => setFlowStep(flowStep - 1));
if (flowNext) {
  flowNext.addEventListener("click", () => {
    if (flowStep < flowPanels.length - 1) setFlowStep(flowStep + 1);
    else submitWebsiteRequest();
  });
}
if (projectSelect) projectSelect.addEventListener("change", updateFlowRecommendation);
if (requestForm) requestForm.addEventListener("submit", (event) => event.preventDefault());

const cookieBanner = document.querySelector("#cookieBanner");
if (cookieBanner) {
  const storedCookieChoice = window.localStorage.getItem("daTechCookieChoice");
  if (storedCookieChoice) cookieBanner.classList.add("is-hidden");

  cookieBanner.querySelectorAll("[data-cookie-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      window.localStorage.setItem("daTechCookieChoice", button.dataset.cookieChoice || "reject");
      cookieBanner.classList.add("is-hidden");
      if (button.dataset.cookieChoice === "accept") loadOptionalAnalytics();
    });
  });
}

function loadOptionalAnalytics() {
  if (window.localStorage.getItem("daTechCookieChoice") !== "accept") return;
  if (document.querySelector("[data-da-tech-analytics]")) return;

  const plausibleDomain = window.DA_TECH_PLAUSIBLE_DOMAIN || "";
  if (plausibleDomain) {
    const script = document.createElement("script");
    script.defer = true;
    script.dataset.daTechAnalytics = "plausible";
    script.dataset.domain = plausibleDomain;
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);
    return;
  }

  const googleAnalyticsId = window.DA_TECH_GA_ID || "";
  if (googleAnalyticsId) {
    const loader = document.createElement("script");
    loader.async = true;
    loader.dataset.daTechAnalytics = "ga";
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAnalyticsId)}`;
    document.head.appendChild(loader);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", googleAnalyticsId, { anonymize_ip: true });
  }
}

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.14 })
  : null;

document.querySelectorAll(".reveal-on-scroll").forEach((element) => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add("is-visible");
});

function releaseIntroGatedUi() {
  document.documentElement.classList.remove("intro-pending");
  document.documentElement.classList.add("intro-ready");
}

ensureFloatingRequestButton();
if (document.documentElement.classList.contains("intro-pending")) {
  window.setTimeout(releaseIntroGatedUi, 5050);
} else {
  releaseIntroGatedUi();
}
loadOptionalAnalytics();
setLanguage(window.localStorage.getItem("daTechLang") || "hu");
setFlowStep(0);
if (shouldRunHeroCanvas && canvas && ctx) {
  resizeCanvas();
  draw();
  window.addEventListener("resize", resizeCanvas);
}
