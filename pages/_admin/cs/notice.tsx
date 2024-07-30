import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, Button, InputAdornment, Stack } from '@mui/material';
import { List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TabContext } from '@mui/lab';
import OutlinedInput from '@mui/material/OutlinedInput';
import TablePagination from '@mui/material/TablePagination';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { NoticeList } from '../../../libs/components/admin/cs/NoticeList';
import { Notices } from '../../../libs/types/cs-center/notice';
import { NoticesInquiry } from '../../../libs/types/cs-center/notice.input';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_NOTICE_BY_ADMIN, UPDATE_NOTICE_BY_ADMIN } from '../../../apollo/admin/mutation';
import { T } from '../../../libs/types/common';
import { GET_ALL_NOTICES_BY_ADMIN } from '../../../apollo/admin/query';
import { NoticeType } from '../../../libs/enums/notice.enum';
import { NoticeUpdate } from '../../../libs/types/cs-center/notice.update';
import { sweetConfirmAlert, sweetErrorHandling } from '../../../libs/sweetAlert';
import Notice from '../../../libs/components/cs/Notice';

const AdminNotice: NextPage = ({ initialInquiry, ...props }: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const router = useRouter();
	const [noticesInquiry, setNoticesInquiry] = useState<NoticesInquiry>(initialInquiry);
	const [type, setType] = useState<string>('PROMOTION');
	const [value, setValue] = useState('ALL');
	const [searchText, setSearchText] = useState('');
	const [searchType, setSearchType] = useState('ALL');

	const [notices, setNotices] = useState<Notices[]>([]);
	const [total, setTotal] = useState<number>(0);
	const dense = false;

	/** APOLLO REQUESTS **/
	const [updateNoticeByAdmin] = useMutation(UPDATE_NOTICE_BY_ADMIN, {
		onError: (error) => {
			router.push('/_error');
		},
	});

	const [deleteNoticeByAdmin] = useMutation(REMOVE_NOTICE_BY_ADMIN, {
		onError: (error) => {
			router.push('/_error');
		},
	});

	const {
		loading: getNoticesLoading,
		data: getNoticesData,
		error: getNoticeError,
		refetch: getNoticesRefetch,
	} = useQuery(GET_ALL_NOTICES_BY_ADMIN, {
		fetchPolicy: 'network-only',
		variables: { input: { ...noticesInquiry } },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNotices(data?.getAllNoticesByAdmin?.list || []);
			setTotal(data?.getAllNoticesByAdmin?.metaCounter?.total || 0);
		},
	});

	if (getNoticeError) {
		router.push('/_error');
	}

	/** LIFECYCLES **/
	useEffect(() => {
		getNoticesRefetch({ input: noticesInquiry }).then();
	}, [noticesInquiry, getNoticesRefetch]);

	/** HANDLERS **/

	const menuIconClickHandler = (e: any, index: number) => {
		const tempAnchor = anchorEl.slice();
		tempAnchor[index] = e.currentTarget;
		setAnchorEl(tempAnchor);
	};

	const menuIconCloseHandler = () => {
		setAnchorEl([]);
	};

	const textHandler = useCallback((value: string) => {
		try {
			setSearchText(value);
		} catch (err: any) {
			console.log('textHandler: ', err.message);
		}
	}, []);

	const searchTextHandler = () => {
		try {
			setNoticesInquiry({
				...noticesInquiry,
				text: searchText,
			});
		} catch (err: any) {
			console.log('searchTextHandler: ', err.message);
		}
	};

	const handleTabChange = async (event: any, newValue: string) => {
		setValue(newValue);

		setNoticesInquiry({ ...noticesInquiry, page: 1, sort: 'createdAt' });
		switch (newValue) {
			case 'PROMOTION':
				setNoticesInquiry({ ...noticesInquiry, noticeType: NoticeType.PROMOTION });
				break;
			case 'GENERAL_ANNOUNCEMENT':
				setNoticesInquiry({ ...noticesInquiry, noticeType: NoticeType.GENERAL_ANNOUNCEMENT });
				break;
			case 'LEGAL_POLICY':
				setNoticesInquiry({ ...noticesInquiry, noticeType: NoticeType.LEGAL_POLICY });
				break;
			case 'MAINTENANCE':
				setNoticesInquiry({ ...noticesInquiry, noticeType: NoticeType.MAINTENANCE });
				break;
			case 'NEW_ARRIVAL':
				setNoticesInquiry({ ...noticesInquiry, noticeType: NoticeType.NEW_ARRIVAL });
				break;
			case 'SAFETY':
				setNoticesInquiry({ ...noticesInquiry, noticeType: NoticeType.SAFETY });
				break;
			case 'WEBSITE_UPDATE':
				setNoticesInquiry({ ...noticesInquiry, noticeType: NoticeType.WEBSITE_UPDATE });
				break;
			default:
				delete noticesInquiry?.noticeType;
				setNoticesInquiry({ ...noticesInquiry });
				break;
		}
	};

	const removeNoticeHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure to remove?')) {
				await deleteNoticeByAdmin({
					variables: {
						input: id,
					},
				});

				await getNoticesRefetch({ input: noticesInquiry });
			}
			menuIconCloseHandler();
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const searchTypeHandler = async (newValue: string) => {
		try {
			setSearchType(newValue);

			if (newValue !== 'ALL') {
				setNoticesInquiry({
					...noticesInquiry,
					page: 1,
					sort: 'createdAt',
					noticeType: newValue.toUpperCase() as NoticeType,
				});
			} else {
				delete noticesInquiry?.noticeType;
				setNoticesInquiry({ ...noticesInquiry });
			}
		} catch (err: any) {
			console.log('searchTypeHandler: ', err.message);
		}
	};

	const updateNoticeHandler = async (updateData: NoticeUpdate) => {
		try {
			await updateNoticeByAdmin({
				variables: {
					input: updateData,
				},
			});
			menuIconCloseHandler();
			await getNoticesRefetch({ input: noticesInquiry });
		} catch (err: any) {
			menuIconCloseHandler();
			sweetErrorHandling(err).then();
		}
	};

	return (
		// @ts-ignore
		<Box component={'div'} className={'content'}>
			<Box component={'div'} className={'title flex_space'}>
				<Typography variant={'h2'}>Notice Management</Typography>
				<Button
					className="btn_add"
					variant={'contained'}
					size={'medium'}
					onClick={() => router.push(`/_admin/cs/notice_create`)}
				>
					<AddRoundedIcon sx={{ mr: '8px' }} />
					ADD
				</Button>
			</Box>
			<Box component={'div'} className={'table-wrap'}>
				<Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={value}>
						<Box component={'div'}>
							<List className={'tab-menu'}>
								<ListItem
									onClick={(e: any) => handleTabChange(e, 'ALL')}
									value="ALL"
									className={value === 'ALL' ? 'li on' : 'li'}
								>
									All (0)
								</ListItem>
								<ListItem
									onClick={(e: any) => handleTabChange(e, 'ACTIVE')}
									value="ACTIVE"
									className={value === 'ACTIVE' ? 'li on' : 'li'}
								>
									Active (0)
								</ListItem>
								<ListItem
									onClick={(e: any) => handleTabChange(e, 'BLOCKED')}
									value="BLOCKED"
									className={value === 'BLOCKED' ? 'li on' : 'li'}
								>
									Blocked (0)
								</ListItem>
								<ListItem
									onClick={(e: any) => handleTabChange(e, 'DELETED')}
									value="DELETED"
									className={value === 'DELETED' ? 'li on' : 'li'}
								>
									Deleted (0)
								</ListItem>
							</List>
							<Divider />
							<Stack className={'search-area'} sx={{ m: '24px' }}>
								<Select sx={{ width: '160px', mr: '20px' }} value={searchType}>
									<MenuItem value={'ALL'} onClick={() => searchTypeHandler('ALL')}>
										Notice type
									</MenuItem>
									{Object.values(NoticeType).map((type: string) => (
										<MenuItem value={type} onClick={() => searchTypeHandler(type)} key={type}>
											{type}
										</MenuItem>
									))}
								</Select>

								<OutlinedInput
									value={searchText}
									onChange={(e) => textHandler(e.target.value)}
									sx={{ width: '100%' }}
									className={'search'}
									placeholder="Search notice"
									onKeyDown={(event) => {
										if (event.key === 'Enter') searchTextHandler();
									}}
									endAdornment={
										<>
											{searchText && <CancelRoundedIcon onClick={() => setSearchText('')} />}
											<InputAdornment position="end" onClick={searchTextHandler}>
												<img src="/img/icons/search_icon.png" alt={'searchIcon'} />
											</InputAdornment>
										</>
									}
								/>
							</Stack>
							<Divider />
						</Box>
						<NoticeList
							dense={dense}
							notices={notices} // handleMenuIconClick={menuIconClickHandler}
							anchorEl={anchorEl}
							menuIconClickHandler={menuIconClickHandler}
							menuIconCloseHandler={menuIconCloseHandler}
							updateNoticeHandler={updateNoticeHandler}
							removeNoticeHandler={removeNoticeHandler}
						/>
					</TabContext>
				</Box>
			</Box>
		</Box>
	);
};

AdminNotice.defaultProps = {
	initialInquiry: {
		page: 1,
		limit: 10,
		// noticeType: '',
	},
};

export default withAdminLayout(AdminNotice);
