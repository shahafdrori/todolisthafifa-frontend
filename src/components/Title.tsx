import { Typography } from "@mui/material";
interface TitleProps {
  text: string;
}
const Title: React.FC<TitleProps> = ({ text }) => {
  
  return (
    <Typography
      variant="h2"
      sx={{ fontWeight: "bold", textDecoration: "underline" }}
    >
      {text}
    </Typography>
  );
};

export default Title;
