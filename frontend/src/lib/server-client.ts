// lib/server-client.ts

import { getCurrent } from "@/app-features/auth/actions";
import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import axios from "axios";
import { cookies } from "next/headers";

export async function createServerClient() {
  const cookieStore = await cookies();
  const current = await getCurrent();
  const refreshToken = current?.refreshToken;
  const accessToken = current?.token;

  if (!refreshToken) throw new Error("No refresh token found in cookies");

  // Gọi đến route refresh-token để lấy access token mới
  const response = await axios.post(`${NEXT_PUBLIC_API_HOST_ADDRESS}/api/refresh-token`, null, {
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  const accessToken = response.data.accessToken;

  const client = axios.create({
    baseURL: NEXT_PUBLIC_API_HOST_ADDRESS,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return client;
}


