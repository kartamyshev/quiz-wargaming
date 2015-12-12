var { classSet, bindFunctions } = Utils.Common;
import ProgressBar from 'Widgets/ProgressBar/ProgressBar';
import Result from "Components/Result/Result";
import Button from 'Widgets/Button/Button';
import './Questions.styl';

class Questions extends React.Component {

	constructor(props, context) {
		super(props, context);

		let fns = ['acceptAnswer', 'handleCheckboxClick', 'handleRadioButtonClick'];
        bindFunctions(fns, {
            context: this
        });

		this.state = {
			questionIndex: 0,
			checkedList: [],
			singleValue: "",
			buttonIsDisabled: true
		};
	}

	clearChekedList() {
		this.setState({
			checkedList: []
		});
	}

	increaseQuestionIndex() {
		this.setState({
			questionIndex: this.state.questionIndex + 1
		});
	}

	renderAcceptButton() {
		let classes = classSet({
			"disabled": this.state.buttonIsDisabled
		});
		let props = {
			className: classes,
			onClick: this.acceptAnswer,
			label: "Продолжить"
		};

		return <Button {...props} />;
	}

	handleCheckboxClick(e) {
		let checkedList = _.clone(this.state.checkedList);
		let value = e.target.value;

		if (e.target.checked) {
			checkedList.push(value);
			e.target.parentNode.classList.add('checked');
		} else {
			e.target.parentNode.classList.remove('checked');
			var index = checkedList.indexOf(value);
			if (index > -1) {
			    checkedList.splice(index, 1);
			}
		}

		this.setState({
			checkedList: checkedList,
		}, () => {
			this.setState({
				buttonIsDisabled: this.state.checkedList.length === 0
			});
		});
	}

	calculatePropsForProgressBar() {
		if (this.isQuestionsListEmpty()) return;
		let ratio = +(this.state.questionIndex / this.props.questions.length).toFixed(2);
		let width = (ratio * 100) + '%';
		let opacity = ratio;

		return { width, opacity };
	}

	renderProgressBar() {
		let { width, opacity } = this.calculatePropsForProgressBar();
		let style = { width, opacity: 1 };
		let isInitial = this.state.questionIndex === 0;

		let shouldShow = this.props.shouldShowProgressBar && this.props.answers.length !== this.props.questions.length;
		let info;

		if (isInitial) {
			info = "Progess appears here";
		} else {
			info = `${this.state.questionIndex} / ${this.props.questions.length}`;
			style.opacity = opacity;
		}

		return <ProgressBar
			style={style}
			shouldShow={shouldShow}
			info={info}
		/>;
	}

	isLastQuestion() {
		return this.state.questionIndex === this.props.questions.length;
	}

	isQuestionsListEmpty() {
		return this.props.questions.length === 0;
	}

	acceptAnswer() {
		let item = this.props.questions[this.state.questionIndex];

		let singleValue = this.state.singleValue;
		let multipleValues = this.state.checkedList;

		let { id, question } = item;
		let answer = item.multiple ? multipleValues : singleValue;
		let adjustedAnswer = { id, question, answer };

		this.context.flux.getActions('main').sendAnswer(adjustedAnswer);
		this.clearChekedList();

		this.setState({
			questionTransition: true,
			buttonIsDisabled: true
		}, () => {
			this.timeout = setTimeout(() => {
				this.increaseQuestionIndex();
				this.setState({
					questionTransition: false,
				});
				[].forEach.call(document.querySelectorAll('.transition-field label'), (label, index) => {
					this.removeCheckedTimeout = setTimeout(() => {
						label.classList.remove('checked');
					}, 80 * index);
				});
			}, 300);
		});
	}

	handleRadioButtonClick(e) {
		this.setState({
			singleValue: e.target.value,
			buttonIsDisabled: false
		});
	}

	renderQuestion(index) {
		if (this.isQuestionsListEmpty() || this.isLastQuestion()) return;
		let progressBar = this.renderProgressBar();

		let item = this.props.questions[index];
		let inputProps = {
			name: `answer-${item.id}`,
			defaultChecked: false
		};
		let acceptButton = this.renderAcceptButton();

		if (item.multiple) {
			inputProps.type = "checkbox";
			inputProps.onChange = this.handleCheckboxClick;
		} else {
			inputProps.type = "radio";
			inputProps.onChange = this.handleRadioButtonClick;
			inputProps.checked = false;
		}

		let answers = item.answers.map((answer, index) => {
			let className = answer === this.state.singleValue ? "checked" : "";
			return <label className={className} key={`answer-${index}`}>
				<input value={answer} {...inputProps} />
				{ answer }
			</label>
		});

		let classes = {
			"question-container": true,
			"visible": this.props.shouldShowQuestions
		};
		let transitionClasses = classSet({
			"transition-field": true,
			"in-progress": this.state.questionTransition === true
		});
		return <div className={classSet(classes)}>
			<div className={"label-title " + transitionClasses}>
				{item.id}. { item.question }
			</div>
			{ progressBar }
			<div className={transitionClasses}>
				{ answers }
			</div>

			{ acceptButton }
		</div>;
	}

	renderResult() {
		if (!this.isLastQuestion()) return;
		return <Result answers={this.props.answers} />;
	}

	render() {
		let currentQuestion = this.renderQuestion(this.state.questionIndex);
		let result = this.renderResult();

		let classes = {
			"questions": true,
			"visible": this.props.shouldShowQuestions
		};

		return <div className={classSet(classes)}>
			{ currentQuestion }
			{ result }
		</div>;
	}

}

Questions.contextTypes = {
    flux: React.PropTypes.object.isRequired
};

export default Questions;
