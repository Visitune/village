# Safety Culture — Tableau de bord d'audit

Application web autonome (un seul fichier HTML) pour analyser des exports d'audit Safety Culture : multi-audits, conformité par section, non-conformités et plan d'actions, one-pager exportable, sessions enregistrables, identité visuelle personnalisable.

## Fonctionnalités

- **Parseur Safety Culture dédié** : auditID, `_notes`, Title Page, sections `1) …`, métadonnées, UUID.
- **Multi-audits** : glisser plusieurs `.xlsx`, détection des doublons par id, sélection de modèles (`tpl`).
- **Calculs de période** : récurrents, persistants, nouveaux, résolus, findings.
- **4 vues** : Tableau de bord / Audits / Non-conformités & plan d'actions / One-pager.
- **KPI** : jauge, dernier audit + delta, NC, récurrents, plan d'actions, insights automatiques.
- **Courbe d'évolution** avec objectif et tooltips ; **conformité par section** cliquable.
- **Points critiques** classés par récurrence avec historique par audit.
- **Suivi d'actions** : statut (Ouvert/En cours/Clos), responsable, action corrective, étoile (pin), photos.
- **One-pager A4** : blocs activables, message auto, export PDF/JPEG.
- **Sessions** : enregistrer / ouvrir un JSON.
- **Identité visuelle** : nom, logo, couleur, objectif, site (modale).
- **Thème sombre**, démo (4 audits fictifs), export CSV des NC, modale détail d'audit, toasts.
- Fonctionne hors-ligne, aucune donnée envoyée sur Internet. SheetJS embarqué.

## Utilisation

Ouvrir `index.html` (ou `dashboard.html`) dans Edge/Chrome → glisser un ou plusieurs exports Excel Safety Culture → le tableau de bord se construit automatiquement.

## Déploiement (Netlify)

- Build command : (vide)
- Publish directory : `.` (racine)
- `netlify.toml` déjà présent (headers de sécurité).

## Fichiers

- `index.html` / `dashboard.html` : application (copie identique).
- `netlify.toml` : config Netlify.
- `.gitignore` : exclut les fichiers de travail locaux.

## Règles pour les agents

- Ne pas réduire l'application à un profilage générique : conserver le parseur Safety Culture dédié et les 4 vues.
- Ne pas ajouter de framework ni d'appel serveur.
- Ne pas committer de données d'audit réelles.
- `dashboard.html` doit rester une copie identique de `index.html`.
