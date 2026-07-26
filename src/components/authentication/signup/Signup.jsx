import React from "react";

const Signup = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center p-4 ">
      <div  className="  ">
        <div>
          <h5 className="text-white">Create an Account</h5>
        </div>
        <form action="">
          <div>
            <label htmlFor="" className="text-white">Email</label>
            <input type="email" placeholder="email" />
          </div>
          <div>
            <label htmlFor="" className="text-white">UserName</label>
            <input type="text" placeholder="username" />
          </div>

          <div>
            <label htmlFor="" className="text-white">Contact Number</label>
            <input type="text" placeholder="contact nmber" />
          </div>

          <div>
            <label htmlFor="" className="text-white">Password</label>
            <input type="text" placeholder="password" />
          </div>
        </form>

        <div>
          <button>Signup</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
