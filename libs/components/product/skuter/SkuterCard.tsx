import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/router';
import { Product } from '../../../types/product/property';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import { useReactiveVar } from '@apollo/client';
import { REACT_APP_API_URL, topPropertyRank } from '../../../config';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { userVar } from '../../../../apollo/store';

interface SkuterCardProps {
	product: Product;
	likePropertyHandler: any;
	myFavorites?: any;
}

const SkuterCard = (props: SkuterCardProps) => {
	const { product, likePropertyHandler, myFavorites } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailHandler = async (productId: string) => {
		console.log('propertyId:', productId);
		await router.push({ pathname: '/product/detail', query: { id: productId } });
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
							<img src="/img/icons/electricity.svg" alt="" loading="lazy" />
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
							<span>{product?.productModel} Model</span>
						</div>
						<div>
							{/* <img src="/img/icons/room.svg" alt="" /> */}
							<span>{product?.productBrand} Brand</span>
						</div>
						<div>
							{/* <img src="/img/icons/expand.svg" alt="" /> */}
							<span>{product?.productEngineSize} Engine </span>
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
							<img src="/img/icons/electricity.svg" alt="" loading="lazy" />
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
							<span>{product?.productModel}</span>
						</div>
						<div>
							{/* <img src="/img/icons/room.svg" alt="" /> */}
							<span>{product?.productBrand}</span>
						</div>
						<div>
							{/* <img src="/img/icons/expand.svg" alt="" /> */}
							<span>{product?.productEngineSize}</span>
						</div>
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<p className={'def'}>
							<p> {product.productFuelType}</p>
							<p> {product.productLocation}</p>
						</p>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{product?.productViews}</Typography>
							<IconButton color={'default'} onClick={() => likePropertyHandler(user, product?._id)}>
							{myFavorites ? (
									<FavoriteIcon color="primary" />
								) : product?.meLiked && product?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon color="primary" />
								) : (
									<FavoriteBorderIcon />
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

export default SkuterCard;
