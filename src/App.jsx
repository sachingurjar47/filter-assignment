import { useState, useContext } from "react";
import CustomTable from "./components/CustomTable";
import {
	Stack,
	Button,
	Drawer,
	IconButton,
	DialogContent,
	Dialog,
	DialogActions,
	TextField,
	DialogTitle,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import Filter from "./components/Filter";
import { FilterContext } from "./context/FilterContextProvider";

const initialbooks = [
	{
		id: "64d55a0efc13ae417508a16f",
		title: "Tell Me Something (Telmisseomding)",
		author: "Krissy Klaus",
		publisher: "Jacobi-Spencer",
		isbnNo: "7020269419",
		copies: 1,
		year: 2004,
	},
	{
		id: "64d55a0efc13ae417508a170",
		title: "In Praise of Older Women",
		author: "Tilda Turpey",
		publisher: "Mitchell, Abernathy and Sipes",
		isbnNo: "4459931257",
		copies: 2,
		year: 2011,
	},
	{
		id: "64d55a0efc13ae417508a171",
		title: "Trash",
		author: "Jone Bennetto",
		publisher: "Fay, Stark and Gutkowski",
		isbnNo: "4021631968",
		copies: 3,
		year: 2002,
	},
	{
		id: "64d55a0efc13ae417508a172",
		title: "Head-On (Gegen die Wand)",
		author: "Caroljean McQuillen",
		publisher: "Stamm-Kutch",
		isbnNo: "5779908974",
		copies: 4,
		year: 1993,
	},
	{
		id: "64d55a0efc13ae417508a173",
		title: "Philosophers, The (After The Dark)",
		author: "Giacopo Pic",
		publisher: "Stanton Group",
		isbnNo: "9309556838",
		copies: 5,
		year: 2004,
	},
	{
		id: "64d55a0efc13ae417508a174",
		title: "The Missing",
		author: "Hale Caston",
		publisher: "Nikolaus and Sons",
		isbnNo: "4099453014",
		copies: 6,
		year: 1993,
	},
	{
		id: "64d55a0efc13ae417508a175",
		title: "Lonely Wife, The (Charulata)",
		author: "Dare Attryde",
		publisher: "Murazik, Ryan and MacGyver",
		isbnNo: "3381197681",
		copies: 7,
		year: 2009,
	},
	{
		id: "64d55a0efc13ae417508a176",
		title: "Homeboy",
		author: "Rolph Kegg",
		publisher: "Nader, Torphy and Reilly",
		isbnNo: "9650977007",
		copies: 8,
		year: 2002,
	},
	{
		id: "64d55a0efc13ae417508a177",
		title: "Winning Season, The",
		author: "Sylvia Agostini",
		publisher: "Pagac LLC",
		isbnNo: "3485551120",
		copies: 9,
		year: 2004,
	},
	{
		id: "64d55a0efc13ae417508a178",
		title: "Signs & Wonders",
		author: "Findlay Stukings",
		publisher: "Balistreri-Padberg",
		isbnNo: "5492129015",
		copies: 10,
		year: 2010,
	},
];

const tableHeading = [
	{ title: "Id", for: "id" },
	{ title: "Title", for: "title" },
	{ title: "Author", for: "author" },
	{ title: "Publisher", for: "publisher" },
	{ title: "ISBN_No", for: "isbnNo" },
	{ title: "No_of_copies", for: "copies" },
	{ title: "Year_of_publication", for: "year" },
];
const filterFor = [
	{ title: "Title,", for: "title" },
	{ title: "Author", for: "author" },
	{ title: "Publisher", for: "publisher" },
	{ title: "ISBN_No.", for: "isbnNo" },
];

const addBookInput = [
	{ type: "string", title: "Title", for: "title" },
	{ type: "string", title: "Author", for: "author" },
	{ type: "string", title: "Publisher", for: "publisher" },
	{ type: "string", title: "ISBN_No", for: "isbnNo" },
	{ type: "number", title: "No_of_copies", for: "copies" },
	{ type: "number", title: "Year_of_publication", for: "year" },
];

const App = () => {
	const { handleClear, filterValue } = useContext(FilterContext); //context for filter
	const [books, setBooks] = useState(initialbooks); //state for books
	const [newBook, setNewBook] = useState({}); //state for books
	const [filterBooks, setFilterBooks] = useState(books); //state for filter books
	const [openDrawer, setOpenDrawer] = useState(false); //state for open drawer
	const [openDialog, setOpenDialog] = useState(false); //state for open drawer
	const [errors, setErrors] = useState({});
	//function for filter books
	const handleFilterBooks = () => {
		const newFilterBooks = books.filter((book) => {
			return Object.keys(filterValue).some((key) => {
				return book[key] === filterValue[key];
			});
		});
		newFilterBooks.length === 0 ? "" : setFilterBooks(newFilterBooks);
	};

	//function for clear books filter
	const handleClearFilter = () => {
		handleClear();
		setFilterBooks(books);
	};
	//function for book input change
	const handleBookInputChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		if ((name === "year" && value.length <= 4) || name !== "year") {
			setNewBook((prev) => ({ ...prev, [name]: value }));
		} else {
			setNewBook((prev) => prev);
		}
		setErrors((prevErrors) =>
			value.trim() === ""
				? { ...prevErrors, [name]: "This field is required" }
				: { ...prevErrors, [name]: "" },
		);
	};
	//function for Adding book
	const handleAddBook = () => {
		const uid = new Date().getTime() + Math.floor(Math.random() * 1000000);
		const newErrors = {};
		const inputFor = addBookInput.map((item) => item.for);
		for (const key of inputFor) {
			if (newBook[key] === undefined || newBook[key].trim() === "") {
				newErrors[key] = "This field is required";
			}
		}
		if (newBook["year"]?.length != 4) {
			newErrors["year"] = "Please input a valid year";
		}
		setErrors(newErrors);
		const checkError = () => {
			for (const key of inputFor) {
				if (errors[key] !== "") {
					return false;
				}
			}
			return true;
		};
		if (checkError()) {
			setBooks((prev) => [...prev, { ...newBook, id: uid }]);
			setFilterBooks((prev) => [...prev, { ...newBook, id: uid }]);
			setNewBook({});
		}
	};
	return (
		<div style={{ margin: "10px" }}>
			<Stack spacing={2} mb={2} justifyContent='flex-end' direction='row'>
				<Button
					onClick={() => setOpenDialog(true)}
					startIcon={<AddIcon />}
					variant='contained'
				>
					New Book
				</Button>
				<Button
					onClick={() => setOpenDrawer(true)}
					startIcon={<FilterListIcon />}
					variant='outlined'
				>
					Filter
				</Button>
			</Stack>
			<CustomTable data={filterBooks} headings={tableHeading} />
			<Dialog open={openDialog}>
				<Stack
					spacing={2}
					m={2}
					justifyContent='space-between'
					alignItems={"center"}
					direction='row'
				>
					<DialogTitle>Add Book</DialogTitle>
					<IconButton
						onClick={() => setOpenDialog(false)}
						aria-label='delete'
						size='large'
					>
						<CloseIcon fontSize='inherit' />
					</IconButton>
				</Stack>

				<DialogContent>
					<div className='add-book-div'>
						{addBookInput.map((field, i) => (
							<TextField
								key={i}
								type={field?.type}
								size='small'
								id='outlined-basic'
								label={field?.title}
								name={field?.for}
								value={newBook[field?.for] || ""}
								error={!!errors[field?.for]}
								helperText={errors[field?.for]}
								required
								onChange={handleBookInputChange}
								variant='outlined'
							/>
						))}
					</div>
				</DialogContent>
				<DialogActions sx={{ p: "20px" }}>
					<Button onClick={() => setNewBook({})} variant='outlined'>
						Clear
					</Button>
					<Button onClick={handleAddBook} variant='contained'>
						Add
					</Button>
				</DialogActions>
			</Dialog>

			<Drawer anchor={"right"} open={openDrawer}>
				<Stack
					sx={{ height: "100%" }}
					direction='column'
					justifyContent='space-between'
				>
					<Stack>
						<Stack
							spacing={2}
							m={2}
							justifyContent='space-between'
							alignItems={"center"}
							direction='row'
						>
							<div
								style={{
									fontSize: "25px",
									fontWeight: "bold",
									color: "#1976d2",
								}}
							>
								Filter
							</div>
							<IconButton
								onClick={() => setOpenDrawer(false)}
								aria-label='delete'
								size='large'
							>
								<CloseIcon fontSize='inherit' />
							</IconButton>
						</Stack>
						<Filter data={books} filterFor={filterFor} />
					</Stack>
					<Stack
						spacing={2}
						m={5}
						justifyContent='space-between'
						direction='row'
					>
						<Button onClick={handleClearFilter} variant='outlined'>
							Clear
						</Button>
						<Button onClick={handleFilterBooks} variant='contained'>
							Filter
						</Button>
					</Stack>
				</Stack>
			</Drawer>
		</div>
	);
};

export default App;
