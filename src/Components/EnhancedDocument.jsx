import { useContext } from "react";
import DocumentContext from "../Store/DocumentContext";
export default function EnhancedDocument(){
    const ctx=useContext(DocumentContext);
    const sections=ctx.document.enhanced;
    return(
        <div>
            {sections?.length > 0 && (
                <div>
                    {sections.map((section, index) => (
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
    )
}