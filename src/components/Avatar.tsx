import classNames from "classnames";
import { useMemo } from "react";

import { base64ToBuffer, decryptData } from "@/backend/accounts/crypto";
import { Icon, Icons } from "@/components/Icon";
import { UserIcon } from "@/components/UserIcon";
import { AccountProfile } from "@/pages/parts/auth/AccountCreatePart";
import { useAuthStore } from "@/stores/auth";

export interface AvatarProps {
  profile: AccountProfile["profile"];
  sizeClass?: string;
  iconClass?: string;
  bottom?: React.ReactNode;
}

export function Avatar(props: AvatarProps) {
  return (
    <div className="relative inline-block">
      <div
        className={classNames(
          props.sizeClass,
          "rounded-full overflow-hidden flex items-center justify-center text-white"
        )}
        style={{
          background: `linear-gradient(to bottom right, ${props.profile.colorA}, ${props.profile.colorB})`,
        }}
      >
        <UserIcon
          className={props.iconClass}
          icon={props.profile.icon as any}
        />
      </div>
      {props.bottom ? (
        <div className="absolute bottom-0 left-1/2 transform translate-y-1/2 -translate-x-1/2">
          {props.bottom}
        </div>
      ) : null}
    </div>
  );
}

export function UserAvatar(props: {
  sizeClass?: string;
  iconClass?: string;
  bottom?: React.ReactNode;
  withName?: boolean;
}) {
  const auth = useAuthStore();

  const bufferSeed = useMemo(
    () =>
      auth.account && auth.account.seed
        ? base64ToBuffer(auth.account.seed)
        : null,
    [auth]
  );

  if (!auth.account || auth.account === null) return null;

  const deviceName = bufferSeed
    ? decryptData(auth.account.deviceName, bufferSeed)
    : "...";

  return (
    <>
      <Avatar
        profile={auth.account.profile}
        sizeClass={props.sizeClass ?? "w-[2rem] h-[2rem]"}
        iconClass={props.iconClass}
        bottom={props.bottom}
      />
      {props.withName && bufferSeed ? (
        <span>
          {deviceName.length >= 20
            ? `${deviceName.slice(0, 20 - 1)}…`
            : deviceName}
        </span>
      ) : null}
    </>
  );
}

export function NoUserAvatar(props: {
  sizeClass?: string;
  iconClass?: string;
}) {
  return (
    <div className="relative inline-block">
      <div
        className={classNames(
          props.sizeClass ?? "w-[2rem] h-[2rem]",
          "rounded-full overflow-hidden flex items-center justify-center text-type-dimmed hover:text-type-secondary bg-pill-background bg-opacity-50 hover:bg-opacity-100 transition-colors duration-100"
        )}
      >
        <Icon className={props.iconClass ?? "text-xl"} icon={Icons.MENU} />
      </div>
    </div>
  );
}
