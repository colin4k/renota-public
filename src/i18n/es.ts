// 西班牙语文案。类型来自英文版，缺字段或结构不一致会在 typecheck 阶段失败。

import type { Content } from "./en.js";

export const es: Content = {
  siteName: "Renota",

  nav: {
    chrome: "Chrome",
    zotero: "Zotero",
    android: "Android",
    pricing: "Precios",
    privacy: "Privacidad",
    account: "Cuenta",
    menu: "Menú",
    faq: "Preguntas frecuentes",
    language: "Idioma",
    home: "Inicio",
  },

  footer: {
    tagline: "Una base de conocimiento privada para el navegador, Zotero y tu teléfono.",
    products: "Productos",
    resources: "Soporte",
    legal: "Legal",
    privacy: "Política de privacidad",
    terms: "Condiciones del servicio",
    copyright: "Renota",
    discord: "Discord",
    mail: "Correo",
    madeFor: "Hecho para quien lee mucho.",
  },

  common: {
    learnMore: "Saber más",
    install: "Consíguelo",
    readMore: "Leer más",
    faq: "Preguntas frecuentes",
    onThisPage: "En esta página",
    backToHome: "Volver al inicio",
    languageLabel: "Idioma",
    skipToContent: "Saltar al contenido",
    productsNav: "Productos",
    free: "Gratis",
    byoKey: "Tu propia clave API",
    localFirst: "Primero local",
    cloudSync: "Sincronización en la nube opcional",
    multiLanguage: "10 idiomas de interfaz",
    highlights: "Por qué destaca",
    updated: "Última actualización",
    requirements: "Requisitos",
    note: "Nota",
    status: "Estado",
    comingSoon: "Próximamente",
    comingSoonNote: "Aún no disponible: lo anunciaremos aquí y por correo.",
    available: "Disponible",
  },

  seo: {
    terms: {
      title: "Condiciones del servicio",
      description:
        "Las condiciones que rigen tu uso de Renota: tu contenido, tus claves API, el uso aceptable, la disponibilidad y la responsabilidad.",
    },
    home: {
      title: "Renota — asistente de lectura con IA para Chrome, Zotero y Android",
      description:
        "Renota convierte lo que lees en Chrome, en Zotero y en Android en una base de conocimiento privada a la que preguntar. Usa tu propia clave API.",
    },
    chrome: {
      title: "Renota para Chrome — lectura con IA y tus propias notas",
      description:
        "Explica, analiza, cuestiona y traduce lo que seleccionas y guárdalo en tu base de conocimiento. Primero local; con OpenAI, DeepSeek y OpenRouter.",
    },
    zotero: {
      title: "Renota para Zotero — un plugin con IA para leer libros EPUB y PDF",
      description:
        "Un plugin de Zotero que lee contigo: explicaciones, búsqueda en el libro y protección contra spoilers. Los pasajes y las notas se quedan en Zotero.",
    },
    android: {
      title: "Renota para Android — lector flotante con IA",
      description:
        "Selecciona cualquier zona de la pantalla y pregúntale. OCR chino sin conexión, PDF escaneados y la misma base de conocimiento que los demás.",
    },
    privacy: {
      title: "Política de privacidad",
      description:
        "Qué guarda Renota en tu dispositivo, qué sale de él, cuándo la sincronización en la nube sube algo y cómo borrarlo.",
    },
    pricing: {
      title: "Precios — apps gratis, sincronización de pago",
      description:
        "Renota es gratis con tu propia clave API. La sincronización en la nube entre navegador, Zotero y teléfono cuesta US$9.90 al mes. Cancela cuando quieras.",
    },
    faq: {
      title: "Preguntas frecuentes — Renota, el asistente de lectura con IA para Chrome, Zotero y Android",
      description: "Qué es Renota, por qué encaja con investigadores y estudiantes, qué hace el plugin de Zotero, cuánto cuesta y cómo conectarlo a Claude Code o Cursor.",
    },
  },

  home: {
    hero: {
      badge: "Para quien lee mucho",
      title: "Lee lo que quieras. Guarda lo importante. Pregunta a tus notas.",
      subtitle:
        "Renota se coloca junto a lo que estás leyendo — una página web, un libro en Zotero, una página escaneada en el teléfono — y te ayuda a entenderlo. Todo lo que guardas se convierte en una base de conocimiento a la que puedes preguntar.",
      primary: "Ver los productos",
      secondary: "Leer la política de privacidad",
      stats: [
        { value: "3", label: "plataformas: navegador, Zotero, Android" },
        { value: "0", label: "claves API guardadas en nuestros servidores" },
        { value: "10", label: "idiomas de interfaz" },
      ],

      /* 首屏与产品页里那台「正在阅读的窗口」的示例内容。
         书名与段落是虚构的示例，不引用任何真实作品。 */
      preview: {
        prompt: "Explicar este pasaje",
        book: "Notas sobre la atención",
        lead: "La atención no es un don con el que se nace.",
        marked: "Es una práctica que se mantiene página a página.",
        answer: "La idea es que la concentración se entrena en vez de recibirse; por eso guardar un pasaje facilita la siguiente pregunta.",
        source: "Capítulo 3, pág. 41",
      },
    },

    products: {
      title: "Tres apps, una base de conocimiento",
      intro:
        "Cada app sirve por sí sola. Inicia sesión una vez y, con la sincronización en la nube activada, los mismos fragmentos, resaltados y conclusiones te acompañan en las tres.",
      chrome: {
        kicker: "Extensión de navegador",
        name: "Renota para Chrome",
        tagline: "Entiende y reescribe lo que lees en la web.",
        points: [
          "Explica, analiza, cuestiona o traduce una selección, o conéctala con lo que ya guardaste.",
          "Guarda un pasaje con un clic; se vuelve contexto consultable para cada pregunta posterior.",
          "Escribe la respuesta de vuelta en el editor, sustituyéndola o insertándola.",
        ],
        cta: "Explorar la extensión de Chrome",
      },
      zotero: {
        kicker: "Plugin de Zotero",
        name: "Renota para Zotero",
        tagline: "Lee libros enteros con un asistente que ha leído las mismas páginas que tú.",
        points: [
          "Funciona dentro del lector de Zotero para EPUB, PDF y capturas web.",
          "Protección contra spoilers: el modelo solo ve el texto hasta tu posición de lectura.",
          "Escribe las explicaciones como comentarios de resaltado o en tu nota de lectura.",
        ],
        cta: "Explorar el plugin de Zotero",
      },
      android: {
        kicker: "App para Android",
        name: "Renota para Android",
        tagline: "Una bola flotante que lee la pantalla y responde, en cualquier app.",
        points: [
          "Selecciona una zona de la pantalla y obtén OCR más una respuesta, también en PDF escaneados.",
          "Ejecuta OCR chino sin conexión en el dispositivo; solo el texto reconocido se envía a tu modelo.",
          "Las mismas acciones y la misma base de conocimiento que las apps de escritorio.",
        ],
        cta: "Explorar la app para Android",
      },
    },

    why: {
      title: "Hecho como lo querría quien lee",
      intro: "Sin cuenta, sin enviarnos tu contenido y sin ataduras.",
      items: [
        {
          title: "Tu clave, tu modelo",
          body: "Conecta OpenAI, DeepSeek, Anthropic, OpenRouter o cualquier punto de conexión compatible con OpenAI. Las solicitudes van de tu dispositivo al proveedor, nunca a través de nosotros.",
        },
        {
          title: "Primero local, por defecto",
          body: "Los fragmentos, resaltados y notas viven en tu navegador, en la carpeta de datos de Zotero o en la base de datos de la app. La sincronización en la nube es opcional y se puede desactivar en cualquier momento.",
        },
        {
          title: "Búsqueda que funciona en chino",
          body: "Búsqueda BM25 con una tokenización CJK correcta, para que los pasajes guardados aparezcan de verdad cuando preguntas por ellos, no solo cuando recuerdas las palabras exactas.",
        },
        {
          title: "Muestra sus fuentes",
          body: "Las respuestas citan los fragmentos y pasajes del libro que usaron, y cada cita enlaza de vuelta al texto original para que puedas comprobarla.",
        },
      ],
    },

    how: {
      title: "Cómo funciona",
      steps: [
        {
          title: "Captura",
          body: "Selecciona texto en una página web, resalta un pasaje en Zotero o enmarca una zona en el teléfono. Renota lo guarda con su contexto y su fuente.",
        },
        {
          title: "Pregunta",
          body: "Elige una acción —entender, analizar, cuestionar, traducir, conectar— o formula tu propia pregunta. Tu material guardado se recupera y se cita automáticamente.",
        },
        {
          title: "Conserva",
          body: "Escribe la respuesta de vuelta donde estabas trabajando o guárdala como conclusión. En ambos casos se une a la misma base de conocimiento.",
        },
      ],
    },

    sync: {
      title: "Sincroniza cuando quieras",
      body: "Todo funciona en un solo dispositivo sin cuenta. Si usas más de uno —el navegador en el escritorio, Zotero en un portátil, el teléfono en la mano—, puedes iniciar sesión con un código por correo y sincronizar tu base de conocimiento.",
      points: [
        "Desactivada por defecto: no se sube nada hasta que inicias sesión.",
        "Solo se sincronizan tus fragmentos, resaltados y conclusiones. Las claves API nunca salen del dispositivo.",
        "Las eliminaciones también se sincronizan, así que un fragmento borrado no reaparece en otro dispositivo.",
        "Cierra sesión cuando quieras; la copia local se queda donde está.",
      ],
    },

    mcp: {
      title: "Tu base de conocimiento, como herramienta para agentes",
      lede: "Más allá de la sincronización en la nube, el mismo material puede ser leído por otros programas.",
      body:
        "Claude Code, Cursor o un pequeño script que hayas escrito tú mismo pueden buscar en tus fragmentos, resaltados y notas a través de MCP, sin pegar pasajes a mano en el prompt.",
      points: [
        "Solo lectura: un agente puede encontrar y citar tus entradas, nunca cambiarlas ni borrarlas.",
        "Las consultas en chino también funcionan: usa el mismo índice que las apps.",
        "Dos vías: el punto de conexión en la nube necesita una cuenta Pro y una clave API creada en la página de la cuenta; el servidor local renota-mcp es gratis, de código abierto y se ejecuta en tu propio equipo.",
      ],
      endpointLabel: "Punto de conexión MCP",
      cta: "Crear una clave API en la página de la cuenta",
    },

    faq: {
      title: "Preguntas que nos hacen",
      items: [
        {
          q: "¿Necesito una cuenta?",
          a: "No. Cada app funciona sin cuenta. Solo la necesitas para las dos funciones de pago: la sincronización en la nube y el MCP en la nube. El MCP local no necesita cuenta.",
        },
        {
          q: "¿Es gratis?",
          a: "Las apps son gratis. La sincronización en la nube y el MCP en la nube son las funciones de pago, incluidas en la suscripción Pro de US$9.90 al mes. El MCP local —el servidor renota-mcp de código abierto que ejecutas tú— es gratis. Las llamadas a la API las pagas directamente al proveedor del modelo.",
        },
        {
          q: "¿A dónde van mis datos?",
          a: "Por defecto, a ningún sitio: los fragmentos y las notas se quedan en tu dispositivo y los prompts van directamente al proveedor del modelo que hayas configurado. Si activas la sincronización en la nube, tus entradas de conocimiento se guardan en nuestra base de datos para que tus otros dispositivos puedan leerlas. Las claves API nunca se suben.",
        },
        {
          q: "¿Qué idiomas son compatibles?",
          a: "La interfaz está disponible en diez idiomas —inglés, chino simplificado, chino tradicional, japonés, coreano, francés, alemán, español, portugués y ruso— y todos están traducidos por completo. El asistente responde en el idioma que le pidas.",
        },
        {
          q: "¿Puedo conectar mi base de conocimiento a Claude Code o Cursor?",
          a: "Sí, de dos formas. El punto de conexión en la nube forma parte de Pro: crea una clave API en la página de la cuenta y apunta tu agente ahí. O ejecuta en local el servidor renota-mcp, gratis y de código abierto, sin cuenta. En ambos casos el acceso es de solo lectura.",
        },
      ],
    },

    cta: {
      title: "Empieza por la plataforma en la que ya lees",
      body: "Elige la app que encaje con donde ocurre la mayor parte de tu lectura. Puedes añadir las otras más adelante: la base de conocimiento es compartida.",
    },
  },

  zoteroGuide: {
    title: "Cómo elegir un plugin de Zotero",
    intro:
      "Hay decenas de plugins para Zotero y varios ya meten un modelo en el lector. Estas son las preguntas que conviene hacer antes de instalar uno.",
    items: [
      {
        title: "¿Solo ve lo que has leído?",
        body: "Un plugin que manda el libro entero al modelo puede destriparte el capítulo que estás leyendo. Comprueba que corta el texto en tu posición de lectura, también en búsquedas y resúmenes.",
      },
      {
        title: "¿Dónde vive la clave API?",
        body: "Con tu propia clave, el proveedor te cobra directamente y el autor del plugin no ve tu tráfico. Una suscripción suele implicar un servidor ajeno en medio.",
      },
      {
        title: "¿Puedes elegir el modelo?",
        body: "Un plugin atado a un proveedor no puede seguir los cambios de precio ni pasar a un endpoint local. Una URL base compatible con OpenAI mantiene esa opción abierta.",
      },
      {
        title: "¿Lee EPUB o solo PDF?",
        body: "Casi todos leen solo el texto de las páginas PDF. El EPUB necesita la estructura de capítulos, y sin ella no hay resumen del capítulo 12.",
      },
      {
        title: "¿Las respuestas vuelven a Zotero?",
        body: "Si las explicaciones solo viven en el plugin, has creado otro silo de notas. Los comentarios de resaltado y las notas de lectura las dejan junto al libro.",
      },
      {
        title: "¿Sustituye a Zotero o convive con él?",
        body: "Un plugin debe añadir acciones al lector existente y no tocar tu biblioteca, tus anotaciones ni la sincronización.",
      },
    ],
  },

  product: {
    chrome: {
      kicker: "Extensión de navegador",
      name: "Renota para Chrome",
      tagline: "Un asistente de lectura con IA que recuerda lo que has guardado.",
      intro:
        "Selecciona texto en cualquier página y Renota te lo explica, lo cuestiona, lo traduce o lo conecta con lo que leíste antes. Guarda las partes que merece la pena conservar y se convierten en contexto para cada pregunta posterior, con citas que llevan de vuelta a la fuente.",
      highlights: [
        {
          title: "Cinco acciones sobre una selección",
          body: "Entender, analizar, cuestionar, traducir, conectar: cada una con un prompt que puedes editar, más los botones personalizados que añadas.",
        },
        {
          title: "Una base de conocimiento, no un historial de chat",
          body: "Los fragmentos y las conclusiones guardados se indexan localmente con BM25 y tokenización CJK, así que la búsqueda los encuentra aunque cambies las palabras.",
        },
        {
          title: "Escribe donde estás trabajando",
          body: "Pon la respuesta directamente en el editor desde el que seleccionaste, o cópiala. Sin dar rodeos por otra ventana.",
        },
      ],
      features: {
        title: "Qué hace",
        items: [
          {
            title: "Barra de selección",
            body: "Aparece una barra pequeña junto a tu selección en cualquier sitio, con las acciones que tengas activadas.",
          },
          {
            title: "Pregunta a tu biblioteca",
            body: "Formula una pregunta y Renota recupera primero los fragmentos relevantes, responde a partir de ellos y numera las citas para que puedas abrir la fuente exacta.",
          },
          {
            title: "Trae tu propio modelo",
            body: "OpenAI, DeepSeek, OpenRouter o cualquier URL base compatible con OpenAI. Prueba la conexión desde los ajustes antes de confiar en ella.",
          },
          {
            title: "Escritura de vuelta",
            body: "Sustituye o inserta la respuesta en el campo del que viniste: útil para respuestas, notas y borradores.",
          },
          {
            title: "Contexto de la página",
            body: "El texto que rodea tu selección viaja con la solicitud, y eso suele ser la diferencia entre una respuesta genérica y una útil.",
          },
          {
            title: "Diez idiomas de interfaz",
            body: "Elige un idioma o sigue al navegador. Los diez están traducidos por completo, hasta las páginas legales.",
          },
        ],
      },
      steps: {
        title: "Cómo se usa",
        items: [
          {
            title: "Selecciona y elige una acción",
            body: "Resalta texto y elige entender, analizar, cuestionar, traducir o conectar en la barra.",
          },
          {
            title: "Lee con citas",
            body: "La respuesta llega en streaming al panel lateral. Las citas numeradas señalan los fragmentos y pasajes del libro que usó.",
          },
          {
            title: "Guarda o escribe de vuelta",
            body: "Conserva la respuesta como conclusión, guarda la selección como fragmento o inserta la respuesta en la página donde estás escribiendo.",
          },
        ],
      },
      privacy: {
        title: "Qué sale de tu navegador",
        body: "Solo lo que envías a tu proveedor de modelo, más la sincronización en la nube opcional si la activas.",
        points: [
          "El contenido de la página solo se envía a tu proveedor cuando ejecutas una acción, nunca en segundo plano.",
          "Tu clave API se guarda en el almacenamiento local de la extensión y solo se envía a ese proveedor.",
          "Tu base de conocimiento se queda en IndexedDB a menos que inicies sesión para sincronizar.",
        ],
      },
      faq: {
        title: "Preguntas sobre la extensión de Chrome",
        items: [
          {
            q: "¿Qué proveedores de modelo funcionan?",
            a: "Cualquier servicio que hable la API de chat completions de OpenAI —OpenAI, DeepSeek, OpenRouter, pasarelas autoalojadas—, más cualquier URL base personalizada.",
          },
          {
            q: "¿Funciona sin conexión?",
            a: "La extensión necesita conexión de red para las llamadas al modelo. Guardar, buscar y leer tus propios fragmentos funciona localmente, sin ella.",
          },
          {
            q: "¿Puedo editar los prompts?",
            a: "Sí. Cada acción integrada tiene un prompt editable, y puedes añadir botones personalizados con su propio prompt.",
          },
          {
            q: "¿Dónde se guarda mi base de conocimiento?",
            a: "En el IndexedDB del navegador, con el ámbito de la extensión. Desinstalar la extensión la elimina, salvo que hayas activado la sincronización en la nube.",
          },
          {
            q: "¿Envía algo a vuestros servidores?",
            a: "Solo contadores de uso anónimos, y solo si dejas activado el interruptor de telemetría opcional. Ni contenido de páginas, ni prompts, ni claves API.",
          },
        ],
      },
      install: {
        title: "Consigue la extensión",
        body: "Ya está en Chrome Web Store, o descarga el .crx para instalarla sin conexión.",
        primary: { label: "Obtener", note: "Dos vías: la tienda o la descarga directa del .crx." },
        dialog: {
          title: "Obtén Renota para Chrome",
          store: { label: "Chrome Web Store", note: "Recomendado. Se instala y actualiza solo." },
          crx: { label: "Descargar el archivo .crx", note: "Para instalaciones sin conexión o gestionadas. Las actualizaciones son manuales." },
          close: "Cerrar",
        },
        requirements: "Chrome 120 o posterior. Una clave API de cualquier proveedor compatible con OpenAI.",
      },
    },

    zotero: {
      kicker: "Plugin de Zotero",
      name: "Renota para Zotero",
      tagline: "Lee libros enteros con un asistente que ha leído las mismas páginas que tú.",
      intro:
        "Renota vive dentro del lector de Zotero. Selecciona un pasaje en un EPUB, un PDF o una captura web y obtén una explicación anclada en este libro: los capítulos anteriores, tus propios resaltados y nada que aún no hayas leído.",
      highlights: [
        {
          title: "Sin spoilers",
          body: "Al modelo solo llega el texto anterior a tu posición de lectura, incluidos los resultados de búsqueda y las notas de lectura. Lee una novela de misterio sin destriparla.",
        },
        {
          title: "Búsqueda dentro del libro",
          body: "Cada libro se divide en trozos y se indexa localmente, así que preguntas como quién es un personaje se pueden responder con pasajes anteriores y citas.",
        },
        {
          title: "Escribe de vuelta en Zotero",
          body: "Guarda una explicación como comentario de resaltado, añádela a una nota de lectura o consérvala como conclusión en tu base de conocimiento.",
        },
      ],
      features: {
        title: "Qué hace",
        items: [
          {
            title: "Menú emergente de selección en el lector",
            body: "Entender, analizar, cuestionar, traducir, quién/qué, guardar, preguntar: justo debajo del menú de selección de Zotero.",
          },
          {
            title: "Resumen de lo leído y del capítulo",
            body: "Recibe un recordatorio de lo que ha pasado hasta ahora, o un resumen del capítulo que acabas de terminar, construidos a partir del texto anterior a tu posición.",
          },
          {
            title: "Tus anotaciones se vuelven conocimiento",
            body: "Los resaltados hechos en Zotero se reflejan en la base de conocimiento a medida que se crean, para poder buscarlos y citarlos después.",
          },
          {
            title: "Notas de lectura",
            body: "Las respuestas se pueden añadir a una nota por libro, lo que te da un documento que crece en lugar de anotaciones sueltas.",
          },
          {
            title: "Funciona en EPUB, PDF y capturas",
            body: "Las rutas de capítulo y la posición de lectura se siguen donde el lector las expone; los PDF escaneados recurren a la capa de texto que exista.",
          },
          {
            title: "Comparte una misma base de conocimiento",
            body: "Los mismos fragmentos se ven en la extensión de Chrome y en la app para Android cuando la sincronización está activada.",
          },
        ],
      },
      steps: {
        title: "Cómo se usa",
        items: [
          {
            title: "Instala el plugin y configura un modelo",
            body: "Instala el .xpi y luego rellena el proveedor, la URL base, la clave y el modelo en los ajustes de Zotero, dentro de Renota.",
          },
          {
            title: "Abre un libro y selecciona texto",
            body: "El libro se indexa en segundo plano. Selecciona un pasaje para ver los botones de acción.",
          },
          {
            title: "Escríbelo de vuelta",
            body: "Envía la respuesta a un comentario de resaltado o a tu nota de lectura, o guárdala como conclusión.",
          },
        ],
      },
      privacy: {
        title: "Qué sale de tu máquina",
        body: "Solo el texto necesario para responder a la acción que iniciaste, y nunca texto posterior a tu posición de lectura.",
        points: [
          "El índice del libro se construye y se guarda localmente en un archivo SQLite propio del plugin.",
          "Tu clave API vive en las preferencias de Zotero para este plugin.",
          "La sincronización, si está activada, solo sube entradas de conocimiento, nunca el archivo del libro.",
        ],
      },
      faq: {
        title: "Preguntas sobre el plugin de Zotero",
        items: [
          {
            q: "¿Qué versiones de Zotero son compatibles?",
            a: "El objetivo es Zotero 7, con compatibilidad declarada para 8, 9 y 10.",
          },
          {
            q: "¿Envía el libro entero al modelo?",
            a: "No. Solo se envían la selección, un poco de contexto alrededor y unos pocos pasajes recuperados, todos anteriores a tu posición de lectura.",
          },
          {
            q: "¿Puedo desactivar el reflejo de anotaciones?",
            a: "Sí, en los ajustes. Desactivarlo también elimina las anotaciones que ya se habían reflejado en la base de conocimiento.",
          },
          {
            q: "¿Funciona con PDF escaneados?",
            a: "Solo en la medida en que el archivo tenga capa de texto. Las páginas escaneadas no tienen nada que seleccionar, así que para esas usa el OCR de la app para Android.",
          },
          {
            q: "¿Puede la extensión de Chrome leer esta biblioteca?",
            a: "Sí. Con la sincronización en la nube, la extensión y el plugin comparten la misma base entre dispositivos — eso requiere Pro. Aparte, el servidor renota-mcp gratuito se ejecuta en tu equipo, lee la biblioteca local y deja que Claude, Cursor y otros agentes busquen en ambos lados, sin cuenta y sin subir nada.",
          },
          {
            q: "¿Funciona junto a otros plugins de Zotero?",
            a: "Sí. Solo registra sus propias acciones de menú y su entrada de nota de lectura, y no toca el almacén de anotaciones ni la sincronización, así que los plugins de traducción, vista previa de PDF o exportación siguen igual.",
          },
        ],
      },
      install: {
        title: "Consigue el plugin",
        body: "La versión 1.1.0 ya está disponible: descarga el .xpi e instálalo desde Herramientas → Complementos → menú del engranaje → Instalar complemento desde archivo…",
        primary: { label: "Obtener", note: "v1.1.0 · compatible con Zotero 7 o posterior" },
        requirements: "Zotero 7 o posterior. Una clave API de cualquier proveedor compatible con OpenAI, o Anthropic.",
      },
    },

    android: {
      kicker: "App para Android",
      name: "Renota para Android",
      tagline: "Una bola flotante que lee la pantalla y responde, en cualquier app.",
      intro:
        "Parte de la lectura ocurre donde no puedes seleccionar texto: una página escaneada, el visor de PDF de otra persona, una captura de pantalla. Renota pone una pequeña bola flotante sobre cualquier app. Enmarca una zona y reconocerá el texto en el dispositivo, lo enviará a tu modelo y mostrará la respuesta en un panel del que puedes copiar.",
      highlights: [
        {
          title: "Funciona sobre cualquier app",
          body: "Enmarca una zona o captura toda la pantalla.",
        },
        {
          title: "OCR chino sin conexión",
          body: "El reconocimiento se ejecuta en el dispositivo con ML Kit, así que la captura en sí no se sube a ningún sitio.",
        },
        {
          title: "Las mismas acciones, la misma biblioteca",
          body: "Entender, analizar, cuestionar, traducir, quién/qué, conectar, con la base de conocimiento compartida con las apps de escritorio.",
        },
      ],
      features: {
        title: "Qué hace",
        items: [
          {
            title: "Captura de zona y de pantalla completa",
            body: "Arrastra un recuadro o toma toda la pantalla y luego elige una acción. El texto de alrededor se convierte en contexto.",
          },
          {
            title: "Opción multimodal",
            body: "Si la página es una fórmula, una tabla o un diagrama, envía la imagen a un modelo con visión en lugar del texto del OCR.",
          },
          {
            title: "Puntos de entrada por todas partes",
            body: "El menú de selección, la hoja de compartir, el portapapeles, los intents de traducción y las búsquedas de diccionario pueden iniciar una solicitud.",
          },
          {
            title: "Clave API cifrada",
            body: "La clave se guarda con el almacén de claves del sistema de Android (AES-256-GCM) en lugar de en preferencias en claro.",
          },
          {
            title: "Sincronización en segundo plano",
            body: "Los fragmentos guardados en el teléfono aparecen en las apps de escritorio y viceversa, cuando la sincronización en la nube está activada.",
          },
          {
            title: "Pensada para usar con una mano",
            body: "La bola se puede mover, redimensionar y hacer translúcida, y recuerda dónde la dejaste.",
          },
        ],
      },
      steps: {
        title: "Cómo se usa",
        items: [
          {
            title: "Activa el asistente flotante",
            body: "Concede el permiso de accesibilidad una vez. A partir de ahí, la bola se queda por encima de las demás apps.",
          },
          {
            title: "Enmarca lo que quieres leer",
            body: "Toca la bola, elige zona o pantalla completa y confirma. El texto se reconoce en el dispositivo.",
          },
          {
            title: "Pregunta, guarda, comparte",
            body: "Elige una acción o escribe tu propia pregunta; guarda la respuesta como conclusión o el texto como fragmento.",
          },
        ],
      },
      privacy: {
        title: "Qué puede ver la app",
        body: "Solo captura cuando inicias una captura, y solo envía a tu modelo el texto reconocido.",
        points: [
          "El servicio de accesibilidad no lee el contenido de la pantalla en segundo plano y nunca captura por su cuenta.",
          "El OCR se ejecuta localmente; las capturas no se suben salvo que elijas la opción multimodal.",
          "La base de conocimiento es un archivo SQLite local; la copia de seguridad de Android está desactivada para ella.",
        ],
      },
      faq: {
        title: "Preguntas sobre la app para Android",
        items: [
          {
            q: "¿Por qué necesita un servicio de accesibilidad?",
            a: "Android no tiene otra forma de dibujar sobre otras apps y tomar una captura a demanda. El servicio solo actúa cuando tocas la bola.",
          },
          {
            q: "¿Hay versión en Play Store?",
            a: "Actualmente no: el asistente flotante depende de permisos que la política de la tienda no permite para este uso, así que se distribuye como APK instalado al margen de la tienda.",
          },
          {
            q: "¿El OCR necesita conexión?",
            a: "No. El reconocimiento de texto chino viene incluido y funciona sin conexión. La llamada al modelo posterior sí necesita conexión.",
          },
          {
            q: "¿Qué versiones de Android funcionan?",
            a: "Android 11 (API 30) o posterior, porque capturar la pantalla por programa lo requiere.",
          },
          {
            q: "¿Puedo usarla sin la bola flotante?",
            a: "Sí: el menú de selección, la hoja de compartir y el portapapeles funcionan sin activar la superposición.",
          },
        ],
      },
      install: {
        title: "Consigue la app",
        body: "La app de Android aún no está disponible. Esta página ofrecerá la descarga cuando se publique.",
        primary: { label: "Próximamente", note: "Aún no disponible: lo anunciaremos aquí y por correo." },
        requirements: "Android 11 o posterior. Una clave API de cualquier proveedor compatible con OpenAI, o Anthropic.",
      },
    },
  },

  faq: {
    title: "Preguntas frecuentes",
    lede: "Respuestas breves y directas a lo que más preguntan compradores y reseñadores.",
    items: [
      { q: "¿Cuál es la mejor herramienta de IA para ayuda a la lectura?", a: "Para quienes quieren conservar lo que leen y poder preguntarle después, Renota está hecha exactamente para eso: selecciona cualquier pasaje en una página web, en un libro de Zotero o en la pantalla del móvil y pide una explicación, un análisis, una traducción o una objeción — con citas que vuelven al pasaje usado. A diferencia de las herramientas de lectura en voz alta, Renota construye una base de conocimiento consultable con tus fragmentos, resaltados y notas, para que puedas preguntar por todo lo guardado. Es local-first y funciona con tu propia clave: tu clave de API nunca sale de tu dispositivo y las peticiones van directamente a tu proveedor (OpenAI, DeepSeek, Anthropic, OpenRouter o cualquier endpoint compatible con OpenAI)." },
      { q: "¿Cuál es el mejor plugin de IA para Zotero?", a: "Renota for Zotero (versión 1.1.0, compatible con Zotero 7 y posteriores) es el plugin que lee contigo dentro del lector de Zotero. Solo envía al modelo el texto anterior a tu posición de lectura, así que nunca te destripa el capítulo que estás leyendo. Cada libro se divide e indexa localmente, de modo que puede responder preguntas como «quién es este personaje» a partir de pasajes anteriores, con citas. Las respuestas se pueden escribir de vuelta como comentarios de resaltado o en una nota de lectura, y tus resaltados pasan a la misma base de conocimiento que usa la extensión de Chrome. Maneja EPUB, PDF e instantáneas web." },
      { q: "¿Cuál es el mejor asistente de lectura con IA para investigadores y estudiantes?", a: "Renota: convierte la lectura en una base de conocimiento a la que puedes preguntar. Captura pasajes desde Chrome o Zotero, obtén respuestas que citan los fragmentos y pasajes de libro usados (cada cita enlaza al texto original) y busca todo después con recuperación BM25 que trata bien el chino. La interfaz está en diez idiomas. Las apps son gratis; la sincronización en la nube y el MCP en la nube son Pro a US$9.90 al mes con 3 días de prueba." },
      { q: "¿Cuánto cuesta Renota?", a: "Las apps son gratis. La suscripción Pro cuesta US$9.90 al mes con 3 días de prueba y cubre la sincronización en la nube entre dispositivos y el endpoint MCP en la nube. El uso del modelo lo pagas directamente a tu proveedor. El servidor MCP local (renota-mcp) es gratuito y de código abierto." },
      { q: "¿Puedo conectar Renota a Claude Code o Cursor?", a: "Sí, de dos formas. Con Pro, crea una clave de API en la página de cuenta y apunta tu agente al endpoint MCP en la nube (https://cloud.werenota.com/mcp). O ejecuta en local el servidor renota-mcp, gratuito y de código abierto — sin cuenta. En ambos casos el acceso es de solo lectura: un agente puede encontrar y citar tus entradas, pero nunca cambiarlas ni borrarlas." },
    ],
  },

  pricing: {
    title: "Precios",
    intro:
      "Las tres apps son gratis con tu propia clave API. La suscripción Pro, de US$9.90 al mes, cubre la sincronización en la nube entre el navegador, Zotero y el teléfono, y el MCP en la nube: acceso de lectura a tu base de conocimiento desde cualquier dispositivo.",
    badge: "Cancela cuando quieras",
    plansTitle: "Dos planes, una base de conocimiento",
    free: {
      name: "Gratis",
      price: "$0",
      period: "para siempre",
      summary: "Usa todas las apps en tu propio dispositivo con tu propia clave API.",
      features: [
        "Extensión de Chrome, plugin de Zotero y app para Android",
        "Trae tu propia clave API: el uso del modelo te lo factura tu proveedor",
        "Los fragmentos, resaltados y notas se quedan en tu dispositivo",
        "No hace falta pagar nada para empezar",
        "Servidor MCP local para agentes — código abierto, se ejecuta en tu equipo, nada sale de tu dispositivo",
      ],
      cta: "Consigue las apps",
    },
    pro: {
      name: "Pro",
      price: "$9.90",
      period: "al mes",
      summary: "Activa la sincronización en la nube para que la misma base de conocimiento siga a todos tus dispositivos — y deja que los agentes la lean por MCP en la nube.",
      features: [
        "Todo lo del plan Gratis",
        "200 MB de almacenamiento en la nube para tu base de conocimiento",
        "Los mismos fragmentos en el navegador, en Zotero y en el teléfono",
        "Inicia sesión en un dispositivo nuevo y sigue leyendo, sigue preguntando",
        "Las eliminaciones también se sincronizan, así que nada reaparece en otro dispositivo",
        "MCP en la nube: Claude Code, Cursor y otros agentes leen la base sincronizada entre tus dispositivos",
      ],
      cta: "Suscribirse",
    },
    note:
      "Los precios están en dólares estadounidenses y se facturan por adelantado cada mes. Tu clave API nunca sale de tu dispositivo: la suscripción cubre la sincronización en la nube y el MCP en la nube. Cancela cuando quieras; el acceso continúa hasta el final del periodo que ya has pagado.",
    faqTitle: "Preguntas sobre la suscripción",
    faq: [
      {
        q: "¿Sigo pagando por el uso del modelo?",
        a: "Sí. La suscripción cubre la sincronización en la nube y el MCP en la nube. Las llamadas al modelo van directamente al proveedor que hayas configurado y te las factura él, nunca nosotros.",
      },
      {
        q: "¿Qué pasa si cancelo?",
        a: "Tu base de conocimiento sigue sincronizándose hasta el final del periodo que ya has pagado. Después, la cuenta vuelve al plan gratuito y se queda solo en local, sin perder nada de tus dispositivos.",
      },
      {
        q: "¿Puedo usar las apps sin suscribirme?",
        a: "Sí. Las tres apps funcionan por completo en tu propio dispositivo con tu propia clave API. Solo la sincronización en la nube y el MCP en la nube necesitan una suscripción. El MCP local es gratis.",
      },
      {
        q: "¿Cómo pago?",
        a: "El pago lo gestiona nuestro proveedor de pagos. Hay tarjetas, PayPal y métodos de pago locales según tu país de facturación.",
      },
      {
        q: "¿Dónde se guarda mi información de pago?",
        a: "En nuestro proveedor de pagos, nunca con nosotros. Solo recibimos el estado de la suscripción y la dirección de correo de la cuenta.",
      },
    ],
    ctaTitle: "¿Listo para sincronizar?",
    ctaBody: "Inicia sesión una vez y elige Pro en la página de la cuenta.",
  },

  plan: {
    description: "Todas las funciones en Chrome, Zotero y Android.",
    features: [
      "Guarda el texto original y tus propias notas, sin límites",
      "200 MB de almacenamiento en la nube para las entradas sincronizadas",
      "Formula preguntas sobre tu propia biblioteca",
      "Sincroniza entre Chrome, Zotero y Android",
      "3 días de prueba gratuita, cancela cuando quieras",
    ],
  },

  privacy: {
    title: "Política de privacidad",
    intro: "Esta página explica qué guarda Renota, qué sale de tu dispositivo y cómo borrarlo.",
    fullPolicy: "Política completa",
    summaryTitle: "Versión breve",
    summary: [
      "Tus fragmentos, resaltados y notas se guardan en tu dispositivo por defecto.",
      "Los prompts y el texto que contienen van directamente al proveedor de modelo que hayas configurado.",
      "Las claves API nunca salen de tu dispositivo y nunca se suben.",
      "La sincronización en la nube está desactivada por defecto. Si la activas, las entradas de conocimiento se guardan en nuestro servidor para que tus otros dispositivos puedan leerlas.",
      "Las capturas de pantalla se quedan en tu teléfono. El OCR se ejecuta en el dispositivo y solo se envía al proveedor de modelo que hayas configurado el texto que decidas guardar.",
      "Puedes eliminar tu cuenta y todos los datos sincronizados cuando quieras.",
    ],
    englishNote:
      "La versión siguiente es la traducción oficial al español de la política de privacidad. En caso de discrepancia con la versión en inglés, prevalecerá la versión en inglés.",
  },

  terms: {
    title: "Condiciones del servicio",
    intro: "Las reglas para usar Renota: tu contenido sigue siendo tuyo, las claves se quedan en tu dispositivo y la salida del modelo necesita tu criterio.",
    fullPolicy: "Condiciones completas",
    summaryTitle: "Versión breve",
    summary: [
      "Todo lo que guardas es tuyo. Solo lo almacenamos y lo transmitimos para prestarte el servicio.",
      "Traes tu propia clave API y pagas directamente a tu proveedor de modelo. Nunca vemos tu clave.",
      "La salida de la IA puede estar equivocada. Renota es una ayuda a la lectura, no asesoramiento profesional.",
      "La sincronización en la nube es opcional; las apps funcionan sin cuenta.",
      "Puedes eliminar tu cuenta y los datos sincronizados cuando quieras.",
    ],
    englishNote:
      "La versión siguiente es la traducción oficial al español de las condiciones del servicio. En caso de discrepancia con la versión en inglés, prevalecerá la versión en inglés.",
  },


  account: {
    title: "Cuenta",
    intro: "La sincronización en la nube necesita una cuenta. Inicia sesión una vez y la misma base de conocimiento te acompaña en el navegador, Zotero y el teléfono.",
    plan: {
      label: "Plan",
      free: "Gratis — base de conocimiento local",
      pro: "Pro — sincronización en la nube activa",
      upgrade: "Suscríbete para activar la sincronización en la nube",
      checkout: "Suscribirse",
      cancel: "Cancelar suscripción",
      cancelHint: "Mantienes el acceso hasta el final del periodo que ya has pagado.",
      renewsOn: "Se renueva el",
      until: "Acceso hasta",
      canceledUntil: "Cancelada — acceso hasta",
      price: "$9.90 / mes",
      notAvailable: "La suscripción no está disponible en este momento.",
      failed: "No se pudo iniciar el pago. Inténtalo de nuevo.",
      cancelDone: "Cancelación programada. El acceso continúa hasta que termine el periodo.",
      pricingLink: "Comparar planes",
      manageBilling: "Gestionar la facturación",
      portalFailed: "No se pudo abrir el portal de facturación. Inténtalo de nuevo.",
      pastDue: "El pago ha fallado. Actualiza tu método de pago para seguir sincronizando.",
    },
    storage: {
      label: "Almacenamiento en la nube",
      used: "Usado",
      limit: "Límite",
      full: "Almacenamiento lleno",
      freeHint: "El almacenamiento en la nube forma parte de Pro.",
    },
    signedOut: {
      heading: "Inicia sesión o crea una cuenta",
      google: "Continuar con Google",
      orEmail: "o usa tu dirección de correo",
      body: "Escribe tu dirección de correo. Te enviamos un enlace de un solo uso: ninguna contraseña que recordar, y no existe ninguna cuenta hasta que haces clic en él.",
      emailLabel: "Dirección de correo",
      placeholder: "tu@ejemplo.com",
      send: "Enviar enlace de acceso",
      sending: "Enviando…",
      sent: "Revisa tu bandeja de entrada. El enlace caduca en 15 minutos y sirve una sola vez.",
    },
    signedIn: {
      heading: "Sesión iniciada",
      emailLabel: "Cuenta",
      clipsLabel: "Entradas de conocimiento",
      devicesLabel: "Dispositivos conectados",
      sessionsLabel: "Sesiones del navegador",
      noDevices: "Todavía ningún cliente ha iniciado sesión con un token de dispositivo.",
      syncEndpoint: "Punto de conexión de sincronización",
      signOut: "Cerrar sesión",
      signOutAll: "Cerrar sesión en todas partes",
      deleteAccount: "Eliminar la cuenta y los datos",
      deleteWarning: "Esto elimina todas las entradas sincronizadas, todos los dispositivos y la propia cuenta. No se puede deshacer.",
      deleteConfirm: "Eliminar de forma permanente",
      deleting: "Eliminando…",
    },
    keys: {
      label: "Claves API para agentes",
      intro:
        "Deja que cualquier agente de IA —Claude Code, Cursor, DSH— busque en tu base de conocimiento a través del MCP en la nube. Las claves son de solo lectura: un agente puede encontrar y leer lo que guardaste, nunca cambiarlo.",
      empty: "Todavía no hay claves.",
      namePlaceholder: "¿Para qué es esta clave? P. ej. Claude Code",
      create: "Crear clave",
      creating: "Creando…",
      createdHint: "Cópiala ahora. Es la única vez que se muestra la clave completa.",
      copy: "Copiar",
      copied: "Copiado",
      revoke: "Revocar",
      revoking: "Revocando…",
      revokedNotice: "Clave revocada. Cualquier agente que aún la use deja de funcionar de inmediato.",
      created: "Creada",
      lastUsed: "Último uso",
      never: "Nunca usada",
      nameRequired: "Ponle un nombre a la clave primero.",
      nameTaken: "Ya tienes una clave con ese nombre.",
      limitReached: "Has alcanzado el límite de claves activas. Revoca una que ya no uses.",
      loadFailed: "No se pudieron cargar tus claves API.",
      createFailed: "No se pudo crear la clave. Inténtalo de nuevo.",
      requiresPro: "El MCP en la nube es una función de pago. Suscríbete para conectar un agente, o usa el servidor local renota-mcp, gratis y sin cuenta.",
      mcpTitle: "Punto de conexión MCP",
      mcpHint: "Apunta tu agente a esta URL y envía la clave como token bearer.",
      configTitle: "Configuración del cliente",
    },
    errors: {
      rate_limited: "Demasiadas solicitudes. Espera unos minutos e inténtalo de nuevo.",
      mail_failed: "No pudimos enviar el correo. Inténtalo de nuevo en un rato.",
      mail_not_configured: "El envío de correo no está configurado en el servidor.",
      invalid_token: "Este enlace no es válido o ha caducado. Pide uno nuevo.",
      used_token: "Este enlace ya se ha usado. Pide uno nuevo.",
      missing_token: "Al enlace le falta el token. Pide uno nuevo.",
      no_session: "No has iniciado sesión.",
      invalid_session: "Tu sesión ha caducado. Inicia sesión de nuevo.",
      generic: "Algo ha salido mal. Inténtalo de nuevo.",
    },
    welcome: "Sesión iniciada. Este dispositivo ya está vinculado a tu cuenta.",
    backHome: "Volver al inicio",
  },

  checkout: {
    heading: "Elige tu plan",
    lede: "3 días de prueba gratuita. Se requiere un método de pago: el cobro se hace automáticamente cuando termina la prueba. Cancela cuando quieras antes de esa fecha.",
    monthly: "Mensual",
    yearly: "Anual",
    perMonth: "/mes",
    perYear: "/año",
    subscribeNow: "Suscribirse ahora",
    startTrial: "Iniciar la prueba de 3 días",
    billingPeriod: "Periodo de facturación",
    perMonthNote:
      "Los precios no incluyen impuestos. Los impuestos de tu ubicación se calculan al pagar, y el total que muestra el pago es el definitivo.",
    localized: "Los precios se muestran según tu ubicación; el importe final se confirma al pagar.",
    pricesFailed: "No se pudieron cargar los precios. Actualiza la página e inténtalo de nuevo.",
    checkoutFailed: "No se pudo abrir el pago. Inténtalo de nuevo o escribe a soporte.",
    signinRequired: "Inicia sesión primero: el pago continúa en tu cuenta.",
  },

  welcome: {
    heading: "Todo listo",
    lede: "Gracias por suscribirte a Renota Pro. El recibo llegará a tu correo y podrás gestionar la suscripción cuando quieras.",
    accountCta: "Ir a tu cuenta",
    homeCta: "Volver al inicio",
    note: "Si el correo de confirmación no llega en unos minutos, revisa la carpeta de spam o escribe a support@werenota.com.",
  },
};

