import { createStore } from "vuex";
const store = createStore({
    state(){
        return{
            resData: [],
            dataById: [],
            genres:[],
            resDataTVShows:[],
            obj:{},
            savedData:[]

        }
    }
})

export default store