import { useState, useRef, useEffect } from "react";
import "./css/Game.css";
import Board from "./Board";
import Timer from "./Timer";
import Results from "./Results";
const shapeClasses = ["square", "circle", "triangle"];
import coinImage from './img/coin.png';
const getRandomShapes = (allowDuplicates = true) => {
  if (allowDuplicates) {
    return Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * shapeClasses.length)
    );
  }
  return shuffle([0, 1, 2]);
};

const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const allDifferent = ([a, b, c]) => new Set([a, b, c]).size === 3;

export default function Game() {
  const [isActive, setIsActive] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [points, setPoints] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  const [gameResults, setGameResults] = useState(localStorage.getItem('gameResults') ? JSON.parse(localStorage.getItem('gameResults')) : []);

  const clickedRef = useRef(false);
  const hasToClickRef = useRef(false);
  const intervalRef = useRef(null);

  const startGame = () => {
    setPoints(0);
    setIsActive(true);
    newQuestion();
    setTimerKey((prev) => prev + 1);

  };

  const stopGame = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    if (points > 0) {
      setGameResults(prevPoints => [...prevPoints, points]);
    }
    localStorage.setItem('gameResults', JSON.stringify([...gameResults, points]));
  };

  const newQuestion = () => {
    clickedRef.current = false;
    const newBoxes = getRandomShapes(Math.random() > 0.5);
    setBoxes(newBoxes);
    hasToClickRef.current = allDifferent(newBoxes);
  };

  const handleRightClick = () => {
    if (hasToClickRef.current) {
      setPoints(prev => prev + 1);
    }
    else {
      setPoints(prev => prev - 1);
    }

    newQuestion();
  };

  const handleLeftClick = () => {
    if (!hasToClickRef.current) {
      setPoints(prev => prev + 1);
    }
    else {
      setPoints(prev => prev - 1 < 0 ? 0 : prev - 1);
    }

    newQuestion();
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isActive) return;
      if (e.key === "ArrowRight") {
        handleRightClick();
      } else if (e.key === "ArrowLeft") {
        handleLeftClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  return (
    <>
      <div className="background-image"></div>
      <div className="game-container">
        <header>
          <h1 className="title">תפוס את הצורה</h1>
        </header>

        <main className="game-area">
          <div className="stats">
            <p className="points"><img className="coin" src={coinImage} alt="coin" />נקודות: {points}</p>
            <p className="game-text">הוראות: לחץ על "כן" אם הצורות שונות, ולחץ על "לא" אם הן זהות.</p>
          </div>

          {isActive ? (
            <>
              <Timer timerKey={timerKey} onFinish={stopGame} />
              <Board boxes={boxes} shapeClasses={shapeClasses} handleRightClick={handleRightClick} handleLeftClick={handleLeftClick} />
            </>
          ) : (
            <button className="btn-start" onClick={startGame}>התחל</button>
          )}
        </main>

        <footer>
          <Results gameResults={gameResults} />
        </footer>
      </div>
    </>
  );
}