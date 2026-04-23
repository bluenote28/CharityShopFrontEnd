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

async function apiPost(url, body){
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    const response = await fetch(url, config)
    const data = await response.json()

    if (response.status !== 200 && response.status !== 201){
        throw new Error(data.detail || data.message || 'API call failed')
    }

    return data
}

export function getItems(item_id=null, search_text=null, category_id=null, filter=null, page=1){

        var data = [];
        var url = ""

        console.log("Fetching items with params:", {item_id, search_text, category_id, filter, page})

        if (item_id){
            url = BACKEND_API_BASE_URL + 'items/ebaycharityitems/' + item_id
            data = apiCall(url)
        }
        else if (search_text){
          url = BACKEND_API_BASE_URL + 'items/ebaycharityitems/search/' + search_text + "?page=" + page
          data = apiCall(url)
        }
        else if (category_id && filter){
            url = BACKEND_API_BASE_URL + 'items/ebaycharityitems/category/' + encodeURIComponent(category_id) + `/${filter}` + "?page=" + page
            data = apiCall(url)
        }
        else if (category_id){
            url = BACKEND_API_BASE_URL + 'items/ebaycharityitems/category/' + encodeURIComponent(category_id) + "?page=" + page
            data = apiCall(url)
        }

        return data;
}

export function getSingleItem(item_id){
   const response = apiCall(BACKEND_API_BASE_URL + 'items/ebaycharityitems/' + item_id)
   return response;
}

export function initiateCheckout(payload){
    return apiPost(BACKEND_API_BASE_URL + 'checkout/initiate/', payload)
}

export function getCheckoutSession(session_id){
    return apiCall(BACKEND_API_BASE_URL + 'checkout/' + session_id + '/')
}

export function updateShippingOption(session_id, line_item_id, shipping_option_id){
    return apiPost(BACKEND_API_BASE_URL + 'checkout/' + session_id + '/update_shipping/', { line_item_id, shipping_option_id })
}

export function applyCoupon(session_id, redemption_code){
    return apiPost(BACKEND_API_BASE_URL + 'checkout/' + session_id + '/apply_coupon/', { redemption_code })
}

export function placeOrder(session_id){
    return apiPost(BACKEND_API_BASE_URL + 'orders/place/' + session_id + '/', {})
}

export function getOrder(order_id){
    return apiCall(BACKEND_API_BASE_URL + 'orders/' + order_id + '/')
}