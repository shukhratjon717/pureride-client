import React, { ReactNode } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useTheme } from '../../../context/ThemeContext';

interface MetricCardProps {
	title: string;
	value?: string | number;
	icon?: ReactNode;
	trend?: 'up' | 'down' | 'neutral';
	subtitle?: string;
	children?: ReactNode;
	className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
	title,
	value,
	icon,
	trend,
	subtitle,
	children,
	className = '',
}) => {
	const { colors } = useTheme();

	const getTrendColor = () => {
		switch (trend) {
			case 'up':
				return '#10B981'; // Green
			case 'down':
				return '#EF4444'; // Red
			default:
				return colors.textSecondary;
		}
	};

	const getTrendIcon = () => {
		switch (trend) {
			case 'up':
				return '↑';
			case 'down':
				return '↓';
			default:
				return '';
		}
	};

	return (
		<Card
			className={`metric-card glass-card ${className}`}
			sx={{
				background: colors.bgGlass,
				backdropFilter: 'blur(16px)',
				border: `1px solid ${colors.borderGlass}`,
				borderRadius: '20px',
				boxShadow: colors.shadowGlass,
				transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				'&:hover': {
					transform: 'translateY(-4px)',
					boxShadow: `0 12px 40px 0 ${colors.accentGlow}`,
					borderColor: colors.accentPrimary,
				},
			}}
		>
			<CardContent sx={{ p: 3 }}>
				<Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
					<Typography
						variant="subtitle2"
						sx={{
							color: colors.textSecondary,
							fontWeight: 600,
							textTransform: 'uppercase',
							letterSpacing: '0.05em',
							fontSize: '0.75rem',
						}}
					>
						{title}
					</Typography>
					{icon && (
						<Box
							sx={{
								fontSize: '24px',
								opacity: 0.8,
							}}
						>
							{icon}
						</Box>
					)}
				</Box>

			{value !== undefined && (
				<Box display="flex" alignItems="baseline" gap={1} mb={1}>
					<Typography
						variant="h3"
						sx={{
							color: colors.textPrimary,
							fontWeight: 700,
							fontSize: '2.5rem',
							lineHeight: 1,
						}}
					>
						{value}
					</Typography>
					{trend && (
						<Typography
							variant="body2"
							sx={{
								color: getTrendColor(),
								fontWeight: 600,
								fontSize: '1rem',
							}}
						>
							{getTrendIcon()}
						</Typography>
					)}
				</Box>
			)}

				{subtitle && (
					<Typography
						variant="body2"
						sx={{
							color: colors.textSecondary,
							fontSize: '0.875rem',
						}}
					>
						{subtitle}
					</Typography>
				)}

				{children && <Box mt={2}>{children}</Box>}
			</CardContent>
		</Card>
	);
};
