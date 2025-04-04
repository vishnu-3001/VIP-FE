import { useState, useEffect, useRef,useCallback } from "react";
import "@googleworkspace/drive-picker-element";

export default function DocumentFetch() {
  const token = sessionStorage.getItem("token");
  const email=sessionStorage.getItem("email");
  const key = process.env.REACT_APP_PICKER_KEY;
  const clientId = process.env.REACT_APP_CLIENT_ID; 
  const app_id=process.env.REACT_APP_APP_ID;
  const beUrl=process.env.REACT_APP_BE_URL;


  const [pickerVisible, setPickerVisible] = useState(false);
  const pickerRef = useRef(null);

  async function downloadFile(fileId){
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
          const data = await response.text();
        } catch (error) {
        }
  }      

  function handleClick(){
    if(sessionStorage.getItem("fileId")){
        sessionStorage.removeItem("fileId");
    }
    setPickerVisible(true);
  }
  const handleFilePicked = useCallback((event) => {
    const data = event.detail;
    if (data.action === "picked") {
      downloadFile(data.docs[0].id);
      sessionStorage.setItem("fileId", data.docs[0].id);
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
  }, [pickerVisible,handleFilePicked, handlePickerCancel]);

  return (
    <div>
      <button onClick={handleClick} disabled={!token}>
        Select from Drive
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
