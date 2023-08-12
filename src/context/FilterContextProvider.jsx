import { createContext, useState } from "react";

export const FilterContext = createContext();

const FilterContextProvider = ({ children }) => {
	const [filterValue, setFilterValue] = useState({});
	const handleChange = (name, value) => {
		setFilterValue((prev) => ({ ...prev, [name]: value }));
	};
	const handleClear = () => {
		setFilterValue({});
	};
	const value = { handleClear, handleChange, filterValue };
	return (
		<FilterContext.Provider value={value}>{children}</FilterContext.Provider>
	);
};

export default FilterContextProvider;
