"use client";
import { useEffect, useState, useRef } from "react";

const keysEn = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
];

const keysFa = [
    ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "چ"],
    ["ش", "س", "ی", "ب", "ل", "ا", "ت", "ن", "م", "ک", "گ"],
    ["ظ", "ط", "ز", "ر", "ذ", "د", "پ", "و"]
];

export default function TypingSVGGame() {
    const [lang, setLang] = useState("en");
    const [sentence, setSentence] = useState("");
    const [input, setInput] = useState("");
    const [mistakes, setMistakes] = useState(0);
    const [status, setStatus] = useState("loading");
    const [pressedKey, setPressedKey] = useState(null);
    const [completed, setCompleted] = useState(0);
    const [failed, setFailed] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60); // تایمر از 60 شروع شود
    const timerRef = useRef(null);
    const startedRef = useRef(false);

    const fetchSentence = async () => {
        setStatus("loading");
        setInput("");
        setMistakes(0);
        startedRef.current = false;
        clearInterval(timerRef.current);
        try {
            if (lang === "en") {
                const res = await fetch("https://api.quotable.io/random");
                const data = await res.json();
                setSentence(data.content.toLowerCase());
            } else {
                const res = await fetch("https://api.ganjoor.net/api/ganjoor/poem/random");
                const data = await res.json();
                const clean = data.plainText.replace(/\n/g, " ").trim();
                setSentence(clean);
            }
            setStatus("typing");
        } catch {
            setSentence("Error fetching sentence. Try again.");
            setStatus("error");
        }
    };

    useEffect(() => {
        fetchSentence();
    }, [lang, completed, failed]);

    const startTimer = () => {
        if (startedRef.current) return;
        startedRef.current = true;
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setStatus("failed");
                    setFailed((f) => f + 1);
                    setTimeout(fetchSentence, 1200);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleKey = (key) => {
        if (status !== "typing") return;
        if (key === "Meta" || key === "Alt" || key === "Control") return;
        if (!startedRef.current) startTimer();
        if (key === "Backspace") {
            setInput((prev) => prev.slice(0, -1));
            return;
        }
        if (key.length !== 1) return;

        setPressedKey(key);
        setTimeout(() => setPressedKey(null), 150);

        const expected = sentence[input.length];
        const incoming = key;

        if (incoming === expected) {
            const newInput = input + incoming;
            setInput(newInput);
            if (newInput === sentence) {
                clearInterval(timerRef.current);
                setCompleted((c) => c + 1);
                setTimeLeft((prev) => Math.max(0, prev - 5)); // ۵ ثانیه کم
                setTimeout(fetchSentence, 1200);
            }
        } else {
            setMistakes((m) => m + 1);
            setInput((prev) => prev + incoming);
            setTimeLeft((prev) => prev + 5); // ۵ ثانیه اضافه
            if (mistakes + 1 >= 3) {
                clearInterval(timerRef.current);
                setStatus("failed");
                setFailed((f) => f + 1);
                setTimeout(fetchSentence, 1200);
            }
        }
    };

    useEffect(() => {
        const down = (e) => handleKey(e.key);
        window.addEventListener("keydown", down);
        return () => window.removeEventListener("keydown", down);
    }, [sentence, input, mistakes, status, lang]);

    const currentKeys = lang === "en" ? keysEn : keysFa;

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div className="flex gap-3">
                <button
                    className={`px-4 py-2 rounded ${lang === "en" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setLang("en")}
                >
                    English
                </button>
                <button
                    className={`px-4 py-2 rounded ${lang === "fa" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setLang("fa")}
                >
                    فارسی
                </button>
            </div>

            <div className="w-full max-w-2xl p-4 bg-white rounded-lg border shadow-sm">
                {status === "loading" && <p className="text-gray-500 text-center">Loading sentence...</p>}
                {status !== "loading" && (
                    <p
                        className="text-lg font-medium leading-relaxed text-center select-none"
                        dir={lang === "fa" ? "rtl" : "ltr"}
                    >
                        {sentence.split("").map((ch, idx) => {
                            const typed = input[idx];
                            if (!typed) return <span key={idx} className="text-gray-400">{ch}</span>;
                            if (typed === ch) return <span key={idx} className="text-black">{ch}</span>;
                            return <span key={idx} className="text-red-500">{typed}</span>;
                        })}
                    </p>
                )}
            </div>

            <div className="flex gap-4 text-sm text-gray-600">
                <span>Time left: {timeLeft}s</span>
                <span>Mistakes: {mistakes}/3</span>
                <span>Completed: {completed}</span>
                <span>Failed: {failed}</span>
            </div>

            <div className="mt-4 flex flex-col gap-2">
                {currentKeys.map((row, i) => (
                    <svg key={i} viewBox={`0 0 ${row.length * 40} 40`} className="w-full max-w-xl h-10">
                        {row.map((k, idx) => {
                            const x = idx * 40;
                            return (
                                <g key={k}>
                                    <rect
                                        x={x}
                                        y={0}
                                        width={38}
                                        height={38}
                                        rx={6}
                                        ry={6}
                                        fill={pressedKey === k ? "#3b82f6" : "#ffffff"}
                                        stroke="#00000020"
                                    />
                                    <text
                                        x={x + 19}
                                        y={24}
                                        fontSize={16}
                                        fontFamily="monospace"
                                        textAnchor="middle"
                                        fill={pressedKey === k ? "#ffffff" : "#000000"}
                                    >
                                        {k}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                ))}
            </div>
        </div>
    );
}
