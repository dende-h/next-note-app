import { Box } from "@chakra-ui/react";
// FullCalendarコンポーネント。
import FullCalendar from "@fullcalendar/react";

// FullCalendarで月表示を可能にするモジュール。
import dayGridPlugin from "@fullcalendar/daygrid";

// FullCalendarで日付や時間が選択できるようになるモジュール。
import interactionPlugin from "@fullcalendar/interaction";
import { memo, useEffect, useState, VFC } from "react";
import { useRecoilValue } from "recoil";
import { categoryIsScheduleSelector } from "../../globalState/category/categoryIsScheduleSelector";
import format from "date-fns/format";
import { categoryIsTodoSelector } from "../../globalState/category/categoryIsTodoSelector";

export const Calendar: VFC = memo(() => {
	const [addEvent, setAddEvent] = useState([{}]);
	const schedule = useRecoilValue(categoryIsScheduleSelector);
	const todo = useRecoilValue(categoryIsTodoSelector)
	const [hoveredEvent, setHoveredEvent] = useState(null);

	useEffect(() => {
		const events = schedule.map((item) => {
			const eventDate = format(new Date(item.date), "yyyy-MM-dd");
			const event = { title: item.title, description: item.description,date: eventDate};
			return event;
		}).concat(todo.map((item) => {
			const eventDate = format(new Date(item.date), "yyyy-MM-dd");
			const event = { title: item.title, date: eventDate,backgroundColor: 'pink',
				borderColor: 'pink' };
			return event;}))
		
		setAddEvent(events);
	}, [schedule,todo]);

	return (
		<>
			<Box backgroundColor={"gray.50"} w="100%" minHeight="850px" padding={6} borderRadius={10} shadow={"xl"} m={4}>
				<FullCalendar
					locale="ja"
					plugins={[dayGridPlugin, interactionPlugin]}
					initialView="dayGridMonth"
					selectable={true}
					weekends={true}
					titleFormat={{
						year: "numeric",
						month: "short"
					}}
					headerToolbar={{
						start: "title"
					}}
					events={addEvent}
					contentHeight={"700px"}
					 eventRender={(info) => {
        const { event } = info;

        const handleMouseEnter = () => {
          setHoveredEvent(event);
        };

        const handleMouseLeave = () => {
          setHoveredEvent(null);
        };

        return (
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {event.title}
          </div>
        );
      }}
    >
      {hoveredEvent && (
        <Tooltip label={hoveredEvent.title}>
          <div>{hoveredEvent.title}</div>
        </Tooltip>
      )}

				</FullCalendar>
			</Box>
		</>
	);
});
