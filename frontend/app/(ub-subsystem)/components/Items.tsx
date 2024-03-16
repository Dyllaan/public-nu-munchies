"use client"
import { useState, useEffect } from 'react';
import { atom, useAtom } from "jotai";
import { useRouter } from 'next/navigation';

interface Item {
  id?: number
  business_id?: number
  item_name?: string
  item_price?: number
  item_expiry?: string
  collect_time?: string
}

function Items() {
  const router = useRouter();
  const [items, setItems] = useState<{ data: Item[] }>({
    data: []
  });
  const [selectedItem, setSelectedItem] = useAtom(selectedItemAtom);

  const fetchData = async () => {
    const res = await fetch("http://localhost:8080/getitems")
    return res.json()
  }

  useEffect(() => {
    if (items.data.length > 0) return;

    fetchData().then(res => {
      setItems(res);
      console.log(res);

    });
  }, []);

  const handleClick = (item: Item) => {
    console.log(item);
    setSelectedItem(item);
    router.replace("/checkout");
  }

  return (
    <>
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
    </>
  )
}
export const selectedItemAtom = atom<Item>({ id: undefined, item_name: undefined, item_price: undefined, item_expiry: undefined, collect_time: undefined });
export default Items;
