import { useState } from "react";
import "./App.scss";
import Calculator from "./components/Calculator/Calculator";
import Result from "./components/Result/Result";

function App() {
  const [results, setResults] = useState<{
    type: string;
    monthly: string;
    total: string;
    interestOnly: string;
  }>({
    type: "",
    monthly: "",
    total: "",
    interestOnly: "",
  });
  const [resultState, setResultState] = useState<boolean>(false);
  const handleResultsUpdate = (
    type: string,
    monthly: string,
    total: string,
    interestOnly: string
  ) => {
    setResults({ type, monthly, total, interestOnly });
  };
  return (
    <main>
      <Calculator
        resultsUpdate={handleResultsUpdate}
        resultState={setResultState}
      />
      <Result
        type={results.type}
        monthly={results.monthly}
        total={results.total}
        interestOnly={results.interestOnly}
        resultState={resultState}
      />
    </main>
  );
}

export default App;
