const canvas = document.querySelector("#heroCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
const pointer = { x: 0, y: 0, active: false };
let particles = [];
let lastAuditRawUrl = null;

const translations = {
  hu: {
    "nav.about": "Rólunk",
    "nav.methods": "Módszereink",
    "nav.methodBuild": "Amit felépítünk",
    "nav.methodExtravagant": "Extravagáns megoldások",
    "nav.methodProcess": "Így dolgozunk",
    "nav.why": "Miért mi?",
    "nav.services": "Szolgáltatások",
    "nav.proof": "Miért minket?",
    "nav.process": "Folyamat",
    "nav.contact": "Kapcsolat",
    "nav.cta": "Weboldal igénylése",
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
    "services.eyebrow": "Amit felépítünk",
    "services.title": "Amit építünk: látvány, bizalom, ajánlatkérés.",
    "services.card1Title": "Prémium céges weboldal",
    "services.card1Text": "Erős első képernyő, tiszta ajánlat, prémium márkaérzet.",
    "services.card2Title": "Weboldal modernizálás",
    "services.card2Text": "Régi oldalból modern, gyors, mobilbarát ügyfélszerző felület.",
    "services.card3Title": "Extravagáns interakciók",
    "services.card3Text": "Animált hero, mikrointerakciók, emlékezetes tech részletek.",
    "services.card4Title": "Konverziós stratégia",
    "services.card4Text": "Kevesebb zaj, erősebb CTA, tisztább döntési út.",
    "proof.eyebrow": "Miért a D.A.-Tech?",
    "proof.title": "A látogató nem kódot lát. Ő azt érzi, hogy ez a cég megbízható-e.",
    "proof.text": "Az oldalnak nem mindent elmondania kell. El kell érnie, hogy a jó ügyfél tovább akarjon lépni.",
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
    "form.project": "Mire van szükséged?",
    "form.optionNew": "Új weboldal",
    "form.optionModern": "Weboldal modernizálás",
    "form.optionLanding": "Landing page",
    "form.optionAdvice": "Nem tudom, kérek tanácsot",
    "form.message": "Röviden a projektről",
    "form.messagePlaceholder": "Mi a cél, mi nem működik most, milyen hatást szeretnél?",
    "form.submit": "Weboldal igénylés indítása",
    "footer.tagline": "Modern weboldalak és weboldal modernizálás",
    "audit.eyebrow": "Gyors weboldal audit",
    "audit.title": "Nézd meg, mit modernizálnánk először.",
    "audit.label": "Weboldalad címe",
    "audit.placeholder": "https://ceged.hu",
    "audit.button": "Audit indítása",
    "audit.note": "A modul URL-alapú gyorsdiagnózist ad: design, sebesség, bizalom és mobilélmény alapján.",
    "audit.design": "Design",
    "audit.speed": "Sebesség",
    "audit.trust": "Bizalom",
    "audit.mobile": "Mobil",
    "audit.summary": "DA Tech saját oldal auditja: 100/100. A felület prémium, mobilra hangolt és konverzióra épített.",
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
    "audit.defaultInsight3": "Nincs kritikus gyengeség: az audit, before/after blokk és weboldal igénylés flow együtt konverziós útvonalat alkot.",
    "audit.defaultSuggestion1": "További finomításként később valós ügyfélreferenciákkal lehet még erősebbé tenni.",
    "audit.defaultSuggestion2": "További finomításként éles domainen mérhető analitika és konverziókövetés kapcsolható rá.",
    "audit.defaultSuggestion3": "További finomításként az audit később backenddel valós HTML elemzéssé bővíthető.",
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
    "flow.success": "Kész az email vázlat. Ha nem nyílt meg automatikusan, írj nekünk: hello@datech.hu",
    "flow.missingEmail": "Adj meg egy e-mail címet, hogy tudjuk hova válaszoljunk.",
    "about.eyebrow": "About us",
    "about.title": "DA Tech: modern weboldal, ami ügyfeleket győz meg.",
    "about.lead": "A DA Tech olyan vállalkozásoknak készít modern weboldalakat és weboldal-modernizálásokat, akik erősebb online benyomást, gyorsabb felületet és több érdeklődőt szeretnének.",
    "about.card1Title": "Design, ami irányítja a figyelmet",
    "about.card1Text": "Nem csak látványt tervezünk. A struktúra, a ritmus és a vizuális hierarchia együtt vezeti a látogatót a döntés felé.",
    "about.card2Title": "Technológia, ami gyorsnak érződik",
    "about.card2Text": "A cél egy modern, reszponzív és stabil felület, ami telefonon, tableten és desktopon is prémium élményt ad.",
    "about.card3Title": "Üzenet, ami bizalmat épít",
    "about.card3Text": "A weboldal akkor működik jól, ha az első képernyő után egyértelmű: mit kínál a cég, miért hiteles, és hogyan lehet kapcsolatba lépni.",
    "about.back": "Vissza a főoldalra",
    "about.request": "Weboldal igénylése"
  },
  en: {
    "nav.about": "About us",
    "nav.methods": "Our Methods",
    "nav.methodBuild": "What we build",
    "nav.methodExtravagant": "Extravagant solutions",
    "nav.methodProcess": "How we work",
    "nav.why": "Why us",
    "nav.services": "Services",
    "nav.proof": "Why us?",
    "nav.process": "Process",
    "nav.contact": "Contact",
    "nav.cta": "Request a Website",
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
    "services.eyebrow": "What we build",
    "services.title": "What we build: visuals, trust, requests.",
    "services.card1Title": "Premium business website",
    "services.card1Text": "Strong first screen, clear offer, premium brand feel.",
    "services.card2Title": "Website modernization",
    "services.card2Text": "Old site into a modern, fast, mobile-friendly lead interface.",
    "services.card3Title": "Extravagant interactions",
    "services.card3Text": "Animated hero, microinteractions, memorable tech details.",
    "services.card4Title": "Conversion strategy",
    "services.card4Text": "Less noise, stronger CTA, clearer decision path.",
    "proof.eyebrow": "Why DA Tech?",
    "proof.title": "Visitors do not see code. They feel whether a company is trustworthy.",
    "proof.text": "A website does not need to say everything. It needs to make the right customer want the next step.",
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
    "form.project": "What do you need?",
    "form.optionNew": "New website",
    "form.optionModern": "Website modernization",
    "form.optionLanding": "Landing page",
    "form.optionAdvice": "Not sure, I need advice",
    "form.message": "Project summary",
    "form.messagePlaceholder": "What is the goal, what does not work now, what effect do you want?",
    "form.submit": "Start website request",
    "footer.tagline": "Modern websites and website modernization",
    "audit.eyebrow": "Quick website audit",
    "audit.title": "See what we would modernize first.",
    "audit.label": "Your website URL",
    "audit.placeholder": "https://company.com",
    "audit.button": "Run audit",
    "audit.note": "The module gives a URL-based quick diagnosis across design, speed, trust and mobile experience.",
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
    "flow.success": "The email draft is ready. If it did not open automatically, write to us: hello@datech.hu",
    "flow.missingEmail": "Add an email address so we know where to reply.",
    "about.eyebrow": "About us",
    "about.title": "DA Tech: a modern website that wins customers.",
    "about.lead": "DA Tech builds modern websites and website modernizations for businesses that want a stronger online impression, a faster interface and more qualified leads.",
    "about.card1Title": "Design that guides attention",
    "about.card1Text": "We do not design visuals alone. Structure, rhythm and visual hierarchy work together to move visitors toward a decision.",
    "about.card2Title": "Technology that feels fast",
    "about.card2Text": "The goal is a modern, responsive and stable interface that feels premium on phones, tablets and desktop screens.",
    "about.card3Title": "Messaging that builds trust",
    "about.card3Text": "A website works when the first screen makes it clear what the company offers, why it is credible and how to get in touch.",
    "about.back": "Back to homepage",
    "about.request": "Request a Website"
  },
  de: {
    "nav.about": "Ueber uns",
    "nav.methods": "Unsere Methoden",
    "nav.methodBuild": "Was wir bauen",
    "nav.methodExtravagant": "Extravagante Loesungen",
    "nav.methodProcess": "So arbeiten wir",
    "nav.why": "Warum wir",
    "nav.services": "Leistungen",
    "nav.proof": "Warum wir?",
    "nav.process": "Prozess",
    "nav.contact": "Kontakt",
    "nav.cta": "Website anfragen",
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
    "services.eyebrow": "Was wir bauen",
    "services.title": "Was wir bauen: Wirkung, Vertrauen, Anfragen.",
    "services.card1Title": "Premium Firmenwebsite",
    "services.card1Text": "Starke erste Ansicht, klares Angebot, premium Markengefuehl.",
    "services.card2Title": "Website-Modernisierung",
    "services.card2Text": "Alte Seite zu moderner, schneller, mobiler Anfrage-Oberflaeche.",
    "services.card3Title": "Extravagante Interaktionen",
    "services.card3Text": "Animierter Hero, Mikrointeraktionen, merkbare Tech-Details.",
    "services.card4Title": "Conversion-Strategie",
    "services.card4Text": "Weniger Laerm, staerkerer CTA, klarerer Entscheidungsweg.",
    "proof.eyebrow": "Warum D.A.-Tech?",
    "proof.title": "Besucher sehen keinen Code. Sie fuehlen, ob ein Unternehmen vertrauenswuerdig ist.",
    "proof.text": "Eine Website muss nicht alles sagen. Sie muss den richtigen Kunden zum naechsten Schritt bewegen.",
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
    "form.project": "Was brauchst du?",
    "form.optionNew": "Neue Website",
    "form.optionModern": "Website-Modernisierung",
    "form.optionLanding": "Landingpage",
    "form.optionAdvice": "Noch unsicher, ich brauche Beratung",
    "form.message": "Kurz zum Projekt",
    "form.messagePlaceholder": "Was ist das Ziel, was funktioniert aktuell nicht, welche Wirkung wuenschst du dir?",
    "form.submit": "Website-Anfrage starten",
    "footer.tagline": "Moderne Websites und Website-Modernisierung",
    "audit.eyebrow": "Schneller Website-Audit",
    "audit.title": "Sieh, was wir zuerst modernisieren wuerden.",
    "audit.label": "Deine Website-URL",
    "audit.placeholder": "https://firma.de",
    "audit.button": "Audit starten",
    "audit.note": "Das Modul gibt eine URL-basierte Schnelldiagnose zu Design, Geschwindigkeit, Vertrauen und Mobile Experience.",
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
    "audit.defaultSuggestion3": "Optionale Verfeinerung: Der Audit kann spaeter per Backend zu echter HTML-Analyse ausgebaut werden.",
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
    "flow.success": "Der E-Mail-Entwurf ist bereit. Falls er sich nicht automatisch geoeffnet hat: hello@datech.hu",
    "flow.missingEmail": "Gib eine E-Mail-Adresse ein, damit wir antworten koennen.",
    "about.eyebrow": "About us",
    "about.title": "DA Tech: eine moderne Website, die Kunden ueberzeugt.",
    "about.lead": "DA Tech erstellt moderne Websites und Website-Modernisierungen fuer Unternehmen, die online staerker wirken, schneller auftreten und mehr qualifizierte Anfragen gewinnen wollen.",
    "about.card1Title": "Design, das Aufmerksamkeit fuehrt",
    "about.card1Text": "Wir gestalten nicht nur Optik. Struktur, Rhythmus und visuelle Hierarchie fuehren Besucher gemeinsam zur Entscheidung.",
    "about.card2Title": "Technologie, die schnell wirkt",
    "about.card2Text": "Das Ziel ist eine moderne, responsive und stabile Oberflaeche, die auf Smartphone, Tablet und Desktop hochwertig wirkt.",
    "about.card3Title": "Botschaften, die Vertrauen schaffen",
    "about.card3Text": "Eine Website funktioniert, wenn schon der erste Bildschirm zeigt, was das Unternehmen anbietet, warum es glaubwuerdig ist und wie man Kontakt aufnimmt.",
    "about.back": "Zurueck zur Startseite",
    "about.request": "Website anfragen"
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

  document.querySelectorAll(".lang-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
    button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
  });

  window.localStorage.setItem("daTechLang", lang);
  if (flowPanels.length) setFlowStep(flowStep);
  if (lastAuditRawUrl !== null) updateWebsiteAudit(lastAuditRawUrl);
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
  auditButton.addEventListener("click", () => {
    const input = document.querySelector("#auditUrl");
    lastAuditRawUrl = input.value.trim();
    updateWebsiteAudit(lastAuditRawUrl);
  });
}

function updateWebsiteAudit(rawUrl) {
  const audit = buildWebsiteAudit(rawUrl);

  document.querySelector("#auditScore").textContent = audit.score;
  document.querySelector("#auditSummary").textContent = audit.summary;

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

function buildWebsiteAudit(rawUrl) {
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
        hu: "Adj meg egy weboldal címet, és az audit URL-alapú elemzést készít róla.",
        en: "Enter a website URL and the audit will create a URL-based analysis.",
        de: "Gib eine Website-URL ein, dann erstellt der Audit eine URL-basierte Analyse."
      }[lang] || "Adj meg egy weboldal címet, és az audit URL-alapú elemzést készít róla.",
      reasons: invalidReasons[lang] || invalidReasons.hu,
      insights: invalidCopy.insights[lang] || invalidCopy.insights.hu,
      recommendations: invalidCopy.recommendations[lang] || invalidCopy.recommendations.hu
    };
  }

  if (isDaTechOwnSite(url)) return buildPerfectOwnSiteAudit(lang);

  return buildAuditFindings(scoreAuditProfile(analyzeAuditUrl(url)), lang);
}

