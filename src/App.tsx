import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import TopBar from "./components/TopBar";
import UploadMri from "./components/UploadMri";
import Results from "./components/Results";
import Loading from "./components/Loading";

interface AnalysisResult {
  predictions: string;
  confidence: string;
  urgency: string;
  isError: boolean;
}

const CLASSES: { [key: number]: string } = {
  0: "Glioma",
  1: "Meningioma",
  2: "No Tumor",
  3: "Pituitary"
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadGraphModel("/model/model.json");
        setModel(loadedModel);
      } catch (error) {
        console.error(error);
      }
    };
    loadModel();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleAnalyze = async (file: File) => {
    setIsLoading(true);
    setResults(null);
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);

    try {
      const minDelay = new Promise((resolve) => setTimeout(resolve, 3000));

      if (model) {
        const img = new Image();
        img.src = objectUrl;
        await new Promise((resolve) => (img.onload = resolve));

        const tensor = tf.browser.fromPixels(img)
          .resizeNearestNeighbor([224, 224])
          .toFloat()
          .expandDims();

        const prediction = model.predict(tensor) as tf.Tensor;
        const data = await prediction.data();
        const classIndex = Array.from(data).indexOf(Math.max(...Array.from(data)));
        const resultText = CLASSES[classIndex];
        const confidenceScore = (Math.max(...Array.from(data)) * 100).toFixed(2);
        
        const urgencyLevel = (resultText === "No Tumor" || resultText === "Not an MRI") ? "None" : "High";

        await minDelay;

        setResults({
          predictions: resultText,
          confidence: confidenceScore,
          urgency: urgencyLevel,
          isError: false
        });
      }
    } catch (error) {
      console.error(error);
      setResults({
        predictions: "Error",
        confidence: "0",
        urgency: "None",
        isError: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <TopBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      {isLoading ? (
        <Loading />
      ) : results && imageUrl ? (
        <Results 
          results={results} 
          image={imageUrl} 
          onReset={() => setResults(null)} 
        />
      ) : (
        <UploadMri onClick={handleAnalyze} />
      )}
    </div>
  );
}

export default App;