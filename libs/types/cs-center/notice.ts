import { FaqCategory } from '../../enums/faqCategory.enum';
import { NoticeCategory } from '../../enums/notice.enum';
import { Member } from '../member/member';
import { MeLiked, TotalCounter } from '../product/property';

export interface Notice {
	_id: string;
	noticeCategory: NoticeCategory;
	noticeStatus: NoticeCategory;
	noticeTitle: string;
	noticeContent: string;
	noticeImage: string;
	noticeViews: number;
	noticeLikes: number;
	noticeComments: number;
	faqCategory: FaqCategory;
	memberId: string;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Notices {
	list: Notice[];
	metaCounter: TotalCounter[];
}
