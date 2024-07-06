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
			<Stack className={'footer-container'}>
				<Stack className={'main'}>
					<Stack className={'left'}>
						<Box component={'div'} className={'footer-box'}>
							{/* <img src="/img/logo/logoWhite.svg" alt="" className={'logo'} /> */}
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>total free customer care</span>
							<p>+82 10 4867 2909</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>nee live</span>
							<p>+82 10 4867 2909</p>
							<span>Support?</span>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<p>follow us on social media</p>
							<div className={'media-box'}>
								<FacebookOutlinedIcon />
								<TelegramIcon />
								<InstagramIcon />
								<TwitterIcon />
							</div>
						</Box>
					</Stack>
					<Stack className={'right'}>
						<Box component={'div'} className={'bottom'}>
							<div>
								<strong>Popular Search</strong>
								<span>Property for Rent</span>
								<span>Property Low to hide</span>
							</div>
							<div>
								<strong>Quick Links</strong>
								<span>Terms of Use</span>
								<span>Privacy Policy</span>
								<span>Pricing Plans</span>
								<span>Our Services</span>
								<span>Contact Support</span>
								<span>FAQs</span>
							</div>
							<div>
								<strong>Discover</strong>
								<span>Seoul</span>
								<span>Gyeongido</span>
								<span>Busan</span>
								<span>Jejudo</span>
							</div>
						</Box>
					</Stack>
				</Stack>
				<Stack className={'second'}>
					<span>© Nestar - All rights reserved. Nestar {moment().year()}</span>
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
						<div className={"ftr-middle"}>
							<p>icons</p>
						</div>
						<div className={"ftr-right"}>International Sale</div>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Footer;
