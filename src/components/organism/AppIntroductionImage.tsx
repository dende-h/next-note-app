import { Box } from "@chakra-ui/react";
import { memo, useState, VFC } from "react";

import { PopoverContainer } from "../templates/PopoverContainer";

export const AppIntroductionImage: VFC = memo(() => {
	const [isOpen, setIsOpen] = useState(false);
	const open = () => {
		setIsOpen(true);
	};
	const close = () => {
		setIsOpen(false);
	};

	return (
		<Box
			position={"relative"}
			w={"100%"}
			h={"800px"}
			bgColor={"gray.200"}
			backgroundImage="/pablo_picasso_38.png"
			backgroundSize={"contain"}
			backgroundPosition="center"
		>
			<Box
				position="absolute"
				width="100%"
				height="100%"
				top={0}
				left={0}
				backgroundSize={"cover"}
				backgroundImage="/cat9302345_TP_V.jpg"
				opacity={"0.4"}
				_hover={{ opacity: "1" }}
				onMouseOver={() => open()}
				onMouseLeave={() => close()}
				textAlign={"center"}
			>
				<PopoverContainer
					components={<Box w="60px" h="60px"></Box>}
					trigger="hover"
					popoverHeaderText="にゃんこ先輩の教え"
					isOpen={isOpen}
					placement="left"
				>
					ジャンプはたまに土曜日発売だから気をつけろよ
				</PopoverContainer>
			</Box>
		</Box>
	);
});
