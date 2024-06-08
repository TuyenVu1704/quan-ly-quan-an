import { z } from 'zod';

// Khai báo kiểu dữ liệu cho các biến môi trường
const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string(),
});

// Kiểm tra các biến môi trường có hợp lệ không
const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
});

// Nếu không hợp lệ thì in ra lỗi và throw error
if (!configProject.success) {
  console.log(configProject.error.errors);
  throw new Error('Các khai báo biến môi trường không hợp lệ');
}

//Trả về dữ liệu biến môi trường
const envConfig = configProject.data;

export { envConfig };
