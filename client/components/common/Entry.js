import React, { Component } from 'react';
import './styles/styles.sass';

export default () => {
  return (
        <section>
          <header>
            <h4 className="Entry-title"><strong>Entry title</strong></h4>
          </header>
          <article className="Entry-content">
            <p>Entry content</p>
          </article>
          <footer className="Entry-info">
            <p>Published by <a href="#">Username</a> @ <time>10:00</time></p>
          </footer>
        </section>
  );
}
