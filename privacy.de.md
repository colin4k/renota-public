# Renota — Datenschutzerklärung

**Zuletzt aktualisiert:** 17. November 2026
**Inkrafttreten:** 17. November 2026

Renota („wir“, „unser“, „die Apps“) ist eine Reihe von Apps — eine Chrome-Erweiterung, ein Zotero-Plugin und eine Android-App —, die Ihnen helfen, gelesenen Text zu erfassen und ihn als persönlichen Kontext für KI-gestütztes Schreiben zu nutzen. Diese Datenschutzerklärung erläutert, welche Daten Renota verarbeitet, wie sie verwendet werden und welche Wahlmöglichkeiten Sie haben.

Durch die Installation oder Nutzung von Renota stimmen Sie dieser Datenschutzerklärung zu. Wenn Sie nicht einverstanden sind, beenden Sie bitte die Nutzung und deinstallieren Sie die Apps.

---

## 1. Geltungsbereich

Diese Erklärung gilt für alle drei Renota-Clients — die über den Chrome Web Store vertriebene Chrome-Erweiterung, das Zotero-Plugin und die Android-App, die über Google Play oder als Direktdownload vertrieben wird — zusammen mit der Infrastruktur aus eigener Hand, mit der sie kommunizieren: konkret dem in Abschnitt 4 beschriebenen Telemetrie-Endpunkt und dem optionalen Cloud-Synchronisierungsdienst aus Abschnitt 3.1. Derselbe Cloud-Synchronisierungsdienst wird von allen drei Clients genutzt, und diese Erklärung deckt diesen Dienst für alle von ihnen ab.

Sie gilt **nicht** für Dienste Dritter, mit denen Sie sich über Renota verbinden (etwa LLM-Anbieter). Wenn Sie einen LLM-Anbieter konfigurieren, gelten für Ihre Prompts und die Antwort dieses Anbieters dessen eigene Datenschutzbestimmungen. Abschnitt 5 listet die derzeit unterstützten Anbieter auf und verlinkt auf deren Bestimmungen.

---

## 2. Daten, die wir NICHT erheben

Wir möchten klarstellen, was wir **nicht** tun:

- Wir erheben **nicht** die Inhalte der von Ihnen besuchten Webseiten.
- Wir erheben **nicht** den von Ihnen markierten Text, es sei denn, Sie speichern ihn ausdrücklich in Ihrer Wissensdatenbank.
- Wir erheben **nicht** Ihre LLM-API-Schlüssel. API-Schlüssel werden nur in Ihrem Browser gespeichert und direkt von Ihrem Browser an den von Ihnen gewählten LLM-Anbieter gesendet. Sie passieren nie unsere Server.
- Wir verkaufen, vermieten oder tauschen **keine** Daten mit Dritten zu Werbe- oder Marketingzwecken.
- Wir nutzen Ihre Daten **nicht**, um ein KI-Modell zu trainieren.

---

## 3. Daten, die lokal in Ihrem Browser gespeichert werden

Die folgenden Daten werden **ausschließlich in Ihrem Browser** gespeichert (`chrome.storage.local` und `IndexedDB`). Sie werden nicht an unsere Server übertragen, und wir haben keine technische Möglichkeit, sie zu lesen — **es sei denn, Sie aktivieren ausdrücklich die Cloud-Synchronisierung** (Abschnitt 3.1). Die Cloud-Synchronisierung ist standardmäßig aus und erfordert eine ausdrückliche Anmeldung.

| Daten | Zweck | Speicherort |
|------|---------|----------|
| **Einträge der Wissensdatenbank** („Clips“, „Erkenntnisse“, importierte Markdown-Dateien) | Ihre persönliche Wissensbibliothek, genutzt als Kontext für die KI-Generierung | IndexedDB |
| **Von Ihnen gespeicherter markierter Text** | Von Webseiten erfasst, wenn Sie ausdrücklich „In Renota speichern“ wählen | IndexedDB |
| **Seiten-Metadaten** (URL, Titel, Sprache) gespeicherter Elemente | Quellenangabe für gespeichertes Wissen | IndexedDB |
| **Ihre LLM-Anbietereinstellungen** (Anbietername, Basis-URL, Modell) | Damit wir wissen, welche API aufzurufen ist | IndexedDB |
| **Ihr LLM-API-Schlüssel** (BYOK — Bring Your Own Key) | Authentifizierung bei Ihrem gewählten LLM-Anbieter | IndexedDB |
| **Oberflächen-Einstellungen** (Sprache, Design, Position der Symbolleiste, Aktions-Prompts) | Personalisierung Ihrer Nutzung | `chrome.storage.local` |
| **Anonyme Installations-ID** (UUID v4, lokal erzeugt) | Nur für anonyme Telemetrie (Abschnitt 4) | `chrome.storage.local` |

