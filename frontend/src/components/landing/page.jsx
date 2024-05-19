import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockData from "../../data/mockjobs";
import Navbar from '../navbar/page';

import mail from '../../assets/frame1.png';

function LoginPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      console.log("Incoming User: ", firstName, lastName);

      const user = firstName.toLowerCase().trim() + lastName.toLowerCase().trim();
      // const response = await fetch(`http://localhost:5000/api/emails?username=${user}`);

      // if (!response.ok) {
      //   throw new Error("Failed to fetch data");
      // }
      // const data = await response.json();
      const data = mockData;
      console.log(data);

      if (data.length === 0) {
        // redirect user to email address screen
        const promptData = {
          firstName,
          lastName,
        };
        navigate("/register", {
          state: promptData,
        });
      } else {
        // redirect user to main dashboard with data
        navigate("/home", { state: data });
      }
    } catch {
      alert("Failed to log in");
    }
  }
  return (
    <>
      <div className="pt-32">
        <div className="w-3/4 border-2 rounded-lg px-20 border-gray-200 m-auto">
          <div className="mt-20"></div>

                    <div className='container mt-20'>
                        <div className='flex flex-row justify-between w-full'>
                            <div className='container'>
                                <h1 className='text-6xl'>Create an account</h1>
                                <h3> Already have an account? Log in</h3>
                            </div>
                        </div>
                    </div>

            <div className="flex flex-row mt-10 h-fit w-full gap-4 justify-between">
              <form onSubmit={handleSubmit}>
                <div className="w-11/12">
                  <h3 className="mb-2">First Name</h3>
                  <input
                    name="first"
                    className="h-16 border border-gray-300 rounded-md px-4 pt-5 pb-1"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}></input>
                
                    <div className='flex flex-row h-1/2 w-full gap-4 justify-between'>
                        <form action={login}>
                            <div className=''>
                                <h3 className='mb-2'>First Name</h3>
                                <input name="first" className='h-16 border border-gray-300 rounded-md px-4 pt-5 pb-1'></input>
                            </div>

                            <div className=''>
                                <h3 className='mb-2'> Last Name </h3>
                                <input name="last" className='h-16 border border-gray-300 rounded-md px-4 pt-5 pb-1'></input>
                            </div>
                            <button type="submit">Next</button>
                        </form>  
                    <img className='w-2/5 h-2/5 object-contain absolute right-48 bottom-[13%]' src={mail}></img>

                    </div>

                    <div className='flex flex-col justify-bottom'>
                        <div className='flex flex-row justify-between'>
                            {/* <h3 className='flex flex-col justify-end'>Log in instead</h3> */}

                            <div className=''>
                            <button className='border border-gray-300 rounded-md bg-gray-900 px-10 py-3'> <h3 className='font-bold'>Create Account</h3></button>
                            </div>
                        </div>
                    </div>

                
                </div>

                <div className="w-11/12 h-fit">
                  <h3 className="mb-2"> Last Name </h3>
                  <input
                    name="last"
                    className="h-16 border border-gray-300 rounded-md px-4 pt-5 pb-1"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}></input>
                </div>
                <button
                  type="submit"
                  className="border border-gray-300 rounded-md bg-gray-900 px-10 py-3">
                  {" "}
                  <h3 className="font-bold">Create Account</h3>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="pb-20"></div>
    </>
  );
}

export default LoginPage;
