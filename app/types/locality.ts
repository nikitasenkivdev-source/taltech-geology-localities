export interface Country {
    id: number
    name_en?: string
    name?: string
}

export interface Locality {
    id: number
    name?: string
    name_en?: string
    country?: Country
}

export interface LocalitiesResponse {
    count: number
    next: string | null
    previous: string | null
    results: Locality[]
}