function isDaTechOwnSite(url) {
  const host = url.hostname.toLowerCase();
  const normalized = host.replace(/^www\./, "");
  const pathText = `${url.pathname} ${url.search} ${url.hash}`.toLowerCase();
  return normalized === "localhost"
    || normalized === "127.0.0.1"
    || normalized === "datech.hu"
    || normalized === "da-tech.hu"
    || normalized.includes("da-tech")
    || normalized.includes("datech")
    || pathText.includes("datech")
    || pathText.includes("da-tech");
}

function buildPerfectOwnSiteAudit(lang) {
  const copy = {
    hu: {
      summary: "DA Tech saját oldal auditja: 100/100. A felület prémium, mobilra hangolt és konverzióra épített.",
      reasons: [
        "Design 100: erős D.A.-Tech brand, futurisztikus intro és prémium kék vizuális rendszer.",
        "Sebesség 100: statikus, könnyű frontend, cache-bumpolt assetek és gyors első képernyő.",
        "Bizalom 100: többnyelvű tartalom, rólunk oldal, bizalmi rendszer és világos szolgáltatás struktúra.",
        "Mobil 100: dedikált mobil és landscape szabályok, reszponzív CTA-k és stabil intro elrendezés."
      ],
      insights: [
        "Nincs kritikus gyengeség: a saját oldal modernizálási történetet, bizalmat és ajánlatkérési útvonalat is ad.",
        "Nincs kritikus gyengeség: a reszponzív nézetek, nyelvváltás és animált elemek együtt prémium élményt adnak.",
        "Nincs kritikus gyengeség: az audit, before/after blokk és weboldal igénylés flow együtt konverziós útvonalat alkot."
      ],
      recommendations: [
        "További finomításként később valós ügyfélreferenciákkal lehet még erősebbé tenni.",
        "További finomításként éles domainen mérhető analitika és konverziókövetés kapcsolható rá.",
        "További finomításként az audit később backenddel valós HTML elemzéssé bővíthető."
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
        "Optionale Verfeinerung: Der Audit kann spaeter per Backend zu echter HTML-Analyse ausgebaut werden."
      ]
    }
  };
  const selected = copy[lang] || copy.hu;
  return {
    score: 100,
    categories: { design: 100, speed: 100, trust: 100, mobile: 100 },
    summary: selected.summary,
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

function submitWebsiteRequest() {
  if (!requestForm) return;
  const lang = window.localStorage.getItem("daTechLang") || "hu";
  const dictionary = translations[lang] || translations.hu;
  const data = new FormData(requestForm);
  const email = String(data.get("email") || "").trim();
  if (!email) {
    if (formStatus) formStatus.textContent = dictionary["flow.missingEmail"];
    setFlowStep(2);
    return;
  }

  const project = String(data.get("project") || "");
  const name = String(data.get("name") || "").trim();
  const message = String(data.get("message") || "").trim();
  const body = [
    "DA Tech website request",
    "",
    `Project: ${project}`,
    `Name: ${name || "-"}`,
    `Email: ${email}`,
    "",
    "Message:",
    message || "-"
  ].join("\n");

  window.location.href = `mailto:hello@datech.hu?subject=${encodeURIComponent("DA Tech weboldal igénylés")}&body=${encodeURIComponent(body)}`;
  if (formStatus) formStatus.textContent = dictionary["flow.success"];
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

setLanguage(window.localStorage.getItem("daTechLang") || "hu");
setFlowStep(0);
if (canvas && ctx) {
  resizeCanvas();
  draw();
  window.addEventListener("resize", resizeCanvas);
}
