import React, { useState } from 'react';
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
import {
	GET_ALL_NOTICES_BY_ADMIN,
	REMOVE_NOTICES_BY_ADMIN,
	UPDATE_NOTICES_BY_ADMIN,
} from '../../../apollo/admin/mutation';
import { T } from '../../../libs/types/common';

const AdminNotice: NextPage = ({ initialInquiry, ...props }: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const router = useRouter();
	const [faqsInquiry, setFaqsInquiry] = useState<NoticesInquiry>(initialInquiry);
	const [type, setType] = useState<string>('PRODUCT');

	const [faqsTotal, setFaqsTotal] = useState<number>(0);
	const [value, setValue] = useState('ALL');
	const [searchType, setSearchType] = useState('ALL');
	const [searchText, setSearchText] = useState('');

	const [faqs, setFaqs] = useState<Notices[]>([]);
	const [total, setTotal] = useState<number>(0);
	const dense = false;
	/** APOLLO REQUESTS **/
	const [updateNoticeByAdmin, { error: createError }] = useMutation(UPDATE_NOTICES_BY_ADMIN, {
		onError: (error) => {
			router.push('/_error');
		},
	});

	const [deleteFaqByAdmin, { error: createDeleteError }] = useMutation(REMOVE_NOTICES_BY_ADMIN, {
		onError: (error) => {
			router.push('/_error');
		},
	});

	const {
		loading: getFaqsLoading,
		data: getFaqsData,
		refetch: getFaqsRefetch,
		error: getFaqsError,
	} = useQuery(GET_ALL_NOTICES_BY_ADMIN, {
		fetchPolicy: 'network-only', // by default cache-first
		variables: { input: { ...faqsInquiry, faqType: type.toUpperCase() } },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setFaqs(data?.getFaqs?.list || []);
			setTotal(data?.getFaqs?.metaCounter[0]?.total || 0);
		},
	});

	if (getFaqsError) {
		router.push('/_error');
	}

	/** LIFECYCLES **/
	/** HANDLERS **/

	return (
		// @ts-ignore
		<Box component={'div'} className={'content'}>
			<Box component={'div'} className={'title flex_space'}>
				<Typography variant={'h2'}>Notice Management</Typography>
				<Button
					className="btn_add"
					variant={'contained'}
					size={'medium'}
					// onClick={() => router.push(`/_admin/cs/faq_create`)}
				>
					<AddRoundedIcon sx={{ mr: '8px' }} />
					ADD
				</Button>
			</Box>
			<Box component={'div'} className={'table-wrap'}>
				<Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={'value'}>
						<Box component={'div'}>
							<List className={'tab-menu'}>
								<ListItem
									// onClick={(e) => handleTabChange(e, 'all')}
									value="all"
									className={'all' === 'all' ? 'li on' : 'li'}
								>
									All (0)
								</ListItem>
								<ListItem
									// onClick={(e) => handleTabChange(e, 'active')}
									value="active"
									className={'all' === 'all' ? 'li on' : 'li'}
								>
									Active (0)
								</ListItem>
								<ListItem
									// onClick={(e) => handleTabChange(e, 'blocked')}
									value="blocked"
									className={'all' === 'all' ? 'li on' : 'li'}
								>
									Blocked (0)
								</ListItem>
								<ListItem
									// onClick={(e) => handleTabChange(e, 'deleted')}
									value="deleted"
									className={'all' === 'all' ? 'li on' : 'li'}
								>
									Deleted (0)
								</ListItem>
							</List>
							<Divider />
							<Stack className={'search-area'} sx={{ m: '24px' }}>
								<Select sx={{ width: '160px', mr: '20px' }} value={'searchCategory'}>
									<MenuItem value={'mb_nick'}>mb_nick</MenuItem>
									<MenuItem value={'mb_id'}>mb_id</MenuItem>
								</Select>

								<OutlinedInput
									value={'searchInput'}
									// onChange={(e) => handleInput(e.target.value)}
									sx={{ width: '100%' }}
									className={'search'}
									placeholder="Search user name"
									onKeyDown={(event) => {
										// if (event.key == 'Enter') searchTargetHandler().then();
									}}
									endAdornment={
										<>
											{true && <CancelRoundedIcon onClick={() => {}} />}
											<InputAdornment position="end" onClick={() => {}}>
												<img src="/img/icons/search_icon.png" alt={'searchIcon'} />
											</InputAdornment>
										</>
									}
								/>
							</Stack>
							<Divider />
						</Box>
						<NoticeList
							// dense={dense}
							// membersData={membersData}
							// searchMembers={searchMembers}
							anchorEl={anchorEl}
							// handleMenuIconClick={handleMenuIconClick}
							// handleMenuIconClose={handleMenuIconClose}
							// generateMentorTypeHandle={generateMentorTypeHandle}
						/>

						<TablePagination
							rowsPerPageOptions={[20, 40, 60]}
							component="div"
							count={4}
							rowsPerPage={10}
							page={1}
							onPageChange={() => {}}
							onRowsPerPageChange={() => {}}
						/>
					</TabContext>
				</Box>
			</Box>
		</Box>
	);
};

export default withAdminLayout(AdminNotice);
