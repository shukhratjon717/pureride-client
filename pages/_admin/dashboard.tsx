import { NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import withAdminLayout from '../../libs/components/layout/LayoutAdmin';
import { LiveDashboard } from '../../libs/components/admin/dashboard/LiveDashboard';

const AdminDashboard: NextPage = () => {
	return (
		<Box component={'div'} className={'content'}>
			<Typography variant={'h2'} className={'tit admin-title'} sx={{ mb: '24px', px: 3, pt: 3 }}>
				Dashboard
			</Typography>
			<LiveDashboard />
		</Box>
	);
};

export default withAdminLayout(AdminDashboard);
