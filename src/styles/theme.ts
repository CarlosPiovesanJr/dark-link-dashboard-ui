
// LinkBoard UI Theme Configuration
export const theme = {
  colors: {
    // Dark theme colors
    dark: {
      background: {
        primary: 'hsl(220 13% 9%)',      // Very dark blue-gray
        secondary: 'hsl(220 13% 13%)',   // Dark blue-gray
        tertiary: 'hsl(220 13% 16%)',    // Medium dark blue-gray
      },
      foreground: {
        primary: 'hsl(220 9% 98%)',      // Almost white
        secondary: 'hsl(220 9% 85%)',    // Light gray
        muted: 'hsl(220 9% 60%)',        // Medium gray
      },
      accent: {
        orange: {
          primary: 'hsl(25 95% 60%)',     // Warm orange
          secondary: 'hsl(25 95% 50%)',   // Darker orange
          light: 'hsl(25 95% 70%)',       // Light orange
        },
        blue: {
          primary: 'hsl(210 80% 65%)',    // Soft blue
          secondary: 'hsl(210 80% 55%)',  // Darker blue
          light: 'hsl(210 80% 75%)',      // Light blue
        }
      },
      border: 'hsl(220 13% 20%)',        // Border gray
      input: 'hsl(220 13% 18%)',         // Input background
    },
    // Light theme colors
    light: {
      background: {
        primary: 'hsl(220 20% 98%)',     // Almost white
        secondary: 'hsl(220 20% 95%)',   // Very light gray
        tertiary: 'hsl(220 20% 92%)',    // Light gray
      },
      foreground: {
        primary: 'hsl(220 13% 9%)',      // Very dark
        secondary: 'hsl(220 13% 25%)',   // Dark gray
        muted: 'hsl(220 13% 45%)',       // Medium gray
      },
      accent: {
        orange: {
          primary: 'hsl(25 95% 55%)',     // Orange
          secondary: 'hsl(25 95% 45%)',   // Darker orange
          light: 'hsl(25 95% 65%)',       // Light orange
        },
        blue: {
          primary: 'hsl(210 80% 60%)',    // Blue
          secondary: 'hsl(210 80% 50%)',  // Darker blue
          light: 'hsl(210 80% 70%)',      // Light blue
        }
      },
      border: 'hsl(220 20% 85%)',        // Light border
      input: 'hsl(220 20% 92%)',         // Input background
    }
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },
  borderRadius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }
} as const;

export type Theme = typeof theme;
