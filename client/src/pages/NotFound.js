import React from 'react';

function NotFound() {
  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div style={styles.centerAlign} className="col">NOT FOUND</div>
            </div>
        </div>
    </div>
  );
}

const styles = {
    splash: {
        width: '100%',
        // minWidth: '800px',
        resizeMode: 'contain'
    },
    centerAlign: {
        textAlign: 'center'
    }
}

export default NotFound;