import { memo, ReactNode, VFC } from "react";
import {
	Button,
	PlacementWithLogical,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	TypographyProps,
	UsePopoverProps
} from "@chakra-ui/react";

type Props = {
	children: ReactNode;
	popoverHeaderText?: string;
	trigger: UsePopoverProps["trigger"];
	buttonName?: string;
	components?: JSX.Element;
	placement?: PlacementWithLogical;
	fontWeight?: TypographyProps["fontWeight"];
	isOpen?: UsePopoverProps["isOpen"];
};

export const PopoverContainer: VFC<Props> = memo((props: Props) => {
	const {
		children,
		popoverHeaderText,
		trigger,
		buttonName = "trigger",
		components,
		placement,
		fontWeight,
		isOpen
	} = props;

	return (
		<Popover trigger={trigger} placement={placement} isOpen={isOpen}>
			<PopoverTrigger>
				{components ? <a>{components}</a> : <Button colorScheme={"teal"}>{buttonName}</Button>}
			</PopoverTrigger>
			<PopoverContent>
				<PopoverHeader fontWeight={fontWeight}>{popoverHeaderText}</PopoverHeader>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverBody>{children}</PopoverBody>
			</PopoverContent>
		</Popover>
	);
});
