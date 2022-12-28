import ControllerImg from "../components/ZoomImg/ShowImg";
import { useEffect, useState } from "react";
import ImgZoomMove from "../components/ZoomImg/ImgZoomMove";
import MiniImg from "../components/ZoomImg/MiniImg";

const CONST_REGEX_CHECK_URL_IMAGE =
  /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|png|svg))/i;
const CONST_LENGTH_DEAFAULT = 4;

function ZoomImg() {
  const [showControll, setShowControll] = useState(false);
  const [imgControll, setImgControll] = useState(images.zoom);
  const [zoomMoveImg, setZoomMoveImg] = useState(images.zoom);
  const [imgAdd, setImgAdd] = useState([
    images.zoom,
    images.img,
    images.img_1,
    images.img_2,
  ]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {}, [loaded]);

  const handlerPrevImg = () => {
    console.log("Prev");
  };

  const handlerNextImg = () => {
    console.log("Next");
  };

  const handlerClose = () => {
    setShowControll(false);
  };

  useEffect(() => {
    if (imgAdd.length > CONST_LENGTH_DEAFAULT && !loaded)
      setImgAdd((prev) => prev.slice(0, -1));
  }, [loaded]);

  const handlerAddImg = () => {
    const url = window.prompt("Enter URL");

    if (url === "") {
      alert("Empty image URL");
    } else if (url.match(CONST_REGEX_CHECK_URL_IMAGE)) {
      setImgAdd((prev) => [...prev, url]);
    } else alert("Invalid image URL");
  };

  const removeImg = (i) => {
    if (window.confirm("Do you want to delete image?")) {
      setImgAdd((prev) => {
        return prev.filter((item, index) => {
          return index !== i;
        });
      });
    }
  };

  return (
    <div className="content">
      {showControll && (
        <ControllerImg
          handlerClose={handlerClose}
          next={handlerNextImg}
          prev={handlerPrevImg}
          ulrImg={imgControll}
        />
      )}

      <ImgZoomMove
        setShowControll={(value) => setShowControll(value)}
        setImgControll={(img) => setImgControll(img)}
        urlImg={zoomMoveImg}
      ></ImgZoomMove>

      <div className="container-mini-img">
        {imgAdd.map((item, index) => {
          return (
            <MiniImg
              key={index}
              getImg={(img) => {
                setZoomMoveImg(img);
              }}
              removeImg={() => removeImg(index)}
              img={item}
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(false)}
            />
          );
        })}
        <div onClick={handlerAddImg} className="add-img">
          ➕
        </div>
      </div>
    </div>
  );
}

export default ZoomImg;
