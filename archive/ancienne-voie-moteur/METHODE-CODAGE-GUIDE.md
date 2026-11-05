# Méthode : guider Copilot pour coder proprement (au-delà du CONFIG)

Quand le client veut un besoin que le moteur ne couvre pas (nouvel indicateur, nouvelle vue), Copilot échoue s'il reçoit « ajoute X » en vrac. Il réussit avec ce cadre.

## 7 règles à coller dans la conversation
1. Un seul fichier HTML ; JavaScript simple (pas de framework, pas de CDN, pas d'import).
2. Tu ne renvoies JAMAIS tout le fichier : uniquement la fonction modifiée ou ajoutée, avec son nom exact et l'endroit où la coller (« après la fonction X »).
3. Une seule modification par message. Tu attends mon « ça marche » avant la suivante.
4. Aucune donnée en dur : tout vient de `S.audits` (état global) ; les graphiques sont des fonctions pures `f(données) → SVG`.
5. Avant de coder, tu reformules en 3 lignes ce que tu vas faire et ce que tu ne toucheras pas.
6. Après le code, tu donnes un test de 3 étapes que je peux faire dans le navigateur.
7. Si une erreur apparaît, je colle le message de la console (F12) et tu corriges la seule fonction concernée.

## Boucle de travail (par demande)
Décrire le besoin en 1 phrase → Copilot reformule → code d'UNE fonction → coller → tester → corriger ou valider → sauvegarder une copie du fichier (`moteur_v2.html`).

## Modèle de demande
« Besoin : [une phrase]. Données utilisées : `a.items` (champs k, sec, q, st ∈ C/NC/OBS/NA/INFO, note). Où l'afficher : [vue]. Rappelle les règles, reformule, puis donne UNE fonction. »

## Pourquoi ça marche
Copilot de base perd le fil sur les gros fichiers et réécrit tout. Ici le fichier reste hors de sa portée : il ne voit que des morceaux de 20–40 lignes avec des règles fixes.
