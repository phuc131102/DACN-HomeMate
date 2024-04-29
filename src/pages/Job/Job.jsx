import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Pagination,
  Button,
  Box,
} from "@mui/material";
import useJobs from "../../utils/jobUtils/jobUtils";
import Loading from "../../components/Loading/Loading";
import jobEmpty from "../../assets/job_empty.png";
import { get_skill } from "../../services/skillAPI";
import JobFilter from "./Child/Job_filter";
import { Salary } from "./Child/Salary";
import { Flex } from "antd";

function Job() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const { jobs, loadingJob } = useJobs();
  const [filterItems, setFilterItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [skills, setSkills] = useState([]);
  const [chooseSkill, setChooseSkill] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterSalaryItems, setFilterSalaryItems] = useState([]);
  const [chooseSalary, setChooseSalary] = useState([]);
  useEffect(() => {
    setFilterItems(jobs);
    setFilterSalaryItems(jobs);
  }, [jobs]);

  useEffect(() => {
    if (chooseSalary.length > 0) {
      let tempItems = chooseSalary.map((selectedSalary) => {
        let tempSalary = Salary.filter((item) => item.name === selectedSalary);
        let temp = jobs.filter((jobItem) => {
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
      // console.log("run effect")
      let tempItems = chooseSkill.map((selectedSkill) => {
        let temp = jobs.filter((jobItem) => {
          let tempArray = jobItem.skill.includes(selectedSkill);
          return tempArray;
        });
        return temp;
      });
      // let finalArray =
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
        // console.log(response.data);
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skill information:", error);
      } finally {
        setLoading(false);
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

  if (loadingJob && loading) {
    return <Loading />;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const jobArray= filterSalaryItems.filter(item=>filterItems.includes(item))
  const currentJobs = jobArray.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  if (loadingJob && loading) {
    return <Loading />;
  }

  const handleAddJob = () => {
    navigate("/create-job");
  };

  return (
    <>
      <Box
        sx={{
          width: "95%",
          margin: "auto",
          marginTop: "7%",
        }}
      >
        {userData.role === "Homeowner" ? (
          <Grid container sx={{ width: "95%", margin: "auto" }}>
            <Button
              variant="contained"
              sx={{
                width: "15%",
                marginLeft: "auto",
                borderRadius: "15px",
              }}
              onClick={handleAddJob}
            >
              Create New Job
            </Button>
          </Grid>
        ) : null}
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", gap:"50px"}}>
          <JobFilter
            option={Salary}
            chooseOption={chooseSalary}
            setChooseOption={setChooseSalary}
            label="Salary"
          />
          <JobFilter
            option={skills}
            chooseOption={chooseSkill}
            setChooseOption={setChooseSkill}
            label="Skill"
          />
        </Box>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
            &nbsp;<b>All Job</b>
          </Typography>
        </Grid>
        <CardContent>
          <Grid container spacing={5}>
            {currentJobs.map((card, index) => (
              <Grid item xs={6} sm={3} md={2} key={index}>
                <Card
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <CardActionArea component={Link} to={`/job/${card._id.$oid}`}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={card.image === "" ? jobEmpty : card.image}
                      alt={card.name}
                    />
                    <CardContent>
                      <Typography
                        sx={{
                          fontSize: 16,
                          textAlign: "center",
                          lineHeight: "1.2",
                          maxHeight: "1.2em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          display: "block",
                        }}
                        color="text.primary"
                        gutterBottom
                      >
                        {card.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          textAlign: "center",
                          lineHeight: "1.2",
                          maxHeight: "1.2em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          display: "block",
                        }}
                        color="text.primary"
                        gutterBottom
                      >
                        {card.datetime}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Box>
      {jobs.length > 12 ? (
        <Pagination
          count={Math.ceil(jobs.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          size="large"
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
