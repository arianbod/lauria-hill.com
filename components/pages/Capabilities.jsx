import React from 'react';
import Image from 'next/image';

const capabilities = [
	{ name: 'Engineering Support', image: '/images/engineering-support.jpg' },
	{ name: 'Panel Builds', image: '/images/panel-builds.jpg' },
	{
		name: 'Automated Wire Cutting/Stripping/Terminating',
		image: '/images/automated-wire-processing.jpg',
	},
	{ name: 'Soldering', image: '/images/soldering.jpg' },
	{ name: 'Wire Stripping/Twisting', image: '/images/wire-stripping.jpg' },
];

const CapabilitiesPage = () => {
	return (
		<div className='min-h-screen bg-gradient-to-b from-amber-50 to-amber-100'>
			{/* Hero Section */}
			<section className='bg-amber-600 text-white py-20 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto text-center'>
					<h1 className='text-4xl font-bold mb-4'>Our Capabilities</h1>
					<p className='text-xl'>
						Innovative solutions for all your wire and cable harness needs
					</p>
				</div>
			</section>

			{/* Main Content */}
			<section className='py-16 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-7xl mx-auto'>
					<div className='bg-white rounded-lg shadow-lg p-8 mb-12'>
						<p className='text-lg text-gray-700 mb-6'>
							Engineering support, Panel builds, Automated Wire
							Cutting/Stripping/Terminating, Soldering and Wire
							Stripping/Twisting are only some of the services we have to offer.
							Today our manufacturing is produced in a 20,000 square foot
							building that can facilitate all your needs including a stocking
							program.
						</p>
						<div className='bg-amber-100 border-l-4 border-amber-500 p-4'>
							<p className='text-amber-700 font-semibold'>
								Our 20,000 square foot facility is equipped to handle all your
								manufacturing needs, including custom stocking programs.
							</p>
						</div>
					</div>

					<h2 className='text-3xl font-bold text-amber-800 mb-8 text-center'>
						Our Specialized Services
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{capabilities.map((capability, index) => (
							<div
								key={index}
								className='bg-white rounded-lg overflow-hidden shadow-md'>
								<div className='h-48 relative'>
									<Image
										src={capability.image}
										alt={capability.name}
										layout='fill'
										objectFit='cover'
									/>
								</div>
								<div className='p-4'>
									<h3 className='text-xl font-semibold text-amber-700'>
										{capability.name}
									</h3>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='bg-amber-600 text-white py-16 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-3xl mx-auto text-center'>
					<h2 className='text-3xl font-bold mb-4'>
						Ready to Leverage Our Capabilities?
					</h2>
					<p className='text-xl mb-8'>
						Let's discuss how our expertise can meet your specific wire and
						cable harness needs.
					</p>
					<a
						href='/contact-us'
						className='inline-block px-6 py-3 border border-white text-lg font-medium rounded-md hover:bg-white hover:text-amber-600 transition duration-150 ease-in-out'>
						Contact Us Today
					</a>
				</div>
			</section>
		</div>
	);
};

export default CapabilitiesPage;
