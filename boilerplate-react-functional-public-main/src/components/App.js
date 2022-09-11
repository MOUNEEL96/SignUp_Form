import React, { useState, useEffect} from "react";
import '../styles/App.css';

const App = () => {
  const initialValues={name:"",email:"",gender:"male",phonenumber:"",password:""};
  const [formValues,setFormValues]=useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit,setIsSubmit]=useState(false);

  const handleChange=(e)=>{
  console.log(e.target);
  const {name,value}=e.target;
  setFormValues({...formValues,[name]:value});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);


  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regex2= /^[0-9\b]+$/;
    if (!values.name) {
      errors.name = "Name is required!!";
    }
    if (!values.email) {
      errors.email = "Email is required!!";
    } else if (!regex.test(values.email)) {
      errors.email = "Email must contain @!!";
    }
if(!values.gender){
  errors.gender="Please identify as male,female or other!!"
}

if(!values.phonenumber){
  errors.phonenumber="Phone number is required!!";
}else if(!regex2.test(values.phonenumber)){
  errors.phonenumber="Phone number must be Number!!"
}

    if (!values.password) {
      errors.password = "Password is required!!";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    }
    return errors;
  };



  


  return (
    <div className="container">
  {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="success">{formValues.email} signedup successfully</div>
  ): (
    <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
  )}




    <form onSubmit={handleSubmit}>
      <h1>SignUp Form</h1>
      <div className="ui divider"></div>
      <div className="ui form">
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            data-testid = 'name'
            placeholder="Name"
            value={formValues.name}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.name}</p>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            data-testid = 'email'
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.email}</p>
        <label>

Gender

<select  data-testid = 'gender' value={formValues.gender} onChange={handleChange}>

<option value="male">Male</option>

<option value="female">Female</option>

<option value="other">Other</option>



</select>

</label>
<p>{formErrors.gender}</p>




        <div className="field">
          <label>PhoneNumber</label>
          <input
            type="number"
            name="phonenumber"
            data-testid = 'phoneNumber'
            placeholder="PhoneNumber"
            value={formValues.phonenumber}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.phonenumber}</p>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            data-testid = 'password'
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.password}</p>
        <button className="fluid ui button blue"  data-testid = 'submit'>Submit</button>
      </div>
    </form>
  </div>
  )
}


export default App;
