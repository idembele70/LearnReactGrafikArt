import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { render } from "react-dom";

// racourci JS
const { body } = document;
body.style.background = "#00000059";

function wait(duration) {
  const time = Date.now();
  while (duration > Date.now() - time);
}
function App() {
  const [count, setCount] = useState(0);
  const refBtn  = useRef(0);
  const onIncremente = useCallback(() => {
    setCount((c) => c + 1);
  }, []);
  useEffect(() => {
   wait(1000);
   refBtn.current.style.color = (count % 2 === 0 ? "red" : "green")
   console.log("in");
  }, [count]);
  return (
    <>
      <button type="submit" onClick={onIncremente} ref={refBtn} >
        {count}
      </button>
    </>
  );
}

render(<App />, body.querySelector("#app"));
