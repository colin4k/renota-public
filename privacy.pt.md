# Renota — Política de Privacidade

**Última atualização:** 26/11/2026
**Data de vigência:** 26/11/2026

O Renota (“nós”, “nosso”, “os apps”) é um conjunto de apps — uma extensão para Chrome, um plugin para Zotero e um app para Android — que ajudam você a capturar o texto que lê e a usá-lo como contexto pessoal para escrita assistida por IA. Esta Política de Privacidade explica quais dados o Renota trata, como eles são usados e quais escolhas você tem.

Ao instalar ou usar o Renota, você concorda com esta Política de Privacidade. Se não concordar, pare de usar e desinstale os apps.

---

## 1. Escopo

Esta política se aplica aos três clientes do Renota — a extensão para Chrome, distribuída pela Chrome Web Store, o plugin para Zotero e o app para Android, com distribuição prevista pelo Google Play ou como download direto — junto com a infraestrutura própria com a qual eles se comunicam: especificamente o endpoint de telemetria descrito na Seção 4 e o serviço opcional de sincronização na nuvem descrito na Seção 3.1. O mesmo serviço de sincronização na nuvem é usado pelos três clientes, e esta política cobre esse serviço para todos eles.

Ela **não** se aplica a serviços de terceiros que você escolha conectar por meio do Renota (como provedores de LLM). Quando você configura um provedor de LLM, seus prompts e a resposta desse provedor são regidos pela política de privacidade do próprio provedor. A Seção 5 lista os provedores que apoiamos atualmente e traz links para as políticas deles.


**Estado de lançamento.** A extensão do Chrome já está disponível na Chrome Web Store, e o plugin do Zotero está disponível para Zotero 7 e versões posteriores. O app para Android ainda está em preparação. Esta política descreve como cada cliente trata os dados.

---

## 2. Dados que NÃO coletamos

Queremos ser claros sobre o que **não** fazemos:

- **Não** coletamos o conteúdo das páginas web que você visita.
- **Não** coletamos o texto que você seleciona, a menos que você o salve explicitamente na sua Base de Conhecimento.
- **Não** coletamos suas chaves de API de LLM. As chaves de API ficam apenas no seu navegador e são enviadas diretamente dele para o provedor de LLM que você escolher. Elas nunca passam pelos nossos servidores.
- **Não** vendemos, alugamos nem trocamos dados com terceiros para publicidade ou marketing.
- **Não** usamos seus dados para treinar nenhum modelo de IA.

---

## 3. Dados armazenados localmente no seu navegador

Os dados a seguir ficam **apenas no seu navegador** (usando `chrome.storage.local` e `IndexedDB`). Eles não são transmitidos aos nossos servidores e não temos capacidade técnica de lê-los — **a menos que você ative explicitamente a Sincronização na Nuvem**, descrita na Seção 3.1. A Sincronização na Nuvem vem desligada por padrão e exige um login explícito.

| Dado | Finalidade | Local |
|------|---------|----------|
| **Entradas da Base de Conhecimento** (“trechos”, “insights”, arquivos markdown importados) | Sua base de conhecimento pessoal, usada como contexto para a geração por IA | IndexedDB |
| **Texto selecionado que você salva** | Capturado de páginas web quando você escolhe explicitamente “Salvar no Renota” | IndexedDB |
| **Metadados da página** (URL, título, idioma) dos itens salvos | Atribuição da fonte do conhecimento salvo | IndexedDB |
| **Configurações do seu provedor de LLM** (nome do provedor, URL base, modelo) | Para sabermos qual API chamar | IndexedDB |
| **Sua chave de API de LLM** (BYOK — Bring Your Own Key) | Autenticação com o provedor de LLM que você escolheu | IndexedDB |
| **Preferências de interface** (idioma, tema, posição da barra, prompts das ações) | Personalizar a sua experiência | `chrome.storage.local` |
| **ID de instalação anônimo** (UUID v4, gerado localmente) | Usado apenas para telemetria anônima (Seção 4) | `chrome.storage.local` |

Você pode inspecionar, exportar ou excluir todos esses dados a qualquer momento. Veja a Seção 7 para instruções.

---

### 3.1 Sincronização na Nuvem (opcional, desligada por padrão)

A Sincronização na Nuvem mantém sua base de conhecimento consistente entre a extensão para Chrome, o plugin para Zotero e o app para Android. Ela é totalmente opcional: nada é enviado até você entrar com seu endereço de e-mail em um dispositivo.

**Como funciona.** Você digita seu e-mail em Configurações → Sincronização na Nuvem e recebe um código de login de 8 caracteres. A verificação do código emite um token de acesso por dispositivo (armazenado em `chrome.storage.local`). Enquanto você está conectado, os clientes chamam periodicamente nossos endpoints de sincronização (`/v1/sync/pull`, `/v1/sync/push`) para trocar entradas de conhecimento.

