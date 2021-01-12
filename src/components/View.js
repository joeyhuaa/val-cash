import React,{useState, useEffect, useRef} from "react";
import {Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

import BuyMenu from './BuyMenu'

import kill_1 from '../assets/1stkill.mp3'
import kill_2 from '../assets/2ndkill.mp3'
import kill_3 from '../assets/3rdkill.mp3'
import kill_4 from '../assets/4thkill.mp3'
import ace from '../assets/ace.mp3'
import kill_icon from '../assets/kill-icon.png'

// let menu = {
//   shorty:200,
//   frenzy:400,
//   ghost:500,
//   sheriff:800,
//   stinger:1000,
//   spectre:1600,
//   bucky:900,
//   judge:1500,
//   bulldog:2100,
//   guardian:2400,
//   phantom:2900,
//   vandal:2900,
//   marshal:1100,
//   operator:5000,
//   ares:1700,
//   odin:3200,
//   light_armor:400,
//   heavy_armor:1000
// }

let killSounds = [kill_1, kill_2, kill_3, kill_4, ace]

export default function View({
  round,
  startingCreds,
  startingItems,
  loseNext,
  winNext,
}) {
  let [kills, setKills] = useState(0);
  let [creds, setCreds] = useState(startingCreds)
  let [items, setItems] = useState(startingItems)
  let [killSound, setKillSound] = useState(kill_1)
  let killSoundPlayer = useRef(null)

  useEffect(() => {
    setCreds(startingCreds)
  }, [startingCreds])

  useEffect(() => {
    setKillSound(killSounds[kills])
  }, [kills])

  useEffect(() => {
    setKills(0)
  }, [round])

  let addKill = () => {
    killSoundPlayer.current.currentTime = 0
    killSoundPlayer.current.load()
    killSoundPlayer.current.play()
    setKills(kills+1)
    setCreds(creds+200)
  }

  let removeKill = () => {
    setKills(kills-1)
    setCreds(creds-200)
  }

  let onTransact = (item) => {
    let name = item[0]
    let price = item[1]
    if (!items.includes(name)) {
      if (creds >= price) {
        setCreds(creds-price)
        setItems([...items, name])
        return 1
      } else {
        alert("You need more credits!")
        return 0
      }
    } else {
      setCreds(creds+price)
      let newItems = items
      let i = items.indexOf(name)
      newItems.splice(i,1)
      setItems(newItems)
    }
  }

  return (
    <div id='view'>
      <audio id='kill-sound-player' ref={killSoundPlayer}>
        <source src={killSound} type='audio/mpeg' />
      </audio>

      <h1 className='title'>Round {round}</h1>
      <h2 className='subtitle'>You have {creds} credits to spend.</h2>
      <div style={{display:'flex', position:'relative', marginTop:'50px'}}>
        <h3 className='sec-title'>Your kills:</h3>
        {Array(kills).fill('kill').map((_,i) => 
          <img 
            src={kill_icon} 
            key={`kill-${i}`} alt='kill' 
            style={{
              height:60,
              position:'absolute',
              left:i*70+180,
              top:-20
            }} 
          />
        )}
      </div>
      {kills < 5 && <Button className="button" onClick={addKill} style={{marginRight:'10px'}}>Add Kill</Button>}
      {kills > 0 && <Button className="button" onClick={removeKill}>Remove Kill</Button>}
      <div style={{marginTop:'50px'}}>
        <h3 className='sec-title'>Buy:</h3>
        <BuyMenu
          onTransact={onTransact}
        />
        <div style={{display:'flex', justifyContent:'space-between', marginTop:'30px'}}>
          <Button variant="danger" className="button" onClick={() => loseNext(creds)}>Lose this round</Button>
          <Button variant="info" className="button" onClick={() => winNext(creds)}>Win this round</Button>
        </div>
      </div>
    </div>
  )
}