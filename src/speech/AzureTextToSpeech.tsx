import React, { useState } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

const AzureTextToSpeech = () => {
  const [text, setText] = useState("Hello, welcome to Azure TTS!");

  const speakText = () => {
          const tempTokenKey = import.meta.env.VITE_SPEECH_TOKEN_KEY;
       const tempTokenRegion= import.meta.env.VITE_SPEECH_REGION_KEY;
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(tempTokenKey,tempTokenRegion );
    // Choose a female voice (e.g., en-US-JennyNeural)
    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

    const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(
      text,
      result => {
        if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
          console.log("Speech synthesis succeeded.");
        } else {
          console.error("Speech synthesis failed. Reason:", result.errorDetails);
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
    <div>
      <h2>Azure Text to Speech (Female Voice)</h2>
      <textarea
        rows={4}
        value={text}
        onChange={e => setText(e.target.value)}
        style={{ width: "100%" }}
      />
      <button onClick={speakText}>Speak</button>
    </div>
  );
};

export default AzureTextToSpeech;
