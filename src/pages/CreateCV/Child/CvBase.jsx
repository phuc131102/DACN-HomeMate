// import cvinfo from "./CvData";
import * as React from "react";
import BaseForm from "./BaseForm";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
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
function CvBase(prop) {
  function handleSetError(e) {
    prop.setErrorSnackbar(false);
  }
  return (
    <>
      <Grid container spacing={0} justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "80%" }}>
            <BaseForm
              //notify
              handleSkillClose={prop.handleSkillClose}
              handleSetSkillOpen={prop.handleSetSkillOpen}
              skillOpen={prop.skillOpen}
              preProcessing={prop.preProcessing}
              //////////Skill////////
              skillOption={prop.skillOption}
              setSkillId={prop.setSkillId}
              intro={prop.intro}
              setIntro={prop.setIntro}
              education={prop.education}
              setEducation={prop.setEducation}
              experience={prop.experience}
              setExperience={prop.setExperience}
              certs={prop.certs}
              setCerts={prop.setCerts}
              skills={prop.skills}
              setSkills={prop.setSkills}
              Cid={prop.Cid}
              setCid={prop.setCid}
              Cname={prop.Cname}
              setCName={prop.setCName}
              organize={prop.organize}
              setOrganize={prop.setOrganize}
              startDate={prop.startDate}
              setStartDate={prop.setStartDate}
              endDate={prop.endDate}
              setEndDate={prop.setEndDate}
              detail={prop.detail}
              setDetail={prop.setDetail}
              link={prop.link}
              setLink={prop.setLink}
              open={prop.open}
              setOpen={prop.setOpen}
              name={prop.sname}
              setName={prop.setName}
              Sid={prop.Sid}
              setSid={prop.setSid}
              SExp={prop.SExp}
              setSExp={prop.setSExp}
              sInputValue={prop.sInputValue}
              setSInputValue={prop.setSInputValue}
              handleIntro={prop.handleIntro}
              handleExp={prop.handleExp}
              handleSkillAdd={prop.handleSkillAdd}
              handleSkilltDelete={prop.handleSkilltDelete}
              handleCertificateAdd={prop.handleCertificateAdd}
              handleCertDelete={prop.handleCertDelete}
              handleSetOpen={prop.handleSetOpen}
              handleClose={prop.handleClose}
              handleSubmit={prop.handleSubmit}
              cvtitle={prop.cvtitle}
              handleTitle={prop.handleTitle}
              skillData={prop.skillData}
              languageData={prop.languageData}
              // cvpfd
              pdfFile={prop.pdfFile}
              setPdfFile={prop.setPdfFile}
              viewPdf={prop.viewPdf}
              setViewPdf={prop.setViewPdf}
              setPdf={prop.setPdf}
              handleSExp={prop.handleSExp}
            />
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={prop.skillOpen}
        autoHideDuration={3000}
        onClose={prop.handleSkillClose}
      >
        <SkillAlert
          onClose={prop.handleSkillClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Wrong skill's name
        </SkillAlert>
      </Snackbar>
      <Snackbar
        open={prop.errorSnackbar}
        autoHideDuration={4000}
        onClose={prop.handleErrorClose}
      >
        <Alert
          variant="filled"
          onClose={prop.handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          please fill{" "}
          {prop.skills.length === 0
            ? prop.cvtitle === ""
              ? prop.intro === ""
                ? "skill, title and in tro."
                : "skill, title."
              : "skill."
            : prop.cvtitle === ""
            ? prop.intro === ""
              ? "title, intro."
              : "title."
            : prop.intro === ""
            ? "intro."
            : ""}
        </Alert>
      </Snackbar>
    </>
  );
}
export default CvBase;
