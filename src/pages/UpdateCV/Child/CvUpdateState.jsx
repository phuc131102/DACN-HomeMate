import { useState, useEffect } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { update_cv } from "../../../services/cvAPI";
// import skillInfo from "./fakeSkill";
import { get_skill } from "../../../services/skillAPI";
import Loading from "../../../components/Loading/Loading";
import CvBase from "../../CreateCV/Child/CvBase";
import { get_user_info, update_user_info } from "../../../services/userAPI";
import { get_cv_info } from "../../../services/cvAPI";

function CvUpdateState(prop) {
  const navigate = useNavigate();
  // fetch Data
  // CV COMPS
  let [errorSnackbar, setErrorSnackbar] = useState(false);
  ////////////////////////////////////////////////////
  // const [skillData, setSkillData] = useState(skillInfo);
  // const [skillOption, setSkillOption] = useState(skillInfo);
  const [skillData, setSkillData] = useState([]);
  const [skillOption, setSkillOption] = useState([]);
  //   console.log(skillOption);
  const [cvinfo, setCvInfo] = useState(null);
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
  //   console.log(skillId);
  useEffect(() => {
    const fetchSkill = async () => {
      setLoading(true);
      try {
        const response = await get_skill();
        // setSkillOption(response.data);
        setSkillData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching cv information:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const response = await get_cv_info(prop.id);
        setTitle(response.data.name);
        setIntro(response.data.intro);
        setExperience(response.data.exp);
        setCvInfo(response.data);
        setSkills(response.data.skill);
        const newCert = response.data.certificate;
        setCid(newCert.length);
        setCerts(newCert);
        const responses = await get_skill();
        setSkillData(responses.data);
        setSkillOption(
          responses.data.filter(
            (item1) =>
              !response.data.skill.some((item2) => item1.name === item2.name)
          )
        );
      } catch (error) {
        console.error("Error fetching cv information:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
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
      (comp) => comp.name === (sInputValue !== null ? sInputValue.name : "")
    );
    if (arr.length === 0) {
      handleSetSkillOpen();
      setSkillId(null);
      setSName("");
      setSInputValue("");
      setSExp(0);
    } else {
      const newSkill = {
        skill_id: Sid,
        name: sname,
        skillId: skillId,
        experienceYear: SExp,
      };

      setSkills([...skills, newSkill]);
      setSkillOption(skillOption.filter((prop) => prop._id !== skillId));
      setSkillId(null);
      setSName("");
      setSInputValue("");
      setSExp(0);
      setSid((prev) => (prev += 1));
    }
  }
  function handleSkilltDelete(id) {
    let delReq = skills.filter((component) => component.skill_id === id);
    console.log(delReq);
    let newSkill = skillData.filter((prop) => prop.name === delReq[0].name);
    console.log(newSkill);
    setSkills(skills.filter((component) => component.skill_id !== id));
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
  const handleSetErrorOpen = () => {
    setErrorSnackbar(true);
  };
  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorSnackbar(false);
  };

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
    const formData = {
      id: user.id,
      name: cvtitle,
      intro: intro,
      skill: skills,
      certificate: certs,
      exp: experience,
    };

    const messArr = [];
    if (skills.length === 0) {
      messArr.push("skill");
    }
    if (cvtitle == "") {
      messArr.push("title");
    }
    if (intro == "") {
      messArr.push("introduction");
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
        const response = await update_cv(formData);
        if (response) {
          navigate(`/profile/${user.id}`);
        }
      } catch (error) {
        if (error.response) {
          const { status } = error.response;
          console.log(status);
        }
      } finally {
        setLoading(false);
      }
    }
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {cvinfo !== null ? (
        <CvBase
          handleSetErrorOpen={handleSetErrorOpen}
          handleErrorClose={handleErrorClose}
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
          errorSnackbar={errorSnackbar}
          setErrorSnackbar={setErrorSnackbar}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default CvUpdateState;
