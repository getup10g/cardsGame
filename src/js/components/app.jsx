import React from 'react';
import {Header} from './header.jsx';
import {CenterDiv} from './CenterDiv.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           scores:[]
        };
    }
    setScores=(array)=>{
        this.setState({
            scores:array
        })
    };

    render() {

        return <div className={"grid-container"}>
            <Header scores={this.state.scores}/>
            <CenterDiv scores={this.setScores}/>
        </div>
    }
}

export {App}