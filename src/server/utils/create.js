var _ = require('lodash');

module.exports = function create(array, options) {
	options = options || {};
	if (!_.isFunction(options.item)) {
		options.item = function(id) {
			return {
				id: ++id
			};
		}
	}
	array = [];
	_.times(options.times || 0, function(n) {
		array.push(options.item(n));
	});
	return array;
}
