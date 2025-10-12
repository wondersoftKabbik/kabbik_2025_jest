export interface UserSummaryInfo {

    total_played_audiobook: number,
    most_played_audiobook: Array<any>,
}

export interface FavoriteAudioBookInfo {

    id: number,
    name: string,
    description: string,
    author_name: string,
    contributing_artists: string,
    price: number,
    discount_price: number,
    guid: string,
    publish_year: null,
    thumb_path: string,
    banner_path: null,
    premium: number,
    approval_status: number,
    play_count: number,
    for_app: number,
    deleted: number,
    created_at: Date,
    updated_at: Date,
    category_id: null,
    channel_id: number,
    podcast: number,
    en_name: null,
    en_author_name: null,
    en_contributing_artists: null,
    is_favorite: true,

}
