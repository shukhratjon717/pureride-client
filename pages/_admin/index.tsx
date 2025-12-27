import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

const AdminIndex: NextPage = () => {
	const router = useRouter();

	useEffect(() => {
		router.replace('/_admin/dashboard');
	}, [router]);

	return null;
};

export default AdminIndex;
