import { Stack,Typography } from "@mui/material";
import { Link } from "react-router-dom";


import { logo } from "../utils/constants";
import img from "../utils/abye2.png"
import { SearchBar } from "./";

const Navbar = () => (
  <Stack direction="row" alignItems="center" p={2} sx={{ position:  "sticky", background: '#000', top: 0, justifyContent: "space-between" }}>
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={img} alt="logo" height={90}  width={90} />
    </Link>
    <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        TEMARIBET
    </Typography>
  </Stack>
);

export default Navbar;