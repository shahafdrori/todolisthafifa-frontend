import { Box, Typography, Button } from "@mui/material";

const NotFoundPage = () => {
  return (
    
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
      minHeight="100%"
      textAlign="center"
      p={4}
      sx={{ backgroundColor: "#fff" }}
    >
      <Box
        component="img"
        src="src/img/dollie.png"
        sx={{
          width: { xs: "80%", md: "400px" },
          maxWidth: "500px",
          borderRadius: 2,
          mb: { xs: 3, md: 0 },
          mr: { md: 5 },
        }}
      />
      <Box maxWidth="500px">
        <Typography variant="h3" color="text.secondary" fontWeight="bold" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Uh-oh, something went wrong!
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          We can’t find the page you’re looking for. Meet Dollie while you’re
          here 🐶
        </Typography>

        <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/">
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
