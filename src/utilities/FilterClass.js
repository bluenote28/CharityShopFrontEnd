import { CATEGORY_OPTIONS } from "../constants/categoryFilterOptions";

export default class ListingFilter{

        constructor(data){

            this.data = data
      
        }

        filterByCharity(charityId){

            const filteredByCharity = []
            
            for (let i = 0;  i < this.data.length; i++){

                if(this.data[i].charity == charityId){
                    filteredByCharity.push(this.data[i]);
                }
            }

            this.data = filteredByCharity;
        }

        filterByCategory(category){

            const filterByCategory = [];

            for (let i = 0; i < CATEGORY_OPTIONS.length; i++){

                if (category == CATEGORY_OPTIONS[i].value){

                    category = CATEGORY_OPTIONS[i].label
                    break;

                }
            }

            for (let i = 0; i < this.data.length; i++){

                if (this.data[i].category == category){

                    filterByCategory.push(this.data[i]);

                }    
            }

            this.data = filterByCategory

        }

        filterBySearch(search){

            const filterBySearch = [];

            for (let i = 0; i < this.data.length; i++){

                if(this.data[i].name.toLowerCase().includes(search.toLowerCase())){

                    filterBySearch.push(this.data[i]);

                }
            }

            this.data = filterBySearch
        }

        getItems(){
            return this.data;
        }


}
