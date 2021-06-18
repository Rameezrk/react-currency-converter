
//imports React into this js file
import React from 'react';

//imports the react dom into this file 
import ReactDOM from 'react-dom';

//imports the app.js file into this one
import App from './App';


//renders the app.js file into this index file 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


