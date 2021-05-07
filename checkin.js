const axios = require("axios");

const SCKEY = process.env.SCKEY;
const COOKIES = process.env.COOKIES;
// const COOKIES = `_ga=GA1.2.1274713829.1614584394; koa:sess=eyJ1c2VySWQiOjcyMzIzLCJfZXhwaXJlIjoxNjQwNTA0ODQ0ODEzLCJfbWF4QWdlIjoyNTkyMDAwMDAwMH0=; koa:sess.sig=kJDQTUOnrLjDCRtt5fR9RAIoU_Q; __cfduid=d2ca31caf1a1137ee1051c1a66efd912b1620268204; _gid=GA1.2.949445040.1620355428--分隔符--_ga=GA1.2.131316036.1620356397; _gat_gtag_UA_104464600_2=1; _gid=GA1.2.711212291.1620356397; __cfduid=d7bfedc3e59a37fea9f351e4a45c09fc41620356393; koa:sess=eyJ1c2VySWQiOjcyMzIyLCJfZXhwaXJlIjoxNjQxOTk0NzgxMTkwLCJfbWF4QWdlIjoyNTkyMDAwMDAwMH0=; koa:sess.sig=kYJ8Km7vkjkkJgZlFNjk1gpXmeM`;
const cookiesList = COOKIES.split('--分隔符--')

cookiesList.forEach(v=>{
  setTimeout(()=>{
    axios.defaults.headers.common.cookie = v;
    GLaDOSCheckIn();
  }, 3000)
})

const checkIn = async () => {
    return axios({
        method: 'post',
        url: 'https://glados.rocks/api/user/checkin',
        data: {
            token: "glados_network"
        }
    })
}

const status = async () => {
    return axios({
        method: 'get',
        url: 'https://glados.rocks/api/user/status'
    })
}

const server = (checkInMessage, leftDays) => {
    return axios({
        method: 'get',
        url: `https://sc.ftqq.com/${SCKEY}.send`,
        params: {
            text: `${leftDays}天后到期，${checkInMessage}`
        }
    })
}

const GLaDOSCheckIn = async () => {
    const checkInMessage = (await checkIn())?.data?.message;
    const leftDays = parseInt((await status())?.data?.data?.leftDays);
    console.log(leftDays, checkInMessage);
    if (SCKEY) {
        server(checkInMessage, leftDays);
    }
}
