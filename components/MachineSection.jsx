import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const MachineShowcase = () => {
	const machines = [
		// {
		// 	name: 'Advanced Crimping Station',
		// 	type: 'Wire Processing',
		// 	image: '/images/devices/delta540.webp',
		// 	description:
		// 		'State-of-the-art benchtop crimping station equipped with comprehensive connector processing capabilities for precise assembly work.',
		// 	features: [
		// 		'Wide connector compatibility',
		// 		'Precision force monitoring',
		// 		'Advanced safety features',
		// 	],
		// },
		{
			name: 'Precision Processing Platform',
			type: 'Multi-Processing',
			image: '/images/devices/bt-sc.webp',
			description:
				'Professional-grade platform combining stripping and crimping functions in one efficient setup for premium wire processing needs.',
			features: [
				'Dual-function processing',
				'High-precision control',
				'Versatile wire handling',
			],
		},
		{
			name: 'High-Speed Production Unit',
			type: 'Production',
			image: '/images/devices/sc501.webp',
			description:
				'Advanced multi-wire processing station featuring intuitive controls and rapid operation capabilities for efficient production.',
			features: [
				'Rapid cycle times',
				'Multi-wire capability',
				'Quality-assured output',
			],
		},
	];

	return (
		<section className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800'>
			<div className='max-w-7xl mx-auto'>
				<h2 className='text-3xl font-bold text-white mb-8 text-center'>
					Our Advanced Manufacturing Equipment
				</h2>
				<p className='text-gray-300 text-center mb-12 text-lg'>
					Equipped with cutting-edge machinery for precise and reliable wire
					processing solutions
				</p>

				{machines.map((machine, index) => (
					<div
						key={index}
						className={`flex flex-col lg:flex-row items-stretch mb-12 bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 ${
							index % 2 === 0 ? '' : 'lg:flex-row-reverse'
						}`}>
						{/* Image Section */}
						<div className='lg:w-1/2 relative'>
							<div className='relative h-64 lg:h-full'>
								<Image
									src={machine.image}
									alt={machine.name}
									layout='fill'
									objectFit='cover'
									className='transition-transform duration-300 hover:scale-105'
								/>
							</div>
						</div>

						{/* Content Section */}
						<div className='lg:w-1/2 p-8 flex flex-col justify-center'>
							<div className='flex items-center justify-between mb-4'>
								<span className='text-blue-400 text-sm font-semibold'>
									{machine.type}
								</span>
								<ArrowRight className='h-5 w-5 text-blue-400' />
							</div>
							<h3 className='text-2xl font-bold text-white mb-4'>
								{machine.name}
							</h3>
							<p className='text-gray-400 mb-6'>{machine.description}</p>
							<div className='space-y-3'>
								{machine.features.map((feature, fIndex) => (
									<div
										key={fIndex}
										className='flex items-center text-gray-300'>
										<span className='w-2 h-2 bg-blue-400 rounded-full mr-2'></span>
										<span className='text-sm'>{feature}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				))}

				<div className='text-center mt-8'>
					<p className='text-gray-400 text-lg'>
						Our equipment is maintained to the highest standards, ensuring
						optimal performance and consistent quality
					</p>
				</div>
			</div>
		</section>
	);
};

export default MachineShowcase;
