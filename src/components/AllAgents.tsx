import { Avatar, Box, CircularProgress, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { createClient } from '../../supabase/client';
import { useRouter } from 'next/navigation';

const modalStyle = {
    position: { sm: 'absolute' },
    overflowX: 'scroll',
    top: { sm: '50%' },
    left: { sm: '50%' },
    transform: { xs: 'none', sm: 'translate(-50%, -50%)' },
    width: { xs: '100%', sm: '700px' },
    height: { xs: '100%', sm: '500px' },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: '#000000'
};


const AllAgents = ({ setIsModalOpen }: any) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const supabase = createClient();
    const [agentData, setAgentData] = useState([]);

    useEffect(() => {
        supabase.from("the-agent")
            .select()
            .then((data: any) => {
                setAgentData(data.data);
                setIsLoading(false)
            })
    }, [])

    const handleAgentClick = (agentId: string) => {
        router.push(`/chat/${agentId}`)

    }

    return (
        <Modal
            open={true}
            onClose={() => setIsModalOpen(false)}
        >
            <>

                {isLoading && <CircularProgress />}
                {!isLoading && (

                    <Box sx={modalStyle}>
                        {agentData?.map((agents: any) => (

                            <List key={agents.agent_id} id={agents.agent_id} sx={{ width: '100%', maxWidth: 'none', bgcolor: 'background.paper' }}>
                                <ListItemButton onClick={() => handleAgentClick(agents.agent_id)}>

                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={agents.user_name} >
                                                {agents.user_name.charAt(0)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={`${agents.messages[0].message}`}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        sx={{ color: 'text.primary', display: 'inline' }}
                                                    >
                                                        {agents.user_name}
                                                    </Typography>
                                                    {agents.messages.length > 1 ? ` — ${agents.messages[1].message}…` : `, Go ahead and ask your first question now`}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                </ListItemButton>
                                <Divider variant="inset" component="li" />
                            </List>
                        ))}
                    </Box>
                )}
            </>

        </Modal>
    )
}

export default AllAgents
