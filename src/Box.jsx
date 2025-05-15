import "./Box.css";
const shapeClasses = ["square", "circle", "triangle"];
export default function Box({ shape, level }){
  return (
    <div className="box">
      <div className={shape}>
        {level === 2 && <div className={`confuse-${shapeClasses[Math.floor(Math.random()*shapeClasses.length)]}`}></div>}
      </div>
    </div>
  );
};