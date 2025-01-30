/* eslint-disable */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
	Send,
	Image as ImageIcon,
	Paperclip,
	Smile,
	ArrowBigUp,
	MessageCircle,
	Check,
	CheckCheck,
} from 'lucide-react';
import { useAssistant } from '@/context/AssistantContext';
import { motion, AnimatePresence } from 'framer-motion';
import TypingIndicator from './TypingIndicator';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

const ChatMessage = ({ message, isLast }) => {
	const isUser = message.role === 'user';

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className={`flex ${isUser ? 'justify-end' : 'justify-start'} group mb-6`}>
			<div
				className={`relative max-w-[85%] p-4 rounded-2xl shadow-sm 
                    ${
											isUser
												? 'bg-blue-500 text-white ml-4 rounded-br-sm'
												: 'bg-gray-100 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 mr-4 rounded-bl-sm'
										}`}>
				{/* Message content with Markdown support */}
				<div className='prose prose-sm max-w-none dark:prose-invert'>
					<ReactMarkdown
						components={{
							code: ({ node, inline, className, children, ...props }) => {
								if (inline) {
									return (
										<code
											className='px-1.5 py-0.5 rounded bg-gray-200/20 dark:bg-gray-700/50 font-mono text-sm'
											{...props}>
											{children}
										</code>
									);
								}
								return (
									<pre className='p-4 rounded-lg bg-gray-200/20 dark:bg-gray-700/50 overflow-x-auto'>
										<code
											className='font-mono text-sm'
											{...props}>
											{children}
										</code>
									</pre>
								);
							},
						}}>
						{message.content}
					</ReactMarkdown>
				</div>

				{/* End of message indicator for assistant messages */}
				{!isUser && (
					<div className='mt-2 flex items-center justify-end text-xs text-gray-500 dark:text-gray-400'>
						<MessageCircle className='w-3 h-3 mr-1' />
						<span>End of response</span>
					</div>
				)}

				{/* Timestamp and status */}
				<div
					className={`absolute ${isUser ? 'left-0' : 'right-0'} -bottom-6 
                        text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap
                        opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1`}>
					{new Date(message.timestamp || Date.now()).toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
					})}
					{isUser && isLast && (
						<span className='ml-1'>
							{message.status === 'sent' ? (
								<Check className='w-3 h-3' />
							) : (
								<CheckCheck className='w-3 h-3' />
							)}
						</span>
					)}
				</div>
			</div>
		</motion.div>
	);
};

const AssistantChat = () => {
	const { messages, sendMessage, isLoading } = useAssistant();
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

	return (
		<div
			className='flex flex-col h-full bg-white dark:bg-gray-900'
			ref={containerRef}>
			{/* Welcome message */}
			{messages.length === 0 && (
				<div className='flex-1 flex items-center justify-center p-8 text-center'>
					<div className='max-w-md mx-auto'>
						<h3 className='text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
							Welcome to Baba AI Assistant
						</h3>
						<p className='text-base text-gray-600 dark:text-gray-400'>
							I'm here to help you with any questions or tasks you have.
						</p>
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
				</form>
			</div>
		</div>
	);
};

export default AssistantChat;
