# Renota — Política de privacidad

**Última actualización:** 17 de noviembre de 2026
**Fecha de entrada en vigor:** 17 de noviembre de 2026

Renota («nosotros», «nuestro», «las apps») es un conjunto de apps —una extensión de Chrome, un plugin de Zotero y una app para Android— que le ayudan a capturar el texto que lee y a usarlo como contexto personal para la escritura asistida por IA. Esta Política de privacidad explica qué datos trata Renota, cómo se utilizan y qué opciones tiene usted.

Al instalar o utilizar Renota, usted acepta esta Política de privacidad. Si no está de acuerdo, deje de utilizarla y desinstale las apps.

---

## 1. Ámbito de aplicación

Esta política se aplica a los tres clientes de Renota —la extensión de Chrome distribuida a través de Chrome Web Store, el plugin de Zotero y la app para Android distribuida a través de Google Play o como descarga directa—, así como a la infraestructura propia con la que se comunican: concretamente, el punto de conexión de telemetría descrito en la sección 4 y el servicio opcional de sincronización en la nube descrito en la sección 3.1. Los tres clientes utilizan el mismo servicio de sincronización en la nube, y esta política cubre dicho servicio para todos ellos.

**No** se aplica a los servicios de terceros a los que usted decida conectarse a través de Renota (como los proveedores de LLM). Cuando configura un proveedor de LLM, sus prompts y la respuesta de ese proveedor se rigen por la política de privacidad del propio proveedor. La sección 5 enumera los proveedores que admitimos actualmente e incluye enlaces a sus políticas.

---

## 2. Datos que NO recopilamos

Queremos ser claros sobre lo que **no** hacemos:

- **No** recopilamos el contenido de las páginas web que visita.
- **No** recopilamos el texto que selecciona, salvo que lo guarde explícitamente en su base de conocimiento.
- **No** recopilamos sus claves API de LLM. Las claves API solo se almacenan en su navegador y se envían directamente desde su navegador al proveedor de LLM que elija. Nunca pasan por nuestros servidores.
- **No** vendemos, alquilamos ni intercambiamos datos con terceros con fines publicitarios o de marketing.
- **No** utilizamos sus datos para entrenar ningún modelo de IA.

---

## 3. Datos almacenados localmente en su navegador

Los siguientes datos se almacenan **solo en su navegador** (mediante `chrome.storage.local` e `IndexedDB`). No se transmiten a nuestros servidores y no tenemos capacidad técnica para leerlos, **salvo que active explícitamente la sincronización en la nube**, descrita en la sección 3.1. La sincronización en la nube está desactivada por defecto y requiere un inicio de sesión explícito.

| Datos | Finalidad | Ubicación |
|------|---------|----------|
| **Entradas de la base de conocimiento** («fragmentos», «conclusiones», archivos markdown importados) | Su biblioteca personal de conocimiento, utilizada como contexto para la generación con IA | IndexedDB |
| **Texto seleccionado que guarda** | Capturado de páginas web cuando elige explícitamente «Guardar en Renota» | IndexedDB |
| **Metadatos de página** (URL, título, idioma) de los elementos guardados | Atribución de la fuente del conocimiento guardado | IndexedDB |
| **Sus ajustes del proveedor de LLM** (nombre del proveedor, URL base, modelo) | Para saber qué API llamar | IndexedDB |
| **Su clave API del LLM** (BYOK — clave propia) | Autenticación con el proveedor de LLM que elija | IndexedDB |
| **Preferencias de la interfaz** (idioma, tema, posición de la barra, prompts de acción) | Personalizar su experiencia | `chrome.storage.local` |
| **ID de instalación anónimo** (UUID v4, generado localmente) | Se usa solo para la telemetría anónima (sección 4) | `chrome.storage.local` |

Puede inspeccionar, exportar o eliminar todos estos datos en cualquier momento. Consulte la sección 7 para ver las instrucciones.

---

### 3.1 Sincronización en la nube (opcional, desactivada por defecto)

La sincronización en la nube mantiene su base de conocimiento coherente entre la extensión de Chrome, el plugin de Zotero y la app para Android. Es totalmente opcional: no se sube nada hasta que inicie sesión con su dirección de correo en un dispositivo.

**Cómo funciona.** Introduce su correo en Ajustes → Sincronización en la nube y recibe un código de acceso de 8 caracteres. Al verificar el código se emite un token de acceso por dispositivo (almacenado en `chrome.storage.local`). Mientras la sesión está iniciada, los clientes llaman periódicamente a nuestros puntos de conexión de sincronización (`/v1/sync/pull`, `/v1/sync/push`) para intercambiar entradas de conocimiento.

