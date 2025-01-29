'use client'
import Image from "next/image";
// import styles from "./page.module.css";
import { Box, Button, Container } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation'

const styles = {
  mainContainer: {
    // display:'flex',
    justifyContent: 'center',
    pt: '250px',
    m: 'auto',
    textAlign: 'center'
  }
}

export default function Home() {

  const router = useRouter();

  const onClick = () => {
    router.push('/chat/new')
  }
  return (
    <Box maxWidth="sm" sx = {styles.mainContainer}>
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
        Here to help
      </Box>
      <Box>  
      <Button 
        variant="contained" 
        endIcon={<ArrowForwardIcon />}
        onClick={onClick}
      >
        Lets get started
      </Button>
      </Box>
    </Box>
  );
}
