import React, { useEffect, useState } from 'react';
import mockData from '../../data/mockjobs';

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
            <h1>Welcome, {user}!</h1>
            <table>
                <thead>
                    <tr>
                        <th>Good Stuff</th>
                        <th>Bad Stuff</th>
                        <th>Awaiting</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {goodStuff.map(job => (
                                <div key={job.id}>
                                    <div>{job.title}</div>
                                    <div>{job.company}</div>
                                </div>
                            ))}
                        </td>
                        <td>
                            {badStuff.map(job => (
                                <div key={job.id}>
                                    <div>{job.title}</div>
                                    <div>{job.company}</div>
                                </div>                 
                            ))}
                        </td>
                        <td>
                            {awaiting.map(job => (
                                <div key={job.id}>
                                    <div>{job.title}</div>
                                    <div>{job.company}</div>
                                </div>                         
                            ))}
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default HomePage;