import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSignup = async(e:any) => {

    e.preventDefault();

    const res = await fetch("https://go-clean-8c5n.onrender.com/api/auth/register",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name,email,password})
    });

    const data = await res.json();

    if(res.ok){
      alert("Signup successful");
      navigate("/login");
    }else{
      alert(data.message);
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSignup}
        className="bg-white p-8 shadow-xl rounded-xl w-80"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Signup
        </h2>

        <input
          placeholder="Name"
          className="border w-full mb-4 p-2"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="border w-full mb-4 p-2"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full mb-4 p-2"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white w-full p-2 rounded">
          Signup
        </button>

      </form>

    </div>
  );

};

export default Signup;