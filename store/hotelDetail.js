
export const state = () => {
    return {
        // 酒店数据
        hotelData: [{
            
        }],

        // 风景数据
        sceneryList:[{}],

        // 当前坐标
        currentCenter:""
    }
}

export const mutations = {
    // 修改酒店信息
    setHotelData(state, data){
        state.hotelData = data;
    },

    // 修改风景数据
    setSceneryList(state,sceneryList){
        state.sceneryList = sceneryList
    },

    // 修改当前坐标点
    setCurrentCenter(state,currentCenter){
        state.currentCenter = currentCenter
    }
}