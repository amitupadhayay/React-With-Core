import React, { useState } from 'react';

class RouteService {

    navigate(url) {
        window.location.href = '/' + url;
    }

}
export default new RouteService();;