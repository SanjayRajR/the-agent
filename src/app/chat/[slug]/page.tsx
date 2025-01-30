'use client'

import { Box, Grid2 } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AiMessage from '@/components/aiMesage';
import HumanMessage from '@/components/humanMessage';
import MessageInput from '@/components/MessageInput';
import { createClient } from '../../../../supabase/client';
import { useParams } from 'next/navigation'
import { updateAgent } from '@/actions';

const styles = {
  mainContainer: {
    // display:'flex',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '25px',
    border: { sm: 'none', md: '1px solid #808080' },
    mt: { sm: 'none', md: '150px' },
    height: { sm: 'none', md: '700px' },
    mb: { sm: '50px', md: '0' },
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


export default function page() {

  const params = useParams<{ slug: string }>()

  const [messages, setMessages] = useState<any>([])
  const [userName, setUserName] = useState('')
  const [isAgentRunning, setIsAgentRunnig] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.from("the-agent")
      .select()
      .eq('agent_id', params.slug)
      .then((data: any) => {
        console.log(data)
        setMessages([...data.data[0].messages])
        setUserName(data.data[0].user_name)
        setIsAgentRunnig(data.data[0].running_status)
      })


      const handleUpdates = (payload:any) => {
        setMessages(payload.new.messages)
        setIsAgentRunnig(payload.new.running_status);
      }

      const channel = supabase.channel('realtime posts')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'the-agent', filter:`agent_id=eq.${params.slug}`}, handleUpdates)
      .subscribe()


      return () => {
        supabase.removeChannel(channel)
      }
  }, [supabase])


  const onInput = (text: string) => {
    let oldMsgs = [...messages, {
      type: 'human',
      message: text
    }]
    setMessages(oldMsgs);
    updateAgent({
      agentId: params.slug,
      messages: oldMsgs
    })
  }



  return (
    <>
      {messages?.length && (

        <Grid2 maxWidth="lg" sx={styles.mainContainer}>
          {messages?.map(({ type, message }: any, index: number) => (
            <Box pt={'20px'} key={`${index}-msg`}>

              {type == 'ai' &&
                <AiMessage message={message} />
              }
              {type == 'human' &&
                <HumanMessage message={message} userName={userName} />
              }
            </Box>
          )
          )}
          <MessageInput onInput={onInput} userName={userName} isAgentRunning={isAgentRunning}/>
        </Grid2>
      )}
    </>
  )
}
