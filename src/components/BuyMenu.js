import React,{useState} from 'react'

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

function MenuItem({className, name, price, onTransact}) {
  let [selected, setSelected] = useState(false)

  return (
    <div className={selected ? className + `-selected` : className} onClick={() => {
      if (!selected) {
        let buySuccess = onTransact()
        setSelected(buySuccess ? !selected : selected)
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
  onTransact
}) {
  return (
    <div style={{
      display:'flex',
      flexWrap:'wrap'
    }}>
      {Object.entries(menu).map(item => 
        <MenuItem 
          className={'buy-item'}
          name={item[0]}
          price={item[1]}
          onTransact={() => onTransact(item)}
        />
      )}
    </div>
  )
}