function MiniImg({ getImg, img, removeImg, onLoad, onError }) {
    return (
      <div className="wrap-img-mini">
        <img
          onClick={() => {
            getImg(img);
          }}
          className="img-mini"
          src={img}
          onLoad={onLoad}
          onError={onError}
        />
        <span onClick={removeImg} className="remove-img">
          x
        </span>
      </div>
    );
  }
  
  export default MiniImg;
  