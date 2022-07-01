import { memo, VFC } from "react";
import { ChildrenProps } from "../../types/childrenProps";
import { TitleFooter } from "../organism/TitleFooter";

const FirstPageFooterLayout: VFC<ChildrenProps> = memo((props: ChildrenProps) => {
	const { children } = props;
	return (
		<>
			{children}
			<TitleFooter />
		</>
	);
});
export default FirstPageFooterLayout;