**Qué se sube**: solo entradas de conocimiento (los datos enumerados en la sección 3 que forman parte de su base de conocimiento):

| Datos | Finalidad |
|------|---------|
| Contenido del fragmento y contexto circundante | Para que la entrada esté disponible en sus otros dispositivos |
| Metadatos de origen (URL, título, dominio, claves de elemento y adjunto de Zotero, nombre de la app de Android) | Atribución y navegación de vuelta al origen |
| Etiquetas, conceptos, enlaces de derivación, idioma, marcas de tiempo | Calidad de la búsqueda y resolución de conflictos |
| Un hash SHA-256 del contenido de cada entrada | Detección de duplicados durante la sincronización |
| Marcadores de eliminación («tombstones») | Para que una eliminación en un dispositivo se propague en lugar de resucitar |

**Qué no se sube nunca:**

- Sus claves API de LLM. Permanecen en cada dispositivo (la app para Android las cifra con el almacén de claves del sistema) y van directamente al proveedor que elija.
- Su historial de navegación, el contenido de páginas que no guardó ni nada procedente de otras pestañas o apps.
- Las capturas de pantalla o imágenes de OCR de la app para Android: solo el texto que guarde explícitamente.

**Dónde se almacena.** Las entradas residen en la base de datos D1 de Cloudflare (el índice y los metadatos) y en el almacenamiento de objetos R2 (el cuerpo de las entradas), servidos a través de la red perimetral de Cloudflare. Las entradas se almacenan como texto plano en el servidor, por lo que **no** están cifradas de extremo a extremo: técnicamente podríamos leerlas. No sincronice contenido que no esté dispuesto a almacenar de ese modo. Los marcadores de eliminación se purgan a los 90 días.

**Sus controles.** Cierre sesión en cualquier dispositivo para dejar de sincronizar; la copia local permanece. Al eliminar una entrada, el cambio se propaga a sus otros dispositivos. Para eliminar su cuenta y todos los datos en la nube, use la acción «Eliminar cuenta» en la página de ajustes de la cuenta; solo elimina las entradas, los tokens de dispositivo y los registros de acceso de esa cuenta.

## 4. Telemetría anónima

Renota incluye una función de telemetría anónima **opcional**. La telemetría está **desactivada por defecto** y solo se envía después de que usted dé su consentimiento en el panel de ajustes de la extensión.

### 4.1 Qué se envía

Cuando la telemetría está activada, la extensión envía los siguientes campos al sitio de telemetría:

- `event` — una cadena de una enumeración fija (p. ej., `knowledge_saved`, `ai_generation_completed`, `extension_installed`)
- `installId` — un UUID v4 generado aleatoriamente y almacenado localmente; **no** se deriva de ninguna identidad de usuario
- `appVersion` — la versión de la extensión (p. ej., `"1.0.0"`)
- `productStage` — una constante definida en tiempo de compilación (`"mvp0"` o `"mvp1"`)
- `language` — el idioma de la interfaz de la Extensión (p. ej., `"zh-CN"`)

### 4.2 Qué NO se envía NUNCA

- URL de las páginas, títulos de página o cualquier contenido de página
- Texto seleccionado o contenido de conocimiento guardado
- Su clave API de LLM, el nombre del modelo o las respuestas del LLM
- La dirección IP (los registros del servidor se conservan según la sección 8)
- Cualquier identificador que pueda vincularse a una persona real

### 4.3 Por qué recopilamos esto

La telemetría nos ayuda a saber qué funciones se usan y cuáles no, para poder priorizar mejoras. No contiene contenido y no sirve para identificarle.

### 4.4 Cómo darse de baja

Puede desactivar la telemetría en cualquier momento:

1. Abra el panel lateral de Renota.
2. Vaya a **Ajustes → Privacidad**.
3. Desactive **«Compartir datos de uso anónimos»**.

Cuando está desactivada, no se envía ninguna solicitud al sitio de telemetría. Desinstalar la extensión también detiene toda la telemetría.


### 4.5 Analítica del sitio web

Nuestro sitio web en werenota.com utiliza el mismo servicio de analítica respetuoso con la privacidad para contar las visitas a las páginas. No establece cookies, no escribe nada en su dispositivo y no registra direcciones IP junto con los eventos. Como no puede identificarle y solo se usa para medir el tráfico agregado, no requiere un banner de consentimiento. Esto es independiente de la telemetría opcional descrita arriba, que se aplica únicamente a la Extensión.
---

