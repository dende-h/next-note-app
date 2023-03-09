import {
	Button,
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
	Divider,
	Stack,
	IconButton,
	HStack,
	Box
} from "@chakra-ui/react";
import { memo, useEffect, useState, VFC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState } from "../../globalState/category/categoryState";
import { dateState } from "../../globalState/date/dateState";
import { useInputForm } from "../../hooks/useInputForm";
import { useMemoApi } from "../../hooks/useMemoListApi";
import { useTextArea } from "../../hooks/useTextArea";
import { FetchMemoList } from "../../types/fetchMemoList";
import { BodyType } from "../../types/bodyType";
import { CustomDatePickerCalendar } from "./CustomDatePickerCalendar";
import { RadioCategory } from "./RadioCategory";
import { EditIcon } from "@chakra-ui/icons";
import { userState } from "../../globalState/user/userState";
import { CustomEndDatePickerCalendar } from "./CustomEndDatePickerCalendar";
import { endDateState } from "../../globalState/date/endDateState";

type Props = {
	editMemo: FetchMemoList;
};

type body = BodyType;
export const ModalEditor: VFC<Props> = memo((props: Props) => {
	const { editMemo } = props;
	const { title, description, category, date, endDate } = editMemo;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { value: newTitle, setValue: setNewTitle, onChangeInputForm: onChangeTitle } = useInputForm();
	const { value: newDescription, setValue: setNewDescription, onChangeTextArea: onChangeDescription } = useTextArea();
	const [newCategory, setNewCategory] = useRecoilState(categoryState);
	const [newDate, setNewDate] = useRecoilState(dateState);
	const [newEndDate, setNewEndDate] = useRecoilState(endDateState);
	const [isDisabledSaveButton, setIsDisabledSaveButton] = useState(true);
	const { editMemoList, loading } = useMemoApi();

	useEffect(() => {
		(newTitle === `${title}` &&
			newDescription === `${description}` &&
			newCategory === `${category}` &&
			newDate === `${date}` &&
			newEndDate === `${endDate}`) ||
		newTitle === "" ||
		newDescription === ""
			? setIsDisabledSaveButton(true)
			: setIsDisabledSaveButton(false);
	}, [newTitle, newDescription, newCategory, newDate, newEndDate]);

	useEffect(() => {
		if (isOpen) {
			setNewTitle(title);
			setNewDescription(description);
			setNewCategory(category);
			setNewDate(date);
			setNewEndDate(endDate);
		} else {
			setNewTitle("");
			setNewDescription("");
			setNewCategory(category);
			setNewDate(date);
			setNewEndDate(date);
		}
	}, [isOpen]);

	const onClickSaveButton = () => {
		const body: body = {
			...editMemo,
			title: newTitle,
			description: newDescription,
			category: newCategory,
			date: newDate,
			endDate: newEndDate
		};
		delete body.id;
		editMemoList(editMemo.id, body).then(() => onClose());
	};

	return (
		<>
			<IconButton
				size={"sm"}
				colorScheme="twitter"
				aria-label="input"
				icon={<EditIcon />}
				borderRadius="full"
				onClick={onOpen}
			/>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent shadow={"dark-lg"}>
					<Stack>
						<ModalHeader fontFamily={"cursive"} fontSize={"xx-large"}>
							Edit Memo
						</ModalHeader>
						<Divider />
						<ModalCloseButton />
						<ModalBody pb={6} fontFamily={"mono"}>
							<Stack spacing={2}>
								<FormLabel margin={"unset"} fontSize={"xl"}>
									Title
								</FormLabel>
								<Input defaultValue={title} onChange={onChangeTitle} />
								{newCategory === "メモ" ? (
									<Box>
										<FormLabel fontSize={"xl"}>Date</FormLabel>
										<CustomDatePickerCalendar defaultValue={newDate} />
									</Box>
								) : (
									<HStack>
										<Box>
											<FormLabel fontSize={"xl"}>StartDate</FormLabel>
											<CustomDatePickerCalendar defaultValue={newDate} />
										</Box>
										<Box>
											<FormLabel fontSize={"xl"}>EndDate</FormLabel>
											<CustomEndDatePickerCalendar defaultValue={newEndDate} />
										</Box>
									</HStack>
								)}

								<FormLabel fontSize={"xl"}>Category</FormLabel>
								<RadioCategory value={category} />
								<FormLabel fontSize={"xl"}>Description</FormLabel>
								<Textarea defaultValue={description} onChange={onChangeDescription} />
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
