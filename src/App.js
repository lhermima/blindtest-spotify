/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState, useEffect } from 'react';

const apiToken = 'BQCa2Q9YbQxvCBXpWAYd9O6vd-zjwMs-pcLdiafFuTUTSOgM1LQvi7Szjjle1jrGliM7ttuGmYAhZhQzPKmgkjz3T4d5QJZfmr6uQrkT7LKiTPNbnzcE8uMwakPfwzm_8nUkobKSFPtVBpW0VBbR24H9Bqd3UL9zQ4Yznu-_qzVHlS3AXh-_uBR7M1e_LxNnlT5slq0ISOdH';

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
    const [currentTrack, setCurrentTrack] = useState(null);
    const [timeoutId, setTimeoutId] = useState();
    
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
      setText(data.items.length + " titres ont été chargés");
      setTracks(data.items);
      const rIndex1 = getRandomNumber(data.items.length);
      setCurrentTrack(data.items[rIndex1].track);
      
      setSongsLoaded(true);
    })
  }, []);
  
  useEffect(() => {
    setTimeoutId(setTimeout(() => getNewSong(), 30000));    
  }, [track01]);
  
  const checkAnswer = (id) => {
    if (currentTrack.id === id) {
      clearTimeout(timeoutId);
      swal('Bravo', 'C\'est gagné', 'success').then(() => getNewSong());
    } else {
      swal('Dommage !', 'Essaye encore', 'error');
    }
  };

  const getNewSong = () => {
    if (tracks && songsLoaded) {
      const rIndex = getRandomNumber(tracks.length);
      setCurrentTrack(tracks[rIndex].track);
    }
  }
  
  if (!songsLoaded) {
    return (
      <div className="App">
      <img src={loading} className="App-logo" alt="logo"/>
      </div>
      );
    }
    
    const rIndex2 = getRandomNumber(tracks.length);
    const rIndex3 = getRandomNumber(tracks.length);
    
    const track01 = currentTrack;
    const track02 = tracks[rIndex2].track;
    const track03 = tracks[rIndex3].track;
    
    const displayedTracks = [track01, track02, track03];
    shuffleArray(displayedTracks);
    
    return (
      <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <h1 className="App-title">Bienvenue sur le Blindtest</h1>
      </header>
      <div className="App-images">
      <p>{text}</p>
      <AlbumCover track={track01} />
      <Sound url={track01.preview_url} playStatus={Sound.status.PLAYING}/>
      </div>
      <div className="App-buttons">
      {displayedTracks.map(track => (<Button onClick={() => checkAnswer(track.id)}>Titre : {track.name}</Button>))}
      </div>
      </div>
      )
      
      
    }
    
    export default App;
    