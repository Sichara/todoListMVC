require.config({
    baseUrl: "./js",
    paths: {
        "assets": "assets",
        "utils": "utils",
        "models": "models",
        "collections": "collections",
        "views": "views",

        "jquery": "assets/jquery-2.2.4.min",
        "underscore": "assets/underscore",
        "dateFormat": "assets/jquery-dateFormat.min",
        "localstorage": "assets/backbone.localStorage",
        "backbone": "assets/backbone"
    },
    shim: {
        'dateFormat': ['jquery'],
        'backbone': ['underscore', 'jquery'],
        'localstorage': {
            deps: ['backbone'],
            exports: 'Backbone.LocalStorage'
        },
        'jquery-ui': {
            deps: ['jquery'],
            exports: 'jquery-ui'
        }
    }
});