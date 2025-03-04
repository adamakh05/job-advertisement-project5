import React from 'react'; // imports react elements
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); //creates react element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
