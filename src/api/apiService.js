import axios from "axios";

export async function signUp (signUpObj = {}) {
    const res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_SIGNUP_ROUTE}`,
        data: signUpObj
    });

    return res.status;
};
const ip = {
          ip: "334.234.345.43.843",
          country_code: "pk",
          region_name: "pk",
          deviceDetails: "asdasdasdshdhaskhdkjashdkjshdhhdask",
          city: "city",
          Date: "123assdasdad"
        }

export async function signIn (login) {
    const {   email,password}=login
    const data = {email, password, ip }
    const res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_SIGNIN_ROUTE}`,
        data: data
    });
    
    return res;
};

export async function getInfo (signInObj = {}) {
    const res = await axios({
        method: 'get',
        url: `http://api.hostip.info`
    });

    const text = res.data

    const xml = (new window.DOMParser()).parseFromString(text, "text/xml")

    const countryName = getElementText(xml , "countryName");
    const countryCode = getElementText(xml , "countryAbbrev");
    const ip = getElementText(xml , "ip");

    return { countryName, countryCode, ip };
};

function getElementText(response, elementName) {
    return response.getElementsByTagName(elementName)[0].innerHTML;
}



