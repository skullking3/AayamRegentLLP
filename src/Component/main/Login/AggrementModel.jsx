import React from 'react';

const AgreementModel = ({ documentUrl, onClose }) => {
    
    // Fallback: Agar login user ke database record me url na mile
    if (!documentUrl || documentUrl.trim() === "") {
        return (
            <div style={styles.overlay}>
                <div style={styles.modal} className="bg-zinc-950 border border-zinc-900 text-white !h-auto max-w-md p-6 rounded-2xl text-center">
                    <div className="text-amber-400 text-3xl mb-3">⚠️</div>
                    <h3 className="text-base font-medium font-serif text-zinc-100 mb-2">No Agreement Linked</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-5">
                        Bhai, aapke profile par koi digital license document linked nahi mila. Kripya Admin portal se document upload karwayein.
                    </p>
                    <button onClick={onClose} style={styles.btnCancel} className="w-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300">
                        Close Console
                    </button>
                </div>
            </div>
        );
    }

   

    // Download Logic 
   const handleDownload = () => {
    if (documentUrl.includes('...')) {
        alert("Bhai, URL short/broken hai, download nahi ho sakta.");
        return;
    }

    // Is method se browser cross-origin blocked links ko bhi forced download karwa deta hai
    fetch(documentUrl)
        .then(response => {
            if (!response.ok) throw new Error("File fetch karne me error aayi.");
            return response.blob();
        })
        .then(blob => {
            const blobURL = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobURL;
            link.setAttribute('download', `Agreement_${Date.now()}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobURL);
        })
        .catch(err => {
            // Agar CORS error aaye toh fallback to new tab
            window.open(documentUrl, '_blank');
        });
    };

    // Safe view engine using Google Docs Viewer to avoid Supabase iframe-origin blocks
    const safeIframeUrl = `https://docs.google.com/gview?url=${encodeURIComponent(documentUrl)}&embedded=true`;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal} className="bg-[#0b0e14] border border-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                
                {/* Header Section */}
                <div style={styles.header} className="border-zinc-900">
                    <div className="flex items-center gap-2">
                        <span className="text-base">📄</span>
                        <h3 style={styles.title} className="text-zinc-100 font-serif font-medium text-sm tracking-wide">
                            Digital License & Agreement
                        </h3>
                    </div>
                    <button onClick={onClose} style={styles.closeX} className="hover:text-white transition-colors">
                        &times;
                    </button>
                </div>

                {/* iFrame Content Area */}
                <div style={styles.iframeContainer} className="border-zinc-900 bg-zinc-950/60">
                    {/* Google Docs Viewer (gview) ko bilkul hata do, direct documentUrl dalo */}
                    <iframe 
                        src={documentUrl} 
                        title="Agreement Preview"
                        style={styles.iframe}
                        // Isse browser ka default PDF viewer open hoga bina download forced kiye
                    />
                </div>

                {/* Action Controls Bar */}
                <div style={styles.actions} className="border-zinc-900">
                    <button 
                        onClick={onClose} 
                        style={styles.btnCancel}
                        className="bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition"
                    >
                        Back
                    </button>
                    
                    <div style={styles.rightActions}>
                        <button 
                            onClick={handleDownload} 
                            style={styles.btnDownload}
                            className="bg-[#E2B747] text-black hover:bg-[#f3ca5c] active:scale-95 transition"
                        >
                            📥 Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Base Modal Layout styles (keeping backdrop universal)
const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100001, padding: '20px' },
    modal: { padding: '24px', borderRadius: '16px', width: '100%', maxWidth: '850px', height: '85vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid', paddingBottom: '12px' },
    title: { margin: 0 },
    closeX: { background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666' },
    iframeContainer: { flex: 1, border: '1px solid', borderRadius: '8px', overflow: 'hidden' },
    iframe: { width: '100%', height: '100%', border: 'none' },
    actions: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid', paddingTop: '16px' },
    rightActions: { display: 'flex', gap: '12px' },
    btnCancel: { padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' },
    btnPrint: { padding: '8px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' },
    btnDownload: { padding: '8px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }
};

export default AgreementModel;