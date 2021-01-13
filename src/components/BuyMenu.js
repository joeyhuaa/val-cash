import React, {useEffect, useState, useRef} from 'react'

import shortySound from '../assets/Valorant Sounds/Weapons/Shotguns/shortyTap.mp3'
import frenzySound from '../assets/Valorant Sounds/Weapons/Pistols/frenzyTap.mp3'
import ghostSound from '../assets/Valorant Sounds/Weapons/Pistols/ghostTap.mp3'
import sheriffSound from '../assets/Valorant Sounds/Weapons/Pistols/sheriffTap.mp3'
import stingerSound from '../assets/Valorant Sounds/Weapons/SMGs/stingerSpray.mp3'
import spectreSound from '../assets/Valorant Sounds/Weapons/SMGs/spectreTap.mp3'
import buckySound from '../assets/Valorant Sounds/Weapons/Shotguns/buckyTap.mp3'
import judgeSound from '../assets/Valorant Sounds/Weapons/Shotguns/judgeTap.mp3'
import bulldogSound from '../assets/Valorant Sounds/Weapons/Rifles/bulldogTap.mp3'
import guardianSound from '../assets/Valorant Sounds/Weapons/Rifles/guardianTap.mp3'
import phantomSound from '../assets/Valorant Sounds/Weapons/Rifles/phantomTap.mp3'
import vandalSound from '../assets/Valorant Sounds/Weapons/Rifles/vandalTap.mp3'
import marshalSound from '../assets/Valorant Sounds/Weapons/Snipers/marshalTap.mp3'
import opSound from '../assets/Valorant Sounds/Weapons/Snipers/operatorTap.mp3'
import aresSound from '../assets/Valorant Sounds/Weapons/LMGs/aresTap.mp3'

let menu = {
  shorty:200,
  frenzy:400,
  ghost:500,
  sheriff:800,
  stinger:1000,
  spectre:1600,
  bucky:900,
  judge:1500,
  bulldog:2100,
  guardian:2400,
  phantom:2900,
  vandal:2900,
  marshal:1100,
  operator:5000,
  ares:1700,
  odin:3200,
  light_armor:400,
  heavy_armor:1000
}

let sounds = [shortySound,frenzySound,ghostSound,sheriffSound,stingerSound,spectreSound,buckySound,
judgeSound,bulldogSound,guardianSound,phantomSound,vandalSound,marshalSound,opSound,aresSound]

function MenuItem({className, name, price, onTransact, playSound, isSelected}) {
  let [selected, setSelected] = useState(isSelected)

  useEffect(() => {
    setSelected(isSelected)
  }, [isSelected])

  return (
    <div className={selected ? className + `-selected` : className} onClick={() => {
      if (!selected) {
        let buySuccess = onTransact()
        setSelected(buySuccess ? !selected : selected)
        if (buySuccess) playSound(name)
      } else {
        onTransact()
        setSelected(false)
      }
    }}>
      <span>{name}</span>
      <span>{price}</span>
    </div>
  )
}

export default function BuyMenu({
  onTransact,
  playerItems
}) {
  let [gunSound, setGunSound] = useState(null)
  let gunPlayer = useRef(null)

  let playSound = (gunName) => {
    let file = sounds.filter(s => s.includes(gunName))[0]
    setGunSound(file)
    gunPlayer.current.currentTime = 0
    gunPlayer.current.load()
    gunPlayer.current.play()
  }

  return (
    <div style={{
      display:'flex',
      flexWrap:'wrap'
    }}>
      <audio id='gunPlayer' ref={gunPlayer}>
        <source src={gunSound} />
      </audio>

      {Object.entries(menu).map(item => 
        <MenuItem 
          className={'buy-item'}
          key={`${item[0]}`}
          name={item[0]}
          price={item[1]}
          onTransact={() => onTransact(item)}
          isSelected={playerItems.includes(item[0])}
          playSound={playSound}
        />
      )}
    </div>
  )
}