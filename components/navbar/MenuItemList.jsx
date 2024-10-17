import React from 'react';
import MenuItem from './MenuItem';

const MenuItemList = ({ dic }) => {
	return (
		<>
			{dic.menuitems.map((item) => {
				return (
					<MenuItem
						key={item}
						{...item}
					/>
				);
			})}
		</>
	);
};

export default MenuItemList;
