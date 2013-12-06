# medialab notes about this branch

This is the medialab forked branch of Ghost

## Tech changes from Ghost

- i18n module to manage {{t 'string'}}
	- content/locales/*.json
- routes
	- `/tag/:slug` route (findByTag in frontend.js, api.js, post.js)
	
	- `/` to blog

- some helpers
- admin list of posts: `published_at` sort rather than `updated_at`
	- `core/client/router.js`
	- `core/client/view/blog.js`

## Install and launch

- git clone Ghost

- please add
	- `config.js`
	- `content/data/ghost.db`sqlite database

- for the theme, please now:
	- either
		- cd content/themes
		- git clone http://github.com/medialab/poltergeist.git
		- git pull
	- either
		- add in .submodules
			[submodule "content/themes/poltergeist"]
				path = content/themes/poltergeist
				url = git://github.com/medialab/poltergeist.git
		- git pull

- sudo gem install sass
- sudo gem install bourbon

- git submodule update --init
- npm install -g grunt-cli
- npm install
- grunt init
- grunt
- npm start

## Categories (are special tags in ghost)
- event
- discuss
- material
- tool

## Articles deleted
- all drafts
- empty: 25, /compte-rendu-de-la-journee-denquete-sur-linstitution/
- ininteressant: 199, /where-standing/

## Redirects to platform
in all articles:
- `www.modesofexistence.org` to `www.modesofexistence.org/inquiry`
- `www.modesofexistence.org/ime/fr/voc/43/` to the platform element

## TODO Final list of redirections from wordpress to ghost:
482, /qa-n1-monday-9-december-between-530-and-730-p-m/
473, /some-reflections-after-the-workshop-repc2b7ref/
464, /chicago/
460, /chicago/
458, /bruno-latour-at-france-culture-in-french/
449, /bruno-latour-on-gaia-and-the-anthropocene/
439, /bruno-latour-at-france-culture-in-french/
433, /thinking-the-anthropocene-conference-in-paris-14-15-november-2013/
413 /mediation-team-workshop/
385, /workshop-repc2b7ref-4-november-2013-paris-2/
376, /lifecycle-of-contributions-2/
358, /what-is-a-contribution/
346, /tuto-contribution/
342, /reading-experiences/
308, /faq-why-15-modes-pourquoi-15-modes/
274, /workshop-with-mediators/
267, /session-with-bruno-latour-and-isabelle-stengers-about-aime-at-the-ens-18-october-2013-17h-19h-paris/
263, /aime-platform-v-0-5/
315, /eduardo-kohns-how-forests-think-toward-an-anthropology-beyond-the-human/
321, /mechanical-marvels-clockwork-dreams/
249, /aime-platform-v-o-5-demo/
240, /call-for-papers-politics-and-the-later-latour/
324, /kyle-mcgee-the-normativity-of-network/
330, /peter-browns-masterpiece-through-the-eye-of-the-needle-relc2b7att/
221, /welcoming-blog-reading-groups/
216, /stephen-muecke-on-enquete-sur-les-modes-dexistence-une-anthropologie-des-modernes/
212, /why-are-we-calling-the-digital-book-augmented/
207, /launch-english/
204, /launch-english/
179, /screencast-of-the-next-version-in-progress/
172, /enonciation/
128, /atelier-eme-organisation-aime-workshop-on-organization/
111, /ateliers-eme-proprietespropriete-aime-workshop-on-propertiesproperty/
107, /diplomacy-report/
102, /diplomacy-report/
95, /extrait-de-lentretien-a-la-revue-critiques-bruno-latour-sur-le-diplomate/
80, /diplomacy/
29, /compte-rendu-res-extensa/ = concat(92)
92, /compte-rendu-res-extensa/
42, /journee-denquete-sur-les-modes-dexistence-du-vendredi-7-decembre-2012-sur-la-res-extensa/
35, /institution/ = noEN
168, /biblio/
165, /short-definition-of-the-modes/
9, /bien-venue/ 

## Language
A article title // Titre français
<!-- fr -->
en français
<!-- en -->
en anglais

## Problèmes
- images
  http://localhost:2370/bang/ghost/editor/45/

