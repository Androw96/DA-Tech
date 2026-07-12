const canvas = document.querySelector("#heroCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
const pointer = { x: 0, y: 0, active: false };
let particles = [];

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
    "hero.lead": "Modern weboldalakat és weboldal frissítéseket készítünk vállalkozásoknak, akik gyorsabb, elegánsabb és meggyőzőbb online megjelenést akarnak. Nem sablont adunk, hanem stratégiai webes élményt, ami bizalmat épít és érdeklődőket hoz.",
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
    "services.eyebrow": "Amit felépítünk",
    "services.title": "Nem csak új weboldalt kapsz, hanem erősebb online értékesítési gépet.",
    "services.card1Title": "Prémium céges weboldal",
    "services.card1Text": "Meggyőző struktúra, látványos első képernyő, gyorsan érthető ajánlat és olyan vizuális nyelv, ami profivá teszi a márkádat.",
    "services.card2Title": "Weboldal modernizálás",
    "services.card2Text": "Régi, lassú vagy bizalmatlan hatású oldalból modern, mobilbarát, letisztult és ügyfélszerző felületet készítünk.",
    "services.card3Title": "Extravagáns interakciók",
    "services.card3Text": "Animált hős szekciók, finom mikrointerakciók, dinamikus tartalomblokkok és prémium hatású UI megoldások.",
    "services.card4Title": "Konverziós stratégia",
    "services.card4Text": "CTA, ajánlatkérés, bizalmi elemek, szolgáltatás bontás és oldalritmus úgy kialakítva, hogy a látogatóból érdeklődő legyen.",
    "proof.eyebrow": "Miért a D.A.-Tech?",
    "proof.title": "A látogató nem kódot lát. Ő azt érzi, hogy ez a cég megbízható-e.",
    "proof.text": "A DA Tech oldalak ezért három dologra vannak kihegyezve: első benyomás, sebesség és világos üzleti üzenet. Az eredmény egy olyan webes jelenlét, amely nem csak fent van az interneten, hanem dolgozik a cégedért.",
    "proof.item1Title": "Stratégiai design",
    "proof.item1Text": "A struktúra az ügyfél döntési útját követi, nem a menüpontok véletlen sorrendjét.",
    "proof.item2Title": "Modern technikai alap",
    "proof.item2Text": "Gyors, reszponzív, keresőbarát és könnyen továbbfejleszthető felületek.",
    "proof.item3Title": "Prémium érzés",
    "proof.item3Text": "Animáció, tér, ritmus és vizuális fókusz, ami azonnal magasabb kategóriába emeli a márkát.",
    "showcase.eyebrow": "Extravagáns megoldások",
    "showcase.title": "Olyan részletek, amik miatt az oldal emlékezetes marad.",
    "showcase.card1Title": "Élő tech háttér",
    "showcase.card1Text": "Interaktív, mozgó rendszerhatás, amely azonnal digitális szakértelmet kommunikál.",
    "showcase.card2Title": "Konverziós modulok",
    "showcase.card2Text": "Mérhető, átlátható elemek, amelyek gyorsan megmutatják, miért érdemes ajánlatot kérni.",
    "showcase.card3Title": "Fejlesztői minőség",
    "showcase.card3Text": "Tiszta felépítés, gyors működés és karbantartható kód, nem egyszer használatos látvány.",
    "process.eyebrow": "Így dolgozunk",
    "process.title": "Rövid, fókuszált folyamat, látványos végeredménnyel.",
    "process.step1Title": "Audit és cél",
    "process.step1Text": "Megnézzük, miért nem teljesít elég jól a jelenlegi oldal, és milyen üzleti célt kell kiszolgálnia az újnak.",
    "process.step2Title": "Design irány",
    "process.step2Text": "Felépítjük az első benyomást, a fő üzenetet, a vizuális rendszert és a látogató útvonalát.",
    "process.step3Title": "Fejlesztés",
    "process.step3Text": "Gyors, modern, mobilbarát oldalt készítünk animációkkal, űrlapokkal és igény szerint extra funkciókkal.",
    "process.step4Title": "Finomhangolás",
    "process.step4Text": "Átnézzük a teljes élményt, javítjuk a ritmust, a sebességet és a konverziós pontokat.",
    "contact.eyebrow": "Indítsuk el",
    "contact.title": "Készen állsz egy weboldalra, ami végre komolyan képviseli a céged?",
    "contact.text": "Írd meg, mire van szükséged: új weboldalra, modernizálásra, landing page-re vagy teljes online arculatfrissítésre. A DA Tech segít olyan oldalt építeni, amire büszkén küldöd az ügyfeleidet.",
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
    "audit.summary": "Javaslat: erősebb első képernyő, tisztább CTA és prémium mobil ritmus.",
    "audit.insightsTitle": "Elemzés",
    "audit.recommendationsTitle": "Változtatási javaslatok",
    "audit.defaultInsight1": "A kezdőoldal első képernyője legyen azonnal érthető: mit kínál a cég és miért érdemes tovább olvasni.",
    "audit.defaultInsight2": "A fő cselekvés legyen egyértelmű, kontrasztos és minden eszközön könnyen elérhető.",
    "audit.defaultSuggestion1": "Erősebb hero üzenet és bizalomépítő blokk az első görgetés előtt.",
    "audit.defaultSuggestion2": "Mobil-first CTA ritmus, rövidebb szövegek és gyorsabb ajánlatkérési útvonal.",
    "before.eyebrow": "Before / After",
    "before.title": "Így lesz egy sablonos oldalból modern ügyfélszerző felület.",
    "trust.eyebrow": "Bizalmi rendszer",
    "trust.title": "Nem csak látványt adunk, hanem döntési biztonságot.",
    "trust.item1": "Átlátható folyamat és mérföldkövek.",
    "trust.item2": "Mobil-first megjelenés minden képernyőre.",
    "trust.item3": "SEO és sebesség alapok már induláskor.",
    "trust.item4": "Átadás után is továbbfejleszthető rendszer.",
    "packages.eyebrow": "Ajánlati irányok",
    "packages.title": "Válassz kiindulási szintet, mi hozzáépítjük a stratégiát.",
    "packages.startTitle": "Gyors, modern jelenlét",
    "packages.startText": "Landing page vagy egyszerű céges oldal erős első benyomással.",
    "packages.modernTitle": "Régi oldalból prémium felület",
    "packages.modernText": "Struktúra, UX, mobilnézet, animáció és konverziós útvonal újragondolva.",
    "packages.premiumTitle": "Teljes digitális élmény",
    "packages.premiumText": "Egyedi többoldalas weboldal, prémium interakciókkal és brand rendszerrel.",
    "flow.summaryTitle": "DA Tech javaslat",
    "flow.summaryText": "Modernizálási audit, prémium első képernyő és mobil-first konverziós útvonal.",
    "flow.prev": "Vissza",
    "flow.next": "Tovább",
    "flow.send": "Igénylés indítása",
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
    "hero.lead": "We build modern websites and website upgrades for businesses that want a faster, sharper and more persuasive online presence. Not a template, but a strategic web experience that builds trust and brings in leads.",
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
    "services.eyebrow": "What we build",
    "services.title": "You do not just get a new website. You get a stronger online sales engine.",
    "services.card1Title": "Premium business website",
    "services.card1Text": "A persuasive structure, striking first screen, clear offer and visual language that makes your brand feel professional.",
    "services.card2Title": "Website modernization",
    "services.card2Text": "We turn old, slow or low-trust websites into modern, mobile-friendly and lead-generating experiences.",
    "services.card3Title": "Extravagant interactions",
    "services.card3Text": "Animated hero sections, refined microinteractions, dynamic content blocks and premium UI details.",
    "services.card4Title": "Conversion strategy",
    "services.card4Text": "CTA, request flow, trust elements, service structure and rhythm designed to turn visitors into leads.",
    "proof.eyebrow": "Why DA Tech?",
    "proof.title": "Visitors do not see code. They feel whether a company is trustworthy.",
    "proof.text": "DA Tech websites focus on three things: first impression, speed and a clear business message. The result is a web presence that does not just exist online, it works for your company.",
    "proof.item1Title": "Strategic design",
    "proof.item1Text": "The structure follows the customer decision path instead of a random menu order.",
    "proof.item2Title": "Modern technical base",
    "proof.item2Text": "Fast, responsive, search-friendly and easy-to-extend interfaces.",
    "proof.item3Title": "Premium feel",
    "proof.item3Text": "Animation, space, rhythm and visual focus that instantly raises the brand perception.",
    "showcase.eyebrow": "Extravagant solutions",
    "showcase.title": "Details that make the website memorable.",
    "showcase.card1Title": "Live tech background",
    "showcase.card1Text": "An interactive moving system effect that immediately communicates digital expertise.",
    "showcase.card2Title": "Conversion modules",
    "showcase.card2Text": "Measurable, clear elements that quickly show why a visitor should request an offer.",
    "showcase.card3Title": "Developer quality",
    "showcase.card3Text": "Clean structure, fast behavior and maintainable code instead of disposable visuals.",
    "process.eyebrow": "How we work",
    "process.title": "A short, focused process with a striking result.",
    "process.step1Title": "Audit and goal",
    "process.step1Text": "We inspect why the current site is underperforming and what business goal the new one must serve.",
    "process.step2Title": "Design direction",
    "process.step2Text": "We shape the first impression, core message, visual system and visitor path.",
    "process.step3Title": "Development",
    "process.step3Text": "We build a fast, modern, mobile-friendly site with animations, forms and extra functions when needed.",
    "process.step4Title": "Fine tuning",
    "process.step4Text": "We review the complete experience and refine rhythm, speed and conversion points.",
    "contact.eyebrow": "Start the build",
    "contact.title": "Ready for a website that finally represents your company seriously?",
    "contact.text": "Tell us what you need: a new website, modernization, a landing page or a full online identity refresh. DA Tech helps you build a site you can proudly send customers to.",
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
    "audit.summary": "Suggestion: stronger first screen, clearer CTA and a premium mobile rhythm.",
    "audit.insightsTitle": "Analysis",
    "audit.recommendationsTitle": "Change recommendations",
    "audit.defaultInsight1": "The first screen should make the offer instantly clear: what the company provides and why visitors should continue.",
    "audit.defaultInsight2": "The main action should be obvious, high-contrast and easy to reach on every device.",
    "audit.defaultSuggestion1": "Use a stronger hero message and a trust-building block before the first scroll.",
    "audit.defaultSuggestion2": "Create a mobile-first CTA rhythm with shorter copy and a faster request path.",
    "before.eyebrow": "Before / After",
    "before.title": "This is how a template-like page becomes a modern lead-generating interface.",
    "trust.eyebrow": "Trust system",
    "trust.title": "We do not just add visuals. We create decision confidence.",
    "trust.item1": "Transparent process and milestones.",
    "trust.item2": "Mobile-first appearance for every screen.",
    "trust.item3": "SEO and speed foundations from launch.",
    "trust.item4": "A system that can keep evolving after handover.",
    "packages.eyebrow": "Offer directions",
    "packages.title": "Choose a starting level, we build the strategy around it.",
    "packages.startTitle": "Fast modern presence",
    "packages.startText": "Landing page or simple company site with a strong first impression.",
    "packages.modernTitle": "Premium interface from an old site",
    "packages.modernText": "Structure, UX, mobile view, animation and conversion path rethought.",
    "packages.premiumTitle": "Complete digital experience",
    "packages.premiumText": "Custom multi-page website with premium interactions and brand system.",
    "flow.summaryTitle": "DA Tech recommendation",
    "flow.summaryText": "Modernization audit, premium first screen and mobile-first conversion path.",
    "flow.prev": "Back",
    "flow.next": "Next",
    "flow.send": "Start request",
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
    "hero.lead": "Wir erstellen moderne Websites und Website-Modernisierungen fuer Unternehmen, die online schneller, eleganter und ueberzeugender auftreten wollen. Keine Vorlage, sondern ein strategisches Web-Erlebnis, das Vertrauen aufbaut und Anfragen bringt.",
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
    "services.eyebrow": "Was wir bauen",
    "services.title": "Du bekommst nicht nur eine neue Website, sondern eine staerkere Online-Verkaufsmaschine.",
    "services.card1Title": "Premium Firmenwebsite",
    "services.card1Text": "Ueberzeugende Struktur, starke erste Ansicht, klares Angebot und eine visuelle Sprache, die deine Marke professionell wirken laesst.",
    "services.card2Title": "Website-Modernisierung",
    "services.card2Text": "Aus alten, langsamen oder wenig vertrauenswuerdigen Seiten machen wir moderne, mobile und anfrageorientierte Erlebnisse.",
    "services.card3Title": "Extravagante Interaktionen",
    "services.card3Text": "Animierte Hero-Bereiche, feine Mikrointeraktionen, dynamische Inhaltsbloecke und hochwertige UI-Details.",
    "services.card4Title": "Conversion-Strategie",
    "services.card4Text": "CTA, Anfragefluss, Vertrauenselemente, Leistungsstruktur und Seitenrhythmus werden auf echte Anfragen ausgelegt.",
    "proof.eyebrow": "Warum D.A.-Tech?",
    "proof.title": "Besucher sehen keinen Code. Sie fuehlen, ob ein Unternehmen vertrauenswuerdig ist.",
    "proof.text": "DA Tech Websites konzentrieren sich auf drei Dinge: erster Eindruck, Geschwindigkeit und eine klare Business-Botschaft. Das Ergebnis ist eine Webpraesenz, die nicht nur online ist, sondern fuer dein Unternehmen arbeitet.",
    "proof.item1Title": "Strategisches Design",
    "proof.item1Text": "Die Struktur folgt dem Entscheidungsweg des Kunden, nicht einer zufaelligen Menue-Reihenfolge.",
    "proof.item2Title": "Moderne technische Basis",
    "proof.item2Text": "Schnelle, responsive, suchmaschinenfreundliche und leicht erweiterbare Oberflaechen.",
    "proof.item3Title": "Premium-Gefuehl",
    "proof.item3Text": "Animation, Raum, Rhythmus und visueller Fokus heben die Markenwirkung sofort an.",
    "showcase.eyebrow": "Extravagante Loesungen",
    "showcase.title": "Details, die die Website im Kopf behalten lassen.",
    "showcase.card1Title": "Live-Tech-Hintergrund",
    "showcase.card1Text": "Ein interaktiver, bewegter Systemeffekt, der sofort digitale Kompetenz vermittelt.",
    "showcase.card2Title": "Conversion-Module",
    "showcase.card2Text": "Messbare, klare Elemente, die schnell zeigen, warum Besucher eine Anfrage stellen sollten.",
    "showcase.card3Title": "Entwicklerqualitaet",
    "showcase.card3Text": "Saubere Struktur, schnelle Funktion und wartbarer Code statt kurzlebiger Show-Effekte.",
    "process.eyebrow": "So arbeiten wir",
    "process.title": "Ein kurzer, fokussierter Prozess mit starkem Ergebnis.",
    "process.step1Title": "Audit und Ziel",
    "process.step1Text": "Wir pruefen, warum die aktuelle Website nicht genug leistet und welches Business-Ziel die neue Seite erfuellen muss.",
    "process.step2Title": "Designrichtung",
    "process.step2Text": "Wir entwickeln den ersten Eindruck, die Kernbotschaft, das visuelle System und den Besucherpfad.",
    "process.step3Title": "Entwicklung",
    "process.step3Text": "Wir bauen eine schnelle, moderne, mobile Website mit Animationen, Formularen und bei Bedarf Extra-Funktionen.",
    "process.step4Title": "Feinschliff",
    "process.step4Text": "Wir pruefen das gesamte Erlebnis und optimieren Rhythmus, Geschwindigkeit und Conversion-Punkte.",
    "contact.eyebrow": "Projekt starten",
    "contact.title": "Bereit fuer eine Website, die dein Unternehmen endlich stark repraesentiert?",
    "contact.text": "Sag uns, was du brauchst: neue Website, Modernisierung, Landingpage oder kompletten Online-Auftritt. DA Tech baut eine Seite, die du Kunden mit Stolz zeigen kannst.",
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
    "audit.summary": "Empfehlung: staerkerer erster Bildschirm, klarerer CTA und hochwertiger mobiler Rhythmus.",
    "audit.insightsTitle": "Analyse",
    "audit.recommendationsTitle": "Aenderungsvorschlaege",
    "audit.defaultInsight1": "Der erste Bildschirm sollte sofort klar machen, was das Unternehmen anbietet und warum Besucher weiterlesen sollten.",
    "audit.defaultInsight2": "Die Hauptaktion sollte eindeutig, kontrastreich und auf jedem Geraet leicht erreichbar sein.",
    "audit.defaultSuggestion1": "Nutze eine staerkere Hero-Botschaft und einen vertrauensbildenden Block vor dem ersten Scrollen.",
    "audit.defaultSuggestion2": "Erstelle einen Mobile-first CTA-Rhythmus mit kuerzeren Texten und schnellerem Anfrageweg.",
    "before.eyebrow": "Before / After",
    "before.title": "So wird aus einer Template-Seite eine moderne Oberflaeche fuer neue Anfragen.",
    "trust.eyebrow": "Vertrauenssystem",
    "trust.title": "Wir liefern nicht nur Optik, sondern Entscheidungssicherheit.",
    "trust.item1": "Transparenter Prozess und klare Meilensteine.",
    "trust.item2": "Mobile-first Darstellung fuer jeden Bildschirm.",
    "trust.item3": "SEO- und Speed-Grundlagen ab dem Start.",
    "trust.item4": "Ein System, das nach der Uebergabe weiter wachsen kann.",
    "packages.eyebrow": "Angebotsrichtungen",
    "packages.title": "Waehle den Startpunkt, wir bauen die Strategie dazu.",
    "packages.startTitle": "Schnelle moderne Praesenz",
    "packages.startText": "Landingpage oder einfache Firmenseite mit starkem ersten Eindruck.",
    "packages.modernTitle": "Premium-Oberflaeche aus alter Seite",
    "packages.modernText": "Struktur, UX, Mobile View, Animation und Conversion-Pfad neu gedacht.",
    "packages.premiumTitle": "Komplettes digitales Erlebnis",
    "packages.premiumText": "Individuelle mehrseitige Website mit Premium-Interaktionen und Brand-System.",
    "flow.summaryTitle": "DA Tech Empfehlung",
    "flow.summaryText": "Modernisierungs-Audit, premium erster Bildschirm und mobile-first Conversion-Pfad.",
    "flow.prev": "Zurueck",
    "flow.next": "Weiter",
    "flow.send": "Anfrage starten",
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

document.querySelectorAll(".nav-menu").forEach((menu) => {
  const trigger = menu.querySelector(".nav-menu-button");
  if (!trigger) return;

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    menu.classList.toggle("is-open");
  });

  menu.querySelectorAll(".nav-dropdown a").forEach((link) => {
    link.addEventListener("click", () => menu.classList.remove("is-open"));
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target)) menu.classList.remove("is-open");
  });
});

