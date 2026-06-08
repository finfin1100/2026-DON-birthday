"use client";

import { useEffect, useRef, useState } from "react";

const loadingTexts = [
  "正在打開上軒的電腦",
  "讀取電腦的秘密",
  ". . . . . . . .",
  "即將進行現場掃描...",
  ". . . . . . . . .",
  "這個人的笑聲很大聲...",
  "笑聲是 哈哈哈哈哈哈哈",
  "系統即將揭曉!!!",
];

const TEXT_INTERVAL = 100;
const TOTAL_LOADING_TIME = loadingTexts.length * TEXT_INTERVAL;
const PROGRESS_INTERVAL = TOTAL_LOADING_TIME / 99;
const bossAnimationStyle = `
  @keyframes bossWalk {
    0% { transform: translateX(-260px) translateY(0) scaleX(1); }
    8% { transform: translateX(-190px) translateY(0) scaleX(1); }
    14% { transform: translateX(-130px) translateY(0) scaleX(1); }

    17% { transform: translateX(-95px) translateY(0) scaleX(1); }
    18% { transform: translateX(-65px) translateY(-25px) scaleX(1); }
    19% { transform: translateX(-35px) translateY(-75px) scaleX(1); }
    20% { transform: translateX(0px) translateY(-75px) scaleX(1); }
    21% { transform: translateX(35px) translateY(-75px) scaleX(1); }
    22% { transform: translateX(65px) translateY(-25px) scaleX(1); }
    23% { transform: translateX(95px) translateY(0) scaleX(1); }
    24% { transform: translateX(130px) translateY(0) scaleX(1); }

    44% { transform: translateX(220px) translateY(0) scaleX(1); }
    47% { transform: translateX(260px) translateY(0) scaleX(1) rotate(-5deg); }
    50% { transform: translateX(240px) translateY(0) scaleX(-1) rotate(4deg); }
    53% { transform: translateX(225px) translateY(0) scaleX(-1) rotate(0deg); }

    60% { transform: translateX(145px) translateY(0) scaleX(-1); }

    63% { transform: translateX(105px) translateY(0) scaleX(-1); }
    64% { transform: translateX(75px) translateY(-25px) scaleX(-1); }
    65% { transform: translateX(45px) translateY(-75px) scaleX(-1); }
    66% { transform: translateX(10px) translateY(-75px) scaleX(-1); }
    67% { transform: translateX(-25px) translateY(-75px) scaleX(-1); }
    68% { transform: translateX(-55px) translateY(-25px) scaleX(-1); }
    69% { transform: translateX(-85px) translateY(0) scaleX(-1); }
    70% { transform: translateX(-125px) translateY(0) scaleX(-1); }

    90% { transform: translateX(-220px) translateY(0) scaleX(-1); }
    94% { transform: translateX(-270px) translateY(0) scaleX(-1) rotate(5deg); }
    97% { transform: translateX(-245px) translateY(0) scaleX(1) rotate(-4deg); }
    100% { transform: translateX(-260px) translateY(0) scaleX(1) rotate(0deg); }
  }

  @keyframes leftArm {
    from {
      transform: rotate(-35deg);
    }

    to {
      transform: rotate(35deg);
    }
  }

  @keyframes rightArm {
    from {
      transform: rotate(35deg);
    }

    to {
      transform: rotate(-35deg);
    }
  }
`;

