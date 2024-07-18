import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL, topPropertyRank } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { userVar } from '../../../apollo/store';
import { Product } from '../../types/product/property';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

interface PopularPropertyCardProps {
	product: Product;
	likePropertyHandler: any;
}

const PopularPropertyCard = (props: PopularPropertyCardProps) => {
	const { product, likePropertyHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailHandler = async (propertyId: string) => {
		console.log('propertyId:', propertyId);
		await router.push({ pathname: '/product/detail', query: { id: propertyId } });
	};

	const handleLikeButtonClick = () => {
		likePropertyHandler(user, product?._id);
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
							<span>{product?.productModel} Model</span>
						</div>
						<div>
							<span>{product?.productBrand} Brand</span>
						</div>
						<div>
							<span>{product?.productEngineSize}Engine </span>
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
							<span>{product?.productBrand}</span>
						</div>
						<div>
							<span>{product?.productFuelType}</span>
						</div>
						<div>
							<span>{product?.productEngineSize}</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p>{product.productFuelType}</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<VisibilityTwoToneIcon />
							</IconButton>
							<Typography className="view-cnt">{product?.productViews}</Typography>
							<IconButton color={'default'} onClick={handleLikeButtonClick}>
								{product?.meLiked && product?.meLiked[0]?.myFavorite ? (
									<ThumbUpIcon sx={{ color: 'blue' }} />
								) : (
									<ThumbUpOffAltIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{product?.productLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default PopularPropertyCard;
