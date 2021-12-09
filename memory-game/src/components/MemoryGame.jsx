import { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import './MemoryGame.css';

class MemoryGame extends Component {
    state = {
        clickedBtn: null,
        timer: 0,
        clicksCounter: 1,
        movesCounter: 0,
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
    }

    startGame = () => {
        setInterval(() => { this.setState({ timer: this.state.timer + 1 }) }, 1000)
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

    cardClicked = (cardId) => {
        const card = this.state.cards.find((cardToFind) => cardToFind.id === cardId)
        card.isClicked = true;
        this.setState({ ...this.state });
        this.isCardsEqual(card)
        this.clicksCounter()
        this.movesIncreaseHandler()
    }

    isCardsEqual = (card) => {
        if (this.state.clickedBtn === null) {
            this.setState({ clickedBtn: card })
        } else {
            if (this.state.clickedBtn.content === card.content) {
                console.log("match");
                this.setState({ clickedBtn: null })
                // this.isGameOver()
            }
            else {
                console.log("try again");
                setTimeout(
                    () => {
                        this.state.clickedBtn.isClicked = false;
                        card.isClicked = false;
                        this.setState({ clickedBtn: null });
                    },
                    1000
                );
            }
        }
    }

    // isGameOver = () => {
    //     let lastCard = this.state.cards.find((cardUnClicked) => cardUnClicked.isClicked == false)
    //     console.log(lastCard);
    //     if (lastCard) {
    //         alert("game over- you won")
    //     }
    // }

    render() {
        return (<div className="MemoryGame">
            {this.state.cards.map((card) =>
                <p key={card.id}
                    onClick={() => this.cardClicked(card.id)}>
                    {card.isClicked == true ? card.content : card.cardBack}
                </p>)}
            <h3>Game timer: {this.state.timer}</h3>
            <h3>Moves Counter: {this.state.movesCounter}</h3>
        </div>)
    }
}
export default MemoryGame;