// AzureSpeechToText.tsx
import React, { useState } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

const AzureSpeechToText = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  const startSpeechRecognition = () => {
      const tempTokenKey = import.meta.env.VITE_SPEECH_TOKEN_KEY;
       const tempTokenRegion= import.meta.env.VITE_SPEECH_REGION_KEY;
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(tempTokenKey,tempTokenRegion

    );
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
    <div style={{ padding: "1rem" }}>
      <h3>🎙️ Azure Speech-to-Text Demo</h3>
      <button onClick={startSpeechRecognition} disabled={isListening}>
        {isListening ? "Listening..." : "Start Recording"}
      </button>
      <p><strong>Result:</strong> {transcript}</p>
    </div>
  );
};

export default AzureSpeechToText;
