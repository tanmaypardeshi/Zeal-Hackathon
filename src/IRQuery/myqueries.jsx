import React from 'react';
import {Redirect} from 'react-router-dom';

export default function MyQueries(){
    return(
        localStorage.length 
        ?
        //Code to show summaries goes here. Wrap all the code in a div!
        <h1 className="display-1 mt-5">{localStorage.getItem('dummyItem')}</h1> 
        :
        //Auto-redirection to home page if user is not logged in
        <>
        <Redirect to = '/'/>
        </>
    );
}