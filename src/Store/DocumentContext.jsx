import { createContext, useState } from "react";

const DocumentContext = createContext({
  doc_id: "",
  documentBlob: null,
  enhancedDocumentText: "",
  documentTitle: "",
  enhancedDocumentBlob:null,
  setDocId: () => {},
  setDocumentBlob: () => {},
  setEnhancedDocumentText: () => {},
  setDocumentTitle: () => {},
  setEnhancedDocumentBlob:()=>{}
});

export function DocumentContextProvider({ children }) {
  const [docId, setDocId] = useState("");
  const [documentBlob, setDocumentBlob] = useState(null);
  const [enhancedDocumentText, setEnhancedDocumentText] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");
  const[enhancedDocumentBlob,setEnhancedDocumentBlob]=useState(null);

  const contextValue = {
    doc_id: docId,
    documentText: documentBlob,
    enhancedDocumentText: enhancedDocumentText,
    documentTitle: documentTitle,
    enhancedDocumentBlob:enhancedDocumentBlob,
    setDocId: setDocId,
    setDocumentBlob: setDocumentBlob,
    setEnhancedDocumentText: setEnhancedDocumentText,
    setDocumentTitle: setDocumentTitle,
    setEnhancedDocumentBlob:setEnhancedDocumentBlob
  };

  return (
    <DocumentContext.Provider value={contextValue}>
      {children}
    </DocumentContext.Provider>
  );
}

export default DocumentContext;
