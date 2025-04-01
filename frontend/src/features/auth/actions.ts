"use server";
import { z } from "zod";
import { AuthenticateType, loginSchema, registerSchema } from "./types";
import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import { cookies } from "next/headers";
import { AUTHEN_COOKIES } from "./constant";

export const registerAction = async (data: z.infer<typeof registerSchema>) => {
  console.log(data, NEXT_PUBLIC_API_HOST_ADDRESS)
  const response = await fetch(`${NEXT_PUBLIC_API_HOST_ADDRESS}/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  });
  const responseData = await response.json();
  if(responseData.isSuccess) {
    const store = await cookies();
    store.set(AUTHEN_COOKIES, JSON.stringify(responseData), {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    })
  }
  return responseData;
  
}

export const loginAction = async (data: z.infer<typeof loginSchema>) => {
  console.log(data, NEXT_PUBLIC_API_HOST_ADDRESS)
  const response = await fetch(`${NEXT_PUBLIC_API_HOST_ADDRESS}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  });
  const responseData = await response.json();
  console.log(responseData);
  if(responseData.isSuccess) {
    const store = await cookies();
    store.set(AUTHEN_COOKIES, JSON.stringify(responseData), {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    })
  }
  return responseData;
}

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