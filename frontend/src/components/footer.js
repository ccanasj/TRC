import React, { useState } from "react"

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { ReactComponent as Logo } from '../svg/Flamenco.svg';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
    const [rotate, setRotate] = useState(false)

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return (
        <Stack sx={{ bgcolor: "#C55A10" }}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            padding={3} border={10}>
            <Logo className={rotate ? "rotate-logo" : ""} width="86" height="86" onClick={async (e) => {
                setRotate(true)
                await sleep(1000)
                setRotate(false)
            }} />
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2}>
                <Button sx={{ color: "black" }} target="_blank" href="https://www.instagram.com/teerecesinlimites/">
                    <InstagramIcon />
                </Button>
                <Button sx={{ color: "black" }} target="_blank" href="https://github.com/ccanasj/TRC-Robacion">
                    <GitHubIcon />
                </Button>
                <Typography>
                    ©TRC
                </Typography>
            </Stack>
        </Stack>
    );
}

export default Footer;