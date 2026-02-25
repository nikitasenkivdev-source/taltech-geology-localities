import type { LocalitiesResponse } from '~/types/locality'

export const useLocalities = () => {
    const fetchLocalities = async (
        search?: string,
        limit?: number,
        offset?: number
    ) => {
        const baseUrl = 'https://rwapi.geoloogia.info/api/v1/public/localities/'

        const params = new URLSearchParams({
            expand: 'country'
        })

        if (limit !== undefined) {
            params.append('limit', limit.toString())
        }

        if (offset !== undefined) {
            params.append('offset', offset.toString())
        }

        if (search) {
            params.append('name__icontains', search)
        }

        const url = `${baseUrl}?${params.toString()}`

        return await $fetch<LocalitiesResponse>(url)
    }

    return { fetchLocalities }
}