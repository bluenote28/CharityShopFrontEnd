const VALID_CHARITY_ID_SIZE = 9;
const MAX_CHARITY_DESCRIPTION_LENGTH = 50;
const MAX_CHARITY_NAME_LENGTH = 50;
const REGEX = /[^\w\s']/g;
const MIN_PASSWORD_LENGTH = 8

export function isValidCharityId(id){

    if (id.length < VALID_CHARITY_ID_SIZE || id.length > VALID_CHARITY_ID_SIZE){
        return false;
    }
    else if(isNaN(id)){
        return false;
    }
    else{
        return true;
    }
}

export function isValidCharityDescription(description){

        if (description.length > MAX_CHARITY_DESCRIPTION_LENGTH){
            return false;
        }
        else if(hasInvalidCharacters(description)){
            return false;
        }
        else{
            return true;
        }
}

export function isValidCharityName(name){

        if (name.length > MAX_CHARITY_NAME_LENGTH){
            return false;
        }
        else if(hasInvalidCharacters(name)){
            return false;
        }
        else{
            return true;
        }
}

export function isValidPassword(password){

    if (password.length < MIN_PASSWORD_LENGTH){
        return false
    }
    else if (!isNaN(password)){
        return false
    }
    else{
        return true
    }

}

function hasInvalidCharacters(inputString) {
   
    if (inputString.search(REGEX) != -1){
        return true
    }
    else{
        return false;
    }

  }

