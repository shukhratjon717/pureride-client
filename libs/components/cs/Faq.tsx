import React, { SyntheticEvent, useState, useEffect } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { AccordionDetails, Box, Stack, Typography } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Notice } from '../../types/cs-center/notice';
import { useQuery } from '@apollo/client';
import { T } from '../../types/common';
import { NoticesInquiry } from '../../types/cs-center/notice.input';
import { GET_ALL_NOTICES_BY_ADMIN } from '../../../apollo/user/query';
import { FaqCategory } from '../../enums/faqCategory.enum';
import { NoticeCategory, NoticeStatus } from '../../enums/notice.enum';

interface FaqInput {
	_id: string;
	faqCategory: string;
	faqStatus: string;
	faqTitle: string;
	faqContent: string;
	faqViews: number;
	memberId: string;
	createdAt: string;
	updatedAt: string;
}

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
	}),
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1.4rem' }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#fff',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

interface FaqsProps {
	initialInput: NoticesInquiry;
}

const Faq = (props: FaqsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [category, setCategory] = useState<FaqCategory>();
	const [expanded, setExpanded] = useState<string | false>('panel1');
	const [faq, setFaq] = useState<Notice[]>([]);
	const [filteredFaqs, setFilteredFaqs] = useState<Notice[]>([]);

	/** APOLLO REQUESTS **/
	const {
		loading: getFaqLoading,
		data: getFaqData,
		error: getFaqError,
		refetch: getFaqRefetch,
	} = useQuery(GET_ALL_NOTICES_BY_ADMIN, {
		fetchPolicy: 'network-only',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			console.log('Data received:', data);
			setFaq(data?.getAllNoticesByAdmin?.list);
		},
		onError: (error) => {
			console.error('Error fetching data:', error);
		},
	});

	useEffect(() => {
		if (getFaqData) {
			console.log('FAQ data:', getFaqData);
			setFaq(getFaqData.getAllNoticesByAdmin.list);
		}
	}, [getFaqData]);

	/** HANDLERS **/
	const changeCategoryHandler = (category: FaqCategory) => {
		setCategory(category);
	};

	const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	if (device === 'mobile') {
		return <div>FAQ MOBILE</div>;
	} else {
		return (
			<Stack className={'faq-content'}>
				<Box className={'categories'} component={'div'}>
					<div
						className={category === FaqCategory.PRODUCT ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FaqCategory.PRODUCT);
						}}
					>
						Product
					</div>
					<div
						className={category === FaqCategory.PAYMENT ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FaqCategory.PAYMENT);
						}}
					>
						Payment
					</div>
					<div
						className={category === FaqCategory.BUYERS ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FaqCategory.BUYERS);
						}}
					>
						For Buyers
					</div>
					<div
						className={category === FaqCategory.AGENTS ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FaqCategory.AGENTS);
						}}
					>
						For Agents
					</div>
					<div
						className={category === FaqCategory.MEMBERSHIP ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FaqCategory.MEMBERSHIP);
						}}
					>
						Membership
					</div>
					<div
						className={category === FaqCategory.COMMUNITY ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FaqCategory.COMMUNITY);
						}}
					>
						Community
					</div>
					<div
						className={category === FaqCategory.OTHER ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler(FaqCategory.OTHER);
						}}
					>
						Other
					</div>
				</Box>
				<Box className={'wrap'} component={'div'}>
					{faq &&
						faq.map((ele: Notice) => (
							<Accordion expanded={expanded === ele?._id} onChange={handleChange(ele?._id)} key={ele?._id}>
								<AccordionSummary
									id={`panel${ele?._id}-header`}
									className="question"
									aria-controls={`panel${ele?._id}-content`}
								>
									<Typography className="badge" variant={'h4'}>
										Q
									</Typography>
									<Typography> {ele?.noticeTitle}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Stack className={'answer flex-box'}>
										<Typography className="badge" variant={'h4'} color={'primary'}>
											A
										</Typography>
										<Typography> {ele?.noticeContent}</Typography>
									</Stack>
								</AccordionDetails>
							</Accordion>
						))}
				</Box>
			</Stack>
		);
	}
};

Faq.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'createdAt',
		direction: 'DESC',
		search: {
			noticeCategory: NoticeCategory.FAQ,
			noticeStatus: NoticeStatus.ACTIVE,
		},
	},
};

export default Faq;
