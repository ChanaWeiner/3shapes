import { useState, useRef } from "react";
import "./Game.css";
import Box from "./Box";

const shapeClasses = ["square", "circle", "triangle"];
const TIME_INTERVAL = 1500;

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
  const [level, setLevel] = useState(1);
  // const [message, setMessage] = useState("");

  const clickedRef = useRef(false);
  const hasToClickRef = useRef(false);
  const intervalRef = useRef(null);

  const startGame = () => {
    setPoints(0);
    setIsActive(true);
    newQuestion();
    intervalRef.current = setInterval(nextQuestion, TIME_INTERVAL);
  };

  const stopGame = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setTimeout(() => setMessage(""), 2000);
  };

  const newQuestion = () => {
    clickedRef.current = false;
    const newBoxes = getRandomShapes(Math.random() > 0.5);
    setBoxes(newBoxes);
    hasToClickRef.current = allDifferent(newBoxes);
    // setMessage(hasToClickRef.current ? "לחץ על הכפתור" : "אל תלחץ על הכפתור");
  };

  const nextQuestion = () => {
    if (hasToClickRef.current && !clickedRef.current) {
      // setMessage("לא לחצת בזמן, המשחק נגמר!");
      stopGame();
    } else {
      newQuestion();
    }
  };

  const handleCatchClick = () => {
    if (!hasToClickRef.current) {
      // setMessage("לא היית אמור ללחוץ, המשחק נגמר!");
      stopGame();
      return;
    }

    clickedRef.current = true;
    const newPoints = points + 1;
    setPoints(newPoints);
    // setMessage("לחצת נכון!");

    if (newPoints === 5) {
      clearInterval(intervalRef.current);
      setLevel((l) => l + 1);
      alert("עברת שלב! לחץ OK כדי להמשיך.");
      startGame();
    }
  };

  return (
  <div className="container">
    {/* <p className="message">{message}</p> */}
    <div className={`game-area ${!isActive ? "hidden" : ""}`}>
      <div className="boxes-container">
        {boxes.map((b, i) => (
          <Box key={i} shape={shapeClasses[b]} level={level} />
        ))}
      </div>
      <button className="btn-catch" onClick={handleCatchClick}>
        תפוס
      </button>
    </div>

    <div className="controls">
      <button className={`btn-start ${isActive ? "hidden" : ""}`} onClick={startGame}>
        התחל
      </button>
      <div className="stats">
        <p>נקודות: {points}</p>
        <p>שלב: {level}</p>
      </div>
    </div>
  </div>
);

}
