import { CommentGroup, CommentStatus } from '../../enums/comment.enum';
import { MessageGroup, MessageStatus } from '../../enums/message.enum';
import { Member } from '../member/member';
import { MeLiked, TotalCounter } from '../product/property';

export interface AgentMessage {
	_id: string;
	messageStatus: MessageStatus;
	messageGroup: MessageGroup;
	messageContent: string;
	messageRefId: string;
	memberId: string;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface AgentMessages {
	list: Comment[];
	metaCounter: TotalCounter[];
}
