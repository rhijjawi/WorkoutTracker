import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
	'./node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
	"./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			tremor: {
				brand: {
					faint: '#eff6ff', // blue-50
					muted: '#bfdbfe', // blue-200
					subtle: '#60a5fa', // blue-400
					DEFAULT: '#3b82f6', // blue-500
					emphasis: '#1d4ed8', // blue-700
					inverted: '#ffffff', // white
				},
				background: {
					muted: '#f9fafb', // gray-50
					subtle: '#f3f4f6', // gray-100
					DEFAULT: '#ffffff', // white
					emphasis: '#374151', // gray-700
				},
				border: {
					DEFAULT: '#e5e7eb', // gray-200
				},
				ring: {
					DEFAULT: '#e5e7eb', // gray-200
				},
				content: {
					subtle: '#9ca3af', // gray-400
					DEFAULT: '#6b7280', // gray-500
					emphasis: '#374151', // gray-700
					strong: '#111827', // gray-900
					inverted: '#ffffff', // white
				},
			},
			// dark mode
			'dark-tremor': {
				brand: {
					faint: '#0B1229', // custom
					muted: '#172554', // blue-950
					subtle: '#1e40af', // blue-800
					DEFAULT: '#3b82f6', // blue-500
					emphasis: '#60a5fa', // blue-400
					inverted: '#030712', // gray-950
				},
				background: {
					muted: '#131A2B', // custom
					subtle: '#1f2937', // gray-800
					DEFAULT: '#111827', // gray-900
					emphasis: '#d1d5db', // gray-300
				},
				border: {
					DEFAULT: '#1f2937', // gray-800
				},
				ring: {
					DEFAULT: '#1f2937', // gray-800
				},
				content: {
					subtle: '#4b5563', // gray-600
					DEFAULT: '#6b7280', // gray-600
					emphasis: '#e5e7eb', // gray-200
					strong: '#f9fafb', // gray-50
					inverted: '#000000', // black
				},
			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
