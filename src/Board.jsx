import Box from './Box';
import './css/Board.css';
export default function Board({ boxes,shapeClasses, handleRightClick, handleLeftClick }) {
    return (
        <div className="board">
            <div className="boxes-container">
                {boxes.map((b, i) => (
                  <Box key={i} shape={shapeClasses[b]} />
                ))}
              </div>
              <div className="btns">
                <button className="btn-catch" onClick={handleRightClick}>כן</button>
                <button className="btn-catch" onClick={handleLeftClick}>לא</button>
              </div>
        </div>
    )
}
