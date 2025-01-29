import { Avatar, Box, Card, CardContent, CardHeader, Grid2, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const styles = {
    grid: {
        textAlign: 'right',
        px: '10px'
    },
    card: {
        maxWdith: '80%',
        backgroundColor: '#0a0a0a',
        color: '#ffffff'
    }
}

const HumanMessage = ({message, userName} : any) => {
    return (
        <Grid2 sx={styles.grid}>
            <Card sx={styles.card}>
        <Box sx={{ display: 'flex', justifyContent: 'end'  }}>
        
        <Box sx={{
                                my: 'auto',
                                pr: '10px'
                            }}> {userName}</Box>
                            <Avatar
                                alt="Sanjay" >
                                {userName.chatAt(0)}
                            </Avatar>
        
                        </Box>
       <CardContent sx={{display: "inline-flex"}}>
        <Typography variant="body2" textAlign={'left'} >
          
            {message}
        </Typography>
      </CardContent>
        </Card>
        </Grid2>
      )
}

export default HumanMessage
