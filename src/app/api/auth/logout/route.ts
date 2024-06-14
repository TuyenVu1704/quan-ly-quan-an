import authApiRequest from '@/apiRequests/auth';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { HttpError } from '@/lib/http';
export async function POST(req: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message: 'Không nhận được token',
      },
      {
        status: 200,
      }
    );
  }
  try {
    // Gọi API logout từ serverBE
    const result = await authApiRequest.sLogout({
      accessToken,
      refreshToken,
    });
    return Response.json(result.payload);
  } catch (error) {
    return Response.json(
      { message: 'Lỗi khi gọi Api tới server BE' },
      { status: 200 }
    );
  }
}
