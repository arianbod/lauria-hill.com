'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

const products = [
	{
		name: 'Custom Wire Harness Assemblies',
		image: '/images/gallery/wire-harness-1.jpeg',
		description: 'Tailored wire harness solutions for various industries.',
		gallery: [
			'/images/gallery/wire-harness-2.jpeg',
			'/images/gallery/wire-harness-3.jpeg',
			'/images/gallery/wire-harness.webp',
		],
	},
	{
		name: 'High Power Cables',
		image: '/images/gallery/high-power-cables.webp',
		description: 'Robust high power cables for demanding applications.',
		gallery: [
			'/images/gallery/high-power-1.jpg',
			'/images/gallery/high-power-2.jpg',
			'/images/gallery/high-power-3.jpg',
		],
	},
	{
		name: 'Coaxial Cables',
		image: '/images/gallery/coaxial-cables.webp',
		description: 'Premium coaxial cables for optimal signal transmission.',
		gallery: [
			'/images/gallery/coaxial-1.jpg',
			'/images/gallery/coaxial-2.jpg',
			'/images/gallery/coaxial-3.jpg',
		],
	},
	{
		name: 'Circuit Boards',
		image: '/images/gallery/circuit-boards.webp',
		description: 'Custom-designed circuit boards for diverse electronic needs.',
		gallery: [
			'/images/gallery/circuit-1.jpg',
			'/images/gallery/circuit-2.jpg',
			'/images/gallery/circuit-3.jpg',
		],
	},
	// {
	// 	name: 'Lighting Solutions',
	// 	image: '/images/gallery/lighting-solutions-1.png',
	// 	description: 'Innovative lighting solutions for various environments.',
	// 	gallery: [
	// 		'/images/gallery/lighting-1.jpg',
	// 		'/images/gallery/lighting-2.jpg',
	// 		'/images/gallery/lighting-3.jpg',
	// 	],
	// },
];

const ProductsPage = () => {
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// const openGallery = (product) => {
	// 	setSelectedProduct(product);
	// 	setCurrentImageIndex(0);
	// };

	const closeGallery = () => {
		setSelectedProduct(null);
	};

	const nextImage = () => {
		setCurrentImageIndex(
			(prevIndex) => (prevIndex + 1) % selectedProduct.gallery.length
		);
	};

	const prevImage = () => {
		setCurrentImageIndex(
			(prevIndex) =>
				(prevIndex - 1 + selectedProduct.gallery.length) %
				selectedProduct.gallery.length
		);
	};

	return (
		<div className=' p-8'>
			<div className='max-w-6xl mx-auto'>
				<h1 className='text-4xl font-bold mb-8 text-center'>Our Products</h1>

				<div className='bg-white rounded-lg shadow-md p-6 mb-12'>
					<p className='text-lg text-gray-700 text-center'>
						Lauria and Hill offers a wide range of products for custom wire
						harness assemblies, high power cables, coaxial cables, circuit
						boards and lighting to meet all of your specifications. No
						requirement is too big or too small.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{products.map((product, index) => (
						<div
							key={index}
							className='bg-white rounded-lg shadow-md overflow-hidden'>
							<div
								className='h-48 relative cursor-pointer'
								// onClick={() => openGallery(product)}
							>
								<Image
									src={product.image}
									alt={product.name}
									layout='fill'
									objectFit='cover'
								/>
							</div>
							<div className='p-4'>
								<h3 className='text-xl font-semibold text-amber-700'>
									{product.name}
								</h3>
								<p className='text-gray-600 mt-2'>{product.description}</p>
								{/* <button
									onClick={() => openGallery(product)}
									className='mt-4 text-amber-600 hover:text-amber-800 transition duration-300'>
									View Gallery
								</button> */}
							</div>
						</div>
					))}
				</div>

				<div className='mt-12 text-center'>
					<a
						href='/contact-us'
						className='inline-block px-6 py-3 bg-button-normal hover:bg-button-hover text-white font-semibold rounded-md transition duration-300'>
						Contact Us for Custom Solutions
					</a>
				</div>
			</div>

			{/* Gallery Modal */}
			{selectedProduct && (
				<div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
					<div className='max-w-4xl w-full bg-white rounded-lg overflow-hidden'>
						<div className='relative h-96'>
							<Image
								src={selectedProduct.gallery[currentImageIndex]}
								alt={`${selectedProduct.name} gallery image`}
								layout='fill'
								objectFit='contain'
							/>
							<button
								onClick={prevImage}
								className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2'>
								&#8592;
							</button>
							<button
								onClick={nextImage}
								className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2'>
								&#8594;
							</button>
						</div>
						<div className='p-4'>
							<h3 className='text-2xl font-semibold text-amber-700'>
								{selectedProduct.name}
							</h3>
							<p className='text-gray-600 mt-2'>
								{selectedProduct.description}
							</p>
						</div>
						<button
							onClick={closeGallery}
							className='absolute top-4 right-4 text-white'>
							<X size={24} />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductsPage;
