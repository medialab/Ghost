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

frontendControllers = {

    // aime
    'setlang': function (req, res, next) {
        i18n.setLocale(req.params.lang);
        return res.redirect('/');
    },
    'tag': function (req, res, next) {
        var options = {
            tag: req.params.tag
        };
        api.posts.getbytag(options).then(function(posts) {
            res.render('tag', { posts: posts });
        }).otherwise(function (err) {
            return next(new Error(err));
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
                res.render('blog', {posts: posts, pagination: {page: page.page, prev: page.prev, next: page.next, limit: page.limit, total: page.total, pages: page.pages}});
            });
        }).otherwise(function (err) {
            var e = new Error(err.message);
            e.status = err.errorCode;
            return next(e);
        });
    },
    'single': function (req, res, next) {
        api.posts.read(_.pick(req.params, ['id', 'slug'])).then(function (post) {
            if (post) {
                filters.doFilter('prePostsRender', post).then(function (post) {
                    var paths = config.paths().availableThemes[ghost.settings('activeTheme')];
                    if (post.page && paths.hasOwnProperty('page')) {
                        res.render('page', {post: post});
                    } else {
                        res.render('post', {post: post});
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
