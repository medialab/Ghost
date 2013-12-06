var frontend    = require('../controllers/frontend'),
    Ghost       = require('../../ghost'),

    ghost       = new Ghost();

module.exports = function (server) {
    // ### Frontend routes
    /* TODO: dynamic routing, homepage generator, filters ETC ETC */
    server.get('/blog/', frontend.oldposts);

    server.get('/rss/', frontend.rss);
    server.get('/rss/:page/', frontend.rss);
    //server.get('/page/:page/', frontend.homepage);
    server.get(ghost.settings('permalinks'), frontend.single);
    //server.get('/', frontend.homepage);

    // aime
    server.get('/page/:page/', frontend.blog);
    server.get('/tag/:tag/', frontend.tag);
    server.get('/', frontend.homepage);
    server.get('/lang/:lang/', frontend.setlang);

    // REDIRECTS
    // 1) shorturl service to element http://modesofexistence.org/ime/en/voc/1764/
    server.get('/ime/:lang/:type/:id/', frontend.shortener);
    // 2) Old blog posts
    
    // 3) Link to MODE / CROSS !
    // to do

    // end aime
};
