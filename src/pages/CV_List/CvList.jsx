import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import CvComponent from "./Child/CvComponent";
import cvinfo from "./CVData";
// import { get_user } from "../../services/userAPI";
import userinfo from "./FakeUser";

export default function CvList() {
  const [cvList, setCvList] = useState(cvinfo);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(userinfo)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // useEffect(()=>{
  //     const fetchUserData = async()=>{
  //       try {
  //         const data = await get_user();
  //         console.log(data)
  //         setUser(data)
  //       } catch (error) {
  //         setError(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //     fetchUserData();
  // },[])
  console.log(user)
  const handlePageChange=(e, newPage) =>{
    setPage(newPage)
  }
  const start= ((page-1)*6)
  const end=(start+6)
  const entry = cvList.slice(start,end)
  console.log(page)
  return (
    <>
      <Box sx={{ width: "60%", margin: "auto" }}>
        <Grid container>
          <Grid item container xs={12} sx={{marginBottom:"30px"}}>
            {entry.map((comp) => (
              <Grid key={comp.cvid} item xs={4} sx={{marginTop: "20px", marginBottom:"20px"}}>
                <CvComponent comp={comp} user={user}/>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Box sx={{width:"100%",display:"flex", justifyContent:"center",marginTop: "20px", marginBottom:"20px"}}>
            <Pagination count={Math.ceil(cvList.length/6)} variant="outlined" shape="rounded" size="large" onChange={handlePageChange}/>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
