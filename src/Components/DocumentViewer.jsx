import { DocumentContextProvider } from "../Store/DocumentContext";
import Document from "./Document";
import DocumentFetch from "./DocumentFetch";
export default function DocumentViewer(){
    return(
        <div>
            <DocumentContextProvider>
                <DocumentFetch></DocumentFetch>
                <Document></Document>
            </DocumentContextProvider>
        </div>
    )
}