let rootUrl = "http://localhost:7777";

const checkIpOrDomain = () => {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        return;
    }
    if (window.location.hostname.startsWith('192.168')) {
        rootUrl = "http://192.168.1.100:7777";
        return;
    }
    rootUrl = "http://123.24.205.87:7777"
}

checkIpOrDomain();

export default rootUrl;