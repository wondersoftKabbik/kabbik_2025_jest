export interface HomeInfo {
  name: string;
  data: [
    {
      id: number;
      name: string;
      en_name: string;
      description: string;
      author_name: string;
      premium: number;
      thumb_path: string;
      price: number;
      play_count: number;
      rating: number;
      total_played: number;
    }
  ];
}

export interface CatagorySuggestionsInfo {

    "id": number,
    "name": string,
    "thumb_path": null,
    "priority": number,
    "deleted": number,
    "created_at": Date,
    "updated_at": Date,

}

export  interface CatagorySugges {
  data:CatagorySuggestionsInfo[]
}

export interface PromoBannerInfo {

    id: number,
    image_url: string,
    title: string,
    route: string,
    created_at: Date,
    updated_at: Date,
    status: number,
    audiobook_id: string,
    package_id: null,

}

export interface TopBannerImageInfo {
    id: number,
    name: string,
    description: string,
    author_name: string,
    premium: number,
    thumb_path: string,
    price: number,
    play_count: number,
    rating: number
}

