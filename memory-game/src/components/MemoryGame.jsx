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
            { cardBack: "https://cdn.pixabay.com/photo/2021/12/04/15/01/leaves-6845395__340.jpg", content: "https://cdn.pixabay.com/photo/2019/10/15/13/40/winter-4551699__340.jpg", isClicked: false, id: uuidv4() },
            { cardBack: "https://cdn.pixabay.com/photo/2021/12/04/15/01/leaves-6845395__340.jpg", content: "https://cdn.pixabay.com/photo/2019/10/15/13/40/winter-4551699__340.jpg", isClicked: false, id: uuidv4() },
            { cardBack: "https://cdn.pixabay.com/photo/2021/12/04/15/01/leaves-6845395__340.jpg", content: "https://cdn.pixabay.com/photo/2021/08/31/00/05/background-6587392__340.jpg", isClicked: false, id: uuidv4() },
            { cardBack: "https://cdn.pixabay.com/photo/2021/12/04/15/01/leaves-6845395__340.jpg", content: "https://cdn.pixabay.com/photo/2021/08/31/00/05/background-6587392__340.jpg", isClicked: false, id: uuidv4() },
            { cardBack: "https://cdn.pixabay.com/photo/2021/12/04/15/01/leaves-6845395__340.jpg", content: "https://cdn.pixabay.com/photo/2017/12/17/21/44/coffee-3025022__480.jpg", isClicked: false, id: uuidv4() },
            { cardBack: "https://cdn.pixabay.com/photo/2021/12/04/15/01/leaves-6845395__340.jpg", content: "https://cdn.pixabay.com/photo/2017/12/17/21/44/coffee-3025022__480.jpg", isClicked: false, id: uuidv4() }]
    }

    componentDidMount() {
        this.startGame()
        this.shuffleCards()
    }

    startGame = () => {
        let TimerId = setInterval(() => {
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
            clearInterval()
            setTimeout(
                () => {
                    alert("Game Over - You Won")
                },
                1000
            );
        }
    }

    render() {
        return (<div className="MemoryGame">
            {this.state.cards.map((card) =>
                <img key={card.id}
                    onClick={() => this.mainCardsClicksHandler(card.id)} src={card.isClicked == true ? card.content : card.cardBack}>
                </img>
            )}
            <h3>Game Timer: {this.state.GameTimer}</h3>
            <h3>Moves Counter: {this.state.movesCounter}</h3>
        </div>)
    }
}
export default MemoryGame;