Sie können all diese Daten jederzeit einsehen, exportieren oder löschen. Anleitungen finden Sie in Abschnitt 7.

---

### 3.1 Cloud-Synchronisierung (optional, standardmäßig aus)

Die Cloud-Synchronisierung hält Ihre Wissensdatenbank über die Chrome-Erweiterung, das Zotero-Plugin und die Android-App hinweg konsistent. Sie ist vollständig optional: Nichts wird hochgeladen, bevor Sie sich auf einem Gerät mit Ihrer E-Mail-Adresse anmelden.

**So funktioniert es.** Sie geben Ihre E-Mail unter Einstellungen → Cloud-Synchronisierung ein und erhalten einen 8-stelligen Anmeldecode. Die Bestätigung des Codes stellt ein gerätebezogenes Zugriffstoken aus (gespeichert in `chrome.storage.local`). Während der Anmeldung rufen die Clients regelmäßig unsere Synchronisierungs-Endpunkte (`/v1/sync/pull`, `/v1/sync/push`) auf, um Wissenseinträge auszutauschen.

**Was hochgeladen wird** — ausschließlich Wissenseinträge (die in Abschnitt 3 aufgeführten Daten, die Teil Ihrer Wissensdatenbank sind):

| Daten | Zweck |
|------|---------|
| Inhalt des Clips und umgebender Kontext | Damit der Eintrag auf Ihren anderen Geräten verfügbar ist |
| Quell-Metadaten (URL, Titel, Domain, Zotero-Item-/Attachment-Keys, Android-App-Name) | Zuordnung und Navigation zurück zur Quelle |
| Schlagwörter, Konzepte, derived-from-Verweise, Sprache, Zeitstempel | Suchqualität und Konfliktlösung |
| Ein SHA-256-Hash des Inhalts jedes Eintrags | Duplikaterkennung während der Synchronisierung |
| Löschmarkierungen („Tombstones“) | Damit eine Löschung auf einem Gerät weitergegeben wird, statt den Eintrag wiederauferstehen zu lassen |

**Was nie hochgeladen wird:**

- Ihre LLM-API-Schlüssel. Sie bleiben auf jedem Gerät (die Android-App verschlüsselt sie mit dem System-Keystore) und gehen direkt an Ihren gewählten Anbieter.
- Ihr Browserverlauf, Seiteninhalte, die Sie nicht gespeichert haben, oder irgendetwas aus anderen Tabs oder Apps.
- Screenshots oder OCR-Bilder aus der Android-App — nur der Text, den Sie ausdrücklich speichern.

**Wo es gespeichert wird.** Die Einträge liegen in der D1-Datenbank von Cloudflare (Index und Metadaten) und im R2-Objektspeicher (Eintragstexte), ausgeliefert über das Edge-Netz von Cloudflare. Einträge werden auf dem Server als Klartext gespeichert; das ist also **nicht** Ende-zu-Ende-verschlüsselt: Technisch könnten wir sie lesen. Synchronisieren Sie keine Inhalte, die Sie so nicht gespeichert haben möchten. Löschmarkierungen werden nach 90 Tagen entfernt.

**Ihre Kontrollmöglichkeiten.** Melden Sie sich auf einem beliebigen Gerät ab, um die Synchronisierung zu stoppen; die lokale Kopie bleibt. Das Löschen eines Eintrags wird an Ihre anderen Geräte weitergegeben. Um Ihr Konto und alle Cloud-Daten zu löschen, verwenden Sie die Aktion „Konto löschen“ auf der Seite mit den Kontoeinstellungen; sie entfernt nur die Einträge, Geräte-Token und Anmeldedatensätze dieses Kontos.

## 4. Anonyme Telemetrie

Renota enthält eine anonyme Telemetriefunktion. Sie ist **standardmäßig aktiviert** und lässt sich **jederzeit im Einstellungsfenster der Erweiterung deaktivieren**; nach dem Deaktivieren werden keine Daten mehr gesendet.

### 4.1 Was gesendet wird

Bei aktivierter Telemetrie sendet die Erweiterung die folgenden Felder an die Telemetrie-Seite:

