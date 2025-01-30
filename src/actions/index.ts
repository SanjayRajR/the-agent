'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export async function initiateAgent(data: any) {
    let agentId = ''
    try {
        const supabase = createServerActionClient({ cookies });

        const response: any = await supabase
            .from('the-agent')
            .insert({
                user_name: data.name,
                messages: [{
                    type: 'ai',
                    message: `Hello ${data.name}. What can I do for you today?`
                }]
            }).select()
        agentId = response.data[0].agent_id;

    } catch (error) {
        console.error('error', error);
        return {
            type: 'error',
            message: 'Database error: failed to insert Message'
        }
    }

    redirect(`/chat/${agentId}`)
}

export async function updateAgent(data: any) {
    try {
        const supabase = createServerActionClient({ cookies });

        const response: any = await supabase
            .from('the-agent')
            .update({ messages: data.messages, 'running_status': true })
            .eq('agent_id', data.agentId)
            .select();

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        fetch("http://localhost:8000/", requestOptions)
            .then(response => response.json())
            .then(data => console.log('data', data))
            .catch(error => console.log('error', error))



    } catch (error) {
        console.error('error', error);
        return {
            type: 'error',
            message: 'Database error: failed to insert Message'
        }
    }
}