import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RegisterPage() {
  const location = useLocation();
  const state = location.state;
  const username = state.firstName + state.lastName;
  const navigate = useNavigate();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(username + "@jobjug.co");
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleHome = async () => {
    navigate("/home");
  };
  return (
    <>
      <div className="pt-32">
        <div className="w-3/4 h-fit border-2 rounded-lg px-20 border-gray-200 m-auto">
          <div className="mt-20"></div>

          <div className=" bg-red-500 rounded-full size-20"> </div>

          <div className="w-4/5 grid grid-rows-2">
            <div className="container mt-20">
              <h3> Don't lose it!</h3>
              <h1 className="text-6xl">Your new email is</h1>
            </div>

            <div className="container mt-5">
              <div className="flex w-full gap-4 mb-20">
                <div className="border w-3/4 h-16 border-gray-300 rounded-md px-4 pt-5 pb-1">
                  {username}
                  {"@jobjug.co"}
                </div>
                <button
                  className="border w-1/4 h-16 border-gray-300 bg-black rounded-md px-4 pt-3 pb-1"
                  onClick={handleCopy}>
                  {" "}
                  <h3 className="text-white"> Copy Email </h3>{" "}
                </button>
                <button
                  className="border w-1/4 h-16 border-gray-300 bg-black rounded-md px-4 pt-3 pb-1"
                  onClick={handleHome}>
                  {" "}
                  <h3 className="text-white"> Go Home </h3>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-20"></div>
      </div>
    </>
  );
}

export default RegisterPage;