**O que é enviado** — apenas entradas de conhecimento (os dados listados na Seção 3 que fazem parte da sua base de conhecimento):

| Dado | Finalidade |
|------|---------|
| Conteúdo do trecho e contexto ao redor | Para que a entrada esteja disponível nos seus outros dispositivos |
| Metadados da fonte (URL, título, domínio, chaves de item/anexo do Zotero, nome do app Android) | Atribuição e navegação de volta à fonte |
| Tags, conceitos, links de derivação, idioma, carimbos de data e hora | Qualidade da busca e resolução de conflitos |
| Um hash SHA-256 do conteúdo de cada entrada | Detecção de duplicatas durante a sincronização |
| Marcadores de exclusão (“tombstones”) | Para que uma exclusão em um dispositivo se propague em vez de ressuscitar |

**O que nunca é enviado:**

- Suas chaves de API de LLM. Elas ficam em cada dispositivo (o app para Android as criptografa com o armazenamento de chaves do sistema) e vão direto para o provedor que você escolheu.
- Seu histórico de navegação, o conteúdo de páginas que você não salvou, ou qualquer coisa de outras abas ou apps.
- Capturas de tela ou imagens de OCR do app para Android — somente o texto que você salvar explicitamente.

**Onde fica armazenado.** As entradas ficam no banco de dados D1 da Cloudflare (o índice e os metadados) e no armazenamento de objetos R2 (o corpo das entradas), servidos pela rede de borda da Cloudflare. As entradas são armazenadas como texto simples no servidor, portanto isto **não** é criptografia ponta a ponta: tecnicamente, poderíamos lê-las. Não sincronize conteúdo que você não está disposto a armazenar assim. Os marcadores de exclusão são removidos após 90 dias.

**Seus controles.** Saia em qualquer dispositivo para interromper a sincronização; a cópia local permanece. Excluir uma entrada se propaga para os seus outros dispositivos. Para excluir sua conta e todos os dados na nuvem, use a ação “Excluir conta” na página de configurações da conta; ela remove apenas as entradas, os tokens de dispositivo e os registros de login dessa conta.

## 4. Telemetria anônima

O Renota inclui um recurso de telemetria anônima. Ele vem **ativado por padrão** e pode ser **desativado a qualquer momento** no painel de configurações da Extensão; depois de desativado, nada mais é enviado.

### 4.1 O que é enviado

Quando a telemetria está ativada, a Extensão envia os seguintes campos ao site de telemetria:

- `event` — uma string de um enum fixo (por exemplo, `knowledge_saved`, `ai_generation_completed`, `extension_installed`)
- `installId` — um UUID v4 gerado aleatoriamente e armazenado localmente; **não** derivado de nenhuma identidade de usuário
- `appVersion` — a versão da Extensão (por exemplo, `"1.0.0"`)
- `productStage` — uma constante de build (`"mvp0"` ou `"mvp1"`)
- `language` — o idioma da interface da Extensão (por exemplo, `"zh-CN"`)

### 4.2 O que NUNCA é enviado

- URLs de páginas, títulos de páginas ou qualquer conteúdo de página
- Texto selecionado ou conteúdo de conhecimento salvo
- Sua chave de API de LLM, nome do modelo ou respostas do LLM
- Endereço IP (os logs do servidor são retidos conforme a Seção 8)
- Qualquer identificador que possa ser ligado a uma pessoa real

### 4.3 Por que coletamos isso

A telemetria nos ajuda a entender quais recursos são usados e quais não são, para podermos priorizar melhorias. Ela não contém conteúdo e não pode ser usada para identificar você.

### 4.4 Como desativar

Você pode desativar a telemetria a qualquer momento:

1. Abra o painel lateral do Renota.
2. Vá em **Configurações → Estatísticas de uso anônimas**.
3. Desligue **Estatísticas de uso anônimas**.

Quando desativada, nenhuma requisição é enviada ao site de telemetria. Desinstalar a Extensão também interrompe toda a telemetria.


### 4.5 Análise do site

O nosso site em werenota.com utiliza o mesmo serviço de análise respeitador da privacidade para contar visualizações de página. Não define cookies, não escreve nada no seu dispositivo e não associa endereços IP aos eventos. Como não o consegue identificar e serve apenas para medir tráfego agregado, não requer um banner de consentimento. Isto é independente da telemetria descrita acima, que se aplica apenas à Extensão.
---

## 5. Serviços de terceiros que você escolhe

