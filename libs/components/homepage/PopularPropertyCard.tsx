import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { Product } from '../../types/product/property';
import { ProductFuelType } from '../../enums/property.enum';

interface PopularPropertyCardProps {
	product: Product;
}

const PopularPropertyCard = (props: PopularPropertyCardProps) => {
	const { product } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailHandler = async (propertyId: string) => {
		console.log('propertyId:', propertyId);
		await router.push({ pathname: '/product/detail', query: { id: propertyId } });
	};

	if (device === 'mobile') {
		return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${product?.productImages[0]})` }}
					onClick={() => pushDetailHandler(product._id)}
				>
					{product && product?.productRank && product?.productRank >= topPropertyRank ? (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					) : (
						''
					)}

					<div className={'price'}>${product.productPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => pushDetailHandler(product._id)}>
						{product.productTitle}
					</strong>
					<p className={'desc'}>{product.productAddress}</p>
					<div className={'options'}>
						<div>
							{/* <img src="/img/icons/bed.svg" alt="" /> */}
							<span>{product?.productModel} bed</span>
						</div>
						<div>
							{/* <img src="/img/icons/room.svg" alt="" /> */}
							<span>{product?.productBrand} rooms</span>
						</div>
						<div>
							{/* <img src="/img/icons/expand.svg" alt="" /> */}
							<span>{product?.productEngineSize} </span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>{product?.productBarter ? 'rent' : 'sale'}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{product?.productViews}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${product?.productImages[0]})` }}
					onClick={() => pushDetailHandler(product._id)}
				>
					{product && product?.productRank && product?.productRank >= topPropertyRank ? (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					) : (
						''
					)}

					<div className={'price'}>${product.productPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => pushDetailHandler(product._id)}>
						{product.productTitle}
					</strong>
					<p className={'desc'}>{product.productAddress}</p>
					<div className={'options'}>
						<div>
							{/* <img src="/img/icons/bed.svg" alt="" /> */}
							<span>{product?.productBrand}</span>
						</div>
						<div>
							{/* <img src="/img/icons/room.svg" alt="" /> */}
							<span>{product?.productFuelType}</span>
						</div>
						<div>
							{/* <img src="/img/icons/expand.svg" alt="" /> */}
							<span>{product?.productEngineSize}</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>{product?.productBarter ? 'rent' : 'sale'}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{product?.productViews}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default PopularPropertyCard;
