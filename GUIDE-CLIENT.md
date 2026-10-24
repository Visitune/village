# Guide client — Créer votre tableau de bord en 5 étapes

Vous n'avez rien à programmer. Copilot prépare un petit réglage, le tableau de bord fait le reste.

**Étape 1 — Ouvrir le tableau de bord**
Double-cliquez sur `audit-insight-moteur.html`. Il s'ouvre dans votre navigateur (Edge ou Chrome). Aucune installation, aucune connexion internet nécessaire.

**Étape 2 — Préparer Copilot**
Ouvrez Copilot. Ouvrez le fichier `REGLES-COPILOT.md`, copiez tout son contenu, collez-le dans Copilot, appuyez sur Entrée.

**Étape 3 — Faire lire votre fichier à Copilot**
Joignez votre export (Excel ou CSV) à Copilot avec le trombone. Ouvrez `prompts/PROMPT-1-analyse.md`, copiez, collez, Entrée. Copilot décrit votre fichier. Vous n'avez rien à vérifier.

**Étape 4 — Obtenir le réglage**
Ouvrez `prompts/PROMPT-2-config.md`, copiez, remplacez les 4 mots entre crochets [ ] (nom, couleur, site, objectif), collez dans Copilot, Entrée. Copilot répond avec un bloc de texte qui commence par `const CONFIG`. Cliquez sur « Copier » sous ce bloc.

**Étape 5 — Appliquer et afficher**
Dans le tableau de bord, cliquez sur « Configuration (Copilot) » en bas du menu à gauche. Collez le bloc, cliquez sur « Appliquer ». Puis glissez votre fichier Excel dans la page. C'est terminé.

## Si ça ne marche pas
- Message rouge dans la fenêtre Configuration : retournez dans Copilot et écrivez « Le tableau de bord refuse ton bloc avec ce message : [collez le message]. Renvoie le bloc corrigé ». Recopiez le nouveau bloc.
- Message « Résultats non reconnus » après l'import : retournez à l'étape 4 en ajoutant « Voici aussi les résultats non reconnus : [collez-les] ».
- Rien ne s'affiche : demandez à votre consultant.
