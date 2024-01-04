import { useState, useEffect } from "react";
import { allWorker } from "../../services/userAPI";

export const useWorkers = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedWorkers = await allWorker();
        setWorkers(fetchedWorkers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchData();
  }, []);

  return { workers, loading };
};

export default useWorkers;
