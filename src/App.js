import FluxComponent from 'flummox/component';
import flux from './Flux';
import CategorySelector from 'Widgets/CategorySelector/CategorySelector';
import Questions from 'Components/Questions/Questions';
import 'Css/App.styl';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        window.SERVER_URL = require('./Settings.js').SERVER_URL;
    }

    render() {
        return (
            <div role="main">
                <div className="copyright">
                    <div>Kartamyshev</div>
                    <div>Konstantin</div>
                </div>
                <FluxComponent connectToStores={['main']}>
                    <CategorySelector />
                </FluxComponent>
                <FluxComponent connectToStores={['main']}>
                    <Questions />
                </FluxComponent>
            </div>
        );
    }
}

App.defaultProps = {

};

App.contextTypes = {
    flux: React.PropTypes.object.isRequired
};

ReactDOM.render(
    <FluxComponent flux={flux}>
        <App />
    </FluxComponent>,
    document.getElementById('application-container')
);
