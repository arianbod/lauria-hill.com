import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navigation from '@/components/navbar/Navigation';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Lauria and Hill',
	description: 'Lauria and Hill',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
				<Navigation />
				<main className='min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pt-10 text-slate-800'>
					{children}
				</main>
			</body>
		</html>
	);
}
