import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createAccount, loginUser } from "../../api/AuthenticationApi";
import Loader from "../utils/Loader";
import { loginUser as loginUserAction } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { PiStudentFill } from "react-icons/pi";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState(null);
  const [isError, setIsError] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstNameLength = firstName.length;
    const lastNameLength = lastName.length;

    if (firstNameLength < 3) {
      setIsError(false);
      toast.error("First name should contain at-least 3 characters", {
        duration: 4000,
        position: "top-center",
      });
    }
    if (lastNameLength < 3) {
      setIsError(false);
      toast.error("Last name should contain at-least 3 characters", {
        duration: 4000,
        position: "top-center",
      });
    }
    if (password !== confirmPassword) {
      setIsError(false);
      toast.error("Password and confirm password should match", {
        duration: 4000,
        position: "top-center",
      });
    }
    if (password === confirmPassword && password.length >= 8) {
      setIsError(true);
      // toast.success("Congratulations!", {
      //   duration: 1500,
      //   position: "top-center",
      // });
    }
    if (password.length < 8) {
      setIsError(false);
      toast.error("Password should contain atleast 8 characters", {
        duration: 4000,
        position: "top-center",
      });
    }

    const data = {
      first_name: firstName,
      last_name: lastName,
      password: password,
      email: email,
    };
    try {
      setIsLoading(true);
      const response = await createAccount(data);
      if (response.ok) {
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
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="px-4 lg:px-0 grid grid-cols-1 md:grid-cols-2 overflow-hidden h-screen m bg-main bg-[url('https://images.pexels.com/photos/4502111/pexels-photo-4502111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] lg:bg-none">
      <div className="hidden md:block">
        <img
          src="/pic-1.jpg"
          className="object-cover w-full h-full"
          alt="quiz-mine"
        />
      </div>

      <div className="flex justify-center max-h-screen">
        <form
          className="border-primary border-solid border-2 w-full lg:w-2/3 rounded-lg h-fit my-auto px-4 lg:px-10 py-5"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-center">
            <PiStudentFill className="text-2xl text-primary mr-2" />
            <span className="text-primary text-2xl text-center font-bold mb-0.5">
              Parvaz
            </span>
          </div>
          <h2 className="text-xl italic font-bold text-center mb-0.5">
            Free Education for All
          </h2>
          <div className="max-w-fit flex space-x-2">
            <div className="w-1/2 mb-1 flex flex-col">
              <label htmlFor="first-name" className="font-bold text-lg">
                First Name :
              </label>
              <input
                type="text"
                placeholder="First Name"
                id="first-name"
                className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
                name="first-name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="w-1/2 mb-1 flex flex-col">
              <label htmlFor="last-name" className="font-bold text-lg">
                Last Name :
              </label>
              <input
                className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
                type="text"
                placeholder="Last Name"
                id="last-name"
                name="last-name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-1 flex flex-col">
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
          <div className="mb-1 flex flex-col">
            <label htmlFor="password" className="font-bold text-lg">
              Password :
            </label>
            <input
              className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-1 flex flex-col">
            <label htmlFor="confirm-password" className="font-bold text-lg">
              Confirm Password :
            </label>
            <input
              className="border-ternary_light border-solid border-2 rounded-full px-4 py-1 focus:border-primary focus:outline-none"
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div>
            <div className="bg-primary my-2 border-2 border-solid rounded-full px-4 py-1 text-main text-xl w-full">
              <button
                className="text-main text-lg w-full"
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Sign Up"}
              </button>
            </div>
            <h3 className="text-lg text-center">
              Already have an account, go to <br className="block md:hidden" />
              <NavLink to="/login" className=" font-bold underline italic">
                Login Page
              </NavLink>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
