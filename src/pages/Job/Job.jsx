import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Pagination, Button, Box } from "@mui/material";
import useJobs from "../../utils/jobUtils/jobUtils";
import Loading from "../../components/Loading/Loading";
import { get_skill } from "../../services/skillAPI";
import JobFilter from "./Child/Job_filter";
import { Salary } from "./Child/Salary";
import NewCard from "./Child/NewCard";
import "./Child/Newcard.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useUserInfo from "../../utils/userUtils/useUserInfo";
import { addressTinh } from "../../services/addressAPI";
function Job() {
  //////////////////////
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { jobs, loadingJob } = useJobs();
  const [filterItems, setFilterItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [skills, setSkills] = useState([]);
  const [chooseSkill, setChooseSkill] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterSalaryItems, setFilterSalaryItems] = useState([]);
  const [chooseSalary, setChooseSalary] = useState([]);
  const { userInfo } = useUserInfo(userData?.id);
  const [tinh, setTinh] = useState([]);
  const [chooseTinh, setChooseTinh] = useState([]);
  // console.log(tinh)

  useEffect(() => {
    setFilterItems(jobs);
    setFilterSalaryItems(jobs);
  }, [jobs]);
  useEffect(() => {
    if (chooseTinh.length > 0) {
      let tempItems = chooseTinh.map((selectedTinh) => {
        let temp = jobs.filter((jobItem) => {
          let tempArray = jobItem.address.includes(selectedTinh);
          return tempArray;
        });
        console.log(temp)
        return temp;
      });
      setFilterItems([...new Set(tempItems.flat())]);
    } else {
      setFilterItems(jobs);
    }
  }, [chooseTinh]);

  useEffect(() => {
    if (chooseSalary.length > 0) {
      let tempItems = chooseSalary.map((selectedSalary) => {
        let tempSalary = Salary.filter((item) => item.name === selectedSalary);
        let temp = jobs.filter((jobItem) => {
          if (selectedSalary >= "> 500000 VND/hour") {
            let tempArray = tempSalary[0].min <= parseInt(jobItem.salary);
            return tempArray;
          }
          let tempArray =
            tempSalary[0].min <= parseInt(jobItem.salary) &&
            parseInt(jobItem.salary) <= tempSalary[0].max;
          return tempArray;
        });
        return temp;
      });
      setFilterSalaryItems(tempItems.flat());
    } else {
      setFilterSalaryItems(jobs);
    }
  }, [chooseSalary]);

  useEffect(() => {
    if (chooseSkill.length > 0) {
      let tempItems = chooseSkill.map((selectedSkill) => {
        let temp = jobs.filter((jobItem) => {
          let tempArray = jobItem.skill.includes(selectedSkill);
          return tempArray;
        });
        return temp;
      });
      setFilterItems([...new Set(tempItems.flat())]);
    } else {
      setFilterItems(jobs);
    }
  }, [chooseSkill]);

  useEffect(() => {
    const fetchSkill = async () => {
      setLoading(true);
      try {
        const response = await get_skill();
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skill information:", error);
      } finally {
        try {
          const response = await addressTinh();
          // console.log(response);
          setTinh(response);
        } catch (error) {
          console.error("Error fetching skill information:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchSkill();
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  if (loadingJob || loading) {
    return <Loading />;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const jobArray = filterSalaryItems.filter((item) =>
    filterItems.includes(item)
  );
  const currentJobs = jobArray
    .filter((card) => card.status === "Available")
    .slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleAddJob = () => {
    navigate("/create-job");
  };

  return (
    <>
      <Box
        sx={{
          width: "95%",
          margin: "auto",
          marginTop: isMd ? "7%" : "20%",
        }}
      >
        <Box sx={{ width: "80%", margin: "auto" }}>
          <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
            &nbsp;<b>Filter</b>
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMd ? "" : "column",
              gap: isMd ? "" : "10px",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: isMd ? "" : "column",
                gap: isMd ? "50px" : "10px",
              }}
            >
              <Box sx={{ width: "300px" }}>
                <JobFilter
                  option={Salary}
                  chooseOption={chooseSalary}
                  setChooseOption={setChooseSalary}
                  label="Salary"
                />
              </Box>
              <Box sx={{ width: "300px" }}>
                <JobFilter
                  option={skills}
                  chooseOption={chooseSkill}
                  setChooseOption={setChooseSkill}
                  label="Skill"
                />
              </Box>
              <Box sx={{ width: "300px" }}>
                <JobFilter
                  option={tinh}
                  chooseOption={chooseTinh}
                  setChooseOption={setChooseTinh}
                  label="Province"
                />
              </Box>
            </Box>
            <Box>
              {userData?.role === "Homeowner" && userInfo ? (
                <Grid container sx={{ width: "100%", margin: "auto" }}>
                  <div>
                    <Button
                      variant="contained"
                      sx={{
                        width: "200px",
                        height: "56px",
                        marginLeft: "auto",
                        borderRadius: "15px",
                      }}
                      onClick={handleAddJob}
                      disabled={
                        userInfo.block ||
                        userInfo.status === "Pending" ||
                        userInfo.status === "Rejected"
                          ? true
                          : false
                      }
                    >
                      Create New Job
                    </Button>
                    {userInfo.block ||
                    userInfo.status === "Pending" ||
                    userInfo.status === "Rejected" ? (
                      <Typography
                        sx={{
                          color: "red",
                          fontSize: "15px",
                        }}
                      >
                        *This feature has blocked for your account.
                      </Typography>
                    ) : null}
                  </div>
                </Grid>
              ) : null}
            </Box>
          </Box>
          <Grid sx={{ marginBottom: "30px" }}>
            <Typography
              sx={{ fontSize: 30, textAlign: "center" }}
              color="text.primary"
              gutterBottom
            >
              <b>All Jobs</b>
            </Typography>
          </Grid>
          <NewCard currentJobs={currentJobs} />
        </Box>
      </Box>
      {jobArray.filter((card) => card.status === "Available").length > 8 ? (
        <Pagination
          count={Math.ceil(
            jobArray.filter((card) => card.status === "Available").length /
              itemsPerPage
          )}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          size={isMd ? "large" : "small"}
          color="primary"
          showFirstButton
          showLastButton
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        />
      ) : (
        <div
          style={{
            margin: "10px auto",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        ></div>
      )}
      <br />
    </>
  );
}

export default Job;
