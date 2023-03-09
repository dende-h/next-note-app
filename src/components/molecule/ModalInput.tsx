import {
	Button,
	Divider,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useDisclosure,
	Stack,
	IconButton
} from "@chakra-ui/react";
import { memo, useEffect, useState, VFC } from "react";
import { useRecoilState } from "recoil";
import { categoryState } from "../../globalState/category/categoryState";
import { dateState } from "../../globalState/date/dateState";
import { useInputForm } from "../../hooks/useInputForm";
import { useMemoApi } from "../../hooks/useMemoListApi";
import { useTextArea } from "../../hooks/useTextArea";
import { CustomDatePickerCalendar } from "./CustomDatePickerCalendar";
import { RadioCategory } from "./RadioCategory";
import format from "date-fns/format";
import { AddIcon } from "@chakra-ui/icons";
import { endDateState } from "../../globalState/date/endDateState";
import { BodyType } from "../../types/bodyType";

export const ModalInput: VFC = memo(() => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { value: title, setValue: setTitle, onChangeInputForm: onChangeTitle } = useInputForm();
	const { value: description, setValue: setDescription, onChangeTextArea: onChangeDescription } = useTextArea();
	const [category, setCategory] = useRecoilState(categoryState);
	const [date, setDate] = useRecoilState(dateState);
	const [endDate, setEndDate] = useRecoilState(endDateState);
	const [isDisabledSaveButton, setIsDisabledSaveButton] = useState(true);
	const { inputMemoList, loading } = useMemoApi();

	const setNewDate = () => {
		setDate(format(new Date(), "yyyy/MM/dd"));
		setEndDate(format(new Date(), "yyyy/MM/dd"));
	};

	useEffect(() => {
		title === "" || description === "" ? setIsDisabledSaveButton(true) : setIsDisabledSaveButton(false);
	}, [title, description]);

	useEffect(() => {
		if (isOpen === false) {
			setTitle("");
			setDescription("");
			setCategory("メモ");
			setNewDate();
		}
	}, [isOpen]);

	const onClickSaveButton = () => {
		const body: BodyType = { title, description, category, date, endDate, mark_div: 0 };
		inputMemoList(body).then(() => onClose());
	};

	return (
		<>
			<IconButton colorScheme="twitter" aria-label="input" icon={<AddIcon />} borderRadius="full" onClick={onOpen} />
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent shadow={"dark-lg"}>
					<Stack>
						<ModalHeader fontFamily={"cursive"} fontSize={"xx-large"}>
							Input New Memo
						</ModalHeader>
						<Divider />
						<ModalCloseButton />
						<ModalBody pb={6} fontFamily={"mono"}>
							<Stack spacing={2}>
								<FormLabel margin={"unset"} fontSize={"xl"}>
									Title
								</FormLabel>
								<Input placeholder="Title" onChange={onChangeTitle} />
								<FormLabel fontSize={"xl"}>Date</FormLabel>
								<CustomDatePickerCalendar defaultValue={date} />
								<CustomDatePickerCalendar defaultValue={endDate} />
								<FormLabel fontSize={"xl"}>Category</FormLabel>
								<RadioCategory value={"メモ"} />
								<FormLabel fontSize={"xl"}>Description</FormLabel>
								<Textarea placeholder="Description" onChange={onChangeDescription} />
							</Stack>
						</ModalBody>
					</Stack>
					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={onClickSaveButton}
							isDisabled={isDisabledSaveButton || loading}
							isLoading={loading}
						>
							save
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
