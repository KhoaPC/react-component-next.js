import "./DemoImg.css";
import OneImg from "./ImgZoomClick";

function ControllerImg({ ulrImg, handlerClose, prev, next }) {
  return (
    <div className="overlay">
      <div>
        <span onClick={() => handlerClose()} className="icon close">
          X
        </span>

        {/* <span onClick={() => prev()} className="icon prev">
          ◀
        </span>
        <span onClick={() => next()} className="icon next">
          ▶
        </span> */}
      </div>

      <OneImg img={ulrImg}></OneImg>
    </div>
  );
}

export default ControllerImg;
