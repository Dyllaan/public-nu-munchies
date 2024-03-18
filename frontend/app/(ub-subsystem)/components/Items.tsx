"use client"
import { useState, useEffect } from 'react';
import { atom, useAtom } from "jotai";
import { useRouter } from 'next/navigation';
import { ClockIcon } from '@radix-ui/react-icons';


interface Item {
  id?: number
  business_id?: number
  item_name?: string
  item_price?: number
  item_expiry?: string
  collect_time?: string
  business_name?: string
  business_address?: string
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
        {items.data?.map((value, key) => (
          <div key={key} className="relative mb-2 my-2 bg-[#eaeaea] rounded px-10" onClick={() => handleClick(value)}>
            <p className="font-bold">{value.item_name}</p>
            <p>Company: {value.business_name}</p>
            <p>Expiry: {value.item_expiry}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ClockIcon />
              <p>{value.collect_time}</p>
            </div>

            <p className="absolute bottom-0 right-0">£{value.item_price}</p>
          </div>
        ))}
      </div>
    </>
  )
}
export const selectedItemAtom = atom<Item>({ id: undefined, item_name: undefined, item_price: undefined, item_expiry: undefined, collect_time: undefined, business_name: undefined, business_address: undefined });
export default Items;
