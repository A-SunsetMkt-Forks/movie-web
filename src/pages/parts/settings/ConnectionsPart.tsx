import { Dispatch, SetStateAction, useCallback } from "react";

import { Button } from "@/components/Button";
import { Toggle } from "@/components/buttons/Toggle";
import { Icon, Icons } from "@/components/Icon";
import { SettingsCard } from "@/components/layout/SettingsCard";
import { AuthInputBox } from "@/components/text-inputs/AuthInputBox";
import { Divider } from "@/components/utils/Divider";
import { Heading1 } from "@/components/utils/Text";

interface ProxyEditProps {
  proxyUrls: string[] | null;
  setProxyUrls: Dispatch<SetStateAction<string[] | null>>;
}

interface BackendEditProps {
  backendUrl: string | null;
  setBackendUrl: Dispatch<SetStateAction<string | null>>;
}

function ProxyEdit({ proxyUrls, setProxyUrls }: ProxyEditProps) {
  const add = useCallback(() => {
    setProxyUrls((s) => [...(s ?? []), ""]);
  }, [setProxyUrls]);

  const changeItem = useCallback(
    (index: number, val: string) => {
      setProxyUrls((s) => [
        ...(s ?? []).map((v, i) => {
          if (i !== index) return v;
          return val;
        }),
      ]);
    },
    [setProxyUrls]
  );

  const removeItem = useCallback(
    (index: number) => {
      setProxyUrls((s) => [...(s ?? []).filter((v, i) => i !== index)]);
    },
    [setProxyUrls]
  );

  return (
    <SettingsCard>
      <div className="flex justify-between items-center gap-4">
        <div className="my-3">
          <p className="text-white font-bold mb-3">Use custom proxy workers</p>
          <p className="max-w-[20rem] font-medium">
            To make the application function, all traffic is routed through
            proxies. Enable this if you want to bring your own workers.
          </p>
        </div>
        <div>
          <Toggle
            onClick={() => setProxyUrls((s) => (s === null ? [] : null))}
            enabled={proxyUrls !== null}
          />
        </div>
      </div>
      {proxyUrls !== null ? (
        <>
          <Divider marginClass="my-6 px-8 box-content -mx-8" />
          <p className="text-white font-bold mb-3">Worker URLs</p>

          <div className="my-6 space-y-2 max-w-md">
            {(proxyUrls?.length ?? 0) === 0 ? (
              <p>No workers yet, add one below</p>
            ) : null}
            {(proxyUrls ?? []).map((v, i) => (
              <div
                // not the best but we can live with it
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className="grid grid-cols-[1fr,auto] items-center gap-2"
              >
                <AuthInputBox
                  value={v}
                  onChange={(val) => changeItem(i, val)}
                  placeholder="https://"
                />
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="h-full scale-90 hover:scale-100 rounded-full aspect-square bg-authentication-inputBg hover:bg-authentication-inputBgHover flex justify-center items-center transition-transform duration-200 hover:text-white cursor-pointer"
                >
                  <Icon className="text-xl" icon={Icons.X} />
                </button>
              </div>
            ))}
          </div>

          <Button theme="purple" onClick={add}>
            Add new worker
          </Button>
        </>
      ) : null}
    </SettingsCard>
  );
}

function BackendEdit({ backendUrl, setBackendUrl }: BackendEditProps) {
  return (
    <SettingsCard>
      <div className="flex justify-between items-center gap-4">
        <div className="my-3">
          <p className="text-white font-bold mb-3">Custom server</p>
          <p className="max-w-[20rem] font-medium">
            To make the application function, all traffic is routed through
            proxies. Enable this if you want to bring your own workers.
          </p>
        </div>
        <div>
          <Toggle
            onClick={() => setBackendUrl((s) => (s === null ? "" : null))}
            enabled={backendUrl !== null}
          />
        </div>
      </div>
      {backendUrl !== null ? (
        <>
          <Divider marginClass="my-6 px-8 box-content -mx-8" />
          <p className="text-white font-bold mb-3">Custom server URL</p>
          <AuthInputBox onChange={setBackendUrl} value={backendUrl ?? ""} />
        </>
      ) : null}
    </SettingsCard>
  );
}

export function ConnectionsPart(props: BackendEditProps & ProxyEditProps) {
  return (
    <div>
      <Heading1 border>Connections</Heading1>
      <div className="space-y-6">
        <ProxyEdit
          proxyUrls={props.proxyUrls}
          setProxyUrls={props.setProxyUrls}
        />
        <BackendEdit
          backendUrl={props.backendUrl}
          setBackendUrl={props.setBackendUrl}
        />
      </div>
    </div>
  );
}
