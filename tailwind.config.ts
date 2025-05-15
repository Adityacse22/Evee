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
                // Extended cyberpunk theme colors
                neon: {
                    blue: '#00FFFF',
                    green: '#39FF14',
                    purple: '#9D00FF',
                    pink: '#FF00F5',
                    yellow: '#FFFF00',
                    orange: '#FF9933',
                    red: '#FF0033',
                },
                cyber: {
                    dark: '#0F0F19',
                    darker: '#080810',
                    light: '#1E1E2F',
                    accent: '#392F5A',
                    highlight: '#31274A',
                },
                // Ultra-modern gradient palette
                gradient: {
                    blue: 'linear-gradient(225deg, #00FFFF 0%, #0099FF 100%)',
                    green: 'linear-gradient(225deg, #39FF14 0%, #00CC33 100%)',
                    purple: 'linear-gradient(225deg, #9D00FF 0%, #6600CC 100%)',
                },
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
                '3xl': '1.5rem',
                '4xl': '2rem',
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
                'slide-in-right': {
                    '0%': { transform: 'translateX(100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                'slide-in-left': {
                    '0%': { transform: 'translateX(-100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                'slide-in-bottom': {
                    '0%': { transform: 'translateY(100%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                'glow-pulse': {
                    '0%, 100%': { boxShadow: '0 0 5px 2px var(--glow-color, rgba(0, 255, 255, 0.7))' },
                    '50%': { boxShadow: '0 0 15px 5px var(--glow-color, rgba(0, 255, 255, 0.9))' },
                },
                'glow-pulse-strong': {
                    '0%, 100%': { boxShadow: '0 0 10px 2px var(--glow-color, rgba(0, 255, 255, 0.7)), 0 0 20px 5px var(--glow-color, rgba(0, 255, 255, 0.5))' },
                    '50%': { boxShadow: '0 0 20px 5px var(--glow-color, rgba(0, 255, 255, 0.9)), 0 0 30px 10px var(--glow-color, rgba(0, 255, 255, 0.7))' },
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
                'rotate-3d-slow': {
                    '0%': { transform: 'rotate3d(1, 1, 1, 0deg)' },
                    '100%': { transform: 'rotate3d(1, 1, 1, 360deg)' },
                },
                'grid-flow': {
                    '0%': { backgroundPosition: '0px 0px' },
                    '100%': { backgroundPosition: '40px 40px' },
                },
                'border-glow': {
                    '0%, 100%': { borderColor: 'rgba(0, 255, 255, 0.7)' },
                    '50%': { borderColor: 'rgba(0, 255, 255, 0.3)' },
                },
                'scale-pulse': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                },
                'hover-rise': {
                    '0%': { transform: 'translateY(0) scale(1)' },
                    '100%': { transform: 'translateY(-10px) scale(1.02)' }
                },
                'card-flip': {
                    '0%': { transform: 'rotateY(0deg)' },
                    '100%': { transform: 'rotateY(180deg)' }
                },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.3s ease-out',
                'fade-out': 'fade-out 0.3s ease-out',
                'slide-in': 'slide-in 0.4s ease-out',
                'slide-in-right': 'slide-in-right 0.3s ease-out',
                'slide-in-left': 'slide-in-left 0.3s ease-out',
                'slide-in-bottom': 'slide-in-bottom 0.3s ease-out',
                'glow-pulse': 'glow-pulse 2s infinite ease-in-out',
                'glow-pulse-strong': 'glow-pulse-strong 2s infinite ease-in-out',
                'pulse-slow': 'pulse 3s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'neon-flicker': 'neon-text-flicker 1.5s infinite alternate',
                'holographic': 'holographic-move 6s ease infinite',
                'scanline': 'scanline 8s linear infinite',
                'gradient-x': 'gradient-x 15s ease infinite',
                'pulse-opacity': 'pulse-opacity 2s ease-in-out infinite',
                'slow-rotate': 'rotate-slow 30s linear infinite',
                'grid-flow': 'grid-flow 1s linear infinite',
                'border-glow': 'border-glow 2s ease-in-out infinite',
                'scale-pulse': 'scale-pulse 3s ease-in-out infinite',
                'hover-rise': 'hover-rise 0.5s ease-out forwards',
                'card-flip': 'card-flip 0.8s ease-out forwards',
                'rotate-3d': 'rotate-3d-slow 20s linear infinite',
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
                'ultra-grid': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%2300FFFF' stroke-opacity='0.15' stroke-width='0.5'%3E%3Cpath d='M0 0 L60 0 L60 60 L0 60 L0 0 Z M20 0 L20 60 M40 0 L40 60 M0 20 L60 20 M0 40 L60 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                'circuit-lines': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%2300FFFF' stroke-opacity='0.1' stroke-width='0.5' fill='none'%3E%3Cpath d='M0 50 Q25 25, 50 50 T100 50 M25 0 V100 M75 0 V100'/%3E%3C/g%3E%3C/svg%3E\")",
                'radial-glow': 'radial-gradient(circle at center, rgba(0, 255, 255, 0.2) 0%, rgba(157, 0, 255, 0.1) 40%, rgba(15, 15, 25, 0) 70%)',
            },
            boxShadow: {
                'neon-blue': '0 0 5px theme(colors.neon.blue), 0 0 10px theme(colors.neon.blue)',
                'neon-green': '0 0 5px theme(colors.neon.green), 0 0 10px theme(colors.neon.green)',
                'neon-purple': '0 0 5px theme(colors.neon.purple), 0 0 10px theme(colors.neon.purple)',
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'neo': '5px 5px 10px #0c0c14, -5px -5px 10px #12121e',
                'neo-inset': 'inset 5px 5px 10px #0c0c14, inset -5px -5px 10px #12121e',
                'neon-blue-lg': '0 0 10px theme(colors.neon.blue), 0 0 20px theme(colors.neon.blue)',
                'neon-green-lg': '0 0 10px theme(colors.neon.green), 0 0 20px theme(colors.neon.green)',
                'neon-purple-lg': '0 0 10px theme(colors.neon.purple), 0 0 20px theme(colors.neon.purple)',
                'glassy': '0 10px 30px rgba(0, 0, 0, 0.2)',
                '3d-top': '0 -5px 15px rgba(0, 0, 0, 0.3)',
                '3d-card': '0 10px 30px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.5)',
                'inner-glow': 'inset 0 0 10px rgba(0, 255, 255, 0.5)',
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
                'glow-lg': '0 0 15px rgba(0, 255, 255, 0.7)',
                'text-glow': '0 0 10px rgba(255, 255, 255, 0.5)',
                'neon-3d': [
                    '0 0 5px rgba(0, 255, 255, 0.7)',
                    '0 0 10px rgba(0, 255, 255, 0.5)',
                    '0 0 15px rgba(0, 255, 255, 0.3)',
                ],
            },
            backdropBlur: {
                xs: '2px',
            },
            transformStyle: {
                '3d': 'preserve-3d',
            },
            perspective: {
                '1000': '1000px',
                '2000': '2000px',
            },
            translate: {
                'z-10': '10px',
                'z-20': '20px',
                'z-neg-10': '-10px',
                'z-neg-20': '-20px',
            },
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
