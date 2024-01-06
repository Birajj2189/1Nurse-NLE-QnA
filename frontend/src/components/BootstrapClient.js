"use client"

import {useEffect} from "react";

function BootstrapClient(props) {
    useEffect(()=>{
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
    },[]);
    return null;
}

export default BootstrapClient;