import React, { useState } from "react";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

const SpeechToTextToSpeech = () => {
    const [recognizedText, setRecognizedText] = useState("");
    const [isListening, setIsListening] = useState(false);

    // Replace these with your actual Azure Speech keys
    const azureKey = import.meta.env.VITE_SPEECH_TOKEN_KEY;
    const azureRegion = import.meta.env.VITE_SPEECH_REGION_KEY;

    const startRecognition = () => {
        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(azureKey, azureRegion);
        speechConfig.speechRecognitionLanguage = "en-US";

        const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

        setIsListening(true);

        recognizer.recognizeOnceAsync(result => {
            setIsListening(false);

            if (result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
                setRecognizedText(result.text);
                speakText(result.text); // Auto speak after recognition
            } else {
                console.error("Speech recognition failed:", result.errorDetails);
            }

            recognizer.close();
        });
    };

    const speakText = (text) => {
        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(azureKey, azureRegion);
        // Female neural voice
        speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

        const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();
        const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig);

        synthesizer.speakTextAsync(
            text,
            result => {
                if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                    console.log("Text spoken successfully.");
                } else {
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
        <div style={{ padding: "1rem", maxWidth: 500 }}>
            <h2>🎤 Speech to Text ➡️ 🗣️ Text to Speech</h2>
            <button onClick={startRecognition} disabled={isListening}>
                {isListening ? "Listening..." : "Start Speech Recognition"}
            </button>
            <p><strong>Recognized:</strong> {recognizedText}</p>
        </div>
    );
};

export default SpeechToTextToSpeech;
