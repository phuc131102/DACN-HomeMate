import React, { useState, useEffect } from "react";
import { Grid, TextField, Typography, Box } from "@mui/material";
import { get_job_info } from "../../services/jobAPI";
import { get_user_info } from "../../services/userAPI";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";

function JobInfo() {
  const [jobInfo, setJobInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  const params = useParams();
  const id = params.id.split("/").pop();

  useEffect(() => {
    if (id) {
      const fetchJobInfo = async () => {
        setLoading(true);
        try {
          const response = await get_job_info(id);
          setJobInfo(response);
        } catch (error) {
          console.error("Error fetching user information:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchJobInfo();
    }
  }, [id]);

  useEffect(() => {
    if (jobInfo && jobInfo.owner_id) {
      const fetchUserInfo = async () => {
        setLoading(true);
        try {
          const response = await get_user_info(jobInfo.owner_id);
          setUserInfo(response);
        } catch (error) {
          console.error("Error fetching user information:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserInfo();
    }
  }, [jobInfo]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {jobInfo && (
        <>
          <form>
            <Grid item xs={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1%",
                }}
              >
                <Typography variant="h3">Job: {jobInfo.name}</Typography>
              </Box>
            </Grid>
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
                      label="Home Owner"
                      value={userInfo.name}
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
                      sx={{ mb: "1%", [`& fieldset`]: { borderRadius: 8 } }}
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
  );
}

export default JobInfo;
