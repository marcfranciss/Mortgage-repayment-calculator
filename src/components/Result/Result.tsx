import "./result.scss";
import defaultImg from "../../assets/images/illustration-empty.svg";
import { useEffect, useState } from "react";

interface ResultsProps {
  type: string;
  monthly: string;
  total: string;
  interestOnly: string;
  resultState: boolean;
}
const Result: React.FC<ResultsProps> = ({
  type,
  monthly,
  total,
  interestOnly,
  resultState,
}) => {
  const [animate, setAnimate] = useState(false);
  const [typeResult, setTypeResult] = useState(true);
  useEffect(() => {
    if (type === "Interest Only") {
      setTypeResult(false);
    } else {
      setTypeResult(true);
    }
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500); // Match the animation duration
    return () => clearTimeout(timer);
  }, [type, total, monthly, interestOnly, resultState]);
  return (
    <section className='mortgage-result'>
      {!resultState && (
        <div className='default-result fadeInUp'>
          <img src={defaultImg} alt='' />
          <h2>Results shown here</h2>
          <h3>
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </h3>
        </div>
      )}
      {resultState && (
        <div className='active-result fadeInUp'>
          <article className='result-header'>
            <h2>Your results</h2>
            <p>
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              “calculate repayments” again.
            </p>
          </article>
          <article className='calc-result'>
            {typeResult ? (
              <div className='monthly-data'>
                <h4>Your monthly repayments</h4>
                <span className={animate ? "appearIn" : ""}>
                  £{Number(monthly).toLocaleString()}
                </span>
              </div>
            ) : (
              <div className='monthly-data'>
                <h4>Your interest only</h4>
                <span className={animate ? "appearIn" : ""}>
                  £{Number(interestOnly).toLocaleString()}
                </span>
              </div>
            )}
            <hr />
            <div className='interest-data'>
              <p>Total you'll repay over the term</p>
              <span className={animate ? "appearIn" : ""}>
                £{Number(total).toLocaleString()}
              </span>
            </div>
          </article>
        </div>
      )}
    </section>
  );
};

export default Result;
