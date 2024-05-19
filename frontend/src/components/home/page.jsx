import React, { useEffect, useState } from 'react';
import mockData from '../../data/mockjobs';
import Dashboard from '../dashboard/page';

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
            <div className="my-8">
                <h1 className="text-2xl font-bold text-center">Welcome, {user}!</h1>
            </div>
            <Dashboard goodStuff={goodStuff} badStuff={badStuff} awaiting={awaiting} />
        </>
    );
};

export default HomePage;