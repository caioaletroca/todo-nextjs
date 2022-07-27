import type { NextApiRequest, NextApiResponse } from 'next'

export type ApiHandlerMethod = (req: NextApiRequest, res: NextApiResponse) => void;

export interface ApiHandlerParams {
    get?: ApiHandlerMethod;
    post?: ApiHandlerMethod;
    put?: ApiHandlerMethod;
    patch?: ApiHandlerMethod;
    delete?: ApiHandlerMethod;
}

export default function apiHandler({
    get,
    post,
    put,
    patch,
    delete: deleteAction
}: ApiHandlerParams) : ApiHandlerMethod {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        switch (req.method) {
            case 'GET':
                await get?.(req, res);
                break;
            case 'POST':
                await post?.(req, res);
                break;
            case 'PUT':
                await put?.(req, res);
                break;
            case 'PATCH':
                await patch?.(req, res);
                break;
            case 'DELETE':
                await deleteAction?.(req, res);
                break;
        }
    }
}