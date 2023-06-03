
import {Navigate} from 'react-router-dom';

export default function Authentication (props) {
const cmp = props.cmp;
const ispublic = props.public;
const auth = document.cookie;
console.log(ispublic,cmp,auth,"auth");
if (ispublic) {
    if (!auth) {
        return cmp
       }else{
        return <Navigate to={"/alltransaction"}/>
       }
} else {
    if (auth) {
        return cmp
       }else{
        return <Navigate to={"/login"}/>
       }
}
}
