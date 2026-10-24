# Kit « Dashboard d'audit » pour Copilot

## Principe
Copilot ne code PAS le tableau de bord. Le moteur (`audit-insight-moteur.html`) est déjà écrit et testé :
il lit l'Excel exporté de SafetyCulture, calcule et affiche tout.
Copilot ne fait que 2 choses simples : **lire les colonnes** et **remplir le bloc `CONFIG`** (≈10 lignes).

## Contenu
- `audit-insight-moteur.html` : le moteur (fichier unique, autonome, sans internet)
- `prompts/PROMPT-1-analyse.md` : Copilot analyse l'Excel et signale les libellés inconnus
- `prompts/PROMPT-2-config.md` : Copilot produit le bloc CONFIG du client
- `GUIDE-CLIENT.md` : mode d'emploi pas à pas pour le client
- `REGLES-COPILOT.md` : règles courtes à coller au début de la conversation
- `METHODE-CODAGE-GUIDE.md` : cadre pour que Copilot modifie le moteur sans le casser
- `exemples/export-format-long.csv` : exemple d'export non-SafetyCulture

## Workflow client
Voir `GUIDE-CLIENT.md` (5 étapes, à donner tel quel au client). Le client n'ouvre jamais le code : il colle le bloc de Copilot dans le bouton « Configuration (Copilot) » du tableau de bord.

## Limites connues
- Deux formats pris en charge : « large » (SafetyCulture, 1 ligne = 1 audit) et « long » (1 ligne = 1 réponse, via `CONFIG.long`). Excel et CSV (séparateur et encodage détectés).
- Un export très différent (plusieurs onglets liés, scores numériques sans statut) demandera d'abord de le convertir en format long.
- Le logo se charge depuis l'interface (bouton Identité visuelle), pas besoin de le mettre dans CONFIG.
