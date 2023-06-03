import React, { useState, useEffect } from "react";
import "../../src/assets/style/Alltransaction.css";
import { Link } from "react-router-dom";
import { Table } from "./Table";
import { useNavigate } from "react-router-dom";
import { selectgroupby } from "../assets/constant/constant";
import axios from "axios";
import { Loader  } from "./Loader";


export const Alltransaction = () => {

    const [alltransaction, setAlltransaction] = useState([]);
    const [groupby, setGroupby] = useState([]);
    const [grp, setGrp] = useState(false);
    const [groupvalue, setGroupvalue] = useState("");
    const [deletedata, setDeletedata] = useState("");
    const [isloading,setIsloading] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        setIsloading(true)
        function myGreeting() {
            setIsloading(false)
            axios.request({
                method: 'get',
                url: `/alltransactiondata`,
          }).then((res)=>{
            setAlltransaction(res.data);
        })
          }
          setTimeout(myGreeting,1000);
    }, [deletedata]);

    useEffect(() => {
        if (groupvalue!=="") {
            setIsloading(true)

            function groupfunction(params) {
                setIsloading(false)
                const groupBy = (array, key) => {
                    let sanjay = array.reduce((result, currentValue) => {
                        (result[currentValue[key]] = result[currentValue[key]] || []).push(
                            currentValue
                        );
                        return result;
                    }, []);
                    return sanjay;
                };
        
                if (groupvalue === "none") {
                    setGrp(false)
                } else {
                    const personGroupedByColor = groupBy(alltransaction, groupvalue);
                    setGroupby(personGroupedByColor);
                    setGrp(true);
                }    
            }
            setTimeout(groupfunction,1000)
        }
    }, [groupvalue,alltransaction]);

    function Logout() {
        document.cookie=`Token=;max-age=`+0;
        navigate("/login");
    }

    function deleterecord(d_id) {
        axios.delete(`/deletetransactiondata?id=${d_id}`)        
         setDeletedata(d_id)
    }

    function group(event) {
        setGroupvalue(event.target.value)
   }     
    return (
        <>
        {isloading?<Loader />:
         ( <div><div className="maingroupby">
                <div className="groupby">
                    <span className="spangroupby">Group By:</span>
                    <select
                        name="toaccount"
                        defaultValue="default"
                        className="searchspan"
                        onChange={group}
                    >
                        <option value="default" disabled>
                            select......{" "}
                        </option>
                        {selectgroupby.map((key) => (
                            <option key={key.label} value={key.value}>
                                {key.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="addtransactioninall">
                    <Link className="groupby" to="addtransaction">
                        {" "}
                        Addtransaction{" "}
                    </Link>
                </div>
                <div onClick={Logout} className="addtransactioninall">
                    Logout
                </div>
            </div>
            <div className="addtransactionmaindiv">
                {grp ? (
                    <div>
                        {Object.values(groupby).map((element, index) => (
                            <div key={index}>
                                <h1>{Object.keys(groupby)[index]}</h1>
                                <Table all={element} deleterecord={deleterecord} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <Table all={alltransaction} deleterecord={deleterecord} />
                )}
            </div>
            </div>
        )}
        </>
    );
};

