export default function Results({ gameResults }) {
    return (
        <div>
            <div className="results">
                {gameResults.map((result, index) => (
                    <div key={index}>
                        <div className="result-bar" style={{ height: `${result * 10 + 5}px` }}>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}