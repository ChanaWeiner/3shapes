import React, { useState, useRef, useEffect } from 'react';
import './css/Results.css';
export default function Results({ gameResults }) {
    const maxScore = Math.max(...gameResults, 1);
    const [showResults, setShowResults] = useState(false);
    const resultsRef = useRef(null);

    useEffect(() => {
        if (resultsRef.current) {
            resultsRef.current.scrollLeft = resultsRef.current.scrollWidth;
        }
    }, [gameResults, showResults]);

    return (
        <>
            <button className='btn btn-result' onClick={()=>setShowResults(prev => !prev)}>{!showResults ? 'תוצאות המשחק' : 'הסתר תוצאות משחק'} </button>
            {showResults &&
                <div className="results" ref={resultsRef}>
                    {gameResults.map((result, index) => (
                        <div key={index}>
                            <div className="result-bar" style={{ height: `${((result/3 + 3) / (maxScore + 3)) * 200}px` }}>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    )
}