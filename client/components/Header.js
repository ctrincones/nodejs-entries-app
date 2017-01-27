import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <header>
      <h1>This is a header</h1>
      <nav>
        <Link to="/signup">Sign up</Link>
        <Link to="/register">Register</Link>
     </nav>
    </header>
  );
}
