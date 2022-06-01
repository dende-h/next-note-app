import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import { useRecoilState, useRecoilValue } from "recoil";
import { memoListState } from "../globalState/memo/memoListState";
import { userState } from "../globalState/user/userState";
import { FetchMemoList } from "../types/fetchMemoList";
import { User } from "../types/user";
import { getSupabase } from "../utils/supabase";
import { useDragDropData } from "./useDragDropData";

type body = Omit<FetchMemoList, "id">;

export const useMemoApi = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [memoList, setMemoList] = useRecoilState<Array<FetchMemoList>>(memoListState);
	const { setApiData } = useDragDropData();
	const user = useRecoilValue<User>(userState);
	const supabase = getSupabase(user.accessToken);
	const router = useRouter();

	const authErrorNavigate = useCallback(() => {
		toast.error("ログアウトされました。再度ログインしてください");
		router.push("/api/auth/logout");
	}, []);

	const fetchMemoList = useCallback(async () => {
		setLoading(true);
		const { data, error } = await supabase.from("note").select("*").order("created_at", { ascending: true });
		setMemoList(data);
		setApiData(data);
		setLoading(false);
		if (error) {
			authErrorNavigate();
		}
	}, []);

	const inputMemoList = useCallback(async (body: body) => {
		setLoading(true);
		const insertData = { ...body, user_id: user.sub };
		const { error } = await supabase.from("note").insert(insertData);
		fetchMemoList();
		if (error) {
			authErrorNavigate();
		}
	}, []);

	const editMemoList = useCallback(async (id: string | undefined, body: body) => {
		setLoading(true);
		const editData = { ...body, user_id: user.sub };
		const { error } = await supabase.from("note").update(editData).eq("id", id);
		fetchMemoList();
		if (error) {
			authErrorNavigate();
		}
	}, []);

	const deleteMemoList = useCallback(async (id: string | undefined) => {
		setLoading(true);
		const { error } = await supabase.from("note").delete().eq("id", id);
		fetchMemoList();
		if (error) {
			authErrorNavigate();
		}
	}, []);

	const editMarkDiv = useCallback(async (id: string | undefined, body: body) => {
		setLoading(true);
		const editData = { ...body, user_id: user.sub };
		await supabase.from("note").update(editData).eq("id", id);
		const { data, error } = await supabase.from("note").select("*").order("created_at", { ascending: true });
		setMemoList(data);
		setLoading(false);
		if (error) {
			authErrorNavigate();
		}
	}, []);
	return { fetchMemoList, inputMemoList, editMemoList, deleteMemoList, editMarkDiv, memoList, loading };
};
