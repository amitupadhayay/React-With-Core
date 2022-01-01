import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as AiIcons from 'react-icons/ai';

const DialogComponent = (props) => {

    const [dialogData] = useState(props.data);

    const handleDialogClose = (val) => {
        props.handleDialogClose(val);
    }

    return (
        <>
            <Dialog open={true} aria-labelledby="form-dialog-title" className='p-8'>
                <div style={{
                    width: dialogData.width === undefined ? 'auto' : dialogData.width,
                    height: dialogData.height === undefined ? 'auto' : dialogData.height,
                }}>
                    <DialogTitle className='dialog-title'>
                        <div className="flex full-width title-pad">
                            <div className='width-95 text-left pl-8'>{dialogData.title === undefined ? 'Title' : dialogData.title}</div>
                            <div className='width-5 text-right '>
                                <AiIcons.AiOutlineCloseCircle className='font-size-30' onClick={() => handleDialogClose(false)}></AiIcons.AiOutlineCloseCircle></div>
                        </div>
                    </DialogTitle>
                </div>
                {dialogData.component}
            </Dialog>
        </>
    )
};

export default DialogComponent;