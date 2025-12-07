const VALID_CHARITY_ID_SIZE = 9;
const MAX_CHARITY_DESCRIPTION_LENGTH = 500;
const MAX_CHARITY_NAME_LENGTH = 50;
const CHARITY_NAME_REGEX = /[^\w\s']/g;
const DESCRIPTION_REGEX =  /^[A-Za-z\s.':,\-]+$/
const MIN_PASSWORD_LENGTH = 8
const REGEX_TYPES = Object.freeze({ 
    DESCRIPTION: "description",
    NAME: "name"
})

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

        if (description.length > MAX_CHARITY_DESCRIPTION_LENGTH || description.length == 0){
            return false;
        }
        else if(hasInvalidCharacters(description, REGEX_TYPES.DESCRIPTION)){
            return false;
        }
        else{
            return true;
        }
}

export function isValidCharityName(name){

        if (name.length > MAX_CHARITY_NAME_LENGTH || name.length == 0){
            return false;
        }
        else if(hasInvalidCharacters(name, REGEX_TYPES.NAME)){
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

function hasInvalidCharacters(inputString, type) {
    
    switch(type){
        case REGEX_TYPES.NAME:
            var REGEX = CHARITY_NAME_REGEX;
            break;
        case REGEX_TYPES.DESCRIPTION:
            var REGEX = DESCRIPTION_REGEX;
            break;
        default:
            return false;
    }
    
    if (inputString.search(REGEX) != -1){
        return true
    }
    else{
        return false;
    }

  }

