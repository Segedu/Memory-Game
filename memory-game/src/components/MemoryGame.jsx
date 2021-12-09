import { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import './MemoryGame.css';

class MemoryGame extends Component {
    state = {
        timer: 0,
        movesCounter: 0,
        // winningBoard: [timeRecord: this.state.timer],
        cards: [
            { cardBack: "card back", content: "card 1", isClicked: false, id: uuidv4() },
            { cardBack: "card back", content: "card 1", isClicked: false, id: uuidv4() },
            { cardBack: "card back", content: "card 2", isClicked: false, id: uuidv4() },
            { cardBack: "card back", content: "card 2", isClicked: false, id: uuidv4() },
            { cardBack: "card back", content: "card 3", isClicked: false, id: uuidv4() },
            { cardBack: "card back", content: "card 3", isClicked: false, id: uuidv4() }]
    }
    componentDidMount() {
        this.startGame()
    }

    startGame = () => {
        setInterval(() => { this.setState({ timer: this.state.timer + 1 }) }, 1000)
    }

    cardStateHandler = (cardId) => {
        const card = this.state.cards.find((cardToFind) => cardToFind.id === cardId)
        card.isClicked = true;
        this.setState({ ...this.state });
        this.isCardsEqual()
    }

    isCardsEqual = () => {
        let filteredCards = this.state.cards.filter((card) => card.isClicked == true)
        if (filteredCards[0].content === filteredCards[1]?.content) {
            console.log("cards match!");
        }
        console.log(filteredCards);
    }

    render() {
        return (<div className="MemoryGame">
            {this.state.cards.map((card) =>
                <p key={card.id}
                    onClick={() => this.cardStateHandler(card.id)}>
                    {card.isClicked == true ? card.content : card.cardBack}
                </p>)}
            <h3>Game timer: {this.state.timer}</h3>
            <h3>Moves Counter: {this.state.movesCounter}</h3>
        </div>)
    }
}
export default MemoryGame;