import React from 'react';

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pc1Score:this.props.scores[0],
            pc2Score:this.props.scores[1],
            pc3Score:this.props.scores[2],
            userScore:this.props.scores[3],
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log("zmiana propsow");
        this.setState({
            pc1Score:nextProps.scores[0],
            pc2Score:nextProps.scores[1],
            pc3Score:nextProps.scores[2],
            userScore:nextProps.scores[3],
        })
    }
    render(){
        console.log(this.props.scores);
        return <div className="row">
                <div className="header">
                        <div className="header-logo">Black-Jack</div>
                        <div className="header-score">
                            <nav>
                                <ul>
                                    <li><a href="#">PC1 score:{this.state.pc1Score}</a></li>
                                    <li><a href="#">PC2 score:{this.state.pc2Score}</a></li>
                                    <li><a href="#">PC3 score:{this.state.pc3Score}</a></li>
                                    <li><a href="#">User score:{this.state.userScore}</a></li>
                                </ul>
                            </nav>
                        </div>
                </div>
        </div>
    }
}
export {Header}

