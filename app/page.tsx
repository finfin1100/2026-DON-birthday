"use client";

import { useEffect, useRef, useState } from "react";

const loadingTexts = [
  "正在讀取部門核心資料...",
  "正在掃描員工資料庫...",
  "正在統計辦公室笑聲來源...",
  "AI 模型出現意見分歧...",
  "發生錯誤...",
  "莫名資料大亂灌入?!?!",
  "⚠ 資料量超出預期",
  "啟動緊急應對措施",
  "重新導正回系統...",
  "已恢復正常模式",
  "即將進行現場掃描...",
  "這個人會笑得很大聲...",
  "笑聲是 哈哈哈哈哈哈哈",
  "這個人真的太明顯了...",
  "系統即將揭曉...",
];

export default function Home() {
  const [step, setStep] = useState("home");
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const isErrorMode = textIndex >= 5 && textIndex <= 9;
  const isErrorModeRef = useRef(false);
  const scanningAudioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const errorAudioRef = useRef<HTMLAudioElement | null>(null);
  const birthdayAudioRef = useRef<HTMLAudioElement | null>(null);
  const countdownStartedRef = useRef(false);

  useEffect(() => {
    scanningAudioRef.current = new Audio("/sounds/scanning.mp3");
    scanningAudioRef.current.loop = true;
    scanningAudioRef.current.volume = 0.4;

    backgroundAudioRef.current = new Audio("/sounds/background.mp3");
    backgroundAudioRef.current.loop = true;
    backgroundAudioRef.current.volume = 0.18;

    errorAudioRef.current = new Audio("/sounds/error.mp3");
    errorAudioRef.current.volume = 0.7;

    birthdayAudioRef.current = new Audio("/sounds/birthday.mp3");
    birthdayAudioRef.current.loop = true;
    birthdayAudioRef.current.volume = 0.45;
  }, []);

  useEffect(() => {
    isErrorModeRef.current = isErrorMode;
  }, [isErrorMode]);

  useEffect(() => {
    if (isErrorMode && errorAudioRef.current) {
      errorAudioRef.current.currentTime = 0;
      errorAudioRef.current.play();
    }
  }, [isErrorMode]);

  useEffect(() => {
    if (step !== "loading") return;

    setProgress(0);
    setTextIndex(0);



const textTimer = setInterval(() => {
  setTextIndex((prev) => {
    if (prev >= loadingTexts.length - 1) return prev;
    return prev + 1;
  });
}, 2800);

const progressTimer = setInterval(() => {
  setProgress((prev) => {

    // 錯誤期間：進度條停住
    if (isErrorModeRef.current) {
      return prev;
    }

    // 最多到99%
    if (prev >= 99) {
      return 99;
    }

    return prev + 1;

  });
}, 260);



    return () => {
      clearInterval(progressTimer);
      clearInterval(textTimer);
    };
  }, [step]);
  useEffect(() => {

  if (progress < 99 || step !== "loading") return;
  if (countdownStartedRef.current) return;

  countdownStartedRef.current = true;
  setProgress(100);

  setTimeout(() => {

    setCountdown(3);

    if (scanningAudioRef.current) {
      scanningAudioRef.current.pause();
      scanningAudioRef.current.currentTime = 0;
    }

    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
      backgroundAudioRef.current.currentTime = 0;
    }

    setStep("flash");

    setCountdown(3);

    setTimeout(() => {
      setCountdown(2);
    }, 650);

    setTimeout(() => {
      setCountdown(1);
    }, 1300);

    setTimeout(() => {


      if (scanningAudioRef.current) {
        scanningAudioRef.current.pause();
        scanningAudioRef.current.currentTime = 0;
      }

      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
        backgroundAudioRef.current.currentTime = 0;
      }

      setStep("result");

      setTimeout(() => {

        setShowResult(true);

        setTimeout(() => {
          birthdayAudioRef.current?.play();
        }, 4500);

      }, 300);

    }, 1950);

  }, 800);

}, [progress, step]);

  if (step === "flash") {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden relative">

        {/* 背景光 */}
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl animate-[pulse_0.6s_ease-in-out_infinite]" />

        {/* 科技格線 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="relative z-10 text-center">

          <p className="text-cyan-400 tracking-[0.4em] text-lg mb-10 animate-[pulse_0.6s_ease-in-out_infinite]">
            即將為您揭曉
          </p>

          <div
            key={countdown}
            className={`
              text-[12rem]
              font-black
              drop-shadow-[0_0_60px_rgba(34,211,238,1)]

              transition-all
              duration-150

              ${
                countdown === 1
                  ? "scale-125 text-red-400"
                  : "scale-100 text-cyan-300"
              }

              animate-pulse
            `}
          >
            {countdown}
          </div>

        </div>

        {/* 白光爆閃 */}
        {countdown === 1 && (
          <div className="absolute inset-0 bg-white animate-[ping_0.4s_ease-out_1] opacity-20" />
        )}

      </main>
    );
  }

  if (step === "loading") {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 overflow-hidden relative">

        {/* 背景光球 */}
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-[pulse_0.6s_ease-in-out_infinite]" />

        {/* 科技格線 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* 掃描線 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="scan-line absolute left-0 w-full h-24 z-50 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-cyan-400/70 to-transparent blur-md" />
          </div>
        </div>

        <div className="relative z-10 w-full max-w-2xl text-center border border-cyan-400/30 rounded-3xl p-10 bg-black/70 shadow-[0_0_40px_rgba(34,211,238,0.25)]">

          <p className="text-cyan-400 tracking-[0.4em] mb-6 animate-[pulse_0.6s_ease-in-out_infinite]">
            ANALYZING...
          </p>

          <h1 className="text-4xl font-bold mb-8">
            AI 正在分析公司資料
          </h1>

          {/* 錯誤彈窗 */}
          {isErrorMode && (
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">

              <div className="bg-black/90 border border-red-500 rounded-2xl px-10 py-8 shadow-[0_0_40px_rgba(255,0,0,0.5)] animate-[pulse_0.6s_ease-in-out_infinite]">

                <p className="text-red-500 text-sm tracking-[0.3em] mb-4">
                  SYSTEM ERROR
                </p>

                <h2 className="text-red-400 text-3xl font-black mb-3">
                  ⚠ AI ANALYSIS FAILED
                </h2>

                <p className="text-red-300 text-lg">
                  偵測到異常情緒波動
                </p>

                <p className="text-red-300 text-lg">
                  正在重新導正系統...
                </p>

              </div>
            </div>
          )}

          {/* 進度條 */}
          <div className="w-full bg-gray-800 rounded-full h-5 overflow-hidden mb-4">
            <div
              className="bg-cyan-400 h-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-cyan-300 mb-8 text-xl font-bold">
            {progress}%
          </p>

          {/* 分析文字 */}
          <div className="h-40 flex flex-col justify-center items-center space-y-4 overflow-hidden">

            {loadingTexts
              .slice(Math.max(0, textIndex - 2), textIndex + 1)
              .map((text, index, arr) => {
                const isNewest = index === arr.length - 1;

                return (
                  <p
                    key={text}
                    className={`
                      transition-all duration-500

                      ${
                        isErrorMode
                          ? isNewest
                            ? "text-red-400 text-2xl font-bold scale-110 opacity-100"
                            : "text-red-800 text-lg opacity-50"
                          : isNewest
                            ? "text-cyan-300 text-2xl font-bold scale-110 opacity-100"
                            : "text-gray-500 text-lg opacity-50"
                      }
                    `}
                  >
                    {text}
                  </p>
                );
              })}
          </div>
        </div>
      </main>
    );
  }

  if (step === "result") {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden relative">

        {/* 背景光 */}
        <div className="absolute w-[900px] h-[900px] bg-cyan-500/20 rounded-full blur-3xl animate-[pulse_0.6s_ease-in-out_infinite]" />

        {/* 科技格線 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* 上方光束 */}
        <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-cyan-400/20 to-transparent" />

        <div className="relative z-10 text-center px-6 scale-[0.88] md:scale-[0.95] origin-center">

          {/* 第一段 */}
          <div className={`transition-all duration-1000 ${
            showResult
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}>
            <p className="text-cyan-400 tracking-[0.5em] text-sm mb-6 animate-[pulse_0.6s_ease-in-out_infinite]">
              FINAL RESULT
            </p>



            <h1 className="text-4xl md:text-5xl font-black mb-10">
              今日最特別的人是
            </h1>
          </div>

          {/* DON動畫 */}
          <div className="relative h-[170px] flex items-center justify-center overflow-visible">

            {/* DON */}
            <div className={`
              absolute z-20
              text-[7rem] md:text-[11rem]
              font-black
              text-cyan-300
              tracking-widest
              drop-shadow-[0_0_40px_rgba(34,211,238,1)]
              transition-all
              duration-[2500ms]
              ease-in-out

              ${
                showResult
                  ? "translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100"
                  : "-translate-x-[1200px] translate-y-[150px] rotate-[720deg] scale-50 opacity-0"
              }
            `}>
              DON
            </div>

            {/* 衝擊波 */}
            {showResult && (
              <div className="absolute z-10 w-[500px] h-[500px] rounded-full border-4 border-cyan-400 animate-[ping_0.8s_ease-out_1] opacity-30" />
            )}

          </div>

          {/* AI CONFIDENCE */}
          <div className={`
            transition-all duration-1000 delay-[2200ms]
            ${
              showResult
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }
          `}>

            <div className="mb-10">

            </div>
          </div>

          {/* 生日快樂 */}
          <div className={`
            space-y-4
            transition-all duration-1000 delay-[3200ms]

            ${
              showResult
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }
          `}>

            <p className="text-6xl md:text-7xl font-black text-white animate-bounce leading-tight">
              🎂 HAPPY BIRTHDAY 🎂
            </p>

            <p className="text-cyan-200 text-xl">
              感謝你帶領大家又升級了一年
            </p>

          </div>

          {/* 底部 */}
          <div className={`
            mt-10 text-gray-600 text-sm tracking-[0.3em]
            transition-all duration-1000 delay-[4200ms]

            ${
              showResult
                ? "opacity-100"
                : "opacity-0"
            }
          `}>
            
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 overflow-hidden relative">

      {/* 光球 */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-[pulse_0.6s_ease-in-out_infinite]" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-[pulse_0.6s_ease-in-out_infinite]" />

      {/* 格線 */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative z-10 text-center max-w-2xl border border-cyan-400/30 rounded-3xl p-10 bg-black/70 shadow-[0_0_40px_rgba(34,211,238,0.2)]">

        <p className="text-cyan-400 tracking-[0.3em] mb-4 animate-[pulse_0.6s_ease-in-out_infinite]">
          PEOPLE ANALYSIS SYSTEM
        </p>

        <h1 className="text-5xl font-bold mb-6 leading-tight">
          今日最重要人物分析
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          請按下面按鈕開始現場掃描。
        </p>

        <button
onClick={() => {
if (step === "home") {

  scanningAudioRef.current?.play();
  backgroundAudioRef.current?.play();

  setStep("loading");
}
}}
          className="bg-cyan-400 text-black px-8 py-4 rounded-full text-xl font-bold hover:scale-110 transition shadow-[0_0_25px_rgba(34,211,238,0.8)] animate-bounce"
        >
          開始分析
        </button>
      </div>
    </main>
  );
}