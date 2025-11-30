import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(90deg, #000486ff 0%, #8f8f8fff 100%)",
    color: theme.palette.common.white,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 13,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  }
}));
