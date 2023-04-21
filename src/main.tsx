import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const colors = {

}

const theme = extendTheme({
  colors: {
    tea: {
      100: '#F4F9F3',
      200: '#E8F1E6',
      300: '#B1C8AD',
      400: '#3C4E37',
      500: '#133629',
    }
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
