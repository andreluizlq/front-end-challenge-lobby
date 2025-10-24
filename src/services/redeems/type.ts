export interface RedeemsListResponse {
    page_info: PageInfo;
    redeem_pages: RedeemPage[];
}

export interface PageInfo {
    current_page: number;
    next_page: number | null;
    prev_page: number | null;
    total_pages: number;
    total_count: number;
}

export interface RedeemPage {
    id: string;
    status: "ACTIVE" | "INACTIVE";
    title: string;
    welcome_title: string;
    welcome_phrase: string;
    logo_url: string;
    background_color: string;
    button_color: string;
    items: RedeemItem[];
    extra_questions: ExtraQuestion[];
}

export interface RedeemItem {
    customer_product_id: string;
    name: string;
    quantity: number;
    optional: boolean;
    image_url: string;
    sizes_grid: SizeGrid | null;
    sizes: RedeemSize[];
}

export interface SizeGrid {
    name: string;
}

export interface RedeemSize {
    id: string;
    name: string;
}

export interface ExtraQuestion {
    id: number;
    answer_type: "text" | "text_area" | "select_one" | "date";
    question: string;
    position: number;
    options: string[];
}

export type ExtraQuestionResponse = {
    extra_question_id: number;
    answer?: string | Date;
};

export type FormValues = {
    redeemer_name: string;
    redeemer_document_number: string;
    redeemer_email: string;
    redeemer_zipcode: string;
    redeemer_street: string;
    redeemer_number: string;
    redeemer_complement: string;
    redeemer_neighborhood: string;
    redeemer_city: string;
    redeemer_state: string;
    redeemer_country: string;
    items: { customer_product_id: string; size_name: string }[];
    extra_question_responses: ExtraQuestionResponse[];
};