import React from 'react';
import {Header} from './header.jsx';
import {CenterDiv} from './CenterDiv.jsx';

class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
            score:0,
            }
        }


    render() {
        return <div>
            <Header score={this.state.score}/>
            <CenterDiv />
        </div>
    }
}

export {App}