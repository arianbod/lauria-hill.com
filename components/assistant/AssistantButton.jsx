/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAssistant } from '@/context/AssistantContext';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';

const ASSISTANT_MESSAGES = [
	'👋 I can answer all of your question!',
	// '🌟 Check out our amazing deals!',
	// '💡 I can help you compare products',
	// '🎁 Want to see our newest arrivals?',
	// '💬 Ask me anything about our products!',
	// '🔍 Looking for something specific?',
	// '⭐ I can find the perfect match for you',
	// '📦 Free shipping on orders over $50!',
	// '🏷️ Exclusive deals just for you',
	// '💫 Let me help you find the best options',
];

const AnimatedAssistantButton = () => {
	const { toggleAssistant } = useAssistant();
	const [isButtonVisible, setIsButtonVisible] = useState(true);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [currentMessage, setCurrentMessage] = useState('');
	const [position, setPosition] = useState({
		x: 0,
		y: isMobile ? -100 : 0, // Move up by 100px on mobile
	});
	const [isTooltipVisible, setIsTooltipVisible] = useState(false);

	// Screen size check and position adjustment
	useEffect(() => {
		const checkScreenSize = () => {
			const isMobileView = window.innerWidth < 640;
			setIsMobile(isMobileView);
			// Update position when screen size changes
			setPosition((prev) => ({
				x: prev.x,
				y: isMobileView ? -100 : prev.y,
			}));
		};
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	// Message rotation (only for desktop)
	// useEffect(() => {
	// 	if (isMobile) return;

	// 	let messageTimeout;
	// 	const rotateMessage = () => {
	// 		const newMessage =
	// 			ASSISTANT_MESSAGES[
	// 				Math.floor(Math.random() * ASSISTANT_MESSAGES.length)
	// 			];
	// 		setTimeout(() => {
	// 			setCurrentMessage(newMessage);
	// 		}, 500);
	// 		messageTimeout = setTimeout(rotateMessage, 8000);
	// 	};

	// 	rotateMessage();
	// 	return () => clearTimeout(messageTimeout);
	// }, [isMobile]);

	if (!isButtonVisible) return null;

	return (
		<>
			<motion.div
				className='fixed bottom-6 right-6 z-50 text-slate-800 font-bold'
				drag
				dragMomentum={false}
				dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
				dragElastic={0.1}
				whileDrag={{ scale: 1.05 }}
				animate={position}
				onDragEnd={(event, info) => {
					const newPosition = {
						x: position.x + info.offset.x,
						y: position.y + info.offset.y,
					};
					setPosition(newPosition);
				}}>
				<AnimatePresence>
					{/* Desktop message bubble */}
					{currentMessage && (
						<motion.div
							onClick={toggleAssistant}
							initial={{ opacity: 0, y: 10, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 10, scale: 0.9 }}
							className='absolute -top-16 right-0 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg text-sm whitespace-nowrap max-w-sm'
							style={{
								boxShadow: '0 4px 24px rgba(107, 122, 255, 0.15)',
								border: '1px solid rgba(107, 122, 255, 0.1)',
							}}>
							<div className='relative'>
								{currentMessage}
								<div
									className='absolute -bottom-4 right-6 w-4 h-4 bg-white transform rotate-45'
									style={{
										borderRight: '1px solid rgba(107, 122, 255, 0.1)',
										borderBottom: '1px solid rgba(107, 122, 255, 0.1)',
									}}
								/>
							</div>
						</motion.div>
					)}

					{/* Enhanced tooltip for both mobile and desktop */}
					<AnimatePresence>
						{isTooltipVisible && (
							<motion.div
								initial={{ opacity: 0, y: 10, scale: 0.9 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: 10, scale: 0.9 }}
								transition={{ duration: 0.2 }}
								className={`absolute ${
									isMobile ? '-top-16' : '-top-12'
								} right-0 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap`}
								style={{
									boxShadow: '0 4px 24px rgba(107, 122, 255, 0.15)',
									border: '1px solid rgba(107, 122, 255, 0.1)',
									zIndex: 60,
								}}>
								<div className='relative flex items-center gap-2'>
									<span className='font-medium'>Baba AI Assistant</span>
									<span className='flex items-center gap-1'>
										<span className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></span>
										<span className='text-xs text-emerald-600'>Online</span>
									</span>
									<div
										className='absolute -bottom-2 right-6 w-2 h-2 bg-white transform rotate-45'
										style={{
											borderRight: '1px solid rgba(107, 122, 255, 0.1)',
											borderBottom: '1px solid rgba(107, 122, 255, 0.1)',
										}}
									/>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</AnimatePresence>

				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					className='relative'
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}>
					{/* Close button */}
					<button
						onClick={() => setIsDialogOpen(true)}
						className='absolute -top-2 -right-2 p-1.5 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors z-30'
						aria-label='Hide Assistant Button'>
						<X className='w-3 h-3 text-gray-500' />
					</button>

					{/* Main button */}
					<button
						onClick={toggleAssistant}
						onMouseEnter={() => setIsTooltipVisible(true)}
						onMouseLeave={() => setIsTooltipVisible(false)}
						onTouchStart={() => setIsTooltipVisible(true)}
						onTouchEnd={() => setIsTooltipVisible(true)}
						className={`group relative flex items-center gap-3 ${
							isMobile ? 'p-0 rounded-full' : 'p-4 rounded-2xl'
						} bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl border border-[rgba(107,122,255,0.1)] transition-all duration-300`}
						style={{ boxShadow: '0 4px 24px rgba(107, 122, 255, 0.15)' }}>
						<div className={`relative ${isMobile ? 'w-12 h-12' : 'w-10 h-10'}`}>
							<Image
								alt='Assistant Avatar'
								src='/images/babagpt_bw.svg'
								width={48}
								height={48}
								className='select-none relative z-10 object-contain w-full h-full p-2 bg-slate-700 rounded-full'
								priority
							/>
							{/* Online indicator */}
							<div className='absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white z-20' />
						</div>

						{/* Desktop additional info */}
						{!isMobile && (
							<div className='flex flex-col items-start'>
								<span className='text-[15px] font-medium text-gray-800'>
									AI Assistant
								</span>
								<div className='flex items-center gap-2'>
									<span className='text-sm font-medium text-emerald-500'>
										Online
									</span>
									<span className='text-sm text-gray-400 font-medium'>
										• Ready to help
									</span>
								</div>
							</div>
						)}
					</button>
				</motion.div>
			</motion.div>

			<AlertDialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Hide Assistant Button?</AlertDialogTitle>
						<AlertDialogDescription>
							Choose how long you want to hide the assistant button.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className='flex flex-col sm:flex-row gap-2'>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => {
								setIsButtonVisible(false);
								setIsDialogOpen(false);
							}}>
							Hide for now
						</AlertDialogAction>
						<AlertDialogAction
							onClick={() => {
								setIsButtonVisible(false);
								localStorage.setItem('assistantButtonHidden', 'true');
								setIsDialogOpen(false);
							}}
							className='bg-red-600 text-white hover:bg-red-700'>
							Hide forever
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default AnimatedAssistantButton;
