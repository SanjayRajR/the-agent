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

const Editor = ({ setIsOpen, agentData, index }: any) => {
    const outputMessage = agentData.messages[index].message;
    const referenceData = agentData.reference_data[index/2 - 1];

    const agentOutput = agentData.output.filter((output:any) => {
        return Object.keys(output)[0] == index
    })[0]

    const blocks = [
        {
            type: 'header',
            data: {
                level: 2,
                text: `Here's your detailed output ${agentData.user_name} !`
            }
        },
        {
            type: "paragraph",
            data: {
              text: outputMessage
            }
          }
    ]
    
    if(referenceData.length){
        blocks.push({
            type: "header",
            data: {
              text: "Reference data",
              level: 3
            }
          },
          {
            type: "paragraph",
            data: {
              text:
                `<a href=${referenceData}> ${referenceData}</a> `
            }
          },)
    }

    if(agentOutput != undefined && agentOutput[index].length){
        blocks.push({
            type: "header",
            data: {
              text: "Output data",
              level: 3
            }
          },
          {
            type: "paragraph",
            data: {
              text:
                agentOutput[index]
            }
          },)
    }

    const editorData = {
        time: new Date().getTime(),
        blocks: blocks
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
