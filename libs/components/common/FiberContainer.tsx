import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Button, Stack } from '@mui/material';
import router from 'next/router';

const App = () => {
	// Define initialInput within the component
	const initialInput = {
		page: 1,
		limit: 9,
		search: {
			locationList: [],
			typeList: [],
			yearList: [],
			options: [],
			engineList: [],
		},
	};

	const [searchFilter, setSearchFilter] = useState(initialInput);
	const [openLocation, setOpenLocation] = useState(false);
	const [openType, setOpenType] = useState(false);
	const [openRooms, setOpenRooms] = useState(false);
	const [openAdvancedFilter, setOpenAdvancedFilter] = useState(false);
	const [optionCheck, setOptionCheck] = useState('all');

	const locationRef = useRef(null);
	const typeRef = useRef(null);
	const roomsRef = useRef(null);

	/** LIFECYCLES **/

	/** HANDLERS **/

	const pushSearchHandler = async () => {
		try {
			await router.push(
				`/product?input=${JSON.stringify(searchFilter)}`,
				`/product?input=${JSON.stringify(searchFilter)}`,
			);
		} catch (err) {
			console.log('ERROR, pushSearchHandler:', err);
		}
	};

	const Intro = () => {
		return (
			<Stack className={'intro'}>
				<Stack className={'intro-left'}>
					<p className={'intro1'}>Discover</p>
					<p className={'intro2'}>DesertX Discovery</p>
					<p className={'intro3'}>
						Designed and accessorised to offer unprecedented versatility, DesertX Discovery is the ideal choice for
						those seeking touring agility and off-road character.
					</p>
				</Stack>
				<Stack className={'intro-right'}>
					<Button className={'intro-btn'} onClick={pushSearchHandler}>
						Discover More
					</Button>
				</Stack>
			</Stack>
		);
	};

	return (
		<div>
			<Intro />
			{/* Add other components or content here */}
		</div>
	);
};

export default App;
