import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Box, Button } from "@mui/material";
import { deleteJob, get_job_info } from "../../services/jobAPI";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";

function JobInfo() {
  const [jobInfo, setJobInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");

  const navigate = useNavigate();

  const params = useParams();
  const id = params.id.split("/").pop();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (id) {
      const fetchJobInfo = async () => {
        setLoading(true);
        try {
          const response = await get_job_info(id);
          setJobInfo(response);
        } catch (error) {
          console.error("Error fetching job information:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchJobInfo();
    }
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  const handleDeleteJob = async (jobId) => {
    try {
      console.log(jobId);
      const deletionMessage = await deleteJob(jobId);
      // Handle successful deletion, for example, show a success message
      console.log(deletionMessage); // Job deleted successfully
    } catch (error) {
      // Handle errors
      console.error("Error:", error.message);
    }
  };

  const handleClick = () => {
    const jobIdToDelete = id; // Replace with the actual job ID
    handleDeleteJob(jobIdToDelete);
    navigate("/job");
  };

  return (
    <>
      <br />
      <div>
        {jobInfo && (
          <>
            <form>
              {userData.role === "Homeowner" &&
              userData.id === jobInfo.owner_id ? (
                <Grid item spacing={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        width: "15%",
                        marginRight: "5%",
                        borderRadius: "15px",
                      }}
                      // onClick={handleAddJob}
                    >
                      Update Job
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        width: "15%",
                        marginLeft: "5%",
                        borderRadius: "15px",
                      }}
                      onClick={handleClick}
                    >
                      Delete Job
                    </Button>
                  </Box>
                </Grid>
              ) : null}
              <Grid
                container
                spacing={2}
                sx={{
                  width: "80vw",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  marginTop: "1%",
                  marginBottom: "5%",
                  border: "2px solid #000",
                  borderRadius: "20px",
                  background: "#fff",
                  color: "#000",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                {/* Left Side */}
                <Grid item xs={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        InputProps={{
                          readOnly: true,
                          style: { color: "black" },
                        }}
                        sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                        fullWidth
                        label="Job Name"
                        value={jobInfo.name}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        InputProps={{
                          readOnly: true,
                          style: { color: "black" },
                        }}
                        sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                        fullWidth
                        label="Date Time"
                        value={jobInfo.datetime}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        InputProps={{
                          readOnly: true,
                          style: { color: "black" },
                        }}
                        sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                        fullWidth
                        label="Email"
                        value={jobInfo.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        InputProps={{
                          readOnly: true,
                          style: { color: "black" },
                        }}
                        sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                        fullWidth
                        label="Phone Number"
                        value={jobInfo.phone_num}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        InputProps={{
                          readOnly: true,
                          style: { color: "black" },
                        }}
                        sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                        fullWidth
                        label="Salary"
                        value={jobInfo.salary}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        InputProps={{
                          readOnly: true,
                          style: { color: "black" },
                        }}
                        sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                        fullWidth
                        label="Address"
                        value={jobInfo.address}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Right Side - Image Upload */}
                <Grid item xs={6}>
                  {jobInfo.image === "" ? (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    ></Box>
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        alt={jobInfo.name}
                        src={jobInfo.image}
                        style={{
                          width: "60%",
                          height: "auto",
                          display: "flex",
                          justifyContent: "center",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                        }}
                      />
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        InputProps={{
                          readOnly: true,
                          style: { color: "black" },
                        }}
                        sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                        fullWidth
                        multiline
                        rows={8}
                        label="Description"
                        value={jobInfo.desc}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        InputProps={{
                          readOnly: true,
                          style: { color: "black" },
                        }}
                        sx={{
                          mb: "1%",
                          [`& fieldset`]: { borderRadius: 8 },
                        }}
                        fullWidth
                        multiline
                        rows={8}
                        label="Requirement"
                        value={jobInfo.requirement}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </div>
    </>
  );
}

export default JobInfo;
