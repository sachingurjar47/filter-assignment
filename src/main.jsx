import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import FilterContextProvider from "./context/FilterContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<FilterContextProvider>
		<App />
	</FilterContextProvider>,
);
