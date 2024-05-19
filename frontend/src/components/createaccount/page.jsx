import React from 'react';

function CreateAccountPage() {  
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
                        <div className='w-11/12'>
                        <h3 className='mb-2'>First Name</h3>
                        <div className='h-16 border border-gray-300 rounded-md px-4 pt-5 pb-1'> words </div>
                        </div>

                        <div className='w-11/12 h-fit'>
                        <h3 className='mb-2'> Last Name </h3>
                        <div className='h-16 border border-gray-300 rounded-md px-4 pt-5 pb-1'> words </div>
                        </div>
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

export default CreateAccountPage;