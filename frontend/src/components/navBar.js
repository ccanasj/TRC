import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../Logo.svg';

function NavBar() {
  return (
    <AppBar position="static" sx={{ bgcolor: "#C55A10", border: 10, borderColor: "black" }} >
      <Toolbar>
        <Stack direction="row" width="100%" spacing={2} padding={2} justifyContent="space-between" alignItems="center">
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2}>
            <Link to={"/"}>
              <Logo width="82" height="82" />
            </Link>
            <Typography variant='h6'>
              La robacion
            </Typography>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2}>
              <Button fullWidth component={Link} to={"/edit"} sx={{ bgcolor: "#ffffff", color: "black"}}>Editar</Button>
              <Button fullWidth component={Link} to={"/music"} sx={{ bgcolor: "#ffffff", color: "black", whiteSpace: "nowrap", minWidth: "auto" }}>Reproductor</Button>
              <Button fullWidth component={Link} to={"/XD"} sx={{ bgcolor: "#ffffff", color: "black" }}>XD</Button>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;