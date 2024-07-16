import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { GET_PROPERTIES } from '../../../../apollo/user/query';
import { useMutation, useQuery } from '@apollo/client';
import { T } from '../../../types/common';
import { Product } from '../../../types/product/property';
import { ProductsInquiry } from '../../../types/product/property.input';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Message } from '../../../enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../../sweetAlert';
import { LIKE_TARGET_PROPERTY } from '../../../../apollo/user/mutation';
import SkuterCard from './SkuterCard';

interface SkuterProps {
	initialInput: ProductsInquiry;
}

const Skuter = (props: SkuterProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [lightweightProducts, setLightweightProperties] = useState<Product[]>([]);

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
			setLightweightProperties(data?.getProducts?.list);
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
			await getProductsRefetch({ input: initialInput });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, likeTargetProperty', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (!lightweightProducts) return null;
	console.log('lightweightProducts::', lightweightProducts);

	if (device === 'mobile') {
		return (
			<Stack className={'popular-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Skuter Range </span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'popular-property-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={50}
							modules={[Autoplay]}
						>
							{lightweightProducts.map((property: Product) => {
								return (
									<SwiperSlide key={property._id} className="popular-property-slide">
										<SkuterCard product={property} likePropertyHandler={likePropertyHandler} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'popular-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span> Skuter Range</span>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'more-box'}></div>
						</Box>
					</Stack>
					<Stack className={'card-box'} flexDirection={'column'}>
						<Swiper
							className={'popular-property-swiper'}
							slidesPerView={'auto'}
							spaceBetween={25}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-popular-next',
								prevEl: '.swiper-popular-prev',
							}}
							pagination={{
								el: '.swiper-popular-pagination',
							}}
						>
							{lightweightProducts.map((property: Product) => {
								return (
									<SwiperSlide key={property._id} className={'popular-property-slide'}>
										<SkuterCard product={property} likePropertyHandler={likePropertyHandler} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
					<Stack className={'pagination-box'}>
						<WestIcon className={'swiper-popular-prev'} />
						<div className={'swiper-popular-pagination'}></div>
						<EastIcon className={'swiper-popular-next'} />
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

Skuter.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'productViews',
		direction: 'DESC',
		search: {
			typeList: ['SKUTER'],
		},
	},
};

export default Skuter;

