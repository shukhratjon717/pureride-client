import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { MetricCard } from './MetricCard';
import { LiveChart } from './LiveChart';
import { ActivityFeed } from './ActivityFeed';
import { useTheme } from '../../../context/ThemeContext';
import { useWebSocket } from '../../../hooks/useWebSocket';

interface AnalyticsData {
	activeUsersCount: number;
	salesVelocity: Array<{
		productId: string;
		productName: string;
		salesCount: number;
	}>;
	topPerformer: {
		memberNick: string;
		activityCount: number;
	} | null;
	recentActivity: Array<{
		eventType: string;
		memberNick: string;
		timestamp: Date;
		description: string;
	}>;
	timestamp: Date;
}

export const LiveDashboard: React.FC = () => {
	const { colors } = useTheme();
	const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const { isConnected, subscribe, unsubscribe, lastMessage } = useWebSocket({
		url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000',
		onMessage: (data) => {
			if (data.event === 'analytics:initial' || data.event === 'analytics:update') {
				setAnalyticsData(data.data);
				setIsLoading(false);
			}
		},
		onError: (error) => {
			console.error('WebSocket error:', error);
			setError('Failed to connect to real-time analytics');
			setIsLoading(false);
		},
	});

	useEffect(() => {
		if (isConnected) {
			subscribe('subscribeToAnalytics');
		}

		return () => {
			if (isConnected) {
				unsubscribe('unsubscribeFromAnalytics');
			}
		};
	}, [isConnected, subscribe, unsubscribe]);

	if (isLoading) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="400px"
				flexDirection="column"
				gap={2}
			>
				<CircularProgress sx={{ color: colors.accentPrimary }} />
				<Typography variant="body2" sx={{ color: colors.textSecondary }}>
					Connecting to real-time analytics...
				</Typography>
			</Box>
		);
	}

	if (error) {
		return (
			<Box p={3}>
				<Alert severity="error">{error}</Alert>
			</Box>
		);
	}

	if (!analyticsData) {
		return (
			<Box p={3}>
				<Alert severity="info">No analytics data available</Alert>
			</Box>
		);
	}

	const salesChartData = {
		labels: analyticsData.salesVelocity.map((item) => item.productName.substring(0, 15)),
		values: analyticsData.salesVelocity.map((item) => item.salesCount),
	};

	return (
		<Box sx={{ p: 3 }}>
			{/* Connection Status Indicator */}
			<Box display="flex" alignItems="center" gap={1} mb={3}>
				<Box
					className={isConnected ? 'pulse-animation' : ''}
					sx={{
						width: '8px',
						height: '8px',
						borderRadius: '50%',
						backgroundColor: isConnected ? '#10B981' : '#EF4444',
					}}
				/>
				<Typography variant="caption" sx={{ color: colors.textSecondary }}>
					{isConnected ? 'Live' : 'Disconnected'}
				</Typography>
			</Box>

			<Grid container spacing={3}>
				{/* Active Users */}
				<Grid item xs={12} sm={6} md={3}>
					<MetricCard
						title="Active Users"
						value={analyticsData.activeUsersCount}
						icon="👥"
						subtitle="Last 5 minutes"
						className="heartbeat-animation"
					/>
				</Grid>

				{/* Top Performer */}
				<Grid item xs={12} sm={6} md={3}>
					<MetricCard
						title="Top Performer"
						value={analyticsData.topPerformer?.memberNick || 'N/A'}
						icon="🏆"
						subtitle={
							analyticsData.topPerformer
								? `${analyticsData.topPerformer.activityCount} activities`
								: 'No data'
						}
					/>
				</Grid>

				{/* Total Sales (from velocity) */}
				<Grid item xs={12} sm={6} md={3}>
					<MetricCard
						title="Total Sales"
						value={analyticsData.salesVelocity.reduce((sum, item) => sum + item.salesCount, 0)}
						icon="💰"
						subtitle="Last hour"
						trend="up"
					/>
				</Grid>

				{/* Products Sold */}
				<Grid item xs={12} sm={6} md={3}>
					<MetricCard
						title="Products Sold"
						value={analyticsData.salesVelocity.length}
						icon="📦"
						subtitle="Unique products"
					/>
				</Grid>

				{/* Sales Velocity Chart */}
				<Grid item xs={12} md={8}>
					<MetricCard title="Sales Velocity" subtitle="Top selling products in the last hour">
						{analyticsData.salesVelocity.length > 0 ? (
							<LiveChart data={salesChartData} title="Sales" />
						) : (
							<Box
								sx={{
									textAlign: 'center',
									py: 4,
									color: colors.textSecondary,
								}}
							>
								<Typography variant="body2">No sales data available</Typography>
							</Box>
						)}
					</MetricCard>
				</Grid>

				{/* Activity Feed */}
				<Grid item xs={12} md={4}>
					<MetricCard title="Live Activity Feed" subtitle="Recent user actions">
						<ActivityFeed activities={analyticsData.recentActivity} />
					</MetricCard>
				</Grid>
			</Grid>
		</Box>
	);
};
