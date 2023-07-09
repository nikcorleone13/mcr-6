import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { cuisineData, restaurantsData } from "../data/data";
import { MdKeyboardBackspace } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

const Restaurant = () => {
  const [showData, setShowData] = useState([]);
  const [modal, setModal] = useState(false);
  const [revRating, setRevRating] = useState("");
  const [revName, setRevName] = useState("");
  const [revMessage, setRevMessage] = useState("");
  const { resId } = useParams();

  localStorage.setItem("resId", parseInt(resId));
  const showId = localStorage.getItem("resId");

  const resDetails = restaurantsData.filter(
    (item) => item.id === parseInt(showId)
  );

  useEffect(() => {
    setShowData(resDetails);
  }, []);

  const handleRatings = (e) => {
    setRevRating(e);
  };
  const handleName = (e) => {
    setRevName(e);
  };
  const handleMessage = (e) => {
    setRevMessage(e);
  };

  const handleReview = () => {
    const newRev = {
      rating: revRating,
      comment: revMessage,
      revName: revName,
      pp: "",
    };

    const updatedData = resDetails.map((item) => {
      if (item.id === parseInt(showId)) {
        return {
          ...item,
          ratings: [...item.ratings, newRev],
        };
      }
      return item;
    });
    setShowData(updatedData);
    console.log("updatedData", updatedData);
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between mx-0">
        <div className="p-0 left-0 w-[10%] flex justify-end">
          <h1>
            <Link to="/">
              {" "}
              <MdKeyboardBackspace size={40} />
            </Link>
          </h1>
        </div>
        <div className="w-[90%] h-screen flex justify-center">
          {showData.map(
            ({
              id,
              name,
              address,
              menu,
              phone,
              ratings,
              averageRating,
              description,
            }) => {
              return (
                <div className="w-[60%] p-4" key={id}>
                  <div className="p-1 flex justify-between">
                    <div className="min-w-[80%] text-gray-600">
                      <h1 className="text-6xl font-semibold text-black">
                        {name}
                      </h1>
                      {menu.map(({ name }, index) => {
                        return (
                          <p key={index} className="inline-block pt-2 text-xl">
                            {name},
                          </p>
                        );
                      })}
                      <p className="text-xl">{address}</p>
                      <p className="text-xl">Average Rating {averageRating}</p>
                    </div>

                    <div className="max-w-[20%] min-w-[10%] flex justify-center items-center">
                      <button
                        onClick={() => setModal(true)}
                        className="px-3 py-2 text-lg font-semibold uppercase rounded-lg bg-red-500 text-white"
                      >
                        Add Review
                      </button>
                    </div>
                  </div>

                  <div className="mt-12 p-6 border-t-2 border-black">
                    <h1 className="font-bold text-5xl">Reviews</h1>
                    <div className="pt-10">
                      {ratings.map(
                        ({ rating, comment, revName, pp }, index) => {
                          return (
                            <div key={index} className="m-2 p-6">
                              <div className="flex justify-between">
                                <div className="flex justify-start items-center">
                                  <img
                                    src={pp}
                                    className="rounded-[50%] w-12"
                                    alt="Reviewer Profile"
                                  />
                                  <p className="px-3 font-semibold">
                                    {revName}
                                  </p>
                                </div>
                                <div className="flex justify-center items-center text-2xl border-black px-3 py-2 rounded-xl bg-yellow-300">
                                  {rating} <FaStar size={20} className="pl-1" />
                                </div>
                              </div>
                              <p className="px-1 py-1 text-lg">{comment}</p>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
      {modal && (
        <div className="bg-transparent backdrop-blur-xl fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-red-400 flex flex-col items-center text-white font-semibold pb-10 rounded-xl">
            <GrClose
              onClick={() => setModal(false)}
              className="z-100 cursor-pointer mt-6  text-white "
              size={30}
              style={{ color: "white" }}
            />
            <h1 className="text-4xl font-bolder pt-8">Add your review</h1>
            <div className="p-20 flex flex-col justify-center border-t-4 mt-2">
              <div className="w-[500px] h-[100px] text-xl flex justify-between items-center">
                <p className="">Rating:</p>
                <select
                  className="text-black"
                  onChange={(e) => handleRatings(e.target.value)}
                >
                  <option value="0">Select rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="py-6 flex justify-between text-xl">
                <p className="text-xl">Name:</p>
                <textarea
                  name="message"
                  placeholder="Enter your message"
                  onChange={(e) => handleName(e.target.value)}
                  rows="2"
                  className="font-normal resize-none w-[300px] p-2 bg-white text-black border-2 rounded-md focus:outline-none md:border-2 md:rounded-md md:text-textPrimaryDesktop md:border-textPrimaryDesktop md:focus:border-textPrimaryDesktopHover"
                ></textarea>
              </div>
              <div className="flex justify-between text-xl">
                <p className="text-xl">Comment:</p>
                <textarea
                  name="message"
                  placeholder="Enter your Review"
                  onChange={(e) => handleMessage(e.target.value)}
                  rows="3"
                  className="font-normal resize-none w-[300px] p-2 bg-white text-black border-2 rounded-md focus:outline-none md:border-2 md:rounded-md md:text-textPrimaryDesktop md:border-textPrimaryDesktop md:focus:border-textPrimaryDesktopHover"
                ></textarea>
              </div>
            </div>
            <button
              onClick={() => {
                setModal(false);
                handleReview();
              }}
              className="px-3 py-2 text-lg font-semibold uppercase rounded-lg bg-white text-black hover:bg-green-400 "
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
