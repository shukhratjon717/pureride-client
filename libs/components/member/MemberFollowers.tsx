import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { FollowInquiry } from '../../types/follow/follow.input';
import { useQuery, useReactiveVar } from '@apollo/client';
import { Follower } from '../../types/follow/follow';
import { REACT_APP_API_URL } from '../../config';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { userVar } from '../../../apollo/store';
import { T } from '../../types/common';
import { GET_MEMBER_FOLLOWERS } from '../../../apollo/user/query';

interface MemberFollowsProps {
	initialInput: FollowInquiry;
	subscribeHandler: (id: string, refetch: () => void, inquiry: FollowInquiry) => void;
	unsubscribeHandler: (id: string, refetch: () => void, inquiry: FollowInquiry) => void;
	redirectToMemberPageHandler: (id: string) => void;
	likeMemberHandler: (id: string, refetch: () => void, inquiry: FollowInquiry) => void;
}

const MemberFollowers: React.FC<MemberFollowsProps> = ({
	initialInput,
	subscribeHandler,
	unsubscribeHandler,
	redirectToMemberPageHandler,
	likeMemberHandler,
}) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [total, setTotal] = useState<number>(0);
	const category = router.query?.category ?? 'properties';
	const [followInquiry, setFollowInquiry] = useState<FollowInquiry>(initialInput);
	const [memberFollowers, setMemberFollowers] = useState<Follower[]>([]);
	const user = useReactiveVar(userVar);

	/** APOLLO REQUESTS **/
	const {
		loading: getMemberFollowersLoading,
		data: getMemberFollowersData,
		error: getMemberFollowersError,
		refetch: getMemberFollowersRefetch,
	} = useQuery(GET_MEMBER_FOLLOWERS, {
		fetchPolicy: 'network-only',
		variables: { input: followInquiry },
		skip: !followInquiry?.search?.followingId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setMemberFollowers(data?.getMemberFollowers?.list ?? []);
			setTotal(data?.getMemberFollowers?.metaCounter?.[0]?.total ?? 0);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		const memberId = router.query.memberId as string;
		setFollowInquiry((prev) => ({
			...prev,
			search: { followingId: memberId ?? user?._id ?? '' },
		}));
	}, [router.query.memberId, user?._id]);

	useEffect(() => {
		if (followInquiry.search.followingId) {
			getMemberFollowersRefetch();
		}
	}, [followInquiry, getMemberFollowersRefetch]);

	/** HANDLERS **/
	const paginationHandler = useCallback((event: ChangeEvent<unknown>, value: number) => {
		setFollowInquiry((prev) => ({
			...prev,
			page: value,
		}));
	}, []);

	if (device === 'mobile') {
		return <div>NESTAR FOLLOWS MOBILE</div>;
	}

	const renderFollowerCard = (follower: Follower) => {
		const imagePath = follower?.followerData?.memberImage
			? `${REACT_APP_API_URL}/${follower.followerData.memberImage}`
			: '/img/profile/defaultUser.svg';

		return (
			<Stack className="follows-card-box" key={follower._id}>
				<Stack className="info" onClick={() => redirectToMemberPageHandler(follower.followerData?._id ?? '')}>
					<Stack className="image-box">
						<img src={imagePath} alt="Follower" />
					</Stack>
					<Stack className="information-box">
						<Typography className="name">{follower?.followerData?.memberNick ?? 'Unnamed'}</Typography>
					</Stack>
				</Stack>
				<Stack className="details-box">
					<Box className="info-box">
						<p>Followers</p>
						<span>({follower?.followerData?.memberFollowers ?? 0})</span>
					</Box>
					<Box className="info-box">
						<p>Followings</p>
						<span>({follower?.followerData?.memberFollowings ?? 0})</span>
					</Box>
					<Box className="info-box">
						{follower?.meLiked?.[0]?.myFavorite ? (
							<FavoriteIcon
								color="primary"
								onClick={() =>
									likeMemberHandler(follower.followerData?._id ?? '', getMemberFollowersRefetch, followInquiry)
								}
							/>
						) : (
							<FavoriteBorderIcon
								onClick={() =>
									likeMemberHandler(follower.followerData?._id ?? '', getMemberFollowersRefetch, followInquiry)
								}
							/>
						)}
						<span>({follower?.followerData?.memberLikes ?? 0})</span>
					</Box>
				</Stack>
				{user?._id !== follower?.followerId && (
					<Stack className="action-box">
						{follower.meFollowed?.[0]?.myFollowing ? (
							<>
								<Typography>Following</Typography>
								<Button
									variant="outlined"
									sx={{ background: '#ed5858', ':hover': { background: '#ee7171' } }}
									onClick={() =>
										unsubscribeHandler(follower.followerData?._id ?? '', getMemberFollowersRefetch, followInquiry)
									}
								>
									Unfollow
								</Button>
							</>
						) : (
							<Button
								variant="contained"
								sx={{ background: '#60eb60d4', ':hover': { background: '#60eb60d4' } }}
								onClick={() =>
									subscribeHandler(follower.followerData?._id ?? '', getMemberFollowersRefetch, followInquiry)
								}
							>
								Follow
							</Button>
						)}
					</Stack>
				)}
			</Stack>
		);
	};

	return (
		<div id="member-follows-page">
			<Stack className="main-title-box">
				<Stack className="right-box">
					<Typography className="main-title">{category === 'followers' ? 'Followers' : 'Followings'}</Typography>
				</Stack>
			</Stack>
			<Stack className="follows-list-box">
				<Stack className="listing-title-box">
					<Typography className="title-text">Name</Typography>
					<Typography className="title-text">Details</Typography>
					<Typography className="title-text">Subscription</Typography>
				</Stack>
				{memberFollowers.length === 0 ? (
					<div className="no-data">
						<img src="/img/icons/icoAlert.svg" alt="No Followers" />
						<p>No Followers yet!</p>
					</div>
				) : (
					memberFollowers.map(renderFollowerCard)
				)}
			</Stack>
			{memberFollowers.length !== 0 && (
				<Stack className="pagination-config">
					<Stack className="pagination-box">
						<Pagination
							page={followInquiry.page}
							count={Math.ceil(total / followInquiry.limit)}
							onChange={paginationHandler}
							shape="circular"
							color="primary"
						/>
					</Stack>
					<Stack className="total-result">
						<Typography>{total} followers</Typography>
					</Stack>
				</Stack>
			)}
		</div>
	);
};

MemberFollowers.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		search: {
			followingId: '',
		},
	},
};

export default MemberFollowers;
