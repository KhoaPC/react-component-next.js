import { useRef, useEffect, useState } from "react";
import styles from '../../styles/OTP.module.css'

function InputOTP({
  currentIndex,
  output,
  index,
  updateValue,
  setNewIndex,
  length,
  style,
  disabled,
  isPassword,
  isNumber,
}) {
  const KEY_BACKSPACE = "Backspace";
  const KEY_ARROW_RIGHT = "ArrowRight";
  const KEY_ARROW_LEFT = "ArrowLeft";
  const [myValue, setMyValue] = useState(output[index]);
  const [typeInput, setType] = useState("");
  const ref = useRef();

  useEffect(() => {
    if (isNumber && isPassword) {
      setType("password");
    } else if (isPassword) {
      setType("password");
    } else if (isNumber) {
      setType("tel");
    } else setType("");
  }, [isNumber, isPassword]);

  useEffect(() => {}, [myValue]);

  useEffect(() => {
    const clear = output.every((item) => {
      return !item;
    });
    if (clear) setMyValue("");
  }, [output]);

  useEffect(() => {
    if (currentIndex === index) {
      ref.current.focus();
      ref.current.select();
    }
  }, [currentIndex]);

  const handlerKeyDown = (event) => {
    if (event.ctrlKey) {
      return;
    }

    if (event.key === KEY_BACKSPACE) {
      event.preventDefault();
      setMyValue("");
      setNewIndex((prev) => --prev);
    } else if (event.key === KEY_BACKSPACE && !event.target.value) {
      event.preventDefault();
      setNewIndex((prev) => --prev);
    } else if (event.key === KEY_BACKSPACE) {
      setNewIndex((prev) => --prev);
    }
    if (event.key === KEY_ARROW_LEFT) {
      event.preventDefault();
      setNewIndex((prev) => --prev);
    }
    if (event.key === KEY_ARROW_RIGHT) {
      event.preventDefault();
      if (length == currentIndex + 1) return;
      setNewIndex((prev) => ++prev);
    }
    if (ref.current.value.length && event.key.length === 1) {
      // un-selected
      if (!(length == currentIndex + 1)) {
        // setNewIndex((prev) => ++prev);
      }
    }

    setNewIndex((prev) => {
      return (prev = Math.max(0, Math.min(length, prev)));
    });
  };

  const handlerOnchange = (event) => {
    event.preventDefault();
    if (isNumber && !+ref.current.value) {
      // setMyValue(myValue);
      setNewIndex((prev) => --prev);
    } else {
      setMyValue(ref.current.value);
    }

    updateValue(index, ref.current.value);

    if (ref.current.value !== "") {
      if (length == currentIndex + 1) {
        return;
      } else {
        // selected
        setNewIndex((prev) => ++prev);
      }
    }
  };

  return (
    <>
      <input
        disabled={disabled}
        style={style}
        onFocus={() => setNewIndex(index)}
        ref={ref}
        onKeyDown={(event) => {
          handlerKeyDown(event);
        }}
        min={0}
        max={9}
        onChange={(event) => handlerOnchange(event)}
        className={styles.input}
        maxLength={1}
        required
        value={myValue || ""}
        type={typeInput}
      />
    </>
  );
}

export default InputOTP;
