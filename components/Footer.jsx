'use client';

import Link from 'next/link';
import {
	Phone,
	Mail,
	MapPin,
	Facebook,
	Twitter,
	Linkedin,
	Globe,
	FileText,
} from 'lucide-react';

const menuItems = [
	{ title: 'Home', url: '/', icon: '' },
	{ title: 'products', url: '/products', icon: '' },
	{ title: 'specialized services', url: '/specialized-services', icon: '' },
	{ title: 'about us', url: '/about-us', icon: '' },
	{ title: 'contact us', url: '/contact-us', icon: '' },
];

const contactPersons = [
	{
		name: 'Emilio Ciasca',
		role: 'Sales/Engineering',
		email: 'eciasca@lauria-hill.com',
	},
	{
		name: 'Mario Scola',
		role: 'Sales/Engineering',
		email: 'mjscola@lauria-hill.com',
	},
	{
		name: 'Marco Ciasca',
		role: 'Purchasing Manager',
		email: 'mciasca@lauria-hill.com',
	},
];

const socialLinks = [
	{ icon: Facebook, href: '#', label: 'Facebook' },
	{ icon: Twitter, href: '#', label: 'Twitter' },
	{ icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='text-white border-t border-gray-600'>
			<div className='max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-12'>
					{/* Company Info */}
					<div className='space-y-4'>
						<h3 className='text-xl font-bold mb-4'>Lauria and Hill</h3>
						<p className='text-gray-300'>
							Transform Your Connectivity with Expert Cable Solutions and
							Superior Service
						</p>
						<div className='flex space-x-4'>
							{socialLinks.map(({ icon: Icon, href, label }) => (
								<Link
									key={label}
									href={href}
									className='hover:text-blue-400 transition-colors'
									aria-label={label}>
									<Icon className='w-5 h-5' />
								</Link>
							))}
						</div>
					</div>

					{/* Contact Info */}
					<div className='space-y-4'>
						<h3 className='text-xl font-bold mb-4'>Contact Us</h3>
						<div className='space-y-3'>
							<div className='flex items-center space-x-3'>
								<MapPin className='w-5 h-5 text-gray-400' />
								<div className='flex flex-col'>
									<span>6 Mars Road</span>
									<span>Toronto, Ontario</span>
									<span>M9V 2K1</span>
									<span>Canada</span>
								</div>
							</div>
							<div className='flex items-center space-x-3'>
								<Phone className='w-5 h-5 text-gray-400' />
								<div className='flex flex-col'>
									<Link
										href='tel:416-674-1490'
										className='hover:text-blue-400 transition-colors'>
										416-674-1490 Main
									</Link>
									<Link
										href='tel:1-800-334-7824'
										className='hover:text-blue-400 transition-colors'>
										1-800-334-7824 Toll Free
									</Link>
								</div>
							</div>
							<div className='flex items-center space-x-3'>
								<FileText className='w-5 h-5 text-gray-400' />
								<span>Fax: 416-674-8539</span>
							</div>
						</div>
					</div>

					{/* Quick Links & Team */}
					<div className='space-y-6'>
						<div>
							<h3 className='text-xl font-bold mb-4'>Quick Links</h3>
							<div className='grid grid-cols-1 gap-2'>
								{menuItems.map(({ url, title }) => (
									<Link
										key={url}
										href={url}
										className='hover:text-blue-400 transition-colors flex items-center space-x-2 capitalize'>
										<Globe className='w-4 h-4' />
										<span>{title}</span>
									</Link>
								))}
							</div>
						</div>

						{/* <div>
							<h3 className='text-xl font-bold mb-4'>Our Team</h3>
							<div className='space-y-3'>
								{contactPersons.map((person) => (
									<div
										key={person.email}
										className='flex flex-col'>
										<span className='font-medium'>{person.name}</span>
										<span className='text-sm text-gray-400'>{person.role}</span>
										<Link
											href={`mailto:${person.email}`}
											className='text-sm hover:text-blue-400 transition-colors'>
											{person.email}
										</Link>
									</div>
								))}
							</div>
						</div> */}
					</div>
				</div>

				{/* Bottom Bar */}
				<div className='border-t border-gray-600 px-6 py-4'>
					<div className='flex flex-col md:flex-row justify-between items-center text-sm text-gray-400'>
						<p>&copy; {currentYear} Lauria and Hill. All rights reserved.</p>
						<div className='flex space-x-6 mt-4 md:mt-0'>
							{/* <Link
								href='/privacy'
								className='hover:text-white transition-colors'>
								Privacy Policy
							</Link>
							<Link
								href='/terms'
								className='hover:text-white transition-colors'>
								Terms of Service
							</Link> */}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
