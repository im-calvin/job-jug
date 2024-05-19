import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import frame2 from '../../assets/frame2.png';
import logo from '../../assets/logo.png'

function RegisterPage() {
  const location = useLocation();
  const username = location.state;
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

      <div className="pt-16">
      <img className='absolute right-[7%] bottom-[45%] size-[40%] object-contain' src={frame2}></img>
        <div className="w-3/4 h-fit border-2 rounded-lg px-20 border-gray-200 m-auto">
          <div className="mt-20"></div>

          <div className='w-3/5 h-4/5 grid grid-rows-2'>
            
            <div className='flex gap-4 mt-5 flex-rows'>
              <img className='size-20' src={logo}></img>
              <div className='container'>
                <h1 className='text-6xl'>Your new email is ready!</h1>
              </div>
            </div>

            <div className="container mt-10 flex flex-row gap-4">

                <div className="border w-3/4 h-16 border-gray-300 rounded-md px-4 pt-5 pb-1">
                  {username}
                  {"@jobjug.co"}
                </div>
               

                <button
                  className="border w-1/4 h-16  border-gray-300 bg-gray-900 rounded-md px-4 pt-3 pb-1"
                  onClick={handleCopy}>
                  {" "}
                  <h3 > Copy Email </h3>{" "}
                </button>
                
                <button
                  className="border w-1/4 h-16  border-gray-300 bg-gray-900 rounded-md px-4 pt-3 pb-1"
                  onClick={handleHome}>
                  {" "}
                  <h3 > Go Home </h3>{" "}
                </button>

              </div>
          </div>

        <div className="pb-20"></div>
        <div className='flex flex-row gap-4'>

          <div className='rounded-md border border-gray-300 shadow-md w-1/3 h-fit px-8 py-2'>
            <div className='mt-4 flex flex-row justify-center'>
              <div className='rounded-full border-gray-300 shadow-md border size-16 flex flex rows justify-center'>
                <div className='flex flex-col justify-center'><h1>1</h1></div>
              </div>
              </div>
            <h3 className='mt-4'>Enter your name and start applying to jobs with our custom email.</h3>
          </div>

          <div className='rounded-md border border-gray-300 shadow-md w-1/3 h-fit px-8 py-2'>
            <div className='mt-4 flex flex-row justify-center'>
              <div className='rounded-full border-gray-300 shadow-md border size-16 flex flex rows justify-center'>
                <div className='flex flex-col justify-center'><h1>2</h1></div>
              </div>
              </div>
            <h3 className='mt-4'>Watch your applications fill up in your home page</h3>
          </div>

          <div className='rounded-md border border-gray-300 shadow-md w-1/3 h-fit px-8 py-2'>
            <div className='mt-4 flex flex-row justify-center'>
              <div className='rounded-full border-gray-300 shadow-md border size-16 flex flex rows justify-center'>
                <div className='flex flex-col justify-center'><h1>3</h1></div>
              </div>
              </div>
            <h3 className='mt-4'>Analyze your job applications over each season with our data visualization tools</h3>
          </div>


        </div>
        <div className="pb-20"></div>
      </div>
      <div className="pb-10"></div>
      </div>
    </>
    );
    }
    

export default RegisterPage;
