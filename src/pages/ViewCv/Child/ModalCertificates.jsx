import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";

const ModalCertificates = ({ certificate }) => {
  // console.log(certificate)
  const [open, setOpen] = React.useState(true);
  const handleClick = () => setOpen(!open);
  const theme = useTheme();
  // const isXs = useMediaQuery(theme.breakpoints.down("xs"))
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const [scroll, setScroll] = React.useState("paper");
  return (
    <>
      <Box width="8px" sx={{ display: "flex", flexWrap: "wrap" }} mb={2}>
        <Box
          sx={{
            width: "8px",
            height: "8px",
          }}
          onClick={handleClick}
        ></Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            m: "5px",
            height: "100%",
            width: "1px",
            backgroundColor: "black",
          }}
        />
      </Box>
      <Box
        width="100%"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box
          sx={{
            m: "8px 0 0 16px",

            cursor: "pointer",
          }}
          // onMouseLeave={handleClose}
        >
          <Box onClick={handleClick}>
            <Box>
              {" "}
              Earn Date:{" "}
              {certificate.dateEarned.slice(0,10)}
            </Box>
            <Box>Name: {certificate.certificateName}</Box>
            <Box>Decription: {certificate.description}</Box>
            <Box display={open ? "block" : "none"}>
              Orgranizationname: {certificate.organizationName}
            </Box>
            {certificate.expirationDate=== null ? (
              <></>
            ) : (
              <Box display={open ? "block" : "none"}>
                ExpirationDate:{" "}
                {certificate.expirationDate.slice(0,10)}
              </Box>
            )}
          </Box>
          <Box display={open ? "block" : "none"}>
            {" "}
            Link:{" "}
            <a
              target="_blank"
              style={{ textDecoration: "none", color: "black" }}
              href={`https://${certificate.link}`}
            >
              {certificate.link}
            </a>
          </Box>
        </Box>
        {/* {console.log(isMd)} */}
        <Box display="flex" flexDirection="column" justifyContent="flex-end">
          <Box
            sx={{ display: isMd ? "none" : "block", cursor: "pointer" }}
            onClick={handleClick}
          >
            {" "}
            {open ? "See less" : "See more..."}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ModalCertificates;
