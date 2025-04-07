import { z } from "zod";

export const createChannelSchema = z.object({
  name: z.string().min(1),
});

export const updateChanbelSchema = createChannelSchema;

export type Channel = {
  id: string;
  name: string;
}

export type GetChannelsResponseType = {
  isSuccess: boolean;
  channels: Channel[];
}


export type GetChannelResponseType = {
  isSuccess: boolean;
  channel: Channel;
}