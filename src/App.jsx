import { useState } from "react";

const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(
    "Welcome to the Color Game! Click 'New Game' to start. You'll see a countdown, then choose the correct color to win!"
  );
  const [gameOver, setGameOver] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [messageColor, setMessageColor] = useState("black");
  const [gameStarted, setGameStarted] = useState(false);

  const startNewGame = () => {
    setGameStarted(true);
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(newColor);
    setMessage("Guess the correct color!");
    setMessageColor("black");
    setGameOver(false);
    setShowOptions(false);
    setCountdown(3);

    let counter = 3;
    const countdownInterval = setInterval(() => {
      setCountdown(counter);
      counter--;
      if (counter < 0) {
        clearInterval(countdownInterval);
        setShowOptions(true);
      }
    }, 1000);
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore((prevScore) => prevScore + 1);
      setMessage("Correct! Guess the next color!");
      setMessageColor("green");
      setTimeout(startNewGame, 3000);
    } else {
      setMessage("Wrong! Game Over.");
      setMessageColor("red");
      setGameOver(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-3xl font-extrabold mb-6">Reol&apos;s Color Game</h1>
      {!gameStarted ? (
        <p className="text-xl font-bold bg-white shadow-md px-6 py-3 rounded-lg">
          {message}
        </p>
      ) : !gameOver ? (
        <>
          {!showOptions ? (
            <p className="text-xl font-bold bg-white shadow-md px-6 py-3 rounded-lg">
              Starting in {countdown}...
            </p>
          ) : (
            <>
              <p
                data-testid="gameInstructions"
                className="text-lg font-semibold mb-4 px-4 py-2 rounded-lg shadow-md"
                style={{ backgroundColor: "#fff", color: messageColor }}
              >
                {message}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-sm w-full justify-center">
                {colors.map((color) => (
                  <button
                    key={color}
                    data-testid="colorOption"
                    className="w-24 h-24 md:w-28 md:h-28 rounded-2xl shadow-lg hover:scale-110 transition-transform duration-200 ease-in-out border-2 border-gray-300"
                    style={{ backgroundColor: color }}
                    onClick={() => handleGuess(color)}
                  ></button>
                ))}
              </div>
            </>
          )}
          <p
            data-testid="score"
            className="text-2xl font-bold mt-6 bg-white shadow-md px-6 py-3 rounded-lg"
          >
            Score: {score}
          </p>
        </>
      ) : (
        <p className="text-2xl font-bold text-red-600 bg-white shadow-md px-6 py-3 rounded-lg">
          Game Over! Final Score: {score}
        </p>
      )}
      <button
        data-testid="newGameButton"
        onClick={() => {
          startNewGame();
          setScore(0);
        }}
        className="mt-6 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-800 transition duration-200"
      >
        New Game
      </button>
    </div>
  );
};

export default ColorGame;
