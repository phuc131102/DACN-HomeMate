import { useState, useEffect } from "react";
import { allJob } from "../../services/jobAPI";

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loadingJob, setLoadingJob] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedJobs = await allJob();
        setJobs(fetchedJobs);
        setLoadingJob(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchData();
  }, []);

  return { jobs, loadingJob };
};

export default useJobs;
