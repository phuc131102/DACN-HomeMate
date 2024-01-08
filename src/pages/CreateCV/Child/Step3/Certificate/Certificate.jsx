import CertificateForm from "./Certificateform";
import UlList from "./CertUlList";
import Box from "@mui/material/Box";

const Certificate = (prop) => {
  return (
    <>
      <Box>
        <UlList comps={prop.certs} handleDelete={prop.handleCertDelete} />
        <CertificateForm
          state={"Certificate"}
          handleState={prop.setCName}
          setOrganize={prop.setOrganize}
          setStart={prop.setStart}
          startDate={prop.startDate}
          endDate={prop.endDate}
          setEnd={prop.setEnd}
          link={prop.link}
          setLink={prop.setLink}
          value={prop.Cname}
          onPress={prop.handleCertificateAdd}
          organize={prop.organize}
          detail={prop.detail}
          setDetail={prop.setDetail}
          open={prop.open}
          setOpen={prop.setOpen}
          handleSetOpen={prop.handleSetOpen}
          handleClose={prop.handleClose}
        />
      </Box>
    </>
  );
};

export default Certificate;
