import { useState, useEffect } from "react";
import { allUser } from "../../services/userAPI";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await allUser();
        setUsers(fetchedUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  return { users, loading };
};

export default useUsers;
