import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				silver: {
					'50': '#f7f7f7',
					'100': '#ededed',
					'200': '#dfdfdf',
					'300': '#c8c8c8',
					'400': '#b1b1b1',
					'500': '#999999',
					'600': '#888888',
					'700': '#7b7b7b',
					'800': '#676767',
					'900': '#545454',
					'950': '#363636',
				},
				button: {
					normal: '#1E293B',
					text: '#F3F4F6',
					hover: '#363636',
				},
			},
		},
	},
	plugins: [],
};
export default config;
