import { useContext, useState } from "react";
import DocumentContext from "../Store/DocumentContext";
import DOMPurify from "dompurify";
import "./Document.css";

export default function Document() {
  const documentCtx = useContext(DocumentContext);
  const document = documentCtx.documentText;
  const enhancedDocument = documentCtx.enhancedDocumentText;
  const documentTitle = documentCtx.documentTitle;
  const [viewMode, setViewMode] = useState("original");
  if (!document) return <div className="no-document">No document selected. Please select a document from Google Drive.</div>;

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
          onClick={() => setViewMode("enhanced")}
        >
          Enhanced Document
        </button>
        <button 
          className={viewMode === "side-by-side" ? "active" : ""} 
          onClick={() => setViewMode("side-by-side")}
        >
          Side by Side
        </button>
      </div>
      
      <div className="document-view-container">
        {viewMode === "original" && (
          <div className="document-view">
            <div 
              className="document-content"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(document, {
                  ADD_TAGS: ['iframe'],
                  ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
                }) 
              }} 
            />
          </div>
        )}
        
        {viewMode === "enhanced" && (
          <div className="document-view">
            <div 
              className="document-content"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(enhancedDocument, {
                  ADD_TAGS: ['iframe'],
                  ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
                }) 
              }} 
            />
          </div>
        )}
        
        {viewMode === "side-by-side" && (
          <div className="side-by-side-container">
            <div className="document-view">
              <h3>Original</h3>
              <div 
                className="document-content"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(document, {
                    ADD_TAGS: ['iframe'],
                    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
                  }) 
                }} 
              />
            </div>
            <div className="document-view">
              <h3>Enhanced</h3>
              <div 
                className="document-content"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(enhancedDocument, {
                    ADD_TAGS: ['iframe'],
                    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling']
                  }) 
                }} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
