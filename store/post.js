
export const state = () => {
    return {
        // 机票的信息的对象
        infoData: {
            seat_infos: {}
        },
        nameData: {
            seat_infos: {}
        },
    }
}

export const mutations = {
    // 修改机票信息
    setInfoData(state, data){
        // 
        state.infoData = data;
    },
    // 修改机票信息
    setnameData(state, data){
        // 
        state.nameData = data;
    },
}