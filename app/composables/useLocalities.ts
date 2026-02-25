import type { LocalitiesResponse } from '~/types/locality'

export const useLocalities = () => {
    const fetchLocalities = async (search?: string) => {
        const baseUrl = 'https://rwapi.geoloogia.info/api/v1/public/localities/'

        const url = search
            ? `${baseUrl}?name__icontains=${search}&expand=country`
            : `${baseUrl}?expand=country`

        const { data, error } = await useFetch<LocalitiesResponse>(url)

        return {
            data,
            error
        }
    }

    return {
        fetchLocalities
    }
}