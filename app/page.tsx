import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

const industries = [
	{ name: 'Automotive', icon: '🚗' },
	{ name: 'Aerospace', icon: '✈️' },
	{ name: 'Heavy Equipment', icon: '🚜' },
	{ name: 'Industrial Automation', icon: '🏭' },
	{ name: 'Medical Devices', icon: '🏥' },
];

const benefits = [
	'Custom designs tailored to your needs',
	'Proven technical expertise',
	'Reliable, high-quality connections',
	'Streamlined production, reduced costs',
	'Enhanced product performance',
];

const HomePage = () => {
	return (
		<div className='min-h-screen bg-gradient-to-b from-amber-50 to-amber-100'>
			{/* Hero Section */}
			<section className='relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden'>
				<div className='absolute inset-0 z-0'>
					<Image
						src='/images/wire-background.jpg'
						alt='Wire and Cable Background'
						layout='fill'
						objectFit='cover'
						className='opacity-20'
					/>
				</div>
				<div className='relative z-10 text-center px-4 sm:px-6 lg:px-8'>
					<h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-amber-800 mb-6'>
						Expert Custom Cable Solutions
					</h1>
					<p className='text-xl sm:text-2xl md:text-3xl text-amber-700 mb-8'>
						Transform Your Connectivity with Lauria and Hill Technologies
					</p>
					<Link
						href='/contact-us'
						className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 transition duration-150 ease-in-out'>
						Get Started
						<ArrowRight className='ml-2 -mr-1 h-5 w-5' />
					</Link>
				</div>
			</section>

			{/* About Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-3xl font-bold text-amber-800 mb-8 text-center'>
						Experience Innovative Solutions
					</h2>
					<p className='text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto'>
						Our strategic engineering approach ensures seamless integration,
						reliability, and efficiency in every cable and wire harness solution
						we craft.
					</p>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{industries.map((industry, index) => (
							<div
								key={index}
								className='bg-amber-50 p-6 rounded-lg shadow-md'>
								<div className='text-4xl mb-4'>{industry.icon}</div>
								<h3 className='text-xl font-semibold text-amber-700 mb-2'>
									{industry.name}
								</h3>
								<p className='text-gray-600'>
									Tailored solutions for {industry.name.toLowerCase()}{' '}
									applications.
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 bg-amber-600'>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-3xl font-bold text-white mb-8 text-center'>
						Why Choose Lauria and Hill?
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{benefits.map((benefit, index) => (
							<div
								key={index}
								className='flex items-start'>
								<CheckCircle className='flex-shrink-0 h-6 w-6 text-amber-200 mt-1' />
								<p className='ml-3 text-lg text-white'>{benefit}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
				<div className='max-w-3xl mx-auto text-center'>
					<h2 className='text-3xl font-bold text-amber-800 mb-4'>
						Ready to Enhance Your Connections?
					</h2>
					<p className='text-xl text-gray-600 mb-8'>
						Partner with Lauria and Hill Technologies for strategic product
						design, technical support, and custom manufacturing solutions.
					</p>
					<div className='space-x-4'>
						<Link
							href='/contact-us'
							className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 transition duration-150 ease-in-out'>
							Contact Us
						</Link>
						<Link
							href='/products'
							className='inline-flex items-center px-6 py-3 border border-amber-600 text-base font-medium rounded-md text-amber-600 bg-white hover:bg-amber-50 transition duration-150 ease-in-out'>
							Explore Products
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
