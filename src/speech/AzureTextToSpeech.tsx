import React, { useState } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import "./AzureTextToSpeech.scss";

const AzureTextToSpeech = () => {
  const [text, setText] = useState(
    "The name Anil has its roots in Sanskrit, a classical language of India, where it means air, wind. It is derived from the Sanskrit word अनिल (Anila), which directly refers to the god of the wind in Hindu mythology."
  );

  const speakText = () => {
    const key = import.meta.env.VITE_SPEECH_TOKEN_KEY;
    const region = import.meta.env.VITE_SPEECH_REGION_KEY;

    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(key, region);
    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(
      text,
      result => {
        if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
          console.log("Speech synthesis succeeded.");
        } else {
          console.error("Speech synthesis failed:", result.errorDetails);
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
    <div className="tts-container">
      <h2 className="tts-title">🗣️ Azure Text to Speech (Female Voice)</h2>

      <textarea
        className="tts-input"
        rows={5}
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button className="tts-button" onClick={speakText}>
        🔊 Speak
      </button>
    </div>
  );
};

export default AzureTextToSpeech;
