import { TCategoryItem } from "@/components/ui/static/types";
import { Dispatch, SetStateAction } from "react";

export type TmobileNavbarProps={
    categories:TCategoryItem[] | null;
    setMobileMenu:Dispatch<SetStateAction<boolean>>;
}