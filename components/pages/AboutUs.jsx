import React from 'react';
import Image from 'next/image';

const industries = [
	{ name: 'Transportation', image: '/images/services/transportation.jpeg' },
	{ name: 'Medical', image: '/images/services/medical.jpeg' },
	{ name: 'Security', image: '/images/services/security.jpeg' },
	{
		name: 'Commercial Equipment',
		image: '/images/services/commercial-equipment.jpeg',
	},
	{ name: 'Communications', image: '/images/services/communications.jpeg' },
];

const certifications = [
	{ name: 'CSA Group', logo: '/images/certificates/csa-group-logo.png' },
	{
		name: 'TÜV Rheinland',
		logo: '/images/certificates/tuv-rheinland-logo.png',
	},
	{ name: 'UL', logo: '/images/certificates/ul-logo.png' },
	{ name: 'certech', logo: '/images/certificates/certech.png' },
];

const AboutUsPage = () => {
	const currentYear = new Date().getFullYear();
	const yearsOfExperience = currentYear - 1973;

	return (
		<div className=''>
			{/* Hero Section */}
			<section className=' py-20 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto text-center flex flex-col gap-2'>
					<Image
						width={200}
						height={200}
						src='/images/50+.png'
						alt='50+'
						className='mx-auto drop-shadow-2xl rounded-full'
					/>
					<h1 className='text-4xl font-bold mb-4 border-t-2 border-t-amber-500 pt-4 mt-4 w-fit text-center mx-auto px-4 rounded-full'>
						About Lauria and Hill Technologies
					</h1>
					<p className='text-xl '>
						Proudly serving the electrical and electronic industries for over{' '}
						{yearsOfExperience} years
					</p>
				</div>
			</section>

			{/* Company History */}
			<section className='py-16 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-3xl mx-auto'>
					<h2 className='text-3xl font-bold  mb-6'>Our History</h2>
					<p className='text-lg  mb-4'>
						Founded in 1973, Lauria and Hill Technologies has been a leader in
						manufacturing electrical wire harnesses and cable assemblies for{' '}
						{yearsOfExperience} years.
					</p>
					<p className='text-lg  mb-4'>
						We are proud of our long-standing commitment to quality and
						innovation in the electrical and electronic fields. Our experienced
						staff brings a wide range of expertise to assist you with your
						specific needs.
					</p>
					<p className='text-lg '>
						Located within 5km of Toronto International Airport, we are
						well-positioned to serve clients across North America and beyond.
					</p>
				</div>
			</section>

			{/* Industries Served */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 '>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-3xl font-bold  mb-8 text-center'>
						Industries We Serve
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{industries.map((industry, index) => (
							<div
								key={index}
								className='bg-silver-50 rounded-lg overflow-hidden shadow-md'>
								<div className='h-48 relative'>
									<Image
										src={industry.image}
										alt={industry.name}
										layout='fill'
										objectFit='cover'
									/>
								</div>
								<div className='p-4'>
									<h3 className='text-xl font-semibold text-slate-700'>
										{industry.name}
									</h3>
								</div>
							</div>
						))}
					</div>
					<p className='text-center text-lg  mt-8 text-slate-400'>
						And many more...
					</p>
				</div>
			</section>

			{/* Certifications */}
			<section className='py-16 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-3xl mx-auto'>
					<h2 className='text-3xl font-bold  mb-8 text-center'>
						Our Certifications
					</h2>
					<div className='flex justify-center items-center space-x-8 bg-white rounded-full py-2'>
						{certifications.map((cert, index) => (
							<Image
								key={index}
								src={cert.logo}
								alt={cert.name}
								// layout='fill'
								objectFit='contain'
								className=' h-fit  max-h-24 w-fit'
								width={100}
								height={100}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Contact Information */}
		</div>
	);
};

export default AboutUsPage;
