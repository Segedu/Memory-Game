import { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import './MemoryGame.css';

class MemoryGame extends Component {
    state = {
        clickedCard: null,
        clicksCounter: 1,
        movesCounter: 0,
        GameTimer: 0,
        GameOverChecker: 6,
        cards:
            [
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2019/10/15/13/40/winter-4551699__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2019/10/15/13/40/winter-4551699__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2021/09/17/03/24/forest-6631518__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2021/09/17/03/24/forest-6631518__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2014/04/05/11/20/green-315216__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2014/04/05/11/20/green-315216__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2015/04/27/13/40/spring-flowers-741965__340.jpg", isClicked: false, id: uuidv4() },
                { cardBack: "https://cdn.pixabay.com/photo/2020/08/26/15/24/focus-5519780__340.jpg", frontContent: "https://cdn.pixabay.com/photo/2015/04/27/13/40/spring-flowers-741965__340.jpg", isClicked: false, id: uuidv4() }
            ]
    }
    setIntervalTimerId = null;

    startGame = () => {
        this.shuffleCards()
        this.setIntervalTimerId = setInterval(() => {
            this.setState({
                GameTimer: this.state.GameTimer + 1,
            })
        }, 1000)
    }

    shuffleCards = () => {
        for (let i = this.state.cards.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [this.state.cards[i], this.state.cards[randomIndex]] = [this.state.cards[randomIndex], this.state.cards[i]];
        }
    }

    clicksCounter = () => {
        this.setState({ clicksCounter: this.state.clicksCounter + 1 })
    }

    movesIncreaseHandler = () => {
        if (this.state.clicksCounter === 2) {
            this.setState({ movesCounter: this.state.movesCounter + 1 })
            this.setState({ clicksCounter: 1 })
        }
    }

    mainCardsClicksHandler = (cardId) => {
        const card = this.state.cards.find((cardToFind) => cardToFind.id === cardId)
        card.isClicked = true;
        this.setState({ ...this.state });
        this.isCardsEqual(card)
        this.clicksCounter()
        this.movesIncreaseHandler()
    }

    isCardsEqual = (card) => {
        if (this.state.clickedCard === null) {
            this.setState({ clickedCard: card })
        } else {
            if (this.state.clickedCard.frontContent === card.frontContent) {
                this.setState({ clickedCard: null })
                this.isGameOver()
            }
            else {
                setTimeout(
                    () => {
                        this.state.clickedCard.isClicked = false;
                        card.isClicked = false;
                        this.setState({ clickedCard: null });
                    },
                    1000
                );
            }
        }
    }

    isGameOver = () => {
        this.setState({ GameOverChecker: this.state.GameOverChecker - 2 })
        if (this.state.GameOverChecker === 0) {
            clearInterval(this.setIntervalTimerId)
            setTimeout(
                () => {
                    alert("Game Over-You Won")
                    let tempArr = []
                    for (let i = 0; i < this.state.cards.length; i++) {
                        let newObj = this.state.cards[i].isClicked = false
                        tempArr.push(newObj)
                    }
                    this.setState({ cards: tempArr })
                    this.setState({ clickedCard: null });
                    this.setState({ GameTimer: 0 })
                },
                500
            );
        }
    }

    render() {
        return (<div className="MemoryGame">
            {this.state.cards.map((card) =>
                <img key={card.id}
                    onClick={() => this.mainCardsClicksHandler(card.id)}
                    src={card.isClicked == true ? card.frontContent : card.cardBack}>
                </img>
            )}
            <button onClick={this.startGame}>Start Game</button>
            <h2>Game Timer: {this.state.GameTimer}</h2>
            <h2>Moves Counter: {this.state.movesCounter}</h2>
        </div>)
    }
}
export default MemoryGame;