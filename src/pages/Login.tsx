import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async(e:any)=>{

    e.preventDefault();

    const res = await fetch(
      "https://go-clean-8c5n.onrender.com/api/auth/login",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
      }
    );

    const data = await res.json();

    if(res.ok){

      // store user permanently
      localStorage.setItem("user",JSON.stringify(data.user));

      alert(`Welcome ${data.user.name}`);

      navigate("/");

    }else{

      alert(data.message);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow-xl rounded-xl w-80"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          placeholder="Email"
          className="border w-full mb-4 p-2 rounded"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full mb-4 p-2 rounded"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="bg-green-600 hover:bg-green-700 text-white w-full p-2 rounded">
          Login
        </button>

      </form>

    </div>

  );

};

export default Login;