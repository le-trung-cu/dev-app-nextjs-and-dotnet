import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useEffect, useState } from "react";

type VerificationInputProps = {
  disabled?: boolean;
  onComplete: (code: string) => void;
};

export const VerificationInput = ({
  disabled=false,
  onComplete,
}: VerificationInputProps) => {
  const [inviteToken, setInviteToken] = useState("");

  useEffect(() => {
    if (inviteToken.length == 6) {
      onComplete(inviteToken);
    }
  }, [inviteToken, onComplete]);

  return (
    <InputOTP
      value={inviteToken}
      onChange={(value) => setInviteToken(value)}
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      disabled={disabled}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} className="size-[60px] text-2xl font-bold" />
        <InputOTPSlot index={1} className="size-[60px] text-2xl font-bold" />
        <InputOTPSlot index={2} className="size-[60px] text-2xl font-bold" />
        <InputOTPSlot index={3} className="size-[60px] text-2xl font-bold" />
        <InputOTPSlot index={4} className="size-[60px] text-2xl font-bold" />
        <InputOTPSlot index={5} className="size-[60px] text-2xl font-bold" />
      </InputOTPGroup>
    </InputOTP>
  );
};
