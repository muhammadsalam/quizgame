import { useEffect, useRef, useState } from "react";
import { http } from "../../shared/utils/http";
import { useUserStore } from "../../user";

const IMAGE_PLACEHOLDER =
    "https://41ce9b94-f42e-49e9-8cd4-e3d33fdef1ff.selstorage.ru/default.webp";

const CategoriesLayout = ({
    setSelectedCategoryId,
}: {
    setSelectedCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
    return (
        <main>
            <div className="px-[18px]">
                <h2 className="text-[22px] font-medium text-center my-[29px_50px]">
                    Закрепить материал
                </h2>

                <div className="space-y-[18px]">
                    <div className="border flex items-center bg-dark-2 border-border rounded-[7px] p-[10px] pointer-events-none">
                        <img
                            className="w-[50px] h-[56px] mr-[17px] rounded-lg"
                            src={
                                useUserStore.getState().level_photo
                                    ? useUserStore.getState().level_photo
                                    : IMAGE_PLACEHOLDER
                            }
                            alt=""
                        />

                        <div className="flex flex-col">
                            <span className="text-lg">
                                {useUserStore.getState().level_name}
                            </span>
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            setSelectedCategoryId(1);
                        }}
                        className="border flex items-center bg-dark-2 border-border rounded-[7px] p-[10px]"
                    >
                        <img
                            className="w-[50px] h-[56px] mr-[17px] rounded-lg"
                            src={
                                useUserStore.getState().category_photo
                                    ? useUserStore.getState().category_photo
                                    : IMAGE_PLACEHOLDER
                            }
                            alt=""
                        />

                        <div className="flex flex-col">
                            <span className="text-lg">
                                {useUserStore.getState().category_name}
                            </span>
                            <span className="text-[10px]">5 Минут</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

interface QuizProps {
    handleExit: () => void;
    setIsGameFinished: React.Dispatch<React.SetStateAction<boolean>>;
    setTrueQuestions: React.Dispatch<React.SetStateAction<number[]>>;
    questions: TQuestion[];
    activeQuestion: null | TQuestion;
    setActiveQuestion: React.Dispatch<React.SetStateAction<TQuestion | null>>;
    activeQuestionIndex: number;
    setActiveQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    handleAudioPlay: () => void;
    audioUpdate: (audio_src: string) => void;
}

type TQuestion = {
    word_id: number;
    word: string;
    translation: string;
    sentence: string;
    audio_url: string;
    options: string[];
};

interface RQuizzesNew {
    questions: TQuestion[];
}

const QuizLayout = ({
    handleExit,
    setIsGameFinished,
    setTrueQuestions,
    questions,
    activeQuestion,
    setActiveQuestion,
    activeQuestionIndex,
    setActiveQuestionIndex,
    handleAudioPlay,
    audioUpdate,
}: QuizProps) => {
    const [status, setStatus] = useState<null | "success" | "error">(null);

    const [selectedOption, setSelectedOption] = useState<null | string>(null);

    const handleSelectOption = (selectedText: string) => {
        setSelectedOption(selectedText);
        setStatus(
            selectedText === activeQuestion?.translation ? "success" : "error"
        );
    };

    return (
        <main className="px-[18px] pt-6 flex flex-col items-center">
            <div className="flex gap-[2px] w-full">
                {new Array(questions.length).fill(0).map((_, index) => (
                    <div
                        key={index}
                        className={`${
                            index < activeQuestionIndex && "bg-[#62B4F3]!"
                        } h-[6px] bg-[#394049] grow rounded-[6px]`}
                    ></div>
                ))}
            </div>

            <h1 className="my-[14px_13px] font-medium text-[22px]">
                Выберите правильный ответ
            </h1>

            <div className="relative">
                <svg
                    onClick={handleAudioPlay}
                    className="absolute right-[100%] top-[-8px] translate-x-[-7px]"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clipPath="url(#clip0_4_539)">
                        <path
                            d="M3 9V15H7L12 20V4L7 9H3ZM10 8.83V15.17L7.83 13H5V11H7.83L10 8.83ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z"
                            fill="#1CA5E2"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_4_539">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

                <img src="/assets/nose-audio.png" />
            </div>

            <div className="mt-[22px] grid grid-cols-2 gap-[30px]">
                {activeQuestion?.options.map((text) => (
                    <button
                        key={text}
                        onClick={() => handleSelectOption(text)}
                        className={`flex items-center justify-center break-all ${
                            text.length > 13 && "text-[15px]"
                        } bg-dark-2 border border-[#4C4C4C] w-[128px] h-[56px] rounded-[7px] text-lg ${
                            selectedOption === text &&
                            (status === "success"
                                ? "bg-[#8BC34A]! border-[#8BC34A]!"
                                : "bg-[#ED213D]! border-[#ED213D]!")
                        } ${status && "pointer-events-none"}`}
                    >
                        {text}
                    </button>
                ))}
            </div>

            <div
                className={`p-[17px] mt-[27px] rounded-[7px] ${
                    status && "bg-dark-2 border border-[#4C4C4C]"
                }`}
            >
                <div className={status ? "" : "opacity-0"}>
                    <strong>
                        {status === "success" ? "Правильно!" : "Упс!"}
                    </strong>
                    <p>{activeQuestion?.sentence}</p>
                </div>

                <div className="flex items-center space-between mt-[21px] gap-5">
                    <button
                        onClick={handleExit}
                        className="flex items-center gap-[5px] bg-[#7D8B98] w-[140px] justify-center rounded-[7px] py-[6px] text-dark-2 font-medium"
                    >
                        <svg
                            width="13"
                            height="12"
                            viewBox="0 0 13 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 6.75C12.4142 6.75 12.75 6.41421 12.75 6C12.75 5.58579 12.4142 5.25 12 5.25L12 6.75ZM0.46967 5.46967C0.176777 5.76256 0.176777 6.23744 0.46967 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.6967C6.01041 0.403806 5.53553 0.403806 5.24264 0.6967L0.46967 5.46967ZM12 5.25L1 5.25L1 6.75L12 6.75L12 5.25Z"
                                fill="#1D2635"
                            />
                        </svg>
                        Назад
                    </button>
                    <button
                        className="flex items-center gap-[5px] bg-[#62B4F3] w-[140px] justify-center rounded-[7px] py-[6px] font-medium disabled:opacity-50"
                        disabled={!status}
                        onClick={() => {
                            setTrueQuestions((acc) => {
                                if (status === "success" && activeQuestion)
                                    acc.push(activeQuestion?.word_id);

                                return acc;
                            });

                            const newQuestionIndex = activeQuestionIndex + 1;
                            if (newQuestionIndex < questions.length) {
                                setActiveQuestion(questions[newQuestionIndex]);
                                setActiveQuestionIndex(newQuestionIndex);
                                setSelectedOption(null);
                                setStatus(null);
                                audioUpdate(
                                    questions[newQuestionIndex].audio_url
                                );
                            } else {
                                setIsGameFinished(true);
                            }
                        }}
                    >
                        Дальше
                        <svg
                            width="13"
                            height="12"
                            viewBox="0 0 13 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 5.25C0.585787 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75L1 5.25ZM12.5303 6.53033C12.8232 6.23744 12.8232 5.76257 12.5303 5.46967L7.75736 0.6967C7.46447 0.403807 6.98959 0.403807 6.6967 0.6967C6.40381 0.989593 6.40381 1.46447 6.6967 1.75736L10.9393 6L6.6967 10.2426C6.4038 10.5355 6.4038 11.0104 6.6967 11.3033C6.98959 11.5962 7.46447 11.5962 7.75736 11.3033L12.5303 6.53033ZM1 6.75L12 6.75L12 5.25L1 5.25L1 6.75Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </main>
    );
};

interface FinishedGameLayoutProps {
    trueQuestions: number[];
    handleRetry: () => void;
    handleExit: () => void;
}

const FinishedGameLayout = ({
    trueQuestions,
    handleRetry,
    handleExit,
}: FinishedGameLayoutProps) => {
    useEffect(() => {
        http.post("/api/quizzes/answers", {
            user_id: useUserStore.getState().user_id,
            word_ids: trueQuestions,
        });
    }, []);

    return (
        <main className="flex flex-col items-center">
            <img src="/assets/finish-quiz.jpg" />

            <h1 className="font-medium text-[32px] my-[29px_20px] text-center max-w-[296px]">
                {trueQuestions.length > 0
                    ? "Замечательный результат!"
                    : "Получится в следующий раз"}
            </h1>

            <p className="text-[24px] text-center max-w-[296px]">
                Вы правильно ответили на {trueQuestions.length} вопросов.
            </p>

            <div className="w-full px-5 space-y-[11px] mt-[86px]">
                <button
                    onClick={handleRetry}
                    className="font-medium w-full py-[11px] border border-[#4c4c4c] rounded-[7px] bg-dark-2"
                >
                    Повторить
                </button>
                <button
                    onClick={handleExit}
                    className="font-medium w-full py-[11px] border border-[#62B4F3] rounded-[7px] bg-[#62B4F3]"
                >
                    Завершить
                </button>
            </div>
        </main>
    );
};

interface GameLayoutProps {
    handleExit: () => void;
    setIsGameFinished: React.Dispatch<React.SetStateAction<boolean>>;
    setTrueQuestions: React.Dispatch<React.SetStateAction<number[]>>;
    trueQuestions: number[];
    isFinished: boolean;
}

const GameLayout = ({
    isFinished,
    handleExit,
    setIsGameFinished,
    setTrueQuestions,
    trueQuestions,
}: GameLayoutProps) => {
    const [questions, setQuestions] = useState<TQuestion[]>([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState<null | TQuestion>(
        null
    );

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const audioUpdate = (audio_src: string) => {
        const audio = new Audio(audio_src);
        audio.preload = "auto";
        audioRef.current = audio;
    };

    useEffect(() => {
        http.post<RQuizzesNew>(`/api/quizzes/repeat`).then(
            ({ data: { questions } }) => {
                setQuestions(questions);
                setActiveQuestion(questions[0]);
                audioUpdate(questions[0].audio_url);
            }
        );
    }, []);

    const handleAudioPlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const handleRetry = () => {
        audioUpdate(questions[0].audio_url);
        setIsGameFinished(false);
        setTrueQuestions([]);
        setActiveQuestion(questions[0]);
        setActiveQuestionIndex(0);
    };

    if (isFinished)
        return (
            <FinishedGameLayout
                trueQuestions={trueQuestions}
                handleRetry={handleRetry}
                handleExit={handleExit}
            />
        );
    else
        return (
            <QuizLayout
                audioUpdate={audioUpdate}
                handleAudioPlay={handleAudioPlay}
                questions={questions}
                activeQuestionIndex={activeQuestionIndex}
                activeQuestion={activeQuestion}
                setActiveQuestion={setActiveQuestion}
                setActiveQuestionIndex={setActiveQuestionIndex}
                handleExit={handleExit}
                setIsGameFinished={setIsGameFinished}
                setTrueQuestions={setTrueQuestions}
            />
        );
};

const Pin = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null
    );

    const [isGameFinished, setIsGameFinished] = useState(false);

    const [trueQuestions, setTrueQuestions] = useState<number[]>([]);

    const handleExit = () => {
        setSelectedCategoryId(null);
        setIsGameFinished(false);
        setTrueQuestions([]);
    };

    if (selectedCategoryId)
        return (
            <GameLayout
                handleExit={handleExit}
                setIsGameFinished={setIsGameFinished}
                setTrueQuestions={setTrueQuestions}
                trueQuestions={trueQuestions}
                isFinished={isGameFinished}
            />
        );

    return <CategoriesLayout setSelectedCategoryId={setSelectedCategoryId} />;
};

export default Pin;
