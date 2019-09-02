import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>Not Found</h1>
      <p className="lead">The page you requested was not found.</p>
      <Link to='/' className='btn btn-light'>Back To Home</Link>
    </div>
  )
}

export default NotFound
