// English copy. This file is the source of truth for the content shape:
// every other locale is typed against `typeof en`, so a missing field fails the build.

export const en = {
  siteName: "Renota",

  nav: {
    chrome: "Chrome",
    zotero: "Zotero",
    android: "Android",
    privacy: "Privacy",
    github: "GitHub",
    language: "Language",
    home: "Home",
  },

  footer: {
    tagline: "One private knowledge base across the browser, Zotero and your phone.",
    products: "Products",
    resources: "Resources",
    legal: "Legal",
    privacy: "Privacy policy",
    source: "Source code",
    cloud: "Sync service",
    copyright: "Renota. Bring your own API key.",
    madeFor: "Made for people who read a lot.",
  },

  common: {
    learnMore: "Learn more",
    install: "Get it",
    viewOnGithub: "View on GitHub",
    readMore: "Read more",
    faq: "Frequently asked",
    onThisPage: "On this page",
    backToHome: "Back to home",
    languageLabel: "Language",
    free: "Free",
    byoKey: "Your own API key",
    localFirst: "Local-first",
    cloudSync: "Optional cloud sync",
    multiLanguage: "10 interface languages",
    highlights: "Why it stands out",
    updated: "Last updated",
    requirements: "Requirements",
    note: "Note",
    status: "Status",
  },

  seo: {
    home: {
      title: "Renota — read anything, keep what matters, ask your own notes",
      description:
        "Renota turns what you read in the browser, in Zotero and on your phone into one private knowledge base you can ask questions to. Bring your own API key.",
    },
    chrome: {
      title: "Renota for Chrome — an AI reading assistant with your own notes",
      description:
        "Explain, analyze, challenge and translate any selected text, save it to your own knowledge base, and ask that library questions. Local-first, works with OpenAI, DeepSeek, OpenRouter or any compatible API.",
    },
    zotero: {
      title: "Renota for Zotero — an AI reading assistant for EPUB and PDF books",
      description:
        "Read books in Zotero with explanations, in-book search and spoiler protection. Save passages, highlight and take notes without leaving the reader, then search everything later.",
    },
    android: {
      title: "Renota for Android — a floating AI reader for any app",
      description:
        "Select any region on screen and ask about it. Offline Chinese OCR, works with scanned PDFs, and shares the same knowledge base as the desktop apps.",
    },
    privacy: {
      title: "Privacy policy — Renota",
      description:
        "What Renota stores on your device, what leaves it, when cloud sync uploads anything, and how to delete it.",
    },
  },

  home: {
    hero: {
      badge: "For people who read a lot",
      title: "Read anything. Keep what matters. Ask your own notes.",
      subtitle:
        "Renota sits next to whatever you are reading — a web page, a book in Zotero, a scanned page on your phone — and helps you understand it. Everything you save becomes one knowledge base you can ask questions to.",
      primary: "See the products",
      secondary: "Read the privacy policy",
      stats: [
        { value: "3", label: "surfaces: browser, Zotero, Android" },
        { value: "0", label: "API keys stored on our servers" },
        { value: "10", label: "interface languages" },
      ],
    },

    products: {
      title: "Three apps, one knowledge base",
      intro:
        "Each app is useful on its own. Sign in once and the same clips, highlights and insights follow you across all three.",
      chrome: {
        kicker: "Browser extension",
        name: "Renota for Chrome",
        tagline: "Understand and rewrite anything you read on the web.",
        points: [
          "Explain, analyze, challenge, translate, or connect a selection to what you already saved.",
          "Save a passage in one click; it becomes searchable context for every later question.",
          "Write the answer back into the editor, replacing or inserting it.",
        ],
        cta: "Explore the Chrome extension",
      },
      zotero: {
        kicker: "Zotero plugin",
        name: "Renota for Zotero",
        tagline: "Read whole books with an assistant that has read the same pages you have.",
        points: [
          "Works inside the Zotero reader for EPUB, PDF and web snapshots.",
          "Spoiler protection: the model only ever sees text up to your reading position.",
          "Write explanations back as highlight comments or into your reading note.",
        ],
        cta: "Explore the Zotero plugin",
      },
      android: {
        kicker: "Android app",
        name: "Renota for Android",
        tagline: "A floating ball that reads the screen and answers, in any app.",
        points: [
          "Select a region on screen and get OCR plus an answer — including scanned PDFs.",
          "Runs offline Chinese OCR on the device; only the recognized text is sent to your model.",
          "The same actions and knowledge base as the desktop apps.",
        ],
        cta: "Explore the Android app",
      },
    },

    why: {
      title: "Built the way a reader would want it",
      intro: "No account required, no content sent to us, no lock-in.",
      items: [
        {
          title: "Your key, your model",
          body: "Connect OpenAI, DeepSeek, Anthropic, OpenRouter or any OpenAI-compatible endpoint. Requests go straight from your device to the provider — never through us.",
        },
        {
          title: "Local-first by default",
          body: "Clips, highlights and notes live in your browser, in Zotero's data folder, or in the app's database. Cloud sync is opt-in and can be switched off at any time.",
        },
        {
          title: "Retrieval that works in Chinese",
          body: "BM25 search with proper CJK tokenization, so saved passages are actually found when you ask about them — not just when you remember the exact words.",
        },
        {
          title: "Shows its sources",
          body: "Answers cite the clips and book passages they used, and every citation links back to the original text so you can check it.",
        },
      ],
    },

    how: {
      title: "How it works",
      steps: [
        {
          title: "Capture",
          body: "Select text on a web page, highlight a passage in Zotero, or frame a region on your phone. Renota saves it with its context and source.",
        },
        {
          title: "Ask",
          body: "Pick an action — understand, analyze, challenge, translate, connect — or ask your own question. Your saved material is retrieved and cited automatically.",
        },
        {
          title: "Keep",
          body: "Write the answer back where you were working, or save it as an insight. Either way it joins the same knowledge base.",
        },
      ],
    },

    sync: {
      title: "Sync when you want it",
      body: "Everything works on one device without an account. If you use more than one — browser at your desk, Zotero on a laptop, phone in hand — you can sign in with an email code and sync your knowledge base.",
      points: [
        "Off by default: nothing is uploaded until you sign in.",
        "Only your clips, highlights and insights are synced. API keys never leave the device.",
        "Deletions sync too, so a deleted clip does not reappear on another device.",
        "Sign out at any time; the local copy stays where it is.",
      ],
    },

    faq: {
      title: "Questions people ask",
      items: [
        {
          q: "Do I need an account?",
          a: "No. Each app works without one. An account is only used for optional cloud sync between devices.",
        },
        {
          q: "Is it free?",
          a: "The apps are free and open source. You pay your model provider directly for API usage — the cost depends on which model you choose.",
        },
        {
          q: "Where does my data go?",
          a: "By default nowhere: clips and notes stay on your device and prompts go directly to the model provider you configured. If you enable cloud sync, your knowledge entries are stored in our database so your other devices can read them. API keys are never uploaded.",
        },
        {
          q: "Which languages are supported?",
          a: "The interface ships with English and Simplified Chinese, with the other common languages selectable. The assistant answers in whatever language you ask it to.",
        },
      ],
    },

    cta: {
      title: "Start with the surface you already read on",
      body: "Pick the app that matches where most of your reading happens. You can add the others later — the knowledge base is shared.",
    },
  },

  product: {
    chrome: {
      kicker: "Browser extension",
      name: "Renota for Chrome",
      tagline: "An AI reading assistant that remembers what you saved.",
      intro:
        "Select text on any page and Renota explains it, challenges it, translates it, or connects it to what you read before. Save the parts worth keeping and they become context for every later question — with citations back to the source.",
      highlights: [
        {
          title: "Five actions on a selection",
          body: "Understand, analyze, challenge, translate, connect — each with a prompt you can edit, plus any custom buttons you add.",
        },
        {
          title: "A knowledge base, not a chat log",
          body: "Saved clips and insights are indexed locally with BM25 and CJK tokenization, so retrieval finds them even when your wording differs.",
        },
        {
          title: "Writes where you are working",
          body: "Put the answer straight into the editor you selected from, or copy it. No round trip through another window.",
        },
      ],
      features: {
        title: "What it does",
        items: [
          {
            title: "Selection toolbar",
            body: "A small toolbar appears next to your selection on any site, with the actions you enabled.",
          },
          {
            title: "Ask your library",
            body: "Ask a question and Renota retrieves the relevant clips first, answers from them, and numbers its citations so you can open the exact source.",
          },
          {
            title: "Bring your own model",
            body: "OpenAI, DeepSeek, OpenRouter, or any OpenAI-compatible base URL. Test the connection from settings before you rely on it.",
          },
          {
            title: "Writing back",
            body: "Replace or insert the answer into the field you came from — useful for replies, notes and drafts.",
          },
          {
            title: "Page context",
            body: "The text around your selection travels with the request, which is usually the difference between a generic and a useful answer.",
          },
          {
            title: "Ten interface languages",
            body: "Pick a language or follow the browser. English and Simplified Chinese are fully translated.",
          },
        ],
      },
      steps: {
        title: "How to use it",
        items: [
          {
            title: "Select and pick an action",
            body: "Highlight text, then choose understand, analyze, challenge, translate or connect from the toolbar.",
          },
          {
            title: "Read with citations",
            body: "The answer streams into the side panel. Numbered citations point at the clips and book passages it used.",
          },
          {
            title: "Save or write back",
            body: "Keep the answer as an insight, save the selection as a clip, or insert the answer into the page you are writing in.",
          },
        ],
      },
      privacy: {
        title: "What leaves your browser",
        body: "Only what you send to your model provider, plus optional cloud sync if you turn it on.",
        points: [
          "Page content is sent to your provider only when you run an action, never in the background.",
          "Your API key is stored in the extension's local storage and sent only to that provider.",
          "Your knowledge base stays in IndexedDB unless you sign in for sync.",
        ],
      },
      faq: {
        title: "Chrome extension questions",
        items: [
          {
            q: "Which model providers work?",
            a: "Anything that speaks the OpenAI chat completions API — OpenAI, DeepSeek, OpenRouter, self-hosted gateways — plus any custom base URL.",
          },
          {
            q: "Does it work offline?",
            a: "The extension needs a network connection for model calls. Saving, searching and reading your own clips works locally without one.",
          },
          {
            q: "Can I edit the prompts?",
            a: "Yes. Each built-in action has an editable prompt, and you can add custom buttons with their own prompt.",
          },
          {
            q: "Where is my knowledge base stored?",
            a: "In the browser's IndexedDB, scoped to the extension. Uninstalling the extension removes it unless you enabled cloud sync.",
          },
          {
            q: "Does it send anything to your servers?",
            a: "Only anonymous usage counters, and only if you leave the opt-in telemetry switch on. No page content, no prompts, no API keys.",
          },
        ],
      },
      install: {
        title: "Get the extension",
        body: "Install from the Chrome Web Store, or load the unpacked build from the repository.",
        primary: { label: "Chrome Web Store", note: "Listing in preparation" },
        secondary: { label: "Build from source", note: "npm run build, then load the dist folder" },
        requirements: "Chrome 120 or newer. An API key from any OpenAI-compatible provider.",
      },
    },

    zotero: {
      kicker: "Zotero plugin",
      name: "Renota for Zotero",
      tagline: "Read whole books with an assistant that has read the same pages you have.",
      intro:
        "Renota lives inside the Zotero reader. Select a passage in an EPUB, a PDF or a web snapshot and get an explanation grounded in this book — the earlier chapters, your own highlights, and nothing you have not read yet.",
      highlights: [
        {
          title: "No spoilers",
          body: "Only text before your reading position reaches the model, including search results and reading notes. Read a mystery without ruining it.",
        },
        {
          title: "In-book search",
          body: "Every book is chunked and indexed locally, so questions like who a character is can be answered from earlier passages with citations.",
        },
        {
          title: "Writes back into Zotero",
          body: "Save an explanation as a highlight comment, append it to a reading note, or keep it as an insight in your knowledge base.",
        },
      ],
      features: {
        title: "What it does",
        items: [
          {
            title: "Selection popup in the reader",
            body: "Understand, analyze, challenge, translate, who/what, save, ask — right below Zotero's own selection popup.",
          },
          {
            title: "Recap and chapter summary",
            body: "Get a reminder of what happened so far, or a summary of the chapter you just finished, built from text before your position.",
          },
          {
            title: "Your annotations become knowledge",
            body: "Highlights made in Zotero are mirrored into the knowledge base as they are created, so they can be searched and cited later.",
          },
          {
            title: "Reading notes",
            body: "Answers can be appended to a note per book, giving you one growing document instead of scattered annotations.",
          },
          {
            title: "Works on EPUB, PDF and snapshots",
            body: "Chapter paths and reading position are tracked where the reader exposes them; scanned PDFs fall back to whatever text layer exists.",
          },
          {
            title: "Shares one knowledge base",
            body: "The same clips are visible in the Chrome extension and the Android app when sync is enabled.",
          },
        ],
      },
      steps: {
        title: "How to use it",
        items: [
          {
            title: "Install the plugin and set a model",
            body: "Install the .xpi, then fill in the provider, base URL, key and model in Zotero's settings under Renota.",
          },
          {
            title: "Open a book and select text",
            body: "The book is indexed in the background. Select a passage to get the action buttons.",
          },
          {
            title: "Write it back",
            body: "Send the answer to a highlight comment or your reading note, or keep it as an insight.",
          },
        ],
      },
      privacy: {
        title: "What leaves your machine",
        body: "Only the text needed to answer the action you started, and never text after your reading position.",
        points: [
          "The book index is built and stored locally in a plugin-owned SQLite file.",
          "Your API key lives in Zotero's preferences for this plugin.",
          "Sync, if enabled, uploads knowledge entries only — never the book file.",
        ],
      },
      faq: {
        title: "Zotero plugin questions",
        items: [
          {
            q: "Which Zotero versions are supported?",
            a: "Zotero 7 is the target, with compatibility declared for 8, 9 and 10.",
          },
          {
            q: "Does it send the whole book to the model?",
            a: "No. Only the selection, a little surrounding context and a handful of retrieved passages are sent — all from before your reading position.",
          },
          {
            q: "Can I turn off annotation mirroring?",
            a: "Yes, in settings. Turning it off also removes annotations that were already mirrored into the knowledge base.",
          },
          {
            q: "Does it work with scanned PDFs?",
            a: "Only to the extent the file has a text layer. Scanned pages have nothing to select, so use the Android app's OCR for those.",
          },
          {
            q: "Can the Chrome extension read this library?",
            a: "Yes, on the same machine: enable the local sync endpoint in the plugin settings and pair the extension with a token. Or use cloud sync.",
          },
        ],
      },
      install: {
        title: "Get the plugin",
        body: "Download the .xpi from the releases page, then install it from Zotero's plugin manager.",
        primary: { label: "Download .xpi", note: "Latest release" },
        secondary: { label: "Build from source", note: "npm run build produces the .xpi" },
        requirements: "Zotero 7 or newer. An API key from any OpenAI-compatible provider, or Anthropic.",
      },
    },

    android: {
      kicker: "Android app",
      name: "Renota for Android",
      tagline: "A floating ball that reads the screen and answers, in any app.",
      intro:
        "Some reading happens where you cannot select text: a scanned page, someone else's PDF viewer, a screenshot. Renota puts a small floating ball over any app. Frame a region, and it recognizes the text on the device, sends it to your model, and shows the answer in a panel you can copy from.",
      highlights: [
        {
          title: "Works over any app",
          body: "Frame a region or the whole screen. The accessibility service only captures when you ask it to.",
        },
        {
          title: "Offline Chinese OCR",
          body: "Recognition runs on the device with ML Kit, so the screenshot itself is not uploaded anywhere.",
        },
        {
          title: "Same actions, same library",
          body: "Understand, analyze, challenge, translate, who/what, connect — with the knowledge base shared with the desktop apps.",
        },
      ],
      features: {
        title: "What it does",
        items: [
          {
            title: "Region and full-screen capture",
            body: "Drag a box or take the whole screen, then choose an action. Surrounding text becomes context.",
          },
          {
            title: "Multimodal option",
            body: "If the page is a formula, a table or a diagram, send the image itself to a vision-capable model instead of OCR text.",
          },
          {
            title: "Entry points everywhere",
            body: "Selection menu, share sheet, clipboard, translation intents and dictionary lookups can all start a request.",
          },
          {
            title: "Encrypted API key",
            body: "The key is stored with Android's system keystore (AES-256-GCM) rather than in plain preferences.",
          },
          {
            title: "Background sync",
            body: "Clips saved on the phone appear on the desktop apps and vice versa, when cloud sync is enabled.",
          },
          {
            title: "Built for one-handed use",
            body: "The ball can be moved, resized and made translucent, and it remembers where you left it.",
          },
        ],
      },
      steps: {
        title: "How to use it",
        items: [
          {
            title: "Enable the floating assistant",
            body: "Grant the accessibility permission once. The ball stays above other apps after that.",
          },
          {
            title: "Frame what you want to read",
            body: "Tap the ball, choose region or full screen, and confirm. Text is recognized on the device.",
          },
          {
            title: "Ask, save, share",
            body: "Pick an action or type your own question; save the answer as an insight or the text as a clip.",
          },
        ],
      },
      privacy: {
        title: "What the app can see",
        body: "It captures only when you start a capture, and sends only the recognized text to your model.",
        points: [
          "The accessibility service does not read screen content in the background and never captures on its own.",
          "OCR runs locally; screenshots are not uploaded unless you choose the multimodal option.",
          "The knowledge base is a local SQLite file; Android backup is disabled for it.",
        ],
      },
      faq: {
        title: "Android app questions",
        items: [
          {
            q: "Why does it need an accessibility service?",
            a: "Android has no other way to draw over other apps and take a screenshot on demand. The service only acts when you tap the ball.",
          },
          {
            q: "Is there a Play Store version?",
            a: "Not currently — the floating assistant relies on permissions that store policy does not allow for this use case, so it ships as a sideloaded APK.",
          },
          {
            q: "Does OCR need the network?",
            a: "No. Chinese text recognition is bundled and runs offline. The model call afterwards does need a connection.",
          },
          {
            q: "Which Android versions work?",
            a: "Android 11 (API 30) or newer, since taking screenshots programmatically requires it.",
          },
          {
            q: "Can I use it without the floating ball?",
            a: "Yes — the selection menu, share sheet and clipboard entry points work without the overlay enabled.",
          },
        ],
      },
      install: {
        title: "Get the app",
        body: "Download the APK from the releases page and install it. You will need to allow installs from your browser or file manager.",
        primary: { label: "Download APK", note: "Latest release" },
        secondary: { label: "Build from source", note: "./gradlew assembleDebug, needs JDK 17 and Android SDK 35" },
        requirements: "Android 11 or newer. An API key from any OpenAI-compatible provider, or Anthropic.",
      },
    },
  },

  privacy: {
    title: "Privacy policy",
    intro: "This page explains what Renota stores, what leaves your device, and how to delete it.",
    fullPolicy: "Full policy",
    summaryTitle: "Short version",
    summary: [
      "Your clips, highlights and notes are stored on your device by default.",
      "Prompts and the text they contain go directly to the model provider you configured.",
      "API keys never leave your device and are never uploaded.",
      "Cloud sync is off by default. If you enable it, knowledge entries are stored on our server so your other devices can read them.",
      "The Android app on Google Play uses no Accessibility Service: the floating ball uses the system overlay permission, and screen capture goes through Android's MediaProjection consent dialog.",
      "Screenshots stay on your phone. OCR runs on the device, and only the text you choose to save is sent to the model provider you configured.",
      "You can delete your account and all synced data at any time.",
    ],
    englishNote:
      "The full policy below is the authoritative version and is written in English. If anything in the summary differs, the full policy prevails.",
  },
};

export type Content = typeof en;
