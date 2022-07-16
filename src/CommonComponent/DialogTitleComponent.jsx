
import React, { useState, useEffect } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';

import './CommonComponent.css'

import { Close, CloseOutlined } from '@material-ui/icons';

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
                            <Close className='font-size-30' onClick={() => props.handleDialogClose(false)}></Close></div>
                    </div>
                </DialogTitle>

            </div>
        </>
    )
}
export default DialogTitleComponent;