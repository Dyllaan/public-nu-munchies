'use client'
/*
Items

@author Cameron Bramley (w21020682) 
*/
import { useState, useEffect } from 'react'
import Checkout from './Checkout' 

function Items() {
  const [items, setItems] = useState({
    data: []
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    const res = await fetch("http://localhost:8080/getitems")
    return res.json()
  }

  useEffect(() => {
    if (items.data.length > 0) return;
    fetchData().then(res => {
      setItems(res);
    });
  }, []);

  const handleClick = (item) => {
    setSelectedItem(item);
    setShowCheckout(true);
  }

  const itemsDisplay = (
    <div className="grid-cols-{4}">
      <div className="bg-[#eaeaea] my-2 rounded">
        {items.data?.map((value, key) => (
          <div key={key} className="mb-2" onClick={() => handleClick(value)}>
            <p className="font-bold">{value.item_name}</p>
            <p>Price: £{value.item_price}</p>
            <p>Expiry: {value.item_expiry}</p>
            <p>Collection Time: {value.collect_time}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {itemsDisplay}
      {showCheckout && <Checkout item={selectedItem} />}
    </>
  )
}

export default Items
