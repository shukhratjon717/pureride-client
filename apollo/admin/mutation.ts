import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const UPDATE_MEMBER_BY_ADMIN = gql`
	mutation UpdateMemberByAdmin($input: MemberUpdate!) {
		updateMemberByAdmin(input: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberDesc
			memberProducts
			memberRank
			memberArticles
			memberPoints
			memberLikes
			memberViews
			memberWarnings
			memberBlocks
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

/**************************
 *        PROPERTY        *
 *************************/

export const UPDATE_PROPERTY_BY_ADMIN = gql`
	mutation UpdateProductByAdmin($input: ProductUpdate!) {
		updateProductByAdmin(input: $input) {
			_id
			productType
			productStatus
			productLocation
			productAddress
			productTitle
			productPrice
			productEngineSize
			productFuelType
			productModel
			productBrand
			productYear
			productMilage
			productViews
			productLikes
			productComments
			productRank
			productImages
			productDesc
			productBarter
			memberId
			soldAt
			deletedAt
			constructedAt
			createdAt
			updatedAt
		}
	}
`;

export const REMOVE_PROPERTY_BY_ADMIN = gql`
	query RemoveProductByAdmin($input: String!) {
		removeProductByAdmin(productId: $input) {
			_id
			productType
			productStatus
			productLocation
			productAddress
			productTitle
			productPrice
			productEngineSize
			productFuelType
			productModel
			productBrand
			productYear
			productMilage
			productViews
			productLikes
			productComments
			productRank
			productImages
			productDesc
			productBarter
			memberId
			soldAt
			deletedAt
			constructedAt
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const UPDATE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation UpdateBoardArticleByAdmin($input: BoardArticleUpdate!) {
		updateBoardArticleByAdmin(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const REMOVE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation RemoveBoardArticleByAdmin($input: String!) {
		removeBoardArticleByAdmin(articleId: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         COMMENT        *
 *************************/

export const REMOVE_COMMENT_BY_ADMIN = gql`
	mutation RemoveCommentByAdmin($input: String!) {
		removeCommentByAdmin(commentId: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;
