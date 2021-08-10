export namespace INFOS {

  export interface Format {
    protocol: string;
    mime_type: string;
  }

  export interface Transcoding {
    url: string;
    preset: string;
    duration: number;
    snipped: boolean;
    format: Format;
    quality: string;
  }

  export interface Media {
    transcodings: Transcoding[];
  }

  export interface Product {
    id: string;
  }

  export interface CreatorSubscription {
    product: Product;
  }

  export interface Product2 {
    id: string;
  }

  export interface CreatorSubscription2 {
    product: Product2;
  }

  export interface Visual {
    urn: string;
    entry_time: number;
    visual_url: string;
  }

  export interface Visuals {
    urn: string;
    enabled: boolean;
    visuals: Visual[];
    tracking?: any;
  }

  export interface Badges {
    pro: boolean;
    pro_unlimited: boolean;
    verified: boolean;
  }

  export interface User {
    avatar_url: string;
    city?: any;
    comments_count: number;
    country_code?: any;
    created_at: Date;
    creator_subscriptions: CreatorSubscription[];
    creator_subscription: CreatorSubscription2;
    description: string;
    followers_count: number;
    followings_count: number;
    first_name: string;
    full_name: string;
    groups_count: number;
    id: number;
    kind: string;
    last_modified: Date;
    last_name: string;
    likes_count: number;
    playlist_likes_count: number;
    permalink: string;
    permalink_url: string;
    playlist_count: number;
    reposts_count?: any;
    track_count: number;
    uri: string;
    urn: string;
    username: string;
    verified: boolean;
    visuals: Visuals;
    badges: Badges;
    station_urn: string;
    station_permalink: string;
  }

  export interface RootObject {
    artwork_url: string;
    caption?: any;
    commentable: boolean;
    comment_count: number;
    created_at: Date;
    description?: any;
    downloadable: boolean;
    download_count: number;
    duration: number;
    full_duration: number;
    embeddable_by: string;
    genre?: any;
    has_downloads_left: boolean;
    id: number;
    kind: string;
    label_name?: any;
    last_modified: Date;
    license: string;
    likes_count: number;
    permalink: string;
    permalink_url: string;
    playback_count: number;
    public: boolean;
    publisher_metadata?: any;
    purchase_title?: any;
    purchase_url?: any;
    release_date?: any;
    reposts_count: number;
    secret_token?: any;
    sharing: string;
    state: string;
    streamable: boolean;
    tag_list: string;
    title: string;
    track_format: string;
    uri: string;
    urn: string;
    user_id: number;
    visuals?: any;
    waveform_url: string;
    display_date: Date;
    media: Media;
    station_urn: string;
    station_permalink: string;
    track_authorization: string;
    monetization_model: string;
    policy: string;
    user: User;
  }

}
