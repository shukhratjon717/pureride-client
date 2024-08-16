import React, { useEffect, useCallback } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useMutation, useReactiveVar } from '@apollo/client';
import { Stack } from '@mui/material';

import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import MemberMenu from '../../libs/components/member/MemberMenu';
import MemberProperties from '../../libs/components/member/MemberProperties';
import MemberFollowers from '../../libs/components/member/MemberFollowers';
import MemberArticles from '../../libs/components/member/MemberArticles';
import MemberFollowings from '../../libs/components/member/MemberFollowings';

import { userVar } from '../../apollo/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { LIKE_TARGET_MEMBER, SUBSCRIBE, UNSUBSCRIBE } from '../../apollo/user/mutation';
import { Messages } from '../../libs/config';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

const MemberPage: NextPage = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const category = router.query.category as string;
  const user = useReactiveVar(userVar);

  /** APOLLO REQUESTS **/
  const [subscribe] = useMutation(SUBSCRIBE);
  const [unsubscribe] = useMutation(UNSUBSCRIBE);
  const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);

  /** LIFECYCLES **/
  useEffect(() => {
    if (!router.isReady) return;
    if (!category) {
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, category: 'properties' },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [category, router]);

  /** HANDLERS **/
  const subscribeHandler = useCallback(
    async (id: string, refetch: Function, query: any) => {
      try {
        if (!id) throw new Error(Messages.error1);
        if (!user._id) throw new Error(Messages.error2);
        await subscribe({ variables: { input: id } });
        await sweetTopSmallSuccessAlert('Followed', 800);
        await refetch({ input: query });
      } catch (err: any) {
        await sweetErrorHandling(err);
      }
    },
    [subscribe, user._id]
  );

  const unsubscribeHandler = useCallback(
    async (id: string, refetch: Function, query: any) => {
      try {
        if (!id) throw new Error(Messages.error1);
        if (!user._id) throw new Error(Messages.error2);
        await unsubscribe({ variables: { input: id } });
        await sweetTopSmallSuccessAlert('Unfollowed', 800);
        await refetch({ input: query });
      } catch (err: any) {
        await sweetErrorHandling(err);
      }
    },
    [unsubscribe, user._id]
  );

  const likeMemberHandler = useCallback(
    async (id: string, refetch: Function, query: any) => {
      try {
        if (!id) return;
        if (!user._id) throw new Error(Messages.error2);
        await likeTargetMember({ variables: { input: id } });
        await sweetTopSmallSuccessAlert('Success!', 800);
        await refetch({ input: query });
      } catch (err: any) {
        await sweetMixinErrorAlert(err.message);
      }
    },
    [likeTargetMember, user._id]
  );

  const redirectToMemberPageHandler = useCallback(
    async (memberId: string) => {
      try {
        if (memberId === user?._id) {
          await router.push(`/mypage?memberId=${memberId}`);
        } else {
          await router.push(`/member?memberId=${memberId}`);
        }
      } catch (error) {
        await sweetErrorHandling(error);
      }
    },
    [router, user?._id]
  );

  if (device === 'mobile') {
    return <>MEMBER PAGE MOBILE</>;
  } else {
    return (
      <div id="member-page" style={{ position: 'relative' }}>
        <div className="container">
          <Stack className={'member-page'}>
            <Stack className={'back-frame'}>
              <Stack className={'left-config'}>
                <MemberMenu
                  subscribeHandler={subscribeHandler}
                  unsubscribeHandler={unsubscribeHandler}
                />
              </Stack>
              <Stack className="main-config" mb={'76px'}>
                <Stack className={'list-config'}>
                  {category === 'properties' && <MemberProperties />}
                  {category === 'followers' && (
                    <MemberFollowers
                      subscribeHandler={subscribeHandler}
                      unsubscribeHandler={unsubscribeHandler}
                      redirectToMemberPageHandler={redirectToMemberPageHandler}
                      likeMemberHandler={likeMemberHandler}
                    />
                  )}
                  {category === 'followings' && (
                    <MemberFollowings
                      subscribeHandler={subscribeHandler}
                      unsubscribeHandler={unsubscribeHandler}
                      redirectToMemberPageHandler={redirectToMemberPageHandler}
                      likeMemberHandler={likeMemberHandler}
                    />
                  )}
                  {category === 'articles' && <MemberArticles />}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    );
  }
};

export default withLayoutBasic(MemberPage);
