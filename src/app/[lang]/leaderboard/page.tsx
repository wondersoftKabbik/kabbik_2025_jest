import GoldPosition from "@/svgs/GoldPosition.svg";
import SecondPosition from "@/svgs/SecondPosition.svg";
import ThirdPosition from "@/svgs/ThirdPosition.svg";
import Image from "next/image";

export default function Leaderboard() {
  const players = [
    {
      name: "মোঃ রাইহান",
      position: 2,
      hours: 245,
      books: 32,
      episodes: 45,
      color: "from-cyan-400 to-blue-600",
    },
    {
      name: "নুহাশ",
      position: 1,
      hours: 245,
      books: 32,
      episodes: 45,
      color: "from-pink-400 to-yellow-400",
      image: "/leader1.png", // replace with your image path
    },
    {
      name: "আরেফিন",
      position: 3,
      hours: 245,
      books: 32,
      episodes: 45,
      color: "from-amber-400 to-orange-500",
    },
  ];

  const users = [
{ rank: 8, name: "আকাশ", photo: "/akash.jpg", hour: 85, book: 28, level: "গোল্ড" },
{ rank: 5, name: "সাগর রহমান", photo: "/sagar.jpg", hour: 78, book: 25, level: "গোল্ড" },
{ rank: 6, name: "শরিফুল ইসলাম", photo: "/shorif.jpg", hour: 72, book: 23, level: "সিলভার" },
{ rank: 7, name: "সাকলাইন", photo: "/saklain.jpg", hour: 72, book: 23, level: "সিলভার" },
{ rank: 8, name: "আব্দুল্লাহ", photo: "/abdullah.jpg", hour: 72, book: 23, level: "ব্রোঞ্জ" },
{ rank: 9, name: "আকরাম", photo: "/akram.jpg", hour: 68, book: 23, level: "ব্রোঞ্জ" },
{ rank: 10, name: "আফতাব", photo: "/aftab.jpg", hour: 78, book: 23, level: "সিলভার" },
];

  return (
    <div>
        <div className='h-[100px] mt-[-100px] z-[2] relative bg-[#0E1D3F]'/>
        <div className='relative '>
            <div 
            className="absolute -left-0  -top-10 w-full h-full"
            style={{
                backgroundImage: "url('https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/841c74b887fcb91272e2a8c11695512fb2025197%20(1)%20(1).png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "full",
                height: "127px",
                opacity: 0.3
            }}
            />
            <h3 className='text-white mt-0 pt-8 text-clg2 font-semibold text-center'>এই মাসের শীর্ষ অডিওবুক শ্রোতারা</h3>
        </div>
        <div className="circular_gradient right-[-10%]  top-[0%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
        <div className=" flex flex-col  items-center justify-center px-4 pb-6">
            <div className="circular_gradient_bluish right-[10%]  bottom-[0%] w-[85vw] h-[25vw] absolute rounded-[50%] "></div>
            <div className="flex z-[2] relative flex-col sm:flex-row items-end justify-center gap-6 sm:gap-12">
                {players.map((p, i) => (
                <div
                    key={i}
                    className={`flex flex-col items-center text-white ${
                    p.position === 1 ? "order-2 sm:order-2 mt-[-100px] " : p.position === 2 ? "order-1 sm:order-1 mt-[100px]" : "order-3 mt-[100px] sm:order-3"
                    }`}
                >
                    {/* Podium Number */}
                    <div
                    className={`relative flex items-center justify-center   rounded-full bg-gradient-to-tr  shadow-xl`}
                    >
                    {p.position === 1 && (
                        <div className=" w-56">
                        <GoldPosition/>
                        </div>
                    )}
                    {p.position === 2 && (
                        <div className=" w-56">
                        <SecondPosition/>
                        </div>
                    )}
                    {p.position === 3 && (
                        <div className=" w-56">
                        <ThirdPosition/>
                        </div>
                    )}
                    </div>

                    {/* Name */}
                    <h2 className="mt-4 text-xl sm:text-2xl font-bold">{p.name}</h2>

                    {/* Stats Box */}
                    <div className="mt-3 btn-gradient-2 rounded-[8px] px-6 py-3 text-center text-sm sm:text-base">
                    <div className="flex justify-between gap-6">
                        <div>
                        <p className="font-medium text-pink-300">ঘন্টা</p>
                        <p>{p.hours}</p>
                        </div>
                        <div>
                        <p className="font-medium text-pink-300">বই</p>
                        <p>{p.books}</p>
                        </div>
                        <div>
                        <p className="font-medium text-pink-300">এপিসোড</p>
                        <p>{p.episodes}</p>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        <div className=" text-white z-[2] relative flex flex-col items-center py-10 px-4">
            <div className="circular_gradient left-[-10%]  top-[10%] w-[25vw] h-[25vw] absolute rounded-[50%] "></div>
            <div className="w-full max-w-5xl btn_gradient_3 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                <table className="w-full text-center border-collapse">
                    <thead className="bg-black/20 text-lg font-semibold border-b border-white/20">
                        <tr>
                            <th className="py-4">অবস্থান</th>
                            <th className="py-4 text-left pl-8">প্রোফাইল নাম</th>
                            <th className="py-4">ঘন্টা</th>
                            <th className="py-4">বই</th>
                            <th className="py-4">লেভেল</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                            key={index}
                            className="border-b border-white/10 hover:bg-white/10 transition"
                            >
                                <td className="py-3 text-pink-300 font-semibold">#{user.rank}</td>
                                <td className="py-3 flex items-center space-x-3 justify-start pl-8">
                                {/* <Image
                                src={user.photo}
                                alt={user.name}
                                width={35}
                                height={35}
                                className="rounded-full border border-white/30"
                                /> */}
                                <span className="font-medium text-white">{user.name}</span>
                                </td>
                                <td className="py-3">{user.hour}</td>
                                <td className="py-3">{user.book}</td>
                                <td className="py-3">
                                <span
                                className={`px-3 py-1 text-xs rounded-full font-semibold inline-block ${
                                user.level === "গোল্ড"
                                ? "bg-yellow-300 text-black"
                                : user.level === "সিলভার"
                                ? "bg-gray-200 text-black"
                                : "bg-orange-500 text-white"
                                }`}
                                >
                                {user.level}
                                </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}
