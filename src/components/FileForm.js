import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const FileForm = ({onNewFile}) => {
    
    const [text, setText] = useState("");

    return (
        <div className="row justify-content-center pt-5">
            <div className="col col-6">
                <label className="btn btn-primary btn-block">
                    <i className="fas fa-upload"></i> Upload File
                    <input 
                    type="file" 
                    className="form-control-file" 
                    accept=".txt" 
                    id="selectFile"
                    onChange={(file) => {
                        var fileToLoad = file.target.files[0];
                        var fileReader = new FileReader();
      
                        fileReader.onload = (fileLoadedEvent) => {
                        var textFromFileLoaded = fileLoadedEvent.target.result;
                        setText(textFromFileLoaded);
                        }
                        fileReader.readAsText(fileToLoad, "UTF-8");                        
                    }}
                    hidden/>
                </label>
            </div>
            <div className="col col-6">
                <button 
                type="submit" 
                className="btn btn-info btn-block"
                onClick={async () => {
                    
                    const response = await fetch("http://localhost:5000/addcontent", {
                        method: "POST",
                        headers: { "Content-Type" : "application/json" },
                        body: JSON.stringify(text)
                    })

                    if(response.ok) {
                        console.log("Response Worked");
                        onNewFile(text);
                    }
                }
                }>
                    <i className="far fa-sticky-note"></i> Summarize
                </button>
            </div>
        </div>
    );
};