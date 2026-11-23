# « Le Papillon des Noues » — Guide du maître du jeu (SPOILERS)

ARG horreur / OSINT. Ouvrir `index.html` dans un navigateur. Tout fonctionne hors-ligne.

## Solution
- **Ravisseurs :** Gérald Fauvel (le conducteur) et Martine Fauvel (sa sœur, la passagère au parapluie).
- **Lieu :** ferme du lieu-dit **Les Noues**, carreau **VLB 37-82** (parcelle B-214).
- **Mobile :** Élise Fauvel, fille de Gérald, s'est noyée le 07/06/1996 dans l'étang des Noues. Martine, qui l'élevait, n'a jamais fait son deuil : elle a « recruté » Lina pour remplacer Élise.

La page `solution.html` attend les deux prénoms (le nom de famille est facultatif) et « Noues », « 37-82 » ou « B-214 ».

## Fausses pistes
| Suspect | Pourquoi c'est faux | Où le voir |
|---|---|---|
| Julien Morel (le père) | Badgé à Saint-Aubert (à 45 km) jusqu'à 18h41 | Rapport §3.1 |
| Kévin Brault | Filmé au Relais de 16h22 à 19h05 | Rapport §3.2 |
| « Élise » | Morte en 1996 | Archives du journal |

## Chaîne d'indices (ordre conseillé)
1. **Journal** → la camionnette blanche, le commentaire de `papillon_noues` posté à 03:33, l'encadré « Il y a 30 ans » → **chercher « Noues » ou « 1996 » dans les archives** → Élise Fauvel, noyée le **07/06/1996**, élevée par Gérald et Martine Fauvel, la ferme des Noues.
2. **Rapport** → les alibis du père et de Kévin, la camionnette au **papillon bleu**, la femme au parapluie, la ferme « NON FOUILLÉE ». Les passages caviardés se lisent dans le code source (sélection impossible, mais `Ctrl+U`). Un commentaire **base64** dans le code source parle du SMS de 03h33 et des métadonnées.
3. **Téléphone, Messages « Élise 🦋 »** → son papa répare la balançoire, il a une camionnette avec un papillon, sa tante fait des madeleines, « le jour où je suis allée dans l'eau » donne le code des Notes.
4. **Notes** → code **0706** → la maison est « après le vieux moulin, près de l'étang », et « la photo sait où c'est ».
5. **Photos → chambre.jpg → EXIF** → `Artist: Martine F.`, **GPS VLB 37-82**. La photo supprimée `toi.jpg` vient du même appareil (SM-A125F) et a été prise devant le grillage de l'école.
6. **Localiser** → le trajet du 13/10 : de l'école au lavoir, puis en véhicule sur la D17 jusqu'au carrefour du chemin du Moulin, direction sud-est.
7. **Carte** → VLB 37-82 = ferme appartenant à FAUVEL Gérald et Martine, « vacante » depuis 1997, mais avec une consommation électrique en hausse depuis août 2026. Le chemin du Moulin ne mène qu'à cette ferme.
8. **Blog de l'école** (lien dans l'article du journal) → Gérald Fauvel a réparé la balançoire, Martine Fauvel faisait les madeleines.

## Détails d'ambiance
- Le scellé n°3 reçoit deux SMS le 15/10 à 03:33, alors que la batterie a été retirée.
- Le commentaire du journal signé `papillon_noues` est posté à la même heure, 03:33.
- Après la victoire, une notification « Élise 🦋 » s'affiche et l'onglet du navigateur se renomme 🦋.
- Au 3ᵉ essai raté sur la page de réponse : « tu cherches mal 🦋 ».

## Pour aller plus loin (idées IRL)
- Créer un vrai compte « papillon_noues » ou un numéro qui envoie le SMS de fin.
- Imprimer le PV, l'abîmer et le donner en main propre.
- Cacher le code 0706 sur un faux faire-part de décès de 1996.

*Œuvre de fiction : personnes, lieux et organismes sont imaginaires.*
