import {useEffect, useRef, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { Api } from "../api/axios"
import Header from "../Layout/Header"
import Google from "./Google"
import Facebook from "./Facebook"
import Apple from "./Apple"
import Profile from "./Profile"

const RegisterPage = () =>{
    const userRef = useRef()
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone:'',
        profile_image:null
      });
      const [message, setMessage] = useState("");
      const [errors, setErrors] = useState({
                                            server: "",
                                            password: ""
                                        });
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [image, setImage] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        userRef.current.focus()

    }, [])



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleImageChange = (e) => {
        setImageFile(e.target.files[0])
        setImage(e.target.files[0])
      };
       
    

    
    
   const handleSubmit = async (e) =>{

    console.log(formData.email, formData.password, formData.firstname, formData.lastname, formData.phone)
    setLoading(true)
        
        const formDataToSend = new FormData();
        formDataToSend.append("firstname", formData.firstname);
        formDataToSend.append("lastname", formData.lastname);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("phone", formData.phone);
        if (image) {
          formDataToSend.append("profile_image", image);
        }
    
        try {
          const response = await Api.post("/register.php", formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        
          setMessage(response.data.message);
        console.log(JSON.stringify(response?.data))
        setFormData({
        email:'',
        firstname:'',
        lastname:'',
        password:'',
        phone:'',
        profile_image:null
    })
    navigate('/login')
    setErrors({})
    }
    catch (err) {
        console.error("Error Response:", err.response);
    
        if (!err?.response) {
            setErrors(prev => ({...prev, server: 'No server Response'}));
        } else if (err.response?.status === 409) {
            setErrors(prev => ({ ...prev, server: 'Email already registered. Please use another email.' }));
        } else if(err.response?.status === 400){
            setErrors(prev =>({...prev, server:'Missing Username or Password'}))
        }
        else {
            setErrors(prev => ({...prev, server: 'Registration failed. Please try again.'}));
        }
    }   
        
    finally{
    setLoading(false)
    }
   }

    const content = (
        <>
        {
              
            <div className='flex flex-column justify-center mx-auto lg:my-8 my-3 rounded-2xl border border-green-500 items-center bg-white sm:w-96  md:my-16 items-center p-10 w-72'>
            <div className="">
            
            <form onSubmit={handleSubmit} >
                <div className="sm:mb-5 ">
                    <h1 className="sm:text-3xl text-xl text-center text-green-400 font-serif"><span className="sm:text-2xl text-xl text-black mt-5 text-center font-bold font-roboto">Create Account</span></h1>
                    <p className="text-sm text-black my-3  text-center font-roboto"> 
                    Enter your order number and email address below to view your rental details. </p>
                    {/* <Google  />
                    <Facebook /> */}
                     {/* <Apple /> */}
                    <div className="sm:inline-flex sm:flex-nowrap flex-wrap gap-1">
                    <div>
                    <p className="text-sm -mb-5 font-bold font-roboto text-black font-Cambria">
                       Firstname:
                    </p>
                    <br />
                    <input 
                    className="border-2 border-green-200 px-2 w-64 sm:w-40 p-1 rounded-lg text-black outline-none"
                    type="text"
                    required
                    name="firstname"
                    id="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    ref={userRef}
                    autoComplete="off"
                    />
                    </div>
                    <div>
                    <p className="text-sm font-roboto sm:text-sm font-bold -mb-5 text-black font-Cambria">
                        Lastname:
                    </p>
                    <br />
                    <input 
                    className="border-2 border-green-200 w-64 px-2 sm:w-40 p-1 rounded-lg text-black outline-none"
                    type="text"
                    required
                    name="lastname"
                    id="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    autoComplete="off"
                    />
                </div>
                </div>
                <div className="">
                    <p className="text-sm font-roboto sm:text-sm font-bold -mb-5 text-black font-Cambria">
                        Email Address:
                    </p>
                    <br />
                    <input 
                    className="border-2 border-green-200 w-64 sm:w-80 px-2 p-1 rounded-lg text-black outline-none"
                    type="text"
                    required
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    />
                </div>
                <div className="">
                    <p className="text-sm font-roboto sm:text-sm font-bold -mb-5 text-black font-Cambria">
                        Phone Number:
                    </p>
                    <br />
                    <input 
                    className="border-2 border-green-200 w-64 sm:w-80 px-2 p-1 rounded-lg text-black outline-none"
                    type="text"
                    required
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="off"
                    />
                </div>
                    <div className="">
                    <p className="text-sm font-roboto font-bold -mb-5 text-black ">
                        Password:
                    </p>
                    {errors.password && (
                     <p className={`text-red-600 my-2 `}>
                        {errors.password}
                    </p>
                    )}
                    <br />
                    <input 
                     className="border-2 relative -mb-6 px-2 border-green-200 w-64 sm:w-80 p-1 rounded-lg text-black outline-none"
                     type={'password'}
                    required
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    />
                    </div>
                   <div className="mt-5 border rounded border-2 border-green-500 p-2 flex justify-center items-center">
                    <label
                  htmlFor="image"
                  className="btn btn-outline-secondary d-flex align-items-center"
                  style={{
                    cursor: "pointer",
                    display: "inline-flex",
                    gap: "10px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="black"
                    className="border text-green-500 border-green-700 rounded-full "
                    style={{ width: "24px", height: "24px", color:"green" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <span style={{ color: "green", fontWeight: "bold" }}>
                   Choose Profile
                  </span>
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  className="form-control"
                  accept="image/*"
                  style={{ display: "none" }} />

                </div>
            </div>
            {imageFile && (
                  <div className="mt-4 text-black font-bold text-sm">
                    Selected file: <small>{imageFile.name}</small>
                  </div>
                )}
            
                <button type="submit"  className="mb-3 w-64 mt-5 submit-bg text-white sm:w-80 p-1 rounded-2xl text-black outline-none"
                     disabled={!formData.email || !formData.password || !formData.firstname || !formData.lastname || !formData.phone}>
                {loading ? "Sending" : "Send"}
                </button>
            </form>
            
            {errors.server && <p className={`text-red-600 my-2` }> {errors.server} </p>}
           
            
            <p className="text-sm sm:block hidden"> Don’t have a Rover account?
                <span>
                    <Link to="/register" className="text-[#20bc7e] text-sm"> Sign up now</Link>
                </span>
            </p>
            <p className=" block sm:hidden" style={{
                fontSize:"12px", textAlign:"center"
            }}> Don’t have Pet Rent Hub account?
                <span>
                    <Link to="/register" className="text-red-500 text-sm"> Sign up now</Link>
                </span>
            </p>
           
        </div>
        </div>
            }
        </>
        
    )

    return (
        <div className="overflow-hidden">
         {content}
        </div>
        
    )
}
export default RegisterPage