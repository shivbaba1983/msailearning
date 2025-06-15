import React, { useState } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import "./AzureSpeechToText.scss";

const AzureSpeechToText = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  const startSpeechRecognition = () => {
    const key = import.meta.env.VITE_SPEECH_TOKEN_KEY;
    const region = import.meta.env.VITE_SPEECH_REGION_KEY;

    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(key, region);
    speechConfig.speechRecognitionLanguage = "en-US";

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    setIsListening(true);
    setTranscript("Listening...");

    recognizer.recognizeOnceAsync(result => {
      setIsListening(false);

      if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        setTranscript(result.text);
      } else {
        setTranscript("Could not recognize speech.");
      }

      recognizer.close();
    });
  };

  return (
    <div className="stt-container">
      <h3 className="stt-title">🎙️ Azure Speech-to-Text Demo</h3>
      <button
        className={`stt-button ${isListening ? "stt-button--disabled" : ""}`}
        onClick={startSpeechRecognition}
        disabled={isListening}
      >
        {isListening ? "Listening..." : "Start Recording"}
      </button>
      <p className="stt-output">
        <strong>Result:</strong> {transcript || <em>— nothing yet —</em>}
      </p>
    </div>
  );
};

export default AzureSpeechToText;
