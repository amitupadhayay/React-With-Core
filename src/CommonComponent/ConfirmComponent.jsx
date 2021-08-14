import React, { useState, useEffect, setState, state, Component } from 'react';
import Button from "@material-ui/core/Button";
import * as FaIcons from 'react-icons/fa';
import Grid from '@material-ui/core/Grid';

function ConfirmComponent(props) {

    const [dialogData, setDialogData] = useState(props.data);

    const handleOk = () => {
        props.confirmDailogClose(props.data, true);
    }

    return (
        <div className='p-36'>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <span>{dialogData.message}</span>
                </Grid>

                <Grid item xs={8}></Grid>
                <Grid item xs={4}>
                    <Button variant="contained" onClick={() => props.confirmDailogClose(props.data, true)}>
                        <FaIcons.FaSave></FaIcons.FaSave>Ok
                    </Button>
                </Grid>


            </Grid>

        </div >
    )
}
export default ConfirmComponent;