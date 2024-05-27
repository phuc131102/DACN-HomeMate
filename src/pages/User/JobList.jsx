import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Paper,
  Pagination,
  Grid,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUsers from "../../utils/userUtils/userUtils";
import Loading from "../../components/Loading/Loading";
import UserFilter from "./Child/UserFilter";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Salary } from "../Job/Child/Salary";
import { get_skill } from "../../services/skillAPI";
function JobList(prop) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const [chooseSkill, setChooseSkill] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterSalaryItems, setFilterSalaryItems] = useState([]);
  const [chooseSalary, setChooseSalary] = useState([]);
  const [chooseRole, setChooseRole] = useState([]);
  const role = [{ name: "Worker" }, { name: "Homeowner" }, { name: "Admin" }];
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setFilterItems(prop.jobs);
    setFilterSalaryItems(prop.jobs);
  }, [prop.jobs]);
  useEffect(() => {
    if (chooseSalary.length > 0) {
      let tempItems = chooseSalary.map((selectedSalary) => {
        let tempSalary = Salary.filter((item) => item.name === selectedSalary);
        let temp = prop.jobs.filter((jobItem) => {
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
      setFilterSalaryItems(prop.jobs);
    }
  }, [chooseSalary]);

  useEffect(() => {
    if (chooseSkill.length > 0) {
      let tempItems = chooseSkill.map((selectedSkill) => {
        let temp = prop.jobs.filter((jobItem) => {
          let tempArray = jobItem.skill.includes(selectedSkill);
          return tempArray;
        });
        return temp;
      });
      setFilterItems([...new Set(tempItems.flat())]);
    } else {
      setFilterItems(prop.jobs);
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
        setLoading(false);
      }
    };
    fetchSkill();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const jobArray = filterSalaryItems.filter((item) =>
    filterItems.includes(item)
  );
  const currentJobs = jobArray.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowClick = (userId) => {
    navigate(`/job/${userId}`);
  };

  return (
    <>
      <Box
        sx={{
          width: "95%",
          margin: "auto",
        }}
      >
        <Box sx={{ width: "100%", margin: "auto" }}>
          <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
            &nbsp;<b>Filter</b>
          </Typography>
          <Box
            sx={{
              display: "flex",
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
                <UserFilter
                  option={Salary}
                  chooseOption={chooseSalary}
                  setChooseOption={setChooseSalary}
                  label="Salary"
                />
              </Box>
              <Box sx={{ width: "300px" }}>
                <UserFilter
                  option={skills}
                  chooseOption={chooseSkill}
                  setChooseOption={setChooseSkill}
                  label="Skill"
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            sx={{ fontSize: 30, marginLeft: "7%" }}
            color="text.primary"
            gutterBottom
          >
            <b>Blocked User</b>
          </Typography>
        </Grid>
        <TableContainer
          component={Paper}
          sx={{
            width: "80vw",
            margin: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Skill Requirement</TableCell>
              </TableRow>
            </TableHead>
            {currentJobs.length !==
            0 ? (
              <TableBody>
                {currentJobs.map((user, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(user._id.$oid)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#e0e0e0",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell>
                      <img src={user.image} alt={user.name} style={{width:"60px"}}/>
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.address === "" ? "N/A" : user.address}
                    </TableCell>
                    <TableCell>
                      {user.phone_num === "" ? "N/A" : user.phone_num}
                    </TableCell>
                    <TableCell>{user.skill.join(", ")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography>No Job Found.</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
      {jobArray.length > 5 ? (
        <Pagination
          count={Math.ceil(
            jobArray.length / itemsPerPage
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
            display: "flex",
            justifyContent: "center",
          }}
        />
      ) : null}
      <br />
    </>
  );
}

export default JobList;
