import { Radio, RadioProps } from "@chakra-ui/react";
import { memo, ReactNode, VFC } from "react";

type Props = RadioProps & {
	children: ReactNode;
};

export const RadioAtoms: VFC<Props> = memo((props: Props) => {
	const { children, ...RadioProps } = props;
	return <Radio {...RadioProps}>{children}</Radio>;
});
