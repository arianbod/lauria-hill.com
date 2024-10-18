// File: components/pages/ContactUs.jsx

import React from 'react';
import { MapPin, Phone, FileText } from 'lucide-react';

const contactPersons = [
	{
		name: 'Mario Scola',
		role: 'Sales/Engineering',
		email: 'mjscola@lauria-hill.com',
	},
	{
		name: 'Emilio Ciasca',
		role: 'Sales/Engineering',
		email: 'eciasca@lauria-hill.com',
	},
	{
		name: 'Gerry Ciasca',
		role: 'Production',
		email: 'gciasca@lauria-hill.com',
	},
];

const ContactUs = () => {
	return (
		<div className=''>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<h1 className='text-4xl font-bold mb-8 text-center'>Contact Us</h1>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					{/* Contact Information */}
					<div className='bg-white text-amber-700 rounded-lg shadow-md p-6'>
						<h2 className='text-2xl font-semibold  mb-6'>Get in Touch</h2>

						{/* Contact Persons */}
						<div className='mb-8'>
							<h3 className='text-lg font-semibold text-amber-600 mb-4'>
								Our Team
							</h3>
							{contactPersons.map((person, index) => (
								<div
									key={index}
									className='mb-4'>
									<p className='font-medium'>{person.name}</p>
									<p className='text-gray-600'>{person.role}</p>
									<a
										href={`mailto:${person.email}`}
										className='text-amber-600 hover:underline'>
										{person.email}
									</a>
								</div>
							))}
						</div>
						{/* Address and Contact Details */}
						<div className='text-black/75'>
							<div className='flex items-start mb-4'>
								<MapPin className='w-5 h-5 text-amber-600 mt-1 mr-2' />
								<div>
									<p>6 Mars Road</p>
									<p>Toronto, Ontario</p>
									<p>M9V 2K1</p>
									<p>Canada</p>
								</div>
							</div>
							<div className='flex items-center mb-2'>
								<Phone className='w-5 h-5 text-amber-600 mr-2' />
								<p>416-674-1490</p>
							</div>
							<div className='flex items-center mb-2'>
								<FileText className='w-5 h-5 text-amber-600 mr-2' />
								<p>Fax: 416-674-8539</p>
							</div>
							<div className='flex items-center'>
								<Phone className='w-5 h-5 text-amber-600 mr-2' />
								<p>Toll Free: 1-800-334-7824</p>
							</div>
						</div>
					</div>

					{/* Map */}
					<div className='bg-white rounded-lg shadow-md p-6'>
						<h2 className='text-2xl font-semibold text-amber-700 mb-6'>
							Our Location
						</h2>
						<div className='aspect-w-16 aspect-h-9'>
							<iframe
								src={`https://www.google.com/maps/embed/v1/place?q=43.74711,-79.60814&key=YOUR_GOOGLE_MAPS_API_KEY&zoom=14`}
								width='100%'
								height='450'
								style={{ border: 0 }}
								allowFullScreen=''
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
