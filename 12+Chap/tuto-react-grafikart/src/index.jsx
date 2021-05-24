import { useEffect, useState } from "react";

const useManualIncremente = (initialValue = 0, step = 1) => {
  const [count, setCount] = useState(initialValue, step);
  const onIncremente = () => setCount((count) => count + step);
  return [count, onIncremente];
};

const useAutoIncremente = (initialValue, step) => {
  const [compteur, manualIncremente] = useManualIncremente(initialValue, step);
  
  useEffect(() => {
    const timer = setInterval(() => {
      manualIncremente();
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return compteur;
};

export default function Compteur() {
  const compteur = useAutoIncremente();

  return <p>valeur : {compteur} </p>;
}
