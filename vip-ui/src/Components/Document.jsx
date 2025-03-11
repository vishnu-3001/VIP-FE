import { useContext } from "react"
import DocumentContext from "../Store/DocumentContext"
export default function Document(){
    const documentctx=useContext(DocumentContext);
    const original_data=documentctx.document.original
    console.log(original_data)
    return(
        <div>
           <div dangerouslySetInnerHTML={{ __html: original_data }} />
        </div>
    )
}