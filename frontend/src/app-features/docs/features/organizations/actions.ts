import { getCurrent, refreshToken, setCurrent } from "@/app-features/auth/actions";
import { NEXT_PUBLIC_API_HOST_ADDRESS } from "@/constant";
import axios from "axios";

export const swichesOrganization = async ({
  organizationId,
}: {
  organizationId: string | null;
}) => {
  const current =  await refreshToken();
  if (!current) {
    return null;
  }

  const response = await axios.put<{
    isSuccess: boolean;
    accessToken: string;
  }>(
    `${NEXT_PUBLIC_API_HOST_ADDRESS}/api/docs/organization/swiches-organization`,
    {
      organizationId,
    },
    {
      headers: {
        Authorization: `Bearer ${current?.token}`,
      },
    },
  );
  if (response.data.isSuccess) {
    const newCurrent = { ...current, token: response.data.accessToken };
    setCurrent(newCurrent);
    return newCurrent;
  }

  return null;
};
