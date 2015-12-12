import { Actions } from 'flummox';

class MainActions extends Actions {

	getQuizCategories() {
		return Please.get(`${SERVER_URL}/categories`, {
			promise: true
		}).then(d => {
			return JSON.parse(d);
		});
	}

	getQuestionsByCategory(category) {
		return Please.get(`${SERVER_URL}/${category}`, {
			promise: true
		}).then(d => {
			return JSON.parse(d);
		});
	}

	sendAnswer(obj) {
		return Please.post(`${SERVER_URL}/answers`, JSON.stringify(obj), {
			promise: true
		});
	}

}

export default MainActions;
