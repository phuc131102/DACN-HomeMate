import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { create_job } from "../../services/jobAPI";
import Loading from "../../components/Loading/Loading";
import dayjs from "dayjs";

const finalTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            borderRadius: 20,
          }),
      },
    },
  },
});

function CreateJob() {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [avatarBase64, setAvatarBase64] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    date: "",
    time: "",
    address: "",
    salary: "",
    email: "",
    phone_num: "",
    requirement: "",
  });

  const handleChange = (e) => {
    // if (e.target.name === "date") {
    //   const formattedDate = dayjs(e.target.value).format("MM/DD/YYYY"); // Format the date string as needed
    //   setFormData({
    //     ...formData,
    //     [e.target.name]: formattedDate,
    //   });
    // } else {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedFormData = {
      ...formData,
      image: avatarBase64,
      owner_id: userData.id,
    };
    console.log(updatedFormData);
    try {
      const response = await create_job(updatedFormData);
      if (response) {
        navigate("/job");
        console.log("User create job successfully:", response);
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 404) {
          setError("All field is required.");
          setLoading(false);
        }
      }
      console.error("Create job failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Box
        sx={{
          width: "50vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={{
                maxWidth: "500px",
                margin: "auto",
                border: "1px solid black",
                borderRadius: "10px",
                marginTop: "10px",
                marginBottom: "10px",
                backgroundColor: "white",
                opacity: "90%",
                position: "relative",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  width: "90%",
                  margin: "auto",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <ThemeProvider theme={finalTheme}>
                  <form onSubmit={handleSubmit}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h4">New Job</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        sx={{
                          width: "100%",
                          [`& fieldset`]: { borderRadius: 8 },
                          marginTop: "15px",
                          marginBottom: "15px",
                        }}
                        variant="outlined"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        sx={{
                          width: "100%",
                          [`& fieldset`]: { borderRadius: 8 },

                          marginBottom: "15px",
                        }}
                        variant="outlined"
                        label="Description"
                        multiline
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        sx={{
                          width: "100%",
                          [`& fieldset`]: { borderRadius: 8 },

                          marginBottom: "15px",
                        }}
                        variant="outlined"
                        label="Date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                    </Grid>

                    {/* <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                          sx={{
                            // width: "60%",
                            [`& fieldset`]: { borderRadius: 8 },
                            marginBottom: "15px",
                          }}
                          components={["DatePicker"]}
                        >
                          <DatePicker
                            label="Starting Date"
                            name="date"
                            value={formData.date}
                            onChange={(date) =>
                              handleChange({
                                target: { name: "date", value: date },
                              })
                            }
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Grid> */}

                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        sx={{
                          width: "100%",
                          [`& fieldset`]: { borderRadius: 8 },

                          marginBottom: "15px",
                        }}
                        variant="outlined"
                        label="Time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        sx={{
                          width: "100%",
                          [`& fieldset`]: { borderRadius: 8 },

                          marginBottom: "15px",
                        }}
                        variant="outlined"
                        label="Addess"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        sx={{
                          width: "100%",
                          [`& fieldset`]: { borderRadius: 8 },

                          marginBottom: "15px",
                        }}
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        sx={{
                          width: "100%",
                          [`& fieldset`]: { borderRadius: 8 },

                          marginBottom: "15px",
                        }}
                        variant="outlined"
                        label="Phone Number"
                        name="phone_num"
                        value={formData.phone_num}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="outlined-start-adornment"
                        sx={{
                          width: "50%",
                          [`& fieldset`]: { borderRadius: 8 },
                          marginBottom: "15px",
                        }}
                        type="number"
                        label="Salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              VNĐ
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        sx={{
                          width: "100%",
                          [`& fieldset`]: { borderRadius: 8 },

                          marginBottom: "15px",
                        }}
                        variant="outlined"
                        label="Additional Requirement (optional)"
                        name="requirement"
                        value={formData.requirement}
                        onChange={handleChange}
                      />
                    </Grid>
                    <>
                      <Grid item xs={12}>
                        {avatarBase64 ? (
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              alt={avatarBase64}
                              src={avatarBase64}
                              style={{
                                width: "30%",
                                height: "auto",
                                marginTop: "20%",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                              }}
                            />
                          </Box>
                        ) : null}
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <label
                            htmlFor="avatar-upload"
                            style={{
                              cursor: "pointer",
                              marginTop: "1%",
                              marginBottom: "5%",
                              padding: "12px 24px",
                              border: "2px solid #000",
                              borderRadius: "8px",
                              background: "#fff",
                              color: "#000",
                              fontWeight: "bold",
                              textAlign: "center",
                              textTransform: "uppercase",
                              fontSize: "16px",
                              letterSpacing: "1px",
                              transition: "all 0.3s ease",
                            }}
                          >
                            <input
                              id="avatar-upload"
                              style={{
                                display: "none",
                              }}
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const selectedFile = e.target.files[0];
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const base64data = reader.result;
                                  setAvatarBase64(base64data);
                                  setFormData({
                                    ...formData,
                                    image: avatarBase64,
                                  });
                                };
                                reader.readAsDataURL(selectedFile);
                              }}
                            />
                            Choose image
                          </label>
                        </Box>
                      </Grid>
                    </>

                    {error && (
                      <Typography variant="body2" color="error" align="center">
                        {error}
                      </Typography>
                    )}
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                        }}
                      >
                        <Button
                          type="submit"
                          size="large"
                          variant="contained"
                          sx={{
                            width: "30%",
                            margin: "auto",
                            marginBottom: "15px",
                            marginTop: "15px",
                          }}
                        >
                          Create
                        </Button>
                      </Box>
                    </Grid>
                  </form>
                </ThemeProvider>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default CreateJob;
