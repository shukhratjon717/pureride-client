import { Direction } from '../../enums/common.enum';
import { FaqCategory } from '../../enums/faqCategory.enum';
import {  NoticeCategory, NoticeStatus } from '../../enums/notice.enum';

export interface NoticeInput {
	noticeCategory?: NoticeCategory;
	faqCategory?: FaqCategory;
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
	faqCategory?: FaqCategory;
}

export interface AllNoticesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ANISearch;
}
