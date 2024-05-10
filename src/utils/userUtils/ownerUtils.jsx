import { useState, useEffect } from "react";
import { count_owner } from "../../services/userAPI";

export const useOwners = () => {
  const [owners, setOwners] = useState([]);
  const [loadingOwners, setLoadingOwners] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedOwners = await count_owner();
        setOwners(fetchedOwners);
        setLoadingOwners(false);
      } catch (error) {
        console.error("Error fetching owners:", error);
      }
    };

    fetchData();
  }, []);

  return { owners, loadingOwners };
};

export default useOwners;
