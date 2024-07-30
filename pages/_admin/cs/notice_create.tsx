import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NextPage } from 'next';
import {
	Box,
	Button,
	TextField,
	Typography,
	Container,
	Paper,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@mui/material';
import { CREATE_NOTICE_BY_ADMIN } from '../../../apollo/admin/mutation'; // Adjust the import to your mutation file
import { useRouter } from 'next/router';

const NoticeCreate: NextPage = () => {
	const [noticeType, setNoticeType] = useState<any>('');
	const [noticeTitle, setNoticeTitle] = useState<any>('');
	const [noticeContent, setNoticeContent] = useState<any>('');
	const [createNotice] = useMutation(CREATE_NOTICE_BY_ADMIN); // Adjust the mutation name accordingly
	const router = useRouter();

	const handleCreateNotice = async () => {
		if (!noticeType || !noticeTitle || !noticeContent) {
			alert('Please fill in all fields.');
			return;
		}
		try {
			await createNotice({
				variables: {
					input: {
						noticeType,
						noticeTitle,
						noticeContent,
						noticeStatus: 'ACTIVE',
					},
				},
			});
			router.push('/_admin/cs/notice'); // Adjust the path to your notices list page
		} catch (error) {
			console.error('Error creating notice:', error);
		}
	};

	return (
		<Box
			sx={{
				backgroundImage: `url('/img/banner/login.webp')`, // Set the background image
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				minHeight: '100vh',
				py: 4,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Container maxWidth="sm">
				<Paper elevation={6} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2 }}>
					<Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
						Create New Notice
					</Typography>
					<Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
						<FormControl fullWidth variant="outlined">
							<InputLabel id="notice-type-label">Notice Type</InputLabel>
							<Select
								labelId="notice-type-label"
								value={noticeType}
								onChange={(e) => setNoticeType(e.target.value as string)}
								label="Notice Type"
							>
								<MenuItem value="PROMOTION">PROMOTION</MenuItem>
								<MenuItem value="NEW_ARRIVAL">NEW ARRIVAL</MenuItem>
								<MenuItem value="MAINTENANCE">MAINTENANCE</MenuItem>
								<MenuItem value="SAFETY">SAFETY</MenuItem>
								<MenuItem value="WEBSITE_UPDATE">WEBSITE UPDATE</MenuItem>
								<MenuItem value="LEGAL_POLICY">LEGAL POLICY</MenuItem>
								<MenuItem value="GENERAL_ANNOUNCEMENT">GENERAL ANNOUNCEMENT</MenuItem>
							</Select>
						</FormControl>
						<TextField
							label="Title"
							value={noticeTitle}
							onChange={(e) => setNoticeTitle(e.target.value)}
							fullWidth
							variant="outlined"
							rows={1}
						/>
						<TextField
							label="Content"
							value={noticeContent}
							onChange={(e) => setNoticeContent(e.target.value)}
							fullWidth
							variant="outlined"
							rows={4}
						/>
						<Button
							variant="contained"
							sx={{
								alignSelf: 'center',
								mt: 2,
								backgroundColor: 'blue', // Set background color to blue
								color: 'white', // Set text color to white for contrast
								width: '100%', // Make the button take full width of its container
								maxWidth: '150px', // Optional: Set a maximum width
								'&:hover': {
									backgroundColor: 'red', // Change background color on hover
								},
							}}
							onClick={handleCreateNotice}
						>
							Create
						</Button>
					</Box>
				</Paper>
				<Typography
					variant="h1"
					component="p"
					align="center"
					sx={{
						mt: 6,
						fontSize: '8rem', // Adjust the font size as needed
						fontFamily: 'Kalnia Glaze, serif', // Use the imported font
						color: '#ff5722', // Optional: adjust the color for better visibility
						textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)', // Optional: add text shadow for better visibility
						mb: 4,
						ml: '-20px', // Move the text 20px to the left
					}}
				>
					PureRide
				</Typography>
			</Container>
		</Box>
	);
};

export default NoticeCreate;
