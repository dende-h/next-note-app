import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import Image from "next/image";
import { ReactNode, VFC } from "react";

type Props = {
	onClose: () => void;
	isOpen: boolean;
	modalImage: string;
	children: ReactNode;
};

export const ModalTodoProgress: VFC<Props> = (props: Props) => {
	const { onClose, isOpen, modalImage, children } = props;

	return (
		<>
			<Modal closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent w={"auto"}>
					<ModalHeader textAlign={"center"} fontFamily={"cursive"}>
						{children}
					</ModalHeader>
					<ModalBody>
						<Image width={"320px"} height={"213px"} src={modalImage} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
