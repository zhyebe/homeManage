/**
 * Created by zhangyong on 2016/10/11.
 */
function Encrypt(word){
    var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12abcdefgabcdefg12");

    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}
function Decrypt(word){
    var key = CryptoJS.enc.Utf8.parse("abcdefgabcdefg12abcdefgabcdefg12");

    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}