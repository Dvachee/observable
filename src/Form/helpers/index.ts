import {FormErrors} from '../typings';

function getDeepValue<Value>(state: any, path: string): Value {
    const arr = path.split('.');
    const last = arr[arr.length - 1];

    let current = state;

    for (const key of arr.slice(0, -1)) {
        if (!current[key]) {
            current[key] = {};
        }

        if (typeof current[key] === 'object') {
            current = current[key];
        } else {
            current[key] = {};
            current = current[key];
        }
    }

    if (!current[last]) {
        current[last] = '';
    }

    return current[last];
}

function setDeepValue(state: any, path: string, value: any) {
    const arr = path.split('.');
    const last = arr[arr.length - 1];

    let current = state;

    for (const key of arr.slice(0, -1)) {
        if (!current[key]) {
            current[key] = {};
        }

        if (typeof current[key] === 'object') {
            current = current[key];
        } else {
            current[key] = {};
            current = current[key];
        }
    }

    current[last] = value;

    return state;
}

function checkExistsError(errors: FormErrors<any>): boolean {
    for (const key in errors) {
        if (typeof errors[key] === 'object') {
            // @ts-ignore
            if (checkExistsError(errors[key])) {
                return true;
            }
        } else {
            if (errors[key]) {
                return true;
            }
        }
    }

    return false;
}

export {
    getDeepValue,
    setDeepValue,
    checkExistsError,
};
