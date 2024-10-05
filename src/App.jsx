import { useEffect, useState } from 'react';
import './App.css'
import { useRef } from 'react';

function App() {
  const [ volume, setVolume ] = useState(0.5);
  const [ power, setPower ] = useState(true);
  const [ audioName, setAudioName ] = useState("");
  const [ bank, setBank ] = useState(false);

  const drumPads = useRef([]);

  const BankOFF = {

    keys: {
      'Q': 'Heater 1',
      'W' : 'Heater 2',
      'E' : 'Heater 3',
      'A' : 'Heater 4',
      'S' : 'ClapOpen-HH',
      'D' : 'Open-HH',
      'Z' : "Kick-n'-Hat",
      'X' : 'Kick',
      'C' : 'Closed-HH'
    },

    src: {
      'Q' : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3',
      'W' : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3',
      'E' : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3',
      'A' : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3',
      'S' : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3',
      'D' : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3',
      "Z" : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3',
      'X' : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3',
      'C' : 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3'
    }

  }

  const BankON = {

    keys: {
      'Q' : "Chord-1",
      'W' : "Chord-2",
      'E' : "Chord-3",
      'A' : "Shaker",
      'S' : "Open-HH",
      'D' : "Closed-HH",
      'Z' : "Punchy-Kick",
      'X' : "Side-Stick",
      'C' : "Snare"
    },

    src: {
      'Q' : "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
      'W' : "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
      'E' : "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
      'A' : "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
      'S' : "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
      'D' : "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
      "Z" : "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
      'X' : "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
      'C' : "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
    }

  }

  const playAudio = (pad, audio) => {
    pad.classList.add('active');
    setTimeout(() => {
      pad.classList.remove('active');
    }, 200);
    setAudioName(pad.id);
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
  }

  const handlePadClick = (padIndex) => {
      if (power) {
        const pad = drumPads.current[padIndex];
        const audio = pad.querySelector('audio');
        if (audio) {
          playAudio(pad, audio);
        }
      }
};

const handleKeyDown = (event) => {
  if (power) {
    const key = event.key.toUpperCase();
    const padIndex = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].indexOf(key);
    if (padIndex >= 0) {
      const pad = drumPads.current[padIndex];
      const audio = pad.querySelector('audio');
      if (audio) {
        playAudio(pad, audio);
      }
    }
  }
};

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
  }

  }, [])

  const handleVolumeChange = (event) => {
    const volumeValue = event.target.value;
    setVolume(volumeValue);
  }

  return (
    <main className="container" id="drum-machine">
      <div className="background" id="display">
        <div className="buttons">
          {['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].map((key, index) => (
            <a
              className='btn drumpad'
              key={key}
              id={bank ? BankON.keys[key] : BankOFF.keys[key]}
              ref={(el) => (drumPads.current[index] = el)}
              onClick={() => handlePadClick(index)}
            >
              <audio
                id={key}
                src={bank ? BankON.src[key] : BankOFF.src[key]}
              />
              {key}
            </a>
          ))}
        </div>
        <div className="settings">
          <div className="control">
              <p>Power</p>
            <div className="select">
            <div class={`powerInner inner ${!power ? 'powerOff' : ''}`} id="power_ON_OFF" onClick={() => setPower((prev) => !prev)}></div>
            </div>
            <p className={`state ${power ? 'stateON' : 'stateOFF'}`}>{power ? "ON" : "OFF"}</p>
          </div>
        
          <div className="display" id="audioName">{audioName}</div>
          <div className="volume-slider">
            <input id="volume_slider" type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange}/>
            <p>Volume</p>
          </div>
        
          <div className="control">
              <p>Bank</p>
            <div className="select">
            <div class={`bankInner inner ${bank ? 'bankON' : ''}`} id="bank_ON_OFF" onClick={() => setBank((prev) => !prev)}></div>
            </div>
            <p className={`state ${bank ? 'stateON' : 'stateOFF'}`}>{bank ? "ON" : "OFF"}</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
