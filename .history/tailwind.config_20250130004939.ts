import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			animation: {
				"spin-loading": "spin 0.5s linear infinite",
			},
			keyframes: {
				spin: {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
			},
			boxShadow: {
				"inner-button": "inset 0px 3px 2px rgba(255, 255, 255, 0.24)",
				"text-area":
					"0px 4px 6px -2px rgba(16, 24, 40, 0.08), 0px 12px 16px -4px rgba(16, 24, 40, 0.14)",
			},
			borderColor: {
				'hover-custom': 'rgba(158, 119, 237, 0.5)', // Replace with your desired border color
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "8px",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				customWhite: "#fff",
				purple: "#9012FF",
				pink: "#D8ACFF",
				darkPurple: "#800EE2",
				lightGrey: "#eaecf0",
				blackLike: "#1d2939",
				customPurple: "#9012FF",
				lavend: "#6941C6",
				progressPurple: "#7400E0",
				phoduGrey: "#f7f8fb",
				colors: "#9012FF",
			},
		},
		keyframes: {
			slideUp: {
				"0%": { transform: "translateY(100%)" },
				"100%": { transform: "translateY(0)" },
			},
			slideDown: {
				"0%": { transform: "translateY(0)" },
				"100%": { transform: "translateY(100%)", visibility: "hidden" },
			},
		},
		animation: {
			slideUp: "slideUp 0.3s ease-out",
			slideDown: "slideDown 0.5s ease-in-out",
		},

	},
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: '#9012FF',

						},
						secondary: {
							DEFAULT: "#0B9055",
						}

					}
				},
				dark: {
					colors: {
						primary: "#0072f5",
					}
				},

			},

		}),
	],
};

export default config;
