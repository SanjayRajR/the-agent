import { Avatar, IconButton, InputBase, Paper } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React, { useState } from 'react'
import FormControl, { useFormControl } from '@mui/material/FormControl';

const styles = {
    container: {
        width: { sm: '100%', md: '60%' },
        aliignItems: 'center',
        display: 'flex',
        margin: 'auto',
        backgroundColor: 'grey',
        mb: '40px'
    }
}

const MessageInput = ({ onInput, userName }: any) => {

    const [inputMessage, setInputMessage] = useState();
    const onInputChange = (value: any) => {
        setInputMessage(value.target.value);
    }

    return (
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
                placeholder={`Ask me anything ${userName}!`}
                inputProps={{ 'aria-label': 'ask me anything' }}
                onChange={onInputChange}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="type" 
                onClick={() => onInput(inputMessage)}
            >
                <ArrowUpwardIcon />
            </IconButton>
        </Paper>
    )
}

export default MessageInput
