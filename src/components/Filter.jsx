import { useContext, useEffect } from "react";
import { Stack } from "@mui/material";
import { FilterContext } from "../context/FilterContextProvider";
const Filter = ({ data, filterFor }) => {
	const { handleChange, filterValue } = useContext(FilterContext);

	const handleFilterChange = (e) => {
		handleChange(e.target.name, e.target.value);
	};

	return (
		<Stack>
			{filterFor.map((filters, i) => (
				<div className='select-div' key={i}>
					<label htmlFor={filters?.for}>{filters?.title}</label>
					<select
						name={filters.for}
						value={filterValue[filters.for] || ""}
						onChange={handleFilterChange}
					>
						<option key={i}>Select....</option>
						{data?.map((option, i) => (
							<option key={i} value={option?.[filters.for]}>
								{option?.[filters.for]}
							</option>
						))}
					</select>
				</div>
			))}
		</Stack>
	);
};

export default Filter;
