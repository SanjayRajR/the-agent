'use client' 

import { Box, Grid2 } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AiMessage from '@/components/aiMesage';
import HumanMessage from '@/components/humanMessage';
import MessageInput from '@/components/MessageInput';

const styles = {
    mainContainer: {
      // display:'flex',
      justifyContent: 'center',
      textAlign: 'center',
      borderRadius: '25px',
      border: {sm: 'none', md: '1px solid #808080'},
      mt:{sm: 'none', md:'150px'},
      height: {sm: 'none', md:'700px'},
      mb: {sm: '50px', md: '0'},
      mx: 'auto',
      overflowY: 'auto',
    },
  }

  
  let dummyMessages = [
    {
        type: 'ai',
        content: 'Hi lets get started with your name'
    },
    {
        type: 'human',
        content: 'Sanjay Raj R'
    },
    {
        type: 'ai',
        content: 'Hi Sanjay, what do you want to ask me today?'
    },
    {
        type: 'human',
        content: "What's the latest news on some of the new FDA regulations in the US?"
    },
    {
      type: 'ai',
      content: 'Regulation also provides for the submission of a humanitarian device exemption (HDE) application. A Humanitarian Use Device (HUD) is a device that is intended to benefit patients by treating or diagnosing a disease or condition that affects fewer than 8,000 individuals in the United States per year. The (HDE) application is similar in both form and content to a premarket approval (PMA) application, but is exempt from the effectiveness requirements of a PMA.'
    }
  ]
  

const page = () => {


  const [messages, setMessages] = useState<any>([...dummyMessages])

  const onInput = (text: string) => {
    let oldMsgs = [{
      type: 'human',
      content: text
    },
    {
      type: 'ai',
      content: "Here's some results about what you just asked"
    }]
    setMessages([...messages, ...oldMsgs]);
  }

  return (
    <Grid2 maxWidth="lg" sx={styles.mainContainer}>
        {messages?.map(({type, content}: any, index: number) => (
            <Box pt={'20px'} key={`${index}-msg`}>

            {type == 'ai' && 
                <AiMessage content={content} />
            }
            {type == 'human' && 
                <HumanMessage content={content}/>
            }
          </Box>
        )
        )}

      <MessageInput onInput={onInput}/>

    </Grid2>
  )
}

export default page
