import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import { resetServerContext } from "react-beautiful-dnd";

export default class Document extends NextDocument {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await NextDocument.getInitialProps(ctx);
		resetServerContext();
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					{/* Make Color mode to persists when you refresh the page. */}
					<ColorModeScript />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
