import styles from "./css/Results.module.css";
import { GiHazardSign } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { FaCheckCircle, FaFileUpload } from "react-icons/fa";
import { MdErrorOutline, MdBrokenImage } from "react-icons/md";

interface ResultsProps {
  results: {
    predictions: string;
    confidence: string | number;
    urgency: string;
    isError?: boolean;
  };
  onReset: () => void;
  image: string;
}

const Results = ({ results, onReset, image }: ResultsProps) => {
  const isError = results.predictions === "Not an MRI" || results.isError;
  const noTumor = results.predictions === "No Tumor";

  const handleButtonColor = () => {
    if (isError) {
      return { 
        backgroundColor: "#F97316", 
        boxShadow: "0 4px 12px rgba(249, 115, 22, 0.3)" 
      };
    }
    if (noTumor) {
      return { 
        backgroundColor: "#27ae60", 
        boxShadow: "0 4px 12px rgba(39, 174, 96, 0.3)" 
      };
    }
    return { 
      backgroundColor: "#E11D48", 
      boxShadow: "0 4px 12px rgba(225, 29, 72, 0.3)" 
    };
  };

  return (
    <div className={styles.main_container}>
      {isError ? (
        <div className={styles.error_wrapper}>
          <div className={styles.error_header}>
            <MdErrorOutline size={16} />
            <span>Processing Error</span>
          </div>

          <div className={styles.title_section}>
            <div className={styles.title_text}>
              <h1>Scan Processing Failed</h1>
              <p>
                The uploaded file is not an MRI scan. Please ensure you are uploading a valid MRI scan.
              </p>
            </div>
            
            <div className={styles.warning_badge}>
              <GiHazardSign />
              <span>Invalid Format</span>
            </div>
          </div>

          <div className={styles.dashed_box}>
            <div className={styles.icon_circle}>
               <MdBrokenImage size={32} color="#F97316" />
            </div>
            <h3>Preview Unavailable</h3>
            <p>
              We cannot generate a preview because the file structure does not match standard MRI data
            </p>
          </div>

          <div className={styles.action_buttons}>
            <button 
              className={styles.btn_primary} 
              style={handleButtonColor()} 
              onClick={onReset}
            >
                <FaFileUpload />
                <span>Upload New Scan</span>
            </button>
          </div>

        </div>
      ) : (
        <div className={styles.success_wrapper}>
           
           <div
            className={styles.analysis_status}
            style={{ color: noTumor ? "#27ae60" : "#E11D48" }}
          >
            {noTumor ? <FaCheckCircle /> : <GiHazardSign />}
            <span>Analysis Complete</span>
          </div>

          <div className={styles.results_row}>
            <span className={styles.tumor_type}>
              {noTumor ? "No Anomaly Detected" : `Anomaly Detected: ${results.predictions}`}
            </span>
            
            <div className={styles.tags_group}>
                <span
                className={styles.confidence_score}
                style={{ backgroundColor: noTumor ? "#27ae60" : "#E11D48" }}
                >
                <BsStars style={{ marginRight: "6px" }} />
                {results.confidence}% Confidence
                </span>

                <span className={styles.urgency}>Urgency: {results.urgency}</span>
            </div>
          </div>

          <img src={image} alt="MRI Scan" className={styles.valid_image} />

          <div className={styles.action_buttons}>
            <button 
              className={styles.btn_primary} 
              style={handleButtonColor()} 
              onClick={onReset}
            >
                <FaFileUpload/>
                <span>Upload New Scan</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;