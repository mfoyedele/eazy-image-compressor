import expressJwt from 'express-jwt';
import { promisify } from 'util';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

function jwtMiddleware(req, res) {
    const middleware = expressJwt({
        secret: serverRuntimeConfig.secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/register',
            '/api/users/authenticate'
        ]
    });

    return promisify(middleware)(req, res);
}

export { jwtMiddleware };
