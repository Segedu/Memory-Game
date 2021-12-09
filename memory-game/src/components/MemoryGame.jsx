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

        if (this.state.clickedBtn === null) {
            this.setState({ clickedBtn: card })
        } else {
            if (this.state.clickedBtn.content === card.content) {
                console.log("match");
                this.setState({ clickedBtn: null })
            }
            else {
                console.log("try again");
                setTimeout(
                    () => this.setState({ clickedBtn: null }),
                    3000
                );
                this.state.clickedBtn.isClicked = false;
                card.isClicked = false;
            }

        }
        this.clicksCounterHandler()
        this.movesStateHandler()
        console.log(this.state.clicksCounter);
    }

    clicksCounterHandler = () => {
        this.setState({ clicksCounter: this.state.clicksCounter + 1 })
        if (this.state.clicksCounter === 2) {
            // this.isCardsEqual()
        }
    }

    movesStateHandler = () => {
        if (this.state.clicksCounter === 2) {
            this.setState({ movesCounter: this.state.movesCounter + 1 })
            this.setState({ clicksCounter: 1 })
        }
    }

    // isCardsEqual = () => {

    //     if (this.state.clickedBtn === ) {
    //         console.log("cards match!");
    //     }
    //     // else {
    //     //     filteredArr[0].isClicked = false
    //     //     this.setState({ ...this.state });
    //     // }  
    // }

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