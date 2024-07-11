import React, { useState } from 'react';
import Link from 'next/link';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Stack, Typography } from '@mui/material';
import CommunityCard from './CommunityCard';
import { BoardArticle } from '../../types/board-article/board-article';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';
import { BoardArticleCategory } from '../../enums/board-article.enum';
import { T } from '../../types/common';

const CommunityBoards = () => {
	const device = useDeviceDetect();
	const [searchCommunity, setSearchCommunity] = useState({
		page: 1,
		sort: 'articleViews',
		direction: 'DESC',
	});
	const [newsArticles, setNewsArticles] = useState<BoardArticle[]>([]);
	const [freeArticles, setFreeArticles] = useState<BoardArticle[]>([]);

	/** APOLLO REQUESTS **/

	const {
		loading: getNewsArticlesLoading,
		data: getNewsArticlesData,
		error: getNewsArticlesError,
		refetch: getNewsArticlesRefetch,
	} = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'network-only',
		variables: { input: { ...searchCommunity, limit: 6, search: { articleCategory: BoardArticleCategory.NEWS } } },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setNewsArticles(data?.getBoardArticles?.list);
		},
	});

	const {
		loading: getFreeArticlesLoading,
		data: getFreeArticlesData,
		error: getFreeArticlesError,
		refetch: getFreeArticlesRefetch,
	} = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'network-only',
		variables: { input: { ...searchCommunity, limit: 3, search: { articleCategory: BoardArticleCategory.FREE } } },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setFreeArticles(data?.getBoardArticles?.list);
		},
	});

	if (device === 'mobile') {
		return <div>Lastes News(MOBILE)</div>;
	} else {
		return (
			<Stack className={'community-board'}>
				<Stack className={'container'}>
					<Stack>
						<Typography variant={'h1'}>------Lastest News------</Typography>
					</Stack>
					<Stack className="community-main">
						<Stack className={'community-left'}>
							<Stack className={'card-wrap'}>
								<Stack component={'div'} className={'com-container'}>
									<Box component={'div'} className={'com-holder'}>
										<img src="/img/events/corporate.jpg" className={'com-img'} alt="" />
										<p className={'com-ttitle'}>CORPORATE</p>
										<p className={'com-text'}>
											The G7 Science and Technology Ministers visit the Ducati factory in Borgo Panigale
										</p>
									</Box>
									<Box component={'div'} className={'com-holder'}>
										<img src="/img/events/accessories.jpg" className={'com-img'} alt="" />
										<p className={'com-ttitle'}>ACCESSORIES</p>
										<p className={'com-text'}>
											Range of original Ducati accessories for touring on asphalt or dirt. It's time to think about the
											next trip
										</p>
									</Box>
									<Box component={'div'} className={'com-holder'}>
										<img src="/img/events/multistrada.jpg" className={'com-img'} alt="" />
										<p className={'com-ttitle'}>MULTISTRADA V$ RS</p>
										<p className={'com-text'}>
											Ducati Multistrada V4 RS awarded as Best Motorcycle for 2024 according to Robb Report
										</p>
									</Box>
								</Stack>
							</Stack>
						</Stack>
						<Stack className={'community-right'}>
							<Stack className={'content-top'}></Stack>
							<Stack className={'card-wrap vertical'}></Stack>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default CommunityBoards;
