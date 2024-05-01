import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Avatar,
  InputAdornment,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { allJob } from "../../services/jobAPI";
import { allWorker } from "../../services/userAPI";
import { useNavigate } from "react-router-dom";
function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const allJobs = await allJob();
        const jobsWithTypes = allJobs.map((job) => ({ ...job, type: "job" }));
        setJobs(jobsWithTypes);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    const fetchWorkers = async () => {
      try {
        const allWorkers = await allWorker();
        const workersWithTypes = allWorkers.map((worker) => ({
          ...worker,
          type: "worker",
        }));
        setWorkers(workersWithTypes);
      } catch (error) {
        console.error("Failed to fetch workers:", error);
      }
    };

    fetchJobs();
    fetchWorkers();
  }, []);

  const handleSearchInput = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    if (query.trim()) {
      const filteredJobs = jobs.filter((job) =>
        job.name.toLowerCase().includes(query)
      );
      const filteredWorkers = workers.filter((worker) =>
        worker.name.toLowerCase().includes(query)
      );
      setFilteredResults([...filteredJobs, ...filteredWorkers]);
    } else {
      setFilteredResults([]);
    }
  };
  const handleResultClick = (id, name, type) => {
    if (type === "job") {
      navigate(`/job/${id}`);
    } else if (type === "worker") {
      navigate(`/worker/${id}`);
    }
    setFilteredResults([]);
    setSearchQuery(name);
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box display="flex" alignItems="center">
        <TextField
          value={searchQuery}
          onChange={handleSearchInput}
          label="Search name..."
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "black" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {filteredResults.length > 0 ? (
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "white",
            color: "black",
            width: "100%",
            maxHeight: "250px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            zIndex: 10,
          }}
        >
          {filteredResults.map((result, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderBottom: "1px solid #ccc",
                "&:last-child": { borderBottom: "none" },
                cursor: "pointer",
              }}
              onClick={() =>
                handleResultClick(result._id.$oid, result.name, result.type)
              }
            >
              <Avatar
                sx={{
                  bgcolor:
                    result.type === "job" ? "secondary.main" : "primary.main",
                  mr: 2,
                }}
              >
                {result.type === "job" ? <WorkIcon /> : <PersonIcon />}
              </Avatar>
              <Typography
                key={index}
                sx={{
                  padding: "10px",
                  borderBottom: "1px solid #ccc",
                  "&:last-child": { borderBottom: "none" },
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleResultClick(result._id.$oid, result.name, result.type)
                }
              >
                {result.name} ({result.type === "job" ? "Job" : "Worker"})
              </Typography>
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  );
}
export default Search;
