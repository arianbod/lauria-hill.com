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
const currentYear = new Date().getFullYear();

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
					<section className=' text-white py-16 px-4 sm:px-6 lg:px-8 border-t-2 mx-20'>
						<div className='max-w-3xl mx-auto text-center'>
							<h2 className='text-3xl font-bold mb-6'>Get in Touch</h2>
							<p className='text-xl mb-4'>TORONTO</p>
							<p className='text-lg mb-2'>416-674-1490 Main</p>
							<p className='text-lg mb-4'>1-800-334-7824 Toll Free</p>
							<p className='text-sm'>
								&copy; Copyright {currentYear}. All rights reserved
							</p>
						</div>
					</section>
				</main>
			</body>
		</html>
	);
}
