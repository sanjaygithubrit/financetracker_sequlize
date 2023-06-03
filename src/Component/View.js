import React from "react";
import "../../src/assets/style/Alltransaction.css";
import { useLocation } from "react-router-dom";

export const View = () => {

    const location = useLocation();

    return (
        <>
  <div className="addtransactionmaindiv">
        <table>
            <tr>
                <td>Transaction Date:</td>
                <td>{location.state.transactiondate}</td>
            </tr>
            <tr>
                <td>Month Year :</td>
                <td>{location.state.month}</td>
            </tr>
            <tr>
                <td>Transaction type:</td>
                <td>{location.state.transactiontype}</td>
            </tr>
            <tr>
                <td>From Account:</td>
                <td>{location.state.fromaccount}</td>
            </tr>
            <tr>
                <td>toaccount:</td>
                <td>{location.state.toaccount}</td>
            </tr>
            <tr>
                <td>Receipt:</td>
                <td><img src={location.state.receipt} alt="img"/></td>
            </tr>
            <tr>
                <td>Amount:</td>
                <td> {new Intl.NumberFormat("en-IN").format(location.state.amount)}</td>
            </tr>
            <tr>
                <td>Notes:</td>
                <td>{location.state.notes}</td>
            </tr>
        </table>
          
</div>
        </>

    )


}