## 5. Servicios de terceros que usted elige

Renota no incluye un modelo de IA integrado. Usted aporta su propio proveedor de LLM y su clave API (BYOK). Cuando utiliza una función de IA, su prompt y (opcionalmente) las entradas de conocimiento recuperadas se envían **directamente desde su navegador** al proveedor que haya configurado.

La lista actual de proveedores admitidos es:

| Proveedor | Punto de conexión | Política de privacidad |
|----------|----------|----------------|
| **OpenAI** | `https://api.openai.com/v1` | https://openai.com/policies/privacy-policy |
| **DeepSeek** | `https://api.deepseek.com` | https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html |
| **OpenRouter** | `https://openrouter.ai/api/v1` | https://openrouter.ai/privacy |

Los servidores de Renota **no** forman parte de ese flujo de datos. Su clave API, sus prompts y las respuestas circulan solo entre su navegador y el proveedor de LLM que haya elegido.

Si configura una URL base personalizada, es responsabilidad suya revisar las prácticas de privacidad de ese proveedor.

---

## 6. Explicación de los permisos

### 6.1 Extensión de Chrome

Chrome nos obliga a declarar los permisos que utilizamos. Este es el motivo de cada uno:

| Permiso | Motivo |
|------------|--------|
| `storage` | Guardar sus ajustes y su base de conocimiento localmente |
| `sidePanel` | Abrir el espacio de trabajo de Renota en el panel lateral de Chrome |
| `activeTab` | Inyectar asistentes en la página que está viendo, solo después de que haga clic en la barra |
| `scripting` | Leer los metadatos de la página cuando usa el menú «Guardar en Renota» del botón derecho |
| `contextMenus` | Añadir el elemento «Guardar en Renota» al menú contextual de Chrome |
| `offscreen` | Ejecutar en segundo plano el trabajador local de indexación y recuperación |
| Permiso de host `<all_urls>` | Permitir que la barra y el menú contextual funcionen en todos los sitios que lee |

**No** inyectamos publicidad, no modificamos el contenido de las páginas ni exfiltramos datos a servidores remotos más allá de los puntos de conexión de terceros enumerados arriba.

### 6.2 App para Android

La app para Android se distribuye a través de Google Play y, por separado, como descarga directa. La compilación de Google Play declara los siguientes permisos:

| Permiso | Motivo |
|------------|--------|
| `SYSTEM_ALERT_WINDOW` («Mostrar sobre otras apps») | Dibujar la bola flotante encima de la app que está leyendo |
| `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_MEDIA_PROJECTION` | Mantener viva la sesión de captura mientras la bola flotante está visible |
| `POST_NOTIFICATIONS` | Mostrar la notificación permanente que Android exige para un servicio en primer plano |
| `INTERNET` | Enviar prompts al proveedor de modelo que haya configurado |

**La compilación de Google Play no solicita un servicio de accesibilidad.** La bola flotante se dibuja con el permiso estándar de superposición del sistema, y la captura de pantalla usa la API `MediaProjection` de Android, que muestra un diálogo de consentimiento del sistema antes de la primera captura. En el manifiesto de esa compilación no aparece ningún permiso de servicio de accesibilidad.

Una compilación independiente, distribuida solo como descarga directa desde nuestro sitio web y nunca publicada en Google Play, ofrece una variante basada en accesibilidad que captura la pantalla sin un diálogo de consentimiento por sesión. Si instala esa compilación, se le pedirá que active el servicio usted mismo en los ajustes del sistema; lee eventos de título de ventana para atribuir un fragmento a la app de la que proviene y no inspecciona el contenido de otras apps.

### 6.3 Contenido de pantalla en Android

- Las capturas de pantalla se procesan íntegramente en su dispositivo y **nunca se suben a nuestros servidores**.
- El reconocimiento óptico de caracteres (OCR) se ejecuta localmente en el teléfono.
- Solo el texto que selecciona y guarda explícitamente se convierte en una entrada de conocimiento, y solo ese texto se incluye en el prompt enviado al proveedor de modelo que haya configurado.
- Cancelar una captura descarta la captura de pantalla; no se escribe en el almacenamiento.

---

## 7. Sus derechos y opciones

### 7.1 Acceso y exportación

- Abra el panel lateral de Renota → pestaña **Conocimiento** → haga clic en el icono de exportación para descargar todas las entradas guardadas como archivo JSON o Markdown.

### 7.2 Eliminación

