import { useActionState,useContext } from "react";
import useGet from "../Hooks/useGet";
import DocumentContext from "../Store/DocumentContext";
import Document from "./Document";
import EnhancedDocument from "./EnhancedDocument";
import Button from "../Util/Button";

export default function DocumentFetch() {
    const { error, loading, send } = useGet();
    const documentctx=useContext(DocumentContext);
    async function fetchDocument(prevStatus, fd) {
        const formData = Object.fromEntries(fd.entries());
        const link = formData['form-link'];
        const match = link.match(/[-\w]{25,}/);
        // const file_id = match ? match[0] : null;
        const file_id=2;
        if (file_id) {
            const endpoint = `drive/download?file_id=${file_id}`;
            const data=await send(endpoint);
            if (data) {
                documentctx.setDocument({
                    original: data.original || '', 
                    enhanced: data.enhanced || []
                });
            }
        } else {
            const error="Enter correct google doc link"
            return{link,error}
        }
        return({link})
    }
    function handleView(view){
        documentctx.setChoice(view)
    }
  
    const [formStatus, formAction, pending] = useActionState(fetchDocument);

    return (
        <div style={styles.container}>
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
                    defaultValue={formStatus?.link}
                />
               <Button 
                    type="submit"
                    disabled={pending || loading}
                >
                    {loading ? "Fetching..." : "Fetch Document"}
                </Button>

            </form>
            {error&& (
                <div style={styles.error}>
                    <strong>Error:</strong> {error}
                </div>
            )
            }
            {formStatus?.error&&(
                <div style={styles.error}>
                <strong>Error:</strong> {formStatus.error}
                </div>
            )}

            <Button onClick={()=>handleView('original')} isActive={
                documentctx.userChoice==='original'&&
                documentctx.document.original !==''
                }>Original</Button>
            <Button onClick={()=>handleView('enhanced')} isActive={documentctx.userChoice==='enhanced'}>Enhanced</Button>
            <Button onClick={()=>handleView('compare')} isActive={documentctx.userChoice==='compare'}>Compare</Button>
            {documentctx.userChoice==='original'&&<Document></Document>}
            {documentctx.userChoice==='enhanced'&&<EnhancedDocument></EnhancedDocument>}
            {documentctx.userChoice==='compare'&&<div style={styles.both}>
                <Document></Document>
                <EnhancedDocument></EnhancedDocument>
                </div>}
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
    },
    both:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'centre'
    }
};

