import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FileForm } from './components/FileForm';
import { Summary } from './components/Summary';
import './App.css';

function App() {

  const [summary, setSummary] = useState([]);
  const [bgcolor, setBgColor] = useState("light");
  const [textcolor, setTextColor] = useState("dark");
  const [toggle, setToggleState] = useState("off");
  const [dark, setDarkState] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/showresult").then(response => response.json().then(data => {setSummary(data.content);})
    );
  }, []);

  return (
    <div className={{App} + " bg-" + bgcolor + " text-" + textcolor} style = {{height:"100vh"}}>
      <nav className="navbar">
        <span className="navbar-brand mb-0 h1">CLASP</span>
        <button 
          className={"btn btn-" + bgcolor + " justify-content-end"} 
          onClick={() => {
            if(dark){
              setBgColor("light");
              setTextColor("dark");
              setToggleState("off");
            } else {
              setBgColor("dark");
              setTextColor("light");
              setToggleState("on");
            }
            setDarkState(!dark);
          }}>
            Dark Mode <i className={"fas fa-toggle-" + toggle}></i>
          </button>
      </nav>
      <div className="container">
        
        <div className="row justify-content-center pt-5">
          <h1 className="display-1">
            CLASP
          </h1>
        </div>

        <div className="row justify-content-center">
          <h5 className="text-center">
              COVID-19 Literature Analysis and Summarization Platform
          </h5>
        </div>
        
        <FileForm
          onNewFile = {text => setSummary(text)}
        />

        <Summary summary = {summary}/>

      </div>
    </div>
  );
}

export default App;
