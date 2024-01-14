import {
  AssignmentTurnedIn,
  Email,
  EmojiEvents,
  IntegrationInstructions,
  Language,
  LocationOn,
  Person,
  Phone,
  Public,
  School,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ModalCertificates from "./ModalCertificates";
import BigCard from "../../../components/BigCard/BigCard";
import { useNavigate } from "react-router-dom";
import cvinfo from "./CVData";
import NoteField from "./NoteField";

const CV = (prop) => {
  const cvinfo= prop.cvinfo;
  const navigate = useNavigate();
    const cvinfor= cvinfo
  return (
    <>
      <Box>
        <BigCard>
          <Grid container spacing={3}>
              <>
                <Grid item md={12} xs={12}>
                  <Box p="24px 24px 0 24px">
                    {/* <Grid container>
                      <Grid
                        item
                        md={3}
                        sm={3}
                        xs={12}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                          bottom: "25px",
                        }}
                      >
                        <Box
                          component="img"
                          sx={{
                            borderRadius: "50%",
                            border: "1px solid #ccc",
                            width: "150px",
                            height: "150px",
                          }}
                          src={"https://cdn.animaapp.com/projects/655784b48c17a2032c616f6c/releases/655814d9b8c98c421b16e0c1/img/kisspng-computer-icons-portable-network-graphics-vector-gr-perso.png"}
                          alt=""
                        />
                      </Grid>
                      <Grid item md={1} sm={1} xs={12}></Grid>
                      <Grid item md={8} sm={8} xs={12}>
                        <Box sx={{ margin: "24px 0px 0px  0px" }}>
                          <h1> Viet Thang</h1>
                        </Box>
                        <Box>
                          <Box
                            sx={{
                              padding: "10px 24px 0 0",
                              display: "flex",
                              flexWrap: "no-wrap",
                            }}
                          >
                            <Box mr="15px">
                              <Email fontSize="small" />
                            </Box>

                            <Box>thang@gmail.com</Box>
                          </Box>
                          <Box
                            sx={{
                              padding: "10px 24px 0 0",
                              display: "flex",
                              flexWrap: "no-wrap",
                            }}
                          >
                            <Box mr="15px">
                              <Phone fontSize="small" />
                            </Box>

                            <Box>0399240577</Box>
                          </Box>
                          <Box
                            sx={{
                              padding: "10px 24px 0 0",
                              display: "flex",
                              flexWrap: "no-wrap",
                            }}
                          >
                            <Box mr="15px">
                              <LocationOn fontSize="small" />
                            </Box>

                            <Box>address</Box>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid> */}
                    {/* <Box>
                      <Divider
                        orientation="horizontal"
                        flexItem
                        sx={{ mt: 3, height: "0.5px" }}
                      />
                    </Box> */}
                  </Box>
                </Grid>
              </>

            <Grid item md={12} xs={12}>
              <Box px={3}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Public sx={{ mr: "15px" }} />
                  <Box
                    component="h2"
                    sx={{ position: "relative", top: "5.5px", m: 0 }}
                  >
                    Introduction
                  </Box>
                </Box>
                <NoteField note={cvinfor.intro} />
                <Box>
                  <Divider
                    orientation="horizontal"
                    flexItem
                    sx={{ mt: 3, height: "0.5px" }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item md={12} xs={12}>
              <Box px={3}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <IntegrationInstructions sx={{ mr: "15px" }} />
                  <Box
                    component="h2"
                    sx={{ position: "relative", top: "6.5px", m: 0 }}
                  >
                    Skills
                  </Box>
                </Box>
                <Box sx={{ padding: "16px 0 0 40px" }}>
                  {cvinfor.skill.map((skille, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        mb: "16px",
                      }}
                    >
                      <Box m={0} component="h4">
                        {skille.name} • {skille.experienceYear} năm kinh nghiệm
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Box>
                  <Divider
                    orientation="horizontal"
                    flexItem
                    sx={{ mt: 3, height: "0.5px" }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item md={12} xs={12}>
              <Box px={3}>
              {cvinfor.certificate.length >0?<>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <EmojiEvents sx={{ mr: "15px" }} />
                  <Box
                    component="h2"
                    sx={{ position: "relative", top: "6.5px", m: 0 }}
                  >
                    Certificates
                  </Box>
                </Box>
                <Box sx={{ padding: "0px 0 0 40px", mt: "16px" }}>
                  
                  <Box>
                    {cvinfor.certificate.map((certificate, index) => (
                      <Box key={index} sx={{ display: "flex" }}>
                        <ModalCertificates certificate={certificate.name} />
                      </Box>
                    ))}
                  </Box>
                </Box>
                
                <Box>
                  <Divider
                    orientation="horizontal"
                    flexItem
                    sx={{ mt: 3, height: "0.5px" }}
                  />
                </Box>
                </>:<></>}
              </Box>
            </Grid>

            <Grid item md={12} xs={12}>
              {cvinfor.exp ===""?<></>:<>
              <Box px={3}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <AssignmentTurnedIn sx={{ mr: "15px" }} />
                  <Box
                    component="h2"
                    sx={{ position: "relative", top: "5.5px", m: 0 }}
                  >
                    Experience
                  </Box>
                </Box>
                <Box sx={{ padding: "10px 0 0 40px" }}>
                  <NoteField note={cvinfor.exp} />
                </Box>
                <Box>
                  <Divider
                    orientation="horizontal"
                    flexItem
                    sx={{ mt: 3, height: "0.5px" }}
                  />
                </Box>
              </Box>
              </>}
            </Grid>
            
          </Grid>
        </BigCard>
        {/* <Box mt={3}>
          {page === "profile_cv" && (
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", marginY: 4 }}
            >
              <Button
                variant="contained"
                color="warning"
              >
                update
              </Button>
            </Box>
          )}
        </Box> */}
      </Box>
    </>
  );
};

export default CV;
