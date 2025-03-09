import { useActionState } from "react";
import useGet from "../Hooks/useGet";

export default function DocumentFetch() {
    // Initialize useGet hook
    const { data, error, loading, send } = useGet();

    // Function to extract file_id and call the API
    async function fetchDocument(prevStatus, fd) {
        const formData = Object.fromEntries(fd.entries());
        const link = formData['form-link'];
        console.log("hello")

        // Extract file_id from the URL using regex
        // const match = link.match(/[-\w]{25,}/);
        // const file_id = match ? match[0] : null;
        const file_id = "1hDv1qgU-fhgGQpv3J9_YtCFXE4gJZILQRt4ZSvEBr9M"

        if (file_id) {
            const endpoint = `drive/download?file_id=${file_id}`;
            console.log("Extracted file_id:", file_id);

            // Call the API using useGet's send function
            await send(endpoint);
        } else {
            console.error("Invalid Google document link");
        }
    }

    // useActionState hook for handling form state
    const [formStatus, formAction, pending] = useActionState(fetchDocument);

    return (
        <div>
            <form action={formAction}>
                <label htmlFor="form-link">
                    Enter the Google document link here:
                </label>
                <input name="form-link" id="form-link" />
                <button disabled={pending || loading}>
                    {loading ? "Fetching..." : "Fetch Document"}
                </button>
            </form>

            {/* Display error or data */}
            {error && <div style={{ color: "red" }}>Error: {error}</div>}
            {data && (
                <div dangerouslySetInnerHTML={{ __html: data.file }} />
            )}
        </div>
    );
}
