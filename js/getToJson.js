/**
 * get请求的格式，转Json a=1&b=2 ---> "a":"1","b":"2"
 * Created by orange on 2017/2/2 0002.
 */
function getToJsonString(data) {
    decodeURIComponent(data);//防止中文乱码
    data = data.replace(/&/g, "\",\"");
    data = data.replace(/=/g, "\":\"");
    data = "{\"" + data + "\"}";
    return data;
}