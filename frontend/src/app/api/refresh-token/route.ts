import { getCurrent, getDiviceId, setCurrent } from "@/app-features/auth/actions";
import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import axios from "axios";

export async function POST(request: Request) {
  const current = await getCurrent();
  const deviceId = await getDiviceId();

  if (!current || !deviceId) {
    return new Response(JSON.stringify({ isSuccess: false }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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

  if(response.data.isSuccess) {
    setCurrent({...current, token: response.data.accessToken});
  }

  return new Response(JSON.stringify(response.data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
