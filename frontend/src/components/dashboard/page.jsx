
function Dashboard({goodStuff, badStuff, awaiting}) {
    return (
        <div className="flex flex-col justify-around">
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
                                <div className="mb-4" key={job.id}>
                                    <div>{job.title}</div>
                                    <div>{job.company}</div>
                                </div>
                            ))}
                        </td>
                        <td>
                            {badStuff.map(job => (
                                <div className="mb-4" key={job.id}>
                                    <div>{job.title}</div>
                                    <div>{job.company}</div>
                                </div>                 
                            ))}
                        </td>
                        <td>
                            {awaiting.map(job => (
                                <div className="mb-4" key={job.id}>
                                    <div>{job.title}</div>
                                    <div>{job.company}</div>
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