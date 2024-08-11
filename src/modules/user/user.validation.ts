import {string, z} from 'zod';
import { USER_ROLE } from './user.constant';

const createAdmin = z.object({
    body:z.object({
        name: string(),
        role: z.nativeEnum(USER_ROLE).default(USER_ROLE.ADMIN),
        email: string().email(),
        password: z.string(),
        address: z.string(),
        phone: z.string()
    })
})

export const UserValidations = {
    createAdmin
}