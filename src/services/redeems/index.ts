import { axiosApi, createAxiosConfig } from '../../services/axiosApi';
import { FormValues, RedeemsListResponse } from './type';

export function GetRedeems(apiKey: string) {
    const axiosConfig = createAxiosConfig(apiKey);
    return axiosApi
        .get<RedeemsListResponse>('/api/v1/redeem_pages', axiosConfig)
        .then(res => res.data);
}

export function PostRedeems(
    token: string,
    params: FormValues,
    id: string
) {
    const axiosConfig = createAxiosConfig(token);
    return axiosApi.post<any>(
        `/api/v1/redeem_pages/${id}/redeem`,
        params,
        axiosConfig
    );
}