var { classSet } = Utils.Common;
import Button from 'Widgets/Button/Button';
import './Result.styl'

function getAnswerIsMultiple(answer) {
	return Array.isArray(answer);
}

class Result extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.getQuizCategories = this.getQuizCategories.bind(this);
	}

	getQuizCategories() {
		/*this.context.flux.getActions('main').getQuizCategories();*/
		location.reload();
	}

	renderButton() {
		return <Button
			label="Пройти ещё раз" 
			onClick={this.getQuizCategories}
		/>;
	}

	render() {
		let button = this.renderButton();

		var items = this.props.answers.map(item => {
			item = JSON.parse(item);

			var itemHasMultipleAnswers = getAnswerIsMultiple(item.answer);
			var answer;

			if (itemHasMultipleAnswers) {
				answer = item.answer.map(part => {
					return part;
				}).join("; ");
			} else {
				answer = item.answer;
			}

			return <div className="result-item" key={`item-${item.id}`}>
				<div className="result-item-question">
					{ item.question }
				</div>
				<div className="result-item-answer">
					{ answer }
				</div>
			</div>;
		});

		let classes = classSet({
			"result": true,
			"visible": this.props.answers.length
		});

		return <div className={classes}>
			<div className="result-label">Результаты:</div>
			<div className="result-scrollable">
				{ items }
			</div>
			{ button }
		</div>;
	}
}

Result.contextTypes = {
    flux: React.PropTypes.object.isRequired
};

Result.propTypes = {
	answers: React.PropTypes.array.isRequired
};

export default Result;
