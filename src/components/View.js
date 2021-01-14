import React, {useState, useEffect, useRef} from "react";
import {Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

import BuyMenu from './BuyMenu'

import kill_1 from '../assets/1stkill.mp3'
import kill_2 from '../assets/2ndkill.mp3'
import kill_3 from '../assets/3rdkill.mp3'
import kill_4 from '../assets/4thkill.mp3'
import ace from '../assets/ace.mp3'
import victorySound from '../assets/Valorant Sounds/Voice Lines/Announcer/victory.mp3'

import kill_icon from '../assets/kill-icon.png'

let killSounds = [kill_1, kill_2, kill_3, kill_4, ace]

export default function View({
  round,
  score,
  playerCreds,
  playerItems,
  loseNext,
  winNext,
  onTransact,
  updateCreds,
  onDeath
}) {
  let [kills, setKills] = useState(0)
  let [killSound, setKillSound] = useState(kill_1)
  let [isPlayerDead, setIsPlayerDead] = useState(false)

  let killSoundPlayer = useRef(null)
  let victoryPlayer = useRef(null)

  useEffect(() => {
    setKillSound(killSounds[kills])
  }, [kills])

  useEffect(() => {
    setKills(0)
    setIsPlayerDead(false)
  }, [round])

  useEffect(() => {
    if (isPlayerDead) onDeath()
  }, [isPlayerDead])

  let addKill = () => {
    killSoundPlayer.current.currentTime = 0
    killSoundPlayer.current.load()
    killSoundPlayer.current.play()
    setKills(kills+1)
    updateCreds(playerCreds+200)
  }

  let removeKill = () => {
    setKills(kills-1)
    updateCreds(playerCreds-200)
  }

  return (
    <div id='view'>
      <audio id='kill-sound-player' ref={killSoundPlayer}>
        <source src={killSound} type='audio/mpeg' />
      </audio>

      <audio id='victory-player' ref={victoryPlayer}>
        <source src={victorySound} type='audio/mpeg' />
      </audio>

      <h1 className='title score'>{score.playerTeam}-{score.enemyTeam}</h1>
      <h1 className='title'>Round {round}</h1>
      <h2 className='subtitle'>You have <h2 className='credits subtitle'>{playerCreds}</h2> credits to spend.</h2>

      <div className='kill-death-section'>
        <div className='kill-section'>
          <h3 className='sec-title'>Your kills:</h3>
          <div id='kill-container'>
            {Array(kills).fill('kill').map((_,i) => 
              <img 
                src={kill_icon} 
                className='kill-icon'
                key={`kill-${i}`} 
                alt='kill' 
              />
            )}
          </div>
          <div style={{marginTop:'9px'}}>
            {kills < 5 && 
              <Button className="button" onClick={addKill} style={{marginRight:'10px'}}>Add Kill</Button>
            }
            {kills > 0 && <Button className="button" onClick={removeKill}>Remove Kill</Button>}
          </div>
        </div>

        {round > 1 && 
          <div id='death-section'>
            <h3 className='sec-title'>Did you die last round?</h3>
            <input type='checkbox' checked={isPlayerDead} onChange={() => setIsPlayerDead(!isPlayerDead)} />
            <label style={{marginLeft:'5px'}}>Yes</label>
          </div>
        }
      </div>

      <div className='buy-section'>
        <h3 className='sec-title'>Buy:</h3>
        <BuyMenu
          onTransact={onTransact}
          playerItems={playerItems}
        />
        <div style={{display:'flex', justifyContent:'space-between', marginTop:'30px'}}>
          <Button 
            variant="danger" 
            className="button" 
            onClick={loseNext}
          >Lose this round</Button>
          <Button 
            variant="info" 
            className="button" 
            onClick={() => {
              victoryPlayer.current.currentTime = 0
              victoryPlayer.current.play()
              winNext()
            }}
          >Win this round</Button>
        </div>
      </div>
    </div>
  )
}