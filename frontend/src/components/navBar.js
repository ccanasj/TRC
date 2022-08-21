import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../Logo.svg';

function NavBar() {
  return (
    <AppBar position="static" sx={{ bgcolor: "#C55A10" }}>
      <Toolbar>
        <Grid container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          padding={1}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Link to={"/"}>
              <Logo width="64" height="64" />
            </Link>
            <Typography href="/" variant='h6' component='div' sx={{ flexGrow: 1 }}>
              La robacion
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Link style={{ textDecoration: 'none' }} to={"/edit"}>
              <Button sx={{ bgcolor: "#ffffff", color: "black" }}>Editar</Button>
            </Link>
            <Link style={{ textDecoration: 'none' }} to={"/music"}>
              <Button sx={{ bgcolor: "#ffffff", color: "black" }}>Reproductor</Button>
            </Link>
            <Link style={{ textDecoration: 'none' }} to={"/XD"}>
              <Button sx={{ bgcolor: "#ffffff", color: "black" }}>XD</Button>
            </Link>
          </Stack>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;