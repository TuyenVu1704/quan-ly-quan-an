'use client';

import { getAccessTokenFromLocalStorage } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const menuItems = [
  {
    title: 'Món ăn',
    href: '/menu', // authRequired = undefined nghĩa là đăng nhập hay chưa vẫn hiện thị
  },
  {
    title: 'Đơn hàng',
    href: '/orders',
    authRequired: true, // khi true nghĩa là đã đăng nhập mới hiện thị
  },
  {
    title: 'Đăng nhập',
    href: '/login',
    authRequired: false, // khi false nghĩa là chưa đăng nhập sẽ hiện thị
  },
  {
    title: 'Quản lý',
    href: '/manage/dashboard',
    authRequired: true, // khi true nghĩa là đã đăng nhập mới hiện thị
  },
];

/**
 *
 * Server : Món ăn, đăng nhập. Do server trạng thái đăng nhập của user
 * Client : đầu tiên sẽ hiện thị món ăn, đăng nhập. Nhưng ngay sau đó thì client render lại và hiện thị món ăn, đơn hàng, quản lý
 * dẫn tới tình trạng hydrade lại
 */

export default function NavItems({ className }: { className?: string }) {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    setIsAuth(!!getAccessTokenFromLocalStorage());
  }, []);
  return menuItems.map((item) => {
    // Nếu authRequired = true và chưa đăng nhập hoặc authRequired = false và đã đăng nhập thì return null
    if (
      (item.authRequired === true && !isAuth) ||
      (item.authRequired === false && isAuth)
    )
      return null;
    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    );
  });
}
