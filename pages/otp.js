import { useState } from "react";
import Form from "../components/OTP/Form";
import FormOTP from "../components/OTP/FormOTP";
import styles from '../styles/HomeOTP.module.css'

function OTP() {
  const [num, setNum] = useState(0);
  const [separator, setSeparator] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [randomOTP, setOTP] = useState(0);
  const [output, setOutput] = useState(Array.from({ length: num }));

  const randomNum = (maxLength) => {
    setOTP(Math.floor(Math.random() * "1".padEnd(+maxLength + 1, 0)));
  };

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <Form
            label="Input Num"
            type="number"
            numMax={10}
            todoOnChange={(value) => {
              setNum(value);
              randomNum(value);
            }}
          />

          <Form
            label="Separator"
            type="text"
            todoOnChange={(value) => setSeparator(value)}
          />

          <Form
            label="isNumber"
            type="checkbox"
            todoOnChange={(value) => setIsNumber(value)}
          />
          <Form
            label="isPassword"
            type="checkbox"
            todoOnChange={(value) => setIsPassword(value)}
          />
          <Form
            label="isDisabled"
            type="checkbox"
            todoOnChange={(value) => setIsDisable(value)}
          />
          <Form
            label="hasErrored"
            type="checkbox"
            todoOnChange={(value) => setHasErrored(value)}
          />
        </nav>
        <FormOTP
          otp={randomOTP}
          output={output}
          setOutput={setOutput}
          inputNum={num}
          separator={separator}
          isNumber={isNumber}
          isPassword={isPassword}
          hasErrored={hasErrored}
          isDisable={isDisable}
        ></FormOTP>
      </div>
    </>
  );
}

export default OTP;
