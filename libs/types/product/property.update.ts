import { ProductEngineSize, ProductFuelType, ProductLocation, ProductStatus, ProductType } from "../../enums/property.enum";

export interface ProductUpdate {
	_id: string;
	productType: ProductType;
	productStatus: ProductStatus;
	productLocation: ProductLocation;
	productAddress: string;
	productTitle: string;
	productPrice: number;
	productEngineSize: ProductEngineSize;
	productFuelType: ProductFuelType;
	productModel: string;
	productBrand: string;
	productYear: number;
	productMileage: number;
	productViews: number;
	productLikes: string;
	productComments: string;
	productRank: number;
	productImages: string[];
	productDesc: string;
	productBarter: boolean;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
