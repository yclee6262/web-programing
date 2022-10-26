import "./HomePage.css";

const HomePage = ({ startGame }) => {
  return (
    <div className='HomeWrapper'>
      <p className='title'>Guess Number</p>

      <button className='btn' onClick={startGame}>Start Game</button>
    </div>
  );

}
export default HomePage;