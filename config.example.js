// # Ghost Configuration
// Setup your Ghost install for various environments

var path = require('path'),
    mapping = require('./config_mappings.js'),
    config;

config = {
    // ### Development **(default)**
    development: {
        wordpress_redirects: mapping.wordpress,
        modecross_ids: mapping.modecross, // seems to be deprecated since /ime url-shortener is managed within crossings_server
        inquiry_url: 'http://aime.medialab.sciences-po.fr/inquiry_dev',
        crossings_url: 'http://aime.medialab.sciences-po.fr/crossings_dev/dist',
        // The url to use when providing links to the site, E.g. in RSS and email.
        // must not contain a path suffix after the hostname - "subdirs" are not (yet) supported! 
        url: 'http://aime.medialab.sciences-po.fr/',

        // Example mail config
        // Visit http://docs.ghost.org/mail for instructions
        // ```
        //  mail: {
        //      transport: 'SMTP',
        //      options: {
        //          service: 'Mailgun',
        //          auth: {
        //              user: '', // mailgun username
        //              pass: ''  // mailgun password
        //          }
        //      }
        //  },
        // ```

        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-dev.db')
            },
            debug: false
        },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2372'
        }
    },

    // ### Production
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: {
        wordpress_redirects: mapping.wordpress,
        modecross_ids: mapping.modecross,
        inquiry_url: 'http://modesofexistence.org/inquiry',
        crossings_url: 'http://modesofexistence.org/crossings',
        // must not contain a path suffix after the hostname - "subdirs" are not (yet) supported! 
        url: 'http://my-ghost-blog.com',
        mail: {},
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost.db')
            },
            debug: false
        },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        }
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-test.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        }
    },

    // ### Travis
    // Automated testing run through GitHub
    'travis-sqlite3': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-travis.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        }
    },

    // ### Travis
    // Automated testing run through GitHub
    'travis-mysql': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '127.0.0.1',
                user     : 'travis',
                password : '',
                database : 'ghost_travis',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        }
    },

    // ### Travis
    // Automated testing run through GitHub
    'travis-pg': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '127.0.0.1',
                user     : 'postgres',
                password : '',
                database : 'ghost_travis',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        }
    }
};

// Export config
module.exports = config;