export default function Home() {
  const [step, setStep] = useState("home");
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const scanningAudioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const birthdayAudioRef = useRef<HTMLAudioElement | null>(null);
  const whooshAudioRef = useRef<HTMLAudioElement | null>(null);
  const countdownStartedRef = useRef(false);

  useEffect(() => {
    scanningAudioRef.current = new Audio("/sounds/scanning.mp3");
    scanningAudioRef.current.loop = true;
    scanningAudioRef.current.volume = 0.4;

    backgroundAudioRef.current = new Audio("/sounds/background.mp3");
    backgroundAudioRef.current.loop = true;
    backgroundAudioRef.current.volume = 0.18;

    birthdayAudioRef.current = new Audio("/sounds/birthday.mp3");
    birthdayAudioRef.current.loop = true;
    birthdayAudioRef.current.volume = 0.45;

    whooshAudioRef.current = new Audio("/sounds/whoosh.mp3");
    whooshAudioRef.current.volume = 0.8;
  }, []);

  useEffect(() => {
    if (step !== "loading") return;

    setProgress(0);
    setTextIndex(0);
    setShowResult(false);
    setCountdown(3);
    countdownStartedRef.current = false;



  const textTimer = setInterval(() => {
    setTextIndex((prev) => {
      if (prev >= loadingTexts.length - 1) return prev;
      return prev + 1;
    });
  }, TEXT_INTERVAL);

  const progressTimer = setInterval(() => {
    setProgress((prev) => {

      if (prev >= 99) {
        return 99;
      }

      return prev + 1;

    });
  }, PROGRESS_INTERVAL);



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

        // DON 飛劍音效：提早一點播，讓中間 0.4 秒對上轉彎點
        [0, 400, 900, 1500, 2100].forEach((time) => {
          setTimeout(() => {
            const whoosh = new Audio("/sounds/whoosh.mp3");
            whoosh.volume = 0.6;
            whoosh.play();
          }, time);
        });

        // 生日歌
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

          <p className="text-cyan-400 tracking-[0.4em] text-lg mb-10">
            即將為您揭曉
          </p>

          <div
            key={countdown}
            className="
              text-[12rem]
              font-black
              text-cyan-300
            "
          >
            {countdown}
          </div>

        </div>

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

        <div className="flex flex-col items-center mb-8">

          <div className="flex gap-8 h-[120px]">

            {/* 左眼 */}
            <div className="eye-shape">
              <div className="eye-pupil">
                <div className="eye-highlight" />
              </div>
            </div>

            {/* 右眼 */}
            <div className="eye-shape">
              <div className="eye-pupil">
                <div className="eye-highlight" />
              </div>
            </div>

          </div>

          <p className="text-cyan-300 text-lg mt-4 tracking-[0.3em]">
            SCANNING MEETING ROOM...
          </p>

        </div>

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
              .map((text, originalIndex) => ({ text, originalIndex }))
              .slice(Math.max(0, textIndex - 2), textIndex + 1)
              .map(({ text, originalIndex }, index, arr) => {
                const isNewest = index === arr.length - 1;

                return (
                  <p
                    key={originalIndex}
                    className={`
                      transition-all duration-700 ease-out

                      ${
                        isNewest
                          ? "text-cyan-300 text-4xl font-bold scale-110 opacity-100"
                          : "text-gray-500 text-lg opacity-40 -translate-y-4 scale-95"
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
      <main className="min-h-screen bg-black text-white flex items-center justify-center overflow-visible relative">
        <style>{bossAnimationStyle}</style>

        {/* 背景光 */}
        <div className="absolute w-[900px] h-[900px] bg-cyan-500/20 rounded-full blur-3xl animate-[pulse_0.6s_ease-in-out_infinite]" />

        {/* 科技格線 */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

        {/* 上方光束 */}
        <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-cyan-400/20 to-transparent" />

        <div className="relative z-10 text-center px-6 scale-[0.88] md:scale-[0.95] origin-center">

          {/* 第一段 */}
          <div className={`relative z-30 transition-all duration-1000 ${
            showResult
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}>
            <p className="text-cyan-400 tracking-[0.5em] text-sm mb-6 animate-[pulse_0.6s_ease-in-out_infinite]">
              FINAL RESULT
            </p>



            <h1 className="relative z-20 text-4xl md:text-5xl font-black mb-10">
              今日最特別的人是
            </h1>
          </div>

          {/* DON動畫 */}
          <div className="relative h-[170px] flex items-center justify-center overflow-visible">

            {/* DON */}
            <div
              className="
                absolute z-20
                text-[7rem] md:text-[11rem]
                font-black
                text-cyan-300
                tracking-widest
                drop-shadow-[0_0_90px_rgba(34,211,238,1)]
              "
              style={{
                opacity: showResult ? 1 : 0,
                animation: showResult
                  ? "donSwordEnter 3.2s cubic-bezier(0.18, 0.9, 0.2, 1.15) forwards"
                  : "none",
              }}
            >
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
            relative z-20
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
          {/* 老闆亂跑 */}
          <div
            className="fixed bottom-[-60px] left-1/2 z-[999] w-[140px]"
            style={{
              animation: "bossWalk 8.5s cubic-bezier(.45,0,.25,1) infinite",
            }}
          >
            {/* 頭 */}
            <img
              src="/boss.png"
              alt="boss"
              className="w-22 h-26 object-contain rounded-lg mx-auto relative z-10"
            />

            {/* 脖子 */}
            <div className="w-6 h-2 bg-[#f1c27d] mx-auto -mt-1.5 relative z-0" />

            {/* 身體 */}
            <div className="relative w-[100px] h-[108px] bg-cyan-500 mx-auto rounded-md">
              {/* 左手 */}
              <div
                className="absolute top-3 left-[-18px] w-6 h-[88px] bg-[#f1c27d] rounded-b-md"
                style={{
                  transformOrigin: "top center",
                  animation: "leftArm 0.45s infinite alternate",
                }}
              />

              {/* 右手 */}
              <div
                className="absolute top-3 right-[-18px] w-6 h-[88px] bg-[#f1c27d] rounded-b-md"
                style={{
                  transformOrigin: "top center",
                  animation: "rightArm 0.45s infinite alternate",
                }}
              />
            </div>

            {/* 腳 */}
            <div className="flex justify-center gap-2">
              <div className="w-8 h-[88px] bg-blue-700 rounded-b-sm" />
              <div className="w-8 h-[88px] bg-blue-700 rounded-b-sm" />
            </div>
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
    <>
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
          今日最特別人物分析
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          請按下面按鈕開始現場掃描
        </p>

        <button
        onClick={() => {
        if (step === "home") {

          scanningAudioRef.current?.play();
          backgroundAudioRef.current?.play();

          setStep("loading");
        }
        }}
          className="bg-cyan-400 text-black px-12 py-6 rounded-full text-3xl font-bold hover:scale-110 transition shadow-[0_0_25px_rgba(34,211,238,0.8)] animate-bounce"
        >
          開始分析
        </button>
      </div>
    </main>
    </>
  );
}
