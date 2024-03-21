/**
 * @author Louis Figes
 * Basic validations functions for user registration
 */
export const validateName = (name:any) => {

    if(validateNameLength(name) === false) {
        return false;
    }

    if(name.includes(' ')) {
        return false;
    }

    return true;
}

export const validateNameLength = (name:any) => {
    if(name.length > 20) {
        return false;
    }
    if(name.length < 3) {
        return false;
    }
    return true;
}

/**
 * https://www.rfc-editor.org/rfc/rfc2822#section-3.4.1
 * RFC 2822 specifies valid email addresses
 * @author https://regexr.com/2rhq7
 */
export const validateEmail = (email:any) => {
    var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return re.test(email);
}

export const validatePassword = (password:any) => {
    if (password.length < 7) {
        return false;
    }
    return true;
}

export const validatePasswordConfirmation = (password:any, password_confirmation:any) => {
    if(password === password_confirmation && validatePassword(password)) {
        return true;
    } else {
        return false;
    }
}
