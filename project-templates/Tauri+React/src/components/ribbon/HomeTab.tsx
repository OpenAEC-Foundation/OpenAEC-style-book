import { useTranslation } from "react-i18next";
import RibbonGroup from "./RibbonGroup";
import RibbonButton from "./RibbonButton";
import { settingsIcon, helpIcon, infoIcon } from "./icons";

interface HomeTabProps {
  onSettingsClick?: () => void;
}

export default function HomeTab({ onSettingsClick }: HomeTabProps) {
  const { t } = useTranslation("ribbon");

  return (
    <div className="ribbon-content">
      <div className="ribbon-groups">
        <RibbonGroup label={t("home.general")}>
          <RibbonButton
            icon={settingsIcon}
            label={t("home.settings")}
            onClick={onSettingsClick}
          />
        </RibbonGroup>

        <RibbonGroup label={t("home.help")}>
          <RibbonButton icon={helpIcon} label={t("home.helpBtn")} />
          <RibbonButton icon={infoIcon} label={t("home.about")} />
        </RibbonGroup>
      </div>
    </div>
  );
}
