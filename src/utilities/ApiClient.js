import { BACKEND_API_BASE_URL } from "../constants/apiContants";
import store from "../Store";
import { logout } from "../actions/userActions";

function logoutOnUnauthorized(response, token) {
    if (token && response.status === 401) {
        store.dispatch(logout({ redirect: true }))
    }
    return response
}

class Api{

    constructor(link, token=null){
        this.link = link;
        this.data = null
        this.token = token
    }


    async getAllData(){
        return await this.makeApiCall("GET", this.link) 
    }

    async getDataById(id){
        return await this.makeApiCall("GET", this.link + id)
    }

    async add(data){
        this.data = data
        return await this.makeApiCall("POST", this.link)
    }

    async update(id, data){
        this.data = data
        return await this.makeApiCall("PUT", this.link + id)
    }

    async delete(id){
        return await this.makeApiCall("DELETE", this.link + id)
    }


    makeApiCall(method, link){

            if (method === "POST" || method === "PUT"){

                const response = fetch(link, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.token}`
                    },
                    body: JSON.stringify(this.data)})
                    .then(response => {
                        logoutOnUnauthorized(response, this.token)
                        return response.json()
                    })
                    .then(data => {
                        return data;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });

                return response;

            }
            else if (method === "GET"){

                const response = fetch(link, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.token}`
                    },})
                    .then(response => {
                        logoutOnUnauthorized(response, this.token)
                        return response.json()
                    })
                    .then(data => {
                        return data;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });

                    return response;

            }
            else{
                    const response = fetch(link, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.token}`
                    },})
                    .then(response => {
                        logoutOnUnauthorized(response, this.token)
                        return response.json()
                    })
                    .then(data => {
                        return data;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });

                    return response;
            }
        }
}


export class CharityApi extends Api{

    constructor(){
        super(BACKEND_API_BASE_URL + 'charity/');
    }

    async getAllData(){
        return await this.makeApiCall("GET", this.link + 'getCharities') 
    }

    async getDataById(id){
        return await this.makeApiCall("GET", this.link + id)
    }

    async add(data){
        this.data = data
        return await this.makeApiCall("POST", this.link + 'addCharity/')
    }

    async update(id, data){
        this.data = data
        return await this.makeApiCall("PUT", this.link + 'updateCharity/' + id)
    }
        
}

export class ReportApi extends Api{

     constructor(token){
        super(BACKEND_API_BASE_URL + 'report/', token);
    }

     async getAllData(){
        return await this.makeApiCall("GET", this.link + 'report'); 
    }
}

export class DatabaseRefreshApi extends Api{

     constructor(token){
        super(BACKEND_API_BASE_URL + 'refresh_items/', token);
    }

    async update(data){
        this.data = data;
        return await this.makeApiCall("POST", this.link)
    }

    async deleteItems(){
        return await this.makeApiCall("GET", this.link)
    }
}
