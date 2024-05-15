import { useState, useEffect } from "react";
import { get_user_info } from "../../services/userAPI";

const useUserInfo = (userId) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchUserInfo = async () => {
        try {
          const response = await get_user_info(userId);
          setUserInfo(response);
        } catch (err) {
          console.error("Error fetching user information:", err);
        }
      };
      fetchUserInfo();
    }
  }, [userId]);

  return { userInfo };
};

export default useUserInfo;
