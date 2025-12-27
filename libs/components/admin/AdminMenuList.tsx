import React, { useEffect, useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import Link from 'next/link';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ChatsCircle, Gauge, Headset, User, UserCircleGear } from 'phosphor-react';
import cookies from 'js-cookie';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useTheme } from '../../context/ThemeContext';

const AdminMenuList = (props: any) => {
	const router = useRouter();
	const device = useDeviceDetect();
	const [mobileLayout, setMobileLayout] = useState(false);
	const [openSubMenu, setOpenSubMenu] = useState('Users');
	const [openMenu, setOpenMenu] = useState(typeof window === 'object' ? cookies.get('admin_menu') === 'true' : false);
	const [clickMenu, setClickMenu] = useState<any>([]);
	const [clickSubMenu, setClickSubMenu] = useState('');

	const { colors } = useTheme();

	const {
		router: { pathname },
	} = props;

	const pathnames = pathname.split('/').filter((x: any) => x);

	/** LIFECYCLES **/
	useEffect(() => {
		if (device === 'mobile') setMobileLayout(true);

		switch (pathnames[1]) {
			case 'dashboard':
				setClickMenu(['Dashboard']);
				break;
			case 'properties':
				setClickMenu(['Products']);
				break;
			case 'community':
				setClickMenu(['Community']);
				break;
			case 'cs':
				setClickMenu(['Cs']);
				break;
			default:
				setClickMenu(['Users']);
				break;
		}

		switch (pathnames[2]) {
			case 'logs':
				setClickSubMenu('Logs');
				break;
			case 'inquiry':
				setClickSubMenu('1:1 Inquiry');
				break;
			case 'notice':
				setClickSubMenu('Notice');
				break;
			case 'faq':
				setClickSubMenu('FAQ');
				break;
			case 'board_create':
				setClickSubMenu('Board Create');
				break;
			default:
				setClickSubMenu('List');
				break;
		}
	}, []);

	/** HANDLERS **/
	const subMenuChangeHandler = (target: string) => {
		if (clickMenu.find((item: string) => item === target)) {
			// setOpenSubMenu('');
			setClickMenu(clickMenu.filter((menu: string) => target !== menu));
		} else {
			// setOpenSubMenu(target);
			setClickMenu([...clickMenu, target]);
		}
	};

	const menu_set = [
		{
			title: 'Dashboard',
			icon: <Gauge size={20} weight="fill" />,
			on_click: () => subMenuChangeHandler('Dashboard'),
		},
		{
			title: 'Users',
			icon: <User size={20} weight="fill" />,
			on_click: () => subMenuChangeHandler('Users'),
		},
		{
			title: 'Products',
			icon: <UserCircleGear size={20} weight="fill" />,
			on_click: () => subMenuChangeHandler('Products'),
		},
		{
			title: 'Community',
			icon: <ChatsCircle size={20} weight="fill" />,
			on_click: () => subMenuChangeHandler('Community'),
		},
		{
			title: 'Cs',
			icon: <Headset size={20} weight="fill" />,
			on_click: () => subMenuChangeHandler('Cs'),
		},
	];

	const sub_menu_set: any = {
		Dashboard: [{ title: 'Home', url: '/_admin/dashboard' }],
		Users: [{ title: 'List', url: '/_admin/users' }],
		Products: [{ title: 'List', url: '/_admin/properties' }],
		Community: [{ title: 'List', url: '/_admin/community' }],
		Cs: [
			{ title: 'FAQ', url: '/_admin/cs/faq' },
			{ title: 'Notice', url: '/_admin/cs/notice' },
		],
	};

	return (
		<>
			{menu_set.map((item, index) => {
				const isActive = clickMenu[0] === item.title;
				return (
					<List className={'menu_wrap'} key={index} disablePadding sx={{ mb: 1 }}>
						<ListItemButton
							onClick={item.on_click}
							component={'li'}
							className={`glass-card-hover ${isActive ? 'menu on' : 'menu'}`}
							sx={{
								minHeight: 48,
								justifyContent: openMenu ? 'initial' : 'center',
								px: 2.5,
								mx: 2,
								borderRadius: '12px',
								mb: 0.5,
								background: isActive ? colors.accentGlow : 'transparent',
								border: isActive ? `1px solid ${colors.accentPrimary}` : '1px solid transparent',
								'&:hover': {
									background: colors.bgGlass,
									borderColor: colors.borderGlass,
								}
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: openMenu ? 3 : 'auto',
									justifyContent: 'center',
									color: isActive ? colors.accentPrimary : colors.textSecondary,
								}}
							>
								{React.cloneElement(item.icon as React.ReactElement, {
									color: isActive ? colors.accentPrimary : colors.textSecondary
								})}
							</ListItemIcon>
							<ListItemText 
								primary={item.title} 
								primaryTypographyProps={{
									sx: { 
										color: isActive ? colors.textPrimary : colors.textSecondary,
										fontWeight: isActive ? 600 : 500,
									}
								}}
							/>
							{clickMenu.find((menu: string) => item.title === menu) ? 
								<ExpandLess sx={{ color: colors.textSecondary }} /> : 
								<ExpandMore sx={{ color: colors.textSecondary }} />
							}
						</ListItemButton>
						<Collapse
							in={!!clickMenu.find((menu: string) => menu === item.title)}
							className="menu"
							timeout="auto"
							component="li"
							unmountOnExit
						>
							<List className="menu-list" disablePadding sx={{ pl: 4, pr: 2 }}>
								{sub_menu_set[item.title] &&
									sub_menu_set[item.title].map((sub: any, i: number) => {
										const isSubActive = clickMenu[0] === item.title && clickSubMenu === sub.title;
										return (
											<Link href={sub.url} shallow={true} replace={true} key={i}>
												<ListItemButton
													component="li"
													className={isSubActive ? 'li on' : 'li'}
													sx={{
														borderRadius: '8px',
														my: 0.5,
														py: 1,
														background: isSubActive ? colors.bgSecondary : 'transparent',
														'&:hover': {
															background: colors.bgSecondary,
														}
													}}
												>
													<Typography 
														variant={sub.title} 
														component={'span'}
														sx={{
															color: isSubActive ? colors.accentPrimary : colors.textSecondary,
															fontSize: '0.9rem',
															fontWeight: isSubActive ? 600 : 400,
														}}
													>
														{sub.title}
													</Typography>
												</ListItemButton>
											</Link>
										);
									})}
							</List>
						</Collapse>
					</List>
				);
			})}
		</>
	);
};

export default withRouter(AdminMenuList);

