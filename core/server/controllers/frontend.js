/**
 * Main controller for Ghost frontend
 */

/*global require, module */

var Ghost   = require('../../ghost'),
    config  = require('../config'),
    api     = require('../api'),
    RSS     = require('rss'),
    _       = require('underscore'),
    errors  = require('../errorHandling'),
    when    = require('when'),
    url     = require('url'),
    filters = require('../../server/filters'),

    ghost  = new Ghost(),
    frontendControllers;

// aime
var i18n = require('i18n');

// ( to be moved to config.js ? ) following to also give current tag to the template when looking at an article
var ourCategories = ['event','discuss','material','tool'];

frontendControllers = {

    // aime
    shortenerElements: function(req, res, next) {
      try {
        var lang = req.params.lang,
            inquiryBase = config().inquiry_url+'/index.php/?lang='+lang,
            type = req.params.type,
            id = req.params.id,
            trans = {
              'voc':'vocab',
              'doc':'doc',
              'cont':'cont',
            };
        
        if(isNaN(parseInt(id))) {
          id = id.toUpperCase();
          var modecross = config().modecross_ids;
          if(modecross.hasOwnProperty(lang)) {
            var spl = id.split("-");
            if(spl.length==1) {
              if(modecross[lang].hasOwnProperty(id)) {
                id = modecross[lang][id];
              } else
                throw "unknown mode: "+id;
            } else if(spl.length==2) {
              var reversed = spl[1]+"-"+spl[0];
              if(modecross[lang].hasOwnProperty(id)) {
                id = modecross[lang][id];
              } else if(modecross[lang].hasOwnProperty(reversed)) {
                id = modecross[lang][reversed];
              } else throw "unknown cross: "+id; 
            } else throw "bad form: "+id;
          } else throw "unknown lang: "+lang;
        }
        
        if(trans.hasOwnProperty(type))
          var idstr = trans[type]+"-"+id;
        else throw "unknown type: "+type;

        var tu = type.toUpperCase();
        var hash = '#a=SET+'+tu+'+LEADER&c[leading]='+tu+'&i[id]=#'+idstr+'&i[column]='+tu;
        
        if(type=='cont')
          hash = '#a=CONTRIB&c[leading]=COM&i[id]=#'+idstr+'&i[column]=COM';
        
        console.log(hash);
        
        return res.redirect(inquiryBase + hash);

      } catch(err) {
        var e = new Error(err);
        e.status = err.errorCode;
        return next(e); 
      }
    },
    oldposts: function(req, res, next) {
      var root = ghost.blogGlobals().path === '/' ? '' : ghost.blogGlobals().path;
      var pid = req.param('p') || req.param('page_id');
      if(pid) {
        var slug = config().wordpress_redirects[pid] || '/';
        console.log("redirect to: "+slug);
        return res.redirect(root +'/'+ slug);
      } else {
        return res.redirect(root + '/');
      }
    },
    'setlang': function (req, res, next) {
        var root = ghost.blogGlobals().path === '/' ? '' : ghost.blogGlobals().path;
        i18n.setLocale(req.params.lang);
        return res.redirect(root + '/');
    },
    'tag': function (req, res, next) {
        var options = {
            tag: req.params.tag
        };
        api.posts.getbytag(options).then(function(posts) {
            res.render('tag', {
              posts: posts,
              tag: options.tag
            });
        }).otherwise(function (err) {
            var e = new Error(err.message);
            e.status = err.errorCode;
            return next(e);
        });
    },
    'homepage': function (req, res, next) {
        var root = ghost.blogGlobals().path === '/' ? '' : ghost.blogGlobals().path,
            // Parse the page number
            pageParam = req.params.page !== undefined ? parseInt(req.params.page, 10) : 1,
            postsPerPage = parseInt(ghost.settings('postsPerPage'), 10),
            options = {};

        // No negative pages
        if (isNaN(pageParam) || pageParam < 1) {
            //redirect to 404 page?
            return res.redirect(root + '/');
        }
        options.page = pageParam;

        // Redirect '/page/1/' to '/' for all teh good SEO
        if (pageParam === 1 && req.route.path === '/page/:page/') {
            return res.redirect(root + '/');
        }

        // No negative posts per page, must be number
        if (!isNaN(postsPerPage) && postsPerPage > 0) {
            options.limit = postsPerPage;
        }

        api.posts.browse(options).then(function (page) {
            var maxPage = page.pages;

            // A bit of a hack for situations with no content.
            if (maxPage === 0) {
                maxPage = 1;
                page.pages = 1;
            }

            // If page is greater than number of pages we have, redirect to last page
            if (pageParam > maxPage) {
                return res.redirect(maxPage === 1 ? root + '/' : (root + '/page/' + maxPage + '/'));
            }

            // Render the page of posts
            filters.doFilter('prePostsRender', page.posts).then(function (posts) {
                res.render('index', {posts: posts, pagination: {page: page.page, prev: page.prev, next: page.next, limit: page.limit, total: page.total, pages: page.pages}});
            });
        }).otherwise(function (err) {
            var e = new Error(err.message);
            e.status = err.errorCode;
            return next(e);
        });
    },
    // end aime

    'blog': function (req, res, next) {
        var root = ghost.blogGlobals().path === '/' ? '' : ghost.blogGlobals().path,
            // Parse the page number
            pageParam = req.params.page !== undefined ? parseInt(req.params.page, 10) : 1,
            postsPerPage = parseInt(ghost.settings('postsPerPage'), 10),
            options = {};

        // No negative pages
        if (isNaN(pageParam) || pageParam < 1) {
            //redirect to 404 page?
            return res.redirect(root + '/');
        }
        options.page = pageParam;

        // Redirect '/page/1/' to '/' for all teh good SEO
        // if (pageParam === 1 && req.route.path === '/page/:page/') {
        //     return res.redirect(root + '/');
        // }

        // No negative posts per page, must be number
        if (!isNaN(postsPerPage) && postsPerPage > 0) {
            options.limit = postsPerPage;
        }

        api.posts.browse(options).then(function (page) {
            var maxPage = page.pages;

            // A bit of a hack for situations with no content.
            if (maxPage === 0) {
                maxPage = 1;
                page.pages = 1;
            }

            // If page is greater than number of pages we have, redirect to last page
            if (pageParam > maxPage) {
                return res.redirect(maxPage === 1 ? root + '/' : (root + '/page/' + maxPage + '/'));
            }

            // Render the page of posts
            filters.doFilter('prePostsRender', page.posts).then(function (posts) {
                res.render('blog', {posts: posts, pagination: {page: page.page, prev: page.prev, next: page.next, limit: page.limit, total: page.total, pages: page.pages}});
            });
        }).otherwise(function (err) {
            var e = new Error(err.message);
            e.status = err.errorCode;
            return next(e);
        });
    },
    'single': function (req, res, next) {
        api.posts.read(_.pick(req.params, ['id', 'slug']), {withPrevNext: true} ).then(function (post) {
            if (post) {
                filters.doFilter('prePostsRender', post).then(function (post) {
                    var paths = config.paths().availableThemes[ghost.settings('activeTheme')];
                        var cats = _.map(post.tags,function(t) { return t.name; });
                        cats = _.intersection(cats,ourCategories);
                    if (post.page && paths.hasOwnProperty('page')) {
                        res.render('page', {post:post, tag:cats.pop()});
                    } else {
                        res.render('post', {post:post, tag:cats.pop()});
                    }
                });
            } else {
                next();
            }

        }).otherwise(function (err) {
            var e = new Error(err.message);
            e.status = err.errorCode;
            return next(e);
        });
    },
    'rss': function (req, res, next) {
        // Initialize RSS
        var siteUrl = config().url,
            root = ghost.blogGlobals().path === '/' ? '' : ghost.blogGlobals().path,
            pageParam = req.params.page !== undefined ? parseInt(req.params.page, 10) : 1,
            feed;
        //needs refact for multi user to not use first user as default
        api.users.read({id : 1}).then(function (user) {
            feed = new RSS({
                title: ghost.settings('title'),
                description: ghost.settings('description'),
                generator: 'Ghost v' + res.locals.version,
                author: user ? user.name : null,
                feed_url: url.resolve(siteUrl, '/rss/'),
                site_url: siteUrl,
                ttl: '60'
            });

            // No negative pages
            if (isNaN(pageParam) || pageParam < 1) {
                return res.redirect(root + '/rss/');
            }

            if (pageParam === 1 && req.route.path === root + '/rss/:page/') {
                return res.redirect(root + '/rss/');
            }

            api.posts.browse({page: pageParam}).then(function (page) {
                var maxPage = page.pages;

                // A bit of a hack for situations with no content.
                if (maxPage === 0) {
                    maxPage = 1;
                    page.pages = 1;
                }

                // If page is greater than number of pages we have, redirect to last page
                if (pageParam > maxPage) {
                    return res.redirect(root + '/rss/' + maxPage + '/');
                }

                filters.doFilter('prePostsRender', page.posts).then(function (posts) {
                    posts.forEach(function (post) {
                        var item = {
                                title:  _.escape(post.title),
                                guid: post.uuid,
                                url: siteUrl + '/' + post.slug + '/',
                                date: post.published_at
                            },
                            content = post.html;

                        //set img src to absolute url
                        content = content.replace(/src=["|'|\s]?([\w\/\?\$\.\+\-;%:@&=,_]+)["|'|\s]?/gi, function (match, p1) {
                            /*jslint unparam:true*/
                            p1 = url.resolve(siteUrl, p1);
                            return "src='" + p1 + "' ";
                        });
                        //set a href to absolute url
                        content = content.replace(/href=["|'|\s]?([\w\/\?\$\.\+\-;%:@&=,_]+)["|'|\s]?/gi, function (match, p1) {
                            /*jslint unparam:true*/
                            p1 = url.resolve(siteUrl, p1);
                            return "href='" + p1 + "' ";
                        });
                        item.description = content;
                        feed.item(item);
                    });
                    res.set('Content-Type', 'text/xml');
                    res.send(feed.xml());
                });
            });
        }).otherwise(function (err) {
            var e = new Error(err.message);
            e.status = err.errorCode;
            return next(e);
        });
    }
};

module.exports = frontendControllers;
