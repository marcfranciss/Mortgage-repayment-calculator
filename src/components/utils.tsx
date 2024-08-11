/*** DELAY FUNCTION ***/
export function delay(time: number) {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}
export function calculateMortgage(
  amount: number,
  interest: number,
  year: number
) {
  const monthlyInterestRate = interest / 100 / 12;
  const numberOfPayments = year * 12;
  const monthlyPayment =
    (amount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  const interestOnly = amount * monthlyInterestRate;
  const totalPayment = monthlyPayment * numberOfPayments;
  const formattedMonthlyPayment = monthlyPayment.toFixed(2);
  const formattedInterestOnly = interestOnly.toFixed(2);
  const formattedTotalPayment = totalPayment.toFixed(2);

  return {
    formattedMonthlyPayment,
    formattedTotalPayment,
    formattedInterestOnly,
  };
}
