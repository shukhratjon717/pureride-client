import React from 'react';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box } from '@mui/material';
import Moment from 'react-moment';
import { BoardArticle } from '../../types/board-article/board-article';

interface CommunityCardProps {
	vertical: boolean;
	article: BoardArticle;
	index: number;
}

const CommunityCard = (props: CommunityCardProps) => {
	const { vertical, article, index } = props;
	const device = useDeviceDetect();
	const articleImage = article?.articleImage
		? `${process.env.REACT_APP_API_URL}/${article?.articleImage}`
		: '/img/event.svg';

	if (device === 'mobile') {
		return (
			<Link href={`/community/detail?articleCategory=${article?.articleCategory}&id=${article?._id}`}>
				<Box component={'div'} className="community-card-mobile" sx={{ display: 'flex', flexDirection: 'column', padding: '10px', borderBottom: '1px solid #eee' }}>
					<Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
						<img src={articleImage} alt="" style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
						<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
							<strong style={{ fontSize: '16px', fontWeight: 600, color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{article.articleTitle}</strong>
							<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<span style={{ fontSize: '12px', color: '#777' }}>
									<Moment format="DD.MM.YY">{article?.createdAt}</Moment>
								</span>
								<span style={{ fontSize: '12px', color: '#eb6753', fontWeight: 500 }}>Free Board</span>
							</Box>
						</Box>
					</Box>
				</Box>
			</Link>
		);
	} else {
		if (vertical) {
			return (
				<Link href={`/community/detail?articleCategory=${article?.articleCategory}&id=${article?._id}`}>
					<Box component={'div'} className={'vertical-card'}>
						<div className={'community-img'} style={{ backgroundImage: `url(${articleImage})` }}>
							<div>{index + 1}</div>
						</div>
						<strong>{article?.articleTitle}</strong>
						<span>Free Board</span>
					</Box>
				</Link>
			);
		} else {
			return (
				<>
					<Link href={`/community/detail?articleCategory=${article?.articleCategory}&id=${article?._id}`}>
						<Box component={'div'} className="horizontal-card">
							<img src={articleImage} alt="" />
							<div>
								<strong>{article.articleTitle}</strong>
								<span>
									<Moment format="DD.MM.YY">{article?.createdAt}</Moment>
								</span>
							</div>
						</Box>
					</Link>
				</>
			);
		}
	}
};

export default CommunityCard;
