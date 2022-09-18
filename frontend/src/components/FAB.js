import Fab from '@mui/material/Fab';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import { Link } from 'react-router-dom';

function FAB() {

    return (
        <Fab style={{
            margin: 0,
            top: 'auto',
            right: 'auto',
            bottom: 15,
            left: 15,
            position: 'fixed',
            backgroundColor: 'black',
            color: 'white'
        }} size="medium" component={Link} to={"/"} variant="extended">
            <HomeRoundedIcon />
        </Fab>
    );
}

export default FAB;