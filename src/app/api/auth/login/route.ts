import authApiRequest from '@/apiRequests/auth';
import { LoginBodyType } from '@/schemaValidations/auth.schema';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { HttpError } from '@/lib/http';
export async function POST(req: Request) {
  // Lấy body từ client nhập vào
  const body = (await req.json()) as LoginBodyType;
  const cookieStore = cookies();

  try {
    // Gọi API login từ serverBE
    const { payload } = await authApiRequest.sLogin(body);
    const { accessToken, refreshToken } = payload.data;
    // decode token de lay exp
    const decodeAccessToken = jwt.decode(accessToken) as { exp: number };
    const decodeRefreshToken = jwt.decode(refreshToken) as { exp: number };

    cookieStore.set('accessToken', accessToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: decodeAccessToken.exp * 1000,
    });

    cookieStore.set('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: decodeRefreshToken.exp * 1000,
    });

    return Response.json(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, { status: error.status });
    } else {
      return Response.json({ message: 'Có lỗi xảy ra' }, { status: 500 });
    }
  }
}
