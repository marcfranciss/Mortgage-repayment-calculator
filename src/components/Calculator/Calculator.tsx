import { useState } from "react";
import "./calculator.scss";
import { Form, Loader } from "../../components";
import { delay } from "../utils";

interface FormProps {
  resultsUpdate: (
    type: string,
    monthly: string,
    total: string,
    interestOnly: string
  ) => void;
  resultState: (state: boolean) => void;
}
const Calculator: React.FC<FormProps> = ({ resultsUpdate, resultState }) => {
  const [reset, setReset] = useState<boolean>(false);
  const [loaderState, setLoaderState] = useState<boolean>(false);
  const handleReset = async () => {
    setLoaderState(true);
    await delay(1000);
    setReset(true);
  };
  return (
    <section id='mortgage-calc'>
      <div className='header fadeInUp'>
        <h1>Mortgage calculator</h1>
        <button type='reset' className='btn-clear' onClick={handleReset}>
          <Loader
            loaderState={loaderState}
            setLoaderState={setLoaderState}
            timer={1000}
            textProps='Clear All'
          />
        </button>
      </div>
      <Form
        onReset={reset}
        onResultsUpdate={resultsUpdate}
        showResult={resultState}
        setReset={setReset}
      />
    </section>
  );
};
export default Calculator;
