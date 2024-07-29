import { NoticeStatus } from '../../enums/notice.enum';

export class NoticeUpdate {
	_id: string | undefined;

	noticeStatus?: NoticeStatus;

	noticeTitle?: string;

	noticeContent?: string;

	noticeImage?: string;
}
