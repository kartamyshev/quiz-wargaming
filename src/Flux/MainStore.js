import { Store } from 'flummox';

class MainStore extends Store {
	constructor(flux) {
		super();
		this.state = {
			categories: [],
			questions: [],

			shouldShowCategorySelector: false,
			shouldShowQuestions: false,
			shouldShowProgressBar: false,
			shouldHideCategorySelectorWithAnimation: false,

			answers: [],
		};

		let actions = flux.getActions('main');
		this.registerAsync(actions.getQuizCategories, null, this.handleGetQuizCategories, null);
		this.registerAsync(actions.getQuestionsByCategory, null, this.handleGetQuestionsByCategories, null);
		this.registerAsync(actions.sendAnswer, null, this.handleSendAnswer, null);
	}

	handleGetQuizCategories(categories) {
		this.setState({
			categories: categories,
			shouldShowCategorySelector: true
		});
	}

	handleGetQuestionsByCategories(questions) {
		this.setState({
			questions: questions,
			shouldShowCategorySelector: false,
			shouldShowQuestions: true,
			shouldShowProgressBar: true,
			shouldHideCategorySelectorWithAnimation: true
		});
	}

	handleSendAnswer(item) {
		let answers = _.clone(this.state.answers);
		answers.push(item);
		this.setState({
			answers: answers
		});
	}

}

export default MainStore;
