import React, {Component} from 'react';
import Logo from 'components/Logo';
import './index.css';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pathToFile: 'src/containers/MainPage/index.jsx',
            counter: 0
        };
    }

    componentDidMount() {
        setInterval(this.increaseCounter, 1000);
    }

    increaseCounter = () => {
        this.setState({
            counter: this.state.counter + 1
        });
    }

    render() {
        const {pathToFile, counter} = this.state;
        const title = 'Welcome to React';
        return (
            <div className='App'>
                <div className='App-header'>
                    <Logo className='App-logo' alt='logo' />
                    <h2>
                        {title}
                    </h2>
                </div>
                <p className='App-intro'>
                    {'To get started, edit '}
                    <code>{pathToFile}</code>
                    {' and save to reload.'}
                </p>
                <p className='App-intro'>
                    {`Infinity increasing counter: ${counter}`}
                </p>
            </div>
        );
    }
}

export default MainPage;
