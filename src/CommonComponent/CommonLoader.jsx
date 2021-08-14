import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function CommonLoaderIcon(props) {

    return (
        <div className='text-center m-16'>
        <React.Fragment>
          <CircularProgress size={30} color='#1a83ff' />
          {/* <LinearProgress variant="determinate" value={normalise(props.value)} /> */}
        </React.Fragment>
        </div>
      )
}
export default CommonLoaderIcon;