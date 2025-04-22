import { useContext, useState, useEffect } from "react";
import DocumentContext from "../Store/DocumentContext";
import { renderAsync } from "docx-preview";
import "./Document.css";

export default function Document() {
  const documentCtx = useContext(DocumentContext);
  const {
    documentText,
    enhancedDocumentBlob,
    documentTitle,
    doc_id,
    setDocumentTitle,
    setEnhancedDocumentBlob,
  } = documentCtx;

  const beUrl = process.env.REACT_APP_BE_URL;

  const [viewMode, setViewMode] = useState("original");
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const containerId = viewMode === "original" ? "original-docx-container" : "enhanced-docx-container";
    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    if (viewMode === "enhanced" && enhancedDocumentBlob) {
      renderAsync(enhancedDocumentBlob, container);
    }

    if (viewMode === "original" && documentText) {
      const htmlBlob = new Blob([documentText], { type: "text/html" });
      renderAsync(htmlBlob, container);
    }
  }, [viewMode, enhancedDocumentBlob, documentText]);

  if (!documentText) {
    return (
      <div className="no-document">
        No document selected. Please select a document from Google Drive.
      </div>
    );
  }

  async function handleEnhancedDocument() {
    setViewMode("enhanced");
    setIsLoading(true);

    const url = `${beUrl}api/v1/drive/enhancedDoc?file_id=${doc_id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "*/*",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          setNotFound(true);
          return;
        }
        throw new Error("Something went wrong");
      }

      const blob = await response.blob();
      setDocumentTitle(`Document - ${doc_id}`);
      setEnhancedDocumentBlob(blob);

    } catch (error) {
      console.error("Error fetching enhanced document:", error);
    } finally {
      setIsLoading(false);
    }
  }
  async function uploadEnhancedToDrive(){
    if(!documentCtx.enhancedDocumentBlob){
      console.log("Enhanced Document is not available please try later");
      return;
    }
    const url = `${beUrl}api/v1/drive/uploadDoc`;
    const formData=new FormData();
    formData.append("file",documentCtx.enhancedDocumentBlob,`${doc_id}-enhanced.docx`);
    try{
      const response=await fetch(url,{
        method:"POST",
        body:formData
      });
      if(!response.ok){
        throw new Error("Something went wrong")
      }
      const result=await response.json();
      console.log("Upload successful! File ID:", result.fileId);
      alert("Enhanced document uploaded successfully to Google Drive!");
    }catch(error){
      alert("Uploaded failed, try later");
    }
  }

  return (
    <div className="document-container">
      <h1 className="document-title">{documentTitle}</h1>

      <div className="document-tabs">
        <button 
          className={viewMode === "original" ? "active" : ""} 
          onClick={() => setViewMode("original")}
        >
          Original Document
        </button>
        <button 
          className={viewMode === "enhanced" ? "active" : ""} 
          disabled={isLoading}
          onClick={handleEnhancedDocument}
        >
          {isLoading ? "Loading..." : "Enhanced Document"}
        </button>
        <button
          disabled={!enhancedDocumentBlob || isLoading}
          onClick={uploadEnhancedToDrive}
        >
          Upload Enhanced to Drive
        </button>
      </div>

      <div className="document-view-container">
        {viewMode === "original" && (
          <div className="document-view">
            <div
              id="original-docx-container"
              className="document-content"
            >
              {/* Original DOCX dynamically injected */}
            </div>
          </div>
        )}

        {viewMode === "enhanced" && (
          <div className="document-view">
            {notFound ? (
              <p>Document is still processing, please try after some time.</p>
            ) : (
              <div
                id="enhanced-docx-container"
                className="document-content"
              >
                {/* Enhanced DOCX dynamically injected */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
