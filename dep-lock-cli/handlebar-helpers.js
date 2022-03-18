const Handlebars = require('handlebars');
const meta = require('../meta');

Handlebars.registerHelper('if_eq', function(a, b, opts){
    return a === b
        ? opts.fn(this)
        : opts.inverse(this);
});
Handlebars.registerHelper('unless_eq', function(a, b, opts){
    return a === b
        ? opts.inverse(this)
        : opts.fn(this);
});
Object.keys(meta.helpers).forEach(helperName => {
    const helperFunc = meta.helpers[helperName];
    Handlebars.registerHelper(helperName, helperFunc);
});
