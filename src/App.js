import './App.css';
import React,{useState, useEffect} from 'react'
import View from "./components/View"
import {menuItems} from './components/Items'

function App() {
  let [round, setRound] = useState(1)
  let [score, setScore] = useState({playerTeam: 0, enemyTeam: 0})
  let [credits, setCredits] = useState(800)
  let [items, setItems] = useState(['classic'])
  let [lossStreak, setLossStreak] = useState(0)

  useEffect(() => {
    if (round === 13) {
      setCredits(800)
      setLossStreak(0)
      setItems(['classic'])
    }
  }, [round])

  useEffect(() => {
    if (credits > 9000 && round !== 13) setCredits(9000)
  }, [credits, round])

  let loseNext = () => {
    if (lossStreak === 0) {
      setCredits(credits+1900)
    } else if (lossStreak === 1) {
      setCredits(credits+2400)
    } else if (lossStreak >= 2) {
      setCredits(credits+2900)
    }
    setRound(round+1)
    setLossStreak(lossStreak+1)
    setScore({...score, enemyTeam: score.enemyTeam+1})
  }

  let winNext = () => {
    setRound(round+1)
    setCredits(credits+3000)
    setLossStreak(0)
    setScore({...score, playerTeam: score.playerTeam+1})
  }

  let onTransact = (newItem) => {
    let name = newItem[0]
    let price = newItem[1].price
    let type = newItem[1].type

    if (!items.includes(name)) {
      let duplicateTypeItem = items.find(item => menuItems[item].type === type)
      if (duplicateTypeItem) {
        if (credits + menuItems[duplicateTypeItem].price >= price) {
          let newItems = items
          newItems[newItems.indexOf(duplicateTypeItem)] = name
          setItems(newItems)
          setCredits(credits+menuItems[duplicateTypeItem].price-price) // first sell duplicateTypeItem then buy the new item
          return 1
        } else {
          alert("You need more credits!")
          return 0
        }
      } else {
        if (credits >= price) {
          setItems([...items, name])
          setCredits(credits-price)
          return 1
        } else {
          alert("You need more credits!")
          return 0
        }
      }
    } else {
      setCredits(credits+price)
      let newItems = items
      let i = items.indexOf(name)
      newItems.splice(i,1)
      setItems(newItems)
    }
  }

  let onDeath = () => {
    setItems(['classic'])
  }

  return (
    <div>
      <div id="bg-image"></div>
      <div id="main-body">
        <View
          round={round}
          score={score}
          playerCreds={credits}
          playerItems={items}
          onTransact={onTransact}
          updateCreds={creds => setCredits(creds)}
          loseNext={loseNext}
          winNext={winNext}
          onDeath={onDeath}
        />
      </div>
    </div>
  );
}

export default App;