const compareFrame = document.querySelector("#compareFrame");
const compareRange = document.querySelector("#compareRange");
if (compareFrame && compareRange) {
  const syncCompare = () => {
    compareFrame.style.setProperty("--split", `${compareRange.value}%`);
  };
  compareRange.addEventListener("input", syncCompare);
  syncCompare();
}

const auditButton = document.querySelector("#auditButton");
if (auditButton) {
  auditButton.addEventListener("click", () => {
    const input = document.querySelector("#auditUrl");
    const rawUrl = input.value.trim();
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

    renderAuditList("#auditInsights", audit.insights);
    renderAuditList("#auditRecommendations", audit.recommendations, "ol");
  });
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

function buildWebsiteAudit(rawUrl) {
  const lang = window.localStorage.getItem("daTechLang") || "hu";
  const url = normalizeAuditUrl(rawUrl);
  const fallback = {
    hu: "Adj meg egy weboldal címet, és az audit URL-alapú elemzést készít róla.",
    en: "Enter a website URL and the audit will create a URL-based analysis.",
    de: "Gib eine Website-URL ein, dann erstellt der Audit eine URL-basierte Analyse."
  };

  if (!url) {
    return {
      score: 64,
      categories: { design: 62, speed: 68, trust: 58, mobile: 66 },
      summary: fallback[lang] || fallback.hu,
      insights: auditCopy.invalid.insights[lang] || auditCopy.invalid.insights.hu,
      recommendations: auditCopy.invalid.recommendations[lang] || auditCopy.invalid.recommendations.hu
    };
  }

  const host = url.hostname.replace(/^www\./, "");
  const path = url.pathname.replace(/\/$/, "");
  const segments = path.split("/").filter(Boolean);
  const words = host.split(/[.-]/).filter(Boolean);
  const fingerprint = textFingerprint(`${host}${path}`);
  const hasHttps = url.protocol === "https:";
  const cleanDomain = host.length <= 22 && !host.includes("--") && words.every((word) => word.length <= 14);
  const brandedDomain = words.length <= 3 && words.some((word) => word.length >= 4);
  const hasClearPage = segments.length > 0 && segments.length <= 2;
  const longPath = path.length > 34 || segments.length > 2;
  const keywordText = `${host} ${segments.join(" ")}`.toLowerCase();
  const hasTrustKeyword = /(about|rolunk|ueber|team|kontakt|contact|impressum|portfolio|case|referencia)/.test(keywordText);
  const hasConversionKeyword = /(ajanlat|quote|request|booking|contact|kapcsolat|weboldal|service|services|leistungen)/.test(keywordText);
  const hasModernSignal = /(tech|digital|studio|design|web|app|media|creative|modern)/.test(keywordText);
  const mobilePenalty = longPath ? 10 : 0;
  const stability = (fingerprint % 9) - 4;

  const categories = {
    design: clampScore(70 + (cleanDomain ? 10 : -8) + (brandedDomain ? 7 : -4) + (hasModernSignal ? 7 : 0) + stability),
    speed: clampScore(76 + (hasHttps ? 8 : -10) + (longPath ? -9 : 4) + ((fingerprint % 5) - 2)),
    trust: clampScore(66 + (hasHttps ? 9 : -12) + (hasTrustKeyword ? 10 : -5) + (cleanDomain ? 5 : -4)),
    mobile: clampScore(72 + (cleanDomain ? 8 : -5) + (hasClearPage ? 5 : -2) - mobilePenalty + ((fingerprint % 7) - 3))
  };
  const score = clampScore(Object.values(categories).reduce((sum, value) => sum + value, 0) / 4);
  const weakCategories = Object.entries(categories).sort((a, b) => a[1] - b[1]).slice(0, 2).map(([key]) => key);
  const copy = auditCopy[lang] || auditCopy.hu;

  const insights = [
    copy.insightScore(host, score),
    hasHttps ? copy.httpsGood : copy.httpsMissing,
    cleanDomain ? copy.domainClean : copy.domainComplex,
    hasConversionKeyword ? copy.conversionSignal : copy.conversionMissing
  ];

  const recommendations = weakCategories.map((key) => copy.recommendations[key]);
  if (!hasTrustKeyword) recommendations.push(copy.recommendations.trustBlock);
  if (!hasConversionKeyword) recommendations.push(copy.recommendations.cta);
  if (longPath) recommendations.push(copy.recommendations.navigation);

  return {
    score,
    categories,
    summary: copy.summary(score, weakCategories.map((key) => copy.labels[key]).join(", ")),
    insights,
    recommendations: [...new Set(recommendations)].slice(0, 5)
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
}

flowButtons.forEach((button) => {
  button.addEventListener("click", () => setFlowStep(Number(button.dataset.step)));
});
if (flowPrev) flowPrev.addEventListener("click", () => setFlowStep(flowStep - 1));
if (flowNext) {
  flowNext.addEventListener("click", () => {
    if (flowStep < flowPanels.length - 1) setFlowStep(flowStep + 1);
  });
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

setLanguage(window.localStorage.getItem("daTechLang") || "hu");
setFlowStep(0);
if (canvas && ctx) {
  resizeCanvas();
  draw();
  window.addEventListener("resize", resizeCanvas);
}
