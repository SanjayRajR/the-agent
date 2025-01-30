'use client'
import Image from "next/image";
// import styles from "./page.module.css";
import { Avatar, Box, Button, CircularProgress, Container, IconButton, InputBase, Paper } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from "react";
import { initiateAgent } from "@/actions";
import AllAgents from "@/components/AllAgents";

const styles = {
  mainContainer: {
    // display:'flex',
    justifyContent: 'center',
    pt: '250px',
    m: 'auto',
    textAlign: 'center'
  },
  textContainer: {
    width: { sm: '100%', md: '60%' },
    aliignItems: 'center',
    display: 'flex',
    margin: 'auto',
    backgroundColor: 'grey',
    mt: '20px'
  }
}

export default function Home() {

  const [userName, setUserName] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onInputChange = (value: any) => {
    setUserName(value.target.value);
  }

  const onClick = () => {
    setIsLoading(true);
    initiateAgent({ name: userName })
  }
  return (
    <Box maxWidth="sm" sx={styles.mainContainer}>
      <Box>
        <Image
          src="/giphy.gif"
          alt="The agent logo"
          width={250}
          height={250}
          priority
        />
      </Box>
      <Box>
        Hello! I am The Agent and here to help you with any queries
      </Box>
      <Box>
        <Box>
          <Paper
            sx={styles.textContainer}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Type you name and we can get started!"
              inputProps={{ 'aria-label': 'ask me anything' }}
              onChange={onInputChange}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="type"
              onClick={onClick}
            >
              {isLoading && <CircularProgress sx={{color: 'black'}}/>}
              {!isLoading && <ArrowForwardIcon />}
            </IconButton>
          </Paper>

          <Box sx={{mt: '40px'}}>
              <Button  sx={{color: 'grey'}} endIcon={<ArrowForwardIcon />} onClick={() => setIsModalOpen(true)}>
                Start a previous thread
              </Button>
            </Box>
            {isModalOpen && <AllAgents setIsModalOpen={setIsModalOpen} />}
        </Box>
      </Box>
    </Box>
  );
}