- `event` — eine Zeichenkette aus einem festen Enum (z. B. `knowledge_saved`, `ai_generation_completed`, `extension_installed`)
- `installId` — eine zufällig erzeugte, lokal gespeicherte UUID v4; **nicht** aus einer Nutzeridentität abgeleitet
- `appVersion` — die Version der Erweiterung (z. B. `"1.0.0"`)
- `productStage` — eine zur Build-Zeit festgelegte Konstante (`"mvp0"` oder `"mvp1"`)
- `language` — die UI-Sprache der Erweiterung (z. B. `"zh-CN"`)

### 4.2 Was NIE gesendet wird

- Seiten-URLs, Seitentitel oder jegliche Seiteninhalte
- Markierter Text oder gespeicherte Wissensinhalte
- Ihr LLM-API-Schlüssel, Modellname oder LLM-Antworten
- IP-Adresse (Server-Logs werden gemäß Abschnitt 8 aufbewahrt)
- Jede Kennung, die sich mit einer realen Person verknüpfen lässt

### 4.3 Warum wir das erheben

Telemetrie hilft uns zu verstehen, welche Funktionen genutzt werden und welche nicht, damit wir Verbesserungen priorisieren können. Sie enthält keine Inhalte und lässt sich nicht zur Identifikation Ihrer Person verwenden.

### 4.4 Wie Sie widersprechen

Sie können die Telemetrie jederzeit deaktivieren:

1. Öffnen Sie das Renota-Seitenpanel.
2. Gehen Sie zu **Einstellungen → Anonyme Nutzungsstatistik**.
3. Schalten Sie **Anonyme Nutzungsstatistik** aus.

Wenn sie deaktiviert ist, werden keine Anfragen an die Telemetrie-Seite gesendet. Die Deinstallation der Erweiterung beendet ebenfalls jede Telemetrie.


### 4.5 Website-Analyse

Unsere Website unter werenota.com verwendet denselben datenschutzfreundlichen Analysedienst, um Seitenaufrufe zu zählen. Er setzt keine Cookies, schreibt nichts auf Ihr Gerät und speichert keine IP-Adresse zusammen mit Ereignissen. Da er Sie nicht identifizieren kann und nur zur Messung aggregierter Zugriffe dient, ist kein Cookie-Banner erforderlich. Dies ist unabhängig von der oben beschriebenen Telemetrie, die nur die Erweiterung betrifft.
---

## 5. Dienste Dritter, die Sie wählen

Renota enthält kein eingebautes KI-Modell. Sie stellen Ihren eigenen LLM-Anbieter und API-Schlüssel bereit (BYOK). Wenn Sie eine KI-Funktion nutzen, werden Ihr Prompt und (optional) gefundene Wissenseinträge **direkt aus Ihrem Browser** an den von Ihnen konfigurierten Anbieter gesendet.

Die aktuelle Liste der unterstützten Anbieter:

| Anbieter | Endpunkt | Datenschutzbestimmungen |
|----------|----------|----------------|
| **OpenAI** | `https://api.openai.com/v1` | https://openai.com/policies/privacy-policy |
| **DeepSeek** | `https://api.deepseek.com` | https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html |
| **OpenRouter** | `https://openrouter.ai/api/v1` | https://openrouter.ai/privacy |

Renotas Server sind **nicht** Teil dieses Datenpfads. Ihr API-Schlüssel, Ihre Prompts und die Antworten fließen ausschließlich zwischen Ihrem Browser und dem von Ihnen gewählten LLM-Anbieter.

Wenn Sie eine eigene Basis-URL konfigurieren, sind Sie dafür verantwortlich, die Datenschutzpraktiken dieses Anbieters zu prüfen.

---

## 6. Erläuterung der Berechtigungen

### 6.1 Chrome-Erweiterung

Chrome verlangt, dass wir die verwendeten Berechtigungen deklarieren. Hier ist, wofür wir jede einzelne brauchen:

| Berechtigung | Grund |
|------------|--------|
| `storage` | Ihre Einstellungen und die Wissensdatenbank lokal dauerhaft speichern |
| `sidePanel` | Den Renota-Arbeitsbereich im Seitenpanel von Chrome öffnen |
| `activeTab` | Hilfsfunktionen in die aktuell angezeigte Seite einfügen, erst nachdem Sie die Symbolleiste anklicken |
| `scripting` | Seiten-Metadaten lesen, wenn Sie das Kontextmenü „In Renota speichern“ verwenden |
| `contextMenus` | Den Eintrag „In Renota speichern“ ins Kontextmenü von Chrome aufnehmen |
| `offscreen` | Den lokalen Indexierungs- und Abruf-Worker im Hintergrund ausführen |
| `<all_urls>` Host-Berechtigung | Symbolleiste und Kontextmenü auf jeder von Ihnen gelesenen Website nutzbar machen |

