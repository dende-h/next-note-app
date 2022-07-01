import { memo, useState, VFC } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";
import format from "date-fns/format";
import { useSetRecoilState } from "recoil";
import { dateState } from "../../globalState/date/dateState";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import _ from "lodash";
import { chakra } from "@chakra-ui/react";
import { datePickerMonthArray } from "../../utils/datePickerMonthArray";

registerLocale("ja", ja);

type Props = {
	defaultValue: string;
};

export const CustomDatePickerCalendar: VFC<Props> = memo((props: Props) => {
	const { defaultValue } = props;
	const initialDate = new Date(defaultValue);
	const [startDate, setStartDate] = useState<Date>(initialDate);
	const dateValueSet = useSetRecoilState(dateState);
	const getInputDate = (event: Date) => {
		setStartDate(event);
		const date = format(event, "yyyy/MM/dd");
		dateValueSet(date);
	};
	const years = _.range(2020, getYear(new Date()) + 1, 1);

	return (
		<DatePicker
			renderCustomHeader={({
				date,
				changeYear,
				changeMonth,
				decreaseMonth,
				increaseMonth,
				prevMonthButtonDisabled,
				nextMonthButtonDisabled
			}) => (
				<chakra.div m="10" display="flex" justifyContent="center">
					<chakra.button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
						前の月へ
					</chakra.button>
					<chakra.select value={getYear(date)} onChange={({ target: { value } }) => changeYear(parseInt(value))}>
						{years.map((item) => {
							return (
								<option key={item} value={item}>
									{item}年
								</option>
							);
						})}
					</chakra.select>
					<chakra.select
						value={datePickerMonthArray[getMonth(date)]}
						onChange={({ target: { value } }) => changeMonth(datePickerMonthArray.indexOf(value))}
					>
						{datePickerMonthArray.map((option) => (
							<chakra.option key={option} value={option}>
								{option}
							</chakra.option>
						))}
					</chakra.select>
					<chakra.button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
						次の月へ
					</chakra.button>
				</chakra.div>
			)}
			dateFormat="yyyy/MM/dd"
			locale="ja"
			selected={startDate}
			onChange={getInputDate}
		/>
	);
});
