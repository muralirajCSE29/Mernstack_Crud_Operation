import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// EditStudent Component
const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate to programmatically navigate to other pages

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });

  const onSubmit = (studentObject) => {
    axios
      .put(`http://localhost:4000/students/update-student/${id}`, studentObject)
      .then((res) => {
        if (res.status === 200) {
          alert("Student successfully updated");
          navigate("/student-list"); // Use navigate to redirect to the student list page
        } else {
          Promise.reject();
        }
      })
      .catch((err) => alert("Something went wrong"));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/students/update-student/${id}`)
      .then((res) => {
        const { name, email, rollno } = res.data;
        setFormValues({ name, email, rollno });
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <h2>Update Student</h2>
      <StudentForm
        initialValues={formValues}
        onSubmit={onSubmit}
        enableReinitialize
      />
    </div>
  );
};

// StudentForm Component
const StudentForm = ({ initialValues, onSubmit }) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Roll No:</label>
        <input 
          type="text"
          name="rollno"
          value={values.rollno}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default EditStudent;
