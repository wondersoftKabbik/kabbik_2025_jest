import { TBooks } from "@/pageTypes/home.types";

export type TCategoryComponent={
    category: string; // encoded string like "%E0%A6%95..."
    categoryData: {
    data: {
        name: string;
        data: TBooks[]; // 140 items in example, type unknown
    }[];
    };
}

export type TCategoryWiseTopBooksSection={
    category:string;
    data:TBooks[]|null;
}


export interface TAudiobookCardProps {
  audiobook: TBooks;
  className?: string;
  category:string;
}
