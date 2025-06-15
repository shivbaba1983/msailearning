import React, { useState } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import "./SpeechToTextToSpeech.scss";

const SpeechToTextToSpeech = () => {
  const [recognizedText, setRecognizedText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const azureKey = import.meta.env.VITE_SPEECH_TOKEN_KEY;
  const azureRegion = import.meta.env.VITE_SPEECH_REGION_KEY;

  const startRecognition = () => {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      azureKey,
      azureRegion
    );
    speechConfig.speechRecognitionLanguage = "en-US";

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    setIsListening(true);

    recognizer.recognizeOnceAsync(result => {
      setIsListening(false);

      if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        setRecognizedText(result.text);
        speakText(result.text);
      } else {
        console.error("Speech recognition failed:", result.errorDetails);
      }

      recognizer.close();
    });
  };

  const speakText = text => {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      azureKey,
      azureRegion
    );
    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSDK.SpeechSynthesizer(
      speechConfig,
      audioConfig
    );

    synthesizer.speakTextAsync(
      text,
      result => {
        if (result.reason !== SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
          console.error("Synthesis failed:", result.errorDetails);
        }
        synthesizer.close();
      },
      error => {
        console.error("Error during synthesis:", error);
        synthesizer.close();
      }
    );
  };

  return (
    <div className="speech-container">
      <h2 className="speech-title">🎤 Speech to Text ➡️ 🗣️ Text to Speech</h2>

      <button
        className={`speech-button ${isListening ? "speech-button--busy" : ""}`}
        onClick={startRecognition}
        disabled={isListening}
      >
        {isListening ? "Listening..." : "Start Speech Recognition"}
      </button>

      <p className="speech-output">
        <strong>Recognized:</strong>{" "}
        {recognizedText || <em>— nothing yet —</em>}
      </p>
    </div>
  );
};

export default SpeechToTextToSpeech;
