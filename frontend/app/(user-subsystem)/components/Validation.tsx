/**
 * @author Louis Figes
 * Basic validations functions for user registration
 */
export const validateName = (name:any) => {
    if (name.length < 3) {
        return false;
    }
    return true;
}
  
export const validateEmail = (email:any) => {
    if (email.length > 4 && !email.includes('@') || !email.includes('.')) {
        return false;
    }
    return true;
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
