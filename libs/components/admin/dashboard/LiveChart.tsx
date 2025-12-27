import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '../../../context/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface LiveChartProps {
	data: {
		labels: string[];
		values: number[];
	};
	title?: string;
	color?: string;
}

export const LiveChart: React.FC<LiveChartProps> = ({ data, title, color }) => {
	const { colors, mode } = useTheme();
	const chartRef = useRef<any>(null);

	const chartData = {
		labels: data.labels,
		datasets: [
			{
				label: title || 'Sales',
				data: data.values,
				backgroundColor: color || colors.accentPrimary,
				borderColor: color || colors.accentPrimary,
				borderWidth: 0,
				borderRadius: 8,
				barThickness: 40,
			},
		],
	};

	const options: ChartOptions<'bar'> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				backgroundColor: mode === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
				titleColor: colors.textPrimary,
				bodyColor: colors.textPrimary,
				borderColor: colors.borderGlass,
				borderWidth: 1,
				padding: 12,
				displayColors: false,
				callbacks: {
					label: function (context) {
						return `${context.parsed.y} sales`;
					},
				},
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
					drawBorder: false, // ✅ replaces border.display
				},
				ticks: {
					color: colors.textSecondary,
					font: {
						size: 11,
					},
				},
			},
			y: {
				beginAtZero: true,
				grid: {
					color: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
					drawBorder: false, // ✅ replaces border.display
				},
				ticks: {
					color: colors.textSecondary,
					font: {
						size: 11,
					},
					precision: 0,
				},
			},
		},
		animation: {
			duration: 750,
			easing: 'easeInOutQuart',
		},
	};

	// Update chart when data changes
	useEffect(() => {
		if (chartRef.current) {
			chartRef.current.update('active');
		}
	}, [data]);

	return (
		<Box sx={{ height: '200px', width: '100%' }}>
			<Bar ref={chartRef} data={chartData} options={options} />
		</Box>
	);
};
