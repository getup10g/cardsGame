import React from 'react';
import axios from 'axios';


class CenterDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deckId:0,
            pc1Score:0,
            pc2Score:0,
            pc3Score:0,
            userScore:0,
            pc1Cards:0,
            pc2Cards:0,
            pc3Cards:0,
            userCards:[]

        }
    }
    setNewDeck(){
        axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then( obj => {
                this.setState({
                    deckId:obj.data.deck_id
                });
            console.log('deck Number:',obj.data.deck_id);
        }).catch( err => {
            console.log('Błąd!', err);});
    }
    shuffleTheCards(number){
            axios.get('https://deckofcardsapi.com/api/deck/j9fmdpplfitp/draw/?count='+number)
                .then( obj => {
                    console.log('card:',obj.data.cards[0].code);
                    return obj.data.cards[0].code;
                }).catch( err => {
                console.log('Błąd!', err);});
    }

    setUserCards(number){
        let cardsList=[];
        for(let i =0;i<number;i++){
            cardsList.push(this.shuffleTheCards(1));
        }
        cardsList=this.addLinks(cardsList);
        this.setState({
            userCards:[...this.state.userCards,cardsList]
        })
    }
    addLinks(array){
        let cardsLink="https://deckofcardsapi.com/static/img/";
       let cardsArray = array.map((card) => {
                    let link =cardsLink + card + "png";
                    return <img src={link}/>;
                });
        return cardsArray;
    }

    componentDidMount(){
        //this.setNewDeck();
        this.shuffleTheCards(1);
        this.setUserCards();


    }




    render() {
        return <div className="row " >
            <div className="col-12">
                <div className="centerDiv">
                    <div className="row " >
                        <div className="col-12">
                            <div className="pc-cards pc1">
                                <img src="http://deckofcardsapi.com/static/img/2D.png"/>
                            </div>
                        </div>
                    </div>
                    <div className="row " >
                        <div className="col-1">
                            <div className="pc-cards pc3">
                                <img src="http://deckofcardsapi.com/static/img/2D.png"/>
                            </div>
                        </div>
                        <div className="col-10">
                            <div className="game-area">
                            </div>
                        </div>
                        <div className="col-1">
                            <div className="pc-cards pc2">
                                <img src="http://deckofcardsapi.com/static/img/3D.png"/>
                            </div>
                        </div>
                    </div>
                    <div className="row " >
                        <div className="col-12">
                            <div className="user-cards">
                                {this.state.userCards}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
export {CenterDiv}

