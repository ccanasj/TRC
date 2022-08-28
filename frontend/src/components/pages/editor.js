import React from "react"
import Box from '@mui/material/Box';

import MemoryGame from "../games/memoryGame";
import WIP from "../WIP";

function Editor() {
  return (
    <Box>
      <WIP text="Próximamente se implementara un editor de metadata de MP3."/>
      <MemoryGame />
    </Box>
  );
}

export default Editor;