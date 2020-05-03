import React,{ useContext, useState, useEffect } from "react";
import {ThemeContextConsumer} from '../context/themer';

export default function IRQuery(props) {
    
    const bglight = `url(${require('../imgs/IRlight.png')})`;
    const bgdark = `url(${require('../imgs/IRdark.png')})`;

    return(
        <ThemeContextConsumer>
            {(context) => (
                <div 
                style={{
                    backgroundImage:  context.dark ? bgdark : bglight,
                    backgroundSize: "cover",
                    height: "100vh"
                    }}>

                </div>
            )}
        </ThemeContextConsumer>
    )
}