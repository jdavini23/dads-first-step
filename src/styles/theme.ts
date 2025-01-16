export const theme = {
  colors: {
    // Primary colors - Warm, trustworthy blue
    primary: {
      50: '#EBF8FF',
      100: '#D1EBFD',
      200: '#A7D8FB',
      300: '#7CC4F9',
      400: '#52B1F7',
      500: '#2196F5', // Main brand color - Friendly, approachable blue
      600: '#1A75D2',
      700: '#1557AF',
      800: '#0F3C8C',
      900: '#0A2669',
    },
    // Warm accents - Sunset orange for emotional warmth
    accent: {
      50: '#FFF3E6',
      100: '#FFE0CC',
      200: '#FFC299',
      300: '#FFA366',
      400: '#FF8533',
      500: '#FF6600', // Main accent - Warm, energetic orange
      600: '#CC5200',
      700: '#993D00',
      800: '#662900',
      900: '#331400',
    },
    // Supporting colors - Nurturing green
    support: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E', // Main support color
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D',
    },
    // Neutral tones - Warm grays
    neutral: {
      50: '#FAFAF9',
      100: '#F5F5F4',
      200: '#E7E5E4',
      300: '#D6D3D1',
      400: '#A8A29E',
      500: '#78716C',
      600: '#57534E',
      700: '#44403C',
      800: '#292524',
      900: '#1C1917',
    },
    // Success, warning, error states
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
  },
  typography: {
    fonts: {
      heading: '"Montserrat", sans-serif', // Modern, friendly heading font
      body: '"Inter", sans-serif', // Clean, readable body font
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '2.5rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    highlight: '0 0 15px rgba(255, 102, 0, 0.15)', // Warm glow for hover states
  },
} as const;
