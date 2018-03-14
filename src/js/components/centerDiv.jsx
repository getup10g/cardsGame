import React from 'react';
import axios from 'axios';


class CenterDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deckId: "",
            pc1Score: 0,
            pc2Score: 0,
            pc3Score: 0,
            userScore: 0,
            pc1Cards: [],
            pc2Cards: [],
            pc3Cards: [],
            userCards: [],
            move: false,
            buttonNextCard: false,
            buttonDone: false,
            buttonWait: false,
            winner: "",
            winnerDiv: false,
            UserDecideFinished: false
        }
    }


    setNewDeck() {
        axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(obj => {
                this.setState({
                    deckId: obj.data.deck_id
                });
                //console.log('deck Number:',obj.data.deck_id);
                // console.log(this.state.deckId);
                this.shuffleTheCards(2, (array) => {
                    this.setState({
                        userCards: array
                    });
                });
                this.shuffleTheCards(2, (array) => {
                    this.setState({
                        pc1Cards: array
                    });
                });
                this.shuffleTheCards(2, (array) => {
                    this.setState({
                        pc2Cards: array
                    });
                });
                this.shuffleTheCards(2, (array) => {
                    this.setState({
                        pc3Cards: array
                    });
                });
            }).catch(err => {
            console.log('Błąd!', err);
        });

    }

    shuffleTheCards(number, callback) {
        let link = `https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`;
        let cardsArray = [];
        for (let i = 0; i < number; i++) {
            axios.get(link)
                .then(obj => {
                    cardsArray.push(obj.data.cards[0].code);
                    callback(cardsArray);
                }).catch(err => {
                console.log('Błąd!', err);
            });
        }
    }

    nextCard = () => {
        this.shuffleTheCards(1, (array) => {
            this.setState({
                userCards: [...this.state.userCards, ...array],
                move: true,
                UserDecideFinished: false,
                buttonNextCard: false,
                buttonDone: false,
                buttonWait: false,
            }, () => {
                this.calculateScoreForAll();
                this.sendScores();
                this.oponentsTurn();
            })
        });
        let interval=setInterval(()=> {
            this.setState({
                buttonNextCard: true,
                buttonDone: true,
                buttonWait: true,
            });
            clearInterval(interval);
        },3000);
    };

    wait = () => {
        this.sendScores();
        this.oponentsTurn();
        this.setState({
            UserDecideFinished: true,
            buttonNextCard: false,
            buttonDone: false,
            buttonWait: false,
        });
        let interval=setInterval(()=> {
            this.setState({
                buttonNextCard: true,
                buttonDone: true,
                buttonWait: true,
            });
            clearInterval(interval);
        },3000);
    };
    done = () => {
        this.setState({
            UserDecideFinished: true,
            buttonNextCard: false,
            buttonDone: false,
            buttonWait: false
        },()=>{this.oponentsTurn();});
        let finishedInterval=setInterval(()=>{
            console.log("interval jedzie");
            this.oponentsTurn();
            if (this.state.UserDecideFinished) {
                this.printWinner();}
            clearInterval(finishedInterval);
            },3000);

        };
    sendScores = () => {
        this.props.scores([this.state.pc1Score, this.state.pc2Score, this.state.pc3Score, this.state.userScore]);
    };

    calculateScore(array) {
        let scoreArray = ["empty", "empty", "2", "3", "4", "5", "6", "7", "8", "9", "0", "A"];
        let scoreArray2 = ["empty", "empty", "J", "Q", "K"];
        let newElement = "";
        let score = 0;
        array.forEach((element) => {
            newElement = element.substring(0, 1);
            //console.log("element", newElement);
            let index = scoreArray.indexOf(newElement);
            if (index === -1) {
                index = scoreArray2.indexOf(newElement);
            }
            //console.log("ind",index);
            score += Number(index);
        });
        return score;
    }

    calculateScoreForAll() {
        let userScore = this.calculateScore(this.state.userCards);
        let pc1Score = this.calculateScore(this.state.pc1Cards);
        let pc2Score = this.calculateScore(this.state.pc2Cards);
        let pc3Score = this.calculateScore(this.state.pc3Cards);
        this.setState({
            userScore: userScore,
            pc1Score: pc1Score,
            pc2Score: pc2Score,
            pc3Score: pc3Score
        }, () => {
            this.sendScores()
        });
    }

    addImg(array) {
        let newArray = array.map((link, index) => {
            let url = `http://deckofcardsapi.com/static/img/${link}.png`;
            return <img key={index} src={url}/>;
        });
        return newArray;
    }

    oponentsTurn() {
        let timer = setInterval(() => {
            let counter = 0;
            if (this.state.pc1Score < 16) {
                counter += 1;
                this.shuffleTheCards(1, (array) => {
                    this.setState({
                        pc1Cards: [...this.state.pc1Cards, ...array]
                    }, () => {
                        this.calculateScoreForAll();
                    });
                });
            }
            if (this.state.pc2Score < 17) {
                counter += 1;
                this.shuffleTheCards(1, (array) => {
                    this.setState({
                        pc2Cards: [...this.state.pc2Cards, ...array]
                    }, () => {
                        this.calculateScoreForAll();
                    });
                });
            }
            if (this.state.pc3Score < 18) {
                counter += 1;
                this.shuffleTheCards(1, (array) => {
                    this.setState({
                        pc3Cards: [...this.state.pc3Cards, ...array]
                    }, () => {
                        this.calculateScoreForAll();
                    });
                });
            }
            clearInterval(timer);
        }, 1000);

    }
    printWinner() {
        let timer = setInterval(()=>{
            let winner = "";
            let pc1 = [21 - this.state.pc1Score, "PC1 WON"];
            pc1[0] === 0 ? winner = "PC1 WON" : pc1[0] < 0 ? pc1[0] = 100 : null;
            let pc2 = [21 - this.state.pc2Score, "PC2 WON"];
            pc2[0] === 0 ? winner = "PC2 WON" : pc2[0] < 0 ? pc2[0] = 100 : null;
            let pc3 = [21 - this.state.pc3Score, "PC3 WON"];
            pc3[0] === 0 ? winner = "PC3 WON" : pc3[0] < 0 ? pc3[0] = 100 : null;
            let user = [21 - this.state.userScore, "User WON"];
            user[0] === 0 ? winner = "User WON" : user[0] < 0 ? user[0] = 100 : null;
            //console.log("pc1", pc1);
            //console.log("pc2", pc2);
            //console.log("pc3", pc3);
            //console.log("user", user);
            if (winner.length < 2) {
                let array = [];
                pc1[0] < pc2[0] ? array.push(pc1) : array.push(pc2);
                pc3[0] < user[0] ? array.push(pc3) : array.push(user);
                array[0][0] < array[1][0] ? winner = array[0][1] : winner = array[1][1];
            }
            this.setState({
                winner: winner,
                winnerDiv: true,
                buttonNextCard: false,
                buttonDone: false,
                buttonWait: false
            });
            clearInterval(timer);
        },3000);


    }

    componentWillMount() {
        this.setNewDeck();
    }

    componentDidMount() {
        let waitForCards = setInterval(() => {
            this.calculateScoreForAll();
            this.setState({
                buttonNextCard: true,
                buttonDone: true,
                buttonWait: true
            });
            clearInterval(waitForCards);
        }, 5000);

    }

    render() {
        let userCardsLinksList = this.addImg(this.state.userCards);
        let pc1CardsLinksList = this.addImg(this.state.pc1Cards);
        let pc2CardsLinksList = this.addImg(this.state.pc2Cards);
        let pc3CardsLinksList = this.addImg(this.state.pc3Cards);
        let nextCardButton = this.state.buttonNextCard ? <button onClick={this.nextCard}>Take next Card</button> : null;
        let waitButton = this.state.buttonWait ? <button onClick={this.wait}>Wait</button> : null;
        let winnerDiv = this.state.winnerDiv ? <div className="winner-div" onClick={this.repeat}><h1>{this.state.winner}</h1></div> : null;
        let doneButton = this.state.buttonDone ? <button onClick={this.done}>Done</button> : null;

        return <div className="row ">
                <div className="game-area">
                    <div className="row ">
                            <div className="pc-cards">
                                <div className="pc1">
                                    <span>PC1:</span> {pc1CardsLinksList}
                                    </div>
                            </div>
                        </div>
                    <div className="row">
                            <div className="pc-cards pc3">
                                <div className="pc3"><span>PC3:</span>{pc3CardsLinksList}</div>
                            </div>
                            <div className="center-area">
                                <div className="button-area">
                                    {nextCardButton}
                                    {waitButton}
                                    {winnerDiv}
                                    {doneButton}
                                </div>
                            </div>
                            <div className="pc-cards pc2">
                                <div className="pc2">
                                    <span>PC2:</span>{pc2CardsLinksList}
                                </div>
                            </div>
                    </div>
                    <div className="row ">
                            <div className="user-cards">
                                <div className="user">
                                    <span>User:</span> {userCardsLinksList}
                                </div>
                            </div>
                    </div>
                </div>
        </div>
    }
}

export {CenterDiv}

