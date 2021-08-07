import { Flex } from "@chakra-ui/react";
import EpisodeDetailContainer from "components/episodeDetails/EpisodeDetailContainer";
import CharacterDetailContainer from "components/characterDetails/CharacterDetailContainer";
import EpisodeContainer from "components/episodes/EpisodeContainer";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { QueryClientProvider, QueryClient } from "react-query";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Flex direction="column" h="100vh" position="relative">
					<Navbar />
					<Switch>
						<Route path="/episode/:id">
							<EpisodeDetailContainer />
						</Route>
						<Route path="/character/:id">
							<CharacterDetailContainer />
						</Route>
						<Route path="/">
							<EpisodeContainer />
						</Route>
					</Switch>
					<Footer />
				</Flex>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
