import { useEffect, useRef } from "react";

function ImgZoomMove({
  urlImg,
  imgSize,
  resultSize,
  setImgControll,
  setShowControll,
}) {
  const refImg = useRef();
  const refResult = useRef();
  const refLen = useRef();

  useEffect(() => {
    const cx = refResult.current.offsetWidth / refLen.current.offsetWidth;
    const cy = refResult.current.offsetHeight / refLen.current.offsetHeight;

    setTimeout(() => {
      refResult.current.style.backgroundImage = `url("${urlImg}")`;
      refResult.current.style.backgroundSize = `${
        refImg.current.width * cx
      }px ${refImg.current.height * cy}px`;
    }, 300);
    refResult.current.classList.add("hide");

    if (imgSize) {
      refImg.current.style.width = `${imgSize}px`;
      refImg.current.style.height = `${imgSize}px`;
    }

    if (resultSize) {
      refResult.current.style.width = `${resultSize}px`;
      refResult.current.style.height = `${resultSize}px`;
    }

    const moveLens = (e) => {
      let x;
      let y;
      const pos = getCursorPos(e);

      refResult.current.classList.remove("hide");
      e.preventDefault();
      x = pos.x - refLen.current.offsetWidth / 2;
      y = pos.y - refLen.current.offsetHeight / 2;

      if (x > refImg.current.width - refLen.current.offsetWidth) {
        x = refImg.current.width - refLen.current.offsetWidth;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > refImg.current.height - refLen.current.offsetHeight) {
        y = refImg.current.height - refLen.current.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }

      refLen.current.style.left = `${x}px`;
      refLen.current.style.top = `${y}px`;
      refResult.current.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    };

    const getCursorPos = (e) => {
      const imgBoundingClientRect = refImg.current.getBoundingClientRect();
      let x = 0;
      let y = 0;

      x = e.pageX - imgBoundingClientRect.left;
      y = e.pageY - imgBoundingClientRect.top;

      x = x - window.pageXOffset;
      y = y - window.pageYOffset;

      return { x: x, y: y };
    };

    const mouseLeaveHandler = () => {
      refResult.current.classList.add("hide");
    };

    // Register
    refLen.current.addEventListener("mousemove", moveLens);
    refImg.current.addEventListener("mousemove", moveLens);
    refLen.current.addEventListener("mouseleave", mouseLeaveHandler);

    // Cleanup
    return () => {
      try {
        refImg.current.removeEventListener("mousemove", moveLens);
        refLen.current.removeEventListener("mousemove", moveLens);
        refLen.current.removeEventListener("mouseleave", mouseLeaveHandler);
      } catch {}
    }; // return
  }, [urlImg]);

  return (
    <div id="container">
      <div
        onClick={() => {
          setShowControll(true);
          setImgControll(urlImg);
        }}
        ref={refLen}
        id="len"
      ></div>
      <img ref={refImg} id="img" src={urlImg} />
      <div ref={refResult} id="result"></div>
    </div>
  );
}

export default ImgZoomMove;
