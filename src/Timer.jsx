export default function Timer({ timer,GAME_DURATION }) {
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
