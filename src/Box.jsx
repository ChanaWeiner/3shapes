import './css/Box.css';
import triangle from './img/triangle.svg';
import square from './img/square.svg';
import circle from './img/circle.svg';

const shapeImages = {triangle,square,circle};

const shapeClasses = Object.keys(shapeImages);

export default function Box({ shape }) {
  const otherShapes = shapeClasses.filter(s => s !== shape);
  const confusingShape = otherShapes[Math.floor(Math.random() * otherShapes.length)];

  return (
    <div className="box">
      <div>
        <img src={shapeImages[shape]} alt={shape} />
      </div>
    </div>
  );
}