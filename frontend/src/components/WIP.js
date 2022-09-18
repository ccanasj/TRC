import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { ReactComponent as Logo } from '../svg/Flamenco.svg';

function WIP(props) {

    const { text } = props

    return (
        <Grid border={10} padding={10} style={{ backgroundColor: "#ffde59", overflow: 'hidden'}}>
            <Grid border={5} padding={1} container direction="column" alignItems="center" justifyContent="center" style={{ transform: `rotate(-5deg)`, backgroundColor: "#ffde59" }}>
                <Typography variant='h4'>
                    Work In Progress
                </Typography>
                <Typography variant='h6'>
                    {text}
                </Typography>
                <Logo width="64" height="64" />
            </Grid>
        </Grid>
    );
}

export default WIP;