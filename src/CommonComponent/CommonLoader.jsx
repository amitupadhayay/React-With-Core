import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function CommonLoaderIcon(props) {

    return (
        // <div className='text-center m-16'>
        <React.Fragment>
          <CircularProgress size={props.size} color='primary' />
          <span className='pl-8'>{props.text}</span>

        </React.Fragment>
      )
}
export default CommonLoaderIcon;