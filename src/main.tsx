import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createQueryClient } from "./lib/queryClient.tsx";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={createQueryClient}>
			<App />
		</QueryClientProvider>
	</StrictMode>,
);
