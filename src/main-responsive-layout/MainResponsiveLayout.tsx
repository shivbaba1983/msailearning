
import "./MainResponsiveLayout.scss";
import { useEffect, useState } from "react";
import AzureSpeechToText from './../speech/AzureSpeechToText';
import AzureTextToSpeech from './../speech/AzureTextToSpeech';
import SpeechToTextToSpeech from './../speech/SpeechToTextToSpeech';
const MainResponsiveLayout = () => {
  const [isLogReading, setIsLogReading] = useState(false);
  const [showUSA, setUSA] = useState(true);
  const [showNSE, setShowNSE] = useState(false);

  return (
    <div className="application-level">


      <AzureSpeechToText />
      <AzureTextToSpeech />
      <SpeechToTextToSpeech/>
    </div>
  );
};

export default MainResponsiveLayout;