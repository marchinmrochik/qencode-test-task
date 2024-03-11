export const transformErrors = (errorObject) => {

    if (typeof errorObject?.data?.detail !== "object") {
        return {
            email: errorObject?.data?.detail
        };
    }

    const errors = errorObject?.data?.detail.reduce((acc, errorItem) => {
        const {field_name, error} = errorItem;

        acc[field_name] = error;

        return acc;
    }, {});

    return errors;
};
