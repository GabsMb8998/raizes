import { HttpClient } from "@/lib/api/httpClient";

export const doFetch = (client: HttpClient) => async <Req, Res = Req>(
    method: 'get' | 'post' | 'patch' | 'delete' | 'put',
    url: string,
    data?: Req
): Promise<Res> => {
    try {
        const response = await client.request<Req, Res>({url, method, data})
        return response.data
    } catch (error: any) {
        if (error) {
            throw new Error(error.response.data.message?? 'Unknown error')
        }
        throw new Error
    }
}