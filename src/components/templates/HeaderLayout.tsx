import { memo, ReactNode, VFC } from "react";
import { MainPageHeader } from "../organism/MainPageHeader";

type Props = {
	children: ReactNode;
};

const HeaderLayout: VFC<Props> = memo((props: Props) => {
	const { children } = props;
	return (
		<>
			<MainPageHeader />
			{children}
		</>
	);
});
export default HeaderLayout;
