import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import useDeviceDetect from '../hooks/useDeviceDetect';
import { Stack, Box, Divider } from '@mui/material';
import moment from 'moment';

const Footer = () => {
	const device = useDeviceDetect();

	if (device == 'mobile') {
		return (
			<Stack className={'footer-container'} sx={{ background: '#f5f5f5', padding: '20px 0' }}>
				<Stack className={'main'} sx={{ padding: '0 20px' }}>
					<Stack className={'left'} spacing={3}>
						<Box component={'div'} className={'footer-box'}>
							{/* <img src="/img/logo/logoWhite.svg" alt="" className={'logo'} loading="lazy" /> */}
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Total Free Customer Care</span>
							<p>+82 10 4867 2909</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Need Live Support?</span>
							<p>+82 10 4867 2909</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<p style={{ marginBottom: '10px' }}>Follow us on social media</p>
							<div className={'media-box'} style={{ display: 'flex', gap: '15px' }}>
								<FacebookOutlinedIcon />
								<TelegramIcon />
								<InstagramIcon />
								<TwitterIcon />
							</div>
						</Box>
					</Stack>
					<Divider sx={{ my: 3 }} />
					<Stack className={'right'} spacing={3}>
						<Box component={'div'} className={'bottom'} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
							<div>
								<strong style={{ display: 'block', marginBottom: '10px' }}>Popular Search</strong>
								<Stack spacing={1}>
									<span>Property for Rent</span>
									<span>Property Low to hide</span>
								</Stack>
							</div>
							<div>
								<strong style={{ display: 'block', marginBottom: '10px' }}>Quick Links</strong>
								<Stack spacing={1}>
									<span>Terms of Use</span>
									<span>Privacy Policy</span>
									<span>Pricing Plans</span>
									<span>Our Services</span>
									<span>Contact Support</span>
									<span>FAQs</span>
								</Stack>
							</div>
						</Box>
					</Stack>
				</Stack>
				<Stack className={'second'} sx={{ textAlign: 'center', marginTop: '30px', fontSize: '12px', color: '#666' }}>
					<span>© PureRide - All rights reserved. PureRide {moment().year()}</span>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'footer-container'}>
				<Stack className="main">
					<Stack className={"footer-top"}>
						<div className={"top-p"}>PureRide</div>
						<Divider />
						<div className={"top-pp"}>Member of the Audi Group</div>
					</Stack>
					<Stack className={"footer-middle"}>
						<div>Terms of Use</div>
						<div>Privacy Information</div>
						<div> Cookies Information</div>
					</Stack>
					<Stack className={"footer-center"}>
						<p>
							Copyright © 2024 PureRide Motor Holding S.p.A. – A Sole Shareholder Company - A Company subject to the
							Management and Coordination activities of Revolution & Evolution RE. All rights reserved. VAT 05113870967
						</p>
					</Stack>
					<Stack className={"footer-bottom"}>
						<div className={'ftr-left'} >
							<p>THE LAND OF JOY</p>
							<p>SCRAMBLER CONFIGURATOR</p>
						</div>
						<div className={"ftr-middle"} >
							
						</div>
						<div className={"ftr-right"}>International Sale</div>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Footer;
