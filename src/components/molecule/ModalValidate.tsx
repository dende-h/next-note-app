import { DeleteIcon } from "@chakra-ui/icons";
import {
	Button,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure
} from "@chakra-ui/react";
import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../globalState/user/userState";
import { useMemoApi } from "../../hooks/useMemoListApi";
import { FetchMemoList } from "../../types/fetchMemoList";

type Props = {
	deleteMemo: FetchMemoList;
};

export const ModalValidate: VFC<Props> = memo((props: Props) => {
	const { deleteMemo } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { deleteMemoList, loading } = useMemoApi();
	const onClickDeleteButton = () => {
		deleteMemoList(deleteMemo.id);
	};

	return (
		<>
			<IconButton
				size={"sm"}
				colorScheme="twitter"
				aria-label="input"
				icon={<DeleteIcon />}
				borderRadius="full"
				onClick={onOpen}
			/>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>本当に削除しますか？</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>削除後は元に戻せません!</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClickDeleteButton} isDisabled={loading} isLoading={loading}>
							delete
						</Button>
						<Button onClick={onClose} isDisabled={loading}>
							cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
});
