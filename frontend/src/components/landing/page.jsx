import React from 'react';
import { useHistory } from 'react-router-dom';
import mockData from '../../data/mockjobs';

function LoginPage() {
    const history = useHistory();  

    async function login(formData) {
        try {
            const firstName = formData.get("first");
            const lastName = formData.get("last");

            console.log("Incoming User: ", firstName, lastName);

            const user = firstName.toLowerCase() + lastName.toLowerCase();
            const response = await fetch(`http://localhost:5000/api/emails?username=${user}`)
            
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            console.log(data);

            if (data.length === 0) { // redirect user to email address screen
                const promptData = {
                    firstName,
                    lastName
                };
                history.push({
                    pathname: '/register',
                    state: promptData
                });
            } else {
                history.push({ // redirect user to main dashboard with data
                    pathname: '/home',
                    state: data
                });
            }
        } catch {
            alert("Failed to log in");
        }



    }
    return (
        <>
            <div className='pt-32'>
            <div className='w-3/4 border-2 rounded-lg px-20 border-gray-200 m-auto'>  
                <div className='mt-20'></div>

                <div className='w-1/2 h-fit grid grid-rows-3'>
                    <div className='container mt-20'>
                    <h1 className='text-6xl'>Create an account</h1>
                    <h3> Already have an account? Log in</h3>
                    </div>

                    <div className='flex flex-row mt-10 h-fit w-full gap-4 justify-between'>
                        <form action={login}>
                            <div className='w-11/12'>
                                <h3 className='mb-2'>First Name</h3>
                                <input name="first" className='h-16 border border-gray-300 rounded-md px-4 pt-5 pb-1'></input>
                            </div>

                            <div className='w-11/12 h-fit'>
                                <h3 className='mb-2'> Last Name </h3>
                                <input name="last" className='h-16 border border-gray-300 rounded-md px-4 pt-5 pb-1'></input>
                            </div>
                            <button type="submit">Next</button>
                        </form>   
                    </div>

                    {/* <div class='container h-fit flex mt-5 flex-col justify-between'>
                        <h3> Email address </h3>
                        <div className='h-16 border w-full border-gray-300 rounded-md px-4 pt-5 pb-1'> 
                            <div className=''> words </div>
                        </div>
                    </div>

                    <div className='flex flex-row w-full gap-4 justify-between'>
                        <div className='w-11/12'>
                        <h3 className='mb-2'>Password</h3>
                        <div className='h-16 border border-gray-300 rounded-md px-4 pt-5 pb-1'> words </div>
                        </div>

                        <div className='w-11/12'>
                        <h3 className='mb-2'> Confirm </h3>
                        <div className='h-16 border border-gray-300 rounded-md px-4 pt-5 pb-1'> words </div>
                        </div>
                    </div> */}

                    <div className='flex flex-col justify-bottom'>
                        <div className='flex flex-row justify-between'>
                            {/* <h3 className='flex flex-col justify-end'>Log in instead</h3> */}

                            <div className=''>
                            <button className='border border-gray-300 rounded-md bg-gray-900 px-10 py-3'> <h3 className='font-bold'>Create Account</h3></button>
                            </div>
                        </div>
                    </div>

                
                </div>
                </div>

                <div className='pb-20'></div>
            </div>
        </>
    );
};

export default LoginPage;