import { useState, useEffect, useRef,useCallback } from "react";
import "@googleworkspace/drive-picker-element";

export default function DocumentFetch() {
  const token = sessionStorage.getItem("token");
  const key = process.env.REACT_APP_PICKER_KEY;
  const clientId = process.env.REACT_APP_CLIENT_ID; 
  const app_id=process.env.REACT_APP_APP_ID;


  const [pickerVisible, setPickerVisible] = useState(false);
  const pickerRef = useRef(null);

  const handleFilePicked = useCallback((event) => {
    const data = event.detail;
    if (data.action === "picked") {
      console.log("Selected document ID:", data.docs[0].id);
    }
  }, []);

  const handlePickerCancel = useCallback(() => {
    setPickerVisible(false);
    console.log("Picker cancelled");
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
      <button onClick={() => setPickerVisible(true)} disabled={!token}>
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
