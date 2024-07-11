import React from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

interface EventData {
	eventTitle: string;
	city: string;
	description: string;
	imageSrc: string;
}
const eventsData: EventData[] = [
	{
		eventTitle: '',
		city: '',
		description:
			'Russell scored his first points for Williams with a brilliant performance at the Belgian Grand Prix, where he finished second due to the race being shortened by rain.',
		imageSrc: '/img/events/george.jpg',
	},
	{
		eventTitle: '',
		city: '',
		imageSrc: '/img/events/pedro.jpeg',
		description:
			'Pedro Acosta burst onto the scene in his rookie season in Moto3, riding for Red Bull KTM Ajo. He won the championship with a series of impressive performances, including several race victories and podium finishes.',
	},

	{
		eventTitle: '',
		city: '',
		description: 'Márquez won his first MotoGP World Championship in his rookie year with the Repsol Honda team.',
		imageSrc: '/img/events/markuez.webp',
	},
];

const EventCard = ({ event }: { event: EventData }) => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack
				className="event-card"
				style={{
					backgroundImage: `url(${event?.imageSrc})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<Box component={'div'} className={'info'}>
					<strong>{event?.city}</strong>
					<span>{event?.eventTitle}</span>
				</Box>
				<Box component={'div'} className={'more'}>
					<span>{event?.description}</span>
				</Box>
			</Stack>
		);
	}
};

const Events = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>Race Championships</div>;
	} else {
		return (
			<Stack className={'events'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span className={'white'}>Race Champions</span>
							<p className={'white'}>Championships waiting your attention!</p>
						</Box>
					</Stack>
					<Stack className={'card-wrapper'}>
						{eventsData.map((event: EventData) => {
							return <EventCard event={event} key={event?.eventTitle} />;
						})}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Events;
