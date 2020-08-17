import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import {login} from './userService';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App login={login} />
    <hr />
    <div>
    <h3>What does this app demonstrate?</h3>
    <p>
      This is a minimal app that demonstrates failure condition when
      using React Hook Form + React Testing Library.

      The App itself is functioning as designed. Try it by clicking around
      and filling in junk values. The proper credentials are 'test@mail.com'
      and 'password'.
      
      All the likely scenarious work in browser. Specifically:
    </p>
    <ul>
      <li>✓ should display required error when value is invalid</li>
      <li>✓ should display matching error when email is invalid</li>
      <li>✓ should display min length error when password is invalid</li>
      <li>✓ should display no errors AND reset when accepted by server</li>
      <li>✓ should NOT reset AND display server validation errors</li>   
    </ul>
    <p>
      What is the issue? The last scenario fails in test :-( These same tests
      pass when using Formik!
    </p>
    <ul>
      <li>✕ should NOT reset AND display server validation errors
      </li>
    </ul>
  </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
