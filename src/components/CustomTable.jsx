import {
	TableContainer,
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	Paper,
} from "@mui/material";


const CustomTable = ({ data, headings }) => {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						{headings.map((heading, i) => (
							<TableCell sx={{background:'aquamarine',color:'white',fontSize:'18px'}} key={i}>{heading?.title}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row) => (
						<TableRow
							key={row?.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							{headings.map((heading, i) => (
								<TableCell component='th' scope='row' key={i}>
									{row[heading?.for]}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default CustomTable;
