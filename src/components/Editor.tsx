import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs'
import { Box, Modal } from '@mui/material'
import Header from '@editorjs/header';

const modalStyle = {
    position: { sm: 'absolute' },
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

const Editor = ({ setIsOpen, agentData }: any) => {
    const editorData = {
        time: new Date().getTime(),
        blocks: [
            {
                type: 'header',
                data: {
                    level: 1,
                    text: `Here's your detailed output ${agentData.user_name} !`
                }
            }
        ]
    }

    const [editor, setEditor] = useState<any>()

    useEffect(() => {
        editor == undefined && setEditor(() => new EditorJS({
            holder: 'editorjs',
            autofocus: true,
            tools: {
                header: Header
            },
            readOnly: true,
            data: editorData
        }))

    }, [])

    return (
        <Modal
            open={true}
            onClose={() => setIsOpen(false)}
        >
            <Box id="editorjs" sx={modalStyle}>

            </Box>

        </Modal>
    )
}

export default Editor
