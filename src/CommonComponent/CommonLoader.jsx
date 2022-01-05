import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function CommonLoaderIcon(props) {

    return (
        <div className='text-center m-16'>
        <React.Fragment>
          <CircularProgress size={30} color='primary' />
        </React.Fragment>
        </div>
      )
}
export default CommonLoaderIcon;