import { memo, useState, VFC } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
import format from "date-fns/format";
import { useSetRecoilState } from "recoil";
import { dateState } from "../../globalState/date/dateState";

registerLocale("ja", ja);

type Props = {
	defaultValue: string;
};

export const DatePickerCalendar: VFC<Props> = memo((props: Props) => {
	const { defaultValue } = props;
	const initialDate = new Date(defaultValue);
	const [startDate, setStartDate] = useState<Date>(initialDate);
	const dateValueSet = useSetRecoilState(dateState);
	const getInputDate = (event: Date) => {
		setStartDate(event);
		const date = format(event, "yyyy/MM/dd");
		dateValueSet(date);
	};
	return <DatePicker dateFormat="yyyy/MM/dd" locale="ja" selected={startDate} onChange={getInputDate} />;
});
