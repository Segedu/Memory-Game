import { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import './MemoryGame.css';

class MemoryGame extends Component {
    state = {
        clickedCard: null,
        clicksCounter: 1,
        movesCounter: 0,
        GameTimer: 0,
        GameOverChecker: 4,
        cards: [
            { cardBack: "click", content: "card 1", isClicked: false, id: uuidv4() },
            { cardBack: "click", content: "card 1", isClicked: false, id: uuidv4() },
            { cardBack: "click", content: "card 2", isClicked: false, id: uuidv4() },
            { cardBack: "click", content: "card 2", isClicked: false, id: uuidv4() },
            { cardBack: "click", content: "card 3", isClicked: false, id: uuidv4() },
            { cardBack: "click", content: "card 3", isClicked: false, id: uuidv4() }]
    }

    componentDidMount() {
        this.startGame()
        this.shuffleCards()
    }

    startGame = () => {
        setInterval(() => { this.setState({ GameTimer: this.state.GameTimer + 1 }) }, 1000)
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
            if (this.state.clickedCard.content === card.content) {
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
            alert("Game Over - You Won")
        }
    }

    render() {
        return (<div className="MemoryGame">
            {this.state.cards.map((card) =>
                <p key={card.id}
                    onClick={() => this.mainCardsClicksHandler(card.id)}>
                    {card.isClicked == true ? card.content : card.cardBack}
                </p>)}
            <h3>Game Timer: {this.state.GameTimer}</h3>
            <h3>Moves Counter: {this.state.movesCounter}</h3>
        </div>)
    }
}
export default MemoryGame;