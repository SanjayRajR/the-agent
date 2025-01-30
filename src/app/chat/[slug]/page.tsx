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


export default function page() {

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
      {messages?.length && (

        <Grid2 maxWidth="lg" sx={styles.mainContainer}>
          {messages?.map((data: any, index: number) => (
            <Box pt={'20px'} key={`${index}-msg`}>

              {data.type == 'ai' &&
                <AiMessage message={data.message} index={index} agentData={agentData}/>
              }
              {data.type == 'human' &&
                <HumanMessage message={data.message} userName={userName} />
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
