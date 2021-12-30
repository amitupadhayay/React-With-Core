// import React, { useState } from 'react';
// import { createBrowserHistory } from 'history';

class RouteService {



    //    constructor(){
    //     history = createBrowserHistory();
    //    }

    // navigate(url) {
    //     window.location.href = '/' + url;
    // }

    navigate(url) {
        //props.history.push(url);
        window.location.href = url;
    }

    navigateByHistory(history, url) {
        if (history.push !== undefined) {
            history.push(url);
        }
        else if (history.history.push !== undefined) {
            history.history.push(url);
        }

    }
}
export default new RouteService();