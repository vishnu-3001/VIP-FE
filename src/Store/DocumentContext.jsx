import { createContext, useState } from "react";

const DocumentContext = createContext({
  doc_id: "",
  documentText: "",
  enhancedDocumentText: "",
  documentTitle: "",
  setDocId: () => {},
  setDocumentText: () => {},
  setEnhancedDocumentText: () => {},
  setDocumentTitle: () => {}
});

export function DocumentContextProvider({ children }) {
  const [docId, setDocId] = useState("");
  const [documentText, setDocumentText] = useState("");
  const [enhancedDocumentText, setEnhancedDocumentText] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");

  const contextValue = {
    doc_id: docId,
    documentText: documentText,
    enhancedDocumentText: enhancedDocumentText,
    documentTitle: documentTitle,
    setDocId: setDocId,
    setDocumentText: setDocumentText,
    setEnhancedDocumentText: setEnhancedDocumentText,
    setDocumentTitle: setDocumentTitle
  };

  return (
    <DocumentContext.Provider value={contextValue}>
      {children}
    </DocumentContext.Provider>
  );
}

export default DocumentContext;
