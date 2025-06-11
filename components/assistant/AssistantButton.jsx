// File: @/components/ui/AnimatedAssistantButton.tsx
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MessageCircle } from 'lucide-react';
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

const FIRST_TIME_MESSAGES = [
	'👋 I can answer all of your questions!',
	'💡 Ask me anything about our products',
	'🔍 Looking for something specific?',
	'⭐ I can find the perfect match for you',
	'💬 Try me! I can help you find products',
];

const RETURNING_MESSAGES = [
	'💬 Need help with anything?',
	'🔍 Looking for something specific?',
	'⭐ I can find the perfect match for you',
	'💫 Let me help you find the best options',
];

const AnimatedAssistantButton = () => {
	const { toggleAssistant } = useAssistant();
	const [isButtonVisible, setIsButtonVisible] = useState(true);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [currentMessage, setCurrentMessage] = useState('');
	const [showPersistentBadge, setShowPersistentBadge] = useState(false);
	const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);
	const [hasInteracted, setHasInteracted] = useState(false);
	const [position, setPosition] = useState({
		x: 0,
		y: 0,
	});
	const [isTooltipVisible, setIsTooltipVisible] = useState(false);

	// Initialize user interaction tracking
	useEffect(() => {
		const hasUsedBefore = localStorage.getItem('aiAgentUsed');
		const hasInteractedBefore = localStorage.getItem('aiAgentInteracted');
		const isButtonHidden = localStorage.getItem('assistantButtonHidden');

		setIsFirstTimeUser(!hasUsedBefore);
		setHasInteracted(!!hasInteractedBefore);

		// Show button unless explicitly hidden forever
		if (isButtonHidden === 'true') {
			setIsButtonVisible(false);
		} else {
			setIsButtonVisible(true);
		}

		// Show large badge only for first-time users who haven't interacted
		if (!hasUsedBefore && !hasInteractedBefore) {
			setShowPersistentBadge(true);
		}
	}, []);

	// Screen size check and position adjustment
	useEffect(() => {
		const checkScreenSize = () => {
			const isMobileView = window.innerWidth < 640;
			setIsMobile(isMobileView);
			// Adjust position for mobile
			setPosition((prev) => ({
				x: prev.x,
				y: isMobileView ? -100 : prev.y,
			}));
		};
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	// Message rotation for persistent badge
	useEffect(() => {
		if (!showPersistentBadge) return;

		const messages = isFirstTimeUser ? FIRST_TIME_MESSAGES : RETURNING_MESSAGES;
		let messageIndex = 0;

		// Set initial message immediately
		setCurrentMessage(messages[0]);

		const rotateMessage = () => {
			messageIndex = (messageIndex + 1) % messages.length;
			setCurrentMessage(messages[messageIndex]);
		};

		const interval = setInterval(rotateMessage, 4000);
		return () => clearInterval(interval);
	}, [showPersistentBadge, isFirstTimeUser]);

	// Handle assistant button click
	const handleAssistantClick = () => {
		// Mark as interacted and used
		localStorage.setItem('aiAgentInteracted', 'true');
		localStorage.setItem('aiAgentUsed', 'true');

		setHasInteracted(true);
		setIsFirstTimeUser(false);

		// Hide persistent badge after first interaction
		setTimeout(() => {
			setShowPersistentBadge(false);
		}, 1000);

		toggleAssistant();
	};

	// Handle badge dismiss
	const handleBadgeDismiss = (e: React.MouseEvent) => {
		e.stopPropagation();
		setShowPersistentBadge(false);
		localStorage.setItem('aiAgentInteracted', 'true');
		setHasInteracted(true);
	};

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
					{/* Large Persistent Badge - Only for First-Time Users */}
					{showPersistentBadge && isFirstTimeUser && (
						<motion.div
							initial={{ opacity: 0, y: 10, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -10, scale: 0.9 }}
							transition={{ duration: 0.3 }}
							className={`absolute ${
								isMobile ? '-top-20' : '-top-20'
							} right-0 min-w-[280px] max-w-[320px] z-50`}>
							<div className='relative'>
								{/* Main badge container */}
								<div
									className='bg-gradient-to-r from-blue-600 to-purple-600 p-[1px] rounded-2xl shadow-lg'
									style={{
										boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
									}}>
									<div className='bg-white rounded-2xl p-4 relative overflow-hidden'>
										{/* Animated background pattern */}
										<div className='absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 opacity-60' />

										{/* Content */}
										<div className='relative z-10'>
											{/* Header */}
											<div className='flex items-center justify-between mb-2'>
												<div className='flex items-center gap-2'>
													<div className='flex items-center gap-1'>
														<Sparkles className='w-4 h-4 text-blue-600' />
														<span className='text-sm font-bold text-gray-800'>
															AI Agent
														</span>
													</div>
													<div className='flex items-center gap-1'>
														<div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse' />
														<span className='text-xs text-emerald-600 font-medium'>
															Online
														</span>
													</div>
												</div>
												<button
													onClick={handleBadgeDismiss}
													className='p-1 hover:bg-gray-100 rounded-full transition-colors'
													aria-label='Dismiss'>
													<X className='w-3 h-3 text-gray-400' />
												</button>
											</div>

											{/* Message */}
											<motion.p
												key={currentMessage}
												initial={{ opacity: 0, y: 5 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.3 }}
												className='text-sm text-gray-700 mb-3 leading-relaxed'>
												{currentMessage ||
													'👋 I can answer all of your questions!'}
											</motion.p>

											{/* CTA Button */}
											<motion.button
												onClick={handleAssistantClick}
												whileHover={{ scale: 1.02 }}
												whileTap={{ scale: 0.98 }}
												className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2'>
												<MessageCircle className='w-4 h-4' />
												Try AI Agent Free
											</motion.button>
										</div>
									</div>
								</div>

								{/* Arrow pointer */}
								<div
									className='absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45 border-r border-b'
									style={{
										borderColor: 'rgba(59, 130, 246, 0.2)',
									}}
								/>
							</div>
						</motion.div>
					)}

					{/* Small Subtle Tooltip - For Returning Users */}
					{!isFirstTimeUser && !showPersistentBadge && (
						<motion.div
							initial={{ opacity: 0, y: 5, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ duration: 0.2 }}
							className={`absolute ${
								isMobile ? '-top-12' : '-top-10'
							} right-0 bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg`}
							style={{ zIndex: 60 }}>
							<div className='relative flex items-center gap-2'>
								<span>Baba AI Agent</span>
								<div className='w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse' />
								{/* Arrow pointer */}
								<div className='absolute -bottom-1 right-4 w-2 h-2 bg-slate-800 transform rotate-45' />
							</div>
						</motion.div>
					)}

					{/* Enhanced tooltip for hover state - Only when no other tooltips are showing */}
					<AnimatePresence>
						{isTooltipVisible && !showPersistentBadge && isFirstTimeUser && (
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
									<span className='font-medium'>Baba AI Agent</span>
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

					{/* "New" badge for first-time users */}
					{isFirstTimeUser && !showPersistentBadge && (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className='absolute -top-1 -left-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full z-20'>
							NEW
						</motion.div>
					)}

					{/* Main button */}
					<button
						onClick={handleAssistantClick}
						onMouseEnter={() => {
							if (isFirstTimeUser && !showPersistentBadge) {
								setIsTooltipVisible(true);
							}
						}}
						onMouseLeave={() => setIsTooltipVisible(false)}
						onTouchStart={() => {
							if (isFirstTimeUser && !showPersistentBadge) {
								setIsTooltipVisible(true);
							}
						}}
						onTouchEnd={() => setIsTooltipVisible(false)}
						className={`group relative flex items-center gap-3 ${
							isMobile ? 'p-0 rounded-full' : 'p-4 rounded-2xl'
						} bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl border border-[rgba(107,122,255,0.1)] transition-all duration-300 ${
							isFirstTimeUser ? 'ring-2 ring-blue-200 ring-opacity-50' : ''
						}`}
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
							{/* Online indicator with pulse animation */}
							<div className='absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white z-20'>
								<div className='absolute inset-0 w-4 h-4 bg-emerald-500 rounded-full animate-ping opacity-75' />
							</div>
						</div>

						{/* Desktop additional info */}
						{!isMobile && (
							<div className='flex flex-col items-start'>
								<span className='text-[15px] font-medium text-gray-800'>
									AI Agent
								</span>
								<div className='flex items-center gap-2'>
									<span className='text-sm font-medium text-emerald-500'>
										Online
									</span>
									<span className='text-sm text-gray-400 font-medium'>
										• {isFirstTimeUser ? 'Try me!' : 'Ready to help'}
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
