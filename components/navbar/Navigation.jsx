'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Phone, ShoppingBag, Info, Cog } from 'lucide-react';
import dic from '@/lib/dictionary/en.json';
import Image from 'next/image';

const Navigation = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const getIcon = (iconName) => {
		switch (iconName.toLowerCase()) {
			case 'home':
				return <Home size={20} />;
			case 'about us':
				return <Info size={20} />;
			case 'contact us':
				return <Phone size={20} />;
			case 'products':
				return <ShoppingBag size={20} />;
			case 'capabilities':
				return <Cog size={20} />;
			default:
				return null;
		}
	};

	return (
		<nav className='font-sans'>
			{/* Desktop Navigation */}
			<div className='hidden lg:flex lg:flex-row justify-between items-center w-full fixed top-0 left-0 h-20 bg-gradient-to-r from-button-normal to-black/75 backdrop-blur-sm text-gray-100 shadow-lg z-50'>
				<div className='flex items-center'>
					<div className='w-80 h-full flex gap-4 items-center justify-center border-r border-button-700 pr-4'>
						<Image
							src='/images/logo4.png'
							width={200}
							height={200}
							alt='logo'
							className='w-16 h-16 rounded-full'
						/>
						<div className='flex flex-col'>
							<span className='text-2xl font-bold tracking-tight text-gray-100'>
								Lauria and Hill
							</span>
							<span className='text-xs uppercase tracking-wider text-gray-300'>
								Technologies
							</span>
						</div>
					</div>
					<div className='flex space-x-8 ml-8 xl:gap-8 lg:gap-4'>
						{dic.menuitems.map((item) => (
							<Link
								key={item.title}
								href={item.url}
								className={`flex items-center space-x-2 hover:text-gray-400 transition-all hover:translate-y-1 duration-200 capitalize font-semibold ${
									item.url === '/contact-us' &&
									'bg-amber-500 hover:text-amber-200 px-4 py-2 rounded-full drop-shadow-xl text-slate-800 xl:absolute right-5 top-5 animate-pulse'
								}`}>
								{getIcon(item.title)}
								<span>{item.title}</span>
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isMobile && (
				<>
					<button
						onClick={toggleMenu}
						className={`lg:hidden fixed top-4 left-4 z-50 p-2  bg-gradient-to-b from-slate-700  rounded-full shadow-lg backdrop-blur-lg text-gray-100 transition-all ${
							isMenuOpen && 'translate-x-64'
						}`}>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
					{isMenuOpen && (
						<div
							className='h-screen bg-black/50 blur-sm w-full fixed top-0 left-0 z-10 backdrop-blur-sm select-none'
							onClick={() => setIsMenuOpen(false)}></div>
					)}
					<div
						className={`lg:hidden fixed inset-y-0 left-0 transform z-20 backdrop-blur-xl ${
							isMenuOpen ? 'translate-x-0' : '-translate-x-full'
						} transition-transform duration-300 ease-in-out w-72 bg-gradient-to-b from-slate-700/80 to-black overflow-y-auto `}>
						<div className='p-6'>
							<div className='mb-8 text-center'>
								<div className='flex items-center justify-center'>
									<div className='relative mr-2'>
										<div className='flex flex-col items-center justify-center w-12 h-12 border-2 border-gray-300 rounded-full select-none'>
											<Image
												src='/images/50+.png'
												width={200}
												height={200}
												alt='logo'
												className='w-16 h-16 rounded-full'
											/>
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='text-xl font-bold text-gray-100 select-none'>
											Lauria and Hill
										</span>
										<span className='text-left text-md font-semibold text-gray-400 select-none'>
											Technologies
										</span>
									</div>
								</div>
							</div>
							<ul className='space-y-4 flex flex-col gap-8'>
								{dic.menuitems.map((item) => (
									<li key={item.title}>
										<Link
											onClick={toggleMenu}
											href={item.url}
											className='flex items-center space-x-2 text-gray-100 hover:text-gray-400 hover:translate-x-1 transition-all duration-200 capitalize font-semibold select-none'>
											{getIcon(item.title)}
											<span>{item.title}</span>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</>
			)}
		</nav>
	);
};

export default Navigation;
