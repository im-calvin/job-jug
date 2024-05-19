import React, { useEffect, useState } from 'react';
import mockData from '../../data/mockjobs';
import Dashboard from '../dashboard/page';
import Searchbar from '../searchbar/page';
import Navbar from '../navbar/page';
import Login from '../login/page';

function HomePage() {
    const [goodStuff, setGoodStuff] = useState([]);
    const [badStuff, setBadStuff] = useState([]);
    const [awaiting, setAwaiting] = useState([]);
    const [user, setUser] = useState('John Doe');

    // goodstuff: offer
    // badstuff: ghosted, rejected
    // awaiting: interviewing, received

    const fetchData = () => {
        // filtering fetched data into three main columns
        setGoodStuff(mockData.filter(job => job.class === 'offer'));
        setBadStuff(mockData.filter(job => job.class === 'ghosted' || job.class === 'rejected'));
        setAwaiting(mockData.filter(job => job.class === 'interviewing' || job.class === 'received'));

        console.log('Good Stuff:', goodStuff);
        console.log('Bad Stuff:', badStuff);
        console.log('Awaiting:', awaiting);
    }

    useEffect(() => {
        // TO DO: implement data fetching from b/e
        fetchData();
    }, []);

    return (
        <>

        <Navbar></Navbar>
     
            <div className='flex flex-row justify-center h-fit w-full pt-32'>
                <div className='w-4/5 h-full m-auto'>
                    <h3 className='text-2xl'>{user}!</h3>
                    <h1 className='text-4xl'>Summer 2024 Set</h1>
                </div>
            </div>

            <Searchbar></Searchbar>
            <Dashboard goodStuff={goodStuff} badStuff={badStuff} awaiting={awaiting} />
        </>
    );
};

export default HomePage;