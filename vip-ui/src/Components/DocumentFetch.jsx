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
        <div style={styles.container}>
            {/* Form to enter Google Docs link */}
            <form action={formAction} style={styles.form}>
                <label htmlFor="form-link" style={styles.label}>
                    Enter the Google document link:
                </label>
                <input 
                    name="form-link" 
                    id="form-link" 
                    type="text" 
                    style={styles.input}
                    disabled={pending || loading}
                />
                <button 
                    type="submit" 
                    disabled={pending || loading}
                    style={{
                        ...styles.button,
                        backgroundColor: loading || pending ? '#ccc' : '#4CAF50'
                    }}
                >
                    {loading ? "Fetching..." : "Fetch Document"}
                </button>
            </form>

            {/* Error Message */}
            {error && (
                <div style={styles.error}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Render extracted and colored content */}
            {data?.sections?.length > 0 && (
                <div>
                    {data.sections.map((section, index) => (
                        <div 
                            key={index}
                            style={{
                                backgroundColor: section.color,
                                padding: '15px',
                                marginBottom: '10px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                color: '#333'
                            }}
                        >
                            <div dangerouslySetInnerHTML={{ __html: section.content }} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Styling for consistency
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    form: {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '500px'
    },
    label: {
        fontSize: '16px',
        color: '#333',
        fontWeight: 'bold'
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px'
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    error: {
        color: 'red',
        marginTop: '10px',
        fontSize: '14px',
        backgroundColor: '#ffe6e6',
        padding: '10px',
        borderRadius: '4px'
    }
};

