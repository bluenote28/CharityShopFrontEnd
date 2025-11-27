import { CATEGORY_OPTIONS } from "../constants/categoryFilterOptions";

export default class ListingFilter{

        constructor(data, charity, category, search){

            this.data = data
            this.charity = charity
            this.category = this.convertCategory(category)
            this.search = search
      
        }

        filterByCharity(){

            const filteredByCharity = []
            
            for (let i = 0;  i < this.data.length; i++){

                if(this.data[i].charity == this.charity){
                    filteredByCharity.push(this.data[i]);
                }
            }

            this.data = filteredByCharity;
        }

        filterByCategory(){

            const filterByCategory = [];

            for (let i = 0; i < this.data.length; i++){

                if (this.data[i].category == this.category){
                    filterByCategory.push(this.data[i]);
                }    
            }

            this.data = filterByCategory
        }

        filterBySearch(){

            const filterBySearch = [];

            for (let i = 0; i < this.data.length; i++){

                if(this.data[i].name.toLowerCase().includes(this.search.toLowerCase())){

                    filterBySearch.push(this.data[i]);

                }
            }

            this.data = filterBySearch
        }

        filterByAll(){

            console.log(this.charity, this.category, this.search)

            if (this.search == null && this.category == "All Categories" && this.charity == null){
                return
            }
    
            const filteredItems = []

            for (let i = 0; i < this.data.length; i++){

                  let item = this.data[i];

                  if (this.charity != null && this.charity != item.charity){
                    continue
                  }
                  if (this.category != "All Categories" && this.category != item.category){
                     continue
                  }
                  if(this.search != null && !this.data[i].name.toLowerCase().includes(this.search.toLowerCase())){
                    continue
                 }

                 filteredItems.push(item)
            }

            this.data = filteredItems
        }

        getItems(){
            return this.data;
        }

        convertCategory(category){

            for (let i = 0; i < CATEGORY_OPTIONS.length; i++){

                if (category == CATEGORY_OPTIONS[i].value){

                    category = CATEGORY_OPTIONS[i].label
                    break;

                }
            }

            return category
        }


}
