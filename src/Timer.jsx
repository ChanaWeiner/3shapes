import { useEffect, useState, useRef } from "react";
import "./css/Timer.css"; 
const GAME_DURATION = 1000*10;
const TIME_INTERVAL= 50; // 1 second
export default function Timer({ timerKey, onFinish }) {
    const [timer, setTimer] = useState(GAME_DURATION);
    const intervalRef = useRef(null);

    useEffect(() => {
        setTimer(GAME_DURATION);
        intervalRef.current = setInterval(() => {
            setTimer((prev) => prev - TIME_INTERVAL);
        }, TIME_INTERVAL);

        return () => clearInterval(intervalRef.current);
    }, [timerKey]);

    useEffect(() => {
        if (timer <= 0) {
            clearInterval(intervalRef.current);
            onFinish();
        }
    }, [timer, onFinish]);

    const convertToTime = (timeMs) => {
        const totalSeconds = Math.floor(timeMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const getTimePercentage = (timeMs) => {
        const percent = (timeMs / GAME_DURATION) * 100;
        return percent % 100;
    };

    return (
        <div className="timer">
            <div className="timer-text">{convertToTime(timer)}</div>
            <div className="timer-bar">
                <div
                    className="timer-bar-fill"
                    style={{ width: `${getTimePercentage(timer)}%` }}
                ></div>
            </div>
        </div>
    );
}
