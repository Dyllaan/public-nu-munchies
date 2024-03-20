"use client"
import { useState, useEffect } from 'react';
import { atom, useAtom } from "jotai";
import { useRouter } from 'next/navigation';
import { ClockIcon } from '@radix-ui/react-icons';
import { StarIcon } from '@radix-ui/react-icons';


interface Item {
  id?: number
  business_id?: number
  item_name?: string
  item_price?: number
  item_expiry?: string
  collect_time?: string
  collect_date?: string
  average_rating?: string
  business_name?: string
  address_line1?: string
  address_postcode?: string
  address_city?: string
  business_description?: string
  weight: number
  calories: number
  protein: number
  carbs: number
  fat: number
  salt: number
  quantity: number
}

function Items() {
  const router = useRouter();
  const [items, setItems] = useState<{ data: Item[] }>({
    data: []
  });
  const [selectedItem, setSelectedItem] = useAtom(selectedItemAtom);
  const today = new Date();
  const todaysDate = String(today.getDate());

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
    router.replace("/viewitem");
  }

  return (
    <>
      <div className="">
        {items.data?.map((value, key) => (
          <div key={key} className="border border-grey-200 rounded-md my-4" onClick={() => handleClick(value)}>
            <div className="pb-3 ">
              <p className="font-bold text-red-500 text-lg">{value.item_name}</p>
              <div className="flex relative items-center">
              <p>{value.business_name}</p>
              
              <StarIcon color='red' className="ml-1"radius='full'/>
              <p className="pr-1">{value.average_rating}</p>
              </div>
              <p className="text-sm text-gray-500">{value.address_city} <span className="text-black">|</span> {value.address_postcode}</p>
            </div>

            <div className="flex relative text-sm items-center">
              <ClockIcon className="w-3 h-3" />
              {value.collect_date !== todaysDate ? (
              <>
                <p className="ml-1">{value.collect_time} (tomorrow)</p>
              </>
              ) : (
                <>
              <p className="ml-1">{value.collect_time}</p>
              </>
              )}
              <p className="absolute bottom-0 right-0">£{value.item_price}</p>
            </div>
          </div>

        ))}
      </div>
    </>
  )
}
export const selectedItemAtom = atom<Item>({ id: undefined, item_name: undefined, item_price: undefined, item_expiry: undefined, average_rating: undefined,collect_time: undefined, collect_date: undefined, business_name: undefined, address_line1: undefined, address_postcode: undefined, address_city: undefined, business_description: undefined, weight: undefined, calories: undefined, protein: undefined, carbs:undefined, fat: undefined, salt:undefined, quantity: undefined});
export default Items;
