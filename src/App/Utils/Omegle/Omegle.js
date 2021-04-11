import axios from 'axios'

// this should be stored in a cookie so that omegle will remember who you are, but meh, lets do that later
let randid = Math.floor(Math.random()*16777215).toString(16); //Cookie.get('randid')


// We should note that requesting an API call from website A to website B is not allowed, CORS service in the webserver of the website B should be setted up first. To go around this, we will use a CORS proxy that will act as a middleman between us and our target CORS locked website

const cors = w => `https://thingproxy.freeboard.io/fetch/${w}`


// this one is only used at the very start of page on fetching the number of active users
const omegle_start = axios.create({
    baseURL: cors("https://front38.omegle.com")
})

const omegle = axios.create({
    baseURL: cors("https://front38.omegle.com")
})

const activities = {
    commatize : e => {
        return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    get_initial : async () => {
        // I dont know what is the use of this but it asks for a random number (and calls it nocache, maybe used to fetch newest data and not recycle previously fetched data) and our browser's randid (maybe as an identifier)
        // This will return a json reply containing the number of active users, list of available servers and other technical stuffs

        let reply = await omegle_start.get(`/status?nocache=${Math.random()}&randid=${randid}`)
        return reply
    },

    connect : async (topics=false) => {
        // This will inform the omegle server that you are connecting to them, you can pass topics in the form of ["bulacan", ...] or no

        //POST /start?caps=recaptcha2&firstevents=1&spid=&randid=MU8Y2YKT&topics=%5B%22bulacan%22%5D&lang=en
        //POST /start?caps=recaptcha2&firstevents=1&spid=&randid=MU8Y2YKT&lang=en
        
        let topics_q = topics ? `&${encodeURI(JSON.stringify(topics))}` : ""
        
        let query = `/start?caps=recaptcha2&firstevents=1&spid=&randid=${randid}${topics_q}&lang=en`

        let reply = {
            data : false
        }

        while (Object.keys(reply.data).length === 0) {

            reply = await omegle.post(query)
            console.log("retrying")

        }

        console.log(reply)
        
        return reply

    },

    getUpdate : async (id_data) => {

        // id is the session id you received when you used connect method above

        const params = new URLSearchParams();
        params.append('id', id_data);

        let reply = await omegle.post("/events", params)

        // this is your only method of knowing whats happening on the other end, you either get the following here:
        // connected (with commonLikes), typing, gotMessage , strangerDisconnected (along with servers)

        // ok,  maybe lets parse this here

        /*
        replies often come in the form below
        [
            [
                "gotMessage",
                "Hey F cool new server with a lot of girls plus we are in dire need of mods and admins plus there's loads of nudes, so join now! xrmhjva"
            ]
        ]
        */


        if (reply.data===null){
            console.log(reply)
            return {
                type: 'nullResponse',
                content: '',
            }
        }

        reply = reply.data    

        let answer = {
            type: reply[0][0],
            content: '',
        }
        
        switch (reply[0][0]){
            case 'connected':
                answer.content = reply[1][1] // common likes
                break;
            case 'gotMessage':
                answer.content = reply[0][1] // message
                break;
            default:
                break
        }

        return answer

    },

    sendTyping: async (id) => {
        
        // id is the session id you received when you used connect method above

        const params = new URLSearchParams();
        params.append('id', id);

        let reply = await omegle.post("/typing", params)

        // reply mostly 200 or 201 success signals
        return reply

    },

    sendMessage: async (id, message) => {
        
        // id is the session id you received when you used connect method above

        const params = new URLSearchParams();
        params.append('id', id);
        params.append('msg', message);

        let reply = await omegle.post("/send", params)


        // reply mostly 200 or 201 success signals
        return reply

    },

    sendDisconnect: async (id) => {
        
        // id is the session id you received when you used connect method above

        const params = new URLSearchParams();
        params.append('id', id);

        let reply = await omegle.post("/disconnect", params)

        
        
        // reply mostly 200 or 201 success signals
        return reply

    },
}


export default activities