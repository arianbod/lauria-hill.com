import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navigation from '@/components/navbar/Navigation';
import Footer from '@/components/Footer';

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
	description: `Transform Your Connectivity with Lauria and Hill`,
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
				<main className='min-h-screen bg-gradient-to-b from-slate-700 to-gray-700 text-white pt-24'>
					{children}
					<Footer />
				</main>
			</body>
		</html>
	);
}
