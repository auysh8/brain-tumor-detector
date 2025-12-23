import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import UploadMri from "./components/UploadMri";
import Results from "./components/Results";
import Loading from "./components/Loading";
import TopBar from "./components/TopBar";

// Define the structure of our analysis result
interface AnalysisResult {
  predictions: string;
  confidence: string;
  urgency: string;
  image: string; // We include the image URL here so Results can display it
  isError: boolean;
}

const CLASSES: { [key: number]: string } = {
  0: 'Glioma',
  1: 'Meningioma',
  2: 'Not an MRI',
  3: 'No Tumor',
  4: 'Pituitary'
};

const App = () => {
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [appState, setAppState] = useState<"upload" | "loading" | "result">("upload");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // --- PHASE 1: Load Model on Startup ---
  useEffect(() => {
    async function loadModel() {
      try {
        // Ensure your model.json is inside the 'public/tfjs_model/' folder
        const loadedModel = await tf.loadGraphModel("/tfjs_model/model.json");
        setModel(loadedModel);
        console.log("Model loaded successfully");
      } catch (error) {
        console.error("Failed to load model:", error);
      }
    }
    loadModel();
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // --- PHASE 2: Analyze the Image ---
  const handleAnalyze = async (file: File) => {
    if (!model) {
      alert("Model is still loading. Please wait a moment.");
      return;
    }

    setAppState("loading");

    try {
      // 1. Create Image URL
      const objectUrl = URL.createObjectURL(file);
      
      // 2. Create an HTML Image Element to read pixel data
      const imgElement = document.createElement("img");
      imgElement.src = objectUrl;

      // 3. Wait for image to load, then process
      await new Promise((resolve) => {
        imgElement.onload = resolve;
      });

      // 4. Convert Image to Tensor & Predict
      const predictions = tf.tidy(() => {
        let tensor = tf.browser.fromPixels(imgElement)
          .resizeBilinear([224, 224]);
        
        // Expand dimensions to create a batch: [1, 224, 224, 3]
        const batched = tensor.expandDims(0);
        
        // Run prediction
        return model.predict(batched) as tf.Tensor;
      });

      const data = await predictions.data();
      predictions.dispose(); // Clean up tensor memory

      // 5. Interpret Results
      const maxConfidence = Math.max(...Array.from(data));
      const classIndex = Array.from(data).indexOf(maxConfidence);
      const resultText = CLASSES[classIndex];
      const confidencePercent = (maxConfidence * 100).toFixed(1);

      // 6. Fake delay for UX (so user sees the loading animation)
      await new Promise(r => setTimeout(r, 2000));

      setAnalysisResult({
        predictions: resultText,
        confidence: confidencePercent,
        urgency: (resultText === "No Tumor" || resultText === "Not an MRI") ? "None" : "High",
        image: objectUrl,
        isError: false
      });

      setAppState("result");

    } catch (error) {
      console.error("Analysis failed", error);
      setAnalysisResult({
        predictions: "Error",
        confidence: "0",
        urgency: "None",
        image: "",
        isError: true
      });
      setAppState("result");
    }
  };

  const handleReset = () => {
    setAppState("upload");
    setAnalysisResult(null);
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <TopBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {appState === "upload" && (
        <UploadMri onClick={handleAnalyze} />
      )}

      {appState === "loading" && (
        <Loading />
      )}

      {appState === "result" && analysisResult && (
        <Results results={analysisResult} onReset={handleReset} />
      )}
    </div>
  );
};

export default App;