O Renota não inclui um modelo de IA embutido. Você fornece o seu próprio provedor de LLM e a sua chave de API (BYOK). Quando você usa um recurso de IA, seu prompt e (opcionalmente) as entradas de conhecimento recuperadas são enviados **diretamente do seu navegador** ao provedor que você configurou.

A lista atual de provedores suportados é:

| Provedor | Endpoint | Política de Privacidade |
|----------|----------|----------------|
| **OpenAI** | `https://api.openai.com/v1` | https://openai.com/policies/privacy-policy |
| **DeepSeek** | `https://api.deepseek.com` | https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html |
| **OpenRouter** | `https://openrouter.ai/api/v1` | https://openrouter.ai/privacy |

Os servidores do Renota **não** estão nesse caminho de dados. Sua chave de API, seus prompts e as respostas transitam apenas entre o seu navegador e o provedor de LLM que você selecionou.

Se você configurar uma URL base personalizada, é sua responsabilidade revisar as práticas de privacidade desse provedor.

---

## 6. Permissões explicadas

### 6.1 Extensão para Chrome

O Chrome exige que declaremos as permissões que usamos. Eis por que usamos cada uma:

| Permissão | Motivo |
|------------|--------|
| `storage` | Persistir suas configurações e sua base de conhecimento localmente |
| `sidePanel` | Abrir o espaço de trabalho do Renota no painel lateral do Chrome |
| `activeTab` | Injetar auxiliares na página que você está vendo, apenas depois que você clica na barra |
| `scripting` | Ler metadados da página quando você usa o menu de botão direito “Salvar no Renota” |
| `contextMenus` | Adicionar o item “Salvar no Renota” ao menu de botão direito do Chrome |
| `offscreen` | Rodar o worker local de indexação e busca em segundo plano |
| Permissão de host `<all_urls>` | Permitir que a barra e o menu de botão direito funcionem em todos os sites que você lê |

Nós **não** injetamos publicidade, não alteramos o conteúdo da página nem exfiltramos dados para servidores remotos além dos endpoints de terceiros listados acima.

### 6.2 App para Android

O app para Android é distribuído pelo Google Play e, separadamente, como download direto. A build do Google Play declara as seguintes permissões:

| Permissão | Motivo |
|------------|--------|
| `SYSTEM_ALERT_WINDOW` (“Exibir sobre outros apps”) | Desenhar a bolinha flutuante sobre o app que você está lendo |
| `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_MEDIA_PROJECTION` | Manter a sessão de captura ativa enquanto a bolinha flutuante está visível |
| `POST_NOTIFICATIONS` | Mostrar a notificação contínua que o Android exige para um serviço em primeiro plano |
| `INTERNET` | Enviar prompts ao provedor de modelo que você configurou |

**A build do Google Play não solicita Serviço de Acessibilidade.** A bolinha flutuante é desenhada com a permissão padrão de sobreposição do sistema, e a captura de tela usa a API `MediaProjection` do Android, que mostra um diálogo de consentimento do sistema antes da primeira captura. Nenhuma permissão de serviço de acessibilidade aparece no manifesto dessa build.

Uma build separada, distribuída apenas como download direto do nosso site e nunca publicada no Google Play, oferece uma variante baseada em Acessibilidade que captura a tela sem um diálogo de consentimento por sessão. Se você instalar essa build, será solicitado que ative o serviço você mesmo nas configurações do sistema; ele lê eventos de título de janela para atribuir um trecho ao app de origem e não inspeciona o conteúdo de outros apps.

### 6.3 Conteúdo da tela no Android

- As capturas de tela são processadas inteiramente no seu dispositivo e **nunca são enviadas aos nossos servidores**.
- O reconhecimento óptico de caracteres (OCR) roda localmente no aparelho.
- Apenas o texto que você seleciona e salva explicitamente vira uma entrada de conhecimento, e apenas esse texto entra no prompt enviado ao provedor de modelo que você configurou.
- Cancelar uma captura descarta a imagem; ela não é gravada no armazenamento.

---

## 7. Seus direitos e escolhas

### 7.1 Acesso e exportação

- Abra o painel lateral do Renota → aba **Conhecimento** → clique no ícone de exportação para baixar todas as entradas salvas como um arquivo JSON ou Markdown.

### 7.2 Exclusão

- Abra **Configurações → Dados** e clique em **“Limpar todos os dados locais”** para remover a base de conhecimento, as configurações e o ID de instalação deste navegador.
- Desinstalar a Extensão também remove todos os dados armazenados localmente.
- Se você ativou a Sincronização na Nuvem: **Configurações → Sincronização na Nuvem → Sair** interrompe a sincronização naquele dispositivo. Para remover os dados dos nossos servidores, exclua sua conta na página de configurações da conta ou fale conosco em `support@werenota.com`.
- Para solicitar a exclusão de qualquer dado de telemetria que possamos ter recebido, fale conosco em `support@werenota.com`.

