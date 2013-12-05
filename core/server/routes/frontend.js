var frontend    = require('../controllers/frontend'),
    Ghost       = require('../../ghost'),

    ghost       = new Ghost();

module.exports = function (server) {
    // ### Frontend routes
    /* TODO: dynamic routing, homepage generator, filters ETC ETC */
    server.get('/rss/', frontend.rss);
    server.get('/rss/:page/', frontend.rss);
    //server.get('/page/:page/', frontend.homepage);
    server.get(ghost.settings('permalinks'), frontend.single);
    //server.get('/', frontend.homepage);


    // aime
    server.get('/page/:page/', frontend.blog);
    server.get('/blog/', frontend.blog);
    server.get('/tag/:slug/', frontend.tag);
    server.get('/', frontend.homepage);
    server.get('/lang/:lang/', frontend.setlang);
    // end aime
};
