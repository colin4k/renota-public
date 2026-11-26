# Renota — Politique de confidentialité

**Dernière mise à jour :** 2026-11-26
**Date d'entrée en vigueur :** 2026-11-26

Renota (« nous », « notre », « les applis ») est un ensemble d'applis — une extension Chrome, une extension Zotero et une appli Android — qui vous aident à collecter le texte que vous lisez et à l'utiliser comme contexte personnel pour une écriture assistée par IA. La présente Politique de confidentialité explique quelles données Renota traite, comment elles sont utilisées et quels choix s'offrent à vous.

En installant ou en utilisant Renota, vous acceptez la présente Politique de confidentialité. Si vous ne l'acceptez pas, veuillez cesser de l'utiliser et désinstaller les applis.

---

## 1. Périmètre

La présente politique s'applique aux trois clients Renota — l'extension Chrome, distribuée via le Chrome Web Store, l'extension Zotero et l'appli Android, destinée à être distribuée via Google Play ou en téléchargement direct — ainsi qu'à l'infrastructure interne avec laquelle ils communiquent : précisément le point d'accès de télémétrie décrit à la section 4 et le service facultatif de synchronisation cloud décrit à la section 3.1. Le même service de synchronisation cloud est utilisé par les trois clients, et la présente politique couvre ce service pour l'ensemble d'entre eux.

Elle ne s'applique **pas** aux services tiers que vous choisissez de connecter via Renota (par exemple les fournisseurs de LLM). Lorsque vous configurez un fournisseur de LLM, vos prompts et la réponse de ce fournisseur sont régis par la politique de confidentialité propre à ce fournisseur. La section 5 liste les fournisseurs actuellement pris en charge et renvoie à leurs politiques.


**État de publication.** L'extension Chrome est disponible sur le Chrome Web Store. Le plugin Zotero et l'appli Android sont encore en préparation. La présente politique décrit comment chaque client traite les données.

---

## 2. Données que nous ne collectons PAS

Nous voulons être clairs sur ce que nous ne faisons **pas** :

- Nous ne collectons **pas** le contenu des pages web que vous consultez.
- Nous ne collectons **pas** le texte que vous sélectionnez, sauf si vous l'enregistrez explicitement dans votre base de connaissances.
- Nous ne collectons **pas** vos clés API de LLM. Les clés API sont stockées uniquement dans votre navigateur et envoyées directement depuis votre navigateur au fournisseur de LLM que vous choisissez. Elles ne transitent jamais par nos serveurs.
- Nous ne vendons, ne louons et n'échangeons aucune donnée avec des tiers à des fins publicitaires ou marketing.
- Nous n'utilisons pas vos données pour entraîner un modèle d'IA.

---

## 3. Données stockées localement dans votre navigateur

Les données suivantes sont stockées **uniquement dans votre navigateur** (via `chrome.storage.local` et `IndexedDB`). Elles ne sont pas transmises à nos serveurs et nous n'avons techniquement aucun moyen de les lire — **sauf si vous activez explicitement la synchronisation cloud**, décrite à la section 3.1. La synchronisation cloud est désactivée par défaut et nécessite une connexion explicite.

| Données | Finalité | Emplacement |
|------|---------|----------|
| **Entrées de la base de connaissances** (« extraits », « insights », fichiers markdown importés) | Votre bibliothèque de connaissances personnelle, utilisée comme contexte pour la génération par IA | IndexedDB |
| **Texte sélectionné que vous enregistrez** | Capturé depuis les pages web lorsque vous choisissez explicitement « Enregistrer dans Renota » | IndexedDB |
| **Métadonnées de page** (URL, titre, langue) des éléments enregistrés | Attribution de la source pour les connaissances enregistrées | IndexedDB |
| **Vos réglages de fournisseur de LLM** (nom du fournisseur, URL de base, modèle) | Pour savoir quelle API appeler | IndexedDB |
| **Votre clé API de LLM** (BYOK — votre propre clé) | Authentification auprès du fournisseur de LLM choisi | IndexedDB |
| **Préférences d'interface** (langue, thème, position de la barre d'outils, prompts d'action) | Personnaliser votre expérience | `chrome.storage.local` |
| **Identifiant d'installation anonyme** (UUID v4, généré localement) | Utilisé uniquement pour la télémétrie anonyme (section 4) | `chrome.storage.local` |

