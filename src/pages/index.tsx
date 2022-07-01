import { Box, Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { Head } from "../components/templates/Head";
import { getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getSupabase } from "../utils/supabase";
import { memoListState } from "../globalState/memo/memoListState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import HeaderLayout from "../components/templates/HeaderLayout";
import { MemoList } from "../components/organism/MemoList";
import { Calendar } from "../components/organism/Calendar";
import { useEffect, useState } from "react";
import { userState } from "../globalState/user/userState";
import { isShowTodo } from "../globalState/board/isShowTodo";
import { TodoBoard } from "../components/organism/TodoBoard";

const Index = ({ user, note }) => {
	const [isFetched, setIsFetched] = useState(false);
	const [isUserFetched, setUserFetched] = useState(false);
	const setMemos = useSetRecoilState(memoListState);
	const setUser = useSetRecoilState(userState);
	const isShowTodoBoard = useRecoilValue(isShowTodo);

	useEffect(() => {
		if (note) {
			setMemos(note);
			setIsFetched(true);
		}
	}, []);

	useEffect(() => {
		if (isFetched) {
			setUser(user);
			setUserFetched(true);
		}
	}, [isFetched]);

	return (
		<>
			<HeaderLayout>
				<Head>
					<meta charSet="utf-8" />
					<title>TopPage -Note me</title>
				</Head>
				{isUserFetched ? (
					<Flex>
						<MemoList />
						{isShowTodoBoard ? <TodoBoard /> : <Calendar />}
					</Flex>
				) : (
					<Center>
						<Text p={100} fontSize={50}>
							...Loading
						</Text>
						<Spinner />
					</Center>
				)}
			</HeaderLayout>
		</>
	);
};

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps({ req, res }) {
		const {
			user: { accessToken }
		} = getSession(req, res);

		const supabase = getSupabase(accessToken);

		const { data: note } = await supabase.from("note").select("*").order("created_at", { ascending: true });

		return {
			props: { note }
		};
	}
});

export default Index;
