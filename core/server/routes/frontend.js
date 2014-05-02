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

    // aime shortener url used to be here. now it's on the aime_crossings_server
    //server.get('/ime/:lang/:type/:id/', frontend.shortenerElements);

    // home (nb: js in our theme will redirect to platform if there is an hash to platform)
    server.get('/', frontend.homepage);

    // end aime

    server.get(ghost.settings('permalinks'), frontend.single);
};
