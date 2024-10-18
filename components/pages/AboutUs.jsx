import React from 'react';
import Image from 'next/image';

const industries = [
	{ name: 'Transportation', image: '/images/transportation.jpg' },
	{ name: 'Medical', image: '/images/medical.jpg' },
	{ name: 'Security', image: '/images/security.jpg' },
	{ name: 'Commercial Equipment', image: '/images/commercial-equipment.jpg' },
	{ name: 'Communications', image: '/images/communications.jpg' },
];

const certifications = [
	{ name: 'CSA Group', logo: '/images/csa-group-logo.png' },
	{ name: 'TÜV Rheinland', logo: '/images/tuv-rheinland-logo.png' },
	{ name: 'UL', logo: '/images/ul-logo.png' },
];

const AboutUsPage = () => {
	const currentYear = new Date().getFullYear();
	const yearsOfExperience = currentYear - 1973;

	return (
		<div className=''>
			{/* Hero Section */}
			<section className=' py-20 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto text-center'>
					<h1 className='text-4xl font-bold mb-4'>
						About Lauria and Hill Technologies
					</h1>
					<p className='text-xl'>
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
								className='bg-amber-50 rounded-lg overflow-hidden shadow-md'>
								<div className='h-48 relative'>
									<Image
										src={industry.image}
										alt={industry.name}
										layout='fill'
										objectFit='cover'
									/>
								</div>
								<div className='p-4'>
									<h3 className='text-xl font-semibold text-amber-700'>
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
					<div className='flex justify-center items-center space-x-8'>
						{certifications.map((cert, index) => (
							<div
								key={index}
								className='w-24 h-24 relative'>
								<Image
									src={cert.logo}
									alt={cert.name}
									layout='fill'
									objectFit='contain'
								/>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Contact Information */}
			
		</div>
	);
};

export default AboutUsPage;
