import "./Box.css";
const shapeClasses = ["square", "circle", "triangle"];
export default function Box({ shape }) {
  const confusingShape = shapeClasses.filter(s => s !== shape)[Math.floor(Math.random() * 2)];

  return (
    <div className="box">
      <div className={shape}>
        <div className={`confusing-shape ${confusingShape}`}></div>
      </div>
    </div>
  );
};