import React, { useState } from 'react';
import { useMutation, ApolloError } from '@apollo/client';
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
import { CREATE_FAQ_BY_ADMIN } from '../../../apollo/admin/mutation';
import { useRouter } from 'next/router';

const FaqCreate: NextPage = () => {
	const [faqType, setFaqType] = useState<string>('');
	const [faqQuestion, setFaqQuestion] = useState<string>('');
	const [faqAnswer, setFaqAnswer] = useState<string>('');
	const [createFaq] = useMutation(CREATE_FAQ_BY_ADMIN);
	const router = useRouter();

	const handleCreateFaq = async () => {
		if (!faqType || !faqQuestion || !faqAnswer) {
			alert('Please fill in all fields.');
			return;
		}
		try {
			const { data, errors } = await createFaq({
				variables: {
					input: {
						faqType,
						faqQuestion,
						faqAnswer,
						faqStatus: 'ACTIVE',
					},
				},
			});

			if (errors) {
				console.error('GraphQL errors:', errors);
				alert('Failed to create FAQ due to server-side errors.');
				return;
			}

			console.log('FAQ created successfully:', data);
			router.push('/_admin/cs/faq');
		} catch (error) {
			if (error instanceof ApolloError) {
				// Log more detailed information about the error
				console.error('ApolloError:', error.message);
				console.error('GraphQL error details:', error.graphQLErrors);
				console.error('Network error details:', error.networkError);
				alert(`GraphQL error: ${error.message}`);
			} else {
				console.error('Unexpected error:', error);
				alert(`Unexpected error: ${error}`);
			}
		}
	};

	return (
		<Box
			sx={{
				backgroundImage: `url('/img/banner/cmdetail.jpg')`,
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
				<Paper
					elevation={6}
					sx={{
						p: 4,
						backgroundColor: 'rgba(255, 255, 255, 0.9)',
						borderRadius: 2,
					}}
				>
					<Typography
						variant="h4"
						component="h1"
						gutterBottom
						align="center"
						sx={{ mb: 3 }}
					>
						Create New FAQ
					</Typography>
					<Box
						component="form"
						sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
					>
						<FormControl fullWidth variant="outlined">
							<InputLabel id="faq-type-label">FAQ Type</InputLabel>
							<Select
								labelId="faq-type-label"
								value={faqType}
								onChange={(e) =>
									setFaqType(e.target.value as string)
								}
								label="FAQ Type"
							>
								<MenuItem value="PRODUCT">PRODUCT</MenuItem>
								<MenuItem value="PAYMENT">PAYMENT</MenuItem>
								<MenuItem value="BUYERS">BUYERS</MenuItem>
								<MenuItem value="AGENTS">AGENTS</MenuItem>
								<MenuItem value="MEMBERSHIP">
									MEMBERSHIP
								</MenuItem>
								<MenuItem value="COMMUNITY">COMMUNITY</MenuItem>
								<MenuItem value="OTHER">OTHER</MenuItem>
							</Select>
						</FormControl>
						<TextField
							label="Question"
							value={faqQuestion}
							onChange={(e) =>
								setFaqQuestion(e.target.value)
							}
							fullWidth
							variant="outlined"
							multiline
							rows={4}
						/>
						<TextField
							label="Answer"
							value={faqAnswer}
							onChange={(e) => setFaqAnswer(e.target.value)}
							fullWidth
							variant="outlined"
							multiline
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
							onClick={handleCreateFaq}
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
						textShadow:
							'3px 3px 6px rgba(0, 0, 0, 0.3)', // Optional: add text shadow for better visibility
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

export default FaqCreate;