Wir fügen **keine** Werbung ein, verändern keine Seiteninhalte und schleusen keine Daten an Remote-Server außer an die oben genannten Endpunkte Dritter.

### 6.2 Android-App

Die Android-App wird über Google Play und davon getrennt als Direktdownload vertrieben. Der Google-Play-Build deklariert die folgenden Berechtigungen:

| Berechtigung | Grund |
|------------|--------|
| `SYSTEM_ALERT_WINDOW` („Über anderen Apps anzeigen“) | Die schwebende Kugel über der von Ihnen gelesenen App zeichnen |
| `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_MEDIA_PROJECTION` | Die Aufnahmesitzung am Leben halten, solange die schwebende Kugel sichtbar ist |
| `POST_NOTIFICATIONS` | Die laufende Benachrichtigung anzeigen, die Android für einen Vordergrunddienst verlangt |
| `INTERNET` | Prompts an den von Ihnen konfigurierten Modellanbieter senden |

**Der Google-Play-Build fordert keinen Bedienungshilfe-Dienst an.** Die schwebende Kugel wird mit der standardmäßigen System-Overlay-Berechtigung gezeichnet, und die Bildschirmaufnahme nutzt Androids `MediaProjection`-API, die vor der ersten Aufnahme einen System-Zustimmungsdialog zeigt. Im Manifest dieses Builds erscheint keine Berechtigung für einen Bedienungshilfe-Dienst.

Ein separater Build, der ausschließlich als Direktdownload von unserer Website vertrieben und nie auf Google Play veröffentlicht wird, bietet eine Variante auf Basis der Bedienungshilfen, die den Bildschirm ohne Zustimmungsdialog pro Sitzung aufnimmt. Wenn Sie diesen Build installieren, werden Sie gebeten, den Dienst selbst in den Systemeinstellungen zu aktivieren; er liest Ereignisse zum Fenstertitel, um einen Clip der App zuzuordnen, aus der er stammt, und prüft keine Inhalte anderer Apps.

### 6.3 Bildschirminhalte auf Android

- Screenshots werden vollständig auf Ihrem Gerät verarbeitet und **nie auf unsere Server hochgeladen**.
- Die optische Zeichenerkennung (OCR) läuft lokal auf dem Telefon.
- Nur der Text, den Sie ausdrücklich markieren und speichern, wird ein Wissenseintrag, und nur dieser Text ist in einem Prompt an den von Ihnen konfigurierten Modellanbieter enthalten.
- Das Abbrechen einer Aufnahme verwirft den Screenshot; er wird nicht in den Speicher geschrieben.

---

## 7. Ihre Rechte und Wahlmöglichkeiten

### 7.1 Zugriff und Export

- Öffnen Sie das Renota-Seitenpanel → Tab **Wissen** → klicken Sie auf das Export-Symbol, um alle gespeicherten Einträge als JSON- oder Markdown-Datei herunterzuladen.

### 7.2 Löschen

- Öffnen Sie **Einstellungen → Daten** und klicken Sie auf **„Alle lokalen Daten löschen“**, um Wissensdatenbank, Einstellungen und Installations-ID aus diesem Browser zu entfernen.
- Die Deinstallation der Erweiterung entfernt ebenfalls alle lokal gespeicherten Daten.
- Wenn Sie die Cloud-Synchronisierung aktiviert haben: **Einstellungen → Cloud-Synchronisierung → Abmelden** stoppt die Synchronisierung auf diesem Gerät. Um die Daten von unseren Servern zu entfernen, löschen Sie Ihr Konto auf der Seite mit den Kontoeinstellungen oder kontaktieren Sie uns unter `support@werenota.com`.
- Um die Löschung etwaiger Telemetriedaten zu verlangen, die wir erhalten haben, kontaktieren Sie uns unter `support@werenota.com`.

### 7.3 Funktionen abschalten

- Telemetrie abschalten: siehe Abschnitt 4.4.
- Cloud-Synchronisierung abschalten: **Einstellungen → Cloud-Synchronisierung → Abmelden** (oder „Cloud-Synchronisierung aktivieren“ deaktivieren).
- Kontextmenü abschalten: **Einstellungen → Allgemein** öffnen.
- Symbolleiste in der Seite abschalten: **Einstellungen → Symbolleiste** öffnen.

