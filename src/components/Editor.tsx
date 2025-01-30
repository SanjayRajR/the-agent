import React, { useEffect, useRef } from 'react'
import EditorJS from '@editorjs/editorjs'
import { Box, Modal } from '@mui/material'

const modalStyle =  {
    position: {sm: 'absolute'},
    top: {sm: '50%'},
    left: {sm: '50%'},
    transform: {xs: 'none', sm: 'translate(-50%, -50%)'},
    width: {xs: '100%', sm:'700px'},
    height: {xs: '100%', sm:'500px'}, 
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Editor = ({setIsOpen}: any) => {

    const ejInstance = useRef<any>(null);

    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                ejInstance.current = editor;
            },
            autofocus: true,
            onChange: async () => {
                let content = await editor.saver.save();

                console.log(content)
            }
        })
    }

    useEffect(() => {
        if(ejInstance.current === null){
            initEditor();
        }

        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
        }
    }, [])

  return (
    <Modal
        open = { true }
        onClose={() => setIsOpen(false)}
    >
    <Box id="editorjs" sx={modalStyle}>
      
    </Box>

    </Modal>
  )
}

export default Editor
