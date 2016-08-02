require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
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
        "backboneLocalStorage": "assets/backbone.localStorage",
        "backbone": "assets/backbone",
        "text": "assets/text"
    },
    shim: {
        'dateFormat': ['jquery'],
        'backbone': ['underscore', 'jquery'],
        'backboneLocalStorage': {
            deps: ['backbone'],
            exports: 'Backbone.LocalStorage'
        },
        'jquery-ui': {
            deps: ['jquery'],
            exports: 'jquery-ui'
        }
    }
});