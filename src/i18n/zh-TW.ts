// 繁体中文文案。类型来自英文版，缺字段或结构不一致会在 typecheck 阶段失败。

import type { Content } from "./en.js";

export const zhTW: Content = {
  siteName: "睿記",

  nav: {
    chrome: "Chrome 擴充功能",
    zotero: "Zotero 外掛",
    android: "Android 版",
    pricing: "價格",
    privacy: "隱私權",
    account: "帳號",
    github: "GitHub",
    language: "語言",
    home: "首頁",
  },

  footer: {
    tagline: "瀏覽器、Zotero 和手機共用一份私有知識庫。",
    products: "產品",
    resources: "支援",
    legal: "法律",
    privacy: "隱私權政策",
    terms: "服務條款",
    copyright: "睿記 Renota。自備 API Key。",
    discord: "Discord",
    mail: "郵件",
    madeFor: "為讀得多的人而做。",
  },

  common: {
    learnMore: "瞭解詳情",
    install: "取得",
    viewOnGithub: "在 GitHub 檢視",
    readMore: "繼續閱讀",
    faq: "常見問題",
    onThisPage: "本頁內容",
    backToHome: "返回首頁",
    languageLabel: "語言",
    skipToContent: "跳至內容",
    productsNav: "產品",
    free: "免費",
    byoKey: "自備 API Key",
    localFirst: "本機優先",
    cloudSync: "選用雲端同步",
    multiLanguage: "10 種介面語言",
    highlights: "亮點",
    updated: "更新時間",
    requirements: "系統需求",
    note: "說明",
    status: "狀態",
  },

  seo: {
    terms: {
      title: "服務條款",
      description:
        "使用睿記的服務條款：內容歸屬、API Key、可接受使用、服務可用性與責任範圍。",
    },
    home: {
      title: "睿記 Renota — 讀任何東西，留下重要的，再問自己的筆記",
      description:
        "睿記把你用瀏覽器、Zotero 和手機讀到的內容，彙整成一份可以提問的私有知識庫。自備 API Key，資料預設留在本機。",
    },
    chrome: {
      title: "睿記 Chrome 擴充功能 — 帶著你筆記的 AI 閱讀助手",
      description:
        "選取網頁文字即可解釋、分析、質疑、翻譯，一鍵存進自己的知識庫，再對知識庫提問。本機優先，支援 OpenAI、DeepSeek、OpenRouter 及任何相容 API。",
    },
    zotero: {
      title: "睿記 Zotero 外掛 — 讀 EPUB 與 PDF 書籍的 AI 助手",
      description:
        "在 Zotero 閱讀器裡邊讀邊問：解釋、書內搜尋、防劇透、前情回顧與本章摘要。螢光標記和筆記可存回 Zotero，也能進知識庫日後檢索。",
    },
    android: {
      title: "睿記 Android 版 — 任何應用程式都能用的懸浮 AI 閱讀器",
      description:
        "在畫面上框選任一區域提問。離線中文 OCR，掃描版 PDF 也能用，與桌面端共用同一份知識庫。",
    },
    privacy: {
      title: "隱私權政策",
      description: "睿記在你的裝置上存了什麼、什麼會離開裝置、開啟雲端同步時會上傳什麼，以及如何刪除。",
    },
    pricing: {
      title: "價格 — 應用程式免費，雲端同步訂閱制",
      description: "睿記三個應用程式自備 API Key 就能免費使用。瀏覽器、Zotero 與手機之間的雲端同步每月 9.90 美元，隨時可取消。",
    },
  },

  home: {
    hero: {
      badge: "為讀得多的人",
      title: "讀任何東西，留下重要的，然後問自己的筆記。",
      subtitle:
        "睿記待在你正在讀的內容旁邊 —— 網頁、Zotero 裡的書、手機上掃描的一頁 —— 幫你讀懂它。你存下來的內容會彙整成一份知識庫，隨時可以提問。",
      primary: "看看三個產品",
      secondary: "閱讀隱私權政策",
      stats: [
        { value: "3", label: "種入口：瀏覽器、Zotero、Android" },
        { value: "0", label: "API Key 存在我們的伺服器上" },
        { value: "10", label: "種介面語言" },
      ],
    },

    products: {
      title: "三個應用程式，一份知識庫",
      intro:
        "每個應用程式單獨用都成立；登入一次，同一批片段、螢光標記和洞見就會跟著你在三端之間走。",
      chrome: {
        kicker: "瀏覽器擴充功能",
        name: "睿記 Chrome 擴充功能",
        tagline: "讀懂網頁上任何一段文字，並改寫成你要的樣子。",
        points: [
          "對選取的文字做理解、分析、質疑、翻譯，或與已儲存的內容做連結。",
          "一鍵儲存段落，它會成為之後每次提問的可檢索背景。",
          "把答案寫回編輯器，要取代或插入都可以。",
        ],
        cta: "進一步瞭解 Chrome 擴充功能",
      },
      zotero: {
        kicker: "Zotero 外掛",
        name: "睿記 Zotero 外掛",
        tagline: "用讀過同樣頁數的助手，讀完一整本書。",
        points: [
          "直接跑在 Zotero 閱讀器裡，支援 EPUB、PDF 和網頁快照。",
          "防劇透：模型永遠只看到你目前閱讀位置之前的文字。",
          "把解釋寫回螢光標記註解，或附加到閱讀筆記。",
        ],
        cta: "進一步瞭解 Zotero 外掛",
      },
      android: {
        kicker: "Android 應用程式",
        name: "睿記 Android 版",
        tagline: "一顆懸浮球，讀螢幕、給答案，在任何應用程式裡。",
        points: [
          "在螢幕上框選一個區域，OCR 加回答 —— 掃描版 PDF 也能用。",
          "中文 OCR 在裝置上離線完成，只有辨識出的文字會送給模型。",
          "與桌面端相同的動作體系和知識庫。",
        ],
        cta: "進一步瞭解 Android 版",
      },
    },

    why: {
      title: "照讀者希望的方式打造",
      intro: "不需要帳號，不把內容送給我們，也不會把你鎖在裡面。",
      items: [
        {
          title: "你的金鑰，你的模型",
          body: "接上 OpenAI、DeepSeek、Anthropic、OpenRouter 或任何相容 OpenAI 的端點。請求從你的裝置直接送往服務商，不經過我們。",
        },
        {
          title: "預設本機優先",
          body: "片段、螢光標記和筆記存在瀏覽器裡、Zotero 的資料夾裡，或應用程式自己的資料庫裡。雲端同步是選用功能，隨時可以關掉。",
        },
        {
          title: "中文檢索真的能用",
          body: "BM25 檢索搭配中文分詞，提問時找得到你存過的段落 —— 而不是只有記得原話才搜得到。",
        },
        {
          title: "附上出處",
          body: "答案會標示引用了哪些片段和書中段落，每個引用都能跳回原文，方便核對。",
        },
      ],
    },

    how: {
      title: "怎麼運作",
      steps: [
        {
          title: "蒐集",
          body: "在網頁上選取文字、在 Zotero 裡標記段落，或在手機上框住一塊畫面。睿記會連同背景和來源一起儲存。",
        },
        {
          title: "提問",
          body: "選一個動作 —— 理解、分析、質疑、翻譯、連結 —— 或直接問自己的問題。儲存過的內容會被自動檢索並引用。",
        },
        {
          title: "留下",
          body: "把答案寫回你正在寫的地方，或存成洞見。兩種做法都會進入同一份知識庫。",
        },
      ],
    },

    sync: {
      title: "想同步時再同步",
      body: "單一裝置不需要帳號也能完整使用。如果你用不只一台 —— 桌上的瀏覽器、筆電上的 Zotero、手上的手機 —— 可以用電子郵件驗證碼登入，把知識庫同步起來。",
      points: [
        "預設關閉：登入之前不會上傳任何內容。",
        "只同步知識條目：片段、螢光標記和洞見。API Key 永遠留在裝置上。",
        "刪除也會同步，不會出現「刪掉的東西在另一台裝置上又跑回來」。",
        "隨時可以登出，本機副本原樣保留。",
      ],
    },

    mcp: {
      title: "你的知識庫，也是 agent 的工具",
      lede: "除了雲端同步，同一份內容還能被其他程式讀懂。",
      body:
        "Claude Code、Cursor，或你自己寫的小腳本，都能透過 MCP 直接檢索你存下的片段、螢光標記和筆記 —— 不用再一段段貼進提示詞。",
      points: [
        "唯讀：agent 找得到並引用你的條目，但不能修改或刪除。",
        "中文照樣搜得到 —— 用的是和應用程式內同一套索引。",
        "需要帳號與 Pro 訂閱：在帳號頁建立一組 API 金鑰，填進 agent 的設定即可。",
      ],
      endpointLabel: "MCP 端點",
      cta: "在帳號頁建立 API 金鑰",
    },

    faq: {
      title: "經常被問到",
      items: [
        {
          q: "需要註冊帳號嗎？",
          a: "不需要。每個應用程式不登入都能用。帳號只用在選用的跨裝置雲端同步。",
        },
        {
          q: "要收費嗎？",
          a: "應用程式本身免費且開源。模型呼叫由你自己的服務商計費，花多少取決於你選的模型。",
        },
        {
          q: "我的資料會去哪裡？",
          a: "預設哪裡都不去：片段和筆記留在你的裝置上，提示詞直接送給你設定的模型服務商。只有你主動開啟雲端同步時，知識條目才會存進我們的資料庫，讓其他裝置讀得到。API Key 從不上傳。",
        },
        {
          q: "支援哪些語言？",
          a: "介面提供英文、簡體中文、繁體中文、日文、韓文、法文、德文、西班牙文、葡萄牙文和俄文共十種語言，且全部為完整翻譯。助手會用你要求的語言回答。",
        },
        {
          q: "可以把知識庫接到 Claude Code 或 Cursor 嗎？",
          a: "可以。在帳號頁建立一組 API 金鑰，把 MCP 端點和金鑰填進 agent 的設定即可。這項能力包含在 Pro 訂閱裡，而且是唯讀的 —— agent 讀得到，改不了。",
        },
      ],
    },

    cta: {
      title: "從你平常讀最多的地方開始",
      body: "先挑一個最貼近你閱讀場景的應用程式，其他的之後再裝 —— 知識庫是共用的。",
    },
  },

  product: {
    chrome: {
      kicker: "瀏覽器擴充功能",
      name: "睿記 Chrome 擴充功能",
      tagline: "一個記得你存過什麼的 AI 閱讀助手。",
      intro:
        "在任何網頁上選取文字，睿記會解釋它、質疑它、翻譯它，或與你之前讀過的內容做連結。把值得留的部分存下來，它們會成為之後每次提問的背景 —— 並附上指回原文的引用。",
      highlights: [
        {
          title: "選取文字上的五個動作",
          body: "理解、分析、質疑、翻譯、連結 —— 提示詞都可以改，也能自己新增按鈕。",
        },
        {
          title: "是知識庫，不是聊天紀錄",
          body: "儲存的片段和洞見會在本機建立 BM25 索引（含中文分詞），措辭不同也檢索得到。",
        },
        {
          title: "寫回你正在寫的地方",
          body: "把答案直接寫進你選取的輸入框，或複製走。不用切到另一個視窗。",
        },
      ],
      features: {
        title: "它能做什麼",
        items: [
          {
            title: "選取工具列",
            body: "在任何網站選取文字，旁邊會出現一個小工具列，裡面是你啟用的動作。",
          },
          {
            title: "問知識庫",
            body: "提問時先檢索相關片段，再根據它們作答，並為引用編號 —— 點開就能看到原文那一筆。",
          },
          {
            title: "自備模型",
            body: "OpenAI、DeepSeek、OpenRouter，或任何相容 OpenAI 的端點。設定完可以先測試連線再使用。",
          },
          {
            title: "寫回",
            body: "把答案取代或插入到你剛才編輯的位置，適合寫回覆、做筆記、改草稿。",
          },
          {
            title: "頁面背景",
            body: "選取範圍前後的文字會隨請求一起送出，這通常決定答案是有用還是空泛。",
          },
          {
            title: "十種介面語言",
            body: "可以手動選擇，也可以跟隨瀏覽器。十種語言全部完整翻譯，連法律條款也不例外。",
          },
        ],
      },
      steps: {
        title: "怎麼使用",
        items: [
          {
            title: "選取並挑一個動作",
            body: "劃出文字，從工具列選理解、分析、質疑、翻譯或連結。",
          },
          {
            title: "帶著引用讀答案",
            body: "答案會串流顯示在側邊面板，編號引用指向它用到的片段和書中段落。",
          },
          {
            title: "儲存或寫回",
            body: "把答案存成洞見、把選取範圍存成片段，或把答案插入你正在寫的頁面。",
          },
        ],
      },
      privacy: {
        title: "什麼會離開你的瀏覽器",
        body: "只有你主動送給模型服務商的內容；另外如果你開啟雲端同步，會同步知識條目。",
        points: [
          "只有在你執行動作時，頁面內容才會送往你的服務商，不會在背景送出。",
          "API Key 存在擴充功能的本機儲存空間，只會送給該服務商。",
          "知識庫存放在 IndexedDB，除非你登入開啟同步。",
        ],
      },
      faq: {
        title: "Chrome 擴充功能常見問題",
        items: [
          {
            q: "支援哪些模型服務商？",
            a: "凡是相容 OpenAI chat completions API 的都可以 —— OpenAI、DeepSeek、OpenRouter、自架閘道，以及任何自訂端點。",
          },
          {
            q: "可以離線使用嗎？",
            a: "呼叫模型需要連線。儲存、檢索、閱讀自己存下的片段是本機功能，斷網也能用。",
          },
          {
            q: "提示詞可以改嗎？",
            a: "可以。每個內建動作的提示詞都能編輯，也能新增屬於你的自訂按鈕。",
          },
          {
            q: "知識庫存在哪裡？",
            a: "存在瀏覽器的 IndexedDB 裡，屬於擴充功能自己的儲存空間。如果沒有開啟雲端同步，移除擴充功能會一併刪除。",
          },
          {
            q: "會往你們的伺服器送東西嗎？",
            a: "只有在保留那個選用的匿名統計開關時，才會送出使用次數。不含頁面內容、不含提示詞、不含 API Key。",
          },
        ],
      },
      install: {
        title: "取得擴充功能",
        body: "Chrome 線上應用程式商店上架準備中，目前原始碼在 GitHub 上。",
        primary: { label: "取得", note: "Chrome 線上應用程式商店上架準備中" },
        requirements: "Chrome 120 或更新版本，以及任一相容 OpenAI 服務商的 API Key。",
      },
    },

    zotero: {
      kicker: "Zotero 外掛",
      name: "睿記 Zotero 外掛",
      tagline: "用讀過同樣頁數的助手，讀完一整本書。",
      intro:
        "睿記住在 Zotero 閱讀器裡。在 EPUB、PDF 或網頁快照中選取一段，就能得到基於這本書本身的解釋 —— 用到前面的章節和你自己的螢光標記，但不會越過你還沒讀的部分。",
      highlights: [
        {
          title: "不劇透",
          body: "只有你閱讀位置之前的文字會進到模型，書內搜尋結果和閱讀筆記也一樣。",
        },
        {
          title: "書內搜尋",
          body: "每本書都會在本機切塊建索引，「這個角色是誰」這類問題能從前文找到答案並給出引用。",
        },
        {
          title: "寫回 Zotero",
          body: "把解釋存成螢光標記註解、附加到閱讀筆記，或作為洞見留在知識庫裡。",
        },
      ],
      features: {
        title: "它能做什麼",
        items: [
          {
            title: "閱讀器裡的選取彈出視窗",
            body: "在 Zotero 自帶的彈出視窗下方提供理解、分析、質疑、翻譯、誰/是什麼、儲存和詢問 AI。",
          },
          {
            title: "前情提要與本章摘要",
            body: "回想一下前面發生了什麼，或總結剛讀完的這一章 —— 都只用你讀過的內容產生。",
          },
          {
            title: "標註變成知識",
            body: "在 Zotero 裡做的螢光標記會在建立時同步鏡射進知識庫，之後可以檢索和引用。",
          },
          {
            title: "閱讀筆記",
            body: "答案可以按書附加到同一則筆記，最後得到一份持續生長的檔案，而不是散落各處的註解。",
          },
          {
            title: "EPUB、PDF 與網頁快照",
            body: "閱讀器能提供時，會追蹤章節路徑和閱讀位置；掃描版 PDF 則退回到檔案裡既有的文字層。",
          },
          {
            title: "共用一份知識庫",
            body: "開啟同步後，同一批條目在 Chrome 擴充功能和 Android 版裡都看得到。",
          },
        ],
      },
      steps: {
        title: "怎麼使用",
        items: [
          {
            title: "安裝外掛並設定模型",
            body: "安裝 .xpi 後，在 Zotero 設定的「睿記」裡填寫服務商、端點、金鑰和模型。",
          },
          {
            title: "開啟書，選取文字",
            body: "書會在背景建立索引。選取一段文字就會出現動作按鈕。",
          },
          {
            title: "寫回結果",
            body: "把答案送進螢光標記註解或閱讀筆記，也可以存成洞見。",
          },
        ],
      },
      privacy: {
        title: "什麼會離開你的電腦",
        body: "只有回答這次動作所需的文字，而且永遠不會包含你閱讀位置之後的內容。",
        points: [
          "書內索引在本機建立，存放在外掛自己的 SQLite 檔案裡。",
          "API Key 存在 Zotero 這個外掛的偏好設定裡。",
          "開啟同步時也只上傳知識條目，不上傳書籍檔案本身。",
        ],
      },
      faq: {
        title: "Zotero 外掛常見問題",
        items: [
          {
            q: "支援哪些 Zotero 版本？",
            a: "目標版本是 Zotero 7，同時宣告相容 8、9、10。",
          },
          {
            q: "會把整本書送給模型嗎？",
            a: "不會。只送出選取範圍、少量周邊背景和幾段檢索到的段落，而且都在你的閱讀位置之前。",
          },
          {
            q: "可以關掉標註鏡射嗎？",
            a: "可以，在設定裡關閉。關閉時也會把已經鏡射進知識庫的標註一併移除。",
          },
          {
            q: "掃描版 PDF 能用嗎？",
            a: "只能用檔案既有的文字層。掃描頁沒有可選取的文字，這種情況請用 Android 版的 OCR。",
          },
          {
            q: "Chrome 擴充功能能讀這個知識庫嗎？",
            a: "同一台機器上可以：在外掛設定裡啟用本機同步端點，用配對權杖把擴充功能接上；也可以直接用雲端同步。",
          },
        ],
      },
      install: {
        title: "取得外掛",
        body: "從發佈頁下載 .xpi，然後在 Zotero 的外掛管理員裡安裝。",
        primary: { label: "下載 .xpi", note: "最新版本" },
        requirements: "Zotero 7 或更新版本，以及相容 OpenAI 或 Anthropic 介面的 API Key。",
      },
    },

    android: {
      kicker: "Android 應用程式",
      name: "睿記 Android 版",
      tagline: "一顆懸浮球，讀螢幕、給答案，在任何應用程式裡。",
      intro:
        "有些閱讀場景你沒辦法選取文字：掃描的一頁、別人做的 PDF 閱讀器、一張截圖。睿記會在任一應用程式上方顯示一顆小懸浮球。框住一個區域，它在裝置上辨識文字、送給你的模型，再把答案顯示在一個可以複製的面板裡。",
      highlights: [
        {
          title: "任何應用程式上都能用",
          body: "框住一個區域，或擷取整個畫面。",
        },
        {
          title: "離線中文 OCR",
          body: "辨識用 ML Kit 在裝置上完成，截圖本身不會上傳到任何地方。",
        },
        {
          title: "同樣的動作與知識庫",
          body: "理解、分析、質疑、翻譯、誰/是什麼、連結 —— 與桌面端共用知識庫。",
        },
      ],
      features: {
        title: "它能做什麼",
        items: [
          {
            title: "框選與全螢幕",
            body: "拖一個框，或擷取整個畫面，然後選擇動作。周圍的文字會作為背景。",
          },
          {
            title: "多模態選項",
            body: "如果畫面上是公式、表格或示意圖，可以直接把圖片送給支援視覺的模型，而不是送 OCR 文字。",
          },
          {
            title: "到處都是入口",
            body: "選取文字選單、分享面板、剪貼簿、翻譯意圖和字典查詢都可以發起一次請求。",
          },
          {
            title: "加密的 API Key",
            body: "金鑰由 Android 系統金鑰庫加密儲存（AES-256-GCM），不是明文偏好設定。",
          },
          {
            title: "背景同步",
            body: "開啟雲端同步後，手機上存的片段會出現在桌面端，反過來也一樣。",
          },
          {
            title: "適合單手使用",
            body: "懸浮球可以移動、調整大小和透明度，而且記得你上次放的位置。",
          },
        ],
      },
      steps: {
        title: "怎麼使用",
        items: [
          {
            title: "開啟懸浮助手",
            body: "授權一次無障礙權限，之後懸浮球會一直浮在其他應用程式上方。",
          },
          {
            title: "框出想讀的內容",
            body: "點懸浮球，選擇框選或全螢幕，然後確認。文字會在裝置上辨識。",
          },
          {
            title: "提問、儲存、分享",
            body: "選一個動作或自己提問；答案可以存成洞見，原文可以存成片段。",
          },
        ],
      },
      privacy: {
        title: "應用程式能看到什麼",
        body: "只在你發起擷取時擷取畫面，而且只把辨識出的文字送給你的模型。",
        points: [
          "無障礙服務不會在背景讀取畫面內容，也不會自行擷取畫面。",
          "OCR 在本機完成；除非你選擇多模態，截圖不會被上傳。",
          "知識庫是本機 SQLite 檔案，而且已關閉它的 Android 備份。",
        ],
      },
      faq: {
        title: "Android 版常見問題",
        items: [
          {
            q: "為什麼需要無障礙服務？",
            a: "在 Android 上，要在其他應用程式上方繪製並隨時擷取畫面，沒有別的方法。這個服務只在你點懸浮球時動作。",
          },
          {
            q: "有 Play 商店版本嗎？",
            a: "目前沒有。懸浮助手依賴的權限不符合商店針對這類用途的政策，所以以側載 APK 的方式發佈。",
          },
          {
            q: "OCR 需要連線嗎？",
            a: "不需要。中文辨識模型隨應用程式打包、離線執行。之後的模型呼叫才需要網路。",
          },
          {
            q: "支援哪些 Android 版本？",
            a: "Android 11（API 30）以上 —— 用程式擷取畫面需要這個版本。",
          },
          {
            q: "不用懸浮球可以嗎？",
            a: "可以。選取文字選單、分享面板和剪貼簿入口都不需要開啟懸浮球。",
          },
        ],
      },
      install: {
        title: "取得應用程式",
        body: "從發佈頁下載 APK 安裝。需要允許你的瀏覽器或檔案管理員安裝應用程式。",
        primary: { label: "取得", note: "最新版本" },
        requirements: "Android 11 或更新版本，以及相容 OpenAI 或 Anthropic 介面的 API Key。",
      },
    },
  },

  pricing: {
    title: "價格",
    intro:
      "三個應用程式都免費，自備 API Key 就能用。只有雲端同步收費 —— 一份按月訂閱，讓同一份知識庫在瀏覽器、Zotero 和手機之間保持一致。",
    badge: "隨時可取消",
    plansTitle: "兩檔方案，一份知識庫",
    free: {
      name: "免費",
      price: "$0",
      period: "永久",
      summary: "在自己的裝置上，用自己的 API Key 使用三個應用程式。",
      features: [
        "Chrome 擴充功能、Zotero 外掛、Android 應用程式全部可用",
        "自備 API Key，模型費用由你的服務商計費",
        "片段、螢光標記和筆記都留在你的裝置上",
        "不需要付費就能開始使用",
      ],
      cta: "取得應用程式",
    },
    pro: {
      name: "Pro",
      price: "$9.90",
      period: "每月",
      summary: "開啟雲端同步，讓同一份知識庫跟著你的每一台裝置走。",
      features: [
        "包含免費方案的所有功能",
        "瀏覽器、Zotero 和手機看到同一批片段",
        "換一台裝置登入，接著讀、接著問",
        "刪除也會同步，不會在另一台裝置上冒出來",
        "用 MCP 把知識庫接給 Claude Code、Cursor 等 agent",
      ],
      cta: "訂閱 Pro",
    },
    note:
      "價格為美元，透過 Paddle 按月預付。API Key 從不離開你的裝置 —— 訂閱費用只涵蓋雲端同步。隨時可以取消，取消後仍可使用到已付費週期的最後一刻。",
    faqTitle: "關於訂閱",
    faq: [
      {
        q: "訂閱之後還要另付模型費用嗎？",
        a: "要。訂閱只包含雲端同步。模型呼叫直接送給你設定的服務商，由他們計費，不經過我們。",
      },
      {
        q: "取消之後會怎樣？",
        a: "知識庫會繼續同步，直到你已經付費的那個週期結束。之後帳號回到免費方案，只保留本機知識庫，裝置上的內容一件不少。",
      },
      {
        q: "不訂閱也能用嗎？",
        a: "能。三個應用程式在自己的裝置上都能完整使用，只要自備 API Key。只有跨裝置同步需要訂閱。",
      },
      {
        q: "怎麼付款？",
        a: "結帳由 Paddle 處理（我們的收款方）。依你的帳單國家，支援信用卡、PayPal 和當地付款方式。",
      },
      {
        q: "我的付款資訊存在哪裡？",
        a: "存在 Paddle 那邊，不在我們這裡。我們只會取得訂閱狀態和帳號的電子郵件地址。",
      },
    ],
    ctaTitle: "準備好同步了嗎？",
    ctaBody: "先登入一次，接著在帳號頁選擇 Pro。",
  },

  plan: {
    description: "Chrome 擴充功能、Zotero 外掛與 Android 版的全部功能。",
    features: [
      "原文與筆記不限量儲存",
      "在自己的知識庫上提問",
      "在 Chrome、Zotero 和 Android 之間同步",
      "3 天免費試用，隨時取消",
    ],
  },

  privacy: {
    title: "隱私權政策",
    intro: "這一頁說明睿記儲存了什麼、什麼會離開你的裝置，以及怎麼刪除。",
    fullPolicy: "完整政策",
    summaryTitle: "簡要說明",
    summary: [
      "預設情況下，片段、螢光標記和筆記都存在你自己的裝置上。",
      "提示詞以及其中包含的文字，會直接送給你設定的模型服務商。",
      "API Key 不會離開裝置，也從不上傳。",
      "雲端同步預設關閉。開啟後，知識條目會存到我們的伺服器，供你的其他裝置讀取。",
      "截圖只留在手機上。OCR 在裝置端完成，只有你選擇儲存的文字會送給你設定的模型服務商。",
      "你可以隨時刪除帳號和所有同步資料。",
    ],
    englishNote: "下方為完整隱私權政策的繁體中文正式譯本。若與英文原版有出入，以英文原版為準。",
  },

  terms: {
    title: "服務條款",
    intro: "使用睿記的規則 —— 內容始終屬於你，金鑰留在你的裝置上，模型輸出需要你自己判斷。",
    fullPolicy: "完整條款",
    summaryTitle: "簡要說明",
    summary: [
      "你儲存的一切都歸你所有。我們只為提供服務而儲存和傳輸這些內容。",
      "你需要自備 API Key，並直接向模型服務商付費。我們看不到你的金鑰。",
      "AI 輸出可能是錯的。睿記是閱讀輔助工具，不構成專業建議。",
      "雲端同步是選用的，不登入也能使用各端應用程式。",
      "你可以隨時刪除帳號和已同步的資料。",
    ],
    englishNote: "下方為完整服務條款的繁體中文正式譯本。若與英文原版有出入，以英文原版為準。",
  },

  account: {
    title: "帳號",
    intro: "雲端同步需要一個帳號。登入一次，同一份知識庫就會跟著你的瀏覽器、Zotero 和手機走。",
    plan: {
      label: "方案",
      free: "免費 — 本機知識庫",
      pro: "Pro — 雲端同步已開啟",
      upgrade: "訂閱後即可開啟雲端同步",
      checkout: "訂閱 Pro",
      cancel: "取消訂閱",
      cancelHint: "取消後仍可使用到你已付費週期的最後一刻。",
      renewsOn: "下次續訂",
      until: "可使用至",
      canceledUntil: "已取消 — 可使用至",
      price: "每月 9.90 美元",
      notAvailable: "訂閱目前未開放。",
      failed: "無法發起結帳，請重試。",
      cancelDone: "已安排取消，可使用到本期結束。",
      pricingLink: "比較方案",
      manageBilling: "管理帳單",
      portalFailed: "無法開啟帳單管理頁面，請重試。",
      pastDue: "扣款失敗 — 請在 Paddle 更新付款方式以繼續同步。",
    },
    signedOut: {
      heading: "登入或建立帳號",
      google: "使用 Google 帳號繼續",
      orEmail: "或使用電子郵件地址",
      body: "輸入電子郵件地址，我們會寄一封一次性登入連結 —— 不用記密碼，而且在你點開連結之前不會建立任何帳號。",
      emailLabel: "電子郵件地址",
      placeholder: "you@example.com",
      send: "寄送登入連結",
      sending: "傳送中…",
      sent: "請查看信箱。連結 15 分鐘內有效，只能使用一次。",
    },
    signedIn: {
      heading: "已登入",
      emailLabel: "帳號",
      clipsLabel: "知識條目",
      devicesLabel: "已連線的裝置",
      sessionsLabel: "瀏覽器工作階段",
      noDevices: "還沒有用戶端用裝置權杖登入過。",
      syncEndpoint: "同步端點",
      signOut: "登出",
      signOutAll: "登出所有裝置",
      deleteAccount: "刪除帳號與資料",
      deleteWarning: "這會刪除所有同步條目、所有裝置以及帳號本身，且無法復原。",
      deleteConfirm: "永久刪除",
      deleting: "刪除中…",
    },
    keys: {
      label: "Agent 用的 API 金鑰",
      intro:
        "讓任何 AI agent（Claude Code、Cursor、DSH……）透過 MCP 檢索你的知識庫。金鑰是唯讀的：agent 找得到並讀取你存下的內容，但不能修改。",
      empty: "還沒有金鑰。",
      namePlaceholder: "這組金鑰給誰用？例如 Claude Code",
      create: "建立金鑰",
      creating: "建立中…",
      createdHint: "現在複製。完整金鑰只會顯示這一次。",
      copy: "複製",
      copied: "已複製",
      revoke: "撤銷",
      revoking: "撤銷中…",
      revokedNotice: "金鑰已撤銷，正在使用它的 agent 會立即失效。",
      created: "建立於",
      lastUsed: "最後使用",
      never: "從未使用",
      nameRequired: "請先給金鑰一個名稱。",
      nameTaken: "你已經有一組同名金鑰了。",
      limitReached: "有效金鑰已達上限，請先撤銷一組不再使用的。",
      loadFailed: "無法載入 API 金鑰。",
      createFailed: "建立金鑰失敗，請重試。",
      requiresPro: "MCP 屬於雲端同步的一部分，訂閱後才能讓 agent 連線。",
      mcpTitle: "MCP 端點",
      mcpHint: "把這個端點設定到 agent 裡，並把金鑰作為 Bearer 權杖送出。",
      configTitle: "用戶端設定",
    },
    errors: {
      rate_limited: "請求過於頻繁，請過幾分鐘再試。",
      mail_failed: "郵件寄送失敗，請稍後再試。",
      mail_not_configured: "伺服器端尚未設定郵件寄送。",
      invalid_token: "連結無效或已過期，請重新取得。",
      used_token: "這個連結已經用過了，請重新取得。",
      missing_token: "連結缺少權杖，請重新取得。",
      no_session: "你還沒有登入。",
      invalid_session: "登入已過期，請重新登入。",
      generic: "出了點問題，請重試。",
    },
    welcome: "已登入。這台裝置現在已經連結到你的帳號。",
    backHome: "返回首頁",
  },

  checkout: {
    heading: "選擇你的方案",
    lede: "3 天免費試用。需要綁定付款方式，試用結束後會自動依所選週期扣款；不想續訂的話隨時可以取消。",
    monthly: "月付",
    yearly: "年付",
    perMonth: "/月",
    perYear: "/年",
    subscribeNow: "立即訂閱",
    startTrial: "開始 3 天試用",
    billingPeriod: "計費週期",
    perMonthNote:
      "標價為稅前金額。稅金由 Paddle 在結帳時依你的所在地計算，最終以結帳頁顯示的總額為準。",
    localized: "價格已依你的所在地顯示，最終金額在結帳時確認。",
    pricesFailed: "價格載入失敗，請重新整理頁面後再試。",
    checkoutFailed: "無法開啟結帳視窗，請稍後再試或聯絡支援。",
  },

  welcome: {
    heading: "訂閱已生效",
    lede: "感謝訂閱 Renota Pro。收據會由 Paddle 寄到你的電子郵件，隨時可以在這裡管理訂閱。",
    accountCta: "前往帳號頁",
    homeCta: "返回首頁",
    note: "如果幾分鐘內沒有收到確認郵件，請檢查垃圾郵件資料夾，或寄信到 support@werenota.com。",
  },
};
