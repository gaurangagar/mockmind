"use client";

import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { useParams } from "next/navigation";
import { CameraOff } from "lucide-react";

export default function Page() {
  const params = useParams();
  const mockId = params?.mockId;

  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [interviewData, setInterviewData] = useState();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const toggleWebcam = () => {
    setWebcamEnabled((prev) => !prev);
  };

  useEffect(() => {
    console.log("Interview ID:", mockId);
    const GetInterviewDetails = async () => {
      const res = await fetch(`/api/interview/${mockId}`);
      const data = await res.json();
      setInterviewData(data);
      console.log(data.jsonMockResp);
      const questionsParsed = JSON.parse(JSON.parse(data.jsonMockResp));
      //console.log(questions)
      setQuestions(questionsParsed);
    };
    GetInterviewDetails();
  }, [mockId]);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  const currentQuestion = questions[currentIndex];

  const nextQuestion = () => {
    setAnswers((prev) => [...prev, currentAnswer]);
    setCurrentAnswer("");
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert("Interview completed!");
    }
  };

  return (
    <div>
      {mockId}

      {currentQuestion && (
        <div>
          <h2>Question {currentIndex + 1}</h2>
          <p>{currentQuestion.question}</p>
        </div>
      )}
      {webcamEnabled ? (
        <Webcam mirrored={true} />
      ) : (
        <>
          <div>camera disabled</div>
          <CameraOff />
        </>
      )}
      <button onClick={toggleWebcam}>
        {webcamEnabled ? "Disable Webcam" : "Enable Webcam"}
      </button>
      <p>Webcam is {webcamEnabled ? "ON" : "OFF"}</p>
      <div>
        <h1>Recording: {isRecording.toString()}</h1>
        <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        <ul>
          {results.map((result) => (
            <li key={result.timestamp}>{result.transcript}</li>
          ))}
          {interimResult && <li>{interimResult}</li>}
        </ul>
      </div>
      <button onClick={nextQuestion}>Next Question</button>
    </div>
  );
}
