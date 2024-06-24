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
    USER: {
        LIST: '/usuarios',
        CREATE: '/usuarios/crear',
        EDIT: '/usuarios/editar/:id',
        EDIT_PARAM: (id?: number) => `/usuarios/editar/${id}`,
    },
}