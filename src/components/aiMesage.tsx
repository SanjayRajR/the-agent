import { Avatar, Box, Card, CardContent, CardHeader, Grid2, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

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


const AiMesage = ({ content }: any) => {
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

                        {content}
                    </Typography>
                </CardContent>
            </Card>
        </Grid2>
    )
}

export default AiMesage
