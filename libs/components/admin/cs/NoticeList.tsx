import React from 'react';
import { useRouter } from 'next/router';
import {
	TableCell,
	TableHead,
	TableBody,
	TableRow,
	Table,
	TableContainer,
	Button,
	Checkbox,
	Toolbar,
	IconButton,
	Tooltip,
	Typography,
	Stack,
	Box,
	Menu,
	Fade,
	MenuItem,
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { NotePencil } from 'phosphor-react';
import { Notices } from '../../../types/cs-center/notice';
import { NoticeStatus } from '../../../enums/notice.enum';

type Order = 'asc' | 'desc';

interface Data {
	type: string;
	title: string;
	id: string;
	writer: string;
	date: string;
	view: number;
	action: string;
}

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{ id: 'type', numeric: false, disablePadding: false, label: 'Type' },
	{ id: 'title', numeric: false, disablePadding: false, label: 'Title' },
	{ id: 'id', numeric: false, disablePadding: false, label: 'ID' },
	{ id: 'writer', numeric: false, disablePadding: false, label: 'Writer' },
	{ id: 'date', numeric: false, disablePadding: false, label: 'Date' },
	{ id: 'view', numeric: true, disablePadding: false, label: 'Views' },
	{ id: 'action', numeric: false, disablePadding: false, label: 'Action' },
];

interface EnhancedTableToolbarProps {
	numSelected: number;
	order: Order;
	rowCount: number;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EnhancedTableToolbar = ({ numSelected, rowCount, onSelectAllClick }: EnhancedTableToolbarProps) => {
	return (
		<Toolbar>
			{numSelected > 0 ? (
				<Box component="div" className="flex_box">
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ 'aria-label': 'select all' }}
					/>
					<Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="h6" component="div">
						{numSelected} selected
					</Typography>
					<Button variant="text" size="large">
						Delete
					</Button>
				</Box>
			) : (
				<TableHead>
					<TableRow>
						<TableCell padding="checkbox" align="left">
							<Checkbox
								color="primary"
								indeterminate={numSelected > 0 && numSelected < rowCount}
								checked={rowCount > 0 && numSelected === rowCount}
								onChange={onSelectAllClick}
								inputProps={{ 'aria-label': 'select all' }}
							/>
						</TableCell>
						<TableCell align="center" sx={{ width: '12%', minWidth: '350px', ml: '100px' }}>
							Type
						</TableCell>

						<TableCell align="center" sx={{ width: '12%', minWidth: '450px', ml: '100px' }}>
							ID
						</TableCell>

						<TableCell align="center" sx={{ width: '12%', minWidth: '300px', ml: '100px' }}>
							Date
						</TableCell>

						<TableCell align="right" sx={{ width: '12%', minWidth: '380px', ml: '100px' }}>
							Action
						</TableCell>
					</TableRow>
				</TableHead>
			)}
		</Toolbar>
	);
};

interface NoticeListType {
	dense?: boolean;
	notices: Notices[];
	anchorEl?: any;
	menuIconClickHandler?: any;
	menuIconCloseHandler?: () => void;
	updateNoticeHandler?: (updateData: { _id: string; Status: string }) => void;
	removeNoticeHandler?: any;
}

export const NoticeList = (props: NoticeListType) => {
	const { notices, dense, anchorEl, menuIconCloseHandler, updateNoticeHandler, removeNoticeHandler } = props;
	const router = useRouter();
	console.log('notices:', notices);

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Logic to handle select all
	};

	return (
		<Stack>
			<TableContainer>
				<Table
					sx={{ minWidth: 750, tableLayout: 'fixed' }}
					aria-labelledby="tableTitle"
					size={dense ? 'small' : 'medium'}
				>
					<EnhancedTableToolbar
						numSelected={0} // Update as necessary
						rowCount={notices.length}
						onSelectAllClick={handleSelectAllClick}
						order={'asc'}
					/>
					<TableBody>
						{notices.length === 0 ? (
							<TableRow>
								<TableCell align="center" colSpan={headCells.length + 1}>
									<span className="no-data">Data not found!</span>
								</TableCell>
							</TableRow>
						) : (
							notices.map((notice: any) => (
								<TableRow hover key={notice._id}>
									<TableCell padding="checkbox">
										<Checkbox color="primary" />
									</TableCell>
									<TableCell align="left">{notice.noticeType}</TableCell>
									<TableCell align="left">{notice.noticeTitle}</TableCell>
									<TableCell align="left">{notice._id}</TableCell>
									<TableCell align="left">{notice.memberData?.memberNick}</TableCell>
									<TableCell align="left">{new Date(notice.createdAt).toLocaleDateString()}</TableCell>
									<TableCell align="right">{notice.noticeViews}</TableCell>
									<TableCell align="right">
										<Menu
											className="menu-modal"
											MenuListProps={{ 'aria-labelledby': 'fade-button' }}
											anchorEl={anchorEl ? anchorEl[notice._id] : null}
											open={Boolean(anchorEl?.[notice._id])}
											onClose={menuIconCloseHandler}
											TransitionComponent={Fade}
											sx={{ p: 1 }}
										>
											{Object.values(NoticeStatus)
												.filter((status) => status !== notice.noticeStatus)
												.map((status) => (
													<MenuItem
														onClick={() =>
															updateNoticeHandler && updateNoticeHandler({ _id: notice._id, Status: status })
														}
														key={status}
													>
														<Typography variant="subtitle1" component="span">
															{status}
														</Typography>
													</MenuItem>
												))}
										</Menu>
										<Tooltip title="Delete">
											<IconButton onClick={() => removeNoticeHandler && removeNoticeHandler(notice._id)}>
												<DeleteRoundedIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Edit">
											<IconButton onClick={() => router.push(`/_admin/cs/notice_create?id=${notice._id}`)}>
												<NotePencil size={24} weight="fill" />
											</IconButton>
										</Tooltip>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
