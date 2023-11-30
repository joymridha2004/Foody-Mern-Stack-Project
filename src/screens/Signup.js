import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function Signup() {
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",geolocation:""})
  let navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/creatuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });
  
    const json = await response.json();
    console.log(json);
  
    if (!json.success) {
      alert("Enter Valid Credentials");
    }else{
      localStorage.setItem("authToken",json.authToken);
      navigate("/");
    }
  }
  

  const onChange = (event) => {
    setcredentials({...credentials,[event.target.name]:event.target.value})
  }

  return (
    <div style={{ backgroundImage: 'url("https://e0.pxfuel.com/wallpapers/910/745/desktop-wallpaper-pizza-pie-lunch-dinner-background.jpg")', backgroundSize: 'cover',height: '100vh' }}>
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputAddress1" className="form-label">Address</label>
          <input type="text" className="form-control" id="exampleInputAddress1" name='geolocation' value={credentials.geolocation} onChange={onChange}/>
        </div>
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
      </form>
    </div>
    </div>
  )
}

