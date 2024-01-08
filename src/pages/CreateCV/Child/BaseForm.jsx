import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CvStep1 from "./Step1/CvStep1";
import CvStep2 from "./Step2/CvStep2";
import CvStep3 from "./Step3/CvStep3"
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { ColorlibConnector, ColorlibStepIcon } from "./SteperComp";
import { Typography } from "@mui/material";
import BigCard from "../../../components/BigCard/BigCard";
// import UploadPdf from "./UploadPdf";
// import TitleDivider from "../../../components/TitleDivider/TitleDivider";

//////////////////////////////////////////////////////

///////////////////////////////////////////////////////
const BaseForm = (prop) => {
  const steps = ["Introduction", "Your Experience", "Your Certificate"];
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  return (
    <form onSubmit={prop.handleSubmit}>
      <Grid container>
      <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold",marginTop:"", marginBottom: "16px" }}
          >
            Create CV
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom:"32px"
        }}
      >
        <Box className={`CVForm InputForm`}>
          <BigCard>
            <Grid
              container
              spacing={0}
              justifyContent="center"
              alignItems="center"
              marginTop="32px"
              marginBottom="32px"
            >
              <Grid item xs={12}>
                <Stepper
                  alternativeLabel
                  activeStep={activeStep}
                  connector={<ColorlibConnector />}
                >
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel
                        StepIconComponent={ColorlibStepIcon}
                        onClick={handleStep(index)}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <React.Fragment>
                    {activeStep === 0 ? (
                      <Grid item xs={12} sx={{ paddingBottom: "16px" }}>
                        <CvStep1
                          setIntro={prop.setIntro}
                          handleTitle={prop.handleTitle}
                          cvtitle={prop.cvtitle}
                          handleIntro={prop.handleIntro}
                          intro={prop.intro}
                          setEducation={prop.setEducation}
                          education={prop.education}
                        />
                      </Grid>
                    ) : activeStep === 1 ? (
                      <Grid item xs={12} sx={{ paddingBottom: "16px" }}>
                        <CvStep2
                          handleSExp={prop.handleSExp}
                          skillOption={prop.skillOption}
                          sInputValue={prop.sInputValue}
                          setSInputValue={prop.setSInputValue}
                          setSkillId={prop.setSkillId}
                          skillData={prop.skillData}
                          skills={prop.skills}
                          handleSkilltDelete={prop.handleSkilltDelete}
                          languageData={prop.languageData}
                          SExp={prop.SExp}
                          setSExp={prop.setSExp}
                          setName={prop.setName}
                          name={prop.name}
                          setExperience={prop.setExperience}
                          handleSkillAdd={prop.handleSkillAdd}
                          experience={prop.experience}
                          languages={prop.languages}
                          handleLanguageDelete={prop.handleLanguageDelete}
                          lInputValue={prop.lInputValue}
                          setLInputValue={prop.setLInputValue}
                          setLanguageName={prop.setLanguageName}
                          languageName={prop.languageName}
                          setLanguageId={prop.setLanguageId}
                          handleLanguageAdd={prop.handleLanguageAdd}
                        />
                      </Grid>
                    ) : (
                      <Grid item xs={12} sx={{ paddingBottom: "16px" }}>
                        <CvStep3
                          cvalue={prop.cvalue}
                          setCValue={prop.setCValue}
                          open={prop.open}
                          setOpen={prop.setOpen}
                          certs={prop.certs}
                          handleCertDelete={prop.handleCertDelete}
                          setCName={prop.setCName}
                          setOrganize={prop.setOrganize}
                          setStartDate={prop.setStartDate}
                          setEndDate={prop.setEndDate}
                          handleCertificateAdd={prop.handleCertificateAdd}
                          Cname={prop.Cname}
                          startDate={prop.startDate}
                          endDate={prop.endDate}
                          organize={prop.organize}
                          detail={prop.detail}
                          setDetail={prop.setDetail}
                          link={prop.link}
                          setLink={prop.setLink}
                          handleSetOpen={prop.handleSetOpen}
                          handleClose={prop.handleClose}
                        />
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          pt: 2,
                          width: "80%",
                          margin: "auto",
                        }}
                      >
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          variant="contained"
                          className="AddButton"
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        {activeStep === 2 ? (
                          <Button
                            variant="contained"
                            className="AddButton"
                            onClick={prop.preProcessing}
                          >
                            Finish
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            className="AddButton"
                            onClick={handleNext}
                            sx={{ mr: 1 }}
                          >
                            Next
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </React.Fragment>
                </Box>
              </Grid>
            </Grid>
          </BigCard>
        </Box>
      </Grid>
      {/* <TitleDivider>Cv Pdf (optional)</TitleDivider> */}
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop:"32px"
        }}
      >
        <Box className={`CVForm InputForm`}>
          <Grid item xs={12}>
            {/* <UploadPdf
              pdfFile={prop.pdfFile}
              setPdfFile={prop.setPdfFile}
              viewPdf={prop.viewPdf}
              setViewPdf={prop.setViewPdf}
              setPdf={prop.setPdf}
            /> */}
          </Grid>
        </Box>
      </Grid>
    </form>
  );
};

export default BaseForm;
