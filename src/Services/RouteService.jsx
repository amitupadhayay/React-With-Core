import React, { useState } from 'react';

class RouteService {

    // navigate(url) {
    //     window.location.href = '/' + url;
    // }

    navigate(props,url) {
        props.history.push(url);
        //history.push(url);
    }

    navigateByHistory(history,url) {
        history.push(url);
    }
}
export default new RouteService();