import { useEffect, useState } from "react";

const useIncremente = (initialValue, step) => {
  const [count, setCount] = useState(initialValue, step);

  const onIncremente = (_) => setCount((c) => c + step);

  return [count, onIncremente];
};

function Compteur() {
  const [count, autoIncremente] = useIncremente(0, 1);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("I use effect !");
      autoIncremente();
    }, 1000);
    return (_) => clearInterval(timer);
  }, []);

  useEffect((_) => (document.title = "compteur" + count));

  return <button>valeur a incremente : {count}</button>;
}

export default Compteur;
