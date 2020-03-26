import React, {useState, useEffect} from "react";
import axios from "axios";
import * as yup from "yup";
import styled from "styled-components";

const FirstContainer = styled.div `
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const InputBox = styled.input `
    width: 600px;
    height: 2rem;
    border: 2px solid steelblue;
    margin: 0 5px;
`;

const formSchema = yup.object().shape({
    name: yup.string().required("Must Have Username"),
    email: yup.string().email().required("Must Have Email"),
    password: yup.string().required("Must Have Password"),
    positions: yup.string(),
    terms: yup.boolean().oneOf([true], "Please Agree to Terms of Service")
});

const Form = () => {

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        positions: "",
        terms: ""
      });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        positions: "",
        terms: ""
      });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [post, setPost] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
          setButtonDisabled(!valid);
        });
      }, [formState]);

      const formSubmit = e => {
        e.preventDefault();
        axios
          .post("https://reqres.in/api/users", formState)
          .then(res => {
            setPost(res.data);
            console.log("success", post);
    
            setFormState({
              name: "",
              email: "",
              password: "",
              positions: "",
              terms: ""
            });
          })
          .catch(err => {
            console.log(err.res);
          });
      };
    
      const validateChange = e => {
        yup
          .reach(formSchema, e.target.name)
          .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
          .then(valid => {
            setErrors({
              ...errors,
              [e.target.name]: ""
            });
          })
          .catch(err => {
            setErrors({
              ...errors,
              [e.target.name]: err.errors
            });
          });
      };

      const inputChange = e => {
        e.persist();
        const newFormData = {
          ...formState,
          [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newFormData);
      };

    return (
        <form onSubmit={formSubmit}>

            <FirstContainer>

            <label htmlFor="name">Name:
                <InputBox
                    id="name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={inputChange}
                />
                {errors.name.length > 0 ? <p id="nameP">{errors.name}</p> : null}
            </label>

            <br/>

            <label htmlFor="email">Email:
                <InputBox
                    id="email"
                    type="text"
                    name="email"
                    value={formState.email}
                    onChange={inputChange}
                />
                {errors.email.length > 0 ? <p id="emailP">{errors.email}</p> : null}
            </label>

            <br/>

            <label htmlFor="password">Password:
                <InputBox
                    id="password"
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={inputChange}
                />
                {errors.password.length > 0 ? <p id="passwordP">{errors.password}</p> : null}
            </label>
                
            </FirstContainer>

            <br/>

            <label htmlFor="positions">Role:
                <select id="positions" name="positions" onChange={inputChange}>
                    <option value="Front End">Front End</option>
                    <option value="Back End"> Back End</option>
                    <option value="Team Lead"> Team Lead</option>
                </select>
            </label>

            <br/>

            <label htmlFor="terms">Terms:
                <input
                    id="terms"
                    type="checkbox"
                    name="terms"
                    checked={formState.terms}
                    onChange={inputChange}
                />
                {errors.terms.length > 0 ? <p id="termsP">{errors.terms}</p> : null}
            </label>
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button disabled={buttonDisabled}>Submit</button>
        </form>
    )
}

export default Form;