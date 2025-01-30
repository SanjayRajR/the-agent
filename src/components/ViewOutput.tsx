import { Box, Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React, { useState } from 'react'
import Editor from './Editor';

const ViewOutput = ({agentData}: any) => {

  const [isOpen, setIsopen] = useState(false);
  return (
    <Box sx={{ my: '20px' }}>

      <Button variant="outlined" endIcon={<ArrowForwardIcon /> }
        sx={{ color: 'grey' }}
        onClick={() => setIsopen(true)}
      >
        View Detailed Output
      </Button>
      {isOpen && <Editor setIsOpen={setIsopen} agentData={agentData}/>}
    </Box>
  )
}

export default ViewOutput
