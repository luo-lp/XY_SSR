
export const state = () => {
    return {
        infoCities: {
            seat_infos: ''
        },
    }
  }

  export const mutations = {
    setInfoCities(state, data){
    
        state.infoCities = data;
    },
}