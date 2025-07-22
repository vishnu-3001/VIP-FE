import { useEffect, useRef } from "react";
import { renderAsync } from "docx-preview";
import classes from "./EnhancedClasses.module.css";
import Chat from "./Chat";

export default function EnhancedDocument({ enhancedDocumentBlob }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !enhancedDocumentBlob) return;

    containerRef.current.innerHTML = "";
    renderAsync(enhancedDocumentBlob, containerRef.current);
  }, [enhancedDocumentBlob]);

  return (
    <div className="document-view">
      <div className={classes.legend}>
        <p style={{ backgroundColor: "#d6eaf8", padding: "10px", marginRight: "2%" }}>Project-Update</p>
        <p style={{ backgroundColor: "#e8daef", padding: "10px", marginRight: "2%" }}>Meeting notes</p>
        <p style={{ backgroundColor: "#ffdab9", padding: "10px", marginRight: "2%" }}>Todo</p>
        <p style={{ backgroundColor: "#fffacd", padding: "10px", marginRight: "2%" }}>Feedback</p>
        <p style={{ backgroundColor: "#d5f5e3", padding: "10px", marginRight: "2%" }}>Other</p>
      </div>
      <div className={classes.midContainer}>
        <div ref={containerRef} className={classes.documentContent}></div>
        {/* <div className={classes.chatContainer}>
          <Chat />
        </div> */}
      </div>
    </div>
  );
}
