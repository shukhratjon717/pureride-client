import React, { useEffect, useRef } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import moment from 'moment';
import { useTheme } from '../../../context/ThemeContext';

interface Activity {
	eventType: string;
	memberNick: string;
	timestamp: Date;
	description: string;
}

interface ActivityFeedProps {
	activities: Activity[];
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
	const { colors } = useTheme();
	const listRef = useRef<HTMLDivElement>(null);

	// Auto-scroll to bottom when new activities arrive
	useEffect(() => {
		if (listRef.current) {
			listRef.current.scrollTop = listRef.current.scrollHeight;
		}
	}, [activities]);

	const getEventIcon = (eventType: string) => {
		switch (eventType) {
			case 'USER_LOGIN':
				return '🔐';
			case 'USER_SIGNUP':
				return '👤';
			case 'PRODUCT_PURCHASE':
				return '🛒';
			case 'PRODUCT_LIKE':
				return '❤️';
			case 'COMMENT_CREATE':
				return '💬';
			case 'FOLLOW_USER':
				return '👥';
			default:
				return '📌';
		}
	};

	return (
		<Box
			ref={listRef}
			sx={{
				maxHeight: '300px',
				overflowY: 'auto',
				'&::-webkit-scrollbar': {
					width: '6px',
				},
				'&::-webkit-scrollbar-track': {
					background: colors.bgSecondary,
					borderRadius: '3px',
				},
				'&::-webkit-scrollbar-thumb': {
					background: colors.accentPrimary,
					borderRadius: '3px',
				},
			}}
		>
			<List sx={{ p: 0 }}>
				{activities.length === 0 ? (
					<Box
						sx={{
							textAlign: 'center',
							py: 4,
							color: colors.textSecondary,
						}}
					>
						<Typography variant="body2">No recent activity</Typography>
					</Box>
				) : (
					activities.map((activity, index) => (
						<ListItem
							key={index}
							sx={{
								borderBottom: `1px solid ${colors.borderColor}`,
								py: 1.5,
								px: 0,
								'&:last-child': {
									borderBottom: 'none',
								},
								animation: index === activities.length - 1 ? 'slideIn 0.3s ease-out' : 'none',
								'@keyframes slideIn': {
									from: {
										opacity: 0,
										transform: 'translateX(-10px)',
									},
									to: {
										opacity: 1,
										transform: 'translateX(0)',
									},
								},
							}}
						>
							<Box
								sx={{
									fontSize: '20px',
									mr: 2,
									minWidth: '24px',
									textAlign: 'center',
								}}
							>
								{getEventIcon(activity.eventType)}
							</Box>
							<ListItemText
								primary={
									<Typography
										variant="body2"
										sx={{
											color: colors.textPrimary,
											fontWeight: 500,
											fontSize: '0.875rem',
										}}
									>
										{activity.description}
									</Typography>
								}
								secondary={
									<Typography
										variant="caption"
										sx={{
											color: colors.textSecondary,
											fontSize: '0.75rem',
										}}
									>
										{moment(activity.timestamp).fromNow()}
									</Typography>
								}
							/>
						</ListItem>
					))
				)}
			</List>
		</Box>
	);
};
