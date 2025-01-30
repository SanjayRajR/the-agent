import { Avatar, Box, CircularProgress, IconButton, InputBase, Paper } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React, { useState } from 'react'

const styles = {
    container: {
        bordertop: 'gray',
        width: { sm: '100%', md: '60%' },
        aliignItems: 'center',
        display: 'flex',
        margin: 'auto',
        backgroundColor: 'grey',
        mb: '40px',
        mt: '20px'
    }
}

const MessageInput = ({ onInput, userName, isAgentRunning }: any) => {

    const [inputMessage, setInputMessage] = useState<string>("");
    const onInputChange = (value: any) => {
        setInputMessage(value.target.value);
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        onInput(inputMessage)
        setInputMessage("");
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ borderTop: {md: '1px solid gray'}}} >
        <Paper
            sx={styles.container}
        >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <Avatar
                    alt={userName} >
                    {userName.charAt(0)}
                </Avatar>
            </IconButton>

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={isAgentRunning ? `Your answers are on the way!` : `Ask me anything ${userName}!`}
                inputProps={{ 'aria-label': 'ask me anything' }}
                onChange={onInputChange}
                disabled={isAgentRunning}
                value={inputMessage}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="type" 
                onClick={handleSubmit}
            >
                {isAgentRunning && <CircularProgress sx={{color: 'black'}}/>}
                {!isAgentRunning && <ArrowUpwardIcon />}
            </IconButton>
        </Paper>

        </Box>
    )
}

export default MessageInput
