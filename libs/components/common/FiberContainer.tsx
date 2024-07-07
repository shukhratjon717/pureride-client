import React from 'react';
import { Button, Stack } from '@mui/material';

const Intro = () => {
	return (
		<Stack className={'intro'}>
			<Stack className={'intro-left'}>
				<p className={'intro1'}>Discover</p>
				<p className={'intro2'}>DesertX Discovery</p>
				<p className={'intro3'}>
					Designed and accessorised to offer unprecedented versatility, DesertX Discovery is the ideal choice for those
					seeking touring agility and off-road character.
				</p>
			</Stack>
			<Stack className={'intro-right'}>
				<Button className={'intro-btn'}>Discover More</Button>
			</Stack>
		</Stack>
	);
};

export default function App() {
	return (
		<div>
			<Intro />
			{/* Add other components or content here */}
		</div>
	);
}
