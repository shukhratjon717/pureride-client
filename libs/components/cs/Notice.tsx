import React, { useEffect, useState } from 'react';
import {
	Stack,
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	styled,
} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { GET_NOTICES } from '../../../apollo/user/query';
import { NextPage } from 'next';
import { T } from '../../types/common';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { NoticeType } from '../../enums/notice.enum';

interface NoticesListProps {
	initialInput?: {
		page?: number;
		limit?: number;
	};
}

const formatDate = (dateString: string | number | Date) => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}.${month}.${day}`;
};

// Define the props for NoticeTypeSpan
interface NoticeTypeSpanProps {
	noticeType: NoticeType;
}

interface Notice {
	_id: string;
	noticeType: NoticeType;
	noticeContent: string;
	createdAt: string;
}

interface NoticeTableProps {
	notices: Notice[];
}

const NoticesList: NextPage<NoticesListProps> = ({ initialInput }) => {
	const device = useDeviceDetect();
	const [notices, setNotices] = useState<Notice[]>([]);
	const [total, setTotal] = useState<number>(0);
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState<number>(initialInput?.page || 1);

	/** APOLLO REQUESTS **/
	const {
		loading: getNoticesLoading,
		data: getNoticesData,
		refetch: getNoticesRefetch,
		error: getNoticesError,
	} = useQuery(GET_NOTICES, {
		fetchPolicy: 'network-only', // by default cache-first
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNotices(data?.getAllNoticesByAdmin?.list || []);
			setTotal(data?.getAllNoticesByAdmin?.metaCounter[0]?.total || 0);
		},
	});

	if (getNoticesError) {
		router.push('/_error');
	}

	/** LIFECYCLES **/
	useEffect(() => {
		if (router.query.input) {
			const inputObj = JSON.parse(router.query.input as string);
			setCurrentPage(inputObj.page || 1);
		}
	}, [router.query.input]);

	useEffect(() => {
		getNoticesRefetch({ input: { ...initialInput, page: currentPage } });
	}, [currentPage, getNoticesRefetch, initialInput]);

	// Styled component for NoticeType with conditional styles
	const NoticeTypeSpan = styled('span', {
		shouldForwardProp: (prop) => prop !== 'noticeType',
	})<NoticeTypeSpanProps>(({ noticeType }) => {
		const commonStyles = {
			padding: '5px 10px',
			border: '1px solid',
			borderRadius: '15px',
		};

		const typeStyles = {
			[NoticeType.PROMOTION]: {
				...commonStyles,
				borderColor: '#d31a1a',
				color: '#d31a1a',
			},
			[NoticeType.NEW_ARRIVAL]: {
				...commonStyles,
				borderColor: '#1a73e8',
				color: '#1a73e8',
			},
			[NoticeType.MAINTENANCE]: {
				...commonStyles,
				borderColor: '#ff9800',
				color: '#ff9800',
			},
			[NoticeType.SAFETY]: {
				...commonStyles,
				borderColor: '#4caf50',
				color: '#4caf50',
			},
			[NoticeType.WEBSITE_UPDATE]: {
				...commonStyles,
				borderColor: '#9c27b0',
				color: '#9c27b0',
			},
			[NoticeType.LEGAL_POLICY]: {
				...commonStyles,
				borderColor: '#ff5722',
				color: '#ff5722',
			},
			[NoticeType.GENERAL_ANNOUNCEMENT]: {
				...commonStyles,
				borderColor: '#795548',
				color: '#795548',
			},
		};

		return typeStyles[noticeType] || {};
	});

	if (device === 'mobile') {
		return <div>NOTICE MOBILE</div>;
	} else {
		return (
			<TableContainer component={Paper} className="notice-container">
				<Table>
					<TableHead>
						<TableRow>
							<TableCell className="notice-order" style={{ width: '50px' }}>
								No
							</TableCell>
							<TableCell className="notice-type" style={{ width: '240px' }}>
								Type
							</TableCell>
							<TableCell className="notice-content">Content</TableCell>
							<TableCell className="notice-date" style={{ width: '100px' }}>
								Date
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{notices.map((notice, id) => (
							<TableRow key={notice._id}>
								<TableCell>{id + 1}</TableCell>
								<TableCell>
									<NoticeTypeSpan noticeType={notice.noticeType}>{notice.noticeType}</NoticeTypeSpan>
								</TableCell>
								<TableCell>{notice.noticeContent}</TableCell>
								<TableCell>{formatDate(notice.createdAt)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
};

NoticesList.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
	},
};

export default NoticesList;
