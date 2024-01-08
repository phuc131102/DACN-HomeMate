import { useState, useEffect } from "react";
// import cvinfo from "./CvData";
import * as React from "react";
import BaseForm from "./BaseForm";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/material";
import { create_cv } from "../../../services/cvAPI";
import skillInfo from "./fakeSkill";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// import AlertDialog from "../../../components/AlertDialog/AlertDialog";
// import ViewCv from "./ViewCv";

const SkillAlert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const CertAlert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function CVForm() {
  const navigate = useNavigate();
  // fetch Data
  // CV COMPS
  let [errorSnackbar, setErrorSnackbar] = useState(false);
  ////////////////////////////////////////////////////
  const [skillData, setSkillData] = useState(skillInfo);
  const [skillOption, setSkillOption] = useState(skillInfo);
  const [languageData, setLanguage] = useState([]);
  const [cvtitle, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [certs, setCerts] = useState([]);
  const [skills, setSkills] = useState([]);
  // CERTIFICATE COMPS
  const [Cid, setCid] = useState(0);
  const [Cname, setCName] = useState("");
  const [organize, setOrganize] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [detail, setDetail] = useState("");
  const [link, setLink] = useState("");
  const [open, setOpen] = useState(false);
  //SKILL COMPS
  const [sname, setSName] = useState("");
  const [skillId, setSkillId] = useState(null);
  const [Sid, setSid] = useState(0);
  const [SExp, setSExp] = useState(0);

  const [sInputValue, setSInputValue] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);
  const [pdf, setPdf] = useState(null);

  let [openAlert, setOpenAlert] = useState(false);
  const [skillOpen, setSkillOpen] = useState(false);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUser(parsedUserData);
    }
  }, []);
  //FUNCTION
  function handleSExp(event) {
    let midleScore =
      parseFloat(event.target.value) >= 0 ? parseFloat(event.target.value) : 0;
    setSExp(midleScore);
  }
  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleIntro(e) {
    setIntro(e.target.value);
  }
  function handleExp(e) {
    setExperience(e.target.value);
  }
  function handleSkillAdd2() {
    let arr = skillData.filter(
      (comp) =>
        comp.skillName === (sInputValue !== null ? sInputValue.skillName : "")
    );

    if (arr[0] === undefined) {
      handleSetSkillOpen();
      setSkillId(null);
      setSName("");
      setSInputValue("");
      setSExp(0);
    } else {
      const newSkill = {
        cvSkillsId: Sid,
        skillId: skillId,
        experienceYear: SExp,
      };

      setSkills([...skills, newSkill]);
      setSkillOption(skillOption.filter((prop) => prop.skillId !== skillId));
      setSkillId(null);
      setSName("");
      setSInputValue("");
      setSExp(0);
      setSid((prev) => (prev += 1));
    }
  }
  function handleSkilltDelete(id) {
    let delReq = skills.filter((component) => component.cvSkillsId === id);
    let newSkill = skillData.filter(
      (prop) => prop.skillId === delReq[0].skillId
    );
    setSkills(skills.filter((component) => component.cvSkillsId !== id));
    setSkillOption([...skillOption, newSkill[0]]);
  }
  function handleCertificateAdd() {
    if (
      Cname !== "" &&
      organize !== "" &&
      startDate !== null &&
      link !== "" &&
      endDate !== null
    ) {
      const newCert = {
        certificateId: Cid,
        certificateName: Cname,
        organizationName: organize,
        dateEarned: startDate.toJSON(),
        expirationDate: endDate !== null ? endDate.toJSON() : endDate,
        description: detail,
        link: link,
        isDeleted: false,
      };
      setCerts([...certs, newCert]);
      setCName("");
      setOrganize("");
      setStartDate(null);
      setEndDate(null);
      setDetail("");
      setLink("");
      setCid((prev) => (prev += 1));
    } else {
      handleSetOpen();
    }
  }
  const removeFieldFromCertificates = (certificatesArray, fieldToRemove) => {
    return certificatesArray.map(
      ({ [fieldToRemove]: removedField, ...rest }) => rest
    );
  };
  function handleCertDelete(id) {
    setCerts(certs.filter((component) => component.certificateId !== id));
  }
  const handleSetOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSetSkillOpen = () => {
    setSkillOpen(true);
  };
  const handleSkillClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSkillOpen(false);
  };

  let errormess =""
  async function handleSubmit(e) {
    // const formData = { worker_id: user.id, name: cvtitle, intro: intro, skill: skills, certificate: certs, exp: experience };
    // try {
    //   const response = await create_cv(formData);
    //   if (response) {
    //     const userData = response.data;
    //     localStorage.setItem("userData", JSON.stringify(userData));

    //     navigate("/home");
    //     console.log("User signed in:", response);
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     const { status } = error.response;
    //     if (status === 404) {
    //       setError("Wrong email or password.");
    //       setLoading(false);
    //     }
    //   }
    //   console.error("Sign up failed:", error);
    // } finally {
    //   setLoading(false);
    // }
    // let token = `Bearer ${userlocal.token}`;
    // const config = {
    //   headers: { Authorization: token },
    // };
    // const updatedSkills = removeFieldFromCertificates(skills, "cvSkillsId");
    // const updatedCertificates = removeFieldFromCertificates(
    //   certs,
    //   "certificateId"
    // );

    // try {
    //   // setLoading(true);
    //   const formData = new FormData();
    //   formData.append("File", pdf);
    //   const response = await axios.post(
    //     `https://leetun2k2-001-site1.gtempurl.com/api/Cv`,
    //     {
    //       candidateId: canid,
    //       experience: experience,
    //       cvPdf: "",
    //       cvName: cvtitle,
    //       introduction: intro,
    //       education: education,
    //       isDeleted: false,
    //       skills: updatedSkills,
    //       certificates: updatedCertificates,
    //     },
    //     config
    //   );

    //   const response2 = await axios.get(
    //     `https://leetun2k2-001-site1.gtempurl.com/api/Cv`,
    //     config
    //   );

    //   const cv = response2.data.filter(
    //     (prop) =>
    //       prop.cvName === cvtitle &&
    //       prop.candidateId === canid &&
    //       prop.introduction === intro &&
    //       prop.isDeleted === false
    //   );
    //   if (pdf !== null) {
    //     /////////// UPLOAD CV ( đã upload lên được và trả về link nhưng link bên back end không hoạt động được)
    //     const response3 = await axios.post(
    //       `https://leetun2k2-001-site1.gtempurl.com/api/Cv/UploadCvPdf/${cv[0].cvid}`,
    //       formData,
    //       config
    //     );
    //   }
    //   delay(1000);
    //   dispatch({
    //     type: "error/setError",
    //     payload: { status: "no", message: cv[0].cvid },
    //   });
    // } catch (err) {
    //   dispatch({
    //     type: "error/setError",
    //     payload: { status: "yes", message: err.response.data.error },
    //   });
    // }
  }
  //COMPS
  async function preProcessing() {
    const formData = { worker_id: user.id, name: cvtitle, intro: intro, skill: skills, certificate: certs, exp: experience };
    
    const messArr = [];
    if (skills.length === 0) {
      messArr.push("skill");
    }
    if (cvtitle == "") {
      messArr.push("title");
    }
    if(intro ==""){
      messArr.push("introduction")
    }
    let messString = "";
    if (messArr.length > 0) {
      messArr.forEach((x, index) => {
        messString = messString + x;
        if (index < messArr.length - 1) {
          messString = messString + ", ";
        } else {
          messString = messString + ".";
        }
        setErrorSnackbar(true);
      });
    } else {
      setOpenAlert(true);
      try {
        const response = await create_cv(formData);
        if (response) {
          navigate("/home");
        }
      } catch (error) {
        if (error.response) {
          const { status } = error.response;
          console.log(status)
        }
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <>
      <Grid container spacing={0} justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "80%" }}>
            <BaseForm
              //notify
              handleSkillClose={handleSkillClose}
              handleSetSkillOpen={handleSetSkillOpen}
              skillOpen={skillOpen}
              preProcessing={preProcessing}
              //////////Skill////////
              skillOption={skillOption}
              setSkillId={setSkillId}
              intro={intro}
              setIntro={setIntro}
              education={education}
              setEducation={setEducation}
              experience={experience}
              setExperience={setExperience}
              certs={certs}
              setCerts={setCerts}
              skills={skills}
              setSkills={setSkills}
              Cid={Cid}
              setCid={setCid}
              Cname={Cname}
              setCName={setCName}
              organize={organize}
              setOrganize={setOrganize}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              detail={detail}
              setDetail={setDetail}
              link={link}
              setLink={setLink}
              open={open}
              setOpen={setOpen}
              name={sname}
              setName={setSName}
              Sid={Sid}
              setSid={setSid}
              SExp={SExp}
              setSExp={setSExp}
              sInputValue={sInputValue}
              setSInputValue={setSInputValue}
              handleIntro={handleIntro}
              handleExp={handleExp}
              handleSkillAdd={handleSkillAdd2}
              handleSkilltDelete={handleSkilltDelete}
              handleCertificateAdd={handleCertificateAdd}
              handleCertDelete={handleCertDelete}
              handleSetOpen={handleSetOpen}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              cvtitle={cvtitle}
              handleTitle={handleTitle}
              skillData={skillData}
              languageData={languageData}
              // cvpfd
              pdfFile={pdfFile}
              setPdfFile={setPdfFile}
              viewPdf={viewPdf}
              setViewPdf={setViewPdf}
              setPdf={setPdf}
              handleSExp={handleSExp}
            />
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={skillOpen}
        autoHideDuration={3000}
        onClose={handleSkillClose}
      >
        <SkillAlert
          onClose={handleSkillClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Wrong skill's name
        </SkillAlert>
      </Snackbar>
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={4000}
        onClose={() => {
          setErrorSnackbar(false);
        }}
      >
        <Alert
          variant="filled"
          onClose={() => {
            setErrorSnackbar(false);
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          please fill {skills.length === 0?(cvtitle === ""?(intro === ""?"skill, title and intro.":"skill, title."):"skill."):(cvtitle === ""?(intro === ""?"title, intro.":"title."):(intro === ""?"intro.":""))}
        </Alert>
      </Snackbar>
    </>
  );
}
export default CVForm;
