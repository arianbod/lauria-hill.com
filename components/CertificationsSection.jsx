import React from 'react';
import Image from 'next/image';

const CertificationsSection = () => {
	const certifications = [
		{ name: 'certech', logo: '/images/certificates/iso9001.png' },
		{ name: 'UL', logo: '/images/certificates/ul-logo.png' },
		{ name: 'certech', logo: '/images/certificates/certech.png' },
		{ name: 'CSA Group', logo: '/images/certificates/csa-group-logo.png' },
		{
			name: 'TÜV Rheinland',
			logo: '/images/certificates/tuv-rheinland-logo.png',
		},
	];

	return (
		<section className='py-16 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-3xl mx-auto'>
				<h2 className='text-3xl font-bold mb-8 text-center'>
					Our Certifications
				</h2>
				<div className='flex flex-wrap justify-center items-center gap-6 bg-white rounded-2xl py-4 px-4'>
					{certifications.map((cert, index) => (
						<div
							key={index}
							className='flex items-center justify-center w-24 sm:w-32'>
							<Image
								src={cert.logo}
								alt={cert.name}
								objectFit='contain'
								className='h-fit max-h-20 w-auto'
								width={100}
								height={100}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default CertificationsSection;
