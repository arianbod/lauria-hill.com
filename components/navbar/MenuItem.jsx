import Link from 'next/link';
import React from 'react';

const MenuItem = ({ title, url }) => {
	return <Link href={url}>{title}</Link>;
};

export default MenuItem;
