export const checkDataEmpty = (obj: {}) => {
    const objArr = Object.entries(obj);
    for (let i = 0; i < objArr.length; i++) {
        if (objArr[i][1] === '') {
            return { isEmpty: true, field: objArr[i][0] };
        }
    }
    return { isEmpty: false, field: '' };
};

export const validateToken = async (jwt: string) => {
    try {
        const isAuth = await fetch(
            `${import.meta.env.VITE_API}/auth/checkAuth`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        if (!isAuth.ok) {
            return false;
        }

        return true;
    } catch (e) {
        if (e instanceof Error) {
            console.error(e);
        }
        return false;
    }
};
