import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TrendPropertyCard from './TrendPropertyCard';
import { ProductsInquiry } from '../../types/product/property.input';
import { Product } from '../../types/product/property';
import { GET_PROPERTIES } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { LIKE_TARGET_PROPERTY } from '../../../apollo/user/mutation';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMutation, useQuery } from '@apollo/client';

interface TrendPropertiesProps {
	initialInput: ProductsInquiry;
}

const TrendProperties = (props: TrendPropertiesProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [trendProducts, setTrendProducts] = useState<Product[]>([]);

	/** APOLLO REQUESTS **/ 
	const [likeTargerProperty] = useMutation(LIKE_TARGET_PROPERTY);
	const {
		loading: getProductsLoading,
		data: getProductsData,
		error: getProductsError,
		refetch: getProductsRefetch,
	} = useQuery(GET_PROPERTIES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTrendProducts(data?.getProducts?.list);
		},
	});
	/** HANDLERS **/

	const likePropertyHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
			// execute likeTargetProperty Mutation
			await likeTargerProperty({ variables: { input: id } });
			// execute getPropertiesRefetch
			await getProductsRefetch({input: initialInput})

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, likeTargetProperty', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};


	if (trendProducts) console.log('trendProperties==>:', trendProducts);
	if (!trendProducts) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>--------- Highlights --------- </span>
					</Stack>
					<Stack className={'card-box'}>
						{trendProducts.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								{/* Trends Empty */}
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								centeredSlides={true}
								spaceBetween={15}
								modules={[Autoplay]}
							>
								{trendProducts.map((property: Product) => {
									return (
										<SwiperSlide key={property._id} className={'trend-property-slide'}>
											<TrendPropertyCard property={property}  likePropertyHandler={likePropertyHandler}  />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>--------- Highlights --------- </span>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								{/* <WestIcon className={'swiper-trend-prev'} /> */}
								{/* <div className={'swiper-trend-pagination'}></div> */}
								{/* <EastIcon className={'swiper-trend-next'} /> */}
							</div>
						</Box>
					</Stack>
					<Stack className={'hgts-container'}>
						<Stack className={'highlights-up'}>
							<Box component={'div'} className={'hgts-up'}>
								<div className={'hgts-hold'}>
									<p className={'hgts-ttl'}>MOTOGP</p>
									<p className={'hgts-text'}>
										The PureRide R&E Team on Sachsenring Sprint Race Podium With Bagnaia, third
									</p>
									<p className={'hgts-place'}>Fourth place at finish line for Bastianini</p>
									<p className={'hgts-section'}>GO TO MOTOGP SECTION</p>
								</div>
								<div>
									{' '}
									<img className={'hgts-img'} src="/img/banner/motogp.jpg" alt="" />
								</div>
							</Box>
							<Box component={'div'} className={'hgts-down'}>
								<div className={'hgts-hold'}>
									<p className={'hgts-ttl'}>WDW 2024</p>
									<p className={'hgts-text'}>Notte dei Campioni</p>
									<p className={'hgts-place'}>
										July 24, Misano World Simoncelli: An unprecedented competition between world chempions and circuit
										that becomesa disco for the night. Indeed, for Notte dei Cempioni!
									</p>
									<p className={'hgts-section'}>Discover more</p>
								</div>
								<div>
									<img className={'hgts-img'} src="/img/banner/note.jpg" alt="" />
								</div>
							</Box>
						</Stack>
					</Stack>
					<Stack className={'card-box'}>
						{trendProducts.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								{/* Trends Empty */}
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								spaceBetween={15}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-trend-next',
									prevEl: '.swiper-trend-prev',
								}}
								pagination={{
									el: '.swiper-trend-pagination',
								}}
							>
								{trendProducts.map((product: Product) => {
									return (
										<SwiperSlide key={product._id} className={'trend-property-slide'}>
											<TrendPropertyCard property={product}  likePropertyHandler={likePropertyHandler} /> 
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TrendProperties.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'productLikes',
		direction: 'DESC',
		search: {},
	},
};

export default TrendProperties;
