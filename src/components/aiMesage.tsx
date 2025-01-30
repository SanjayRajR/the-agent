import { Avatar, Box, Button, Card, CardContent, CardHeader, Grid2, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import ViewOutput from './ViewOutput'

const styles = {
    grid: {
        textAlign: 'left',
        px: '10px'
    },
    card: {
        maxWdith: '80%',
        backgroundColor: '#0a0a0a',
        color: '#ffffff'
    }
}


const AiMesage = ({ message, agentData, index }: any) => {
    console.log(agentData)
    return (
        <Grid2 sx={styles.grid}>
            <Card sx={styles.card}>
                <Box sx={{ display: 'flex'}}>

                    <Avatar
                        alt="The Agent" >
                        <Image
                            src="/giphy.gif"
                            alt={"The Agent"}
                            fill
                        />
                    </Avatar>
                    <Box sx={{
                        my: 'auto',
                        pl: '10px'
                    }}> The Agent</Box>
                </Box>

                <CardContent>
                    <Typography variant="body2" >
                        {message}
                    </Typography>
                    {index > 1 && <ViewOutput agentData={agentData}/>}
                </CardContent>
            </Card>
        </Grid2>
    )
}

export default AiMesage
