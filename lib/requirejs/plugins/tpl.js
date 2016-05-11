define(['module', './text', 'artTemplate'], function (module, text, artTemplate) {
    return {
        load: function (name, req, onLoad, config) {
            text.load(name, req, function (content) {
                onLoad(artTemplate.compile(content));
            }, config);
        }
    }
});