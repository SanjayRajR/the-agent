'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export async function updateAgentState(data: any) {
    let agentId = ''
    try {
        const supabase = createServerActionClient({ cookies });

        const response:any = await supabase
            .from('the-agent')
            .insert({
                user_name: data.name,
                messages: {
                    type: 'ai',
                    message: `Hello ${data.name}. What can I do for you today?`
                }
            }).select()
        agentId = response.data[0].agentid;

    } catch (error) {
        console.error('error', error);
        return {
            type: 'error',
            message: 'Database error: failed to insert Message'
        }
    }

    redirect(`/chat/${agentId}`)
}