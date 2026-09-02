import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setClicks] = useState(0)
  const getClicks = async () => {
  	const response = await fetch("http://backend:5001/");
	const data = await response.json();
	setClicks(data.clicks);
  };
  const handleClick = async () => {
  	const response = await fetch("http://backend:5001/", {
	method: "POST", });
	const data = await response.json();
	setClicks(data.clicks);
};
  useEffect(() => {
  	getClicks();
  }, []);

  return (
    <>
      <section id="center">
        <button
          type="button"
          className="counter"
          onClick={handleClick}
        >
          Count is {count}
        </button>
      </section>
      <section id="spacer"></section>
    </>
  )
}

export default App
