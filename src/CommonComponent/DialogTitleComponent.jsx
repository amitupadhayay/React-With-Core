
import React, { useState, useEffect } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
//import DialogContent from '@material-ui/core/DialogContent';
//import DialogActions from '@material-ui/core/DialogActions';
//import Button from "@material-ui/core/Button";
//import Dialog from '@material-ui/core/Dialog';
import * as AiIcons from 'react-icons/ai';
import './CommonComponent.css'

function DialogTitleComponent(props) {

    //const [open, setOpen] = useState(false);
    const [dialogData] = useState(props.data);

    useEffect(() => {
    }, [])

    // const handleClose = () => {
    //     setOpen(false);
    //};

    return (
        <>
            <div style={{
                width: dialogData.width === undefined ? 'auto' : dialogData.width,
                height: dialogData.height === undefined ? 'auto' : dialogData.height,
            }}>
                <DialogTitle className='dialog-title'>
                    <div className="flex full-width title-pad">
                        <div className='width-95 text-left pl-8'>{dialogData.title === undefined ? 'Title' : dialogData.title}</div>
                        <div className='width-5 text-right '>
                            <AiIcons.AiOutlineCloseCircle className='font-size-30' onClick={() => props.handleDialogClose(false)}></AiIcons.AiOutlineCloseCircle></div>
                    </div>
                </DialogTitle>

            </div>
        </>
    )
}
export default DialogTitleComponent;