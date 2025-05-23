"use server";
import { z } from "zod";
import { AuthenticateType, loginSchema, registerSchema } from "./types";
import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import { cookies } from "next/headers";
import { AUTHEN_COOKIES, DEVICE_ID } from "./constant";
import { v4 as uuid } from "uuid";
import axios from "axios";

export const registerAction = async (data: z.infer<typeof registerSchema>) => {
  const deviceId = uuid();
  const response = await fetch(
    `${NEXT_PUBLIC_API_HOST_ADDRESS}/api/auth/register`,
    {
      method: "POST",
      body: JSON.stringify({ ...data, deviceId }),
      headers: { "Content-Type": "application/json" },
    },
  );
  const responseData = await response.json();
  if (responseData.isSuccess) {
    const store = await cookies();
    store.set(AUTHEN_COOKIES, JSON.stringify({ responseData }), {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });

    store.set(DEVICE_ID, deviceId, {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return responseData;
};

export const loginAction = async (data: z.infer<typeof loginSchema>) => {
  const store = await cookies();
  const deviceId = store.get(DEVICE_ID)?.value ?? uuid();

  const response = await fetch(
    `${NEXT_PUBLIC_API_HOST_ADDRESS}/api/auth/login`,
    {
      method: "POST",
      body: JSON.stringify({ ...data, deviceId }),
      headers: { "Content-Type": "application/json" },
    },
  );

  const responseData = await response.json();
  if (responseData.isSuccess) {
    store.set(AUTHEN_COOKIES, JSON.stringify(responseData), {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });
    store.set(DEVICE_ID, deviceId, {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return responseData;
};

export const getCurrent = async () => {
  const store = await cookies();
  try {
    const cookie = store.get(AUTHEN_COOKIES);
    if (cookie?.value) {
      const payload = JSON.parse(cookie.value);
      // refresh token;
      return payload as AuthenticateType;
    }
  } catch {}
  return null;
};

export const setCurrent = async (current: AuthenticateType) => {
  const store = await cookies();
  store.set(AUTHEN_COOKIES, JSON.stringify(current), {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
};

export const getDiviceId = async () => {
  const store = await cookies();
  return store.get(DEVICE_ID)?.value;
};

export const refreshToken = async () => {
  const current = await getCurrent();
  const deviceId = await getDiviceId();

  if (!current) {
    return null;
  }

  if (current.expires && new Date(current.expires).getTime() > Date.now()) {
    return current;
  }

  const response = await axios.post<{
    isSuccess: boolean;
    accessToken: string;
  }>(
    `${NEXT_PUBLIC_API_HOST_ADDRESS}/api/auth/refresh-token`,
    {
      accessToken: current.token,
      refreshToken: current.refreshToken,
      deviceId,
    },
    {
      headers: {
        Authorization: `Bearer ${current?.token}`,
      },
    },
  );
  if (response.data.isSuccess) {
    const newCurrent = { ...current, token: response.data.accessToken };
    return newCurrent;
  }
  return null;
};
