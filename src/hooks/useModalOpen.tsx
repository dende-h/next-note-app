import { useDisclosure } from "@chakra-ui/react";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { completedFlag } from "../globalState/board/completedFlag";
import { startedFlag } from "../globalState/board/startedFlag";

export const useModalOpen = () => {
	const { onOpen, onClose, isOpen } = useDisclosure();
	const setIsCompleted = useSetRecoilState(completedFlag);
	const setIsStarted = useSetRecoilState(startedFlag);
	const modalOpenAndClose: (TimeToClose: number) => void = useCallback((timeToClose) => {
		onOpen();
		setTimeout(() => {
			onClose();
			setIsCompleted(false);
			setIsStarted(false);
		}, timeToClose);
	}, []);
	const modalOpen: () => void = useCallback(() => {
		onOpen();
	}, []);
	return { modalOpen, modalOpenAndClose, onClose, isOpen };
};
