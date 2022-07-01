import { Box, chakra, Flex, Spacer, Text } from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";
import { useSetRecoilState } from "recoil";
import { isShowTodo } from "../../globalState/board/isShowTodo";
import { memoListState } from "../../globalState/memo/memoListState";
import { userState } from "../../globalState/user/userState";
import { User } from "../../types/user";
import { PrimaryButton } from "../atoms/PrimaryButton";

export const MainPageHeader = memo(() => {
	const setIsShowTodoBoard = useSetRecoilState(isShowTodo);
	const setMemoList = useSetRecoilState(memoListState);
	const setUserInfo = useSetRecoilState<User>(userState);
	const clickLogoutButton = () => {
		setMemoList([]);
		setUserInfo({
			accessToken: "",
			email: "",
			email_verified: false,
			name: "",
			nickname: "",
			picture: "",
			sub: "",
			updated_at: ""
		});
	};
	return (
		<>
			<Flex bg="teal.100" w="100%" h={["50px", "60px", "70px"]} justifyContent={"center"} fontFamily={"cursive"}>
				<Box as={"h1"} p={[0, 1, 2]} fontSize={["md", "xl", "xx-large"]}>
					“ Note Me ”
				</Box>
				<Box p={[0, 1, 5]} _hover={{ color: "blue" }}>
					<Text as={"a"} onClick={() => setIsShowTodoBoard(true)}>
						Show TodoBoard
					</Text>
				</Box>
				<Box p={[0, 1, 5]} _hover={{ color: "blue" }}>
					<Text as={"a"} onClick={() => setIsShowTodoBoard(false)}>
						Show Calendar
					</Text>
				</Box>
				<Spacer />
				<Box p={[0, 2, 3]}>
					<PrimaryButton
						bgColor={"telegram.500"}
						color={"gray.50"}
						_hover={{ opacity: 0.6 }}
						onClick={clickLogoutButton}
					>
						<Link href="/api/auth/logout">
							<chakra.a>ログアウト</chakra.a>
						</Link>
					</PrimaryButton>
				</Box>
			</Flex>
		</>
	);
});
