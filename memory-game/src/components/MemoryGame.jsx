import { Component, Fragment } from "react";
import { v4 as uuidv4 } from 'uuid';
import Message from "./Message";
import './MemoryGame.css'

class MemoryGame extends Component {
    state = {
        cardClicksCounter: 1,
        movesCounter: 0,
        gameTimer: 0,
        cards:
            [
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2019/10/15/13/40/winter-4551699__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2019/10/15/13/40/winter-4551699__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2021/09/17/03/24/forest-6631518__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2021/09/17/03/24/forest-6631518__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2014/04/05/11/20/green-315216__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2014/04/05/11/20/green-315216__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2015/04/27/13/40/spring-flowers-741965__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2015/04/27/13/40/spring-flowers-741965__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2019/07/25/06/51/thuja-4361821__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2019/07/25/06/51/thuja-4361821__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2020/08/17/19/01/clouds-5496227__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2020/08/17/19/01/clouds-5496227__340.jpg", isClicked: false, id: uuidv4() },

            ]
    }
    TimerId = null;
    cardToCompare = null;
    disabled = true;
    numOfPairs = 6;

    startGame = () => {
        this.TimerId = setInterval(() => {
            this.setState({
                gameTimer: this.state.gameTimer + 1,
            })
        }, 1000)
        // this.shuffleCards()
        this.disabled = false;
    }

    shuffleCards = () => {
        for (let i = this.state.cards.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [this.state.cards[i], this.state.cards[randomIndex]] = [this.state.cards[randomIndex], this.state.cards[i]];
        }
    }

    cardClicksCounter = () => {
        this.setState({ cardClicksCounter: this.state.cardClicksCounter + 1 })
    }

    movesIncreaseHandler = () => {
        if (this.state.cardClicksCounter === 2) {
            this.setState({ movesCounter: this.state.movesCounter + 1 })
            this.setState({ cardClicksCounter: 1 })
        }
    }

    mainCardsClicksHandler = (cardId) => {
        const card = this.state.cards.find((cardToFind) => cardToFind.id === cardId)
        card.isClicked = true;
        this.setState({ ...this.state });
        this.isCardsEqual(card)
        this.cardClicksCounter()
        this.movesIncreaseHandler()
    }

    isCardsEqual = (card) => {
        if (!this.state.cardToCompare) {
            this.setState({ cardToCompare: card })
        } else {
            if (this.state.cardToCompare.frontContent === card.frontContent && this.state.cardToCompare.id !== card.id) {
                this.numOfPairs = this.numOfPairs - 1;
                this.setState({ cardToCompare: null })
                this.isGameOver()
            }
            else {
                setTimeout(
                    () => {
                        this.state.cardToCompare.isClicked = false;
                        card.isClicked = false;
                        this.setState({ cardToCompare: null });
                    },
                    1000
                );
            }
        }
    }

    isGameOver = () => {
        if (this.numOfPairs === 0) {
            clearInterval(this.TimerId)
            setTimeout(
                () => {
                    let tempArr = []
                    for (let i = 0; i < this.state.cards.length; i++) {
                        let newObj = this.state.cards[i].isClicked = false;
                        tempArr.push(newObj)
                    }
                    this.setState({ cardToCompare: null });
                    this.setState({ gameTimer: 0 })
                    this.setState({ movesCounter: 0 })
                    // this.numOfPairs = 6;
                },
                4000
            );
        }
    }

    render() {
        const gameOverMessage = this.numOfPairs === 0 ? <Message movesCounter={this.state.movesCounter} gameTimer={this.state.gameTimer} /> : "";
        return (
            <Fragment>
                <div className="MemoryGame">
                    {this.state.cards.map((card) =>
                        <button disabled={this.disabled} key={card.id}
                            onClick={() => this.mainCardsClicksHandler(card.id)}
                        ><img src={card.isClicked == true ? card.frontContent : card.cardBack} alt="game cards" />
                        </button >
                    )}
                    <button className="startGameBtn" onClick={this.startGame}>Start Game</button>
                    <h2>Game Timer: {this.state.gameTimer}</h2>
                    <h2>Moves Counter: {this.state.movesCounter}</h2>
                </div>
                {gameOverMessage}
            </Fragment>
        )
    }
}
export default MemoryGame;