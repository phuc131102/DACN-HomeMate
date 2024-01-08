import Certificate from "./Certificate/Certificate";
import Box from "@mui/material/Box";

function CvStep3(prop) {
  return (
    <>
      <Box sx={{width:"80%", margin:"auto",marginTop:"50px"}}>
        <Certificate
          open={prop.open}
          setOpen={prop.setOpen}
          certs={prop.certs}
          handleCertDelete={prop.handleCertDelete}
          setCName={prop.setCName}
          setOrganize={prop.setOrganize}
          setStart={prop.setStartDate}
          setEnd={prop.setEndDate}
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
      </Box>
    </>
  );
}

export default CvStep3;
