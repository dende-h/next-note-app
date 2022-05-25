import { Flex } from "@chakra-ui/react";
import { Head } from "../components/templates/Head";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getSupabase } from "../utils/supabase";
import { memoListState } from "../globalState/memo/memoListState";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { MemoList } from "../components/organism/MemoList";
import { Calendar } from "../components/organism/Calendar";
import { useDragDropData } from "../hooks/useDragDropData";
import { useEffect } from "react";
import { userState } from "../globalState/user/userState";

const Index = ({ user, note }) => {
	const setMemos = useSetRecoilState(memoListState);
	const setUser = useSetRecoilState(userState);

	const { setApiData } = useDragDropData();

	useEffect(() => {
		if (note) {
			setMemos(note);
			setApiData(note);
		}
	}, []);
	useEffect(() => {
		setUser(user);
	}, []);

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<title>TopPage -Note me</title>
			</Head>
			<Flex>
				<MemoList />
				<Calendar />
			</Flex>
		</>
	);
};

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps({ req, res }) {
		const {
			user: { accessToken }
		} = getSession(req, res);

		const supabase = getSupabase(accessToken);

		const { data: note } = await supabase.from("note").select("*");

		return {
			props: { note }
		};
	}
});

export default Index;
