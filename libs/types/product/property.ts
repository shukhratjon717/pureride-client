import {
	ProductEngineSize,
	ProductFuelType,
	ProductLocation,
	ProductStatus,
	ProductType,
} from '../../enums/property.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Product {
	_id: string;
	productType: ProductType;
	productStatus: ProductStatus;
	productLocation: ProductLocation;
	productAddress: string;
	productTitle: string;
	productPrice: number;
	productEngineSize: ProductEngineSize;
	productFuelType?: ProductFuelType;
	engineSize: number;
	productModel?: string;
	productColor?: string;
	productBrand?: string;
	productYear?: number;
	productMileage?: number;
	productViews: number;
	productLikes: string;
	productComments: string;
	productRank: number;
	productImages: string[];
	productDesc: string;
	productBarter?: boolean;
	productRent?: boolean;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Products {
	list: Product[];
	metaCounter: TotalCounter[];
}
