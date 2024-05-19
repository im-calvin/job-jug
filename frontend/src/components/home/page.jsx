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
  const [ghostedJobs, setGhostedJobs] = useState([]);
  const [dataCount, setDataCount] = useState([0, 0, 0]);
  const [user, setUser] = useState("calebwu");

  // goodstuff: offer (4)
  // badstuff: ghosted (calculated on frontend), rejected (2)
  // awaiting: interviewing (3), received (1), waitlisted (5)

  const fetchData = async () => {
    const response = await fetch(`http://localhost:5000/api/emails?username=${user}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log(data);

    // filtering fetched data into three main columns
    const tempGood = data.filter((job) => job.status === 4);
    setGoodStuff(tempGood);
    let tempAwait = data.filter((job) => job.status === 1 || job.status === 3 || job.status === 5);
    setAwaiting(tempAwait);

    const currentDate = new Date();
    const tempGhosted = mockData.filter((job) => {
      const jobDate = new Date(job.date);
      const diffTime = jobDate.getTime() - currentDate.getTime();
      const diffDays = Math.abs(Math.round(diffTime / (1000 * 3600 * 24)));
      console.log("Job ", job.id, ": ", diffDays);
      return diffDays > 21;
    });
    setGhostedJobs(tempGhosted);
    tempAwait = tempAwait.filter((job) => tempGhosted.includes(job) === false);
    setAwaiting(tempAwait);
    const tempBad = mockData.filter((job) => job.status === 2).concat(tempGhosted);
    setBadStuff(tempBad);

    const reject = mockData.filter((job) => job.status === 2).length;
    const interview = mockData.filter((job) => job.status === 3).length;
    const offer = mockData.filter((job) => job.status === 4).length;
    const waitlist = mockData.filter((job) => job.status === 5).length;
    const ghosted = tempGhosted.length;

    return [reject, interview, offer, waitlist, ghosted];
  };
  // 1. job application confirmation
  // 2. job application rejection
  // 3. interview invitation
  // 4. position offered
  // 5. position waitlisted
  const countData = (data) => {
    const reject = data.filter((job) => job.status === 2).length;
    const interview = data.filter((job) => job.status === 3).length;
    const offer = data.filter((job) => job.status === 4).length;
    const waitlist = data.filter((job) => job.status === 5).length;
    const ghosted = ghostedJobs.length;

    return [reject, interview, offer, waitlist, ghosted];
  };

  useEffect(() => {
    // TO DO: implement data fetching from b/e
    const tempCount = fetchData();
    console.log("Data Count: ", tempCount);
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
