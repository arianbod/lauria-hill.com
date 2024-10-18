'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import en from '@/lib/dictionary/en.json';

const { homepage } = en;
const TypewriterEffect = ({ sentences }) => {
	const [currentSentence, setCurrentSentence] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			const current = sentences[currentIndex];

			if (!isDeleting && currentSentence === current) {
				setTimeout(() => setIsDeleting(true), 1000);
			} else if (isDeleting && currentSentence === '') {
				setIsDeleting(false);
				setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length);
			} else {
				setCurrentSentence((prev) =>
					isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
				);
			}
		}, 50);

		return () => clearInterval(interval);
	}, [currentSentence, currentIndex, isDeleting, sentences]);

	return <span className='text-blue-300'>{currentSentence}</span>;
};
const HomePage = () => {
	const typewriterSentences = [
		'Innovative Cable Solutions',
		'Precision Engineered Connections',
		'Reliable Wire Harness Manufacturing',
	];

	return (
		<>
			{/* Hero Section */}
			<section className='relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-700 to-gray-700'>
				<div className='absolute inset-0 z-0'>
					{/* Background image code remains the same */}
				</div>
				<div className='relative z-10 text-center px-4 sm:px-6 lg:px-8 drop-shadow-lg'>
					<div className='mb-8 inline-block'>
						<div className='relative inline-flex items-center justify-center overflow-hidden rounded-3xl '>
							{/* <span className='text-4xl font-bold text-gray-100'>50+</span> */}
							<Image
								src='/images/logo1.jpg'
								width={400}
								height={400}
								alt='50+'
								className=' rounded-full  drop-shadow-lg w-72 border-8 border-b-4 pt-2 border-t-slate-500  border-r-slate-500 border-l-slate-500 border-b-slate-700 h-72'
							/>
							{/* <span className='absolute bottom-4 text-sm font-medium text-gray-300'>
								{homepage.hero.yearsExperience}
							</span> */}
						</div>
					</div>
					<h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2'>
						Welcome to Lauria and Hill!
					</h1>
					<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6'>
						<TypewriterEffect sentences={typewriterSentences} />
					</h2>
					<p className='text-xl sm:text-2xl md:text-3xl text-white mb-4'>
						{homepage.hero.subtitle}
					</p>
					<p className='text-lg text-white mb-8 max-w-3xl mx-auto'>
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
			<section className='py-16 px-4 sm:px-6 lg:px-8'>
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
			<section className='py-16 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-3xl font-bold mb-8 text-center'>
						{homepage.whyChooseUs.title}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{homepage.whyChooseUs.items.map((item, index) => (
							<div
								key={index}
								className='flex items-start'>
								<CheckCircle className='flex-shrink-0 h-6 w-6 mt-1' />
								<p className='ml-3 text-lg '>{item}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Industries Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-3xl font-bold mb-8 text-center'>
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
			<section className='py-16 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-3xl font-bold mb-8 text-center'>
						{homepage.benefits.title}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{homepage.benefits.items.map((benefit, index) => (
							<div
								key={index}
								className='flex items-start'>
								<CheckCircle className='flex-shrink-0 h-6 w-6  mt-1' />
								<p className='ml-3 text-lg'>{benefit}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Partnership Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-2xl font-bold mb-8 text-center'>
						{homepage.partnership.title}
					</h2>
					<div className='flex flex-col items-center'>
						{homepage.partnership.items.map((item, index) => (
							<p
								key={index}
								className='text-xl mb-4'>
								{item}
							</p>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-100'>
				<div className='max-w-3xl mx-auto text-center'>
					<h2 className='text-3xl font-bold text-silver-900 mb-4'>
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