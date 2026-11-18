// 德语文案。类型来自英文版，缺字段或结构不一致会在 typecheck 阶段失败。

import type { Content } from "./en.js";

export const de: Content = {
  siteName: "Renota",

  nav: {
    chrome: "Chrome",
    zotero: "Zotero",
    android: "Android",
    pricing: "Preise",
    privacy: "Datenschutz",
    account: "Konto",
    github: "GitHub",
    language: "Sprache",
    home: "Start",
  },

  footer: {
    tagline: "Eine private Wissensdatenbank über Browser, Zotero und Smartphone hinweg.",
    products: "Produkte",
    resources: "Support",
    legal: "Rechtliches",
    privacy: "Datenschutzerklärung",
    terms: "Nutzungsbedingungen",
    copyright: "Renota",
    discord: "Discord",
    mail: "E-Mail",
    madeFor: "Für Menschen, die viel lesen.",
  },

  common: {
    learnMore: "Mehr erfahren",
    install: "Jetzt holen",
    viewOnGithub: "Auf GitHub ansehen",
    readMore: "Weiterlesen",
    faq: "Häufige Fragen",
    onThisPage: "Auf dieser Seite",
    backToHome: "Zurück zur Startseite",
    languageLabel: "Sprache",
    skipToContent: "Zum Inhalt springen",
    productsNav: "Produkte",
    free: "Kostenlos",
    byoKey: "Eigener API-Schlüssel",
    localFirst: "Local-First",
    cloudSync: "Optionale Cloud-Synchronisierung",
    multiLanguage: "10 Oberflächensprachen",
    highlights: "Was es auszeichnet",
    updated: "Zuletzt aktualisiert",
    requirements: "Voraussetzungen",
    note: "Hinweis",
    status: "Status",
  },

  seo: {
    terms: {
      title: "Nutzungsbedingungen",
      description:
        "Die Bedingungen für die Nutzung von Renota: Ihre Inhalte, Ihre API-Schlüssel, zulässige Nutzung, Verfügbarkeit und Haftung.",
    },
    home: {
      title: "Renota — lesen, behalten, eigene Notizen befragen",
      description:
        "Renota macht aus dem, was Sie im Browser, in Zotero und auf dem Smartphone lesen, eine private Wissensdatenbank zum Befragen. Mit eigenem API-Schlüssel.",
    },
    chrome: {
      title: "Renota für Chrome — KI-Leseassistent mit eigenen Notizen",
      description:
        "Auswahl erklären, analysieren, hinterfragen, übersetzen und in Ihre Wissensdatenbank speichern. Local-First, mit OpenAI, DeepSeek, OpenRouter oder eigener API.",
    },
    zotero: {
      title: "Renota für Zotero — KI-Leseassistent für EPUB und PDF",
      description:
        "Bücher in Zotero mit Erklärungen, Suche im Buch und Spoilerschutz lesen. Passagen speichern und markieren, ohne den Reader zu verlassen — später durchsuchen.",
    },
    android: {
      title: "Renota für Android — schwebender KI-Reader für jede App",
      description:
        "Bereich auf dem Bildschirm auswählen und dazu fragen. Chinesische OCR offline, auch für gescannte PDFs, und dieselbe Wissensdatenbank wie die Desktop-Apps.",
    },
    privacy: {
      title: "Datenschutzerklärung",
      description:
        "Was Renota auf Ihrem Gerät speichert, was es verlässt, wann die Cloud-Synchronisierung etwas hochlädt und wie Sie es löschen.",
    },
    pricing: {
      title: "Preise — kostenlose Apps, bezahlte Cloud-Synchronisierung",
      description:
        "Renota ist kostenlos mit Ihrem API-Schlüssel. Die Cloud-Synchronisierung über Browser, Zotero und Smartphone kostet US$9.90 pro Monat. Jederzeit kündbar.",
    },
  },

  home: {
    hero: {
      badge: "Für Menschen, die viel lesen",
      title: "Alles lesen. Wichtiges behalten. Die eigenen Notizen befragen.",
      subtitle:
        "Renota steht neben dem, was Sie gerade lesen — eine Webseite, ein Buch in Zotero, eine gescannte Seite auf dem Smartphone — und hilft Ihnen, es zu verstehen. Alles, was Sie speichern, wird zu einer Wissensdatenbank, die Sie befragen können.",
      primary: "Die Produkte ansehen",
      secondary: "Datenschutzerklärung lesen",
      stats: [
        { value: "3", label: "Oberflächen: Browser, Zotero, Android" },
        { value: "0", label: "API-Schlüssel auf unseren Servern gespeichert" },
        { value: "10", label: "Oberflächensprachen" },
      ],
    },

    products: {
      title: "Drei Apps, eine Wissensdatenbank",
      intro:
        "Jede App ist für sich nützlich. Melden Sie sich einmal an, und dieselben Clips, Markierungen und Erkenntnisse begleiten Sie über alle drei Apps hinweg.",
      chrome: {
        kicker: "Browser-Erweiterung",
        name: "Renota für Chrome",
        tagline: "Verstehen und umschreiben, was Sie im Web lesen.",
        points: [
          "Ausgewählten Text erklären, analysieren, hinterfragen, übersetzen oder mit früher Gespeichertem verbinden.",
          "Eine Passage mit einem Klick speichern; sie wird für jede spätere Frage abrufbarer Kontext.",
          "Die Antwort in den Editor zurückschreiben — ersetzend oder einfügend.",
        ],
        cta: "Die Chrome-Erweiterung ansehen",
      },
      zotero: {
        kicker: "Zotero-Plugin",
        name: "Renota für Zotero",
        tagline: "Ganze Bücher lesen mit einem Assistenten, der dieselben Seiten gelesen hat wie Sie.",
        points: [
          "Arbeitet im Zotero-Reader mit EPUB, PDF und Web-Snapshots.",
          "Spoilerschutz: Das Modell sieht nur Text bis zu Ihrer Leseposition.",
          "Erklärungen als Kommentar zu Markierungen oder in Ihre Lesenotiz zurückschreiben.",
        ],
        cta: "Das Zotero-Plugin ansehen",
      },
      android: {
        kicker: "Android-App",
        name: "Renota für Android",
        tagline: "Eine schwebende Kugel, die den Bildschirm liest und in jeder App antwortet.",
        points: [
          "Einen Bereich auf dem Bildschirm auswählen und OCR plus Antwort erhalten — auch bei gescannten PDFs.",
          "Führt chinesische OCR offline auf dem Gerät aus; nur der erkannte Text geht an Ihr Modell.",
          "Dieselben Aktionen und dieselbe Wissensdatenbank wie die Desktop-Apps.",
        ],
        cta: "Die Android-App ansehen",
      },
    },

    why: {
      title: "Gebaut, wie Lesende es sich wünschen",
      intro: "Kein Konto nötig, keine Inhalte an uns, keine Bindung.",
      items: [
        {
          title: "Ihr Schlüssel, Ihr Modell",
          body: "Verbinden Sie OpenAI, DeepSeek, Anthropic, OpenRouter oder einen beliebigen OpenAI-kompatiblen Endpunkt. Anfragen gehen direkt von Ihrem Gerät an den Anbieter — nie über uns.",
        },
        {
          title: "Local-First als Standard",
          body: "Clips, Markierungen und Notizen liegen in Ihrem Browser, im Datenordner von Zotero oder in der Datenbank der App. Die Cloud-Synchronisierung ist optional und jederzeit abschaltbar.",
        },
        {
          title: "Suche, die auch auf Chinesisch funktioniert",
          body: "BM25-Suche mit echter CJK-Tokenisierung, damit gespeicherte Passagen wirklich gefunden werden — nicht nur, wenn Sie sich an den genauen Wortlaut erinnern.",
        },
        {
          title: "Zeigt seine Quellen",
          body: "Antworten belegen die verwendeten Clips und Buchpassagen, und jeder Beleg verlinkt auf den Originaltext, damit Sie es prüfen können.",
        },
      ],
    },

    how: {
      title: "So funktioniert es",
      steps: [
        {
          title: "Erfassen",
          body: "Text auf einer Webseite markieren, eine Passage in Zotero hervorheben oder auf dem Smartphone einen Bereich einrahmen. Renota speichert ihn mit Kontext und Quelle.",
        },
        {
          title: "Fragen",
          body: "Wählen Sie eine Aktion — verstehen, analysieren, hinterfragen, übersetzen, verbinden — oder stellen Sie eine eigene Frage. Ihr gespeichertes Material wird automatisch gefunden und belegt.",
        },
        {
          title: "Behalten",
          body: "Schreiben Sie die Antwort dorthin zurück, wo Sie gearbeitet haben, oder speichern Sie sie als Erkenntnis. Beides landet in derselben Wissensdatenbank.",
        },
      ],
    },

    sync: {
      title: "Synchronisieren, wenn Sie es wollen",
      body: "Ohne Konto funktioniert alles auf einem Gerät. Wenn Sie mehr als eines nutzen — Browser am Schreibtisch, Zotero auf dem Laptop, Smartphone in der Hand — melden Sie sich mit einem E-Mail-Code an und synchronisieren Ihre Wissensdatenbank.",
      points: [
        "Standardmäßig aus: Nichts wird hochgeladen, solange Sie sich nicht anmelden.",
        "Nur Ihre Clips, Markierungen und Erkenntnisse werden synchronisiert. API-Schlüssel verlassen das Gerät nie.",
        "Löschungen werden mit synchronisiert, damit ein gelöschter Clip nicht auf einem anderen Gerät wieder auftaucht.",
        "Jederzeit abmelden; die lokale Kopie bleibt, wo sie ist.",
      ],
    },

    mcp: {
      title: "Ihre Wissensdatenbank als Werkzeug für Agenten",
      lede: "Über die Cloud-Synchronisierung hinaus können dieselben Inhalte von anderen Programmen gelesen werden.",
      body:
        "Claude Code, Cursor oder ein kleines Skript, das Sie selbst geschrieben haben, können Ihre Clips, Markierungen und Notizen über MCP durchsuchen — kein Einfügen von Passagen per Hand mehr.",
      points: [
        "Nur lesend: Ein Agent kann Ihre Einträge finden und zitieren, sie aber nie ändern oder löschen.",
        "Auch chinesische Suchanfragen funktionieren — es ist derselbe Index wie in den Apps.",
        "Erfordert ein Konto im Pro-Tarif: API-Schlüssel auf der Kontoseite erstellen und in die Konfiguration des Agenten eintragen.",
      ],
      endpointLabel: "MCP-Endpunkt",
      cta: "API-Schlüssel auf der Kontoseite erstellen",
    },

    faq: {
      title: "Fragen, die oft gestellt werden",
      items: [
        {
          q: "Brauche ich ein Konto?",
          a: "Nein. Jede App funktioniert ohne Konto. Ein Konto brauchen Sie nur für die beiden kostenpflichtigen Funktionen: Cloud-Synchronisierung und MCP-Zugriff.",
        },
        {
          q: "Ist es kostenlos?",
          a: "Die Apps sind kostenlos. Kostenpflichtig sind die Cloud-Synchronisierung und der MCP-Zugriff; beides ist im Pro-Abo für US$9.90 pro Monat enthalten. Die API-Nutzung zahlen Sie direkt bei Ihrem Modellanbieter — die Kosten hängen davon ab, welches Modell Sie wählen.",
        },
        {
          q: "Wohin gehen meine Daten?",
          a: "Standardmäßig nirgendwohin: Clips und Notizen bleiben auf Ihrem Gerät, und Prompts gehen direkt an den von Ihnen konfigurierten Modellanbieter. Wenn Sie die Cloud-Synchronisierung aktivieren, werden Ihre Wissenseinträge in unserer Datenbank gespeichert, damit Ihre anderen Geräte sie lesen können. API-Schlüssel werden nie hochgeladen.",
        },
        {
          q: "Welche Sprachen werden unterstützt?",
          a: "Die Oberfläche gibt es in zehn Sprachen — Englisch, vereinfachtes Chinesisch, traditionelles Chinesisch, Japanisch, Koreanisch, Französisch, Deutsch, Spanisch, Portugiesisch und Russisch — und alle sind vollständig übersetzt. Der Assistent antwortet in der Sprache, in der Sie ihn fragen.",
        },
        {
          q: "Kann ich meine Wissensdatenbank mit Claude Code oder Cursor verbinden?",
          a: "Ja. Erstellen Sie auf der Kontoseite einen API-Schlüssel und richten Sie Ihren Agenten mit diesem Schlüssel auf den MCP-Endpunkt. Das gehört zum Pro-Tarif und ist nur lesend: Ein Agent kann Ihre Einträge lesen, nicht ändern.",
        },
      ],
    },

    cta: {
      title: "Starten Sie dort, wo Sie ohnehin lesen",
      body: "Wählen Sie die App, die zu Ihrem Leseverhalten passt. Die anderen können später dazukommen — die Wissensdatenbank ist gemeinsam.",
    },
  },

  product: {
    chrome: {
      kicker: "Browser-Erweiterung",
      name: "Renota für Chrome",
      tagline: "Ein KI-Leseassistent, der sich merkt, was Sie gespeichert haben.",
      intro:
        "Text auf einer beliebigen Seite markieren, und Renota erklärt ihn, hinterfragt ihn, übersetzt ihn oder verbindet ihn mit früher Gelesenem. Speichern Sie die Teile, die es wert sind — sie werden zum Kontext für jede spätere Frage, mit Belegen zurück zur Quelle.",
      highlights: [
        {
          title: "Fünf Aktionen für eine Auswahl",
          body: "Verstehen, analysieren, hinterfragen, übersetzen, verbinden — jede mit einem Prompt, den Sie bearbeiten können, dazu eigene Schaltflächen.",
        },
        {
          title: "Eine Wissensdatenbank, kein Chat-Protokoll",
          body: "Gespeicherte Clips und Erkenntnisse werden lokal mit BM25 und CJK-Tokenisierung indexiert, damit die Suche sie auch bei anderem Wortlaut findet.",
        },
        {
          title: "Schreibt dorthin, wo Sie arbeiten",
          body: "Die Antwort direkt in den Editor setzen, aus dem Sie markiert haben, oder kopieren. Kein Umweg über ein anderes Fenster.",
        },
      ],
      features: {
        title: "Was es kann",
        items: [
          {
            title: "Auswahl-Symbolleiste",
            body: "Auf jeder Website erscheint eine kleine Leiste neben Ihrer Auswahl, mit den von Ihnen aktivierten Aktionen.",
          },
          {
            title: "Die eigene Bibliothek befragen",
            body: "Stellen Sie eine Frage, und Renota sucht zuerst die passenden Clips, antwortet daraus und nummeriert die Belege, damit Sie die genaue Quelle öffnen können.",
          },
          {
            title: "Eigenes Modell mitbringen",
            body: "OpenAI, DeepSeek, OpenRouter oder jede OpenAI-kompatible Basis-URL. Testen Sie die Verbindung in den Einstellungen, bevor Sie sich darauf verlassen.",
          },
          {
            title: "Zurückschreiben",
            body: "Die Antwort in das Feld einsetzen oder einfügen, aus dem Sie kamen — nützlich für Antworten, Notizen und Entwürfe.",
          },
          {
            title: "Seitenkontext",
            body: "Der Text rund um Ihre Auswahl geht mit der Anfrage mit — meist der Unterschied zwischen einer allgemeinen und einer brauchbaren Antwort.",
          },
          {
            title: "Zehn Oberflächensprachen",
            body: "Sprache wählen oder dem Browser folgen. Alle zehn sind vollständig übersetzt, bis zu den rechtlichen Seiten.",
          },
        ],
      },
      steps: {
        title: "So verwenden Sie es",
        items: [
          {
            title: "Markieren und Aktion wählen",
            body: "Text hervorheben, dann in der Leiste verstehen, analysieren, hinterfragen, übersetzen oder verbinden wählen.",
          },
          {
            title: "Mit Belegen lesen",
            body: "Die Antwort erscheint im Seitenbereich. Nummerierte Belege verweisen auf die verwendeten Clips und Buchpassagen.",
          },
          {
            title: "Speichern oder zurückschreiben",
            body: "Die Antwort als Erkenntnis behalten, die Auswahl als Clip speichern oder die Antwort in die Seite einsetzen, in der Sie schreiben.",
          },
        ],
      },
      privacy: {
        title: "Was Ihren Browser verlässt",
        body: "Nur das, was Sie an Ihren Modellanbieter senden, plus optionale Cloud-Synchronisierung, wenn Sie sie einschalten.",
        points: [
          "Seiteninhalte gehen nur an Ihren Anbieter, wenn Sie eine Aktion auslösen, nie im Hintergrund.",
          "Ihr API-Schlüssel liegt im lokalen Speicher der Erweiterung und geht nur an diesen Anbieter.",
          "Ihre Wissensdatenbank bleibt in IndexedDB, solange Sie sich nicht zur Synchronisierung anmelden.",
        ],
      },
      faq: {
        title: "Fragen zur Chrome-Erweiterung",
        items: [
          {
            q: "Welche Modellanbieter funktionieren?",
            a: "Alles, was die OpenAI-Chat-Completions-API spricht — OpenAI, DeepSeek, OpenRouter, selbst gehostete Gateways — plus jede eigene Basis-URL.",
          },
          {
            q: "Funktioniert es offline?",
            a: "Für Modellaufrufe braucht die Erweiterung eine Netzwerkverbindung. Speichern, Suchen und Lesen eigener Clips funktioniert lokal auch ohne.",
          },
          {
            q: "Kann ich die Prompts bearbeiten?",
            a: "Ja. Jede eingebaute Aktion hat einen bearbeitbaren Prompt, und Sie können eigene Schaltflächen mit eigenem Prompt anlegen.",
          },
          {
            q: "Wo ist meine Wissensdatenbank gespeichert?",
            a: "In der IndexedDB des Browsers, gebunden an die Erweiterung. Eine Deinstallation entfernt sie, sofern Sie die Cloud-Synchronisierung nicht aktiviert haben.",
          },
          {
            q: "Sendet es etwas an Ihre Server?",
            a: "Nur anonyme Nutzungszähler, und nur wenn Sie den optionalen Telemetrie-Schalter eingeschaltet lassen. Keine Seiteninhalte, keine Prompts, keine API-Schlüssel.",
          },
        ],
      },
      install: {
        title: "Die Erweiterung holen",
        body: "Der Eintrag im Chrome Web Store ist in Vorbereitung. Bis dahin liegt der Quellcode auf GitHub.",
        primary: { label: "Jetzt holen", note: "Chrome-Web-Store-Eintrag in Vorbereitung" },
        requirements: "Chrome 120 oder neuer. Ein API-Schlüssel von einem beliebigen OpenAI-kompatiblen Anbieter.",
      },
    },

    zotero: {
      kicker: "Zotero-Plugin",
      name: "Renota für Zotero",
      tagline: "Ganze Bücher lesen mit einem Assistenten, der dieselben Seiten gelesen hat wie Sie.",
      intro:
        "Renota lebt im Zotero-Reader. Markieren Sie eine Passage in einem EPUB, einem PDF oder einem Web-Snapshot und erhalten Sie eine Erklärung, die in diesem Buch verankert ist — die früheren Kapitel, Ihre eigenen Markierungen und nichts, was Sie noch nicht gelesen haben.",
      highlights: [
        {
          title: "Keine Spoiler",
          body: "Nur Text vor Ihrer Leseposition erreicht das Modell, auch bei Suchergebnissen und Lesenotizen. Einen Krimi lesen, ohne ihn zu verderben.",
        },
        {
          title: "Suche im Buch",
          body: "Jedes Buch wird lokal in Abschnitte geteilt und indexiert, sodass Fragen wie die nach einer Figur aus früheren Passagen mit Belegen beantwortet werden.",
        },
        {
          title: "Schreibt zurück nach Zotero",
          body: "Eine Erklärung als Kommentar zu einer Markierung speichern, an eine Lesenotiz anhängen oder als Erkenntnis in Ihrer Wissensdatenbank behalten.",
        },
      ],
      features: {
        title: "Was es kann",
        items: [
          {
            title: "Auswahl-Popup im Reader",
            body: "Verstehen, analysieren, hinterfragen, übersetzen, wer/was, speichern, fragen — direkt unter Zoteros eigenem Auswahl-Popup.",
          },
          {
            title: "Rückblick und Kapitelzusammenfassung",
            body: "Eine Erinnerung an das Bisherige oder eine Zusammenfassung des gerade beendeten Kapitels, gebaut aus Text vor Ihrer Position.",
          },
          {
            title: "Ihre Anmerkungen werden Wissen",
            body: "In Zotero erstellte Markierungen werden beim Anlegen in die Wissensdatenbank gespiegelt, damit sie später durchsuchbar und zitierbar sind.",
          },
          {
            title: "Lesenotizen",
            body: "Antworten lassen sich an eine Notiz pro Buch anhängen — ein wachsendes Dokument statt verstreuter Anmerkungen.",
          },
          {
            title: "Funktioniert mit EPUB, PDF und Snapshots",
            body: "Kapitelpfade und Leseposition werden verfolgt, soweit der Reader sie bereitstellt; bei gescannten PDFs bleibt es bei der vorhandenen Textebene.",
          },
          {
            title: "Teilt eine Wissensdatenbank",
            body: "Bei aktivierter Synchronisierung sind dieselben Clips in der Chrome-Erweiterung und der Android-App sichtbar.",
          },
        ],
      },
      steps: {
        title: "So verwenden Sie es",
        items: [
          {
            title: "Plugin installieren und Modell einrichten",
            body: "Das .xpi installieren und dann in Zoteros Einstellungen unter Renota Anbieter, Basis-URL, Schlüssel und Modell eintragen.",
          },
          {
            title: "Buch öffnen und Text markieren",
            body: "Das Buch wird im Hintergrund indexiert. Markieren Sie eine Passage, um die Aktionsschaltflächen zu erhalten.",
          },
          {
            title: "Zurückschreiben",
            body: "Die Antwort als Kommentar zu einer Markierung oder in Ihre Lesenotiz senden oder als Erkenntnis behalten.",
          },
        ],
      },
      privacy: {
        title: "Was Ihren Rechner verlässt",
        body: "Nur der Text, der zur Ausführung Ihrer Aktion nötig ist, und nie Text nach Ihrer Leseposition.",
        points: [
          "Der Buchindex wird lokal in einer SQLite-Datei des Plugins aufgebaut und gespeichert.",
          "Ihr API-Schlüssel liegt in den Zotero-Einstellungen für dieses Plugin.",
          "Die Synchronisierung, falls aktiviert, lädt nur Wissenseinträge hoch — nie die Buchdatei.",
        ],
      },
      faq: {
        title: "Fragen zum Zotero-Plugin",
        items: [
          {
            q: "Welche Zotero-Versionen werden unterstützt?",
            a: "Ziel ist Zotero 7, mit erklärter Kompatibilität für 8, 9 und 10.",
          },
          {
            q: "Wird das ganze Buch an das Modell gesendet?",
            a: "Nein. Gesendet werden nur die Auswahl, etwas umgebender Kontext und einige gefundene Passagen — alle vor Ihrer Leseposition.",
          },
          {
            q: "Kann ich die Spiegelung von Anmerkungen abschalten?",
            a: "Ja, in den Einstellungen. Das Abschalten entfernt auch Anmerkungen, die bereits in die Wissensdatenbank gespiegelt wurden.",
          },
          {
            q: "Funktioniert es mit gescannten PDFs?",
            a: "Nur soweit die Datei eine Textebene hat. Gescannte Seiten bieten nichts zum Markieren; nutzen Sie dafür die OCR der Android-App.",
          },
          {
            q: "Kann die Chrome-Erweiterung diese Bibliothek lesen?",
            a: "Ja, auf demselben Rechner: den lokalen Synchronisierungs-Endpunkt in den Plugin-Einstellungen aktivieren und die Erweiterung mit einem Token koppeln. Oder die Cloud-Synchronisierung nutzen.",
          },
        ],
      },
      install: {
        title: "Das Plugin holen",
        body: "Laden Sie das .xpi von der Release-Seite herunter und installieren Sie es über Zoteros Plugin-Manager.",
        primary: { label: ".xpi herunterladen", note: "Neueste Version" },
        requirements: "Zotero 7 oder neuer. Ein API-Schlüssel von einem beliebigen OpenAI-kompatiblen Anbieter oder von Anthropic.",
      },
    },

    android: {
      kicker: "Android-App",
      name: "Renota für Android",
      tagline: "Eine schwebende Kugel, die den Bildschirm liest und in jeder App antwortet.",
      intro:
        "Manches Lesen passiert dort, wo Sie keinen Text markieren können: eine gescannte Seite, der PDF-Betrachter von jemand anderem, ein Screenshot. Renota legt eine kleine schwebende Kugel über jede App. Rahmen Sie einen Bereich ein, erkennt es den Text auf dem Gerät, sendet ihn an Ihr Modell und zeigt die Antwort in einem Bereich, aus dem Sie kopieren können.",
      highlights: [
        {
          title: "Funktioniert über jeder App",
          body: "Einen Bereich einrahmen oder den ganzen Bildschirm aufnehmen.",
        },
        {
          title: "Chinesische OCR offline",
          body: "Die Erkennung läuft mit ML Kit auf dem Gerät, der Screenshot selbst wird also nirgendwohin hochgeladen.",
        },
        {
          title: "Gleiche Aktionen, gleiche Bibliothek",
          body: "Verstehen, analysieren, hinterfragen, übersetzen, wer/was, verbinden — mit der Wissensdatenbank, die Sie mit den Desktop-Apps teilen.",
        },
      ],
      features: {
        title: "Was es kann",
        items: [
          {
            title: "Bereichs- und Vollbildaufnahme",
            body: "Ein Feld aufziehen oder den ganzen Bildschirm aufnehmen, dann eine Aktion wählen. Der umgebende Text wird zum Kontext.",
          },
          {
            title: "Multimodale Option",
            body: "Ist die Seite eine Formel, eine Tabelle oder ein Diagramm, senden Sie das Bild selbst an ein visionfähiges Modell statt des OCR-Textes.",
          },
          {
            title: "Einstiegspunkte überall",
            body: "Auswahlmenü, Teilen-Menü, Zwischenablage, Übersetzungs-Intents und Wörterbuchabfragen können alle eine Anfrage starten.",
          },
          {
            title: "Verschlüsselter API-Schlüssel",
            body: "Der Schlüssel wird mit Androids System-Keystore (AES-256-GCM) gespeichert, nicht in einfachen Einstellungen.",
          },
          {
            title: "Synchronisierung im Hintergrund",
            body: "Auf dem Smartphone gespeicherte Clips erscheinen in den Desktop-Apps und umgekehrt, wenn die Cloud-Synchronisierung aktiviert ist.",
          },
          {
            title: "Für die Einhandbedienung gebaut",
            body: "Die Kugel lässt sich verschieben, skalieren und halbtransparent stellen, und sie merkt sich, wo Sie sie gelassen haben.",
          },
        ],
      },
      steps: {
        title: "So verwenden Sie es",
        items: [
          {
            title: "Den schwebenden Assistenten aktivieren",
            body: "Erteilen Sie einmal die Bedienungshilfe-Berechtigung. Danach bleibt die Kugel über anderen Apps.",
          },
          {
            title: "Einrahmen, was Sie lesen wollen",
            body: "Tippen Sie die Kugel an, wählen Sie Bereich oder Vollbild und bestätigen Sie. Der Text wird auf dem Gerät erkannt.",
          },
          {
            title: "Fragen, speichern, teilen",
            body: "Eine Aktion wählen oder eine eigene Frage tippen; die Antwort als Erkenntnis oder den Text als Clip speichern.",
          },
        ],
      },
      privacy: {
        title: "Was die App sehen kann",
        body: "Sie nimmt nur auf, wenn Sie eine Aufnahme starten, und sendet nur den erkannten Text an Ihr Modell.",
        points: [
          "Der Bedienungshilfe-Dienst liest keine Bildschirminhalte im Hintergrund und nimmt nie von selbst auf.",
          "Die OCR läuft lokal; Screenshots werden nicht hochgeladen, außer Sie wählen die multimodale Option.",
          "Die Wissensdatenbank ist eine lokale SQLite-Datei; die Android-Sicherung ist dafür deaktiviert.",
        ],
      },
      faq: {
        title: "Fragen zur Android-App",
        items: [
          {
            q: "Warum braucht sie einen Bedienungshilfe-Dienst?",
            a: "Android bietet keinen anderen Weg, über anderen Apps zu zeichnen und auf Anforderung einen Screenshot zu machen. Der Dienst wird nur aktiv, wenn Sie die Kugel antippen.",
          },
          {
            q: "Gibt es eine Play-Store-Version?",
            a: "Derzeit nicht — der schwebende Assistent beruht auf Berechtigungen, die die Store-Richtlinien für diesen Zweck nicht zulassen, deshalb wird er als APK außerhalb des Play Store ausgeliefert.",
          },
          {
            q: "Braucht die OCR das Netz?",
            a: "Nein. Die chinesische Texterkennung ist eingebaut und läuft offline. Der anschließende Modellaufruf braucht eine Verbindung.",
          },
          {
            q: "Welche Android-Versionen funktionieren?",
            a: "Android 11 (API 30) oder neuer, weil Screenshots per Programm nur dort möglich sind.",
          },
          {
            q: "Kann ich es ohne die schwebende Kugel nutzen?",
            a: "Ja — Auswahlmenü, Teilen-Menü und Zwischenablage funktionieren auch ohne aktiviertes Overlay.",
          },
        ],
      },
      install: {
        title: "Die App holen",
        body: "Laden Sie das APK von der Release-Seite herunter und installieren Sie es. Sie müssen Installationen aus Ihrem Browser oder Dateimanager erlauben.",
        primary: { label: "Jetzt holen", note: "Neueste Version" },
        requirements: "Android 11 oder neuer. Ein API-Schlüssel von einem beliebigen OpenAI-kompatiblen Anbieter oder von Anthropic.",
      },
    },
  },

  pricing: {
    title: "Preise",
    intro:
      "Alle drei Apps sind kostenlos, mit Ihrem eigenen API-Schlüssel. Das Pro-Abo für US$9.90 pro Monat umfasst die Cloud-Synchronisierung, die eine einzige Wissensdatenbank über Browser, Zotero und Smartphone hinweg auf demselben Stand hält, sowie den Lesezugriff über MCP für Claude Code, Cursor und andere Agenten. Modellaufrufe rechnen Sie direkt mit Ihrem Anbieter ab.",
    badge: "Jederzeit kündbar",
    plansTitle: "Zwei Tarife, eine Wissensdatenbank",
    free: {
      name: "Kostenlos",
      price: "$0",
      period: "dauerhaft",
      summary: "Jede App auf Ihrem eigenen Gerät mit Ihrem eigenen API-Schlüssel nutzen.",
      features: [
        "Chrome-Erweiterung, Zotero-Plugin und Android-App",
        "Eigener API-Schlüssel — die Modellnutzung rechnet Ihr Anbieter ab",
        "Clips, Markierungen und Notizen bleiben auf Ihrem Gerät",
        "Keine Zahlung zum Start nötig",
      ],
      cta: "Die Apps holen",
    },
    pro: {
      name: "Pro",
      price: "$9.90",
      period: "pro Monat",
      summary: "Cloud-Synchronisierung einschalten, damit dieselbe Wissensdatenbank jedem Gerät folgt — und Agenten sie über MCP lesen können.",
      features: [
        "Alles aus Kostenlos",
        "Dieselben Clips im Browser, in Zotero und auf dem Smartphone",
        "Auf einem neuen Gerät anmelden und weiterlesen, weiterfragen",
        "Löschungen werden mit synchronisiert, damit auf einem anderen Gerät nichts wieder auftaucht",
        "Claude Code, Cursor und anderen Agenten Lesezugriff über MCP geben",
      ],
      cta: "Abonnieren",
    },
    note:
      "Die Preise sind in US-Dollar, monatlich im Voraus über Paddle abgerechnet. Ihr API-Schlüssel verlässt Ihr Gerät nie — das Abo umfasst die Cloud-Synchronisierung und den MCP-Zugriff. Jederzeit kündbar; der Zugang läuft bis zum Ende des bereits bezahlten Zeitraums weiter.",
    faqTitle: "Fragen zum Abo",
    faq: [
      {
        q: "Zahle ich weiterhin für die Modellnutzung?",
        a: "Ja. Das Abo umfasst die Cloud-Synchronisierung und den MCP-Zugriff; Modellaufrufe sind darin nicht enthalten. Sie gehen direkt an den von Ihnen konfigurierten Anbieter und werden von ihm abgerechnet, nie von uns.",
      },
      {
        q: "Was passiert, wenn ich kündige?",
        a: "Ihre Wissensdatenbank synchronisiert bis zum Ende des bereits bezahlten Zeitraums weiter. Danach fällt das Konto auf den kostenlosen Tarif zurück und bleibt rein lokal — ohne dass auf Ihren Geräten etwas verloren geht.",
      },
      {
        q: "Kann ich die Apps ohne Abo nutzen?",
        a: "Ja. Alle drei Apps funktionieren vollständig auf Ihrem eigenen Gerät mit Ihrem eigenen API-Schlüssel. Nur die Cloud-Synchronisierung und der MCP-Zugriff brauchen ein Abo.",
      },
      {
        q: "Wie bezahle ich?",
        a: "Die Abwicklung übernimmt Paddle, unser Merchant of Record. Karten, PayPal und lokale Zahlungsmethoden sind je nach Rechnungsland verfügbar.",
      },
      {
        q: "Wo werden meine Zahlungsdaten gespeichert?",
        a: "Bei Paddle, nie bei uns. Wir erhalten nur einen Abo-Status und die E-Mail-Adresse des Kontos.",
      },
    ],
    ctaTitle: "Bereit zu synchronisieren?",
    ctaBody: "Melden Sie sich einmal an und wählen Sie dann auf der Kontoseite Pro.",
  },

  plan: {
    description: "Alle Funktionen in Chrome, Zotero und Android.",
    features: [
      "Originaltext und eigene Notizen unbegrenzt speichern",
      "Die eigene Bibliothek befragen",
      "Zwischen Chrome, Zotero und Android synchronisieren",
      "3 Tage kostenlose Testphase, jederzeit kündbar",
    ],
  },

  privacy: {
    title: "Datenschutzerklärung",
    intro: "Diese Seite erklärt, was Renota speichert, was Ihr Gerät verlässt und wie Sie es löschen.",
    fullPolicy: "Vollständige Erklärung",
    summaryTitle: "Kurzfassung",
    summary: [
      "Ihre Clips, Markierungen und Notizen werden standardmäßig auf Ihrem Gerät gespeichert.",
      "Prompts und der darin enthaltene Text gehen direkt an den von Ihnen konfigurierten Modellanbieter.",
      "API-Schlüssel verlassen Ihr Gerät nie und werden nie hochgeladen.",
      "Die Cloud-Synchronisierung ist standardmäßig aus. Wenn Sie sie aktivieren, werden Wissenseinträge auf unserem Server gespeichert, damit Ihre anderen Geräte sie lesen können.",
      "Screenshots bleiben auf Ihrem Smartphone. Die OCR läuft auf dem Gerät, und nur der Text, den Sie zu speichern wählen, geht an den von Ihnen konfigurierten Modellanbieter.",
      "Sie können Ihr Konto und alle synchronisierten Daten jederzeit löschen.",
    ],
    englishNote:
      "Die folgende Fassung ist die offizielle deutsche Übersetzung der Datenschutzerklärung. Bei Abweichungen von der englischen Originalfassung ist die englische Fassung maßgeblich.",
  },

  terms: {
    title: "Nutzungsbedingungen",
    intro: "Die Regeln für die Nutzung von Renota — Ihre Inhalte bleiben Ihre, Schlüssel bleiben auf Ihrem Gerät, und Modellausgaben brauchen Ihr Urteil.",
    fullPolicy: "Vollständige Bedingungen",
    summaryTitle: "Kurzfassung",
    summary: [
      "Alles, was Sie speichern, gehört Ihnen. Wir speichern und übertragen es nur, um den Dienst für Sie zu erbringen.",
      "Sie bringen Ihren eigenen API-Schlüssel mit und zahlen direkt bei Ihrem Modellanbieter. Wir sehen Ihren Schlüssel nie.",
      "KI-Ausgaben können falsch sein. Renota ist eine Lesehilfe, keine professionelle Beratung.",
      "Die Cloud-Synchronisierung ist optional; die Apps funktionieren ohne Konto.",
      "Sie können Ihr Konto und synchronisierte Daten jederzeit löschen.",
    ],
    englishNote:
      "Die folgende Fassung ist die offizielle deutsche Übersetzung der Nutzungsbedingungen. Bei Abweichungen von der englischen Originalfassung ist die englische Fassung maßgeblich.",
  },

  account: {
    title: "Konto",
    intro: "Die Cloud-Synchronisierung braucht ein Konto. Melden Sie sich einmal an, und dieselbe Wissensdatenbank begleitet Sie über Browser, Zotero und Smartphone.",
    plan: {
      label: "Tarif",
      free: "Kostenlos — lokale Wissensdatenbank",
      pro: "Pro — Cloud-Synchronisierung aktiv",
      upgrade: "Abonnieren, um die Cloud-Synchronisierung einzuschalten",
      checkout: "Abonnieren",
      cancel: "Abo kündigen",
      cancelHint: "Sie behalten den Zugang bis zum Ende des bereits bezahlten Zeitraums.",
      renewsOn: "Verlängert sich am",
      until: "Zugang bis",
      canceledUntil: "Gekündigt — Zugang bis",
      price: "$9.90 / Monat",
      notAvailable: "Das Abo ist derzeit nicht verfügbar.",
      failed: "Die Zahlung konnte nicht gestartet werden. Bitte versuchen Sie es erneut.",
      cancelDone: "Kündigung vorgemerkt. Der Zugang läuft bis zum Ende des Zeitraums weiter.",
      pricingLink: "Tarife vergleichen",
      manageBilling: "Abrechnung verwalten",
      portalFailed: "Das Abrechnungsportal konnte nicht geöffnet werden. Bitte versuchen Sie es erneut.",
      pastDue: "Zahlung fehlgeschlagen — aktualisieren Sie Ihre Karte bei Paddle, um weiter zu synchronisieren.",
    },
    signedOut: {
      heading: "Anmelden oder Konto erstellen",
      google: "Mit Google fortfahren",
      orEmail: "oder mit Ihrer E-Mail-Adresse",
      body: "Geben Sie Ihre E-Mail-Adresse ein. Wir senden einen Einmal-Link — kein Passwort zu merken, und es entsteht kein Konto, bevor Sie ihn anklicken.",
      emailLabel: "E-Mail-Adresse",
      placeholder: "you@example.com",
      send: "Anmeldelink senden",
      sending: "Wird gesendet…",
      sent: "Prüfen Sie Ihren Posteingang. Der Link verfällt nach 15 Minuten und funktioniert einmal.",
    },
    signedIn: {
      heading: "Angemeldet",
      emailLabel: "Konto",
      clipsLabel: "Wissenseinträge",
      devicesLabel: "Verbundene Geräte",
      sessionsLabel: "Browser-Sitzungen",
      noDevices: "Noch kein Client hat sich mit einem Geräte-Token angemeldet.",
      syncEndpoint: "Synchronisierungs-Endpunkt",
      signOut: "Abmelden",
      signOutAll: "Überall abmelden",
      deleteAccount: "Konto und Daten löschen",
      deleteWarning: "Damit werden alle synchronisierten Einträge, alle Geräte und das Konto selbst entfernt. Das lässt sich nicht rückgängig machen.",
      deleteConfirm: "Endgültig löschen",
      deleting: "Wird gelöscht…",
    },
    keys: {
      label: "API-Schlüssel für Agenten",
      intro:
        "Jeder KI-Agent — Claude Code, Cursor, DSH — kann Ihre Wissensdatenbank über MCP durchsuchen. Die Schlüssel sind nur lesend: Ein Agent kann finden und lesen, was Sie gespeichert haben, es aber nie ändern.",
      empty: "Noch keine Schlüssel.",
      namePlaceholder: "Wofür ist dieser Schlüssel? z. B. Claude Code",
      create: "Schlüssel erstellen",
      creating: "Wird erstellt…",
      createdHint: "Jetzt kopieren. Nur dieses eine Mal wird der vollständige Schlüssel angezeigt.",
      copy: "Kopieren",
      copied: "Kopiert",
      revoke: "Widerrufen",
      revoking: "Wird widerrufen…",
      revokedNotice: "Schlüssel widerrufen. Jeder Agent, der ihn noch nutzt, funktioniert sofort nicht mehr.",
      created: "Erstellt",
      lastUsed: "Zuletzt verwendet",
      never: "Nie verwendet",
      nameRequired: "Geben Sie dem Schlüssel zuerst einen Namen.",
      nameTaken: "Sie haben bereits einen Schlüssel mit diesem Namen.",
      limitReached: "Sie haben die Grenze aktiver Schlüssel erreicht. Widerrufen Sie einen, den Sie nicht mehr brauchen.",
      loadFailed: "Ihre API-Schlüssel konnten nicht geladen werden.",
      createFailed: "Der Schlüssel konnte nicht erstellt werden. Bitte versuchen Sie es erneut.",
      requiresPro: "Der MCP-Zugriff ist eine der kostenpflichtigen Funktionen. Abonnieren Sie, um einen Agenten zu verbinden.",
      mcpTitle: "MCP-Endpunkt",
      mcpHint: "Richten Sie Ihren Agenten auf diese URL und senden Sie den Schlüssel als Bearer-Token.",
      configTitle: "Client-Konfiguration",
    },
    errors: {
      rate_limited: "Zu viele Anfragen. Warten Sie ein paar Minuten und versuchen Sie es erneut.",
      mail_failed: "Wir konnten die E-Mail nicht senden. Versuchen Sie es gleich noch einmal.",
      mail_not_configured: "Der E-Mail-Versand ist auf dem Server nicht konfiguriert.",
      invalid_token: "Dieser Link ist ungültig oder abgelaufen. Fordern Sie einen neuen an.",
      used_token: "Dieser Link wurde bereits verwendet. Fordern Sie einen neuen an.",
      missing_token: "Dem Link fehlt sein Token. Fordern Sie einen neuen an.",
      no_session: "Sie sind nicht angemeldet.",
      invalid_session: "Ihre Sitzung ist abgelaufen. Melden Sie sich erneut an.",
      generic: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    },
    welcome: "Angemeldet. Dieses Gerät ist jetzt mit Ihrem Konto verbunden.",
    backHome: "Zurück zur Startseite",
  },

  checkout: {
    heading: "Wählen Sie Ihren Tarif",
    lede: "3 Tage kostenlose Testphase. Eine Zahlungsmethode ist erforderlich — wir belasten automatisch, sobald die Testphase endet. Bis dahin jederzeit kündbar.",
    monthly: "Monatlich",
    yearly: "Jährlich",
    perMonth: "/Monat",
    perYear: "/Jahr",
    subscribeNow: "Jetzt abonnieren",
    startTrial: "3 Tage Testphase starten",
    billingPeriod: "Abrechnungszeitraum",
    perMonthNote:
      "Preise ohne Steuern. Paddle berechnet die für Ihren Standort geltenden Steuern im Bezahlvorgang; der dort angezeigte Gesamtbetrag ist maßgeblich.",
    localized: "Die Preise werden für Ihren Standort angezeigt; der endgültige Betrag wird im Bezahlvorgang bestätigt.",
    pricesFailed: "Die Preise konnten nicht geladen werden. Bitte laden Sie die Seite neu und versuchen Sie es erneut.",
    checkoutFailed: "Der Bezahlvorgang konnte nicht geöffnet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie den Support.",
  },

  welcome: {
    heading: "Alles bereit",
    lede: "Danke für Ihr Abonnement von Renota Pro. Paddle sendet Ihnen den Beleg per E-Mail, und Sie können das Abo jederzeit verwalten.",
    accountCta: "Zu Ihrem Konto",
    homeCta: "Zurück zur Startseite",
    note: "Wenn die Bestätigungs-E-Mail nicht innerhalb weniger Minuten ankommt, prüfen Sie Ihren Spam-Ordner oder schreiben Sie an support@werenota.com.",
  },
};
