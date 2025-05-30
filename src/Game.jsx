import { useState, useRef, useEffect } from "react";
import "./Game.css";
import Box from "./Box";
import Timer from "./Timer";
import Results from "./Results";
const shapeClasses = ["square", "circle", "triangle"];
const TIME_INTERVAL = 1000;
const GAME_DURATION = 10000;

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
  const [timer, setTimer] = useState(GAME_DURATION);
  const [gameResults, setGameResults] = useState(localStorage.getItem('gameResults') ? JSON.parse(localStorage.getItem('gameResults')) : []);

  const clickedRef = useRef(false);
  const hasToClickRef = useRef(false);
  const intervalRef = useRef(null);



  const startGame = () => {
    setPoints(0);
    setIsActive(true);
    newQuestion();
    setTimer(GAME_DURATION);
    intervalRef.current = setInterval(() => setTimer(timer => timer - TIME_INTERVAL), TIME_INTERVAL);
    // setTimeout(stopGame, GAME_DURATION);
  };

  const stopGame = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setGameResults(prevPoints => [...prevPoints, points]);
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
      setPoints(prev => prev-1<0?0:prev - 1);
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

  useEffect(() => {
    if (timer <= 0 && isActive) {
      stopGame();
    }
  }, [timer]);


  return (
    <div className="container">
  <header>
    <h1 className="title">תפוס את הצורה</h1>
  </header>
  
  <div className="stats">
    <p>נקודות: {points}</p>
  </div>

  {isActive && (
    <main className="game-area">
      <Timer timer={timer} GAME_DURATION={GAME_DURATION} />
      <div className="boxes-container">
        {boxes.map((b, i) => (
          <Box key={i} shape={shapeClasses[b]} />
        ))}
      </div>
      <div className="btns">
        <button className="btn-catch" onClick={handleRightClick}>כן</button>
        <button className="btn-catch" onClick={handleLeftClick}>לא</button>
      </div>
    </main>
  )}

  {!isActive && (
    <button className="btn-start" onClick={startGame}>התחל</button>
  )}


  <Results gameResults={gameResults}/>
</div>

  );
}
