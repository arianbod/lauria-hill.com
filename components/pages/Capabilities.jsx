import React from 'react';
import Image from 'next/image';

const capabilities = [
	{
		name: 'Engineering Support',
		image: '/images/services/engineer-support.jpg',
	},
	{ name: 'Panel Builds', image: '/images/services/panel-build.jpeg' },
	{
		name: 'Automated Wire Cutting/Stripping/Terminating',
		image: '/images/services/wire-cutting.webp',
	},
	{ name: 'Soldering', image: '/images/services/soldering.webp' },
	{ name: 'Wire Stripping/Twisting', image: '/images/services/wire-2.webp' },
];

const CapabilitiesPage = () => {
	return (
		<>
			{/* Hero Section */}
			<section className='px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto text-center'>
					<h1 className='text-4xl font-bold mb-4'>Specialized Services</h1>
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
						<div className='bg-silver-100 border-l-4 border-slate-500 p-4'>
							<p className='text-slate-700 font-semibold text-center'>
								Our 20,000 square foot facility is equipped to handle all your
								manufacturing needs, including custom stocking programs.
							</p>
							<Image
								width={800}
								height={400}
								src='/images/env.png'
								className='rounded-xl mx-auto my-4 drop-shadow-lg w-fit'
								alt='environment'
							/>
						</div>
					</div>

					<h2 className='text-3xl font-bold mb-8 text-center'>
						Our Specialized Services
					</h2>
					<div className='flex justify-center'>
						<div className='flex flex-wrap justify-center gap-8 max-w-6xl'>
							{capabilities.map((capability, index) => (
								<div
									key={index}
									className='flex-shrink-0 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] max-w-sm'>
									<div className='bg-white rounded-lg overflow-hidden shadow-md h-full'>
										<div className='h-48 relative'>
											<Image
												src={capability.image}
												alt={capability.name}
												layout='fill'
												objectFit='cover'
											/>
										</div>
										<div className='p-4'>
											<h3 className='text-xl font-semibold text-slate-700 text-center'>
												{capability.name}
											</h3>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='bg-white text-slate-900 py-16 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-3xl mx-auto text-center'>
					<h2 className='text-3xl font-bold mb-4'>
						Ready to Leverage Our Capabilities?
					</h2>
					<p className='text-xl mb-8'>
						Let&rsquo;s discuss how our expertise can meet your specific wire
						and cable harness needs.
					</p>
					<a
						href='/contact-us'
						className='inline-block px-6 py-3 border border-white bg-slate-800 text-white text-lg font-medium rounded-md hover:bg-slate-800/25 hover:text-slate-800 transition duration-150 ease-in-out'>
						Contact Us Today
					</a>
				</div>
			</section>
		</>
	);
};

export default CapabilitiesPage;
