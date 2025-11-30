import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useAtom } from "jotai";
import { searchQueryAtom } from "../atoms/atoms";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useAtom(searchQueryAtom);

  return (
    <TextField
      label="Search"
      variant="filled"
      sx={{ backgroundColor: "white", borderRadius: "8px" }}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
