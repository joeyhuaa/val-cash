import './App.css';
import React,{useState} from 'react'
import View from "./components/View"

function App() {
  let [round, setRound] = useState(1)
  let [credits, setCredits] = useState(800)
  let [lossStreak, setLossStreak] = useState(0)
  // let [items, setItems] = useState(['classic'])
  let items = ['classic']

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

  return (
    <div>
      <div id="bg-image"></div>
      <div id="main-body">
        <View
          round={round}
          startingCreds={credits}
          startingItems={items}
          loseNext={loseNext}
          winNext={winNext}
        />
      </div>
    </div>
  );
}

export default App;
