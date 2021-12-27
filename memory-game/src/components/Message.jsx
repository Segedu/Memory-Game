import './Message.css';

function Message(props) {
    return (
        <div className="Message">
            <h3>Good job! You Won!</h3>
            <h3>Your time record is: {props.gameTimer} seconds</h3>
            <h3>Total moves: {props.movesCounter} </h3>
        </div>
    )
}
export default Message;