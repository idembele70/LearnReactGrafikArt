import { useReducer } from "react";

function init(initialValue) {
  return { count: initialValue };
}

function reducer(state, action) {
  switch (action.type) {
    case "+":
      return { count: state.count + action.step };
    case "-":
      return { count: (state.count -= 1) };
    case "rReset":
      return init(2);
    default:
      throw new Error(action.type, "inconnu !");
  }
} 
function App() {
  const [count, dispatch] = useReducer(reducer, 0, init);
  const handleReset = () => dispatch({ type: "reset" });
  console.log(count)
  return (
    <>
      <p> {count.count} </p>
      <button onClick={() => dispatch({ type: "+" , step : 10})}>+</button>
      <button onClick={() => dispatch({ type: "-" })}>-</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
export default App;
