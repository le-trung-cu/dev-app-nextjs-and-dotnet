import { getCurrent, refreshToken } from "@/app-features/auth/actions";
import { Document } from "@/app-features/docs/features/documents/types";
import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import axios from "axios";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  const current = await refreshToken();
  if (!current) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { room } = await req.json();

  const response = await axios.get<{ isSuccess: boolean; document: Document }>(
    `/api/docs/documents/${room}`,
    {
      baseURL: NEXT_PUBLIC_API_HOST_ADDRESS,
      headers: {
        Authorization: `Bearer ${current.token}`,
      },
    },
  );

  if (!response?.data?.isSuccess) {
    return new Response("Unauthorized", { status: 401 });
  }
  const document = response.data.document;
  if (!document) {
    return new Response("Unauthorized", { status: 401 });
  }
  const name = current.user.name ?? "Anonymous";

  const nameToNumber = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = Math.abs(nameToNumber) % 360;
  const color = `hsl(${hue}, 80%, 60%)`;
  const session = liveblocks.prepareSession(current.user.id, {
    userInfo: {
      name,
      color,
    },
  });

  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
