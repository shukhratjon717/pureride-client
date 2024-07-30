import { ReactNode } from 'react';
import { NoticeCategory, NoticeStatus, NoticeType } from '../../enums/notice.enum';
import { Member } from '../member/member';
import { MeLiked, TotalCounter } from '../product/property';

export interface Notice {
	_id: string;
	noticeType: NoticeType;
	noticeStatus: NoticeStatus;
	noticeTitle: string;
	noticeContent: string;
	noticeImage: string;
	noticeViews: number;
	noticeLikes: number;
	noticeComments: number;
	memberId: string;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Notices {
	_id: any;
	noticeType: ReactNode;
	noticeTitle: ReactNode;
	memberData: any;
	createdAt: string | number | Date;
	noticeViews: ReactNode;
	noticeStatus: NoticeStatus;
	list: Notice[];
	metaCounter: TotalCounter[];
}
