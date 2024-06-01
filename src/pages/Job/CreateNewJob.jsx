import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import { DateTimePicker } from "react-rainbow-components";
import { create_job } from "../../services/jobAPI";
import Loading from "../../components/Loading/Loading";
import JobFilter from "./Child/Job_filter";
import { get_skill } from "../../services/skillAPI";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { addressTinh, addressQuan } from "../../services/addressAPI";
import AdressAutoComplete from "./Child/AdressAutoComplete";

const CreateJobPage = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    const fetchSkill = async () => {
      setLoading(true);
      try {
        const response = await get_skill();
        // console.log(response.data);
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

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    address: "",
    salary: "",
    email: "",
    phone_num: "",
    requirement: "",
    max_num: "",
    datetime: new Date(null),
  });
  const [error, setError] = useState("");
  const [userData, setUserData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [avatarBase64, setAvatarBase64] = useState("");
  const [skills, setSkills] = useState([]);
  const [chooseSkill, setChooseSkill] = useState([]);

  const [tinh, setTinh] = useState([]);
  const [chonTinh, setChonTinh] = useState(null);
  // console.log(chonTinh);

  const [quan, setQuan] = useState([]);
  const [chonQuan, setChonQuan] = useState(null);
  // console.log(chonQuan);
  useEffect(() => {
    if (chonTinh !== null) {
      const handleAPI = async () => {
        try {
          // console.log(tinh.id)
          const response = await addressQuan(chonTinh.id);
          // console.log(response);
          setQuan(response);
        } catch (error) {
          console.error("Error fetching quan information:", error);
        }
      };
      handleAPI();
    } else {
      setChonQuan(null);
      setQuan(null);
    }
  }, [chonTinh]);
  const handleChange = (e) => {
    if (e.target.name === "address") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
    // }
  };

  const handleDateTimeChange = (value) => {
    const formattedDateTime = formatDate(value);
    setFormData({
      ...formData,
      datetime: formattedDateTime,
    });
  };

  const formatDate = (value) => {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let newAddress =
      formData.address + ", " + chonQuan.name + ", " + chonTinh.name;
    const updatedFormData = {
      ...formData,
      address: newAddress,
      image: avatarBase64,
      owner_id: userData.id,
      skill: chooseSkill,
    };
    // console.log(updatedFormData);
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
      <br />
      <div style={{ marginTop: isMd ? "3%" : "20%" }}>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "1%",
              }}
            >
              <Typography variant="h3">New Job</Typography>
            </Box>
          </Grid>
          <Grid
            container
            sx={{
              width: "80%",
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
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "10px",
            }}
          >
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    sx={{
                      [`& fieldset`]: {
                        borderRadius: 8,
                      },
                      "& .MuiInputLabel-asterisk": {
                        color: "red",
                      },
                    }}
                    required
                    fullWidth
                    label="Job Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    inputProps={{
                      pattern: "[^0-9]*",
                    }}
                    helperText={
                      formData.name.match(/[0-9]/)
                        ? "Number ditgit is not allowed."
                        : ""
                    }
                    error={formData.name.match(/[0-9]/) !== null}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    sx={{
                      [`& fieldset`]: {
                        borderRadius: 8,
                      },
                      "& .MuiInputLabel-asterisk": {
                        color: "red",
                      },
                    }}
                    required
                    fullWidth
                    label="Wage"
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          VNĐ / hour
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    sx={{
                      [`& fieldset`]: {
                        borderRadius: 8,
                      },
                      "& .MuiInputLabel-asterisk": {
                        color: "red",
                      },
                    }}
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={
                      !!formData.email && !/\S+@\S+\.\S+/.test(formData.email)
                    }
                    helperText={
                      !!formData.email && !/\S+@\S+\.\S+/.test(formData.email)
                        ? "Please enter a valid email address."
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    sx={{
                      [`& fieldset`]: {
                        borderRadius: 8,
                      },
                      "& .MuiInputLabel-asterisk": {
                        color: "red",
                      },
                    }}
                    required
                    fullWidth
                    label="Phone Number"
                    name="phone_num"
                    type="number"
                    value={formData.phone_num}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AdressAutoComplete
                    option={tinh}
                    setValue={setChonTinh}
                    value={chonTinh}
                    name="Province"
                    disab={false}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AdressAutoComplete
                    option={quan !== null ? quan : []}
                    setValue={setChonQuan}
                    value={chonQuan}
                    name="District"
                    disab={quan !== null ? false : true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{
                      [`& fieldset`]: {
                        borderRadius: 8,
                      },
                      "& .MuiInputLabel-asterisk": {
                        color: "red",
                      },
                    }}
                    required
                    fullWidth
                    label="Address"
                    name="address"
                    disabled={chonQuan !== null ? false : true}
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <JobFilter
                    option={skills}
                    chooseOption={chooseSkill}
                    setChooseOption={setChooseSkill}
                    label="Skill"
                  />
                </Grid>
                <Grid item xs={12}>
                  <DateTimePicker
                    required
                    fullWidth
                    name="datetime"
                    value={formData.datetime}
                    onChange={handleDateTimeChange}
                    hour24
                    placeholder="Date/Time *"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{
                      [`& fieldset`]: {
                        borderRadius: 8,
                      },
                      "& .MuiInputLabel-asterisk": {
                        color: "red",
                      },
                    }}
                    required
                    fullWidth
                    type="number"
                    label="Quantity"
                    name="max_num"
                    value={formData.max_num}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} sx={{ marginTop: "10px" }}>
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
                        width: "80%",
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                      }}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  ></Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <label
                    htmlFor="avatar-upload"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      cursor: "pointer",
                      padding: "12px 24px",
                      border: "2px solid #000",
                      borderRadius: "20px",
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
                    Upload image
                  </label>
                </Box>
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ marginTop: "10px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    sx={{
                      [`& fieldset`]: {
                        borderRadius: 8,
                      },
                      "& .MuiInputLabel-asterisk": {
                        color: "red",
                      },
                    }}
                    required
                    fullWidth
                    multiline
                    rows={8}
                    label="Description"
                    name="desc"
                    value={formData.desc}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                    fullWidth
                    multiline
                    rows={8}
                    label="Requirement"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            {error && (
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            )}
            <Grid item xs={12}>
              <Button
                sx={{ marginBottom: "10px", marginTop: "10px" }}
                variant="contained"
                type="submit"
              >
                Create Job
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default CreateJobPage;
