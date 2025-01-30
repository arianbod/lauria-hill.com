'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
	Send,
	Image as ImageIcon,
	Paperclip,
	Smile,
	ArrowBigUp,
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
			className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
			<div
				className={`relative max-w-[80%] p-3 rounded-lg ${
					isUser
						? 'bg-blue-500/50 text-black ml-4'
						: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 mr-4'
				}`}>
				{/* Message content with Markdown support */}
				<div className='prose prose-sm max-w-none dark:prose-invert'>
					<ReactMarkdown
						components={{
							code: ({ node, inline, className, children, ...props }) => {
								if (inline) {
									return (
										<code
											className='px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700'
											{...props}>
											{children}
										</code>
									);
								}
								return (
									<pre className='p-3 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-x-auto'>
										<code {...props}>{children}</code>
									</pre>
								);
							},
						}}>
						{message.content}
					</ReactMarkdown>
				</div>

				{/* Timestamp and status */}
				<div
					className={`absolute ${isUser ? 'left-0' : 'right-0'} -bottom-5 
                     text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap
                     opacity-0 group-hover:opacity-100 transition-opacity`}>
					{new Date(message.timestamp || Date.now()).toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit',
					})}
					{isUser && isLast && (
						<span className='ml-1'>
							{message.status === 'sent' ? '✓' : '✓✓'}
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
		<div className='flex flex-col h-full'>
			{/* Welcome message */}
			{messages.length === 0 && (
				<div className='flex-1 flex items-center justify-center p-4 text-center text-gray-500 dark:text-gray-400'>
					<div>
						<h3 className='text-lg font-semibold mb-2'>
							Welcome to Baba AI Assistant
						</h3>
						<p className='text-sm'>How can I help you today?</p>
					</div>
				</div>
			)}

			{/* Messages */}
			<div className='flex-1 overflow-y-auto p-4 space-y-6'>
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
			<form
				onSubmit={handleSubmit}
				className='border-t border-gray-200 dark:border-gray-700 p-4'>
				<div className='flex place-items-center gap-2'>
					<div className='flex-1 relative place-items-center'>
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
							className='text-black w-full bg-gray-200 rounded-lg px-4 py-2 pr-24 min-h-[40px] max-h-[150px] resize-none
                            focus:outline-none focus:ring-2 focus:ring-blue-500'
							disabled={isLoading}
						/>
					</div>

					<motion.button
						type='submit'
						disabled={!input.trim() || isLoading}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className='p-3 bg-blue-800 rounded-lg disabled:opacity-50 disabled:bg-white disabled:text-blue-500 
                        disabled:cursor-not-allowed flex-shrink-0 transition-colors
                        hover:bg-blue-600 flex place-items-center'>
						<ArrowBigUp className='w-5 h-5 m-auto' />
					</motion.button>
				</div>
			</form>
		</div>
	);
};

export default AssistantChat;
