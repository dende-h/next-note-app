import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Stack,
	Divider,
	HStack,
	IconButton
} from "@chakra-ui/react";
import { memo, useState, VFC } from "react";
import toast from "react-hot-toast";
import { BsFillShareFill, BsStar } from "react-icons/bs";
import { FetchMemoList } from "../../types/fetchMemoList";
import { ModalEditor } from "./ModalEditor";
import { ModalValidate } from "./ModalValidate";

type Props = { oneMemo: FetchMemoList };

export const OneMemo: VFC<Props> = memo((props: Props) => {
	const { oneMemo } = props;
	const [star, setStar] = useState(false);
	const onClickShare = () => {
		toast.error("共有機能は未実装です");
	};
	const onClickStar = () => {
		toast.error("お気に入り機能は未実装です");
		setStar(!star);
	};

	return (
		<>
			<Accordion allowMultiple>
				<AccordionItem fontFamily={"cursive"}>
					<AccordionButton bg={"yellow.100"} _hover={{ opacity: "0.8" }}>
						{oneMemo.mark_div === 2 ? (
							<Box as={"del"} flex={"1"} color="gray.500">
								{oneMemo.title}
							</Box>
						) : (
							<Box flex={"1"}>{oneMemo.title}</Box>
						)}
						<AccordionIcon />
					</AccordionButton>
					<AccordionPanel pb={4} bg={"gray.50"} borderBottomRadius={"md"}>
						<Stack spacing={"4"}>
							<Box>{oneMemo.date}</Box>
							<Divider color={"brand.100"} />
							<Box>{oneMemo.description}</Box>
							<HStack justify={"center"} spacing={"6"}>
								<IconButton
									size={"sm"}
									colorScheme="twitter"
									aria-label="ShareButton"
									borderRadius="full"
									onClick={onClickShare}
									icon={<BsFillShareFill />}
								/>
								<ModalEditor editMemo={oneMemo} />
								<ModalValidate deleteMemo={oneMemo} />
								<IconButton
									size={"sm"}
									colorScheme={star ? "yellow" : "twitter"}
									aria-label="ShareButton"
									borderRadius="full"
									onClick={onClickStar}
									icon={<BsStar />}
								/>
							</HStack>
						</Stack>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</>
	);
});
