import { useTranslation } from "react-i18next";
import { save } from "@tauri-apps/plugin-dialog";
import RibbonGroup from "./RibbonGroup";
import RibbonButton from "./RibbonButton";
import {
  reportNewIcon, reportTemplateIcon, reportGenerateIcon,
  reportPreviewIcon, reportCoverIcon,
} from "./icons";
import { useReportStore } from "../../stores/reportStore";
import { createBlankReport } from "../../types/report";

interface ReportTabProps {
  pageSize: "A4" | "A3";
  orientation: "portrait" | "landscape";
  onPageSizeChange: (size: "A4" | "A3") => void;
  onOrientationChange: (orientation: "portrait" | "landscape") => void;
}

const pageSizeIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/><text x="12" y="15" text-anchor="middle" font-size="8" font-weight="700" fill="currentColor" stroke="none">A4</text></svg>`;
const orientationIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" stroke-width="2"/><path d="M8 6h8M8 10h8" stroke-width="1.5"/></svg>`;

const saveIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke-width="2"/><polyline points="17 21 17 13 7 13 7 21" stroke-width="2"/><polyline points="7 3 7 8 15 8" stroke-width="2"/></svg>`;

export default function ReportTab({ pageSize, orientation, onPageSizeChange, onOrientationChange }: ReportTabProps) {
  const { t } = useTranslation("ribbon");
  const { setReport, generatePdf, savePdf, updateMetadata, isGenerating } = useReportStore();

  const handleNew = () => {
    setReport(createBlankReport());
  };

  const handleGenerate = async () => {
    await generatePdf();
  };

  const handleSave = async () => {
    const path = await save({
      filters: [{ name: "PDF", extensions: ["pdf"] }],
      defaultPath: "rapport.pdf",
    });
    if (path) {
      await savePdf(path);
    }
  };

  const handlePageSizeChange = (size: "A4" | "A3") => {
    onPageSizeChange(size);
    updateMetadata({ format: size });
  };

  const handleOrientationChange = (o: "portrait" | "landscape") => {
    onOrientationChange(o);
    updateMetadata({ orientation: o === "portrait" ? "Portrait" : "Landscape" });
  };

  return (
    <div className="ribbon-content">
      <div className="ribbon-groups">
        <RibbonGroup label={t("report.document")}>
          <RibbonButton icon={reportNewIcon} label={t("report.newReport")} onClick={handleNew} />
          <RibbonButton icon={reportTemplateIcon} label={t("report.templates")} />
        </RibbonGroup>

        <RibbonGroup label={t("report.sections")}>
          <RibbonButton icon={reportCoverIcon} label={t("report.cover")} />
        </RibbonGroup>

        <RibbonGroup label={t("report.page")}>
          <RibbonButton
            icon={pageSizeIcon}
            label={pageSize}
            size="small"
            onClick={() => handlePageSizeChange(pageSize === "A4" ? "A3" : "A4")}
          />
          <RibbonButton
            icon={orientationIcon}
            label={t(`report.${orientation}`)}
            size="small"
            onClick={() => handleOrientationChange(orientation === "portrait" ? "landscape" : "portrait")}
          />
        </RibbonGroup>

        <RibbonGroup label={t("report.output")}>
          <RibbonButton
            icon={reportGenerateIcon}
            label={isGenerating ? "..." : t("report.generate")}
            onClick={handleGenerate}
          />
          <RibbonButton icon={reportPreviewIcon} label={t("report.preview")} />
          <RibbonButton icon={saveIcon} label="Opslaan als PDF" size="small" onClick={handleSave} />
        </RibbonGroup>
      </div>
    </div>
  );
}
