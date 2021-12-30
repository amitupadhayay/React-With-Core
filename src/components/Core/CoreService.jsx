//import React, { useState } from 'react';
import APIConfiguration from '../../Services/APIService'
//import Button from "@material-ui/core/Button";
import ControllerName from '../../Constants/global-constant';

class CoreService {


    checkAuthentication(userName, password) {
        return APIConfiguration.get("CheckAuthentication(userName=" + userName + ",password=" + password + ")", ControllerName.Auth);
    }

    checkToken() {
        let token = localStorage.getItem('token');
        return token === null || token === undefined ? false : true;
    }



}
export default new CoreService();;