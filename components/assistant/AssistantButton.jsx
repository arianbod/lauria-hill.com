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
	'👋 Need help finding something?',
	'🌟 Check out our amazing deals!',
	'💡 I can help you compare products',
	'🎁 Want to see our newest arrivals?',
	'💬 Ask me anything about our products!',
	'🔍 Looking for something specific?',
	'⭐ I can find the perfect match for you',
	'📦 Free shipping on orders over $50!',
	'🏷️ Exclusive deals just for you',
	'💫 Let me help you find the best options',
];

const RobotFace = ({ expression = 'default', blink }) => (
	<svg
		viewBox='0 0 120 120'
		className='w-full h-full'>
		{/* Face background */}
		<circle
			cx='60'
			cy='60'
			r='56'
			fill='#ffffff'
			stroke='#6b7aff'
			strokeWidth='3'
		/>

		{/* Left eye */}
		<motion.g
			animate={blink ? { scaleY: [1, 0.1, 1] } : {}}
			transition={{ duration: 0.2 }}>
			<circle
				cx='40'
				cy='50'
				r='8'
				fill='#6b7aff'
			/>
			<circle
				cx='42'
				cy='48'
				r='3'
				fill='#ffffff'
			/>
		</motion.g>

		{/* Right eye */}
		<motion.g
			animate={blink ? { scaleY: [1, 0.1, 1] } : {}}
			transition={{ duration: 0.2 }}>
			<circle
				cx='80'
				cy='50'
				r='8'
				fill='#6b7aff'
			/>
			<circle
				cx='82'
				cy='48'
				r='3'
				fill='#ffffff'
			/>
		</motion.g>

		{/* Mouth - changes with expression */}
		<motion.path
			d={
				expression === 'happy'
					? 'M40,75 Q60,95 80,75'
					: expression === 'thinking'
					? 'M40,80 Q60,80 80,80'
					: 'M40,80 Q60,90 80,80'
			}
			fill='none'
			stroke='#6b7aff'
			strokeWidth='3'
			strokeLinecap='round'
			animate={{
				d:
					expression === 'happy'
						? 'M40,75 Q60,95 80,75'
						: expression === 'thinking'
						? 'M40,80 Q60,80 80,80'
						: 'M40,80 Q60,90 80,80',
			}}
		/>
	</svg>
);

const AnimatedAssistantButton = () => {
	const { toggleAssistant } = useAssistant();
	const [isButtonVisible, setIsButtonVisible] = useState(true);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [currentMessage, setCurrentMessage] = useState('');
	const [expression, setExpression] = useState('default');
	const [blink, setBlink] = useState(false);

	// Screen size check
	useEffect(() => {
		const checkScreenSize = () => setIsMobile(window.innerWidth < 640);
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	// Blink animation
	useEffect(() => {
		const blinkInterval = setInterval(() => {
			setBlink(true);
			setTimeout(() => setBlink(false), 200);
		}, Math.random() * 3000 + 2000);

		return () => clearInterval(blinkInterval);
	}, []);

	// Message rotation
	useEffect(() => {
		let messageTimeout;

		const rotateMessage = () => {
			const newMessage =
				ASSISTANT_MESSAGES[
					Math.floor(Math.random() * ASSISTANT_MESSAGES.length)
				];
			setExpression('thinking');

			setTimeout(() => {
				setCurrentMessage(newMessage);
				setExpression('happy');

				setTimeout(() => {
					setExpression('default');
				}, 1000);
			}, 500);

			messageTimeout = setTimeout(rotateMessage, 8000);
		};

		rotateMessage();
		return () => clearTimeout(messageTimeout);
	}, []);

	if (!isButtonVisible) return null;

	return (
		<>
			<div className='fixed bottom-6 right-6 z-50  text-slate-800 font-bold'>
				<AnimatePresence>
					{currentMessage && !isMobile && (
						<motion.div
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
						className='group flex items-center gap-3 p-4 rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl border border-[rgba(107,122,255,0.1)] transition-all duration-300'
						style={{ boxShadow: '0 4px 24px rgba(107, 122, 255, 0.15)' }}>
						<div className='w-10 h-10'>
							<Image
								alt='Assistant Avatar'
								src='/images/babagpt_bw.svg'
								width={isMobile ? 48 : 48}
								height={isMobile ? 48 : 48}
								className={` select-none relative z-10 object-contain ${
									isMobile ? 'w-12 h-12 p-2' : 'w-8 h-8 p-1'
								} bg-slate-700 rounded-full`}
								priority
							/>
						</div>

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
					</button>
				</motion.div>
			</div>

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
