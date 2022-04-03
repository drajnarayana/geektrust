import React from 'react';
import ReactDOM from 'react-dom/client'; //New import for React 18
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root=ReactDOM.createRoot(        //syntax for new React 18
 
  document.getElementById('root')
);
root.render( <React.StrictMode>
  <App />
</React.StrictMode>)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
