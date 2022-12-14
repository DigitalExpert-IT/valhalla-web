import { extendTheme, ComponentStyleConfig } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#edf3f8',
      100: '#d5d8dc',
      200: '#bbbec2',
      300: '#a0a5aa',
      400: '#6171FB',
      500: '#6b7179',
      600: '#53585f',
      700: '#21005D',
      800: '#180240',
      900: '#070e13',
    },
  },

  styles: {
    global: {
      '&::-webkit-scrollbar': {
        width: '4px',
      },
      '&::-webkit-scrollbar-track': {
        width: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#0d0f1e',
        borderRadius: '50px',
      },
      'html, body': {
        bg: "#21005D",
        color: 'white',
      },
    },
  },
});

export default theme;