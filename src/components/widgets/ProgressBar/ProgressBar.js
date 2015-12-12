var { classSet } = Utils.Common;
import './ProgressBar.styl';

class ProgressBar extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		let classes = {
			"progress-bar": true,
			"visible": this.props.shouldShow
		};
		let { width, opacity } = this.props.style;

		return <div className={classSet(classes)}>
			<div className="progress-bg" style={{ width, opacity }} />
			<div className="progress-info" style={{ opacity }}>
				{this.props.info}
			</div>
		</div>;
	}
}

ProgressBar.contextTypes = {
	flux: React.PropTypes.object.isRequired
};

ProgressBar.propTypes = {
	style: React.PropTypes.object.isRequired,
	shouldShow: React.PropTypes.bool.isRequired,
	info: React.PropTypes.string.isRequired
};

export default ProgressBar;
