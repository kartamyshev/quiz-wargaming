import _ from 'lodash';

export default function create(array, options) {
	options = options || {};
	if (!_.isFunction(options.item)) {
		options.item = (id) => {
			return {
				id: ++id
			};
		}
	}
	array = [];
	_.times(options.times || 0, n => {
		array.push(options.item(n));
	});
	return array;
}