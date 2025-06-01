'use client';

import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {toggle} from '@/redux/store/signInModel';
import {usePathname} from 'next/navigation';

export function useRequireAuth() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const authRequired = document.cookie.includes('requires-auth=true');

    if (authRequired) {
      dispatch(toggle());

      // Clear the cookie after usage
      document.cookie = 'requires-auth=; Max-Age=0; path=/';
    }
  }, [dispatch, pathname]);
}
