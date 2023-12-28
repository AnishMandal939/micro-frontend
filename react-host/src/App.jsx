import React, {useRef, useEffect} from "react";
import ReactDOM from "react-dom";
import productWrapper from "remote/productWrapper"

import "./index.scss";

const App = () => {
  const divRef = useRef(null);
  useEffect(() => {
    // console.log(divRef.current);
    productWrapper(divRef.current);
  }, []);
  return(
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: react-host</div>
    <div ref={divRef}>Framework: react</div>
    <productWrapper />
  </div>
)};
ReactDOM.render(<App />, document.getElementById("app"));
