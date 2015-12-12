var { bindFunctions, classSet, adjustCategory } = Utils.Common;
import './CategorySelector.styl';

class CategorySelector extends React.Component {
    constructor(props, context) {
        super(props, context);

		let fns = ['handleSelectCategory'];
        bindFunctions(fns, {
            context: this
        });

		this.state = {

		};
		this.mainActions = this.context.flux.getActions('main');
        this.disappearanceModes = _.range(1, 6).map(index => {
            return `disappearance-mode-${index}`
        });
    }

    componentWillMount() {
        this.mainActions.getQuizCategories();
    }

	handleSelectCategory(e) {
        this.mainActions.getQuestionsByCategory(e.target.value);
	}

	renderCategories() {
		return this.props.categories.map(category => {
            let props = {
                onClick: this.handleSelectCategory,
                name: "choose-category",
                type: "radio",
                value: category.name
            };
            return <label key={`type-${category.id}`}>
                <input {...props} />
                { adjustCategory(category.name) }
            </label>
        });
	}

    render() {
        let categories = this.renderCategories();
        let classes = {
            "category-selector": true,
            "visible": this.props.shouldShowCategorySelector,
            [_.sample(this.disappearanceModes)]: this.props.shouldHideCategorySelectorWithAnimation
        };
        return <div className={classSet(classes)}>
            <div className="category-selector-inner">
                <div className="label-title">Пожалуйста, выберите тему для прохождения опроса</div>
        	   { categories }
            </div>
		</div>;
    }
}

CategorySelector.contextTypes = {
    flux: React.PropTypes.object.isRequired
};

export default CategorySelector;
