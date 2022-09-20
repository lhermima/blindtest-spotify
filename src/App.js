/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState } from 'react';

const apiToken = 'BQDqkc0XPPO4c_JXJ-8mLgeUcBJYEdnh6MSnOklIRhSmJUR1Py40y3l-hWhLNPRbhUqRYFt4b4B_WMBLCSVJdgcoq3661jiU6qT9d_WWb1G_KknC_37onJ1sHSFHIdXe4Z1hJ5NzsVlaKlcLdoyO-Y5wT1xUIfDm0NpHSDoxPguNwX03fretxKLsrRnQrDUDLb1ee-ZkljqP';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const App = () => {
  const [text, setText] = useState('');
  useEffect(() => {
    setText("Yo");
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Bienvenue sur le Blindtest</h1>
      </header>
      <div className="App-images">
        <p>{text}</p>
      </div>
      <div className="App-buttons">
      </div>
    </div>
  );
}

export default App;