### 7.3 Desativar recursos

- Desligar a telemetria: veja a Seção 4.4.
- Desligar a sincronização na nuvem: **Configurações → Sincronização na Nuvem → Sair** (ou desmarque “Ativar sincronização na nuvem”).
- Desligar o menu de botão direito: abra **Configurações → Geral**.
- Desligar a barra na página: abra **Configurações → Barra**.

### 7.4 Direitos sob o GDPR (EEE / Reino Unido)

Se você está no EEE ou no Reino Unido, você tem o direito de acessar, retificar, apagar, limitar, portar e se opor ao tratamento dos seus dados pessoais, e de apresentar reclamação à sua autoridade de controle. Nossa base legal para o tratamento limitado descrito na Seção 4 é o **consentimento**, que você pode retirar a qualquer momento.

### 7.5 Direitos sob a CCPA/CPRA (Califórnia)

Se você é residente da Califórnia, tem o direito de saber, excluir, corrigir e limitar o uso de informações pessoais sensíveis. O Renota não vende nem compartilha informações pessoais para publicidade comportamental entre contextos.

---

## 8. Retenção de dados

- **Dados locais** (IndexedDB / `chrome.storage.local`): retidos até você limpá-los ou desinstalar a Extensão.
- **Dados de sincronização na nuvem**: retidos enquanto sua conta existir. Os marcadores de exclusão são removidos após 90 dias. Excluir sua conta remove todas as entradas, os dispositivos e os registros de login.
- **Eventos de telemetria**: retidos por até **90 dias** de forma agregada e depois excluídos. Eles nunca são ligados a um indivíduo.
- **Prompts e respostas de LLM**: tratados pelo provedor de terceiros que você configurou. Consulte as políticas de retenção dele (Seção 5).

---

## 9. Segurança

Adotamos medidas razoáveis para proteger os dados limitados que tratamos:

- Todo o tráfego de rede usa HTTPS (TLS 1.2+).
- As chaves de API nunca saem do seu navegador, exceto para o endpoint de LLM que você configurou.
- A Extensão segue o princípio do menor privilégio: nenhuma permissão é solicitada sem ser necessária para um recurso documentado.
- Não operamos servidores próprios no caminho das requisições dos seus prompts ou das respostas.

Contudo, nenhum sistema é perfeitamente seguro. Se você descobrir uma vulnerabilidade, reporte em `security@werenota.com`.

---

## 10. Privacidade de crianças

O Renota não é destinado a crianças menores de 13 anos (ou menores de 16 no EEE/Reino Unido). Não coletamos intencionalmente informações pessoais de crianças. Se você acredita que uma criança instalou a Extensão, fale conosco para que possamos ajudar na remoção.

---

## 11. Usuários internacionais

O Renota é operado a partir da China. Ao usar a Extensão, você entende que quaisquer dados de telemetria que você tenha aceitado podem ser transferidos para a China e tratados lá. Contamos com salvaguardas contratuais padrão e com o seu consentimento explícito (Seção 4) para qualquer transferência desse tipo.

---

## 12. Alterações nesta Política

Podemos atualizar esta Política de Privacidade de tempos em tempos. Quando isso acontecer, nós:

- Atualizaremos a data de “Última atualização” no topo desta página.
- Para mudanças relevantes, exibiremos um aviso no app e pediremos novo consentimento quando exigido.

Versões anteriores desta política estão disponíveis sob solicitação em `support@werenota.com`.

---

## 13. Contato

Se você tiver dúvidas, reclamações ou solicitações sobre dados, fale conosco:

- **E-mail:** support@werenota.com
- **Relatos de segurança:** security@werenota.com
- **Dúvidas gerais:** support@werenota.com

Nosso objetivo é responder em até **7 dias úteis**.

---

## Apêndice A — Catálogo de eventos de telemetria

Para total transparência, aqui está a lista completa dos nomes de eventos de telemetria que podem ser enviados quando a telemetria está ativada. Nenhum deles inclui conteúdo; são apenas contadores.

- `extension_installed`
- `knowledge_saved`
- `knowledge_deleted`
- `knowledge_search`
- `ai_setup_viewed`
- `ai_setup_started`
- `ai_setup_test_success`
- `ai_setup_test_failed`
- `ai_generation_started`
- `ai_generation_completed`
- `generation_with_knowledge`
- `knowledge_clip_retrieved`
- `knowledge_loop_completed`
- `editor_write_success`
- `editor_write_fallback`
