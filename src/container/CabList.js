import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CabList extends Component {

  render() {
    const { cab } = this.props;
    return (
        
        <div style={{
            display: 'flex', justifyContent: 'center', flexFlow: 'row wrap', padding: '10px 0px', margin: 10, border: '1px solid #d9d9d9', borderRadius: 10, width: 300,
        }}
        >

            <div style={{ display: 'flex', flexFlow: 'column wrap', width: '100%' }}>

            <div style={{ display: 'flex', flexFlow: 'column wrap', padding: 10 }}>
                <div style={{ fontSize: '10px' }}>Cab Id : </div>
                <div style={{ fontSize: '14px', maxWidth: 250, overflowWrap: 'break-word' }}><b>{cab.id}</b></div>
            </div>

            <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                <div style={{ display: 'flex', flexFlow: 'column wrap', padding: 10 }}>
                <div style={{ fontSize: '10px' }}>Latitude : </div>
                <div style={{ fontSize: '14px', maxWidth: 250, overflowWrap: 'break-word' }}><b>{cab.location.latitude}</b></div>
                </div>
                <div style={{ display: 'flex', flexFlow: 'column wrap', padding: 10 }}>
                <div style={{ fontSize: '10px' }}>Longitude : </div>
                <div style={{ fontSize: '14px', maxWidth: 250, overflowWrap: 'break-word' }}><b>{cab.location.longitude}</b></div>
                </div>

            </div>

            <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                <div style={{ display: 'flex', flexFlow: 'column wrap', padding: 10 }}>
                <div style={{ fontSize: '10px' }}>Color : </div>
                <div style={{ fontSize: '14px', maxWidth: 250, overflowWrap: 'break-word' }}><b>{cab.color}</b></div>
                </div>
            </div>
            </div>
        </div> 
    )
  }
}

CabList.propTypes = {
    cab: PropTypes.object.isRequired,
};

export default CabList;
