import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";

const styles = {
	global: {
		body: {
			fontFamily: "Secular One, sans-serif;",
			color: "#e9f7fa",
			bg: "gray.800",
		},
	},
};

const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

const theme = extendTheme({ styles, config });

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
