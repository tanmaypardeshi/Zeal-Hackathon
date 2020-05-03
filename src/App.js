import React from 'react'
import Navbar from './components/Navbar'
import SelectFileView from './components/selectFileView';
import ViewSummary from './summary/viewSummary';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css'

function App() {
    return(
        <BrowserRouter>
        
        <div style = {{minHeight:"100vh"}}>
            <Navbar/>
            <Switch>
            <Route exact path = '/' component = {SelectFileView}/>
            <Route path = '/viewsummary' component = {ViewSummary}/>
            </Switch>
        </div>
        </BrowserRouter>
    );
}

export default App;