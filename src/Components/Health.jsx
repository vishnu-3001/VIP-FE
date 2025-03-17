import { useContext } from "react";
import useGet from "../Hooks/useGet";
import DocumentContext from "../Store/DocumentContext";

export default function Health() {
    const { send } = useGet();
    const documentCtx = useContext(DocumentContext);

    async function checkHealth() {
        try {
            const response = await send("health"); 
            documentCtx.setDocument({
                original: response.result, 
                enhanced: response.status || []
            });
        } catch (error) {
            console.error("Health check failed:", error);
        }
    }

    return (
        <div>
            <button onClick={checkHealth}>Click</button>
            {/* Use documentCtx instead of DocumentContext */}
            <p>{documentCtx.document?.original}</p>
            <p>Status: {documentCtx.document?.enhanced?.join(", ")}</p>
        </div>
    );
}
