import { useState } from "react";

export const useTextArea = () => {
	const [value, setValue] = useState("");

	const onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setValue(e.target.value);
	};
	return { onChangeTextArea, value, setValue };
};