Vous pouvez à tout moment inspecter, exporter ou supprimer l'ensemble de ces données. Voir la section 7 pour la marche à suivre.

---

### 3.1 Synchronisation cloud (facultative, désactivée par défaut)

La synchronisation cloud maintient votre base de connaissances cohérente entre l'extension Chrome, l'extension Zotero et l'appli Android. Elle est entièrement facultative : rien n'est envoyé tant que vous ne vous connectez pas avec votre adresse e-mail sur un appareil.

**Fonctionnement.** Vous saisissez votre adresse e-mail dans Réglages → Synchronisation cloud et recevez un code de connexion de 8 caractères. La validation du code délivre un jeton d'accès propre à l'appareil (stocké dans `chrome.storage.local`). Une fois connecté, les clients appellent périodiquement nos points d'accès de synchronisation (`/v1/sync/pull`, `/v1/sync/push`) pour échanger des entrées de connaissances.

**Ce qui est envoyé** — uniquement des entrées de connaissances (les données listées à la section 3 qui font partie de votre base de connaissances) :

| Données | Finalité |
|------|---------|
| Contenu de l'extrait et contexte environnant | Pour que l'entrée soit disponible sur vos autres appareils |
| Métadonnées de source (URL, titre, domaine, clés d'élément et de pièce jointe Zotero, nom de l'appli Android) | Attribution et navigation vers la source |
| Étiquettes, concepts, liens de dérivation, langue, horodatages | Qualité de la recherche et résolution des conflits |
| Un condensé SHA-256 du contenu de chaque entrée | Détection des doublons lors de la synchronisation |
| Marqueurs de suppression (« pierres tombales ») | Pour qu'une suppression sur un appareil se propage au lieu de ressusciter |

**Ce qui n'est jamais envoyé :**

