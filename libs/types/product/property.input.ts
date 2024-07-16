import {
	ProductEngineSize,
	ProductFuelType,
	ProductLocation,
	ProductStatus,
	ProductType,
} from '../../enums/property.enum';
import { Direction } from '../../enums/common.enum';

export interface ProductInput {
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
	engineSize: number;
	productMilage: number;
	productRank: number;
	productImages: string[];
	productDesc: string;
	productBarter: boolean;
	productRent: boolean;
	memberId?: string;
	constructedAt?: Date;
}

interface PISearch {
	memberId?: string;
	locationList?: ProductLocation[];
	typeList?: ProductType[];
	yearList?: Number[]; //roomList
	engineList?: Number[]; //bedList
	options?: string[];
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
	enginesRange?: Range;
	text?: string;
}

export interface ProductsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface APISearch {
	productStatus?: ProductStatus;
}

export interface AgentPropertiesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	productStatus?: ProductStatus;
	productLocationList?: ProductLocation[];
}

export interface AllProductsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
