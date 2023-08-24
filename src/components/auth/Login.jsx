import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../../api/AuthenticationApi";
import Loader from "../utils/Loader";
import { useDispatch } from "react-redux";
import { loginUser as loginUserAction } from "../../store/userSlice";
import { PiStudentFill } from "react-icons/pi";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    try {
      setIsLoading(true); // Start loading
      const response = await loginUser(data);
      if (response.ok) {
        const { message, data } = await response.json();
        window.localStorage.setItem("token", data.token);
        setUserId(data.user_id);
        toast.success(message);
        dispatch(
          loginUserAction({
            email: data.email,
            password: data.password,
            userId: data.user_id,
          })
        );
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false); // End loading
    }
  };
  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 overflow-hidden h-screen bg-[url('https://images.pexels.com/photos/4502111/pexels-photo-4502111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] lg:bg-none bg-main">
      <div className="hidden md:block">
        <img
          src="/pic-1.jpg"
          className="object-cover w-full h-full"
          alt="quiz-mine"
        />
      </div>

      <div className="flex justify-center max-h-screen ">
        <form
          className="border-primary border-solid border-2 rounded-lg h-fit my-auto p-5 w-full lg:w-2/3"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-center">
            <PiStudentFill className="text-3xl text-primary mr-2" />
            <span className="text-primary text-3xl text-center font-bold mb-0.5">
              Parvaz
            </span>
          </div>
          <h2 className="text-xl italic font-bold text-center mb-0.5">
            Free Education for All
          </h2>
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="font-bold text-lg">
              Email :
            </label>
            <input
              className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter Your E-mail"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="password" className="font-bold text-lg">
              Password :
            </label>
            <input
              className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter Your Password"
            />
          </div>

          <div className="mb-1">
            <div className="bg-primary border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-full">
              <button
                className="text-main text-xl w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Log In"}
              </button>
            </div>
          </div>
          <h1 className="italic">Don't have an account yet, then :-</h1>
          <div className="bg-primary border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-full">
            <button className="text-main text-xl w-full" onClick={handleSignUp}>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
