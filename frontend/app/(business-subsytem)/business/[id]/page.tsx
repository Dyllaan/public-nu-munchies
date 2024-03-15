export default function BusinessPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <div className="relative h-[400px] w-full">
        <div className="z-10 absolute inset-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-end p-10">
          <h1 className="text-white text-3xl font-semibold">Business Info</h1>
          <p className="text-white text-lg">Business Description</p>
        </div>
        <img
          src="/business-subsystem/register-decor.jpg"
          alt="Decoration Background"
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="px-10 pt-10">
          <h2 className="text-2xl mb-4">Business Info</h2>
          <div className="flex gap-10 flex-wrap">
            <div>
              <h3 className="text-lg mt-3 mb-2">Contact Details</h3>
              <p>example@example.com</p>
              <p>+44 123 456 7890</p>
            </div>
            <div>
              <h3 className="text-lg mt-3 mb-2">Address</h3>
              <p>123 Example Street</p>
              <p>Example City</p>
              <p>EX1 1PL</p>
              <p>United Kingdom</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-10 border-t-1 border-gray-300 mx-10" />
      <div className="px-10 pb-10">
        <div>
          <h2 className="text-2xl mb-10">Menu</h2>
          <div>
            <h3 className="text-xl mt-3 mb-4 font-semibold">Menu 1</h3>

            <div className="flex-col gap-4 flex">
              <div className="flex gap-x-4 items-center flex-wrap">
                <img
                  src="/business-subsystem/menu-item.jpg"
                  alt="Menu Item"
                  className="w-full h-full md:w-40 md:h-40 rounded-lg bg-gray-200"
                />
                <div className="flex flex-col justify-between min-h-40 ">
                  <div>
                    <span className="bg-green-300 rounded-md px-2 py-1 font-semibold text-green-800 text-xs ">
                      Expiry: 01/01/2023
                    </span>
                    <h4 className="text-2xl font-bold mt-2">Menu Item 1</h4>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reduced Price</span>
                    <div>
                      <span className="text-lg font-bold">£</span>
                      <span className="text-3xl font-bold">10</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
