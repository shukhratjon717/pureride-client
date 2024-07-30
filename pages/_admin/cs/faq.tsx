import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { NextPage } from 'next';
import { Box, Button, TablePagination, Typography } from '@mui/material';
import { FaqArticlesPanelList } from '../../../libs/components/admin/cs/FaqList';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { GET_ALL_FAQ_BY_ADMIN } from '../../../apollo/admin/query';
import { REMOVE_FAQ_BY_ADMIN, UPDATE_FAQ_BY_ADMIN } from '../../../apollo/admin/mutation';
import AddIcon from '@mui/icons-material/Add';
import router from 'next/router';

interface FaqsListProps {
	initialInput?: {
		page?: number;
		limit?: number;
		faqType?: string;
	};
}

const FaqArticles: NextPage<FaqsListProps> = ({ initialInput }) => {
	const [anchorEl, setAnchorEl] = useState<{}>({});
	const [type, setType] = useState<string>('PRODUCT');

	const [searchFilter, setSearchFilter] = useState<any>(
		router?.query?.input ? JSON.parse(router?.query?.input as string) : initialInput,
	);

	const [faqs, setFaqs] = useState<any[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [page, setPage] = useState<number>(initialInput?.page || 1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(initialInput?.limit || 9);

	const {
		loading: getFaqsLoading,
		data: getFaqsData,
		refetch: getFaqsRefetch,
		error: getFaqsError,
	} = useQuery(GET_ALL_FAQ_BY_ADMIN, {
		fetchPolicy: 'network-only',
		variables: { input: { page, limit: rowsPerPage, faqType: type.toUpperCase() } },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data) => {
			setFaqs(data.getFaqs.list || []);
			setTotal(data.getFaqs.metaCounter[0]?.total || 0);
		},
	});

	const [updateFaqStatus] = useMutation(UPDATE_FAQ_BY_ADMIN);
	const [removeFaq] = useMutation(REMOVE_FAQ_BY_ADMIN);

	useEffect(() => {
		if (getFaqsData) {
			setFaqs(getFaqsData.getFaqs.list || []);
		}
	}, [getFaqsData]);

	const handleMenuIconClick = (event: any, id: string) => {
		setAnchorEl({ ...anchorEl, [id]: event.currentTarget });
	};

	const handleMenuIconClose = (id: string) => {
		setAnchorEl({ ...anchorEl, [id]: null });
	};

	const handleUpdateFaq = async ({ _id, faqStatus }: { _id: string; faqStatus: string }) => {
		try {
			const { data } = await updateFaqStatus({ variables: { id: _id, status: faqStatus } });
			console.log('Updated FAQ:', data);
			setFaqs((prevFaqs) => prevFaqs.map((faq) => (faq._id === _id ? { ...faq, faqStatus } : faq)));
			handleMenuIconClose(_id);
		} catch (error) {
			console.error('Error updating FAQ status:', error);
		}
	};

	const handleRemoveFaq = async (id: string) => {
		try {
			await removeFaq({ variables: { id } });
			setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq._id !== id));
		} catch (error) {
			console.error('Error removing FAQ:', error);
		}
	};

	const handlePageChange = (event: unknown, newPage: number) => {
		setPage(newPage + 1);
		getFaqsRefetch({ input: { page: newPage + 1, limit: rowsPerPage, faqType: type.toUpperCase() } });
	};

	const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newLimit = parseInt(event.target.value, 10);
		setRowsPerPage(newLimit);
		setPage(1);
		getFaqsRefetch({ input: { page: 1, limit: newLimit, faqType: type.toUpperCase() } });
	};

	const handleAddButtonClick = () => {
		router.push('/_admin/cs/faq_create');
	};

	if (getFaqsLoading) return <p>Loading...</p>;
	if (getFaqsError) return <p>Error loading FAQs</p>;

	return (
		<Box component={'div'} className={'content'}>
			<Box component={'div'} className={'title flex_space'}>
				<Typography variant={'h2'}>FAQ Management</Typography>
				<Button className="btn_add" variant={'contained'} size={'medium'} onClick={handleAddButtonClick}>
					<AddIcon sx={{ mr: '8px' }} />
					ADD
				</Button>
			</Box>
			<Box component={'div'} className={'table-wrap'}>
				<Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
					<FaqArticlesPanelList
						faqs={faqs}
						anchorEl={anchorEl}
						menuIconClickHandler={handleMenuIconClick}
						menuIconCloseHandler={handleMenuIconClose}
						updateFaqHandler={handleUpdateFaq}
						removeFaqHandler={handleRemoveFaq}
					/>
					<TablePagination
						rowsPerPageOptions={[10, 20, 30]}
						component="div"
						count={total}
						rowsPerPage={rowsPerPage}
						page={page - 1}
						onPageChange={handlePageChange}
						onRowsPerPageChange={handleRowsPerPageChange}
					/>
				</Box>
			</Box>
		</Box>
	);
};

FaqArticles.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		faqType: 'PRODUCT',
	},
};

export default withAdminLayout(FaqArticles);
