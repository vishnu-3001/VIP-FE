import { useState, useEffect, useRef, useCallback, use } from "react";
import DocumentContext from "../Store/DocumentContext";
import "@googleworkspace/drive-picker-element";

export default function DocumentFetch() {
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  const key = process.env.REACT_APP_PICKER_KEY;
  const clientId = process.env.REACT_APP_CLIENT_ID; 
  const app_id = process.env.REACT_APP_APP_ID;
  const beUrl = process.env.REACT_APP_BE_URL;
  const documentCtx = use(DocumentContext);
  const [pickerVisible, setPickerVisible] = useState(false);
  const pickerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  async function downloadFile(fileId) {
    setIsLoading(true);
    const url = beUrl + "api/v1/drive/download?file_id=" + fileId;
    const headers = {
      "Content-Type": "application/json",
      "Oauth-Token": `${token}`,
      "Email": `${email}`
    };
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if(data) {
        documentCtx.setDocumentTitle(data.document_title || "Untitled Document");
        documentCtx.setDocumentText(data.original_html);
        documentCtx.setEnhancedDocumentText(data.enhanced_html || createEnhancedHtml(data.original_html));
      }
    } catch (error) {
      console.error("Error downloading document:", error);
    } finally {
      setIsLoading(false);
    }
  }      

  function createEnhancedHtml(html) {
    if (!html) return "";
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const paragraphs = doc.querySelectorAll('p');
    const colors = ['#f0f8ff', '#f5f5dc', '#e6e6fa', '#f0fff0'];
    
    paragraphs.forEach((p, index) => {
      p.style.backgroundColor = colors[index % colors.length];
      p.style.padding = '10px';
      p.style.borderRadius = '5px';
      p.style.margin = '10px 0';
    });
    
    return doc.body.innerHTML;
  }

  function handleClick() {
    if(sessionStorage.getItem("fileId")) {
      sessionStorage.removeItem("fileId");
    }
    setPickerVisible(true);
  }
  
  const handleFilePicked = useCallback((event) => {
    const data = event.detail;
    if (data.action === "picked") {
      documentCtx.setDocId(data.docs[0].id);
      downloadFile(data.docs[0].id);
      setPickerVisible(false);
    }
  }, []);

  const handlePickerCancel = useCallback(() => {
    setPickerVisible(false);
  }, []);

  useEffect(() => {
    const picker = pickerRef.current;
    if (picker) {
      const handlePicked = (e) => handleFilePicked(e);
      const handleCancel = () => handlePickerCancel();

      picker.addEventListener("picker:picked", handlePicked);
      picker.addEventListener("picker:cancel", handleCancel);

      return () => {
        picker.removeEventListener("picker:picked", handlePicked);
        picker.removeEventListener("picker:cancel", handleCancel);
      };
    }
  }, [pickerVisible, handleFilePicked, handlePickerCancel]);

  return (
    <div>
      <button 
        onClick={handleClick} 
        disabled={!token || isLoading}
        className="drive-button"
      >
        {isLoading ? "Loading..." : "Select from Drive"}
      </button>

      {pickerVisible && (
        <drive-picker
          ref={pickerRef}
          client-id={clientId}
          developer-key={key}
          oauth-token={token}
          app-id={app_id}
        >
          <drive-picker-docs-view
            include-folders="true"
            select-folder-enabled="false"
            mode="list"
          ></drive-picker-docs-view>
        </drive-picker>
      )}
    </div>
  );
}
