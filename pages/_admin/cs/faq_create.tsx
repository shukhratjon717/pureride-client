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
import { CREATE_FAQ_BY_ADMIN } from '../../../apollo/admin/mutation';
import { useRouter } from 'next/router';
import { ApolloError } from '@apollo/client';

const FaqCreate: NextPage = () => {
	const [faqType, setFaqType] = useState<string>('');
	const [faqQuestion, setFaqQuestion] = useState<string>('');
	const [faqAnswer, setFaqAnswer] = useState<string>('');
	const [createFaq, { error, loading }] = useMutation(CREATE_FAQ_BY_ADMIN);
	const router = useRouter();

	const handleCreateFaq = async () => {
		if (!faqType || !faqQuestion || !faqAnswer) {
			alert('Please fill in all fields.');
			return;
		}
		try {
			const { data } = await createFaq({
				variables: {
					input: {
						faqType,
						faqQuestion,
						faqAnswer,
						faqStatus: 'ACTIVE',
					},
				},
			});
			console.log('FAQ created successfully:', data);
			router.push('/_admin/cs/faq');
		} catch (error) {
			if (error instanceof ApolloError) {
				console.error('GraphQL Error:', error.message);
			} else {
				console.error('Unexpected Error:', error);
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
				<Paper elevation={6} sx={{ p: 4, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2 }}>
					<Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
						Create New FAQ
					</Typography>
					<Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
						<FormControl fullWidth variant="outlined">
							<InputLabel id="faq-type-label">FAQ Type</InputLabel>
							<Select
								labelId="faq-type-label"
								value={faqType}
								onChange={(e) => setFaqType(e.target.value)}
								label="FAQ Type"
							>
								<MenuItem value="PRODUCT">PRODUCT</MenuItem>
								<MenuItem value="PAYMENT">PAYMENT</MenuItem>
								<MenuItem value="BUYERS">BUYERS</MenuItem>
								<MenuItem value="AGENTS">AGENTS</MenuItem>
								<MenuItem value="MEMBERSHIP">MEMBERSHIP</MenuItem>
								<MenuItem value="COMMUNITY">COMMUNITY</MenuItem>
								<MenuItem value="OTHER">OTHER</MenuItem>
							</Select>
						</FormControl>
						<TextField
							label="Question"
							value={faqQuestion}
							onChange={(e) => setFaqQuestion(e.target.value)}
							fullWidth
							variant="outlined"
							rows={4}
						/>
						<TextField
							label="Answer"
							value={faqAnswer}
							onChange={(e) => setFaqAnswer(e.target.value)}
							fullWidth
							variant="outlined"
							rows={4}
						/>
						<Button
							variant="contained"
							sx={{
								alignSelf: 'center',
								mt: 2,
								backgroundColor: 'blue',
								color: 'white',
								width: '100%',
								maxWidth: '150px',
								'&:hover': {
									backgroundColor: 'red',
								},
							}}
							onClick={handleCreateFaq}
							disabled={loading} // Disable button while loading
						>
							{loading ? 'Creating...' : 'Create'}
						</Button>
						{error && (
							<Typography color="error" align="center" sx={{ mt: 2 }}>
								An error occurred: {error.message}
							</Typography>
						)}
					</Box>
				</Paper>
				<Typography
					variant="h1"
					component="p"
					align="center"
					sx={{
						mt: 6,
						fontSize: '8rem',
						fontFamily: 'Kalnia Glaze, serif',
						color: '#ff5722',
						textShadow: '3px 3px 6px rgba(0, 0, 0, 0.3)',
						mb: 4,
						ml: '-20px',
					}}
				>
					PureRide
				</Typography>
			</Container>
		</Box>
	);
};

export default FaqCreate;
