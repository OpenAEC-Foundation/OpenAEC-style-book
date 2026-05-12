import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useReportStore } from "../../stores/reportStore";
import "./ReportPreview.css";

interface ReportPreviewProps {
  pageSize: "A4" | "A3";
  orientation: "portrait" | "landscape";
}

export default function ReportPreview({ pageSize, orientation }: ReportPreviewProps) {
  const { t } = useTranslation("common");
  const [zoom, setZoom] = useState(80);
  const containerRef = useRef<HTMLDivElement>(null);
  const { pdfBytes, isGenerating, error, generatePdf, report } = useReportStore();

  // Create PDF blob URL when bytes change
  const pdfUrl = useMemo(() => {
    if (!pdfBytes) return null;
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    return URL.createObjectURL(blob);
  }, [pdfBytes]);

  // Clean up blob URL
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const handleZoomIn = useCallback(() => setZoom((z) => Math.min(300, z + 10)), []);
  const handleZoomOut = useCallback(() => setZoom((z) => Math.max(30, z - 10)), []);
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      setZoom((z) => Math.max(30, Math.min(300, z + (e.deltaY < 0 ? 10 : -10))));
    }
  }, []);

  return (
    <div className="report-preview" onWheel={handleWheel}>
      <div className="report-toolbar">
        <span className="report-page-info">
          {pageSize} {orientation}
          {report.project && ` \u00B7 ${report.project}`}
        </span>
        <div className="report-zoom-controls">
          <button className="report-zoom-btn" onClick={handleZoomOut} title="Zoom out">-</button>
          <span className="report-zoom-label">{zoom}%</span>
          <button className="report-zoom-btn" onClick={handleZoomIn} title="Zoom in">+</button>
        </div>
        <button
          className="report-print-btn"
          onClick={() => generatePdf()}
          disabled={isGenerating}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {isGenerating ? "Bezig..." : "Genereer PDF"}
        </button>
      </div>

      <div className="report-pages-wrapper" ref={containerRef}>
        {error && (
          <div className="report-error">
            <p>{error}</p>
          </div>
        )}

        {pdfUrl ? (
          <embed
            src={`${pdfUrl}#zoom=${zoom}`}
            type="application/pdf"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "600px",
              border: "none",
              borderRadius: "4px",
            }}
          />
        ) : (
          <div className="report-empty-state">
            <div className="report-empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--theme-text-muted)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <p className="report-empty-title">Geen PDF preview</p>
            <p className="report-empty-subtitle">
              Klik op "Genereer PDF" om een rapport te maken
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
