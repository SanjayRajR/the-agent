'use client'

import { Box, CircularProgress, Divider, Grid2 } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import AiMessage from '@/components/aiMesage';
import HumanMessage from '@/components/humanMessage';
import MessageInput from '@/components/MessageInput';
import { createClient } from '../../../../supabase/client';
import { useParams } from 'next/navigation'
import { updateAgent } from '@/actions';

const styles = {
  mainContainer: {
    height: { sm: 'none', md: '600px' },
    overflowY: 'auto',
  },
  boxContainer: {
    height: { sm: 'none', md: '700px' },
    borderRadius: '25px',
    border: { sm: 'none', md: '1px solid #808080' },
    mt: { sm: 'none', md: '150px' },
    justifyContent: 'center',
    textAlign: 'center',
    mx: 'auto'
  }
}


export default function page() {

  const [isLoading, setIsLoading] = useState(true);

  const messageEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef?.current?.scrollIntoView({ behavior: "smooth" })
  }

  const params = useParams<{ slug: string }>()

  const [agentData, setAgentData] = useState();
  const [messages, setMessages] = useState<any>([])
  const [userName, setUserName] = useState('')
  const [isAgentRunning, setIsAgentRunnig] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.from("the-agent")
      .select()
      .eq('agent_id', params.slug)
      .then((data: any) => {
        setAgentData(data.data[0]);
        setMessages([...data.data[0].messages])
        setUserName(data.data[0].user_name)
        setIsAgentRunnig(data.data[0].running_status)
        setIsLoading(false)
      })


      const handleUpdates = (payload:any) => {
        setAgentData(payload.new);
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

  useEffect(() => {
    scrollToBottom();
  }, [messages])


  const onInput = (text: string) => {
    let oldMsgs = [...messages, {
      type: 'human',
      message: text
    }]
    setIsAgentRunnig(true);
    setMessages(oldMsgs);
    updateAgent({
      agentId: params.slug,
      messages: oldMsgs
    })
  }



  return (
    <>
    {isLoading && <CircularProgress sx={{color: 'black', display: 'flex', m: 'auto'}}/>}
      {!isLoading && messages?.length && (
        <Box maxWidth="lg" sx={styles.boxContainer}>
        <Grid2 sx={styles.mainContainer}>
          {messages?.map((data: any, index: number) => (
            <Box pt={'20px'} key={`${index}-msg`}>

              {data.type == 'ai' &&
                <AiMessage message={data.message} index={index} agentData={agentData}/>
              }
              {data.type == 'human' &&
                <HumanMessage message={data.message} userName={userName} />
              }
              <div ref={messageEndRef} />
            </Box>
          )
          )}
        </Grid2>
        <MessageInput onInput={onInput} userName={userName} isAgentRunning={isAgentRunning}/>
        </Box>
      )}
    </>
  )
}
