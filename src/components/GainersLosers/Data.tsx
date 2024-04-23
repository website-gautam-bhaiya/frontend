import { ReactNode  } from "react"

const Data = ({stocksEle}: {stocksEle: ReactNode[]}) => {
 

    return (
        <tbody >
            {stocksEle}
        </tbody>
    )
}

export default Data