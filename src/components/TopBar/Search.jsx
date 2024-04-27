import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { allJob } from '../../services/jobAPI'; 
import { useNavigate } from 'react-router-dom';


function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [jobs, setJobs] = useState([]); 
    const [filteredJobs, setFilteredJobs] = useState([]); 
    const navigate = useNavigate();


    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const allJobs = await allJob(); 
                setJobs(allJobs); 
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
            }
        };
        fetchJobs();
    }, []);

    const handleSearchInput = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        if (query.trim()) { 
            const filtered = jobs.filter(job => 
                job.name.toLowerCase().includes(query)
            );
            setFilteredJobs(filtered); 
        } else {
            setFilteredJobs([]); 
        }
    };
    const handleJobClick = (jobId, jobName) => {
        navigate(`/job/${jobId}`); 
        setFilteredJobs([]); 
        setSearchQuery(jobName); 
    };

    return (
        <Box sx={{ position: "relative", width: "100%" }}>
            <TextField
                value={searchQuery}
                onChange={handleSearchInput}
                label="Search Jobs"
                variant="outlined"
                size="small"
                fullWidth
            />
            <IconButton aria-label="search" sx={{ position: "absolute", right: "10px", top: "5px" }}>
                <SearchIcon />
            </IconButton>
            {filteredJobs.length > 0 && (
                <Box sx={{
                    position: "absolute",
                    backgroundColor: "orange",
                    width: "100%",
                    maxHeight: "250px",
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    zIndex: 10
                }}>
                    {filteredJobs.map((job, index) => (
                        <Typography key={index} sx={{ padding: "10px", borderBottom: "1px solid #ccc", '&:last-child': { borderBottom: "none" }, cursor: 'pointer' }}
                        onClick={() => handleJobClick(job._id.$oid, job.name)}> {}
                        {job.name}
                        </Typography>
                    ))}
                </Box>
            )}
        </Box>
    );
}

export default Search;
