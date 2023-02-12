import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Cancel } from '@material-ui/icons';

const DialogComponent = (props) => {

    const [dialogData] = useState(props.data);

    const handleDialogClose = (val) => {
        props.handleDialogClose(val);
    }

    return (
        <>
            <Dialog open={true} aria-labelledby="form-dialog-title">
                <div style={{
                    width: dialogData.width === undefined ? 'auto' : dialogData.width,
                    height: dialogData.height === undefined ? 'auto' : dialogData.height,
                }}>
                    <DialogTitle className='dialog-title'>
                        <div className="flex full-width title-pad">
                            <div className='width-95 text-left pl-8'>{dialogData.title === undefined ? 'Title' : dialogData.title}</div>
                            <div className='width-5 text-right '>
                                <Cancel className='dialog-close-btn' onClick={() => handleDialogClose(false)}></Cancel>
                            </div>
                        </div>
                    </DialogTitle>
                </div>
                <div className='app-dialog-space'>
                    {dialogData.component}
                </div>
            </Dialog >
        </>
    )
};

export default DialogComponent;