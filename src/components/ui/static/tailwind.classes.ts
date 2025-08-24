import clsx from 'clsx';
import { tv } from "tailwind-variants";



export const spinnerClassNames =()=>  clsx(
    `h-6 w-6 mr-1 animate-spin rounded-full   border-4 border-t-transparent border-blue-500`
);

export const container=(width:string)=> clsx(
     ` max-w-[${width}] w-[97%] mx-auto `
)

export const flexCenter=clsx(` flex items-center justify-center `)

export const ClassName="text-"
export const variant='text-'

// src/components/ui/button.ts

