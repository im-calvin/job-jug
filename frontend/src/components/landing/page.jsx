import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockData from "../../data/mockjobs";

// import mail from '../assets/'

function LoginPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      console.log("Incoming User: ", firstName, lastName);

      const user = firstName.toLowerCase().trim() + lastName.toLowerCase().trim();
      const response = await fetch(`http://localhost:5000/api/emails?username=${user}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);

      if (data.length === 0) {
        // redirect user to email address screen
        const username = firstName + lastName;
        navigate("/register", {
          username,
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

          <div className="w-1/2 h-fit grid grid-rows-3">
            <div className="container mt-20">
              <h1 className="text-6xl">Create an account</h1>
              <h3> Already have an account? Log in</h3>
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
      </div>
    </>
  );
}

export default LoginPage;
