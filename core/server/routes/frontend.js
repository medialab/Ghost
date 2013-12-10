var frontend    = require('../controllers/frontend'),
    Ghost       = require('../../ghost'),

    ghost       = new Ghost();

module.exports = function (server) {
    // ### Frontend routes
    /* TODO: dynamic routing, homepage generator, filters ETC ETC */
    
    server.get('/rss/', frontend.rss);
    server.get('/rss/:page/', frontend.rss);

    // aime
    
    // redirect old blog posts (root /blog/ but also /blog/?p=323 pages)
    server.get('/blog/', frontend.oldposts);

    // list of all blog posts
    server.get('/page/', frontend.blog);
    server.get('/page/:page/', frontend.blog);

    // posts by tag
    server.get('/tag/:tag/', frontend.tag);
    
    // set lang
    server.get('/lang/:lang/', frontend.setlang);

    // redirect shorturl service to element http://modesofexistence.org/ime/en/voc/1764/
    server.get('/ime/:lang/:type/:id/', frontend.shortener);

    // home
    server.get('/', frontend.homepage);

    // end aime

    server.get(ghost.settings('permalinks'), frontend.single);
};
