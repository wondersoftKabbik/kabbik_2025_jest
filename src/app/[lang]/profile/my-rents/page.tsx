import Image from "next/image";
import { useState } from "react";
import { Trash2 } from "lucide-react";
// import { getPurchasedAudiobooks } from "@/utils/apiServices";
import { cookies } from "next/headers";
import { TRentAudiobook } from "@/components/Profile/static/profile.type";
import Link from "next/link";
import { paths } from "@/utils/Paths";
import { getPurchasedAudiobooks } from "@/utils/server-api";

type Book = { id: number; title: string; img: string };

export default async function MyRents() {
     const cookieStore = cookies();
  
  // Read a specific cookie
  const id = cookieStore.get('id')?.value;
  let result=await getPurchasedAudiobooks(id??0)
  console.log("MyRents",result)
  
    let books:TRentAudiobook[]=result?.data;

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#070B24] to-[#1A0F2E] text-white py-10 px-5 md:px-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          My purchased books
        </h1>

        <ul className="space-y-6">
          {books.map((book, idx:number) => (
            <li
              key={idx}
              className="flex items-center justify-between gap-4 p-2 rounded-2xl shadow-md 
                         
                         hover:shadow-[0_0_25px_rgba(136,29,105,0.4)] transition-all duration-300"
            >
              {/* Left section: SL No + Image + Name */}
              <div className="flex items-center gap-4">
                {/* SL No */}
                <span className="text-lg font-semibold text-white/80 w-6 text-right">
                  {idx + 1}.
                </span>

                {/* Book image */}
                <div className="w-14 h-20 md:w-20 md:h-28 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                 <Link href={paths.book_details(book.audiobook_id)}>
                    <Image
                        src={book.banner_path}
                        alt={book.name}
                        width={120}
                        height={180}
                        className="object-cover w-full h-full"
                    />
                 </Link>
                </div>

                {/* Title */}
                <h2 className="text-lg md:text-xl font-semibold tracking-wide">
                  {book.name}
                </h2>
              </div>

              {/* Delete button */}
              {/* <button
                // onClick={() => removeBook(book.id)}
                className="text-white/80 hover:text-red-400 transition"
                aria-label={`Delete ${book.name}`}
              >
                <Trash2 className="w-5 h-5" />
              </button> */}
            </li>
          ))}

          {books.length === 0 && (
            <p className="text-center text-white/50 mt-10">
              No Rent yet 😢
            </p>
          )}
        </ul>
      </div>
    </main>
  );
}
