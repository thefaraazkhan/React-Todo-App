import React from 'react';

const linearLoading = () => (
  <div
    className='linear-loading'
    style={{ textAlign: 'center', padding: '6px 0' }}
  >
    <div className='spinner-grow text-primary' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
    <div className='spinner-grow text-secondary' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
    <div className='spinner-grow text-success' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
    <div className='spinner-grow text-danger' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
    <div className='spinner-grow text-warning' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
    <div className='spinner-grow text-info' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
  </div>
);

const circularLoading = () => (
  <div className='d-flex justify-content-center'>
    <div className='spinner-border' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
  </div>
);

export { linearLoading, circularLoading };