- Vos clés API de LLM. Elles restent sur chaque appareil (l'appli Android les chiffre avec le keystore système) et vont directement au fournisseur que vous avez choisi.
- Votre historique de navigation, le contenu des pages que vous n'avez pas enregistré, ou quoi que ce soit provenant d'autres onglets ou applis.
- Les captures d'écran ou images OCR de l'appli Android — uniquement le texte que vous enregistrez explicitement.

**Où ces données sont stockées.** Les entrées résident dans la base D1 de Cloudflare (l'index et les métadonnées) et dans le stockage objet R2 (le corps des entrées), servis par le réseau de périphérie de Cloudflare. Les entrées sont stockées en texte clair sur le serveur : il ne s'agit donc **pas** d'un chiffrement de bout en bout, et nous pourrions techniquement les lire. Ne synchronisez pas de contenu que vous ne souhaitez pas voir stocké de cette manière. Les marqueurs de suppression sont purgés au bout de 90 jours.

**Vos moyens d'action.** Déconnectez-vous sur n'importe quel appareil pour arrêter la synchronisation ; la copie locale subsiste. La suppression d'une entrée se propage à vos autres appareils. Pour supprimer votre compte et toutes les données cloud, utilisez l'action « Supprimer le compte » sur la page des réglages du compte ; elle ne supprime que les entrées, jetons d'appareil et enregistrements de connexion de ce compte.

## 4. Télémétrie anonyme

Renota inclut une fonction de télémétrie anonyme. Elle est **activée par défaut** et peut être **désactivée à tout moment** dans le panneau de réglages de l'extension ; une fois désactivée, plus rien n'est envoyé.

### 4.1 Ce qui est envoyé

Lorsque la télémétrie est activée, l'extension envoie les champs suivants au site de télémétrie :

- `event` — une chaîne issue d'une énumération fixe (par ex. `knowledge_saved`, `ai_generation_completed`, `extension_installed`)
- `installId` — un UUID v4 généré aléatoirement et stocké localement ; **non** dérivé d'une identité utilisateur
- `appVersion` — la version de l'extension (par ex. `"1.0.0"`)
- `productStage` — une constante définie à la compilation (`"mvp0"` ou `"mvp1"`)
- `language` — la langue de l'interface de l'extension (par ex. `"zh-CN"`)

### 4.2 Ce qui n'est JAMAIS envoyé

- URL des pages, titres des pages ou tout contenu de page
- Texte sélectionné ou contenu de connaissances enregistré
- Votre clé API de LLM, le nom du modèle ou les réponses du LLM
- L'adresse IP (les journaux du serveur sont conservés selon la section 8)
- Tout identifiant pouvant être relié à une personne réelle

### 4.3 Pourquoi nous collectons ces données

La télémétrie nous aide à comprendre quelles fonctionnalités sont utilisées et lesquelles ne le sont pas, afin de prioriser les améliorations. Elle ne contient aucun contenu et ne peut pas servir à vous identifier.

### 4.4 Comment refuser

Vous pouvez désactiver la télémétrie à tout moment :

1. Ouvrez le panneau latéral Renota.
2. Allez dans **Réglages → Statistiques d'usage anonymes**.
3. Désactivez l'option **Statistiques d'usage anonymes**.

Lorsqu'elle est désactivée, aucune requête n'est envoyée au site de télémétrie. Désinstaller l'extension arrête également toute télémétrie.


### 4.5 Mesure d'audience du site

Notre site web à l'adresse werenota.com utilise le même service de mesure respectueux de la vie privée pour compter les pages vues. Il ne dépose aucun cookie, n'écrit rien sur votre appareil et n'enregistre aucune adresse IP avec les événements. Comme il ne permet pas de vous identifier et ne sert qu'à mesurer un trafic agrégé, il ne nécessite pas de bandeau de consentement. Cela est indépendant de la télémétrie décrite ci-dessus, qui ne concerne que l'Extension.
---

## 5. Services tiers que vous choisissez

Renota n'intègre pas de modèle d'IA. Vous fournissez votre propre fournisseur de LLM et votre clé API (BYOK). Lorsque vous utilisez une fonction d'IA, votre prompt et, le cas échéant, les entrées de connaissances retrouvées sont envoyés **directement depuis votre navigateur** au fournisseur que vous avez configuré.

La liste actuelle des fournisseurs pris en charge est la suivante :

| Fournisseur | Point d'accès | Politique de confidentialité |
|----------|----------|----------------|
| **OpenAI** | `https://api.openai.com/v1` | https://openai.com/policies/privacy-policy |
| **DeepSeek** | `https://api.deepseek.com` | https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html |
| **OpenRouter** | `https://openrouter.ai/api/v1` | https://openrouter.ai/privacy |

Les serveurs de Renota ne se trouvent **pas** sur ce chemin de données. Votre clé API, vos prompts et les réponses ne circulent qu'entre votre navigateur et le fournisseur de LLM que vous avez choisi.

Si vous configurez une URL de base personnalisée, il vous incombe de vérifier les pratiques de confidentialité de ce fournisseur.

---

## 6. Permissions expliquées

### 6.1 Extension Chrome

Chrome nous oblige à déclarer les autorisations que nous utilisons. Voici pourquoi chacune est nécessaire :

| Autorisation | Raison |
|------------|--------|
| `storage` | Conserver localement vos réglages et votre base de connaissances |
| `sidePanel` | Ouvrir l'espace de travail Renota dans le panneau latéral de Chrome |
| `activeTab` | Injecter des assistants dans la page que vous consultez, uniquement après un clic sur la barre d'outils |
| `scripting` | Lire les métadonnées de page lorsque vous utilisez le menu contextuel « Enregistrer dans Renota » |
| `contextMenus` | Ajouter l'élément « Enregistrer dans Renota » au menu contextuel de Chrome |
| `offscreen` | Exécuter en arrière-plan le worker d'indexation et de recherche local |
| autorisation d'hôte `<all_urls>` | Permettre à la barre d'outils et au menu contextuel de fonctionner sur tous les sites que vous lisez |

Nous n'injectons **pas** de publicité, nous ne modifions pas le contenu des pages et nous n'exfiltrons aucune donnée vers des serveurs distants au-delà des points d'accès tiers listés ci-dessus.

### 6.2 Appli Android

L'appli Android est distribuée via Google Play et, séparément, en téléchargement direct. La version Google Play déclare les autorisations suivantes :

| Autorisation | Raison |
|------------|--------|
| `SYSTEM_ALERT_WINDOW` (« Afficher par-dessus les autres applis ») | Dessiner la boule flottante au-dessus de l'appli que vous lisez |
| `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_MEDIA_PROJECTION` | Maintenir la session de capture active tant que la boule flottante est visible |
| `POST_NOTIFICATIONS` | Afficher la notification permanente qu'Android exige pour un service de premier plan |
| `INTERNET` | Envoyer les prompts au fournisseur de modèle que vous avez configuré |

**La version Google Play ne demande pas de service d'accessibilité.** La boule flottante est dessinée avec l'autorisation standard de superposition système, et la capture d'écran utilise l'API `MediaProjection` d'Android, qui affiche une boîte de dialogue de consentement système avant la première capture. Aucune autorisation de service d'accessibilité ne figure dans le manifeste de cette version.

Une autre version, distribuée uniquement en téléchargement direct depuis notre site et jamais publiée sur Google Play, propose une variante fondée sur l'accessibilité, qui capture l'écran sans boîte de dialogue de consentement à chaque session. Si vous installez cette version, il vous est demandé d'activer vous-même le service dans les réglages du système ; il lit les événements de titre de fenêtre pour rattacher un extrait à l'appli d'origine et n'inspecte pas le contenu des autres applis.

### 6.3 Contenu de l'écran sur Android

- Les captures d'écran sont traitées entièrement sur votre appareil et ne sont **jamais envoyées à nos serveurs**.
- La reconnaissance optique de caractères (OCR) tourne localement sur le téléphone.
- Seul le texte que vous sélectionnez et enregistrez explicitement devient une entrée de connaissances, et seul ce texte est inclus dans un prompt envoyé au fournisseur de modèle que vous avez configuré.
- Annuler une capture supprime la capture d'écran ; elle n'est pas écrite dans le stockage.

---

## 7. Vos droits et vos choix

### 7.1 Accès et export

- Ouvrez le panneau latéral Renota → onglet **Connaissances** → cliquez sur l'icône d'export pour télécharger toutes les entrées enregistrées dans un fichier JSON ou Markdown.

### 7.2 Suppression

- Ouvrez **Réglages → Données** et cliquez sur **« Effacer toutes les données locales »** pour supprimer de ce navigateur la base de connaissances, les réglages et l'identifiant d'installation.
- Désinstaller l'extension supprime également toutes les données stockées localement.
- Si vous avez activé la synchronisation cloud : **Réglages → Synchronisation cloud → Se déconnecter** arrête la synchronisation sur cet appareil. Pour supprimer les données de nos serveurs, supprimez votre compte sur la page des réglages du compte, ou écrivez-nous à `support@werenota.com`.
- Pour demander la suppression des données de télémétrie que nous aurions pu recevoir, écrivez-nous à `support@werenota.com`.

### 7.3 Désactiver des fonctionnalités

- Désactiver la télémétrie : voir la section 4.4.
- Désactiver la synchronisation cloud : **Réglages → Synchronisation cloud → Se déconnecter** (ou décochez « Activer la synchronisation cloud »).
- Désactiver le menu contextuel : ouvrez **Réglages → Général**.
- Désactiver la barre d'outils dans la page : ouvrez **Réglages → Barre d'outils**.

### 7.4 Droits au titre du RGPD (EEE / Royaume-Uni)

Si vous résidez dans l'EEE ou au Royaume-Uni, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et de portabilité de vos données personnelles, ainsi que d'un droit d'opposition à leur traitement et d'un droit d'introduire une réclamation auprès de votre autorité de contrôle. Notre base légale pour le traitement limité décrit à la section 4 est le **consentement**, que vous pouvez retirer à tout moment.

### 7.5 Droits au titre du CCPA/CPRA (Californie)

Si vous résidez en Californie, vous avez le droit de savoir, de supprimer, de corriger et de limiter l'utilisation des informations personnelles sensibles. Renota ne vend ni ne partage d'informations personnelles à des fins de publicité comportementale cross-contexte.

---

## 8. Conservation des données

- **Données locales** (IndexedDB / `chrome.storage.local`) : conservées jusqu'à ce que vous les effaciez ou désinstalliez l'extension.
- **Données de synchronisation cloud** : conservées tant que votre compte existe. Les marqueurs de suppression sont purgés au bout de 90 jours. Supprimer votre compte efface toutes les entrées, tous les appareils et tous les enregistrements de connexion.
- **Événements de télémétrie** : conservés jusqu'à **90 jours** sous forme agrégée, puis supprimés. Ils ne sont jamais reliés à une personne.
- **Prompts et réponses du LLM** : traités par le fournisseur tiers que vous avez configuré. Veuillez consulter ses politiques de conservation (section 5).

---

## 9. Sécurité

Nous prenons des mesures raisonnables pour protéger les données limitées que nous traitons :

- Tout le trafic réseau utilise HTTPS (TLS 1.2+).
- Les clés API ne quittent jamais votre navigateur, sauf vers le point d'accès de LLM que vous avez configuré.
- L'extension applique le principe du moindre privilège : aucune autorisation n'est demandée si elle n'est pas nécessaire à une fonctionnalité documentée.
- Nous n'exploitons pas nos propres serveurs sur le chemin des requêtes de vos prompts ou de vos réponses.

Aucun système n'est toutefois parfaitement sûr. Si vous découvrez une vulnérabilité, merci de la signaler à `security@werenota.com`.

---

## 10. Confidentialité des enfants

Renota ne s'adresse pas aux enfants de moins de 13 ans (ou de moins de 16 ans dans l'EEE et au Royaume-Uni). Nous ne collectons pas sciemment de données personnelles auprès d'enfants. Si vous pensez qu'un enfant a installé l'extension, contactez-nous afin que nous puissions aider à la désinstaller.

---

## 11. Utilisateurs internationaux

Renota est exploité depuis la Chine. En utilisant l'extension, vous comprenez que les données de télémétrie auxquelles vous avez consenti peuvent être transférées vers la Chine et y être traitées. Nous nous appuyons sur des garanties contractuelles types et sur votre consentement explicite (section 4) pour tout transfert de ce type.

---

## 12. Modifications de la présente politique

Nous pouvons mettre à jour la présente Politique de confidentialité de temps à autre. Dans ce cas, nous :

- mettrons à jour la date de « Dernière mise à jour » en haut de cette page.
- pour les changements importants, afficherons un avis dans l'appli et demanderons un nouveau consentement lorsque la loi l'exige.

Les versions précédentes de cette politique sont disponibles sur demande à `support@werenota.com`.

---

## 13. Contact

Pour toute question, réclamation ou demande relative aux données, veuillez nous contacter :

- **E-mail :** support@werenota.com
- **Signalements de sécurité :** security@werenota.com
- **Demandes générales :** support@werenota.com

Nous nous efforçons de répondre sous **7 jours ouvrés**.

---

## Annexe A — Catalogue des événements de télémétrie

Par souci de transparence totale, voici la liste complète des noms d'événements de télémétrie susceptibles d'être envoyés lorsque la télémétrie est activée. Aucun ne contient de contenu ; ce sont de purs compteurs.

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
