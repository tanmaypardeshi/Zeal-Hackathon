import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

import axios from 'axios';

function App() {

    const [page, setPage] = useState(1);

    const [bgcolor, setBgColor] = useState("light");
    const [textcolor, setTextColor] = useState("dark");
    const [toggle, setToggleState] = useState("off");
    const [dark, setDarkState] = useState(false);
    const [hex, setHex] = useState("#343a40");
    
    const [text, setText] = useState("");
    const [filename, setFilename] = useState("");
    const [filesize, setFilesize] = useState(0);
    
    const [uploadProgress, updateUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState(false);
    const [uploading, setUploading] = useState(false);
    
    const [show, setShow] = useState(false);
    const [summary, setSummary] = useState([]);

    return(
        <div className={{App} + " bg-" + bgcolor + " text-" + textcolor} style = {{minHeight:"100vh"}}>
            <nav className={"navbar fixed-top bg-"+bgcolor}>
                <span className="navbar-brand mb-0 h1">CLASP</span>
                <button 
                className={"btn btn-" + bgcolor + " justify-content-end"} 
                onClick={() => {
                    if(dark){
                    setBgColor("light");
                    setTextColor("dark");
                    setToggleState("off");
                    setHex("#343a40");
                    } else {
                    setBgColor("dark");
                    setTextColor("light");
                    setToggleState("on");
                    setHex("#f8f9fa");
                    }
                    setDarkState(!dark);
                }}>
                Dark Mode <i className={"fas fa-toggle-" + toggle}></i>
                </button>
            </nav>
            
            <div className="container pt-5">
                
            {
                (page == 1) ? 
                <div>
                    <div className="row justify-content-center pt-5 mb-n4">
                    <p className="text-center" style={{fontSize: 30, fontWeight: '300'}}>
                        Welcome to
                    </p>
                    </div>

                    <div className="row justify-content-center">
                        <h1 className="display-1">
                            CLASP
                        </h1>
                    </div>

                    <div className="row justify-content-center pl-2 pr-2">
                        <p className="text-center" style={{fontSize: 20, fontWeight: '300'}}>
                            COVID-19 Literature Analysis and Summarization Platform
                        </p>
                    </div>

                    <div className="row justify-content-center pt-5">
                        <label className={"btn btn-outline-" + textcolor}>
                            <i className="fas fa-file-alt"></i> Select a text file
                            <input 
                            type="file" 
                            className="form-control-file" 
                            accept=".txt" 
                            id="selectFile"
                            onChange={(file) => {
                                if(file != null){
                                    var fileToLoad = file.target.files[0];
                                    var fileReader = new FileReader();
                
                                    fileReader.onload = (fileLoadedEvent) => {
                                    var textFromFileLoaded = fileLoadedEvent.target.result;
                                    setText(textFromFileLoaded);
                                    setFilename(fileToLoad.name);
                                    setFilesize(fileToLoad.size);
                                    }
                                    fileReader.readAsText(fileToLoad, "UTF-8");
                                    setPage(2);
                                }                        
                            }}
                            hidden/>
                        </label>
                    </div>
                </div> 
                : 
                (
                    (page == 2) ? 
                    <div>
                        
                        <div className="row justify-content-center pt-5 mb-n4">
                            <p className="text-center" style={{fontSize: 30, fontWeight: '300'}}>
                                Selected File:
                            </p>
                        </div>

                        <div className="row justify-content-center">
                            <h1 className="display-1">
                                {filename}
                            </h1>
                        </div>

                        <div className="row justify-content-center">
                            <p className="text-center" style={{fontSize: 20, fontWeight: '300'}}>
                                {filesize} bytes
                            </p>
                        </div>
                        
                        <div className="row justify-content-center pt-5">
                            
                                
                            <button 
                                className="btn btn-outline-danger mr-2"
                                onClick={() => {
                                    setPage(1);
                                }}
                                >
                                    <i className="fas fa-chevron-left"></i> Go Back
                            </button>

                            <button 
                                className="btn btn-outline-info"
                                onClick={() => {
                                    setUploading(true);
                
                                    axios({
                                        method: "POST",
                                        headers: {
                                            "Access-Control-Allow-Origin": "*",
                                            "Content-Type" : "application/json"
                                        },
                                        data: JSON.stringify(text),
                                        url: "http://localhost:5000/addcontent",
                                        onUploadProgress: (ev) => {
                                            const progress = ev.loaded / ev.total * 100;
                                            updateUploadProgress(Math.round(progress));
                                        }
                                    })
                                    .then((resp) => {
                                        console.log(resp.status);

                                        setUploadStatus(true);

                                        setTimeout(() => {
                                            setPage(3);
                                            setUploading(false);
                                        },2000)
                                    })
                                    .catch((err) => console.log(err));
                                }}>
                                    <i className="fas fa-upload"></i> Upload File?
                            </button>
                        </div>

                        <div className="row justify-content-center pt-5">
                            {
                                (uploading)
                                ?
                                <div className="col col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <p className="text-center" style={{fontSize: 20, fontWeight: '300'}}>
                                        Uploading file ...
                                    </p>
                                <div className="progress" style={{height: 25}}>
                                    <div 
                                    className="progress-bar progress-bar-striped progress-bar-animated bg-info" 
                                    role="progressbar" 
                                    aria-valuenow={uploadProgress} 
                                    aria-valuemin="0" 
                                    aria-valuemax="100" 
                                    style={{width: uploadProgress+"%"}}>{uploadProgress}%</div>
                                </div>
                                </div>
                                :
                                null
                            }
                        </div>
                            
                    </div>
                    :
                    <div>

                        <div className="row justify-content-center pt-5 pl-2 pr-2">
                            <p className="text-center" style={{fontSize: 20, fontWeight: '300'}}>
                                Upload successful! Get your summary below.
                            </p>
                        </div>


                        <div className="row justify-content-center pt-2">

                            <button 
                                className="btn btn-outline-danger mr-2"
                                onClick={() => {
                                    setPage(1);
                                    setShow(false);
                                }}
                                >
                                    <i className="fas fa-chevron-left"></i> Go Back
                            </button>

                            <button 
                            className={"btn btn-outline-" + textcolor}
                            onClick={()=>{
                                fetch("http://localhost:5000/showresult")
                                .then(response => response.json()
                                .then(data => {
                                    setSummary(data.content);
                                    })
                                );

                                setShow(true);
                            }}
                            >
                                <i className="fas fa-indent"></i> View Summary
                            </button>
                        </div>

                        <div className="row justify-content-center pt-5 pl-3 pr-3">
                            <samp>{
                                (show) ? summary : null
                            }</samp>
                        </div>
                    </div>
                )
            }
                
                

            </div>
        </div>
    )
}

export default App;