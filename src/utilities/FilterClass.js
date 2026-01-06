import { CATEGORY_OPTIONS } from "../constants/categoryFilterOptions";

export default class ListingFilter{

        constructor(data, charity, category, subCategory){

            this.data = data
            this.charity = charity
            this.category = this.convertCategory(category)
            this.subCategory = subCategory
      
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

        filterByAll(){
    
            const filteredItems = []

            for (let i = 0; i < this.data.length; i++){

                  let item = this.data[i];

                  if (this.charity != null && this.charity != item.charity){
                    continue
                  }
                  if (this.category != "All Categories" && this.category != item.category){
                     continue
                  }
                  if (this.subCategory != null && !this.inSubCategoryList(item.category_list)){
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

        inSubCategoryList(category_list){

            for (let i = 0; i < category_list.length; i++){

                if (this.subCategory == category_list[i].categoryName){

                    return true;
                }
            }

            return false;
        }
}
