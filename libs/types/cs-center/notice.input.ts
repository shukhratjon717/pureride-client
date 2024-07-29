import { Direction } from '../../enums/common.enum';
import { FaqType } from '../../enums/faqCategory.enum';
import { NoticeCategory, NoticeStatus, NoticeType } from '../../enums/notice.enum';

export interface NoticeInput {
	noticeType?: NoticeType;
	noticeTitle?: string;
	noticeContent?: string;
	noticeImage?: string;
	memberId?: string;
}

interface NISearch {
	noticeCategory: NoticeCategory;
	text?: string;
}

export interface NoticesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: NISearch;
}

interface ANISearch {
	// noticeStatus?: NoticeStatus;
	// noticeCategory?: NoticeCategory;
	faqType?: FaqType;
}

export interface AllNoticesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ANISearch;
}
