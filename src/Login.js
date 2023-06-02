import "./Register.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector} from "react-redux"

export default function Login() {


    const registeralldata = useSelector((state)=> state.users)
   let userSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("This is not a valid email")
      .test("emailwrong", "Email Wrong", function (value) {
        var registerdata = registeralldata;

        function already(rdata) {
          console.log(rdata);
          return rdata.email === value;
        }
        const compare = registerdata.find(already);
        if (compare === undefined) {
          return false;
        } else {
          return true;
        }
      }),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters.")
      .max(25, "Password must be a maximum limit of 25 characters.")
      .test("password", "Password Wrong", function (value) {
        var registerdata = registeralldata;

        function already(rdata) {
          return rdata.password === value;
        }
        const compare = registerdata.find(already);

        if (compare === undefined) {
          return false;
        } else {
          return true;
        }
      }),
  });
  
  const navigate = useNavigate();
 
  function redirectregister() {
    navigate("/register");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const handlelogin = (data) => {
  
    function stringGen(len) {
      var text = "";

      var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length));
      return text;
    }
    const Token = stringGen(16);
    document.cookie=`Token= ${Token};max-age=`+60*60;
    navigate("/alltransaction");
  };
  return (
    <div className="App">
      <div className="form">
        <div>
          <h1>User Login</h1>
        </div>

        <form onSubmit={handleSubmit(handlelogin)}>
          <div className="divname">
            <label className="lablestyle">Email</label>
            <input
              className="input"
              name="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter Email"
            />
          </div>
          {errors.email && (
            <p className="errorp" style={{ color: "red" }}>
              {errors.email.message}
            </p>
          )}
          <div className="divname">
            <label className="lablestyle">Password</label>
            <input
              className="input"
              name="password"
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter Password"
            />
          </div>
          {errors.password && (
            <p className="errorp" style={{ color: "red" }}>
              {errors.password.message}
            </p>
          )}
          <button className="btn" type="submit">
            Login
          </button>
          <span>
            Don't have an account:
            <span className="loginhere" onClick={redirectregister}>
              Registerhere
            </span>
          </span>
        </form>
      </div>
    </div>
  );
}
