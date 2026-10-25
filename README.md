# Kit « Dashboard d'audit » pour Copilot

## Démarrage rapide (objectif : un Excel en entrée → une SPA HTML complète en sortie)
1. Joindre l'Excel dans Copilot.
2. Coller : « Lis https://github.com/Visitune/village, fichiers COPILOT-INSTRUCTIONS.md et modele/spa-modele.html, et suis les instructions pour mon fichier joint. »
   Si Copilot ne peut pas lire GitHub : joindre aussi `COPILOT-INSTRUCTIONS.md` et `modele/spa-modele.html`.
3. Copilot renvoie `dashboard.html` (le modèle + un bloc MAPPING adapté). L'enregistrer, l'ouvrir, y glisser l'Excel.

- `COPILOT-INSTRUCTIONS.md` : procédure pas à pas pour Copilot (3 cas : statuts long / statuts large / sans statuts).
- `modele/spa-modele.html` : SPA générique testée (détecte colonnes, dates, nombres, statuts) ; seul le bloc MAPPING change.
- `.github/copilot-instructions.md` : renvoi automatique vers ces instructions.
- Ce qui suit (moteur d'audit SafetyCulture, prompts CONFIG) reste valable comme voie alternative pour les audits SafetyCulture.

## Principe
Copilot ne code PAS le tableau de bord. Le moteur (`audit-insight-moteur.html`) est déjà écrit et testé :
il lit l'Excel exporté de SafetyCulture, calcule et affiche tout.
Copilot ne fait que 2 choses simples : **lire les colonnes** et **remplir le bloc `CONFIG`** (≈10 lignes).

## Contenu
- `audit-insight-moteur.html` : le moteur (fichier unique, autonome, sans internet)
- `prompts/PROMPT-0-tout-en-un.md` : voie « moteur d'audit SafetyCulture » uniquement. Prompt autonome (règles + schéma CONFIG réel + exemple) : Copilot n'a pas besoin d'accéder au dépôt GitHub. Coller le prompt, joindre l'Excel.
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
