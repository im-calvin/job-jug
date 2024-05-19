
function Dashboard({goodStuff, badStuff, awaiting}) {

    const statusColours = {
        1: '#2563eb', // job application confirmation
        2: '#f87171', // job application rejection
        3: '#fb923c', // interview invitation
        4: '#4ade80', // offer
        5: '#fde047', // waitlist
    }
    return (
        <div className="flex flex-col justify-start m-auto h-lvh w-4/5">
            <table className=''>
                <thead className=''>
                </thead>
                <tbody>

                    
                    <tr className='flex flex-row'>
                        <td className='h-fit bg-gray-200 rounded-md mx-2 flex-col flex w-full justify-start'>
                        {/* /*className=" m-auto h-fit flex flex-col bg-gray-300 w-11/12">(/) */}
                        <th className='w-full mb-5 bg-gray-900 rounded-md py-3 px-4 shadow-md'><h1 className="text-white">Awaiting Application</h1></th>
                            {awaiting.map(job => (
                                <div className="mb-4 mx-2.5 w-11/12 border border-gray-300 bg-contain rounded-md shadow-md overflow-hidden" style={{backgroundColor: statusColours[job.status]}} key={job.id}>
                                    <div className='flex-row flex'>
                                        <span className='h-full w-1/12' style={{backgroundColor: statusColours[job.status]}}>
                                        </span>
                                        <span className="h-full w-11/12 bg-white"> 
                                            <div className='flex flex-row px-3 py-2'>
                                                    <div className='container flex flex-col justify-center'>
                                                        <div><h1>{job.company}</h1></div>
                                                        <div><h5>{job.title}</h5></div>
                                                    </div>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </td>
                        
                        <td className='h-fit mb-auto bg-gray-200 rounded-md mx-2 flex-col flex justify-start w-full'>
                        <th className='w-full mb-5 bg-gray-900 rounded-md py-3 px-4 shadow-md'><h1 className="text-white">Good stuff</h1></th>
                            {goodStuff.map(job => (
                                <div className="mb-4 mx-2.5 w-11/12 border border-gray-300 bg-contain rounded-md shadow-md overflow-hidden" style={{backgroundColor: statusColours[job.status]}} key={job.id}>
                                    <div className='flex-row flex'>
                                        <span className='h-full w-1/12' style={{backgroundColor: statusColours[job.status]}}>
                                        </span>
                                        <span className="h-full w-11/12 bg-white"> 
                                            <div className='flex flex-row px-3 py-2'>
    
                                                    <div className='container flex flex-col justify-center'>
                                                        <div><h1>{job.company}</h1></div>
                                                        <div><h5>{job.title}</h5></div>
                                                    </div>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </td>
                        
                        <td className='h-fit bg-gray-200 rounded-md mx-2 flex-col flex justify-start w-full'>
                        <th className='w-full mb-5 bg-gray-900 rounded-md py-3 px-4 shadow-md'><h1 className="text-white"> Rejections</h1></th>
                            {badStuff.map(job => (
                                <div className="mb-4 mx-2.5 w-11/12 border border-gray-300 bg-red-400 bg-contain rounded-md shadow-md overflow-hidden" key={job.id}>
                                    <div className='flex-row flex'>
                                        <span className='h-full w-1/12 bg-red-400'>
                                        </span>
                                        <span className="h-full w-11/12 bg-white"> 
                                            <div className='flex flex-row px-3 py-2'>
                                                    <div className='container flex flex-col justify-center'>
                                                        <div><h1>{job.company}</h1></div>
                                                        <div><h5>{job.title}</h5></div>
                                                    </div>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard;