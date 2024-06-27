export const Routes = {
    LOGIN: '/iniciar-sesion',
    HOME: '/',
    CATEGORY: {
        LIST: '/categorias',
        CREATE: '/categorias/crear',
        EDIT: '/categorias/editar/:id',
        EDIT_PARAM: (id?: number) => `/categorias/editar/${id}`,
    },
    PRODUCT: {
        LIST: '/productos',
        CREATE: '/productos/crear',
        EDIT: '/productos/editar/:id',
        EDIT_PARAM: (id?: number) => `/productos/editar/${id}`,
    },
    ADMIN: {
        LIST: '/admins',
        CREATE: '/admins/crear',
        EDIT: '/admins/editar/:id',
        EDIT_PARAM: (id?: number) => `/admins/editar/${id}`,
    },
    ORDER: {
        LIST: '/ordenes',
    }
}