import './App.css';
import React,{useState, useEffect} from 'react'
import View from "./components/View"

function App() {
  let [round, setRound] = useState(1)
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

  let loseNext = (prevCreds) => {
    setRound(round+1)
    if (lossStreak === 0) {
      setCredits(prevCreds+1900)
    } else if (lossStreak === 1) {
      setCredits(prevCreds+2400)
    } else if (lossStreak >= 2) {
      setCredits(prevCreds+2900)
    }
    setLossStreak(lossStreak+1)
  }

  let winNext = (prevCreds) => {
    setRound(round+1)
    setCredits(prevCreds+3000)
    setLossStreak(0)
  }

  let onTransact = (item) => {
    let name = item[0]
    let price = item[1]
    if (!items.includes(name)) {
      if (credits >= price) {
        setCredits(credits-price)
        setItems([...items, name])
        return 1
      } else {
        alert("You need more credits!")
        return 0
      }
    } else {
      setCredits(credits+price)
      let newItems = items
      let i = items.indexOf(name)
      newItems.splice(i,1)
      setItems(newItems)
    }
  }

  return (
    <div>
      <div id="bg-image"></div>
      <div id="main-body">
        <View
          round={round}
          playerCreds={credits}
          playerItems={items}
          onTransact={onTransact}
          loseNext={loseNext}
          winNext={winNext}
        />
      </div>
    </div>
  );
}

export default App;
