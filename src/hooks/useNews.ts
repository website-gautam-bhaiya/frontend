import { NewsContext } from "../context/news"
import { useContext } from "react"

export default function useNews() {
    
    return useContext(NewsContext) 
}

