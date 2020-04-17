import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Summary = ({ summary }) => {
    return(
        <samp>{summary}</samp>
    );
}