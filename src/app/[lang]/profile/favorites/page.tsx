"use client";
import { useState } from "react";
import Image from "next/image";
import { favoriteAudiobook } from "@/utils/apiServices";
import { FavoriteAudioBookInfo } from "@/components/Profile/static/profile.type";
import Link from "next/link";
import { paths } from "@/utils/Paths";

interface Book {
  id: number;
  title: string;
  banner: string;
}

export default async function FavoritesPage () {
     const result: {data:FavoriteAudioBookInfo[]} = await favoriteAudiobook();
     let books=result.data;
  
//   const handleDelete = (id: number) => {
//     setBooks((prev) => prev.filter((book) => book.id !== id));
//   };

  return (
    <div className="min-h-screen bg-[#050f1e] px-4 py-8">
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        ❤️ My Favorite Books
      </h1>

      <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="rounded-2xl shadow-lg p-4 flex flex-col items-center transition hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(90deg, #3A2768 0%, #881D69 164.87%)",
            }}
          >
            <div className="relative w-full h-48 rounded-xl overflow-hidden">
              <Link href={`${paths.book_details(book.id)}`} >
                <Image
                    src={book.banner_path??''}
                    alt={book.name}
                    fill
                    className="object-cover"
                />
              </Link>
            </div>

            <h2 className="text-lg font-semibold text-white mt-4 text-center">
              {book.name}
            </h2>

            <button
            //   onClick={() => handleDelete(book.id)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-[4px] text-sm transition"
            >
              Delete
            </button>
          </div>
        ))}

        {books.length === 0 && (
          <p className="text-center text-white col-span-full text-lg opacity-80">
            No favorite books added yet.
          </p>
        )}
      </div>
    </div>
  );
}
