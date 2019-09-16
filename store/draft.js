export const state=()=>{
        return{
            createpost:{
                // 文本框的内容
                textcontent:'',
                // 右边草稿箱的内容
                draftcontent:[],
                // 用于草稿的编辑中间件
                draftcenter:{
                    cityName: "",
                    content: "",
                    time: "",
                    title: "",
                }
            }
        }
}
export const mutations={
    // 文本内容传值 
    settextcontent(state,text){
        state.createpost.textcontent=text
    },
    // 草稿箱的内容存起来
    setdraftcontent(state,draft){
        // 顶进去
        state.createpost.draftcontent.push(draft)
    },
    changedraft(state,hh){
        let hhs= hh
       hhs['newtime']= new Date()
       state.createpost.draftcenter=hhs
    },
    deleldraftcenter(state){
        state.createpost.draftcenter={
        cityName: "",
        content: "",
        time: "",
        title: "",}
    }

}