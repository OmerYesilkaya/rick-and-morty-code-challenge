import { Flex } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import EpisodeContainer from "./components/EpisodeContainer";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Flex direction="column" h="100vh" position="relative">
				<Navbar />
				<EpisodeContainer />
				<Footer />
			</Flex>
		</QueryClientProvider>
	);
}

export default App;
