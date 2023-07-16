import { useState } from 'react'
import Modal from './Modal.jsx'

import './App.css'

let secretNumber;

function App() {
  const [screenElements, screenElementsSetter] = useState('startingScreen');
  const [modal, modalSetter] = useState(false);

  //const [secretNumber, secretNumberSetter] = useState();
  const [attemptedGuess, attemptedGuessSetter] = useState();


  //Need to create a random SECRET NUMBER - secretNumber
  //NEED TO CHECK WHETHER GUESSED NUMBER = SECRET NUMBER 
  //ATTEMPTED GUESS SHOULD TAKE THE NUMBER FROM THE INPUT 
  //create score and highscore!

  function generateSecretNumber() {
    console.log(secretNumber)
    console.log(screenElements)

    if (screenElements === 'EasyMode') {
      secretNumber = Math.trunc(Math.random() * 20) + 1;
      console.log(secretNumber)
      console.log('vliza v easy')

    }

    if (screenElements === 'MediumMode') {
      secretNumber = Math.trunc(Math.random() * 40) + 1;

    }
    if (screenElements === 'HardMode') {
      secretNumber = Math.trunc(Math.random() * 60) + 1;

    }
  }




  function checkFunction() {
    console.log('check')

    if (!attemptedGuess) {
      //  <p id="message" className="message">⛔No Number!</p>
    }
    else if (attemptedGuess === secretNumber) {
      // <p id="message" className="message">👏Correct Number!</p>
      //          if (score > highScore) 
      //            highScore = score;
    }
    else if (attemptedGuess !== secretNumber) {
      if (score > 0) {
        // message.textContent = guess>secretNumber? '🙀Too high!': '🙀Too low!';
        score -= 1
      }
      if (score <= 0) {
        // message.textContent = '💥💥💥You lost the game!';
      }
    }
  }


  const startingScreen =
    <>
      <div className='header'>
        <h1>{screenElements} Guess My Number!</h1>
        <div className="number">?</div>
        <p className="between">Are you ready?</p>
      </div>

      <div className='leftAndRight'>
        <div className='left'>
          <button onClick={startGame} className='instructions-button'>Start  game!</button>
          {
            modal ? <Modal screenElements={screenElements} generateSecretNumber={generateSecretNumber} screenElementsSetter={screenElementsSetter} modalSetter={modalSetter} modal={modal}></Modal> : !modal
          }
          <div className='overlay hidden'></div>
        </div>

        <section className="right">
          <p id="message" className="message">Start guessing...</p>
          <p className="label-score">💯 Score: <span className="score">20</span></p>
          <p className="label-highscore">
            🥇 Highscore: <span className="highscore">0</span>
          </p>
        </section>
      </div>
    </>


  const NonStartingMode =
    <>
      <div className='header'>
        <h1>Guess My Number!</h1>
        <div className="number">?</div>
        <p className="between">Guess the number between 1 and {function () {
          if (screenElements === 'EasyMode') {
            return 20
          } else if (screenElements === 'MediumMode') {
            return 40
          } else if (screenElements === 'HardMode') {
            return 60
          }
        }()}
        </p>
        <button className="btn again">Again!</button>
        <button onClick={startGame} className='another-level '>Choose another level!</button>


      </div>

      <div className='leftAndRight'>
        {
          modal ? <Modal screenElements={screenElements} screenElementsSetter={screenElementsSetter} generateSecretNumber={generateSecretNumber} modalSetter={modalSetter} modal={modal}></Modal> : !modal
        }
        <div className='left'>
          {/* {
            modal ? <Modal screenElements={screenElements} secretNumber={secretNumber} generateSecretNumber={generateSecretNumber} secretNumberSetter={secretNumberSetter} modalSetter={modalSetter} modal={modal}></Modal> : !modal
          } */}
          <div className='overlay hidden'></div>
          <input id="input " type="number" className="guess" />
          <button onClick={checkFunction} className="btn check">Check!</button>
        </div>

        <section className="right">
          <p id="message" className="message">Start guessing...</p>
          <p className="label-score">💯 Score: <span className="score">20</span></p>
          <p className="label-highscore">
            🥇 Highscore: <span className="highscore">0</span>
          </p>
        </section>
        <p className="mode"></p>
      </div>
    </>


  function startGame() {
    console.log('vliza')
    modalSetter(() => {
      return !modal
    })

  }

  return (
    <>
      <div>
        {
          function () {
            switch (screenElements) {
              case 'startingScreen':
                return startingScreen
                break;
              case 'EasyMode':
                return NonStartingMode
                break;
              case 'MediumMode':
                return NonStartingMode
                break;
              case 'HardMode':
                return NonStartingMode
                break;
            }
          }()
        }
      </div>

    </>
  )
}



export default App
