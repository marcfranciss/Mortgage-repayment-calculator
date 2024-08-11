import React, { FormEvent, useEffect, useState } from "react";
import { Loader } from "../../components";
import "./form.scss";
import iconCal from "../../assets/images/icon-calculator.svg";
import { delay, calculateMortgage } from "../utils";

interface MortgageData {
  amount: string;
  year: string;
  interest: string;
  type: string;
  mMonthly: string;
  mInterestOnly: string;
  mTotal: string;
}

interface Errors {
  amount: boolean;
  year: boolean;
  interest: boolean;
  type: boolean;
}

interface MortgageCalculatorProps {
  onReset: boolean; // Prop to handle reset action
  onResultsUpdate: (
    type: string,
    monthly: string,
    total: string,
    interestOnly: string
  ) => void;
  showResult: (state: boolean) => void;
  setReset: (state: boolean) => void;
}
const Form: React.FC<MortgageCalculatorProps> = ({
  onReset,
  onResultsUpdate,
  showResult,
  setReset,
}) => {
  const [mortgageData, setMortgageData] = useState<MortgageData>({
    amount: "",
    year: "",
    interest: "",
    type: "",
    mMonthly: "",
    mInterestOnly: "",
    mTotal: "",
  });
  /* ------------------------------------------- */
  const [loaderState, setLoaderState] = useState<boolean>(false);
  /* ------------------------------------------- */
  const [errors, setErrors] = useState<Errors>({
    amount: false,
    year: false,
    interest: false,
    type: false,
  });
  /* ------------------------------------------- */
  const errorMsg = "This field is required";
  /* ------------------------------------------- */
  useEffect(() => {
    if (onReset) {
      setMortgageData({
        amount: "",
        year: "",
        interest: "",
        type: "",
        mMonthly: "",
        mInterestOnly: "",
        mTotal: "",
      });
      setErrors({
        amount: false,
        year: false,
        interest: false,
        type: false,
      });
      setReset(false);
      onResultsUpdate("", "", "", "");
      showResult(false);
    }
  }, [onReset]);
  /* ------------------------------------------- */
  /* Function for validating inputs */
  function validateInputs(
    amount: number,
    year: number,
    interest: number,
    type: string
  ) {
    const validationErrors = {
      amount: amount <= 0,
      year: year <= 0,
      interest: interest <= 0,
      type: type == "",
    };
    setErrors(validationErrors);
    return !Object.values(validationErrors).includes(true);
  }
  /* ------------------------------------------- */
  /* Function for calculating mortgage */
  const handleMortgageData = async (e: FormEvent<HTMLFormElement>) => {
    /* Prevent reload on button click */
    e.preventDefault();
    setLoaderState(true);
    await delay(1000);
    /* Convert string to numbers for validation and calculation*/
    const amount: number = Number(mortgageData.amount.replace(/,/g, ""));
    const year: number = Number(mortgageData.year);
    const interest: number = Number(mortgageData.interest);
    const type: string = mortgageData.type;

    if (validateInputs(amount, year, interest, type)) {
      await delay(1000);
      const {
        formattedMonthlyPayment,
        formattedTotalPayment,
        formattedInterestOnly,
      } = calculateMortgage(amount, interest, year);

      setMortgageData({
        ...mortgageData,
        mMonthly: formattedMonthlyPayment,
        mInterestOnly: formattedInterestOnly,
        mTotal: formattedTotalPayment,
      });
      /* 7. Send results as props to parent */
      onResultsUpdate(
        type,
        formattedMonthlyPayment,
        formattedTotalPayment,
        formattedInterestOnly
      );
      /* 8. Send state to show result */
      showResult(true);
    }
  };
  /* ------------------------------------------- */
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setMortgageData({ ...mortgageData, type: inputVal });
  };
  /* ------------------------------------------- */

  return (
    <form onSubmit={handleMortgageData} id='morgageForm'>
      <div className='amount fadeInUp'>
        <label className={errors.amount ? "error-state" : ""} htmlFor='amount'>
          <h2>Mortgage Amount</h2>
          <div className='input-cntnr'>
            <span className='lbl-text'>£</span>
            <input
              className='lbl-input'
              type='text'
              name='amount'
              id='amount'
              value={mortgageData.amount}
              onChange={(e) =>
                setMortgageData({
                  ...mortgageData,
                  amount: e.target.value
                    .replace(/\D/g, "")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                })
              }
            />
          </div>

          {errors.amount && <span className='error-msg'>{errorMsg}</span>}
        </label>
      </div>
      <div className='factors fadeInUp'>
        <div className='terms-container'>
          <label className={errors.year ? "error-state" : ""} htmlFor='terms'>
            <h2>Mortgage Term</h2>
            <div className='input-cntnr'>
              <input
                className='lbl-input'
                type='number'
                name='terms'
                id='terms'
                maxLength={4}
                value={mortgageData.year}
                onChange={(e) =>
                  setMortgageData({
                    ...mortgageData,
                    year: e.target.value,
                  })
                }
              />
              <span className='lbl-text'>years</span>
            </div>
            {errors.year && <span className='error-msg'>{errorMsg}</span>}
          </label>
          <label
            className={errors.interest ? "error-state" : ""}
            htmlFor='interest'>
            <h2>Mortgage Interest</h2>
            <div className='input-cntnr'>
              <input
                className='lbl-input'
                step='0.01'
                type='number'
                name='interest'
                id='interest'
                value={mortgageData.interest}
                onChange={(e) =>
                  setMortgageData({
                    ...mortgageData,
                    interest: e.target.value,
                  })
                }
                // value={interest}
                // onChange={(e) => handleInputData(e, "interest")}
              />
              <span className='lbl-text'>%</span>
            </div>
            {errors.interest && <span className='error-msg'>{errorMsg}</span>}
          </label>
        </div>
      </div>
      <div className='type fadeInUp'>
        <h2>Mortgage Type</h2>
        <label htmlFor='repayment'>
          <div className='radio-cntnr'>
            <input
              className='lbl-radio'
              type='radio'
              name='type'
              id='repayment'
              value='Repayment'
              checked={mortgageData.type === "Repayment"}
              onChange={handleTypeChange}
            />
            Repayment
          </div>
        </label>
        <label htmlFor='interest-only'>
          <div className='radio-cntnr'>
            <input
              className='lbl-radio'
              type='radio'
              name='type'
              id='interest-only'
              value='Interest Only'
              checked={mortgageData.type === "Interest Only"}
              onChange={handleTypeChange}
            />
            Interest Only
          </div>
        </label>
        {errors.type && <span className='error-msg'>{errorMsg}</span>}
      </div>
      <button className='calculate-btn fadeInUp'>
        <img
          className='btn-img'
          src={iconCal}
          alt='calculator icon in the calculate button'
        />
        <Loader
          loaderState={loaderState}
          setLoaderState={setLoaderState}
          timer={1000}
          textProps='Calculate Payments'
        />
      </button>
    </form>
  );
};

export default Form;
