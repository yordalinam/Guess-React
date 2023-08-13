import { useEffect, useState } from 'react'
import Modal from './Modal.jsx'
import './App.css'



let secretNumber;

function App() {
  const [screenElements, screenElementsSetter] = useState('startingScreen');
  const [modal, modalSetter] = useState(false);
  const [attemptedGuess, attemptedGuessSetter] = useState("");
  const [scoreEasy, scoreEasySetter] = useState(20);
  const [scoreMedium, scoreMediumSetter] = useState(20);
  const [scoreHard, scoreHardSetter] = useState(20);
  const [color, colorSetter] = useState('#222')
  const [revealNumber, revealNumberSetter] = useState(<div className="number">?</div>)

  const [winLoseShow, setWinLoseShow] = useState(<p id="message" className="message">Start guessing...</p>);
  const [highScoreEasy, setHighScoreEasy] = useState(0);
  const [highScoreMedium, setHighScoreMedium] = useState(0);
  const [highScoreHard, setHighScoreHard] = useState(0);

  useEffect(() => {
    if (screenElements === 'EasyMode') {
      secretNumber = Math.trunc(Math.random() * 20) + 1;
    }

    if (screenElements === 'MediumMode') {
      secretNumber = Math.trunc(Math.random() * 40) + 1;

    }
    if (screenElements === 'HardMode') {
      secretNumber = Math.trunc(Math.random() * 60) + 1;

    }
  }, [screenElements])




  useEffect(() => {
    setHighScoreEasy(() => {
      if (localStorage.getItem('guessTheNumberEasy')) {
        return parseInt(localStorage.getItem('guessTheNumberEasy'))
      }
      return 0
    })

    setHighScoreMedium(() => {
      if (localStorage.getItem('guessTheNumberMedium')) {
        return parseInt(localStorage.getItem('guessTheNumberMedium'))
      }
      return 0
    })

    setHighScoreHard(() => {
      if (localStorage.getItem('guessTheNumberHard')) {
        return parseInt(localStorage.getItem('guessTheNumberHard'))
      }
      return 0
    })
  }, [])


  function checkHighScore() {

    if (screenElements === 'EasyMode' && scoreEasy > highScoreEasy) {
      localStorage.setItem('guessTheNumberEasy', scoreEasy)
      console.log(scoreEasy, highScoreEasy)
      setHighScoreEasy(scoreEasy);
    }

    if (screenElements === 'MediumMode' && scoreMedium > highScoreMedium) {
      localStorage.setItem('guessTheNumberMedium', scoreMedium)
      setHighScoreMedium(scoreMedium);
    }

    if (screenElements === 'HardMode' && scoreHard > highScoreHard) {
      localStorage.setItem('guessTheNumberHard', scoreHard)
      console.log(scoreHard, highScoreHard)
      setHighScoreMedium(scoreHard);
    }
  }


  function checkFunction() {


    let msg;
    setWinLoseShow(msg)
    if (!attemptedGuess) {
      msg = <p id="message" className="message">⛔No Number!</p>
      setWinLoseShow(msg)
    }
    else if (parseInt(attemptedGuess) === secretNumber) {
      msg = <p id="message" className="message">👏Correct Number!</p>

      revealNumberSetter(<div className="number">{secretNumber}</div>)
      colorSetter('#237e23')
      setWinLoseShow(msg)
      checkHighScore()
    }

    else if (parseInt(attemptedGuess) !== secretNumber) {
      if (screenElements === 'EasyMode') {
        if (scoreEasy > 0) {
          attemptedGuess > secretNumber ? msg = <p id="message" className="message">🙀Too high!</p> : msg = <p id="message" className="message">🙀Too low!</p>;
          scoreEasySetter(scoreEasy - 1)

        }
        if (scoreEasy <= 1) {
          msg = <p id="message" className="message">💥💥💥You lost the game!!</p>
          colorSetter('#6f0a0a')

        }
        setWinLoseShow(msg)
      }

      else if (screenElements === 'MediumMode') {
        if (scoreMedium > 0) {
          attemptedGuess > secretNumber ? msg = <p id="message" className="message">🙀Too high!</p> : msg = <p id="message" className="message">🙀Too low!</p>;
          scoreMediumSetter(scoreMedium - 1)
        }
        if (scoreMedium <= 1) {
          msg = <p id="message" className="message">💥💥💥You lost the game!!</p>
          colorSetter('#6f0a0a')

        }
        setWinLoseShow(msg)
      }

      else if (screenElements === 'HardMode') {
        if (scoreHard > 0) {
          attemptedGuess > secretNumber ? msg = <p id="message" className="message">🙀Too high!</p> : msg = <p id="message" className="message">🙀Too low!</p>;
          scoreHardSetter(scoreHard - 1)
        }
        if (scoreHard <= 1) {
          msg = <p id="message" className="message">💥💥💥You lost the game!!</p>
          colorSetter('#6f0a0a')

        }
        setWinLoseShow(msg)
      }
    }
  }


  function start() {
    attemptedGuessSetter('')
    revealNumberSetter(<div className="number">?</div>)
    setWinLoseShow(<p id="message" className="message">Start guessing...</p>)
    scoreEasySetter(20)
    scoreMediumSetter(20)
    scoreHardSetter(20)
    setHighScoreEasy(highScoreEasy)
    setHighScoreMedium(highScoreMedium)
    setHighScoreHard(highScoreHard)

  }


  function startAgain() {
    if (screenElements === 'EasyMode') {
      secretNumber = Math.trunc(Math.random() * 20) + 1;
      console.log(screenElements, secretNumber)
    }
    if (screenElements === 'MediumMode') {
      secretNumber = Math.trunc(Math.random() * 40) + 1;
      console.log(screenElements, secretNumber)
    }

    if (screenElements === 'HardMode') {
      secretNumber = Math.trunc(Math.random() * 60) + 1;
      console.log(screenElements, secretNumber)
    }

    start()
    colorSetter('#222')
    modalSetter(() => {

      return modal
    })
  }

  function startGame() {
    start()
    modalSetter(() => {

      return !modal
    })
  }

  const startingScreen =
    <>
      <div style={{
        backgroundColor: color
      }}

        className='allWrapped'>
        <div className='header'>
          <h1> Guess My Number!</h1>
          <div className="number">{revealNumber}</div>
          <p className="between">Are you ready?</p>
        </div>

        <div className='leftAndRight'>
          <div className='left'>
            <button onClick={startGame} className='instructions-button'>Start  game!</button>
            {
              modal ? <Modal color={color} colorSetter={colorSetter} screenElements={screenElements} screenElementsSetter={screenElementsSetter} modalSetter={modalSetter} modal={modal}></Modal> : !modal
            }
            <div className='overlay hidden'></div>
          </div>

          <section className="right">
            <p id="message" className="message">Start guessing...</p>
            <p className="label-score">💯 Score: <span className="score">20</span></p>
            <p className="label-highscore">
              🥇 Highscore: {function () {
                if (screenElements === 'EasyMode') {
                  return highScoreEasy
                } else if (screenElements === 'MediumMode') {
                  return highScoreMedium
                } else if (screenElements === 'HardMode') {
                  return highScoreHard
                }
              }()
              } <span className="highscore"></span>
            </p>
          </section>
        </div>
      </div>
    </>


  const NonStartingMode =
    <>
      <div style={{
        backgroundColor: color
      }}

        className='allWrapped'>
        <div className='header'>
          <h1>Guess My Number!</h1>
          <div className="number">{revealNumber}</div>
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
          <div className='again_another'>
            <button onClick={startAgain} className="btn again">Again!</button>
            <button onClick={startGame} className='another-level '>Choose another level!</button></div>

        </div>

        <div className='leftAndRight'>
          {
            modal ? <Modal color={color} colorSetter={colorSetter} screenElements={screenElements} screenElementsSetter={screenElementsSetter} modalSetter={modalSetter} modal={modal}></Modal> : !modal
          }
          <div className='left'>
            <div className='overlay hidden'></div>
            <input value={attemptedGuess} onChange={(e) => {
              attemptedGuessSetter(e.target.value)
            }} id="input " type="number" className="guess" />
            <button

              onClick={checkFunction} className="btn check">Check!  </button>
          </div>

          <section className="right">
            {winLoseShow}
            <p className="label-score">💯 Score: <span className="score">{function () {
              if (screenElements === 'EasyMode') {
                return scoreEasy
              } else if (screenElements === 'MediumMode') {
                return scoreMedium
              } else if (screenElements === 'HardMode') {
                return scoreHard
              }
            }()}</span></p>
            <p className="label-highscore">
              🥇 Highscore: {function () {
                if (screenElements === 'EasyMode') {
                  return highScoreEasy
                } else if (screenElements === 'MediumMode') {
                  return highScoreMedium
                } else if (screenElements === 'HardMode') {
                  return highScoreHard
                }
              }()
              } <span className="highscore"></span>
            </p>
          </section>
          <p className="mode"></p>
        </div>
      </div>
    </>

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
