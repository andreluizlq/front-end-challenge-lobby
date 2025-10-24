import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const Theme = createTheme({
  palette: {
    primary: {
      main: '#353535'
    },
    secondary: {
      main: '#22007F'
    },
    info: {
      main: '#64748B'
    },
    error: {
      main: red.A400
    },
    success: {
      main: '#00E0B8',
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(',')
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        },
        body: {
          lineHeight: 1,
          color: 'inherit',
          textDecoration: 'none',
          fontFamily: 'Open Sans, sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }
      }
    }
  }
})

export default Theme
