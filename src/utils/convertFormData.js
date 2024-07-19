export const convertDataToFormdata = (dataObj)=>{
    const formdata = new FormData()
    for (const key in dataObj) {
        console.log("key", key, typeof(key));
        formdata.append(key, dataObj[key] )
    }
    return formdata
}