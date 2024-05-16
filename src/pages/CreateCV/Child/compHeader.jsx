import { Box, Typography } from "@mui/material";

const CompHeader = (props) => {
    return (
        <Box>
            <Box sx={{display: "flex",columnGap:1 }}>
                <Box sx={{display: "flex", alignItems: "center", fontSize:"22"}}>
                    {props.headerIcon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {props.children}
                </Typography>
            </Box>
        </Box>
    )
}

export default CompHeader