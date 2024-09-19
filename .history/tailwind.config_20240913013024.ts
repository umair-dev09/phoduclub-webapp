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

			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				customWhite: '#fff',
				purple: '#9012FF',
				darkPurple: '#800EE2',
				lightGrey: '#eaecf0',
				blackLike: '#1d2939',
				custompurple: '#9012FF',
				customwhite: '#9012FF',
				lavend: '#6941C6',
			},

		},
		keyframes: {
			slideUp: {
				'0%': { transform: 'translateY(100%)' },
				'100%': { transform: 'translateY(0)' },
			},
		},
		animation: {
			slideUp: 'slideUp 0.3s ease-out',
		},
	},
	// plugins: [
	// 	require("tailwindcss-animate")
	// ],
};

export default config;
