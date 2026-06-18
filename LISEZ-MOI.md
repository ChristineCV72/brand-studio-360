# Brand Studio 360° — Site web

Site premium, minimaliste et éditorial, construit selon votre charte graphique et vos maquettes.

## Comment l'ouvrir
Double-cliquez sur **`index.html`** (s'ouvre dans votre navigateur).
> Une connexion internet est nécessaire pour afficher les photos de démonstration (voir plus bas).

## Pages
| Fichier | Page |
|---|---|
| `index.html` | Accueil (hero, services, estimateur, projets, CTA) |
| `services.html` | Vue d'ensemble des 6 services |
| `service-*.html` | 6 pages service dédiées (web-design, brand-identity, video-production, brand-photography, social-media, interior-design) |
| `projets.html` | Portfolio filtrable |
| `projet-fr-coiffure.html` | Fiche projet détaillée |
| `a-propos.html` | À propos + 3 piliers (Vision · Création · Déploiement) |
| `contact.html` | Formulaire de contact |
| `configurateur.html` | **Configurateur de devis** (élément central) |

## Charte respectée
- Couleurs : fond `#FAFAFA` / `#EEEEE8`, texte `#504431`, accent `#EFDA19`, clair `#FFFFFF`
- Typographie : **Poppins** (Light / Regular / SemiBold / Bold)
- Logos : dans `assets/logo/`

## Configurateur de devis
5 étapes (Type → Besoins → Précisions → Options → Estimation + Coordonnées) avec **prix affiché en temps réel**, pour les 6 services.
Les prix et options sont entièrement modifiables dans **`js/configurateur.js`** (objet `SERVICES` en haut du fichier).

### Tarifs
Les tarifs sont calibrés sur la fourchette **CHF 500 – 5'000** affichée dans votre maquette.
Chaque prix se compose : `base du type` + `objectif` + (`curseur` × tarif unitaire) + `options cochées`, arrondi à la dizaine.
Pour les ajuster : modifiez les valeurs `base` et `add` dans l'objet `SERVICES` de `js/configurateur.js`, ainsi que les mentions « À partir de CHF … » dans `services.html`.

## ⚠️ Photos à remplacer
Vos dossiers `PHOTOS` et `VIDEOS` étant vides, j'ai utilisé des **images de démonstration Unsplash** (liens externes).
Pour mettre vos vraies photos : déposez-les dans `assets/`, puis remplacez les URL `https://images.unsplash.com/...` dans les fichiers `.html`.

## Personnalisation rapide
- Email / téléphone : rechercher `hello@brandstudio360.com` et `+41 00 000 00 00` dans les `.html`
- Couleurs / espacements : variables en haut de `css/style.css`
