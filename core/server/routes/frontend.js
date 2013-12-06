var frontend    = require('../controllers/frontend'),
    Ghost       = require('../../ghost'),

    ghost       = new Ghost();

module.exports = function (server) {
    // ### Frontend routes
    /* TODO: dynamic routing, homepage generator, filters ETC ETC */
    
    // aime redirect old blog posts
    server.get('/blog/', frontend.oldposts);

    server.get('/rss/', frontend.rss);
    server.get('/rss/:page/', frontend.rss);
    //server.get('/page/:page/', frontend.homepage);
    server.get(ghost.settings('permalinks'), frontend.single);
    //server.get('/', frontend.homepage);

    // aime
    server.get('/page/:page/', frontend.blog);
    server.get('/tag/:tag/', frontend.tag);
    
    server.get('/lang/:lang/', frontend.setlang);

    // aime redirect shorturl service to element http://modesofexistence.org/ime/en/voc/1764/
    server.get('/ime/:lang/:type/:id/', frontend.shortener);
    
    server.get('/', frontend.homepage);
    // end aime
};
