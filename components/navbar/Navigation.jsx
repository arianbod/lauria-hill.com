'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Users, Phone, ShoppingBag } from 'lucide-react';
import dic from '@/lib/dictionary/en.json';

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
		switch (iconName) {
			case 'Home':
				return <Home size={20} />;
			case 'Users':
				return <Users size={20} />;
			case 'Phone':
				return <Phone size={20} />;
			case 'ShoppingBag':
				return <ShoppingBag size={20} />;
			default:
				return null;
		}
	};

	return (
		<nav className='font-sans'>
			{/* Desktop Navigation */}
			<div className='hidden lg:flex lg:flex-row justify-between items-center w-full fixed top-0 left-0 h-20 bg-gradient-to-r from-amber-400 to-amber-600   shadow-lg z-50'>
				<div className='flex items-center'>
					<div className='w-80 h-full flex items-center justify-center border-r border-amber-300 pr-4  text-amber-600/75'>
						<div className='relative mr-4'>
							<div className='absolute inset-0 bg-white rounded-full opacity-20 animate-pulse'></div>
							<div className='relative flex flex-col items-center justify-center w-16 h-16 border-4 border-white rounded-full'>
								<span className='text-3xl font-extrabold leading-none'>50</span>
								<span className='text-xl font-bold leading-none'>+</span>
							</div>
						</div>
						<div className='flex flex-col'>
							<span className='text-xs uppercase tracking-wider text-amber-700/40 font-bold '>
								Years of Excellence
							</span>
							<span className='text-2xl font-bold tracking-tight'>
								Lauria and Hill
							</span>
						</div>
					</div>
					<div className='flex space-x-8 ml-8'>
						{dic.menuitems.map((item) => (
							<Link
								key={item.title}
								href={item.url}
								className='flex items-center space-x-2 hover:text-amber-200 transition-colors duration-200 capitalize font-semibold'>
								{getIcon(item.icon)}
								<span>{item.title}</span>
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* Mobile Navigation (unchanged) */}
			{isMobile && (
				<>
					<button
						onClick={toggleMenu}
						className={`lg:hidden fixed top-4 left-4 z-50 p-2 bg-amber-500 rounded-full shadow-lg text-white transition-all ${
							isMenuOpen && 'translate-x-64'
						}`}>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
					{isMenuOpen && (
						<div
							className='h-screen bg-black/25 w-full fixed top-0 left-0'
							onClick={() => setIsMenuOpen(false)}></div>
					)}
					<div
						className={`lg:hidden fixed inset-y-0 left-0 transform ${
							isMenuOpen ? 'translate-x-0' : '-translate-x-full'
						} transition-transform duration-300 ease-in-out w-72 bg-gradient-to-b from-amber-400 to-amber-600 overflow-y-auto z-40`}>
						<div className='p-6'>
							<div className='w-80 h-full flex place-items-center border-r border-amber-300 pr-4  text-amber-600/75'>
								<div className='relative mr-4'>
									<div className='absolute inset-0 bg-white rounded-full opacity-20 animate-pulse'></div>
									<div className='relative flex flex-col items-center justify-center w-16 h-16 border-4 border-white rounded-full  text-amber-600/75'>
										<span className='text-3xl font-extrabold leading-none '>
											50
										</span>
										<span className='text-xl font-bold leading-none'>+</span>
									</div>
								</div>
								<div className='flex flex-col '>
									<span className='text-xs uppercase tracking-wider  text-amber-700/40 font-bold'>
										Years of Excellence
									</span>
									<span className='text-2xl font-bold tracking-tight'>
										Lauria and Hill
									</span>
								</div>
							</div>
							<ul className='space-y-4'>
								{dic.menuitems.map((item) => (
									<li key={item.title}>
										<Link
											href={item.url}
											className='flex items-center space-x-4 text-white hover:text-amber-200 transition-colors duration-200  capitalize font-semibold'>
											{getIcon(item.icon)}
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
