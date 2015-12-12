var { classSet } = Utils.Common;
import './Button.styl';

class Button extends React.Component {
	render() {
		let classes = {
			"button": true
		};
		if (this.props.className) {
			classes[this.props.className] = true;
		}

		let props = {
			className: classSet(classes),
			onClick: this.props.onClick
		}

		return <div {...props}>
			{ this.props.label }
		</div>;
	}
}

Button.defaultProps = {
	label: "Подтвердить"
};

Button.propTypes = {
	className: React.PropTypes.string,
	label: React.PropTypes.string,
	onClick: React.PropTypes.func
};

export default Button;
