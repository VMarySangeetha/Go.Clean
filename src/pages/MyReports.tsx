import { useEffect, useState } from "react";

const MyReports = () => {

  const [reports,setReports] = useState([]);
  const [coins,setCoins] = useState(0);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const rewards = [
    { id:1, name:"Tree Plantation Certificate", coins:20 },
    { id:2, name:"Clean Citizen Badge", coins:40 },
    { id:3, name:"Smart Citizen Award", coins:100 }
  ];


  useEffect(()=>{

    const fetchData = async ()=>{

      if(!user) return;

      try{

        const reportsRes = await fetch(
          `https://go-clean-8c5n.onrender.com/api/user/${user._id}/reports`
        );

        const reportsData = await reportsRes.json();

        setReports(reportsData);


        const coinsRes = await fetch(
          `https://go-clean-8c5n.onrender.com/api/user/${user._id}/coins`
        );

        const coinsData = await coinsRes.json();

        setCoins(coinsData.coins);

      }catch(error){

        console.log(error);

      }

    };

    fetchData();

  },[user]);


  /* REDEEM REWARD (Backend API) */

  const redeemReward = async (reward:any)=>{

    try{

      const res = await fetch(
        "https://go-clean-8c5n.onrender.com/api/rewards/redeem",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            userId:user._id,
            cost:reward.coins
          })
        }
      );

      const data = await res.json();

      if(res.ok){

        setCoins(data.coins);

        alert(`Reward Redeemed: ${reward.name}`);

      }else{

        alert(data.message);

      }

    }catch(error){

      console.log(error);

    }

  };


  if(!user){

    return(
      <div className="pt-24 text-center">
        Please login first
      </div>
    )

  }


  const completed = reports.filter((r:any)=>r.status === "Completed").length;


  return (

    <div className="pt-24 px-6 pb-20">

      <h1 className="text-3xl font-bold mb-6">
        My Dashboard
      </h1>


      {/* USER INFO */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-xl font-semibold mb-4">
          Welcome {user.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-sm">Coins Earned</p>
            <p className="text-2xl font-bold text-green-700">
              {coins}
            </p>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-sm">Reports Submitted</p>
            <p className="text-2xl font-bold text-blue-700">
              {reports.length}
            </p>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">
            <p className="text-sm">Reports Completed</p>
            <p className="text-2xl font-bold text-yellow-700">
              {completed}
            </p>
          </div>

        </div>

      </div>


      {/* REPORT LIST */}

      <h2 className="text-2xl font-semibold mb-4">
        My Reports
      </h2>

      <div className="space-y-4 mb-10">

        {reports.map((report:any)=>{

          return(

            <div
              key={report._id}
              className="bg-white shadow rounded-xl p-4 flex justify-between items-center"
            >

              <div>

                <p className="font-semibold">
                  {report.issueType}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>

              </div>

              <span
                className={`px-3 py-1 rounded text-white text-sm
                ${
                  report.status === "Completed"
                    ? "bg-green-600"
                    : report.status === "In Progress"
                    ? "bg-yellow-500"
                    : "bg-gray-500"
                }`}
              >
                {report.status}
              </span>

            </div>

          )

        })}

      </div>


      {/* REWARDS */}

      <h2 className="text-2xl font-semibold mb-4">
        Redeem Rewards
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {rewards.map((reward)=>{

          return(

            <div
              key={reward.id}
              className="bg-white shadow rounded-xl p-6 text-center"
            >

              <h3 className="text-lg font-semibold mb-2">
                {reward.name}
              </h3>

              <p className="text-gray-500 mb-4">
                {reward.coins} coins
              </p>

              <button
                onClick={()=>redeemReward(reward)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Redeem
              </button>

            </div>

          )

        })}

      </div>

    </div>

  );

};

export default MyReports;