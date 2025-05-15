
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
                // Cyberpunk theme colors
                neon: {
                    blue: '#00FFFF',
                    green: '#39FF14',
                    purple: '#9D00FF',
                    pink: '#FF00F5',
                    yellow: '#FFFF00',
                },
                cyber: {
                    dark: '#0F0F19',
                    darker: '#080810',
                    light: '#1E1E2F',
                    accent: '#392F5A',
                    highlight: '#31274A',
                },
                electric: {
                    50: '#f0faff',
                    100: '#e0f5fe',
                    200: '#bae8fd',
                    300: '#7dd5fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                },
                charcoal: {
                    50: '#f6f7f9',
                    100: '#eceef2',
                    200: '#d5dae2',
                    300: '#b0bac8',
                    400: '#8595aa',
                    500: '#64788f',
                    600: '#4f6075',
                    700: '#404d60',
                    800: '#36414f',
                    900: '#1A1F2C',
                    950: '#171c27',
                },
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
				},
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'fade-out': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                'slide-in': {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 5px 2px var(--glow-color, rgba(0, 255, 255, 0.7))' },
                    '50%': { boxShadow: '0 0 15px 5px var(--glow-color, rgba(0, 255, 255, 0.9))' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'neon-text-flicker': {
                    '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px var(--neon-color, #00FFFF), 0 0 82px var(--neon-color, #00FFFF), 0 0 92px var(--neon-color, #00FFFF), 0 0 102px var(--neon-color, #00FFFF), 0 0 151px var(--neon-color, #00FFFF)' },
                    '20%, 24%, 55%': { textShadow: 'none' },
                },
                'holographic-move': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                'scanline': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(100vh)' }
                },
                'gradient-x': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                'pulse-opacity': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                'rotate-slow': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'grid-flow': {
                    '0%': { backgroundPosition: '0px 0px' },
                    '100%': { backgroundPosition: '40px 40px' },
                }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.3s ease-out',
                'fade-out': 'fade-out 0.3s ease-out',
                'slide-in': 'slide-in 0.4s ease-out',
                'glow-pulse': 'glow-pulse 2s infinite ease-in-out',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'neon-flicker': 'neon-text-flicker 1.5s infinite alternate',
                'holographic': 'holographic-move 6s ease infinite',
                'scanline': 'scanline 8s linear infinite',
                'gradient-x': 'gradient-x 15s ease infinite',
                'pulse-opacity': 'pulse-opacity 2s ease-in-out infinite',
                'slow-rotate': 'rotate-slow 30s linear infinite',
                'grid-flow': 'grid-flow 1s linear infinite',
			},
            fontFamily: {
                sans: ['Orbitron', 'sans-serif'],
                display: ['Orbitron', 'sans-serif'],
                mono: ['Share Tech Mono', 'monospace'],
                cyberpunk: ['Orbitron', 'sans-serif'],
            },
            backgroundImage: {
                'cyber-grid': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a1a2e' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                'cyber-radial': 'radial-gradient(circle, rgba(15, 15, 25, 0.8) 0%, rgba(15, 15, 25, 1) 100%)',
                'neon-grid': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%2300FFFF' stroke-width='0.5' stroke-opacity='0.2'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            },
            boxShadow: {
                'neon-blue': '0 0 5px theme(colors.neon.blue), 0 0 10px theme(colors.neon.blue)',
                'neon-green': '0 0 5px theme(colors.neon.green), 0 0 10px theme(colors.neon.green)',
                'neon-purple': '0 0 5px theme(colors.neon.purple), 0 0 10px theme(colors.neon.purple)',
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'neo': '5px 5px 10px #0c0c14, -5px -5px 10px #12121e',
                'neo-inset': 'inset 5px 5px 10px #0c0c14, inset -5px -5px 10px #12121e',
            },
            dropShadow: {
                'neon-text-blue': [
                    '0 0 7px rgba(0, 255, 255, 0.5)',
                    '0 0 10px rgba(0, 255, 255, 0.5)',
                    '0 0 21px rgba(0, 255, 255, 0.5)',
                ],
                'neon-text-green': [
                    '0 0 7px rgba(57, 255, 20, 0.5)',
                    '0 0 10px rgba(57, 255, 20, 0.5)',
                    '0 0 21px rgba(57, 255, 20, 0.5)',
                ],
                'neon-text-purple': [
                    '0 0 7px rgba(157, 0, 255, 0.5)',
                    '0 0 10px rgba(157, 0, 255, 0.5)',
                    '0 0 21px rgba(157, 0, 255, 0.5)',
                ],
            },
            backdropBlur: {
                xs: '2px',
            },
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
