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
    documentCtx.setDocId(fileId);
    const url = beUrl + "api/v1/drive/download?file_id=" + fileId
    const headers = {
      "Oauth-Token": `${token}`,
      "Email": `${email}`,
      "Accept": "*/*" 
    };
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      for (const [key, value] of response.headers.entries()) {
        if(key==='x-document-title'){
          documentCtx.setDocumentTitle(value);
          sessionStorage.setItem("title",value);
        }
      }
      documentCtx.setDocumentBlob(blob);
    } catch (error) {
      console.error("Error downloading document:", error);
    } finally {
      setIsLoading(false);
    }
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
