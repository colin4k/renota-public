// 巴西葡萄牙语文案。类型来自英文版，缺字段或结构不一致会在 typecheck 阶段失败。

import type { Content } from "./en.js";

export const pt: Content = {
  siteName: "Renota",

  nav: {
    chrome: "Chrome",
    zotero: "Zotero",
    android: "Android",
    pricing: "Preços",
    privacy: "Privacidade",
    account: "Conta",
    github: "GitHub",
    language: "Idioma",
    home: "Início",
  },

  footer: {
    tagline: "Uma base de conhecimento privada no navegador, no Zotero e no seu celular.",
    products: "Produtos",
    resources: "Suporte",
    legal: "Jurídico",
    privacy: "Política de privacidade",
    terms: "Termos de serviço",
    copyright: "Renota. Use a sua própria chave de API.",
    discord: "Discord",
    mail: "E-mail",
    madeFor: "Feito para quem lê muito.",
  },

  common: {
    learnMore: "Saiba mais",
    install: "Baixar",
    viewOnGithub: "Ver no GitHub",
    readMore: "Ler mais",
    faq: "Perguntas frequentes",
    onThisPage: "Nesta página",
    backToHome: "Voltar ao início",
    languageLabel: "Idioma",
    skipToContent: "Ir para o conteúdo",
    productsNav: "Produtos",
    free: "Grátis",
    byoKey: "Sua própria chave de API",
    localFirst: "Local em primeiro lugar",
    cloudSync: "Sincronização na nuvem opcional",
    multiLanguage: "10 idiomas de interface",
    highlights: "Por que se destaca",
    updated: "Última atualização",
    requirements: "Requisitos",
    note: "Observação",
    status: "Status",
  },

  seo: {
    terms: {
      title: "Termos de Serviço",
      description:
        "As regras de uso do Renota: seu conteúdo, suas chaves de API, uso aceitável, disponibilidade e responsabilidade.",
    },
    home: {
      title: "Renota — leia, guarde e pergunte às suas próprias notas",
      description:
        "O Renota transforma o que você lê no navegador, no Zotero e no celular em uma base de conhecimento privada. Com a sua própria chave de API.",
    },
    chrome: {
      title: "Renota para Chrome — leitura com IA sobre as suas notas",
      description:
        "Explique, analise, questione e traduza qualquer seleção, salve na sua base de conhecimento e pergunte a ela. Local em primeiro lugar, com a sua chave de API.",
    },
    zotero: {
      title: "Renota para Zotero — leitura com IA de livros EPUB e PDF",
      description:
        "Leia livros no Zotero com explicações, busca no livro e proteção contra spoilers. Salve passagens e destaques sem sair do leitor; pesquise tudo depois.",
    },
    android: {
      title: "Renota para Android — leitor de IA flutuante",
      description:
        "Selecione qualquer região da tela e pergunte sobre ela. OCR de chinês offline, funciona com PDFs digitalizados e usa a mesma base de conhecimento dos apps.",
    },
    privacy: {
      title: "Política de privacidade",
      description:
        "O que o Renota guarda no seu dispositivo, o que sai dele, quando a sincronização na nuvem envia algo e como apagar.",
    },
    pricing: {
      title: "Preços — apps grátis, sincronização paga",
      description:
        "O Renota é grátis com a sua própria chave de API. A sincronização na nuvem entre navegador, Zotero e celular custa US$9.90 por mês. Cancele quando quiser.",
    },
  },

  home: {
    hero: {
      badge: "Para quem lê muito",
      title: "Leia qualquer coisa. Guarde o que importa. Pergunte às suas notas.",
      subtitle:
        "O Renota fica ao lado do que você está lendo — uma página web, um livro no Zotero, uma página digitalizada no celular — e ajuda você a entender. Tudo o que você salva vira uma única base de conhecimento à qual você pode fazer perguntas.",
      primary: "Conheça os produtos",
      secondary: "Leia a política de privacidade",
      stats: [
        { value: "3", label: "superfícies: navegador, Zotero, Android" },
        { value: "0", label: "chaves de API guardadas nos nossos servidores" },
        { value: "10", label: "idiomas de interface" },
      ],
    },

    products: {
      title: "Três apps, uma base de conhecimento",
      intro:
        "Cada app é útil sozinho. Entre uma vez e os mesmos trechos, destaques e insights acompanham você nos três.",
      chrome: {
        kicker: "Extensão de navegador",
        name: "Renota para Chrome",
        tagline: "Entenda e reescreva o que você lê na web.",
        points: [
          "Explique, analise, questione, traduza ou conecte uma seleção ao que você já salvou.",
          "Salve uma passagem com um clique; ela vira contexto pesquisável para todas as perguntas seguintes.",
          "Grave a resposta de volta no editor, substituindo ou inserindo o texto.",
        ],
        cta: "Conheça a extensão para Chrome",
      },
      zotero: {
        kicker: "Plugin para Zotero",
        name: "Renota para Zotero",
        tagline: "Leia livros inteiros com um assistente que leu as mesmas páginas que você.",
        points: [
          "Funciona dentro do leitor do Zotero para EPUB, PDF e páginas web salvas.",
          "Proteção contra spoilers: o modelo só vê o texto até a sua posição de leitura.",
          "Grave as explicações de volta como comentários de destaque ou na sua nota de leitura.",
        ],
        cta: "Conheça o plugin para Zotero",
      },
      android: {
        kicker: "App para Android",
        name: "Renota para Android",
        tagline: "Uma bolinha flutuante que lê a tela e responde, em qualquer app.",
        points: [
          "Selecione uma região da tela e receba OCR mais uma resposta — inclusive em PDFs digitalizados.",
          "Roda OCR de chinês offline no aparelho; só o texto reconhecido vai para o seu modelo.",
          "As mesmas ações e a mesma base de conhecimento dos apps de desktop.",
        ],
        cta: "Conheça o app para Android",
      },
    },

    why: {
      title: "Feito do jeito que quem lê gostaria",
      intro: "Sem conta obrigatória, sem conteúdo enviado para nós, sem ficar preso.",
      items: [
        {
          title: "Sua chave, seu modelo",
          body: "Conecte OpenAI, DeepSeek, Anthropic, OpenRouter ou qualquer endpoint compatível com OpenAI. As requisições vão direto do seu dispositivo para o provedor — nunca passam por nós.",
        },
        {
          title: "Local em primeiro lugar por padrão",
          body: "Trechos, destaques e notas ficam no seu navegador, na pasta de dados do Zotero ou no banco de dados do app. A sincronização na nuvem é opcional e pode ser desligada a qualquer momento.",
        },
        {
          title: "Busca que funciona em chinês",
          body: "Busca BM25 com tokenização CJK adequada, então as passagens salvas são realmente encontradas quando você pergunta sobre elas — não só quando você lembra as palavras exatas.",
        },
        {
          title: "Mostra as fontes",
          body: "As respostas citam os trechos e as passagens de livro que usaram, e cada citação leva de volta ao texto original para você conferir.",
        },
      ],
    },

    how: {
      title: "Como funciona",
      steps: [
        {
          title: "Capturar",
          body: "Selecione texto em uma página web, destaque uma passagem no Zotero ou enquadre uma região no celular. O Renota salva com o contexto e a fonte.",
        },
        {
          title: "Perguntar",
          body: "Escolha uma ação — entender, analisar, questionar, traduzir, conectar — ou faça sua própria pergunta. O material salvo é buscado e citado automaticamente.",
        },
        {
          title: "Guardar",
          body: "Grave a resposta de volta onde você estava trabalhando ou salve como insight. De qualquer forma, ela entra na mesma base de conhecimento.",
        },
      ],
    },

    sync: {
      title: "Sincronize quando quiser",
      body: "Tudo funciona em um único dispositivo sem conta. Se você usa mais de um — navegador na mesa, Zotero no notebook, celular na mão — pode entrar com um código por e-mail e sincronizar sua base de conhecimento.",
      points: [
        "Desligado por padrão: nada é enviado até você entrar.",
        "Só seus trechos, destaques e insights são sincronizados. As chaves de API nunca saem do dispositivo.",
        "Exclusões também sincronizam, então um trecho apagado não reaparece em outro dispositivo.",
        "Saia a qualquer momento; a cópia local fica onde está.",
      ],
    },

    mcp: {
      title: "Sua base de conhecimento como ferramenta para agentes",
      lede: "Além da sincronização na nuvem, o mesmo material pode ser lido por outros programas.",
      body:
        "Claude Code, Cursor ou um pequeno script que você mesmo escreveu podem buscar seus trechos, destaques e notas via MCP — sem mais colar passagens no prompt à mão.",
      points: [
        "Somente leitura: um agente pode encontrar e citar suas entradas, nunca alterar ou apagar.",
        "Consultas em chinês também funcionam — é o mesmo índice dos apps.",
        "Requer uma conta no plano Pro: crie uma chave de API na página da conta e coloque na configuração do seu agente.",
      ],
      endpointLabel: "Endpoint MCP",
      cta: "Crie uma chave de API na página da conta",
    },

    faq: {
      title: "Perguntas que as pessoas fazem",
      items: [
        {
          q: "Preciso de uma conta?",
          a: "Não. Cada app funciona sem conta. A conta serve apenas para a sincronização na nuvem opcional entre dispositivos.",
        },
        {
          q: "É grátis?",
          a: "Os apps são grátis e de código aberto. Você paga o provedor de modelo diretamente pelo uso da API — o custo depende do modelo que escolher.",
        },
        {
          q: "Para onde vão meus dados?",
          a: "Por padrão, para lugar nenhum: trechos e notas ficam no seu dispositivo e os prompts vão direto para o provedor de modelo que você configurou. Se você ativar a sincronização na nuvem, suas entradas de conhecimento são guardadas no nosso banco de dados para que seus outros dispositivos possam lê-las. As chaves de API nunca são enviadas.",
        },
        {
          q: "Quais idiomas são suportados?",
          a: "A interface vem em dez idiomas — inglês, chinês simplificado, chinês tradicional, japonês, coreano, francês, alemão, espanhol, português e russo — e todos estão totalmente traduzidos. O assistente responde no idioma que você pedir.",
        },
        {
          q: "Posso conectar minha base de conhecimento ao Claude Code ou ao Cursor?",
          a: "Sim. Crie uma chave de API na página da conta e aponte seu agente para o endpoint MCP com essa chave. Isso faz parte do plano Pro e é somente leitura: um agente pode ler suas entradas, não alterá-las.",
        },
      ],
    },

    cta: {
      title: "Comece pela superfície onde você já lê",
      body: "Escolha o app que combina com onde acontece a maior parte da sua leitura. Você pode adicionar os outros depois — a base de conhecimento é compartilhada.",
    },
  },

  product: {
    chrome: {
      kicker: "Extensão de navegador",
      name: "Renota para Chrome",
      tagline: "Um assistente de leitura com IA que lembra do que você salvou.",
      intro:
        "Selecione texto em qualquer página e o Renota explica, questiona, traduz ou conecta ao que você leu antes. Salve as partes que valem a pena e elas viram contexto para toda pergunta seguinte — com citações que voltam à fonte.",
      highlights: [
        {
          title: "Cinco ações sobre uma seleção",
          body: "Entender, analisar, questionar, traduzir, conectar — cada uma com um prompt que você pode editar, mais os botões personalizados que você adicionar.",
        },
        {
          title: "Uma base de conhecimento, não um histórico de chat",
          body: "Trechos e insights salvos são indexados localmente com BM25 e tokenização CJK, então a busca os encontra mesmo quando as palavras são diferentes.",
        },
        {
          title: "Grava onde você está trabalhando",
          body: "Coloque a resposta direto no editor de onde você selecionou, ou copie. Sem passar por outra janela.",
        },
      ],
      features: {
        title: "O que ele faz",
        items: [
          {
            title: "Barra de seleção",
            body: "Uma barra pequena aparece ao lado da sua seleção em qualquer site, com as ações que você ativou.",
          },
          {
            title: "Pergunte à sua base de conhecimento",
            body: "Faça uma pergunta e o Renota busca primeiro os trechos relevantes, responde a partir deles e numera as citações para você abrir a fonte exata.",
          },
          {
            title: "Use o seu próprio modelo",
            body: "OpenAI, DeepSeek, OpenRouter ou qualquer URL base compatível com OpenAI. Teste a conexão nas configurações antes de contar com ela.",
          },
          {
            title: "Gravar de volta",
            body: "Substitua ou insira a resposta no campo de onde você veio — útil para respostas, notas e rascunhos.",
          },
          {
            title: "Contexto da página",
            body: "O texto ao redor da sua seleção acompanha a requisição, o que costuma ser a diferença entre uma resposta genérica e uma útil.",
          },
          {
            title: "Dez idiomas de interface",
            body: "Escolha um idioma ou siga o navegador. Todos os dez estão totalmente traduzidos, até as páginas legais.",
          },
        ],
      },
      steps: {
        title: "Como usar",
        items: [
          {
            title: "Selecione e escolha uma ação",
            body: "Destaque o texto e escolha entender, analisar, questionar, traduzir ou conectar na barra.",
          },
          {
            title: "Leia com citações",
            body: "A resposta chega em streaming ao painel lateral. Citações numeradas apontam para os trechos e as passagens de livro usados.",
          },
          {
            title: "Salve ou grave de volta",
            body: "Guarde a resposta como insight, salve a seleção como trecho ou insira a resposta na página em que você está escrevendo.",
          },
        ],
      },
      privacy: {
        title: "O que sai do seu navegador",
        body: "Só o que você envia ao seu provedor de modelo, mais a sincronização na nuvem opcional, se você ativá-la.",
        points: [
          "O conteúdo da página só é enviado ao seu provedor quando você executa uma ação, nunca em segundo plano.",
          "Sua chave de API fica no armazenamento local da extensão e só é enviada a esse provedor.",
          "Sua base de conhecimento fica no IndexedDB, a menos que você entre para sincronizar.",
        ],
      },
      faq: {
        title: "Perguntas sobre a extensão para Chrome",
        items: [
          {
            q: "Quais provedores de modelo funcionam?",
            a: "Qualquer um que fale a API de chat completions da OpenAI — OpenAI, DeepSeek, OpenRouter, gateways auto-hospedados — e também qualquer URL base personalizada.",
          },
          {
            q: "Funciona offline?",
            a: "A extensão precisa de conexão de rede para chamar o modelo. Salvar, buscar e ler seus próprios trechos funciona localmente, sem conexão.",
          },
          {
            q: "Posso editar os prompts?",
            a: "Sim. Cada ação embutida tem um prompt editável, e você pode adicionar botões personalizados com o próprio prompt.",
          },
          {
            q: "Onde fica a minha base de conhecimento?",
            a: "No IndexedDB do navegador, no escopo da extensão. Desinstalar a extensão apaga tudo, a menos que você tenha ativado a sincronização na nuvem.",
          },
          {
            q: "Ele envia algo para os servidores de vocês?",
            a: "Apenas contadores anônimos de uso, e só se você mantiver ligada a telemetria opcional. Nenhum conteúdo de página, nenhum prompt, nenhuma chave de API.",
          },
        ],
      },
      install: {
        title: "Obtenha a extensão",
        body: "A página da Chrome Web Store está em preparação. Até lá, o código-fonte fica no GitHub.",
        primary: { label: "Baixar", note: "Página na Chrome Web Store em preparação" },
        requirements: "Chrome 120 ou mais recente. Uma chave de API de qualquer provedor compatível com OpenAI.",
      },
    },

    zotero: {
      kicker: "Plugin para Zotero",
      name: "Renota para Zotero",
      tagline: "Leia livros inteiros com um assistente que leu as mesmas páginas que você.",
      intro:
        "O Renota vive dentro do leitor do Zotero. Selecione uma passagem em um EPUB, um PDF ou uma página web salva e receba uma explicação baseada neste livro — os capítulos anteriores, os seus próprios destaques e nada que você ainda não leu.",
      highlights: [
        {
          title: "Sem spoilers",
          body: "Só o texto anterior à sua posição de leitura chega ao modelo, incluindo resultados de busca e notas de leitura. Leia um livro de suspense sem estragar a história.",
        },
        {
          title: "Busca dentro do livro",
          body: "Cada livro é dividido em blocos e indexado localmente, então perguntas como quem é um personagem podem ser respondidas a partir de passagens anteriores, com citações.",
        },
        {
          title: "Grava de volta no Zotero",
          body: "Salve uma explicação como comentário de destaque, anexe a uma nota de leitura ou guarde como insight na sua base de conhecimento.",
        },
      ],
      features: {
        title: "O que ele faz",
        items: [
          {
            title: "Popup de seleção no leitor",
            body: "Entender, analisar, questionar, traduzir, quem/o quê, salvar, perguntar — logo abaixo do popup de seleção do próprio Zotero.",
          },
          {
            title: "Recapítulo e resumo do capítulo",
            body: "Receba um lembrete do que aconteceu até agora ou um resumo do capítulo que você acabou de terminar, montado com o texto anterior à sua posição.",
          },
          {
            title: "Suas anotações viram conhecimento",
            body: "Os destaques feitos no Zotero são espelhados na base de conhecimento assim que são criados, para poderem ser buscados e citados depois.",
          },
          {
            title: "Notas de leitura",
            body: "As respostas podem ser anexadas a uma nota por livro, o que te dá um único documento em crescimento em vez de anotações espalhadas.",
          },
          {
            title: "Funciona em EPUB, PDF e páginas salvas",
            body: "Caminhos de capítulo e posição de leitura são rastreados onde o leitor os expõe; PDFs digitalizados recorrem à camada de texto que existir.",
          },
          {
            title: "Compartilha uma base de conhecimento",
            body: "Os mesmos trechos ficam visíveis na extensão para Chrome e no app para Android quando a sincronização está ativada.",
          },
        ],
      },
      steps: {
        title: "Como usar",
        items: [
          {
            title: "Instale o plugin e defina um modelo",
            body: "Instale o .xpi e preencha provedor, URL base, chave e modelo nas configurações do Zotero, em Renota.",
          },
          {
            title: "Abra um livro e selecione o texto",
            body: "O livro é indexado em segundo plano. Selecione uma passagem para ver os botões de ação.",
          },
          {
            title: "Grave de volta",
            body: "Envie a resposta para um comentário de destaque ou para a sua nota de leitura, ou guarde como insight.",
          },
        ],
      },
      privacy: {
        title: "O que sai da sua máquina",
        body: "Só o texto necessário para responder à ação que você iniciou, e nunca texto posterior à sua posição de leitura.",
        points: [
          "O índice do livro é criado e guardado localmente, em um arquivo SQLite do próprio plugin.",
          "Sua chave de API fica nas preferências do Zotero para este plugin.",
          "A sincronização, se ativada, envia apenas entradas de conhecimento — nunca o arquivo do livro.",
        ],
      },
      faq: {
        title: "Perguntas sobre o plugin para Zotero",
        items: [
          {
            q: "Quais versões do Zotero são suportadas?",
            a: "O alvo é o Zotero 7, com compatibilidade declarada para 8, 9 e 10.",
          },
          {
            q: "Ele envia o livro inteiro para o modelo?",
            a: "Não. Só são enviados a seleção, um pouco de contexto ao redor e algumas passagens recuperadas — todas anteriores à sua posição de leitura.",
          },
          {
            q: "Posso desativar o espelhamento de anotações?",
            a: "Sim, nas configurações. Desativá-lo também remove as anotações que já tinham sido espelhadas na base de conhecimento.",
          },
          {
            q: "Funciona com PDFs digitalizados?",
            a: "Só na medida em que o arquivo tenha camada de texto. Páginas digitalizadas não têm o que selecionar, então use o OCR do app para Android nesses casos.",
          },
          {
            q: "A extensão para Chrome consegue ler esta base de conhecimento?",
            a: "Sim, na mesma máquina: ative o endpoint de sincronização local nas configurações do plugin e emparelhe a extensão com um token. Ou use a sincronização na nuvem.",
          },
        ],
      },
      install: {
        title: "Obtenha o plugin",
        body: "Baixe o .xpi na página de versões e instale pelo gerenciador de plugins do Zotero.",
        primary: { label: "Baixar .xpi", note: "Versão mais recente" },
        requirements: "Zotero 7 ou mais recente. Uma chave de API de qualquer provedor compatível com OpenAI, ou da Anthropic.",
      },
    },

    android: {
      kicker: "App para Android",
      name: "Renota para Android",
      tagline: "Uma bolinha flutuante que lê a tela e responde, em qualquer app.",
      intro:
        "Parte da leitura acontece onde você não consegue selecionar texto: uma página digitalizada, o visualizador de PDF de outra pessoa, uma captura de tela. O Renota põe uma bolinha pequena flutuando sobre qualquer app. Enquadre uma região e ele reconhece o texto no aparelho, envia para o seu modelo e mostra a resposta em um painel de onde você pode copiar.",
      highlights: [
        {
          title: "Funciona sobre qualquer app",
          body: "Enquadre uma região ou capture a tela inteira.",
        },
        {
          title: "OCR de chinês offline",
          body: "O reconhecimento roda no aparelho com o ML Kit, então a captura de tela em si não é enviada a lugar nenhum.",
        },
        {
          title: "As mesmas ações, a mesma base de conhecimento",
          body: "Entender, analisar, questionar, traduzir, quem/o quê, conectar — com a base de conhecimento compartilhada com os apps de desktop.",
        },
      ],
      features: {
        title: "O que ele faz",
        items: [
          {
            title: "Captura por região e de tela inteira",
            body: "Arraste uma caixa ou capture a tela toda e escolha uma ação. O texto ao redor vira contexto.",
          },
          {
            title: "Opção multimodal",
            body: "Se a página for uma fórmula, uma tabela ou um diagrama, envie a imagem em si para um modelo com visão, em vez do texto do OCR.",
          },
          {
            title: "Pontos de entrada em todo lugar",
            body: "Menu de seleção, compartilhamento, área de transferência, intenções de tradução e consulta a dicionário podem iniciar uma requisição.",
          },
          {
            title: "Chave de API criptografada",
            body: "A chave é guardada o armazenamento de chaves do sistema do Android (AES-256-GCM), e não em preferências em texto puro.",
          },
          {
            title: "Sincronização em segundo plano",
            body: "Trechos salvos no celular aparecem nos apps de desktop e vice-versa, quando a sincronização na nuvem está ativada.",
          },
          {
            title: "Feito para usar com uma mão",
            body: "A bolinha pode ser movida, redimensionada e deixada translúcida, e ela lembra onde você a deixou.",
          },
        ],
      },
      steps: {
        title: "Como usar",
        items: [
          {
            title: "Ative o assistente flutuante",
            body: "Conceda a permissão de acessibilidade uma vez. Depois disso a bolinha fica sobre os outros apps.",
          },
          {
            title: "Enquadre o que você quer ler",
            body: "Toque na bolinha, escolha região ou tela inteira e confirme. O texto é reconhecido no aparelho.",
          },
          {
            title: "Pergunte, salve, compartilhe",
            body: "Escolha uma ação ou digite a sua pergunta; salve a resposta como insight ou o texto como trecho.",
          },
        ],
      },
      privacy: {
        title: "O que o app consegue ver",
        body: "Ele captura só quando você inicia uma captura, e envia ao seu modelo apenas o texto reconhecido.",
        points: [
          "O serviço de acessibilidade não lê o conteúdo da tela em segundo plano e nunca captura por conta própria.",
          "O OCR roda localmente; capturas de tela não são enviadas, a menos que você escolha a opção multimodal.",
          "A base de conhecimento é um arquivo SQLite local; o backup do Android está desativado para ele.",
        ],
      },
      faq: {
        title: "Perguntas sobre o app para Android",
        items: [
          {
            q: "Por que ele precisa de um serviço de acessibilidade?",
            a: "O Android não tem outra forma de desenhar sobre outros apps e tirar uma captura de tela sob demanda. O serviço só age quando você toca na bolinha.",
          },
          {
            q: "Existe uma versão na Play Store?",
            a: "No momento não — o assistente flutuante depende de permissões que as políticas da loja não permitem para este caso de uso, então ele é distribuído como APK instalado manualmente.",
          },
          {
            q: "O OCR precisa de rede?",
            a: "Não. O reconhecimento de chinês vem embutido e roda offline. A chamada ao modelo depois disso, sim, precisa de conexão.",
          },
          {
            q: "Quais versões do Android funcionam?",
            a: "Android 11 (API 30) ou mais recente, já que tirar capturas de tela por código exige isso.",
          },
          {
            q: "Posso usar sem a bolinha flutuante?",
            a: "Sim — o menu de seleção, o compartilhamento e a área de transferência funcionam com a sobreposição desativada.",
          },
        ],
      },
      install: {
        title: "Obtenha o app",
        body: "Baixe o APK na página de versões e instale. Você vai precisar permitir instalações pelo navegador ou pelo gerenciador de arquivos.",
        primary: { label: "Baixar", note: "Versão mais recente" },
        requirements: "Android 11 ou mais recente. Uma chave de API de qualquer provedor compatível com OpenAI, ou da Anthropic.",
      },
    },
  },

  pricing: {
    title: "Preços",
    intro:
      "Os três apps são grátis com a sua própria chave de API. A sincronização na nuvem é o único recurso pago — uma assinatura mensal única que mantém a mesma base de conhecimento em dia no navegador, no Zotero e no celular.",
    badge: "Cancele quando quiser",
    plansTitle: "Dois planos, uma base de conhecimento",
    free: {
      name: "Grátis",
      price: "$0",
      period: "para sempre",
      summary: "Use todos os apps no seu próprio dispositivo com a sua própria chave de API.",
      features: [
        "Extensão para Chrome, plugin para Zotero e app para Android",
        "Use a sua própria chave de API — o uso do modelo é cobrado pelo provedor",
        "Trechos, destaques e notas ficam no seu dispositivo",
        "Nenhum pagamento para começar",
      ],
      cta: "Baixe os apps",
    },
    pro: {
      name: "Pro",
      price: "$9.90",
      period: "por mês",
      summary: "Ative a sincronização na nuvem para a mesma base de conhecimento acompanhar todos os dispositivos.",
      features: [
        "Tudo do Grátis",
        "Os mesmos trechos no navegador, no Zotero e no celular",
        "Entre em um novo dispositivo e continue lendo, continue perguntando",
        "Exclusões também sincronizam, então nada reaparece em outro dispositivo",
        "Dê a Claude Code, Cursor e outros agentes acesso de leitura via MCP",
      ],
      cta: "Assinar",
    },
    note:
      "Os preços são em dólares americanos, cobrados mensalmente e adiantado pela Paddle. Sua chave de API nunca sai do seu dispositivo — a assinatura cobre apenas a sincronização na nuvem. Cancele quando quiser; o acesso continua até o fim do período que você já pagou.",
    faqTitle: "Perguntas sobre a assinatura",
    faq: [
      {
        q: "Ainda pago pelo uso do modelo?",
        a: "Sim. A assinatura cobre apenas a sincronização na nuvem. As chamadas ao modelo vão direto para o provedor que você configurou e são cobradas por ele, nunca por nós.",
      },
      {
        q: "O que acontece se eu cancelar?",
        a: "Sua base de conhecimento continua sincronizando até o fim do período que você já pagou. Depois disso, a conta volta para o plano grátis e fica apenas local, sem perder nada nos seus dispositivos.",
      },
      {
        q: "Posso usar os apps sem assinar?",
        a: "Sim. Os três apps funcionam plenamente no seu próprio dispositivo com a sua própria chave de API. Só a sincronização entre dispositivos exige assinatura.",
      },
      {
        q: "Como eu pago?",
        a: "O checkout é feito pela Paddle, nosso comerciante registrado (merchant of record). Cartões, PayPal e métodos de pagamento locais estão disponíveis conforme o seu país de cobrança.",
      },
      {
        q: "Onde ficam as informações do meu pagamento?",
        a: "Com a Paddle, nunca com a gente. Nós só recebemos o status da assinatura e o endereço de e-mail da conta.",
      },
    ],
    ctaTitle: "Pronto para sincronizar?",
    ctaBody: "Entre uma vez e escolha o Pro na página da conta.",
  },

  plan: {
    description: "Acesso completo no Chrome, no Zotero e no Android.",
    features: [
      "Salve texto original e suas próprias notas, sem limites",
      "Faça perguntas na sua própria base de conhecimento",
      "Sincronize entre Chrome, Zotero e Android",
      "Teste grátis de 3 dias, cancele quando quiser",
    ],
  },

  privacy: {
    title: "Política de privacidade",
    intro: "Esta página explica o que o Renota guarda, o que sai do seu dispositivo e como apagar.",
    fullPolicy: "Política completa",
    summaryTitle: "Resumo",
    summary: [
      "Seus trechos, destaques e notas ficam no seu dispositivo por padrão.",
      "Os prompts e o texto que eles contêm vão direto para o provedor de modelo que você configurou.",
      "As chaves de API nunca saem do seu dispositivo e nunca são enviadas.",
      "A sincronização na nuvem vem desligada por padrão. Se você a ativar, as entradas de conhecimento ficam no nosso servidor para que seus outros dispositivos possam lê-las.",
      "As capturas de tela ficam no seu celular. O OCR roda no aparelho, e só o texto que você escolher salvar é enviado ao provedor de modelo que você configurou.",
      "Você pode excluir sua conta e todos os dados sincronizados a qualquer momento.",
    ],
    englishNote:
      "A versão completa abaixo é a tradução oficial em português da política de privacidade. Em caso de divergência com a versão em inglês, prevalece a versão em inglês.",
  },

  terms: {
    title: "Termos de Serviço",
    intro: "As regras de uso do Renota — seu conteúdo continua seu, as chaves ficam no seu dispositivo e a saída do modelo exige o seu julgamento.",
    fullPolicy: "Termos completos",
    summaryTitle: "Resumo",
    summary: [
      "Tudo o que você salva é seu. Nós apenas armazenamos e transmitimos para prestar o serviço a você.",
      "Você usa a sua própria chave de API e paga o provedor de modelo diretamente. Nós nunca vemos a sua chave.",
      "A saída de IA pode errar. O Renota é um auxílio de leitura, não aconselhamento profissional.",
      "A sincronização na nuvem é opcional; os apps funcionam sem conta.",
      "Você pode excluir sua conta e os dados sincronizados a qualquer momento.",
    ],
    englishNote:
      "A versão completa abaixo é a tradução oficial em português dos termos de serviço. Em caso de divergência com a versão em inglês, prevalece a versão em inglês.",
  },


  account: {
    title: "Conta",
    intro: "A sincronização na nuvem precisa de uma conta. Entre uma vez e a mesma base de conhecimento acompanha você no navegador, no Zotero e no celular.",
    plan: {
      label: "Plano",
      free: "Grátis — base de conhecimento local",
      pro: "Pro — sincronização na nuvem ativa",
      upgrade: "Assine para ativar a sincronização na nuvem",
      checkout: "Assinar",
      cancel: "Cancelar assinatura",
      cancelHint: "Você mantém o acesso até o fim do período que já pagou.",
      renewsOn: "Renova em",
      until: "Acesso até",
      canceledUntil: "Cancelada — acesso até",
      price: "$9.90 / mês",
      notAvailable: "A assinatura não está disponível no momento.",
      failed: "Não foi possível iniciar o checkout. Tente novamente.",
      cancelDone: "Cancelamento agendado. O acesso continua até o fim do período.",
      pricingLink: "Comparar planos",
      manageBilling: "Gerenciar cobrança",
      portalFailed: "Não foi possível abrir o portal de cobrança. Tente novamente.",
      pastDue: "O pagamento falhou — atualize seu cartão na Paddle para continuar sincronizando.",
    },
    signedOut: {
      heading: "Entre ou crie uma conta",
      google: "Continuar com o Google",
      orEmail: "ou use o seu endereço de e-mail",
      body: "Digite seu endereço de e-mail. Enviamos um link de uso único — sem senha para lembrar, e nenhuma conta existe até você clicar nele.",
      emailLabel: "Endereço de e-mail",
      placeholder: "you@example.com",
      send: "Enviar link de acesso",
      sending: "Enviando…",
      sent: "Confira sua caixa de entrada. O link expira em 15 minutos e funciona uma vez.",
    },
    signedIn: {
      heading: "Conectado",
      emailLabel: "Conta",
      clipsLabel: "Entradas de conhecimento",
      devicesLabel: "Dispositivos conectados",
      sessionsLabel: "Sessões do navegador",
      noDevices: "Nenhum cliente entrou com um token de dispositivo ainda.",
      syncEndpoint: "Endpoint de sincronização",
      signOut: "Sair",
      signOutAll: "Sair de todos os lugares",
      deleteAccount: "Excluir conta e dados",
      deleteWarning: "Isso remove todas as entradas sincronizadas, todos os dispositivos e a própria conta. Não dá para desfazer.",
      deleteConfirm: "Excluir permanentemente",
      deleting: "Excluindo…",
    },
    keys: {
      label: "Chaves de API para agentes",
      intro:
        "Deixe qualquer agente de IA — Claude Code, Cursor, DSH — buscar na sua base de conhecimento via MCP. As chaves são somente leitura: um agente pode encontrar e ler o que você salvou, nunca alterar.",
      empty: "Nenhuma chave ainda.",
      namePlaceholder: "Para que serve esta chave? ex.: Claude Code",
      create: "Criar chave",
      creating: "Criando…",
      createdHint: "Copie agora. Esta é a única vez que a chave completa é exibida.",
      copy: "Copiar",
      copied: "Copiado",
      revoke: "Revogar",
      revoking: "Revogando…",
      revokedNotice: "Chave revogada. Qualquer agente que ainda a use para de funcionar imediatamente.",
      created: "Criada",
      lastUsed: "Último uso",
      never: "Nunca usada",
      nameRequired: "Dê um nome à chave primeiro.",
      nameTaken: "Você já tem uma chave com esse nome.",
      limitReached: "Você atingiu o limite de chaves ativas. Revogue uma que não usa mais.",
      loadFailed: "Não foi possível carregar suas chaves de API.",
      createFailed: "Não foi possível criar a chave. Tente novamente.",
      requiresPro: "O acesso via MCP faz parte da sincronização na nuvem. Assine para conectar um agente.",
      mcpTitle: "Endpoint MCP",
      mcpHint: "Aponte seu agente para esta URL e envie a chave como bearer token.",
      configTitle: "Configuração do cliente",
    },
    errors: {
      rate_limited: "Muitas requisições. Espere alguns minutos e tente de novo.",
      mail_failed: "Não conseguimos enviar o e-mail. Tente de novo em instantes.",
      mail_not_configured: "O envio de e-mail não está configurado no servidor.",
      invalid_token: "Este link é inválido ou expirou. Peça um novo.",
      used_token: "Este link já foi usado. Peça um novo.",
      missing_token: "O link está sem o token. Peça um novo.",
      no_session: "Você não está conectado.",
      invalid_session: "Sua sessão expirou. Entre de novo.",
      generic: "Algo deu errado. Tente de novo.",
    },
    welcome: "Conectado. Este dispositivo agora está vinculado à sua conta.",
    backHome: "Voltar ao início",
  },

  checkout: {
    heading: "Escolha seu plano",
    lede: "Teste grátis de 3 dias. É preciso cadastrar um meio de pagamento — cobramos automaticamente quando o teste termina. Cancele quando quiser antes disso.",
    monthly: "Mensal",
    yearly: "Anual",
    perMonth: "/mês",
    perYear: "/ano",
    subscribeNow: "Assinar agora",
    startTrial: "Começar teste de 3 dias",
    billingPeriod: "Período de cobrança",
    perMonthNote:
      "Os preços não incluem impostos. A Paddle calcula os impostos aplicáveis à sua localização no checkout, e o total do checkout é o valor final.",
    localized: "Os preços são exibidos para a sua localização; o valor final é confirmado no checkout.",
    pricesFailed: "Não foi possível carregar os preços. Atualize a página e tente novamente.",
    checkoutFailed: "Não foi possível abrir o checkout. Tente novamente ou fale com o suporte.",
  },

  welcome: {
    heading: "Tudo pronto",
    lede: "Obrigado por assinar o Renota Pro. A Paddle envia o recibo por e-mail, e você pode gerenciar a assinatura a qualquer momento.",
    accountCta: "Ir para a sua conta",
    homeCta: "Voltar ao início",
    note: "Se o e-mail de confirmação não chegar em alguns minutos, verifique a pasta de spam ou escreva para support@werenota.com.",
  },
};
