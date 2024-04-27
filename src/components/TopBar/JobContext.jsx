import React, { createContext, useContext, useState } from 'react';

const JobContext = createContext();

export const useJob = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
    const [jobInfo, setJobInfo] = useState(null);

    return (
        <JobContext.Provider value={{ jobInfo, setJobInfo }}>
            {children}
        </JobContext.Provider>
    );
};
