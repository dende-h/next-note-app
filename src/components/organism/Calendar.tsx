import { Box, Tooltip } from "@chakra-ui/react";
// FullCalendarコンポーネント。
import FullCalendar, { EventContentArg } from "@fullcalendar/react";

// FullCalendarで月表示を可能にするモジュール。
import dayGridPlugin from "@fullcalendar/daygrid";

//日本語対応のためのインポート
import jaLocale from "@fullcalendar/core/locales/ja";

import { memo, useEffect, useState, VFC } from "react";
import { useRecoilValue } from "recoil";
import { categoryIsScheduleSelector } from "../../globalState/category/categoryIsScheduleSelector";
import format from "date-fns/format";
import { categoryIsTodoSelector } from "../../globalState/category/categoryIsTodoSelector";
import { FetchMemoList } from "../../types/fetchMemoList";

export const Calendar: VFC = memo(() => {
	const [addEvent, setAddEvent] = useState([{}]);
	const schedule: FetchMemoList[] = useRecoilValue(categoryIsScheduleSelector);
	const todo: FetchMemoList[] = useRecoilValue(categoryIsTodoSelector);
	const completed = 2;

	//tooltipを追加するためにコンポーネントを生成している
	const EventComponent = (arg: EventContentArg) => (
		<Tooltip
			label={arg.event.extendedProps.description}
			aria-label="tooltip"
			placement="top-start"
			hasArrow
			arrowSize={5}
		>
			<div>{arg.event.title}</div>
		</Tooltip>
	);

	//TODOもカレンダーに表示するために、concat関数でイベント用の配列を作成
	useEffect(() => {
		const events = schedule
			.map((item) => {
				const eventDate = format(new Date(item.date), "yyyy-MM-dd");
				const beforeEndDate = new Date(item.endDate);
				//そのままの日付だとカレンダーに反映が前日までになるので、１日足してる
				const endDate =
					item.endDate !== eventDate
						? format(beforeEndDate.setDate(beforeEndDate.getDate() + 1), "yyyy-MM-dd")
						: eventDate;
				const event = { title: item.title, start: eventDate, end: endDate, description: item.description };
				return event;
			})
			.concat(
				todo.map((item) => {
					const eventDate = format(new Date(item.date), "yyyy-MM-dd");
					const beforeEndDate = new Date(item.endDate);
					const endDate =
						item.endDate !== eventDate
							? format(beforeEndDate.setDate(beforeEndDate.getDate() + 1), "yyyy-MM-dd")
							: eventDate;
					const todoColor = item.mark_div === completed ? "gray" : "pink";
					const event = {
						title: item.title,
						start: eventDate,
						end: endDate,
						description: item.description,
						backgroundColor: todoColor,
						borderColor: todoColor
					};
					return event;
				})
			);

		setAddEvent(events);
	}, [schedule, todo]);

	// const eventExample = [
	// 	{
	// 		title: "イベント1",
	// 		start: new Date(),
	// 		end: new Date().setDate(new Date().getDate() + 5),
	// 		description: "温泉旅行",
	// 		backgroundColor: "green",
	// 		borderColor: "green"
	// 	},
	// 	{
	// 		title: "期末テスト",
	// 		start: new Date().setDate(new Date().getDate() + 5),
	// 		description: "2年最後の期末テスト"
	// 	}
	// ];

	return (
		<>
			<Box backgroundColor={"gray.50"} w="100%" minHeight="850px" padding={6} borderRadius={10} shadow={"xl"} m={4}>
				<FullCalendar
					locales={[jaLocale]}
					locale="ja"
					plugins={[dayGridPlugin]}
					initialView="dayGridMonth"
					events={addEvent}
					weekends={true} //falseにすると土日が含まれなくなるdefault値がtrueなので省略可
					headerToolbar={{
						start: "prevYear,nextYear",
						center: "title",
						end: "today prev,next"
					}}
					contentHeight={"700px"}
					eventContent={(arg: EventContentArg) => EventComponent(arg)}
				/>
			</Box>
		</>
	);
});
