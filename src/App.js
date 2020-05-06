import React from 'react'
import Navbar from './components/Navbar'
import SelectFileView from './components/selectFileView';
import ViewSummary from './summary/viewSummary';
import MySummaries from './summary/mysummaries';
import MyQueries from './IRQuery/myqueries';
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
            <Route path = '/mysummaries' component = {MySummaries}/>
            <Route path = '/myqueries' component = {MyQueries}/>
            </Switch>
        </div>
        </BrowserRouter>
    );
}

export default App;