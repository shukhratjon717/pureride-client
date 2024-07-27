import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { BoardArticleStatus } from '../../enums/board-article.enum';
import { ObjectId } from 'mongoose';
import { NoticeStatus } from '../../enums/notice.enum';

@InputType()
export class NoticeUpdate {
	@IsNotEmpty()
	@Field(() => String)
	_id: ObjectId;

	@IsOptional()
	@Field(() => NoticeStatus, { nullable: true })
	noticeStatus?: NoticeStatus;

	@IsOptional()
	@Length(3, 50)
	@Field(() => String, { nullable: true })
	noticeTitle?: string;

	@IsOptional()
	@Length(3, 250)
	@Field(() => String, { nullable: true })
	noticeContent?: string;

	@IsOptional()
	@Field(() => String, { nullable: true })
	noticeImage?: string;
}
