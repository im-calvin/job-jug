import React from 'react';

function LoginPage() {  
    return (
        <>
            <div className='pt-32'>
            <div className='w-3/4 h-fit border-2 rounded-lg px-20 border-gray-200 m-auto'>  
                <div className='mt-20'></div>

                <div className=' bg-red-500 rounded-full size-20'> </div>

                <div className='w-4/5 grid grid-rows-2'>
                    <div className='container mt-20'>
                    <h3> Don't lose it!</h3>
                    <h1 className='text-6xl'>Your new email is</h1>
                    </div>

                <div className='container mt-5' >

                <h3 className='mb-2'>First Name</h3>

                    <div className='flex w-full gap-4 mb-20'>
                        <div className='border w-3/4 h-16 border-gray-300 rounded-md px-4 pt-5 pb-1'> words </div>
                        <button className='border w-1/4 h-16 border-gray-300 bg-black rounded-md px-4 pt-3 pb-1'> <h3 className='text-white'> Copy Email </h3> </button>
                        <button className='border w-1/4 h-16 border-gray-300 bg-black rounded-md px-4 pt-3 pb-1'> <h3 className='text-white'> Next </h3> </button>
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