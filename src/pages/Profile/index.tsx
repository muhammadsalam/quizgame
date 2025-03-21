import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { useUserStore } from "../../user";

const IMAGE_PLACEHOLDER =
    "https://41ce9b94-f42e-49e9-8cd4-e3d33fdef1ff.selstorage.ru/default.webp";

const Profile = () => {
    const {
        user_photo,
        username,
        user_id,
        words_day,
        learn_words,
        subscription_end_date,
    } = useUserStore();

    const handleCopy = () => {
        if (user_id) {
            navigator.clipboard
                .writeText("" + user_id)
                .then(() => {
                    console.log("User ID copied to clipboard: ", user_id);
                })
                .catch((err) => {
                    console.error("Failed to copy: ", err);
                });
        }
    };
    const endDate = new Date(subscription_end_date);
    const startDate = new Date(Number(endDate) - 2_678_400_000);

    const totalDuration = Number(endDate) - Number(startDate); // Полный период (миллисекунды)
    const elapsed = Date.now() - Number(startDate); // Прошедшее время (миллисекунды)
    const progress = Math.min(
        100,
        Math.max(0, (elapsed / totalDuration) * 100)
    );

    const formattedDate = `${endDate.toLocaleDateString(
        "ru-RU"
    )} / ${endDate.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
    })}`;

    return (
        <main className="pt-8 flex flex-col grow">
            <div className="px-[30px] flex gap-[10px] items-center mb-3">
                <img
                    className="size-[84px] rounded-full"
                    src={user_photo ? user_photo : IMAGE_PLACEHOLDER}
                    alt=""
                />
                <div>
                    <span className="text-lg font-semibold">{username}</span>
                    <p className="text-xs flex items-center gap-[5px] mt-[10px]">
                        {user_id}
                        <svg
                            onClick={handleCopy}
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2.16675 6.00002C2.16675 3.88293 3.88299 2.16669 6.00008 2.16669H10.6753C10.9515 2.16669 11.1753 2.39054 11.1753 2.66669C11.1753 2.94283 10.9515 3.16669 10.6753 3.16669H6.00008C4.43527 3.16669 3.16675 4.43521 3.16675 6.00002V10.7379C3.16675 11.0141 2.94289 11.2379 2.66675 11.2379C2.39061 11.2379 2.16675 11.0141 2.16675 10.7379V6.00002Z"
                                fill="#73767A"
                            />
                            <path
                                d="M12.2684 4.52886C10.1078 4.28738 7.89237 4.28738 5.73173 4.52886C5.11622 4.59765 4.62159 5.08205 4.54904 5.70234C4.29279 7.89333 4.29279 10.1067 4.54904 12.2977C4.62159 12.918 5.11622 13.4024 5.73173 13.4712C7.89237 13.7127 10.1078 13.7127 12.2684 13.4712C12.884 13.4024 13.3786 12.918 13.4511 12.2977C13.7074 10.1067 13.7074 7.89333 13.4511 5.70234C13.3786 5.08205 12.884 4.59765 12.2684 4.52886Z"
                                fill="#73767A"
                            />
                        </svg>
                    </p>
                </div>
            </div>

            <div className="border-t px-[15px] mx-[18px] border-[#333] grid grid-cols-3 pt-[5px] mb-6">
                <div className="flex flex-col items-center">
                    <span className="text-lg">{words_day} слов</span>
                    <p className="text-[#898989] text-[10px]">В день</p>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-lg">{learn_words}</span>
                    <p className="text-[#898989] text-[10px]">Слов изучено</p>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-lg">1</span>
                    <p className="text-[#898989] text-[10px]">Язык</p>
                </div>
            </div>

            <div className="flex items-center gap-[10px] bg-dark-2 mx-5 border border-[#4C4C4C] rounded-[7px] p-[18px_7px_11px_16px] mb-5">
                <div className="max-w-[73px] w-full">
                    <CircularProgressbarWithChildren
                        value={progress}
                        styles={{
                            trail: {
                                stroke: "#F2F2F7",
                            },
                            path: {
                                stroke: "#69B85E",
                                strokeLinecap: "round",
                            },
                        }}
                    >
                        <span className="text-lg font-medium">
                            {Math.round(progress)}%
                        </span>
                    </CircularProgressbarWithChildren>
                </div>
                <div>
                    <span>Подписка заканчивается</span>
                    <p>{formattedDate}</p>
                </div>
            </div>

            <button
                onClick={() => alert("Подписку можно продлить в самом боте")}
                className="p-[11px] text-white bg-[#62B4F3] w-full rounded-[7px] mt-auto"
            >
                Продлить подписку
            </button>
        </main>
    );
};

export default Profile;
