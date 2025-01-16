export const theme = {
  colors: {
    // Primary colors
    primary: {
      50: '#EBF5FF',
      100: '#CCE5FF',
      200: '#99CCFF',
      300: '#66B2FF',
      400: '#3399FF',
      500: '#0080FF', // Main brand color
      600: '#0066CC',
      700: '#004D99',
      800: '#003366',
      900: '#001A33',
    },
    // Warm accents for emotional connection
    accent: {
      50: '#FFF5EB',
      100: '#FFE5CC',
      200: '#FFCC99',
      300: '#FFB266',
      400: '#FF9933',
      500: '#FF8000', // Main accent color
      600: '#CC6600',
      700: '#994D00',
      800: '#663300',
      900: '#331A00',
    },
    // Neutral tones
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
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
  },
} as const;
