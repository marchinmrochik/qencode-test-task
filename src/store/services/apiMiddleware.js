import { selectAuthToken, selectIsLoggedIn } from '../features/selectors';
import { tokenApi } from './tokenApi';

export const createApiMiddleware = (api) => (next) => async (action) => {
    if (typeof next !== 'function') {
        console.error('next is not a function');
        return;
    }

    if (!api || typeof api.getState !== 'function') {
        console.error('api.getState is not a function');
        return;
    }

    if (action?.type?.startsWith('api/') && action.endpointName !== 'accessToken' && action.endpointName !== 'refreshToken') {
        const token = selectAuthToken(api.getState());
        if (token) {
            action.headers = {
                ...action.headers,
                Authorization: `Bearer ${token}`,
            };
        }
    }

    if (
        selectIsLoggedIn(api.getState()) &&
        action?.type?.startsWith('api/') &&
        action.endpointName === 'accessToken' &&
        action.error &&
        action.error.status === 401
    ) {
        try {
            const refreshResult = await tokenApi.endpoints.refreshToken();
            action.originalArgs = [undefined, { body: { refresh_token: refreshResult.data.refresh_token } }];
            await next(action);
        } catch (error) {
            console.error('Failed to refresh token:', error);
            // Handle the error as needed
        }
    } else {
        return next(action);
    }
};
