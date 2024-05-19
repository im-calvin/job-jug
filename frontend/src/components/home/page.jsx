import React, { useEffect, useState } from 'react';
import mockData from '../../data/mockjobs';
import Dashboard from '../dashboard/page';
import Sankey from '../analytics/sankey';

function HomePage() {
    const [goodStuff, setGoodStuff] = useState([]);
    const [badStuff, setBadStuff] = useState([]);
    const [awaiting, setAwaiting] = useState([]);
    const [ghostedJobs, setGhostedJobs] = useState([]);
    const [dataCount, setDataCount] = useState([0, 0, 0]);
    const [user, setUser] = useState('John Doe');

    // goodstuff: offer (4)
    // badstuff: ghosted (calculated on frontend), rejected (2)
    // awaiting: interviewing (3), received (1), waitlisted (5)

    const fetchData = () => {
        // filtering fetched data into three main columns

        const tempGood = mockData.filter(job => job.status === 4)
        setGoodStuff(tempGood);
        let tempAwait = mockData.filter(job => job.status === 1 || job.status === 3 || job.status === 5)
        setAwaiting(tempAwait);

        const currentDate = new Date();
        const tempGhosted = mockData.filter(job => {
            const jobDate = new Date(job.date);
            const diffTime = jobDate.getTime() - currentDate.getTime();
            const diffDays = Math.abs(Math.round(diffTime / (1000 * 3600 * 24)));
            console.log("Job ", job.id, ": ", diffDays);
            return diffDays > 21;
        });
        setGhostedJobs(tempGhosted);
        tempAwait = tempAwait.filter(job => tempGhosted.includes(job) === false);
        setAwaiting(tempAwait);
        const tempBad = mockData.filter(job => job.status === 2).concat(tempGhosted)
        setBadStuff(tempBad);

        const reject = mockData.filter(job => job.status === 2).length;
        const interview = mockData.filter(job => job.status === 3).length;
        const offer = mockData.filter(job => job.status === 4).length;
        const waitlist = mockData.filter(job => job.status === 5).length;
        const ghosted = tempGhosted.length;

        return [reject, interview, offer, waitlist, ghosted];
    }

    useEffect(() => {
        // TO DO: implement data fetching from b/e
        const tempCount = fetchData();
        console.log("Data Count: ", tempCount)
        setDataCount(tempCount);

    }, []);

    // useEffect(() => {
    //     console.log('Good Stuff:', goodStuff);
    //     console.log('Bad Stuff:', badStuff);
    //     console.log('Awaiting:', awaiting);
    //     console.log('Ghosted Jobs:', ghostedJobs);
    // }, [goodStuff, badStuff, awaiting]);

    return (
        <>
            <div className="my-8">
                <h1 className="text-2xl font-bold text-center">Welcome, {user}!</h1>
            </div>
            <Dashboard goodStuff={goodStuff} badStuff={badStuff} awaiting={awaiting} />
            <Sankey dataCount={dataCount}/>
        </>
    );
};

export default HomePage;