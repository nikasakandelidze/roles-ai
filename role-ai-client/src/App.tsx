import { Box, Button, TextField } from '@mui/material';
import './App.css';
import { useEffect, useState } from 'react';
import { useWebSocketConnection, useWebSocketHandler } from './hooks/useWebsocket';

function App() {
  const [send, setSend] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [input, setInput] = useState('')

  const appendToPrompt = (content: string) => {
    setPrompt(prev=>prev+content)
  }

  const {isConnected} = useWebSocketConnection()
  const { sendPrompt } = useWebSocketHandler({promptResponseHandler: appendToPrompt})

  useEffect(()=>{
    if(send){
      sendPrompt(input)
      setInput('')
      setSend(false)
    }
  }, [send])

  return (
    <div className="App">
      <Box>
         {prompt || 'please say something'}
      </Box>
      <TextField onChange={(e) => setInput(e.target.value)}/>
      <Button variant='contained' onClick={()=>{
        setSend(true)
      }}>
        Send
      </Button>
    </div>
  );
}

export default App;
