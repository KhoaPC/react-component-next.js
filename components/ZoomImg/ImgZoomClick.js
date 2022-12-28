import { useEffect, useRef } from "react";

function OneImg({ img }) {
  const refImg = useRef();
  const refSlide = useRef();
  const refContainer = useRef();

  useEffect(() => {
    const CONST_SEED_ZOOM = 9;
    let scale = 1;
    let slideComputed = refSlide.current.getBoundingClientRect();
    const containerComputed = refContainer.current.getBoundingClientRect();
    const containerWidth = containerComputed.width;
    const imgNaturalWidth = refImg.current.naturalWidth;
    const scaleFactorMax = imgNaturalWidth / containerWidth;
    const prevSlideComputed = refSlide.current.getBoundingClientRect();
    const seed = imgNaturalWidth / containerWidth / CONST_SEED_ZOOM;
    const pos = { x: 0, y: 0 };
    const zoomTarget = { x: 0, y: 0 };
    const cursor = { x: 0, y: 0 };

    const slideMousedownHandler = (e) => {
      slideComputed = refSlide.current.getBoundingClientRect();

      e.preventDefault();
      cursor.x = e.pageX - containerComputed.left;
      cursor.y = e.pageY - containerComputed.top;

      zoomTarget.x = (cursor.x - pos.x) / scale;
      zoomTarget.y = (cursor.y - pos.y) / scale;

      const zoomOut = e.shiftKey || e.ctrlKey;
      scale += zoomOut ? -seed : seed;
      scale = Math.max(1, Math.min(scaleFactorMax, scale));

      pos.x = -zoomTarget.x * scale + cursor.x;
      pos.y = -zoomTarget.y * scale + cursor.y;

      if (scale === 1) {
        pos.x = 0;
        pos.y = 0;
      }

      if (slideComputed.x > prevSlideComputed.x && zoomOut) pos.x = 0;

      if (slideComputed.y > prevSlideComputed.y && zoomOut) pos.y = 0;

      refSlide.current.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scale})`;
    }; // slideMousedownHandler

    // Register
    refSlide.current.addEventListener("mousedown", slideMousedownHandler);
    // Cleanup
    return () => {
      try {
        refSlide.current.removeEventListener(
          "mousedown",
          slideMousedownHandler
        );
      } catch {}
    }; // return
  }, [img]);

  return (
    <div ref={refContainer} className="container-one-img">
      <div ref={refSlide} className="slide">
        <img ref={refImg} className={`img`} src={img} />
      </div>
    </div>
  );
}

export default OneImg;
