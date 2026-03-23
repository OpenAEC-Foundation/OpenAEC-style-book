import { useTranslation } from "react-i18next";
import RibbonGroup from "./RibbonGroup";
import RibbonButton from "./RibbonButton";
import {
  reportNewIcon, reportTemplateIcon, reportGenerateIcon,
  reportPreviewIcon, reportCoverIcon,
} from "./icons";

interface ReportTabProps {
  pageSize: "A4" | "A3";
  orientation: "portrait" | "landscape";
  onPageSizeChange: (size: "A4" | "A3") => void;
  onOrientationChange: (orientation: "portrait" | "landscape") => void;
}

// Inline page-size toggle icon
const pageSizeIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2"/><text x="12" y="15" text-anchor="middle" font-size="8" font-weight="700" fill="currentColor" stroke="none">A4</text></svg>`;
const orientationIcon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" stroke-width="2"/><path d="M8 6h8M8 10h8" stroke-width="1.5"/></svg>`;

export default function ReportTab({ pageSize, orientation, onPageSizeChange, onOrientationChange }: ReportTabProps) {
  const { t } = useTranslation("ribbon");

  return (
    <div className="ribbon-content">
      <div className="ribbon-groups">
        <RibbonGroup label={t("report.document")}>
          <RibbonButton icon={reportNewIcon} label={t("report.newReport")} />
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
            onClick={() => onPageSizeChange(pageSize === "A4" ? "A3" : "A4")}
          />
          <RibbonButton
            icon={orientationIcon}
            label={t(`report.${orientation}`)}
            size="small"
            onClick={() => onOrientationChange(orientation === "portrait" ? "landscape" : "portrait")}
          />
        </RibbonGroup>

        <RibbonGroup label={t("report.output")}>
          <RibbonButton icon={reportGenerateIcon} label={t("report.generate")} />
          <RibbonButton icon={reportPreviewIcon} label={t("report.preview")} />
        </RibbonGroup>
      </div>
    </div>
  );
}
