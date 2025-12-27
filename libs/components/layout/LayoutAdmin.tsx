import type { ComponentType } from 'react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MenuList from '../admin/AdminMenuList';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Menu, MenuItem } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { getJwtToken, logOut, updateUserInfo } from '../../auth';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { REACT_APP_API_URL } from '../../config';
import { MemberType } from '../../enums/member.enum';
import { ThemeProvider, useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../admin/ThemeToggle';

const drawerWidth = 280;


const AdminLayoutInner: React.FC<{ Component: ComponentType; props: any }> = ({ Component, props }) => {
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const { colors } = useTheme();
	const [settingsState, setSettingsStateState] = useState(false);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	const [openMenu, setOpenMenu] = useState(false);
	const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
	const [title, setTitle] = useState('admin');
	const [loading, setLoading] = useState(true);

	/** LIFECYCLES **/
	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
		setLoading(false);
	}, []);

	useEffect(() => {
		if (!loading && user.memberType !== MemberType.ADMIN) {
			router.push('/').then();
		}
	}, [loading, user, router]);

	/** HANDLERS **/
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const logoutHandler = () => {
		logOut();
		router.push('/').then();
	};

	if (!user || user?.memberType !== MemberType.ADMIN) return null;

	return (
		<main id="pc-wrap" className="admin admin-layout">
			<Box component={'div'} sx={{ display: 'flex', minHeight: '100vh', background: colors.bgPrimary }}>
				<AppBar
					position="fixed"
					className="glass-header"
					sx={{
						width: `calc(100% - ${drawerWidth}px)`,
						ml: `${drawerWidth}px`,
						boxShadow: 'none',
						borderBottom: `1px solid ${colors.borderGlass}`,
						zIndex: (theme: any) => theme.zIndex.drawer + 1,
					}}
				>
					<Toolbar sx={{ justifyContent: 'space-between' }}>
						<Stack direction="row" alignItems="center" spacing={2}>
							<Typography variant="h5" className="admin-title" sx={{ color: colors.textPrimary }}>
								Command Center
							</Typography>
							<Box
								sx={{
									px: 1.5,
									py: 0.5,
									borderRadius: '8px',
									background: colors.bgSecondary,
									border: `1px solid ${colors.borderGlass}`,
								}}
							>
								<Typography variant="caption" sx={{ color: colors.textSecondary, fontWeight: 600 }}>
									v2.0
								</Typography>
							</Box>
						</Stack>
						
						<Stack direction="row" spacing={2} alignItems="center">
							<ThemeToggle />
							
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar
										src={
											user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'
										}
										sx={{ border: `2px solid ${colors.accentPrimary}` }}
									/>
								</IconButton>
							</Tooltip>
						</Stack>
						
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							className={'pop-menu'}
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
							PaperProps={{
								className: 'glass-card',
								sx: {
									background: colors.bgGlass,
									backdropFilter: 'blur(16px)',
									border: `1px solid ${colors.borderGlass}`,
									boxShadow: colors.shadowGlass,
								}
							}}
						>
							<Box
								component={'div'}
								onClick={handleCloseUserMenu}
								sx={{
									width: '200px',
								}}
							>
								<Stack sx={{ px: '20px', my: '12px' }}>
									<Typography variant={'h6'} component={'h6'} sx={{ mb: '4px', color: colors.textPrimary }}>
										{user?.memberNick}
									</Typography>
									<Typography variant={'subtitle1'} component={'p'} sx={{ color: colors.textSecondary }}>
										{user?.memberPhone}
									</Typography>
								</Stack>
								<Divider sx={{ borderColor: colors.borderGlass }} />
								<Box component={'div'} sx={{ p: 1, py: '6px' }} onClick={logoutHandler}>
									<MenuItem sx={{ px: '16px', py: '6px', borderRadius: '8px', '&:hover': { background: colors.bgSecondary } }}>
										<Typography variant={'subtitle1'} component={'span'} sx={{ color: colors.textPrimary }}>
											Logout
										</Typography>
									</MenuItem>
								</Box>
							</Box>
						</Menu>
					</Toolbar>
				</AppBar>

				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: drawerWidth,
							boxSizing: 'border-box',
							background: colors.bgGlass,
							backdropFilter: 'blur(20px)',
							borderRight: `1px solid ${colors.borderGlass}`,
							boxShadow: colors.shadowGlass,
						},
					}}
					variant="permanent"
					anchor="left"
					className="aside admin-sidebar glass-sidebar"
				>
					<Toolbar sx={{ flexDirection: 'column', alignItems: 'flexStart', p: 3 }}>
						<Stack className={'logo-box'} mb={4}>
							<img src={'/img/logo/PureRide.png'} alt={'logo'} style={{ height: '40px' }} />
						</Stack>

						<Stack
							className="user"
							direction={'row'}
							alignItems={'center'}
							sx={{
								width: '100%',
								bgcolor: colors.bgSecondary,
								borderRadius: '16px',
								p: 2,
								mb: 3,
								border: `1px solid ${colors.borderGlass}`,
							}}
						>
							<Avatar
								src={user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'}
								sx={{ width: 48, height: 48 }}
							/>
							<Box ml={2}>
								<Typography variant={'body2'} sx={{ color: colors.textPrimary, fontWeight: 600 }}>
									{user?.memberNick}
								</Typography>
								<Typography variant={'caption'} sx={{ color: colors.textSecondary }}>
									{user?.memberType}
								</Typography>
							</Box>
						</Stack>

						<Box sx={{ width: '100%' }}>
							<MenuList />
						</Box>
					</Toolbar>
				</Drawer>

				<Box component={'div'} id="bunker" className="admin-content" sx={{ 
					flexGrow: 1,
					background: colors.bgSecondary,
					minHeight: '100vh',
					pt: '80px', // Header height + spacing
					px: 3,
					pb: 3,
				}}>
					{/*@ts-ignore*/}
					<Component {...props} setSnackbar={setSnackbar} setTitle={setTitle} />
				</Box>
			</Box>
		</main>
	);
};

const withAdminLayout = (Component: ComponentType) => {
	return (props: object) => {
		return (
			<ThemeProvider>
				<AdminLayoutInner Component={Component} props={props} />
			</ThemeProvider>
		);
	};
};


export default withAdminLayout;
