import useSWR from "swr";
import { useSupabaseSession } from "./useSupabaseSession";

export const useFetch = <T>(url: string | null, key: string) => {
  const { token } = useSupabaseSession();

  const fetcher = async ([url, token]: [string, string]) => {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!res.ok) {
      throw new Error("データの取得に失敗しました");
    }
    const json = await res.json();
    return json[key] as T;
  };

  const { data, error, isLoading } = useSWR<T>(
    url && token ? [url, token] : null,
    fetcher
  );
  return { data, error, isLoading };
};

//「Supabaseのトークン取得」と「JSONの特定キーの取り出し(res.json(key)[key])」を行う
