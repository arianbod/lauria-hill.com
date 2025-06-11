/* eslint-disable */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowBigUp, Video } from 'lucide-react';
import { useAssistant } from '@/context/AssistantContext';
import { motion, AnimatePresence } from 'framer-motion';
import TypingIndicator from './TypingIndicator';
import ChatMessage from './ChatMessage';
import Link from 'next/link';

const AssistantChat = () => {
	const { messages, sendMessage, isLoading, sendConferenceNotification } =
		useAssistant();
	const [input, setInput] = useState('');
	const [isComposing, setIsComposing] = useState(false);
	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);
	const containerRef = useRef(null);

	const scrollToBottom = (behavior = 'smooth') => {
		messagesEndRef.current?.scrollIntoView({ behavior });
	};

	useEffect(() => {
		scrollToBottom(messages.length === 1 ? 'auto' : 'smooth');
	}, [messages, isLoading]);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		sendMessage(input);
		setInput('');
		scrollToBottom('auto');
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
			handleSubmit(e);
		}
	};

	const handleStartConference = async () => {
		const currentTimestamp = new Date().getTime();
		const conferenceUrl = `https://conf.babaai.ca/${currentTimestamp}`;

		try {
			// Get user's email from wherever you store it in your app
			const userEmail = 'eciasca@lauria-hill.com'; // Replace with actual user email

			// Filter out any empty or loading messages
			const relevantMessages = messages.filter(
				(msg) =>
					msg.content &&
					msg.content.trim() &&
					(msg.role === 'user' || msg.role === 'assistant')
			);

			const result = await sendConferenceNotification(
				userEmail,
				conferenceUrl,
				relevantMessages
			);

			if (result.success) {
				window.open(conferenceUrl, '_blank');
			} else {
				console.error('Failed to send conference notification:', result.error);
				// Handle error in UI
			}
		} catch (error) {
			console.error('Error starting conference:', error);
			// Handle error in UI
		}
	};

	return (
		<div
			className='flex flex-col h-full bg-white dark:bg-gray-900'
			ref={containerRef}>
			{/* Welcome message */}
			{messages.length === 0 && (
				<div className='flex-1 flex items-center justify-center p-8 text-center'>
					<div className='max-w-md mx-auto'>
						<h3 className='text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
							Welcome to Lauria and Hill,
						</h3>
						<p className='text-base text-gray-600 dark:text-gray-400'>
							I'm BabaAI Agent, I will help you with any questions or tasks
							you have.
						</p>
						<button
							onClick={handleStartConference}
							className='mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 mx-auto'>
							<Video className='w-5 h-5' />
							Start Video Conference
						</button>
					</div>
				</div>
			)}

			{/* Messages */}
			<div className='flex-1 overflow-y-auto p-6 space-y-2'>
				{messages.map((message, index) => (
					<ChatMessage
						key={message.id}
						message={message}
						isLast={index === messages.length - 1}
					/>
				))}

				{/* Typing Indicator */}
				<AnimatePresence>
					{isLoading && (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							className='flex justify-start'>
							<TypingIndicator />
						</motion.div>
					)}
				</AnimatePresence>
				<div ref={messagesEndRef} />
			</div>

			{/* Input */}
			<div className='border-t border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900/50'>
				<form
					onSubmit={handleSubmit}
					className='max-w-4xl mx-auto'>
					<div className='flex items-center gap-3'>
						<div className='flex-1 relative'>
							<textarea
								ref={inputRef}
								rows={1}
								value={input}
								onChange={(e) => {
									setInput(e.target.value);
									e.target.style.height = 'auto';
									e.target.style.height =
										Math.min(e.target.scrollHeight, 150) + 'px';
								}}
								onKeyDown={handleKeyDown}
								onCompositionStart={() => setIsComposing(true)}
								onCompositionEnd={() => setIsComposing(false)}
								placeholder='Type your message...'
								className='w-full bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 pr-12
                                    text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
                                    min-h-[48px] max-h-[150px] resize-none shadow-sm
                                    border border-gray-200 dark:border-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    transition-all duration-200
                                    overflow-hidden hover:overflow-auto
                                    [&::-webkit-scrollbar]:w-1.5
                                    [&::-webkit-scrollbar]:h-1.5
                                    [&::-webkit-scrollbar-track]:bg-transparent
                                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                                    [&::-webkit-scrollbar-thumb]:rounded-full
                                    dark:[&::-webkit-scrollbar-thumb]:bg-gray-600
                                    hover:[&::-webkit-scrollbar-thumb]:bg-gray-400
                                    dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-500
                                    [&::-webkit-scrollbar-thumb:vertical]:min-h-[40px]'
								disabled={isLoading}
							/>
						</div>

						<motion.button
							type='submit'
							disabled={!input.trim() || isLoading}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='p-3 bg-blue-600 hover:bg-blue-700 rounded-xl disabled:opacity-50 
                                disabled:bg-gray-300 dark:disabled:bg-gray-700
                                disabled:cursor-not-allowed flex-shrink-0 transition-all duration-200
                                shadow-sm hover:shadow-md'>
							<ArrowBigUp className='w-6 h-6 text-white' />
						</motion.button>
					</div>
					<Link
						href='https://babaai.ca'
						className='text-slate-900/50 text-xs text-center flex place-content-center place-items-center'>
						Do you want to know more about BabaAI Agent?
					</Link>
				</form>
			</div>

			{/* Video conference button for non-empty chat */}
			{messages.length > 0 && (
				<div className='absolute bottom-20 right-4'>
					<motion.button
						onClick={handleStartConference}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className='p-3 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg text-white'>
						<Video className='w-5 h-5' />
					</motion.button>
				</div>
			)}
		</div>
	);
};

export default AssistantChat;
