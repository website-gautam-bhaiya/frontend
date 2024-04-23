import { useContext } from "react";
import { BooksContext } from "../context/book";


export default function useBooks() {

    return useContext(BooksContext)
}

