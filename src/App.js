/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState, useEffect } from 'react';

const apiToken = 'BQB0hJ3kGlQk-JtBGVi33-c0TS1QqdAvAAMHsLtJKq6VaECOsTcjJCwOzAC9Eesur_nIubWFy0Gklr9djzNjJQvczyYpjEDWRmgwvg1jxHW6cIPbKg5TCDWQRx5ZXXX7XFWlfD8XMYraFMm2DZrrFXuP1044U5l7XiLXuJ-yeHlFiJWB2qjQL6QF8dU9RHpS6ZECBQ59jYUp';

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

const AlbumCover = (props) =>  {
  const src = props.track.album.images[0].url; // A changer ;)
  return (
      <img src={src} style={{ width: 400, height: 400 }} />
  );
}

const App = () => {
  const [text, setText] = useState('');
  const [tracks, setTracks] = useState([]);
  const [songsLoaded, setSongsLoaded] = useState(false);
  
  useEffect(() => {
    fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  })
  .then(response => response.json())
  .then((data) => {
    console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
    console.log(data.items.length);
    setText("Blindtest ready !");
    setTracks(data.items);
    setSongsLoaded(true);
  })
}, []);

if (!songsLoaded) {
  return (
    <div className="App">
      <img src={loading} className="App-logo" alt="logo"/>
    </div>
  );
}

const track01 = tracks[1].track;
const track02 = tracks[2].track;
const track03 = tracks[3].track;

return (
  <div className="App">
    <header className="App-header">
    <img src={logo} className="App-logo" alt="logo"/>
    <h1 className="App-title">Bienvenue sur le Blindtest</h1>
  </header>
    <div className="App-images">
    <p>{tracks.length} chansons ont été chargées.</p>
    <p>Première chanson : {track01.name}</p>
    <AlbumCover track={track01} />
    <Sound url={track01.preview_url} playStatus={Sound.status.PLAYING}/>
  </div>
  <div className="App-buttons">
    <Button>Premier titre : {track01.name}</Button>
    <Button>Deuxième titre : {track02.name}</Button>
    <Button>Troisième titre : {track03.name}</Button>
  </div>
  </div>
)


}

export default App;
