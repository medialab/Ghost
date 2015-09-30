# medialab notes about this branch

This is the medialab forked branch of [Ghost](https://github.com/TryGhost/Ghost)

## Tech changes from Ghost (reverse chrono)

- patch to have prev/next links on single post - see [this](https://github.com/cobbspur/Ghost/commit/e38a6c02273b16ef44f0d77a61cd49ad6a7c89af#comments)
- i18n module to manage {{t 'string'}}
  - content/locales/*.json
- routes
  - `/` to the homepage we manage in our [poltergeist](https://github.com/medialab/poltergeist) Ghost theme
  - `/blog` and `/blog?p=234` redirect to the blog article (to keep running old blog links)
  - `/tag/:slug` route (findByTag in frontend.js, api.js, post.js)
- some helpers (end of `helpers/index.js`) (i18n versions, styling of [MODES], ...)
- admin list of posts: `published_at` sort rather than `updated_at`
  - `core/client/router.js`
  - `core/client/view/blog.js`

## Install

- git clone medialab/Ghost

- please adjust
  - `config.js`
  - `content/data/ghost.db`sqlite database (owner need to be `ghost` user)

- for the theme, please
  - either (better)
    - cd content/themes
    - git clone http://github.com/medialab/poltergeist.git
    - git pull
  - either (untested)
    - add in .submodules
      [submodule "content/themes/poltergeist"]
        path = content/themes/poltergeist
        url = git://github.com/medialab/poltergeist.git
    - git pull

```
sudo gem install sass -v 3.3.3
 sudo gem install bourbon -v 3.1.8

git submodule update --init (for casper theme)
npm install -g grunt-cli
npm install
grunt init
grunt
```
- install the v0.10.40 node binaries (required by our old version of ghost)


### Run

#### pm2

- you need to first install pm2
- then edit the env variable about the runtime profile
- and finally run ghost with pm2 targeting the right node version

```
sudo npm install -g pm2
echo "export NODE_ENV=production" >> ~/.profile
source ~/.profile
pm2 start --interpreter node-v0.10.40/bin/node index.js
```


#### supervisor way (might be deprecated)
NB: after adding a supervisorctl .conf file, you need to:

```
supervisorctl reread
supervisorctl update
```


#### Dev

Localhost
```
npm start
```

On server
```
sudo supervisorctl restart aime_home_page_dev
```

#### Prod
You need to

```
cp ./aime_home_page.conf to /etc/supervisor/conf.d/
sudo supervisorctl restart aime_home_page
```

Logs (see supervisor conf)

```
tail -f /var/log/supervisor/aime_home_page.log
tail -f /var/log/supervisor/aime_home_page_err.log
```

# Migration
## Categories are now special tags
- event
- discuss
- material
- tool

## Articles deleted
- all drafts
- empty: 25, /compte-rendu-de-la-journee-denquete-sur-linstitution/
- ininteressant: 199, /where-standing/

# Redirects
## article content was updated !
- `www.modesofexistence.org` changed to `www.modesofexistence.org/inquiry`
- old blog links `/blog/?p=x` (see routes above)
- platform elements linked using shortened syntax `/ime/en/cont/123`

## Disqus translation .csv
To be used in the disqs website under tools > migration

Comments on pages were deleted

## Redirect URLs
following is stored in `config.js`
    
> mapping.wordpress = {
    "511":  "clarifications-on-refocusing-the-aime-inquiry",
    "499":  "seminary-at-the-namur-ulb-seminaire-a-luniversite-de-namur-ulb",
    "493":  "refocusing-the-aime-inquiry-recentrer-lenquete-eme",
    "482":  "qa-n1-monday-9-december-between-530-and-730-p-m",
    "473":  "some-reflections-after-the-workshop-repc2b7ref",
    "464":  "chicago",
    "460":  "chicago",
    "458":  "bruno-latour-at-france-culture-in-french",
    "449":  "bruno-latour-on-gaia-and-the-anthropocene",
    "439":  "bruno-latour-at-france-culture-in-french",
    "433":  "thinking-the-anthropocene-conference-in-paris-14-15-november-2013",
    "413":  "mediation-team-workshop",
    "385":  "workshop-repc2b7ref-4-november-2013-paris-2",
    "376":  "lifecycle-of-contributions-2",
    "358":  "what-is-a-contribution",
    "346":  "tuto-contribution",
    "362":  "tuto-contribution",
    "342":  "reading-experiences",
    "308":  "faq-why-15-modes-pourquoi-15-modes",
    "274":  "workshop-with-mediators",
    "267":  "session-with-bruno-latour-and-isabelle-stengers-about-aime-at-the-ens-18-october-2013-17h-19h-paris",
    "263":  "aime-platform-v-0-5",
    "315":  "eduardo-kohns-how-forests-think-toward-an-anthropology-beyond-the-human",
    "321":  "mechanical-marvels-clockwork-dreams",
    "249":  "aime-platform-v-o-5-demo",
    "240":  "call-for-papers-politics-and-the-later-latour",
    "324":  "kyle-mcgee-the-normativity-of-network",
    "330":  "peter-browns-masterpiece-through-the-eye-of-the-needle-relc2b7att",
    "221":  "welcoming-blog-reading-groups",
    "216":  "stephen-muecke-on-enquete-sur-les-modes-dexistence-une-anthropologie-des-modernes",
    "212":  "why-are-we-calling-the-digital-book-augmented",
    "207":  "launch-english",
    "204":  "launch-english",
    "179":  "screencast-of-the-next-version-in-progress",
    "172":  "enonciation",
    "128":  "atelier-eme-organisation-aime-workshop-on-organization",
    "111":  "ateliers-eme-proprietespropriete-aime-workshop-on-propertiesproperty",
    "107":  "diplomacy-report",
    "102":  "diplomacy-report",
    "95": "extrait-de-lentretien-a-la-revue-critiques-bruno-latour-sur-le-diplomate",
    "80": "diplomacy",
    "29": "compte-rendu-res-extensa",
    "92": "compte-rendu-res-extensa",
    "42": "journee-denquete-sur-les-modes-dexistence-du-vendredi-7-decembre-2012-sur-la-res-extensa",
    "35": "institution",
    "168":  "biblio",
    "165":  "short-definition-of-the-modes",
    "9":  "bien-venue"
};

## Language
A article title // Titre français
<!-- fr -->
en français
<!-- en -->
en anglais

