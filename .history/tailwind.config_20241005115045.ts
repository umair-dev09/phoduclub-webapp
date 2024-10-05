import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			scrollBehavior: ['smooth'],
			animation: {
				'spin-loading': 'spin 0.5s linear infinite',
			},

			keyframes: {
				spin: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },

				}
			},

			boxShadow: {
				'inner-button': 'inset 0px 3px 2px rgba(255, 255, 255, 0.24)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: '8px',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				customWhite: '#fff',
				purple: '#9012FF',
				darkPurple: '#800EE2',
				lightGrey: '#eaecf0',
				blackLike: '#1d2939',
				custompurple: '#9012FF',
				lavend: '#6941C6',
				progressPurple: '#7400E0'
			},

		},
		keyframes: {
			slideUp: {
				'0%': { transform: 'translateY(100%)' },
				'100%': { transform: 'translateY(0)' },

			},

			slideDown: {
				'0%': { transform: 'translateY(0)' },
				'100%': { transform: 'translateY(100%)', visibility: 'hidden' },
			},

		},
		animation: {
			slideUp: 'slideUp 0.3s ease-out',
			slideDown: 'slideDown 0.5s ease-in-out',
		},
	},

	// plugins: [
	// 	require("tailwindcss-animate")
	// ],
};

export default config;
