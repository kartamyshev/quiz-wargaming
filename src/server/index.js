export default function() {
	return {
		categories: require('./endpoint/categories'),

		entertainment: require('./endpoint/questions/entertainment'),
		politics: require('./endpoint/questions/politics'),
		relaxation: require('./endpoint/questions/relaxation'),
		social: require('./endpoint/questions/social'),
		sports: require('./endpoint/questions/sports'),

		answers: require('./endpoint/answers')
	};
};
