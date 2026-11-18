// 法语文案。类型来自英文版，缺字段或结构不一致会在 typecheck 阶段失败。

import type { Content } from "./en.js";

export const fr: Content = {
  siteName: "Renota",

  nav: {
    chrome: "Chrome",
    zotero: "Zotero",
    android: "Android",
    pricing: "Tarifs",
    privacy: "Confidentialité",
    account: "Compte",
    github: "GitHub",
    language: "Langue",
    home: "Accueil",
  },

  footer: {
    tagline: "Une base de connaissances privée, du navigateur à Zotero et à votre téléphone.",
    products: "Produits",
    resources: "Assistance",
    legal: "Mentions légales",
    privacy: "Politique de confidentialité",
    terms: "Conditions d'utilisation",
    copyright: "Renota",
    discord: "Discord",
    mail: "E-mail",
    madeFor: "Fait pour celles et ceux qui lisent beaucoup.",
  },

  common: {
    learnMore: "En savoir plus",
    install: "Obtenir",
    viewOnGithub: "Voir sur GitHub",
    readMore: "Lire la suite",
    faq: "Questions fréquentes",
    onThisPage: "Sur cette page",
    backToHome: "Retour à l'accueil",
    languageLabel: "Langue",
    skipToContent: "Aller au contenu",
    productsNav: "Produits",
    free: "Gratuit",
    byoKey: "Votre propre clé API",
    localFirst: "Local d'abord",
    cloudSync: "Synchronisation cloud en option",
    multiLanguage: "10 langues d'interface",
    highlights: "Ce qui le distingue",
    updated: "Dernière mise à jour",
    requirements: "Prérequis",
    note: "Remarque",
    status: "État",
  },

  seo: {
    terms: {
      title: "Conditions d'utilisation",
      description:
        "Les règles qui encadrent votre usage de Renota : votre contenu, vos clés API, l'usage acceptable, la disponibilité et la responsabilité.",
    },
    home: {
      title: "Renota — lisez, gardez l'essentiel, interrogez vos notes",
      description:
        "Renota réunit ce que vous lisez dans le navigateur, dans Zotero et sur votre téléphone dans une base de connaissances privée à interroger. Votre propre clé API.",
    },
    chrome: {
      title: "Renota pour Chrome — assistant de lecture IA avec vos notes",
      description:
        "Expliquez, critiquez ou traduisez le texte sélectionné, gardez-le dans votre base de connaissances et interrogez-la. Local d'abord, compatible OpenAI.",
    },
    zotero: {
      title: "Renota pour Zotero — assistant IA pour livres EPUB et PDF",
      description:
        "Lisez des livres dans Zotero avec explications, recherche interne et anti-spoiler. Sauvegardez des passages et prenez des notes sans quitter le lecteur.",
    },
    android: {
      title: "Renota pour Android — lecteur IA flottant pour toute appli",
      description:
        "Sélectionnez n'importe quelle zone de l'écran et posez votre question. OCR chinois hors ligne, PDF scannés pris en charge, même base de connaissances.",
    },
    privacy: {
      title: "Politique de confidentialité",
      description:
        "Ce que Renota stocke sur votre appareil, ce qui en sort, quand la synchronisation cloud envoie des données, et comment les supprimer.",
    },
    pricing: {
      title: "Tarifs — applis gratuites, synchronisation cloud payante",
      description:
        "Renota est gratuit avec votre propre clé API. La synchronisation cloud entre navigateur, Zotero et téléphone coûte US$9.90 par mois. Résiliable à tout moment.",
    },
  },

  home: {
    hero: {
      badge: "Pour celles et ceux qui lisent beaucoup",
      title: "Lisez tout. Gardez l'essentiel. Interrogez vos propres notes.",
      subtitle:
        "Renota se place à côté de ce que vous lisez — une page web, un livre dans Zotero, une page scannée sur votre téléphone — et vous aide à le comprendre. Tout ce que vous enregistrez forme une base de connaissances que vous pouvez interroger.",
      primary: "Voir les produits",
      secondary: "Lire la politique de confidentialité",
      stats: [
        { value: "3", label: "surfaces : navigateur, Zotero, Android" },
        { value: "0", label: "clé API stockée sur nos serveurs" },
        { value: "10", label: "langues d'interface" },
      ],
    },

    products: {
      title: "Trois applis, une base de connaissances",
      intro:
        "Chaque appli est utile seule. Connectez-vous une fois et les mêmes extraits, surlignages et insights vous suivent partout.",
      chrome: {
        kicker: "Extension de navigateur",
        name: "Renota pour Chrome",
        tagline: "Comprenez et réécrivez tout ce que vous lisez sur le web.",
        points: [
          "Expliquez, analysez, remettez en question, traduisez ou reliez une sélection à ce que vous avez déjà enregistré.",
          "Enregistrez un passage en un clic ; il devient un contexte interrogeable pour toutes vos questions suivantes.",
          "Réinjectez la réponse dans l'éditeur, en remplacement ou en insertion.",
        ],
        cta: "Découvrir l'extension Chrome",
      },
      zotero: {
        kicker: "Extension Zotero",
        name: "Renota pour Zotero",
        tagline: "Lisez des livres entiers avec un assistant qui a lu les mêmes pages que vous.",
        points: [
          "Fonctionne dans le lecteur Zotero pour les EPUB, les PDF et les captures de pages web.",
          "Protection anti-spoiler : le modèle ne voit jamais que le texte jusqu'à votre position de lecture.",
          "Réinjectez les explications en commentaires de surlignage ou dans votre note de lecture.",
        ],
        cta: "Découvrir l'extension Zotero",
      },
      android: {
        kicker: "Appli Android",
        name: "Renota pour Android",
        tagline: "Une boule flottante qui lit l'écran et répond, dans n'importe quelle appli.",
        points: [
          "Sélectionnez une zone de l'écran et obtenez l'OCR plus une réponse — y compris sur des PDF scannés.",
          "L'OCR chinois tourne hors ligne sur l'appareil ; seul le texte reconnu est envoyé à votre modèle.",
          "Les mêmes actions et la même base de connaissances que les applis de bureau.",
        ],
        cta: "Découvrir l'appli Android",
      },
    },

    why: {
      title: "Pensé comme un lecteur le voudrait",
      intro: "Aucun compte requis, aucun contenu envoyé chez nous, aucun enfermement.",
      items: [
        {
          title: "Votre clé, votre modèle",
          body: "Connectez OpenAI, DeepSeek, Anthropic, OpenRouter ou tout point d'accès compatible OpenAI. Les requêtes partent directement de votre appareil vers le fournisseur — jamais par nous.",
        },
        {
          title: "Local d'abord par défaut",
          body: "Les extraits, surlignages et notes vivent dans votre navigateur, dans le dossier de données de Zotero ou dans la base de l'appli. La synchronisation cloud est facultative et se désactive à tout moment.",
        },
        {
          title: "Une recherche qui fonctionne en chinois",
          body: "Recherche BM25 avec une tokenisation CJK correcte : les passages enregistrés sont vraiment retrouvés quand vous les questionnez, pas seulement quand vous vous souvenez des mots exacts.",
        },
        {
          title: "Il cite ses sources",
          body: "Les réponses citent les extraits et passages de livres utilisés, et chaque citation renvoie au texte d'origine pour que vous puissiez vérifier.",
        },
      ],
    },

    how: {
      title: "Comment ça marche",
      steps: [
        {
          title: "Capturer",
          body: "Sélectionnez du texte sur une page web, surlignez un passage dans Zotero ou encadrez une zone sur votre téléphone. Renota l'enregistre avec son contexte et sa source.",
        },
        {
          title: "Interroger",
          body: "Choisissez une action — comprendre, analyser, remettre en question, traduire, relier — ou posez votre propre question. Vos contenus enregistrés sont retrouvés et cités automatiquement.",
        },
        {
          title: "Conserver",
          body: "Réinjectez la réponse là où vous travailliez, ou enregistrez-la comme insight. Dans les deux cas, elle rejoint la même base de connaissances.",
        },
      ],
    },

    sync: {
      title: "Synchronisez quand vous le voulez",
      body: "Tout fonctionne sur un seul appareil sans compte. Si vous en utilisez plusieurs — navigateur au bureau, Zotero sur un portable, téléphone en main — connectez-vous avec un code par e-mail et synchronisez votre base de connaissances.",
      points: [
        "Désactivé par défaut : rien n'est envoyé tant que vous ne vous connectez pas.",
        "Seuls vos extraits, surlignages et insights sont synchronisés. Les clés API ne quittent jamais l'appareil.",
        "Les suppressions sont synchronisées aussi : un extrait supprimé ne réapparaît pas sur un autre appareil.",
        "Déconnectez-vous à tout moment ; la copie locale reste en place.",
      ],
    },

    mcp: {
      title: "Votre base de connaissances, comme outil pour les agents",
      lede: "Au-delà de la synchronisation cloud, les mêmes contenus peuvent être lus par d'autres programmes.",
      body:
        "Claude Code, Cursor ou un petit script que vous avez écrit peuvent rechercher vos extraits, surlignages et notes via MCP — fini le copier-coller de passages dans le prompt.",
      points: [
        "Lecture seule : un agent peut trouver et citer vos entrées, jamais les modifier ni les supprimer.",
        "Les requêtes en chinois fonctionnent aussi — il utilise le même index que les applis.",
        "Nécessite un compte sur le forfait Pro : créez une clé API sur la page du compte et placez-la dans la configuration de votre agent.",
      ],
      endpointLabel: "Point d'accès MCP",
      cta: "Créer une clé API sur la page du compte",
    },

    faq: {
      title: "Les questions qu'on nous pose",
      items: [
        {
          q: "Ai-je besoin d'un compte ?",
          a: "Non. Chaque appli fonctionne sans compte. Un compte n'est nécessaire que pour les deux fonctions payantes : la synchronisation cloud et l'accès MCP.",
        },
        {
          q: "Est-ce gratuit ?",
          a: "Les applis sont gratuites. La synchronisation cloud et l'accès MCP sont les fonctions payantes : les deux sont incluses dans l'abonnement Pro à US$9.90 par mois. Vous payez directement votre fournisseur de modèle pour l'usage de l'API — le coût dépend du modèle choisi.",
        },
        {
          q: "Où vont mes données ?",
          a: "Par défaut, nulle part : les extraits et les notes restent sur votre appareil et les prompts vont directement au fournisseur de modèle que vous avez configuré. Si vous activez la synchronisation cloud, vos entrées de connaissances sont stockées dans notre base pour que vos autres appareils puissent les lire. Les clés API ne sont jamais envoyées.",
        },
        {
          q: "Quelles langues sont prises en charge ?",
          a: "L'interface existe en dix langues — anglais, chinois simplifié, chinois traditionnel, japonais, coréen, français, allemand, espagnol, portugais et russe — toutes entièrement traduites. L'assistant répond dans la langue que vous lui demandez.",
        },
        {
          q: "Puis-je connecter ma base de connaissances à Claude Code ou Cursor ?",
          a: "Oui. Créez une clé API sur la page du compte, puis pointez votre agent vers le point d'accès MCP avec cette clé. Cela fait partie du forfait Pro et c'est en lecture seule : un agent peut lire vos entrées, pas les modifier.",
        },
      ],
    },

    cta: {
      title: "Commencez par la surface où vous lisez déjà",
      body: "Choisissez l'appli qui correspond à l'endroit où se passe l'essentiel de vos lectures. Vous pourrez ajouter les autres plus tard — la base de connaissances est partagée.",
    },
  },

  product: {
    chrome: {
      kicker: "Extension de navigateur",
      name: "Renota pour Chrome",
      tagline: "Un assistant de lecture IA qui se souvient de ce que vous avez enregistré.",
      intro:
        "Sélectionnez du texte sur n'importe quelle page et Renota l'explique, le remet en question, le traduit ou le relie à ce que vous avez lu auparavant. Gardez les passages qui comptent : ils deviennent le contexte de toutes vos questions suivantes — avec des citations vers la source.",
      highlights: [
        {
          title: "Cinq actions sur une sélection",
          body: "Comprendre, analyser, remettre en question, traduire, relier — chacune avec un prompt modifiable, plus les boutons personnalisés que vous ajoutez.",
        },
        {
          title: "Une base de connaissances, pas un journal de chat",
          body: "Les extraits et insights enregistrés sont indexés localement avec BM25 et une tokenisation CJK : la recherche les retrouve même quand vos mots diffèrent.",
        },
        {
          title: "Écrit là où vous travaillez",
          body: "Placez la réponse directement dans l'éditeur d'où vous avez sélectionné, ou copiez-la. Pas d'aller-retour par une autre fenêtre.",
        },
      ],
      features: {
        title: "Ce qu'il fait",
        items: [
          {
            title: "Barre d'outils de sélection",
            body: "Une petite barre apparaît à côté de votre sélection sur n'importe quel site, avec les actions que vous avez activées.",
          },
          {
            title: "Interroger votre bibliothèque",
            body: "Posez une question : Renota retrouve d'abord les extraits pertinents, répond à partir d'eux et numérote ses citations pour que vous puissiez ouvrir la source exacte.",
          },
          {
            title: "Votre propre modèle",
            body: "OpenAI, DeepSeek, OpenRouter ou toute URL de base compatible OpenAI. Testez la connexion depuis les réglages avant de vous y fier.",
          },
          {
            title: "Réinjection du texte",
            body: "Remplacez ou insérez la réponse dans le champ d'où vous venez — pratique pour les réponses, les notes et les brouillons.",
          },
          {
            title: "Contexte de la page",
            body: "Le texte autour de votre sélection accompagne la requête : c'est souvent la différence entre une réponse générique et une réponse utile.",
          },
          {
            title: "Dix langues d'interface",
            body: "Choisissez une langue ou suivez le navigateur. Les dix sont entièrement traduites, jusqu'aux pages légales.",
          },
        ],
      },
      steps: {
        title: "Comment l'utiliser",
        items: [
          {
            title: "Sélectionnez et choisissez une action",
            body: "Surlignez du texte, puis choisissez comprendre, analyser, remettre en question, traduire ou relier dans la barre d'outils.",
          },
          {
            title: "Lisez avec les citations",
            body: "La réponse s'affiche progressivement dans le panneau latéral. Des citations numérotées pointent vers les extraits et passages de livres utilisés.",
          },
          {
            title: "Enregistrez ou réinjectez",
            body: "Gardez la réponse comme insight, enregistrez la sélection comme extrait, ou insérez la réponse dans la page où vous écrivez.",
          },
        ],
      },
      privacy: {
        title: "Ce qui sort de votre navigateur",
        body: "Seulement ce que vous envoyez à votre fournisseur de modèle, plus la synchronisation cloud facultative si vous l'activez.",
        points: [
          "Le contenu de la page n'est envoyé à votre fournisseur que lorsque vous lancez une action, jamais en arrière-plan.",
          "Votre clé API est stockée dans le stockage local de l'extension et envoyée uniquement à ce fournisseur.",
          "Votre base de connaissances reste dans IndexedDB, sauf si vous vous connectez pour la synchronisation.",
        ],
      },
      faq: {
        title: "Questions sur l'extension Chrome",
        items: [
          {
            q: "Quels fournisseurs de modèles fonctionnent ?",
            a: "Tout ce qui parle l'API chat completions d'OpenAI — OpenAI, DeepSeek, OpenRouter, des passerelles auto-hébergées — plus toute URL de base personnalisée.",
          },
          {
            q: "Est-ce que ça marche hors ligne ?",
            a: "L'extension a besoin d'une connexion réseau pour appeler le modèle. Enregistrer, chercher et lire vos propres extraits fonctionne en local sans connexion.",
          },
          {
            q: "Puis-je modifier les prompts ?",
            a: "Oui. Chaque action intégrée a un prompt modifiable, et vous pouvez ajouter des boutons personnalisés avec leur propre prompt.",
          },
          {
            q: "Où est stockée ma base de connaissances ?",
            a: "Dans l'IndexedDB du navigateur, rattachée à l'extension. Désinstaller l'extension la supprime, sauf si vous avez activé la synchronisation cloud.",
          },
          {
            q: "Envoyez-vous quelque chose à vos serveurs ?",
            a: "Seulement des compteurs d'usage anonymes, et uniquement si vous laissez la télémétrie facultative activée. Aucun contenu de page, aucun prompt, aucune clé API.",
          },
        ],
      },
      install: {
        title: "Obtenir l'extension",
        body: "La fiche Chrome Web Store est en préparation. En attendant, le code source est sur GitHub.",
        primary: { label: "Obtenir", note: "Fiche Chrome Web Store en préparation" },
        requirements: "Chrome 120 ou plus récent. Une clé API d'un fournisseur compatible OpenAI.",
      },
    },

    zotero: {
      kicker: "Extension Zotero",
      name: "Renota pour Zotero",
      tagline: "Lisez des livres entiers avec un assistant qui a lu les mêmes pages que vous.",
      intro:
        "Renota vit dans le lecteur Zotero. Sélectionnez un passage dans un EPUB, un PDF ou une capture de page web et obtenez une explication ancrée dans ce livre — les chapitres précédents, vos propres surlignages, et rien de ce que vous n'avez pas encore lu.",
      highlights: [
        {
          title: "Aucun spoiler",
          body: "Seul le texte situé avant votre position de lecture parvient au modèle, y compris les résultats de recherche et les notes de lecture. Lisez un polar sans le gâcher.",
        },
        {
          title: "Recherche dans le livre",
          body: "Chaque livre est découpé et indexé localement : une question comme l'identité d'un personnage trouve sa réponse dans les passages précédents, avec citations.",
        },
        {
          title: "Écrit dans Zotero",
          body: "Enregistrez une explication comme commentaire de surlignage, ajoutez-la à une note de lecture, ou gardez-la comme insight dans votre base de connaissances.",
        },
      ],
      features: {
        title: "Ce qu'il fait",
        items: [
          {
            title: "Menu de sélection dans le lecteur",
            body: "Comprendre, analyser, remettre en question, traduire, qui/quoi, enregistrer, demander — juste sous le menu de sélection natif de Zotero.",
          },
          {
            title: "Rappel et résumé de chapitre",
            body: "Obtenez un rappel de ce qui s'est passé jusque-là, ou un résumé du chapitre que vous venez de terminer, construit à partir du texte avant votre position.",
          },
          {
            title: "Vos annotations deviennent des connaissances",
            body: "Les surlignages faits dans Zotero sont reflétés dans la base de connaissances au fur et à mesure, pour être retrouvés et cités plus tard.",
          },
          {
            title: "Notes de lecture",
            body: "Les réponses peuvent être ajoutées à une note par livre : un seul document qui grandit, au lieu d'annotations éparpillées.",
          },
          {
            title: "Fonctionne sur EPUB, PDF et captures",
            body: "Les chemins de chapitre et la position de lecture sont suivis là où le lecteur les expose ; pour les PDF scannés, on se rabat sur la couche de texte disponible.",
          },
          {
            title: "Partage une seule base de connaissances",
            body: "Les mêmes extraits sont visibles dans l'extension Chrome et l'appli Android lorsque la synchronisation est activée.",
          },
        ],
      },
      steps: {
        title: "Comment l'utiliser",
        items: [
          {
            title: "Installez l'extension et choisissez un modèle",
            body: "Installez le .xpi, puis renseignez le fournisseur, l'URL de base, la clé et le modèle dans les réglages de Zotero, section Renota.",
          },
          {
            title: "Ouvrez un livre et sélectionnez du texte",
            body: "Le livre est indexé en arrière-plan. Sélectionnez un passage pour faire apparaître les boutons d'action.",
          },
          {
            title: "Réinjectez le résultat",
            body: "Envoyez la réponse dans un commentaire de surlignage ou dans votre note de lecture, ou gardez-la comme insight.",
          },
        ],
      },
      privacy: {
        title: "Ce qui sort de votre machine",
        body: "Seulement le texte nécessaire pour répondre à l'action lancée, et jamais le texte situé après votre position de lecture.",
        points: [
          "L'index du livre est construit et stocké localement, dans un fichier SQLite propre à l'extension.",
          "Votre clé API réside dans les préférences de Zotero pour cette extension.",
          "La synchronisation, si elle est activée, n'envoie que des entrées de connaissances — jamais le fichier du livre.",
        ],
      },
      faq: {
        title: "Questions sur l'extension Zotero",
        items: [
          {
            q: "Quelles versions de Zotero sont prises en charge ?",
            a: "Zotero 7 est la cible, avec une compatibilité déclarée pour 8, 9 et 10.",
          },
          {
            q: "Envoyez-vous le livre entier au modèle ?",
            a: "Non. Seuls la sélection, un peu de contexte autour et une poignée de passages retrouvés sont envoyés — tous situés avant votre position de lecture.",
          },
          {
            q: "Puis-je désactiver la mise en miroir des annotations ?",
            a: "Oui, dans les réglages. La désactiver supprime aussi les annotations déjà reflétées dans la base de connaissances.",
          },
          {
            q: "Est-ce que ça marche avec les PDF scannés ?",
            a: "Seulement dans la mesure où le fichier possède une couche de texte. Les pages scannées n'offrent rien à sélectionner : utilisez l'OCR de l'appli Android dans ce cas.",
          },
          {
            q: "L'extension Chrome peut-elle lire cette bibliothèque ?",
            a: "Oui, sur la même machine : activez le point d'accès de synchronisation locale dans les réglages de l'extension et associez l'extension avec un jeton. Ou utilisez la synchronisation cloud.",
          },
        ],
      },
      install: {
        title: "Obtenir l'extension",
        body: "Téléchargez le .xpi depuis la page des versions, puis installez-le depuis le gestionnaire d'extensions de Zotero.",
        primary: { label: "Télécharger le .xpi", note: "Dernière version" },
        requirements: "Zotero 7 ou plus récent. Une clé API d'un fournisseur compatible OpenAI, ou Anthropic.",
      },
    },

    android: {
      kicker: "Appli Android",
      name: "Renota pour Android",
      tagline: "Une boule flottante qui lit l'écran et répond, dans n'importe quelle appli.",
      intro:
        "Certaines lectures échappent à la sélection de texte : une page scannée, le lecteur PDF d'un autre, une capture d'écran. Renota pose une petite boule flottante au-dessus de n'importe quelle appli. Encadrez une zone : elle reconnaît le texte sur l'appareil, l'envoie à votre modèle et affiche la réponse dans un panneau d'où vous pouvez copier.",
      highlights: [
        {
          title: "Fonctionne par-dessus n'importe quelle appli",
          body: "Encadrez une zone, ou capturez l'écran entier.",
        },
        {
          title: "OCR chinois hors ligne",
          body: "La reconnaissance tourne sur l'appareil avec ML Kit : la capture d'écran elle-même n'est envoyée nulle part.",
        },
        {
          title: "Mêmes actions, même bibliothèque",
          body: "Comprendre, analyser, remettre en question, traduire, qui/quoi, relier — avec la base de connaissances partagée avec les applis de bureau.",
        },
      ],
      features: {
        title: "Ce qu'elle fait",
        items: [
          {
            title: "Capture de zone et plein écran",
            body: "Tracez un cadre ou prenez tout l'écran, puis choisissez une action. Le texte autour sert de contexte.",
          },
          {
            title: "Option multimodale",
            body: "Si la page contient une formule, un tableau ou un schéma, envoyez l'image elle-même à un modèle capable de vision plutôt que le texte de l'OCR.",
          },
          {
            title: "Des points d'entrée partout",
            body: "Menu de sélection, feuille de partage, presse-papiers, intentions de traduction et recherches de dictionnaire peuvent tous lancer une requête.",
          },
          {
            title: "Clé API chiffrée",
            body: "La clé est stockée avec le keystore système d'Android (AES-256-GCM) plutôt qu'en clair dans les préférences.",
          },
          {
            title: "Synchronisation en arrière-plan",
            body: "Les extraits enregistrés sur le téléphone apparaissent sur les applis de bureau, et inversement, quand la synchronisation cloud est activée.",
          },
          {
            title: "Pensé pour une seule main",
            body: "La boule se déplace, se redimensionne et devient translucide, et elle se souvient de l'endroit où vous l'avez laissée.",
          },
        ],
      },
      steps: {
        title: "Comment l'utiliser",
        items: [
          {
            title: "Activez l'assistant flottant",
            body: "Accordez une fois l'autorisation d'accessibilité. La boule reste ensuite au-dessus des autres applis.",
          },
          {
            title: "Encadrez ce que vous voulez lire",
            body: "Touchez la boule, choisissez une zone ou l'écran entier, puis validez. Le texte est reconnu sur l'appareil.",
          },
          {
            title: "Demandez, enregistrez, partagez",
            body: "Choisissez une action ou tapez votre question ; enregistrez la réponse comme insight ou le texte comme extrait.",
          },
        ],
      },
      privacy: {
        title: "Ce que l'appli peut voir",
        body: "Elle ne capture que lorsque vous lancez une capture, et n'envoie que le texte reconnu à votre modèle.",
        points: [
          "Le service d'accessibilité ne lit pas le contenu de l'écran en arrière-plan et ne capture jamais de lui-même.",
          "L'OCR tourne en local ; les captures d'écran ne sont envoyées que si vous choisissez l'option multimodale.",
          "La base de connaissances est un fichier SQLite local ; la sauvegarde Android est désactivée pour elle.",
        ],
      },
      faq: {
        title: "Questions sur l'appli Android",
        items: [
          {
            q: "Pourquoi a-t-elle besoin d'un service d'accessibilité ?",
            a: "Android n'offre aucun autre moyen de dessiner par-dessus les autres applis et de prendre une capture à la demande. Le service n'agit que lorsque vous touchez la boule.",
          },
          {
            q: "Existe-t-il une version sur le Play Store ?",
            a: "Pas pour l'instant — l'assistant flottant repose sur des autorisations que les règles du store n'autorisent pas pour cet usage : il est distribué en APK à installer manuellement.",
          },
          {
            q: "L'OCR a-t-il besoin du réseau ?",
            a: "Non. La reconnaissance de texte chinois est intégrée et fonctionne hors ligne. L'appel au modèle qui suit, lui, a besoin d'une connexion.",
          },
          {
            q: "Quelles versions d'Android fonctionnent ?",
            a: "Android 11 (API 30) ou plus récent, car la capture d'écran par programme l'exige.",
          },
          {
            q: "Puis-je l'utiliser sans la boule flottante ?",
            a: "Oui — le menu de sélection, la feuille de partage et le presse-papiers fonctionnent sans l'overlay activé.",
          },
        ],
      },
      install: {
        title: "Obtenir l'appli",
        body: "Téléchargez l'APK depuis la page des versions et installez-le. Vous devrez autoriser les installations depuis votre navigateur ou votre gestionnaire de fichiers.",
        primary: { label: "Obtenir", note: "Dernière version" },
        requirements: "Android 11 ou plus récent. Une clé API d'un fournisseur compatible OpenAI, ou Anthropic.",
      },
    },
  },

  pricing: {
    title: "Tarifs",
    intro:
      "Les trois applis sont gratuites avec votre propre clé API. Ce que vous payez, c'est un seul abonnement Pro — US$9.90 par mois, qui couvre la synchronisation cloud entre le navigateur, Zotero et votre téléphone, ainsi que l'accès en lecture à votre base de connaissances via MCP.",
    badge: "Résiliable à tout moment",
    plansTitle: "Deux forfaits, une base de connaissances",
    free: {
      name: "Gratuit",
      price: "$0",
      period: "pour toujours",
      summary: "Utilisez chaque appli sur votre appareil avec votre propre clé API.",
      features: [
        "Extension Chrome, extension Zotero et appli Android",
        "Votre propre clé API — l'usage du modèle est facturé par votre fournisseur",
        "Les extraits, surlignages et notes restent sur votre appareil",
        "Aucun paiement nécessaire pour commencer",
      ],
      cta: "Obtenir les applis",
    },
    pro: {
      name: "Pro",
      price: "$9.90",
      period: "par mois",
      summary: "Activez la synchronisation cloud pour que la même base de connaissances suive chaque appareil — et laissez les agents la lire via MCP.",
      features: [
        "Tout ce qui est inclus dans Gratuit",
        "Les mêmes extraits dans le navigateur, dans Zotero et sur votre téléphone",
        "Connectez-vous sur un nouvel appareil et continuez à lire, à interroger",
        "Les suppressions sont synchronisées aussi : rien ne réapparaît sur un autre appareil",
        "Donnez à Claude Code, Cursor et d'autres agents un accès en lecture via MCP",
      ],
      cta: "S'abonner",
    },
    note:
      "Les prix sont en dollars américains, facturés mensuellement d'avance par Paddle. Votre clé API ne quitte jamais votre appareil — l'abonnement couvre la synchronisation cloud et l'accès MCP. Résiliable à tout moment ; l'accès se poursuit jusqu'à la fin de la période déjà payée.",
    faqTitle: "Questions sur l'abonnement",
    faq: [
      {
        q: "Est-ce que je paie toujours l'usage du modèle ?",
        a: "Oui. L'abonnement couvre la synchronisation cloud et l'accès MCP. Les appels au modèle vont directement au fournisseur que vous avez configuré et sont facturés par lui, jamais par nous.",
      },
      {
        q: "Que se passe-t-il si je résilie ?",
        a: "Votre base de connaissances continue de se synchroniser jusqu'à la fin de la période déjà payée. Ensuite, le compte repasse au forfait gratuit et reste en local uniquement, sans rien perdre sur vos appareils.",
      },
      {
        q: "Puis-je utiliser les applis sans abonnement ?",
        a: "Oui. Les trois applis fonctionnent pleinement sur votre appareil avec votre propre clé API. Seules la synchronisation cloud et l'accès MCP demandent un abonnement.",
      },
      {
        q: "Comment payer ?",
        a: "Le paiement est géré par Paddle, notre marchand de référence. Cartes, PayPal et moyens de paiement locaux sont disponibles selon votre pays de facturation.",
      },
      {
        q: "Où sont stockées mes informations de paiement ?",
        a: "Chez Paddle, jamais chez nous. Nous ne recevons qu'un statut d'abonnement et l'adresse e-mail du compte.",
      },
    ],
    ctaTitle: "Prêt à synchroniser ?",
    ctaBody: "Connectez-vous une fois, puis choisissez Pro sur la page du compte.",
  },

  plan: {
    description: "Accès complet sur Chrome, Zotero et Android.",
    features: [
      "Enregistrez sans limite le texte d'origine et vos propres notes",
      "Posez vos questions sur votre propre bibliothèque",
      "Synchronisez entre Chrome, Zotero et Android",
      "Essai gratuit de 3 jours, résiliable à tout moment",
    ],
  },

  privacy: {
    title: "Politique de confidentialité",
    intro: "Cette page explique ce que Renota stocke, ce qui quitte votre appareil et comment le supprimer.",
    fullPolicy: "Politique complète",
    summaryTitle: "Version courte",
    summary: [
      "Vos extraits, surlignages et notes sont stockés sur votre appareil par défaut.",
      "Les prompts et le texte qu'ils contiennent vont directement au fournisseur de modèle que vous avez configuré.",
      "Les clés API ne quittent jamais votre appareil et ne sont jamais envoyées.",
      "La synchronisation cloud est désactivée par défaut. Si vous l'activez, les entrées de connaissances sont stockées sur notre serveur pour que vos autres appareils puissent les lire.",
      "Les captures d'écran restent sur votre téléphone. L'OCR tourne sur l'appareil, et seul le texte que vous choisissez d'enregistrer est envoyé au fournisseur de modèle configuré.",
      "Vous pouvez supprimer votre compte et toutes les données synchronisées à tout moment.",
    ],
    englishNote:
      "La version ci-dessous est la traduction française officielle de la politique de confidentialité. En cas de divergence avec la version anglaise, celle-ci prévaut.",
  },

  terms: {
    title: "Conditions d'utilisation",
    intro: "Les règles d'utilisation de Renota — votre contenu reste le vôtre, les clés restent sur votre appareil, et les réponses du modèle demandent votre jugement.",
    fullPolicy: "Conditions complètes",
    summaryTitle: "Version courte",
    summary: [
      "Vous êtes propriétaire de tout ce que vous enregistrez. Nous ne le stockons et ne le transmettons que pour exécuter le service pour vous.",
      "Vous apportez votre propre clé API et payez directement votre fournisseur de modèle. Nous ne voyons jamais votre clé.",
      "Les réponses de l'IA peuvent être fausses. Renota est une aide à la lecture, pas un conseil professionnel.",
      "La synchronisation cloud est facultative ; les applis fonctionnent sans compte.",
      "Vous pouvez supprimer votre compte et les données synchronisées à tout moment.",
    ],
    englishNote:
      "La version ci-dessous est la traduction française officielle des conditions d'utilisation. En cas de divergence avec la version anglaise, celle-ci prévaut.",
  },


  account: {
    title: "Compte",
    intro: "La synchronisation cloud demande un compte. Connectez-vous une fois et la même base de connaissances vous suit dans le navigateur, dans Zotero et sur votre téléphone.",
    plan: {
      label: "Forfait",
      free: "Gratuit — base de connaissances locale",
      pro: "Pro — synchronisation cloud active",
      upgrade: "S'abonner pour activer la synchronisation cloud",
      checkout: "S'abonner",
      cancel: "Résilier l'abonnement",
      cancelHint: "Vous gardez l'accès jusqu'à la fin de la période déjà payée.",
      renewsOn: "Renouvellement le",
      until: "Accès jusqu'au",
      canceledUntil: "Résilié — accès jusqu'au",
      price: "$9.90 / mois",
      notAvailable: "L'abonnement n'est pas disponible pour le moment.",
      failed: "Impossible de démarrer le paiement. Veuillez réessayer.",
      cancelDone: "Résiliation programmée. L'accès continue jusqu'à la fin de la période.",
      pricingLink: "Comparer les forfaits",
      manageBilling: "Gérer la facturation",
      portalFailed: "Impossible d'ouvrir le portail de facturation. Veuillez réessayer.",
      pastDue: "Paiement échoué — mettez à jour votre carte chez Paddle pour continuer à synchroniser.",
    },
    signedOut: {
      heading: "Connectez-vous ou créez un compte",
      google: "Continuer avec Google",
      orEmail: "ou utilisez votre adresse e-mail",
      body: "Saisissez votre adresse e-mail. Nous envoyons un lien à usage unique — aucun mot de passe à retenir, et aucun compte n'existe avant que vous cliquiez.",
      emailLabel: "Adresse e-mail",
      placeholder: "vous@example.com",
      send: "Envoyer le lien de connexion",
      sending: "Envoi…",
      sent: "Vérifiez votre boîte de réception. Le lien expire dans 15 minutes et ne fonctionne qu'une fois.",
    },
    signedIn: {
      heading: "Connecté",
      emailLabel: "Compte",
      clipsLabel: "Entrées de connaissances",
      devicesLabel: "Appareils connectés",
      sessionsLabel: "Sessions de navigateur",
      noDevices: "Aucun client ne s'est encore connecté avec un jeton d'appareil.",
      syncEndpoint: "Point d'accès de synchronisation",
      signOut: "Se déconnecter",
      signOutAll: "Se déconnecter partout",
      deleteAccount: "Supprimer le compte et les données",
      deleteWarning: "Cela supprime chaque entrée synchronisée, chaque appareil et le compte lui-même. C'est irréversible.",
      deleteConfirm: "Supprimer définitivement",
      deleting: "Suppression…",
    },
    keys: {
      label: "Clés API pour les agents",
      intro:
        "Laissez n'importe quel agent IA — Claude Code, Cursor, DSH — rechercher votre base de connaissances via MCP. Les clés sont en lecture seule : un agent peut trouver et lire ce que vous avez enregistré, jamais le modifier.",
      empty: "Aucune clé pour l'instant.",
      namePlaceholder: "À quoi sert cette clé ? ex. Claude Code",
      create: "Créer une clé",
      creating: "Création…",
      createdHint: "Copiez-la maintenant. C'est la seule fois où la clé complète est affichée.",
      copy: "Copier",
      copied: "Copié",
      revoke: "Révoquer",
      revoking: "Révocation…",
      revokedNotice: "Clé révoquée. Tout agent qui l'utilise encore cesse de fonctionner immédiatement.",
      created: "Créée le",
      lastUsed: "Dernière utilisation",
      never: "Jamais utilisée",
      nameRequired: "Donnez d'abord un nom à la clé.",
      nameTaken: "Vous avez déjà une clé portant ce nom.",
      limitReached: "Vous avez atteint la limite de clés actives. Révoquez-en une que vous n'utilisez plus.",
      loadFailed: "Impossible de charger vos clés API.",
      createFailed: "Impossible de créer la clé. Veuillez réessayer.",
      requiresPro: "L'accès MCP est l'une des fonctions payantes. Abonnez-vous pour connecter un agent.",
      mcpTitle: "Point d'accès MCP",
      mcpHint: "Pointez votre agent vers cette URL et envoyez la clé comme jeton bearer.",
      configTitle: "Configuration du client",
    },
    errors: {
      rate_limited: "Trop de requêtes. Attendez quelques minutes et réessayez.",
      mail_failed: "Nous n'avons pas pu envoyer l'e-mail. Réessayez dans un instant.",
      mail_not_configured: "L'envoi d'e-mails n'est pas configuré sur le serveur.",
      invalid_token: "Ce lien est invalide ou a expiré. Demandez-en un nouveau.",
      used_token: "Ce lien a déjà été utilisé. Demandez-en un nouveau.",
      missing_token: "Il manque le jeton dans ce lien. Demandez-en un nouveau.",
      no_session: "Vous n'êtes pas connecté.",
      invalid_session: "Votre session a expiré. Reconnectez-vous.",
      generic: "Une erreur est survenue. Veuillez réessayer.",
    },
    welcome: "Connecté. Cet appareil est maintenant lié à votre compte.",
    backHome: "Retour à l'accueil",
  },

  checkout: {
    heading: "Choisissez votre forfait",
    lede: "Essai gratuit de 3 jours. Un moyen de paiement est requis — nous débitons automatiquement à la fin de l'essai. Résiliez à tout moment avant cette échéance.",
    monthly: "Mensuel",
    yearly: "Annuel",
    perMonth: "/mois",
    perYear: "/an",
    subscribeNow: "S'abonner maintenant",
    startTrial: "Démarrer l'essai de 3 jours",
    billingPeriod: "Période de facturation",
    perMonthNote:
      "Les prix s'entendent hors taxes. Paddle calcule les taxes applicables à votre lieu de résidence lors du paiement, et le total affiché au paiement fait foi.",
    localized: "Les prix sont affichés pour votre lieu de résidence ; le montant final est confirmé au moment du paiement.",
    pricesFailed: "Impossible de charger les prix. Veuillez actualiser la page et réessayer.",
    checkoutFailed: "Impossible d'ouvrir le paiement. Veuillez réessayer ou contacter l'assistance.",
  },

  welcome: {
    heading: "Tout est prêt",
    lede: "Merci d'avoir souscrit à Renota Pro. Paddle vous enverra le reçu par e-mail, et vous pouvez gérer l'abonnement à tout moment.",
    accountCta: "Aller à votre compte",
    homeCta: "Retour à l'accueil",
    note: "Si l'e-mail de confirmation n'arrive pas dans les minutes qui suivent, vérifiez votre dossier de spam ou écrivez à support@werenota.com.",
  },
};
