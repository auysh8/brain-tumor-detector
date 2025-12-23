import styles from "./css/TopBar.module.css";
import { MdOutlineDocumentScanner, MdDarkMode, MdLightMode } from "react-icons/md";

interface TopBarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const TopBar = ({ isDarkMode, toggleDarkMode }: TopBarProps) => {
  return (
    <div className={styles.top_bar}>
      <div className={styles.app_name_logo}>
        <MdOutlineDocumentScanner />
        <span className="appname">NeuroScanAI</span>
      </div>
      <div className={styles.nav_bar}>
        <ul className={styles.nav_items}>
            <li><span>Upload</span></li>
            <li><span>About</span></li>
        </ul>
      </div>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
      </button>
    </div>
  );
};

export default TopBar;