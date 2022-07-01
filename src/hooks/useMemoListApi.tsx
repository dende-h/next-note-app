import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { memoListState } from "../globalState/memo/memoListState";
import { userState } from "../globalState/user/userState";
import { FetchMemoList } from "../types/fetchMemoList";
import { User } from "../types/user";
import { getSupabase } from "../utils/supabase";

type body = Omit<FetchMemoList, "id">;

export const useMemoApi = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [memoList, setMemoList] = useRecoilState<Array<FetchMemoList>>(memoListState);
	const [user, setUser] = useRecoilState<User>(userState);
	const supabase = getSupabase(user.accessToken);
	const user_id = user.sub;
	const router = useRouter();

	const authErrorNavigate = () => {
		setMemoList([]);
		setUser({
			accessToken: "",
			email: "",
			email_verified: false,
			name: "",
			nickname: "",
			picture: "",
			sub: "",
			updated_at: ""
		});
		toast.error("ログアウトされました。再度ログインしてください");
		router.push("/api/auth/logout");
	};

	const fetchMemoList = async () => {
		setLoading(true);
		const { data, error } = await supabase.from("note").select("*").order("created_at", { ascending: true });
		setMemoList(data);
		setLoading(false);
		if (error) {
			authErrorNavigate();
		}
	};

	const inputMemoList = async (body: body) => {
		setLoading(true);
		const insertData = { ...body, user_id };
		const { error } = await supabase.from("note").insert(insertData);
		fetchMemoList();
		if (error) {
			authErrorNavigate();
		}
	};

	const editMemoList = async (id: string | undefined, body: body) => {
		setLoading(true);
		const editData = { ...body, user_id };
		const { error } = await supabase.from("note").update(editData).eq("id", id);
		fetchMemoList();
		if (error) {
			authErrorNavigate();
		}
	};

	const deleteMemoList = async (id: string | undefined) => {
		setLoading(true);
		const { error } = await supabase.from("note").delete().eq("id", id);
		fetchMemoList();
		if (error) {
			authErrorNavigate();
		}
	};

	const editMarkDiv = async (id: string | undefined, body: body) => {
		setLoading(true);
		const editData = { ...body, user_id };
		const { error } = await supabase.from("note").update(editData).eq("id", id);
		fetchMemoList();
		if (error) {
			authErrorNavigate();
		}
	};
	return { fetchMemoList, inputMemoList, editMemoList, deleteMemoList, editMarkDiv, memoList, loading };
};
