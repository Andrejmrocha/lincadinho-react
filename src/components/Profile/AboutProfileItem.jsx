import { Box, Grid2, Typography } from "@mui/material";

const AboutProfileItem = ({ name, value }) => {
  return (
    <>
      <Box sx={{ width: "100%", height: "40px" }}>
        <Grid2 container>
          <Grid2 size={6}>
            <Typography>{name}</Typography>
          </Grid2>
          <Grid2 size={6}>
            <Typography>{value}</Typography>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

export default AboutProfileItem;
