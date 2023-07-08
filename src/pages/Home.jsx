import React, { useEffect, useState } from "react";

import { cuisineData, restaurantsData } from "../data/data";
// console.log("cuisine", cuisineData, restaurantsData);

const Home = () => {
  const [showData, setShowData] = useState([]);
  const [reset, setReset] = useState(false);

  //   filter cuisine
  const handleCuisine = (id) => {
    setReset(true);
    const filterData = restaurantsData.filter(
      ({ cuisine_id }) => id === cuisine_id
    );
    console.log("filter", filterData);
    setShowData(filterData);
  };

  //   reset cuisine
  const resetCuisine = () => {
    setShowData(restaurantsData);
    setReset(false);
  };

  //   useeffect
  useEffect(() => {
    setShowData(restaurantsData);
  }, []);

  return (
    <div className="flex flex-col justify-between items-center ">
      <h1 className="text-5xl font-semibold">Food Ordering Website</h1>
      <div name="wrapper-div" className="mt-12 w-screen h-full">
        {/* cuisine */}
        <div name="cuisine-div" className="flex flex-col items-center">
          <h3 className="text-3xl my-4">Select your cuisine</h3>
          <div className=" flex justify-evenly ">
            {cuisineData.map((item) => {
              return (
                <div className="p-4" key={item.id}>
                  <button
                    className=" border-white border-4 px-6 py-2 text-lg uppercase rounded-lg bg-red-400"
                    onClick={() => handleCuisine(item.id)}
                  >
                    {item.name}
                  </button>
                </div>
              );
            })}
          </div>
          {reset && (
            <button
              className=" border-white border-4 px-6 py-2 text-lg uppercase rounded-lg bg-green-500"
              onClick={() => resetCuisine()}
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* display dishes */}
        <div className=" p-8">
          <div>
            {showData.map((item) => {
              return (
                <div key={item.id} className=" m-4 pb-16">
                  <h1 className="pl-16 text-3xl font-semibold">
                    Dishes by {item.name}
                  </h1>
                  <div className="w-full h-[300px] flex justify-center ">
                    {/* cards */}
                    {item.menu.map((menuItem, index) => {
                      return (
                        <div
                          key={index}
                          className="m-4 w-[250px] h-[300px] border-gray-400 border-2 rounded-lg flex flex-col justify-between "
                        >
                          <img
                            src={menuItem.imgSrc}
                            className="max-w-[100%] h-[200px] bg-center"
                          />
                          <div className=" p-2 ">
                            <p className="text-black text-xl font-semibold">
                              {menuItem.name}{" "}
                            </p>
                            <p className="text-gray-500">
                              Rs. {menuItem.price} for {menuItem.qty}
                            </p>
                            <p className="text-gray-500">{item.name} </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
