'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import en from '@/lib/dictionary/en.json';

const { homepage } = en;
const TypewriterEffect = ({ sentences, className }) => {
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

	return <span className={` ${className}`}>{currentSentence}</span>;
};
const HomePage = () => {
	const typewriterSentences = [
		'Innovative Cable Solutions',
		'Precision Engineered Connections',
		'Reliable Wire Harness Manufacturing',
	];
	const experienceSentences = [
		'50+ Years of Industry Expertise',
		'Half a Century of Excellence',
		'Five Decades of Innovation',
		'Unrivaled 50-Year Track Record',
		'Pioneering Solutions Since 1973',
		'50 Years of Custom Cable Mastery',
		'Leading the Industry for 50+ Years',
	];
	return (
		<>
			{/* Hero Section */}
			<section className='relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-700 to-gray-700'>
				<div className='absolute inset-0 '>
					{/* Background image code remains the same */}
				</div>
				<div className='relative  text-center px-4 sm:px-6 lg:px-8 drop-shadow-lg'>
					<div className='mb-8 inline-block'>
						<div className='relative inline-flex items-center justify-center overflow-hidden rounded-3xl '>
							{/* <span className='text-4xl font-bold text-gray-100'>50+</span> */}
							<Image
								src='/images/logo6.png'
								width={400}
								height={400}
								alt='50+'
								className='w-80 h-80 drop-shadow-xl'
							/>
							{/* <span className='absolute bottom-4 text-sm font-medium text-gray-300'>
								{homepage.hero.yearsExperience}
							</span> */}
						</div>
					</div>
					<h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-amber-500 mb-2 drop-shadow-lg'>
						Lauria and Hill Technologies!
					</h1>
					<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 h-8'>
						<TypewriterEffect
							sentences={typewriterSentences}
							className='text-blue-300'
						/>
					</h2>
					<p className='text-xl sm:text-2xl md:text-3xl text-white mb-4'>
						{homepage.hero.subtitle}
					</p>
					<p className='text-lg text-white mb-8 max-w-3xl mx-auto'>
						{homepage.hero.description}
					</p>
					<Link
						href='/contact-us'
						className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-button-normal hover:bg-button-hover text-button-text  transition duration-150 ease-in-out select-none'>
						{homepage.hero.cta}
						<ArrowRight className='ml-2 -mr-1 h-5 w-5' />
					</Link>
				</div>
			</section>

			{/* Experience Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<div className='text-center mb-12'>
						<Image
							width={200}
							height={200}
							src='/images/50+.png'
							alt='50+'
							className='mx-auto drop-shadow-2xl rounded-full mb-4'
						/>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 h-8'>
							<TypewriterEffect
								sentences={experienceSentences}
								className='text-amber-500'
							/>
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
			<section className='py-16 px-4 sm:px-6 lg:px-8 border-t-2 mx-4 flex flex-col items-center'>
				<div className='mx-auto'>
					<h2 className='text-3xl font-bold mb-8 text-center'>
						{homepage.whyChooseUs.title}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-start w-full max-w-6xl'>
						{homepage.whyChooseUs.items.map((item, index) => (
							<div
								key={index}
								className='flex items-start'>
								<CheckCircle className='flex-shrink-0 h-6 w-6 mt-1' />
								<p className='ml-3 text-lg'>{item}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Industries Section */}
			<section className='py-24 px-4 sm:px-6 lg:px-8 '>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-4xl font-bold mb-12 text-center animate-fade-in-down'>
						{homepage.industries.title}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-center'>
						{homepage.industries.items.map((industry, index) => (
							<div
								key={index}
								className='bg-white pb-6 rounded-xl overflow-hidden shadow-md flex flex-col items-center text-center'>
								<div className='text-4xl mb-4'>
									<img
										unoptimized
										src={industry.src}
										width={400}
										height={400}
										alt={industry.name}
										quality={50}
										style={{ objectFit: 'cover' }}
										className='rounded-b-full rounded-t-2xl w-full -translate-y-10 hover:translate-y-0 transition-all duration-500 hover:scale-105'
									/>
									{/* {industry.icon} */}
								</div>
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
			<section className='py-16 px-4 sm:px-6 lg:px-8 border-b-2 mx-4 flex flex-col items-center'>
				<div className='mx-auto'>
					<h2 className='text-3xl font-bold mb-8 text-center'>
						{homepage.benefits.title}
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-start w-full max-w-4xl'>
						{homepage.benefits.items.map((benefit, index) => (
							<div
								key={index}
								className='flex items-start'>
								<CheckCircle className='flex-shrink-0 h-6 w-6 mt-1' />
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
							className='inline-flex select-none items-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-button-normal hover:bg-button-hover text-button-text transition duration-150 ease-in-out'>
							{homepage.cta.buttons.contact}
						</Link>
						<Link
							href='/products'
							className='inline-flex select-none items-center px-6 py-3 border border-button-normal text-base font-medium rounded-md text-button-normal bg-white hover:bg-button-text transition duration-150 ease-in-out'>
							{homepage.cta.buttons.explore}
						</Link>
					</div>
				</div>
			</section>
		</>
	);
};

export default HomePage;