### 7.4 Rechte nach der DSGVO (EWR / UK)

Wenn Sie sich im EWR oder im UK befinden, haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten sowie das Recht, sich bei Ihrer Aufsichtsbehörde zu beschweren. Unsere Rechtsgrundlage für die in Abschnitt 4 beschriebene begrenzte Verarbeitung ist die **Einwilligung**, die Sie jederzeit widerrufen können.

### 7.5 Rechte nach CCPA/CPRA (Kalifornien)

Wenn Sie in Kalifornien ansässig sind, haben Sie das Recht zu erfahren, zu löschen, zu berichtigen und die Nutzung sensibler personenbezogener Informationen einzuschränken. Renota verkauft keine personenbezogenen Informationen und gibt sie nicht für kontextübergreifende verhaltensbezogene Werbung weiter.

---

## 8. Aufbewahrung von Daten

- **Lokale Daten** (IndexedDB / `chrome.storage.local`): aufbewahrt, bis Sie sie löschen oder die Erweiterung deinstallieren.
- **Cloud-Synchronisierungsdaten**: aufbewahrt, solange Ihr Konto besteht. Löschmarkierungen werden nach 90 Tagen entfernt. Das Löschen Ihres Kontos entfernt alle Einträge, Geräte und Anmeldedatensätze.
- **Telemetrie-Ereignisse**: bis zu **90 Tage** in aggregierter Form aufbewahrt, danach gelöscht. Sie werden nie mit einer Einzelperson verknüpft.
- **LLM-Prompts und -Antworten**: vom von Ihnen konfigurierten Drittanbieter verarbeitet. Bitte beachten Sie dessen Aufbewahrungsrichtlinien (Abschnitt 5).

---

## 9. Sicherheit

Wir treffen angemessene Maßnahmen, um die begrenzten Daten zu schützen, die wir verarbeiten:

- Der gesamte Netzwerkverkehr nutzt HTTPS (TLS 1.2+).
- API-Schlüssel verlassen Ihren Browser nur zum von Ihnen konfigurierten LLM-Endpunkt.
- Die Erweiterung folgt dem Prinzip der minimalen Rechte: Keine Berechtigung wird angefordert, wenn sie nicht für eine dokumentierte Funktion erforderlich ist.
- Wir betreiben keine eigenen Server im Anfragepfad Ihrer Prompts oder Antworten.

Dennoch ist kein System vollständig sicher. Wenn Sie eine Schwachstelle entdecken, melden Sie sie bitte an `security@werenota.com`.

---

## 10. Datenschutz für Kinder

Renota richtet sich nicht an Kinder unter 13 Jahren (im EWR/UK unter 16 Jahren). Wir erheben wissentlich keine personenbezogenen Daten von Kindern. Wenn Sie glauben, dass ein Kind die Erweiterung installiert hat, kontaktieren Sie uns bitte, damit wir bei der Entfernung helfen können.

---

## 11. Internationale Nutzer

Renota wird von China aus betrieben. Durch die Nutzung der Erweiterung verstehen Sie, dass alle Telemetriedaten, in die Sie eingewilligt haben, nach China übertragen und dort verarbeitet werden können. Für solche Übermittlungen stützen wir uns auf Standardvertragsklauseln und Ihre ausdrückliche Einwilligung (Abschnitt 4).

---

## 12. Änderungen dieser Erklärung

Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. In diesem Fall:

- Aktualisieren wir das Datum „Zuletzt aktualisiert“ oben auf dieser Seite.
- Zeigen wir bei wesentlichen Änderungen einen Hinweis in der App an und holen, soweit erforderlich, eine erneute Einwilligung ein.

Frühere Versionen dieser Erklärung sind auf Anfrage unter `support@werenota.com` erhältlich.

---

## 13. Kontakt

Bei Fragen, Beschwerden oder Datenanfragen kontaktieren Sie uns bitte:

- **E-Mail:** support@werenota.com
- **Sicherheitsmeldungen:** security@werenota.com
- **Allgemeine Anfragen:** support@werenota.com

Wir bemühen uns, innerhalb von **7 Werktagen** zu antworten.

---

## Anhang A — Katalog der Telemetrie-Ereignisse

Zur vollständigen Transparenz hier die komplette Liste der Telemetrie-Ereignisnamen, die bei aktivierter Telemetrie gesendet werden können. Keiner davon enthält Inhalte; es sind reine Zähler.

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
