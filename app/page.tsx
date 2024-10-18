import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import en from '@/lib/dictionary/en.json';

const { homepage } = en;

const HomePage = () => {
	return (
		<>
			{/* Hero Section */}
			<section className='relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden'>
				<div className='absolute inset-0 z-0'>
					<Image
						src='/images/wire-background.jpg'
						alt={homepage.alt.backgroundImage}
						layout='fill'
						objectFit='cover'
						className='opacity-20'
					/>
				</div>
				<div className='relative z-10 text-center px-4 sm:px-6 lg:px-8'>
					<div className='mb-8 inline-block'>
						<div className='relative inline-flex items-center justify-center w-40 h-40 overflow-hidden bg-blue-800 rounded-full'>
							<span className='text-4xl font-bold text-gray-100'>50+</span>
							<span className='absolute bottom-4 text-sm font-medium text-gray-300'>
								{homepage.hero.yearsExperience}
							</span>
						</div>
					</div>
					<h1 className='text-4xl sm:text-5xl md:text-6xl font-bold text-blue-900 mb-6'>
						{homepage.hero.title}
					</h1>
					<p className='text-xl sm:text-2xl md:text-3xl text-blue-800 mb-4'>
						{homepage.hero.subtitle}
					</p>
					<p className='text-lg text-blue-700 mb-8 max-w-3xl mx-auto'>
						{homepage.hero.description}
					</p>
					<Link
						href='/contact-us'
						className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-100 bg-blue-800 hover:bg-blue-700 transition duration-150 ease-in-out'>
						{homepage.hero.cta}
						<ArrowRight className='ml-2 -mr-1 h-5 w-5' />
					</Link>
				</div>
			</section>

			{/* Experience Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 bg-blue-800 text-gray-100'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center mb-12'>
						<h2 className='text-4xl font-bold mb-4'>
							{homepage.experience.title}
						</h2>
						<p className='text-2xl mb-4'>{homepage.experience.subtitle}</p>
						<p className='text-xl'>{homepage.experience.description}</p>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{homepage.experience.supportItems.map((item, index) => (
							<div
								key={index}
								className='flex items-start'>
								<CheckCircle className='flex-shrink-0 h-6 w-6 text-gray-300 mt-1' />
								<p className='ml-3 text-lg'>{item}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Why Choose Us Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-100'>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-3xl font-bold text-blue-900 mb-8 text-center'>
						{homepage.whyChooseUs.title}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{homepage.whyChooseUs.items.map((item, index) => (
							<div
								key={index}
								className='flex items-start'>
								<CheckCircle className='flex-shrink-0 h-6 w-6 text-blue-700 mt-1' />
								<p className='ml-3 text-lg text-gray-700'>{item}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Industries Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 bg-blue-50'>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-3xl font-bold text-blue-900 mb-8 text-center'>
						{homepage.industries.title}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{homepage.industries.items.map((industry, index) => (
							<div
								key={index}
								className='bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center'>
								<div className='text-4xl mb-4'>{industry.icon}</div>
								<h3 className='text-xl font-semibold text-blue-800 mb-2'>
									{industry.name}
								</h3>
								<p className='text-gray-600'>{industry.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-100'>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-3xl font-bold text-blue-900 mb-8 text-center'>
						{homepage.benefits.title}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{homepage.benefits.items.map((benefit, index) => (
							<div
								key={index}
								className='flex items-start'>
								<CheckCircle className='flex-shrink-0 h-6 w-6 text-blue-700 mt-1' />
								<p className='ml-3 text-lg text-gray-700'>{benefit}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Partnership Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 bg-blue-100'>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-3xl font-bold text-blue-900 mb-8 text-center'>
						{homepage.partnership.title}
					</h2>
					<div className='flex flex-col items-center'>
						{homepage.partnership.items.map((item, index) => (
							<p
								key={index}
								className='text-xl text-blue-800 mb-4'>
								{item}
							</p>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-100'>
				<div className='max-w-3xl mx-auto text-center'>
					<h2 className='text-3xl font-bold text-blue-900 mb-4'>
						{homepage.cta.title}
					</h2>
					<p className='text-xl text-gray-600 mb-8'>
						{homepage.cta.description}
					</p>
					<div className='space-x-4'>
						<Link
							href='/contact-us'
							className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-100 bg-blue-800 hover:bg-blue-700 transition duration-150 ease-in-out'>
							{homepage.cta.buttons.contact}
						</Link>
						<Link
							href='/products'
							className='inline-flex items-center px-6 py-3 border border-blue-800 text-base font-medium rounded-md text-blue-800 bg-white hover:bg-blue-50 transition duration-150 ease-in-out'>
							{homepage.cta.buttons.explore}
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default HomePage;