- Abra **Ajustes → Datos** y haga clic en **«Borrar todos los datos locales»** para eliminar la base de conocimiento, los ajustes y el ID de instalación de este navegador.
- Desinstalar la extensión también elimina todos los datos almacenados localmente.
- Si activó la sincronización en la nube: **Ajustes → Sincronización en la nube → Cerrar sesión** detiene la sincronización en ese dispositivo. Para eliminar los datos de nuestros servidores, elimine su cuenta en la página de ajustes de la cuenta o escríbanos a `support@werenota.com`.
- Para solicitar la eliminación de los datos de telemetría que hayamos podido recibir, escríbanos a `support@werenota.com`.

### 7.3 Desactivar funciones

- Desactivar la telemetría: consulte la sección 4.4.
- Desactivar la sincronización en la nube: **Ajustes → Sincronización en la nube → Cerrar sesión** (o desmarque «Activar la sincronización en la nube»).
- Desactivar el menú contextual: abra **Ajustes → General**.
- Desactivar la barra en la página: abra **Ajustes → Barra**.

### 7.4 Derechos según el RGPD (EEE / Reino Unido)

Si se encuentra en el EEE o en el Reino Unido, tiene derecho a acceder a sus datos personales, rectificarlos, suprimirlos, limitar su tratamiento, portarlos y oponerse a él, así como a presentar una reclamación ante su autoridad de control. Nuestra base jurídica para el tratamiento limitado descrito en la sección 4 es el **consentimiento**, que puede retirar en cualquier momento.

### 7.5 Derechos según la CCPA/CPRA (California)

Si reside en California, tiene derecho a saber, eliminar, corregir y limitar el uso de la información personal sensible. Renota no vende ni comparte información personal para publicidad conductual entre contextos.

---

## 8. Conservación de datos

- **Datos locales** (IndexedDB / `chrome.storage.local`): se conservan hasta que los borre o desinstale la extensión.
- **Datos de sincronización en la nube**: se conservan mientras exista su cuenta. Los marcadores de eliminación se purgan a los 90 días. Eliminar su cuenta suprime todas las entradas, los dispositivos y los registros de acceso.
- **Eventos de telemetría**: se conservan hasta **90 días** en forma agregada y después se eliminan. Nunca se vinculan a una persona concreta.
- **Prompts y respuestas del LLM**: los gestiona el proveedor de terceros que haya configurado. Consulte sus políticas de conservación (sección 5).

---

## 9. Seguridad

Adoptamos medidas razonables para proteger los limitados datos que tratamos:

- Todo el tráfico de red usa HTTPS (TLS 1.2+).
- Las claves API nunca salen de su navegador, salvo hacia el punto de conexión del LLM que haya configurado.
- La extensión sigue el principio de mínimo privilegio: no se solicita ningún permiso que no sea necesario para una función documentada.
- No operamos servidores propios en la ruta de solicitud de sus prompts o respuestas.

No obstante, ningún sistema es perfectamente seguro. Si descubre una vulnerabilidad, comuníquela a `security@werenota.com`.

---

## 10. Privacidad de los menores

Renota no está dirigido a menores de 13 años (ni de 16 en el EEE/Reino Unido). No recopilamos a sabiendas información personal de menores. Si cree que un menor ha instalado la extensión, póngase en contacto con nosotros para que podamos ayudarle a eliminarla.

---

## 11. Usuarios internacionales

Renota se opera desde China. Al utilizar la extensión, usted entiende que los datos de telemetría a los que haya dado su consentimiento pueden transferirse a China y tratarse allí. Para cualquier transferencia de este tipo nos basamos en garantías contractuales estándar y en su consentimiento explícito (sección 4).

---

## 12. Cambios en esta política

Podemos actualizar esta Política de privacidad de vez en cuando. Cuando lo hagamos:

- Actualizaremos la fecha de «Última actualización» en la parte superior de esta página.
- En caso de cambios importantes, mostraremos un aviso en las apps y solicitaremos un consentimiento renovado cuando sea necesario.

Las versiones anteriores de esta política están disponibles bajo petición en `support@werenota.com`.

---

## 13. Contacto

Si tiene preguntas, reclamaciones o solicitudes relacionadas con sus datos, póngase en contacto con nosotros:

- **Correo electrónico:** support@werenota.com
- **Informes de seguridad:** security@werenota.com
- **Consultas generales:** support@werenota.com

Nuestro objetivo es responder en un plazo de **7 días hábiles**.

---

## Apéndice A — Catálogo de eventos de telemetría

Para total transparencia, aquí está la lista completa de nombres de eventos de telemetría que pueden enviarse cuando la telemetría está activada. Ninguno incluye contenido; son meros contadores.

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
