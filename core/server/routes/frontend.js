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
    server.get('/tag/:tag/', frontend.tag);
    server.get('/', frontend.homepage);
    server.get('/lang/:lang/', frontend.setlang);

    // REDIRECTS

    // 1) shorturl service to element http://modesofexistence.org/ime/en/voc/1764/
    server.get('/ime/:lang/:type/:id/', function(req, res, next) {
      // to be moved in config
      var inquiryBase = 'http://www.modesofexistence.org/inquiry/index.php/?lang='+lang;
      // todo: build hash
      // TODO
      var hash = '#a=SET+VOC+LEADER&amp;c[leading]=VOC&amp;c[slave]=TEXT&amp;i[id]=#vocab-32&amp;i[column]=VOC&amp;s=0';
      http://www.m#a=SET+VOC+LEADER&amp;c[leading]=VOC&amp;c[slave]=TEXT&amp;i[id]=#vocab-1764&amp;i[column]=VOC&amp;s=0&amp;q=rep
      return res.redirect(inquiryBase+hash);
    });
    
    // 2) Old blog posts
    server.get('/ime/:lang/:type/:id/', function(req, res, next) {
      wordpress_redirect_ids
    };

    // 3) Link to MODE / CROSS !

    // end aime
};
