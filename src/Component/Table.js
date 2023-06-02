import React, { useState, useEffect,useContext } from "react";
import "../../src/assets/style/Alltransaction.css";
import { useNavigate } from "react-router-dom";

 
export const Table = (prop,deleterecord) => {

    const [filterval, setFilval] = useState("");
    const [page, setPage] = useState(1);
    const [alltransaction, setAlltransaction] = useState([]);
    const [alldata, setAlldata] = useState([]);
    
    const [sorting, setSorting] = useState({
        column: "",
        order: "",
        type: "",
    });
    
    useEffect(() => {
        console.log(prop.all,"prop.all");
        setAlldata(prop.all);
   }, [prop]);

   const navigate = useNavigate();

    function View(alltransaction) {
        navigate("/alltransaction/view", { state: alltransaction });
    }

    function edit(id) {
        navigate(`/alltransaction/addtransaction/${id}`);
    }
   
    function funpage(value) {
        setPage(value);
    }

    const pageperrecord = 3;

    const number = Math.ceil(alldata.length / pageperrecord);
    var pagearray = [];

    for (let i = 1; i <= number; i++) {
        pagearray.push(i);
    }

    useEffect(() => {
  
        const recordstart = (page - 1) * pageperrecord;
        const recordend = page * pageperrecord;

        let { column, order, type } = sorting;
       
        let  searched = [...alldata];

        if (column) {
            
            switch (type) {
                case "date":
                    switch (order) {
                        case "ASC":
                            searched = searched.sort((a, b) =>
                                new Date(a[column]).getTime() > new Date(b[column]).getTime()
                                    ? 1
                                    : -1
                            );
                          
                            break;
                        case "DESC":
                            searched = searched.sort((a, b) =>
                                new Date(a[column]).getTime() < new Date(b[column]).getTime()
                                    ? 1
                                    : -1
                            );
                         
                            break;
                        
                        default:

                    }
                    break;

                case "currency":
                    switch (order) {
                        case "ASC":
                            
                            searched = searched.sort((a, b) =>
                                +a[column] > +b[column] ? 1 : -1
                            );
                            break;
                        case "DESC":
                            searched = searched.sort((a, b) =>
                                +a[column] < +b[column] ? 1 : -1
                            );
                            break;
                        default:
                           
                    }
                    break;
                default:
                  
                    switch (order) {
                        case "ASC":
                            
                            searched = searched.sort((a, b) =>
                                a[column].toLowerCase() > b[column].toLowerCase() ? 1 : -1
                            );
                  
                            break;
                        case "DESC":
                            searched = searched.sort((a, b) =>
                                a[column].toLowerCase() < b[column].toLowerCase() ? 1 : -1
                            );
                         
                            break;
                        default:
                    
                    }
            }
        }

        setAlltransaction(searched.slice(recordstart, recordend));
    }, [sorting,page,alldata]);



    const sort = (column, type) => {
        const tempsorting = { ...sorting };

        if (column === tempsorting.column) {
            switch (tempsorting.order) {
                case "":
                    tempsorting.column = column;
                    tempsorting.order = "ASC";
                    tempsorting.type = type;
                    break;
                case "ASC":
                    tempsorting.column = column;
                    tempsorting.order = "DESC";
                    tempsorting.type = type;
                    break;
                default:
                    console.log("sanjay");
                    tempsorting.order = "";
                    tempsorting.column=column;
                    tempsorting.type = type;
            }
        } else {
     
            tempsorting.column = column;
            tempsorting.order = "ASC";
            tempsorting.type = type;
        }
        setPage(1)
        setSorting(tempsorting);
      
    };
    
    const searchVal = (e) => {

        if (e.target.value === "") {
            setPage(1);
            setAlldata(prop.all);
            
        } else {
            const searchdata = alldata.filter(
                (item) =>
                    item.transactiondate
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                    item.month.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.transactiontype
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                    item.fromaccount
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                    item.toaccount.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.amount.toString().includes(e.target.value.toString()) ||
                    item.notes.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setPage(1); 
            setAlldata(searchdata);
        }

        setFilval(e.target.value);
    };

    return (
        <>
            <div className="searchdiv">
                <input value={filterval} className="searchspan" onInput={(e) => searchVal(e)}></input>
                <span className="searchspan">Search</span>
            </div>
            
            {alltransaction.length===0? <div>
            <h1>
                No Transaction Data  
            </h1>
            </div>
            : <div className="addtransactionmaindiv">
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => sort("transactiondate", "date")}>
                                transactiondate
                            </th>
                            <th onClick={() => sort("month", "string")}>month</th>
                            <th onClick={() => sort("transactiontype", "string")}>
                                transactiontype
                            </th>
                            <th onClick={() => sort("fromaccount", "string")}>fromaccount</th>
                            <th onClick={() => sort("toaccount", "string")}>toaccount</th>
                            <th onClick={() => sort("amount", "currency")}>amount</th>
                            <th>receipt</th>
                            <th onClick={() => sort("notes", "string")}>notes</th>
                            <th>View</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alltransaction.map((alltransaction, index) => (
                            <tr key={index}>
                                <td>{alltransaction.transactiondate}</td>
                                <td>{alltransaction.month}</td>
                                <td>{alltransaction.transactiontype}</td>
                                <td>{alltransaction.fromaccount}</td>
                                <td>{alltransaction.toaccount}</td>
                                <td>
                                    {new Intl.NumberFormat("en-IN").format(alltransaction.amount)}
                                </td>
                                <td>
                                    <img src={alltransaction.receipt} />
                                </td>
                                <td>{alltransaction.notes}</td>
                                <td onClick={() => View(alltransaction)}>View </td>
                                <td onClick={() => edit(alltransaction.id)}>Edit</td>
                                <td onClick={() => prop.deleterecord(alltransaction.id)}>Delete</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="paginationdiv">
                    {pagearray.map((value, index) =>
                        page === value ? (
                            <span className="pagenumberselect" onClick={() => funpage(value)}>
                                {value}
                            </span>
                        ) : (
                            <span className="pagenumber" onClick={() => funpage(value)}>
                                {value}{" "}
                            </span>
                        )
                    )}
                </div>
            </div>}
            


        </>
    );
};


