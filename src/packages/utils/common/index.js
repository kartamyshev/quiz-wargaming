"use strict";

function Common() {}

Common.classSet = function(obj) {
	return Object.keys(obj).filter(function(className) {
		return obj[className];
    }).join(' ');
}

Common.extendWithMixin = function(options) {
    Object.keys(options.from).forEach(function(fn) {
        options.to[fn] = options.from[fn];
    });
}

Common.bindFunctions = function(fns, opts) {
    if (!_.isArray(fns)) throw Error('parameter should be an array.');
    var context = opts.context;

    fns.forEach(function(fn) {
        context[fn] = context[fn].bind(context);
    });
}

Common.adjustCategory = function(category) {
    var mapped = {
        "politics": "Политика",
        "entertainment": "Пасхалочка",
        "sports": "Спорт",
        "social": "Социальный",
        "relaxation": "Отдых"
    }
    return mapped[category];
}

module.exports = Common;
