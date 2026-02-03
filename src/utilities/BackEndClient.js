import { BACKEND_API_BASE_URL } from "../constants/apiContants";

async function apiCall(url){

    const config = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
    }

    const response = await fetch(url, config)
    const data = await response.json()

    if (response.status !== 200){
        throw new Error(data.message || 'API call failed')
    }

    return data
}

export function getItems(item_id=null, search_text=null, category_id=null, filter=null, page=1){

        var data = [];
        var url = ""

        if (item_id){
            url = BACKEND_API_BASE_URL + 'items/ebaycharityitems/' + item_id
            data = apiCall(url)
        }
        else if (search_text){
          url = BACKEND_API_BASE_URL + 'items/ebaycharityitems/search/' + search_text + "?page=" + page
          data = apiCall(url)
        }
        else if (category_id && filter){
            url = BACKEND_API_BASE_URL + 'items/ebaycharityitems/category/' + category_id + `/${filter}` + "?page=" + page
            data = apiCall(url)
        }
        else if (category_id){
            url = BACKEND_API_BASE_URL + 'items/ebaycharityitems/category/' + category_id + "?page=" + page
            data = apiCall(url)
        }

        return data;
}

export function getSingleItem(item_id){
   const response = apiCall(BACKEND_API_BASE_URL + 'items/ebaycharityitems/' + item_id)
   return response;
}