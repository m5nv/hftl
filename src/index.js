import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import {login} from './userService';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App login={login} />
    <hr className="main"/>
    <div className="main">
    <h3 className="main">What does this app demonstrate?</h3>
    <p className="main">
      This is a minimal app was constructed to understand how RHF and RTL
      can be used together.
    </p>
    <ol className="main">
      <li> combining React Hook Form with React Testing Library</li>
      <li> use of userEvent instead of fireEvent in React Testing Library </li>
      <li> one approach to handling async form submit </li>
      <li> how to handle server side validation errors that don't map to form fields</li>
      <li> #2 and #3 are required knowledge if porting from Formik to React Hook Form </li>
      <li> Jest mock work around, thanks to @keiya01</li>
    </ol>
    <p className="main">
    First try filling in the form with incorrect email and different lengths
    for password, and observe form behavior. Then use proper credentials.
    The correct email/password values are 'test@mail.com' and 'password'. 
    <br /> <br />
    The code for this demo is derived from RHF documentation. Thanks to @bluebill1049
    </p>
  </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
