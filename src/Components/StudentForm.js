import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button, Col } from "react-bootstrap";

const StudentForm = (props) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("You have entered an invalid email address").required("Required"),
    rollno: Yup.number().positive("Invalid roll number").integer("Invalid roll number").required("Required"),
  });

  return (
    <div className="form-wrapper">
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup as={Col} md={6} controlId="name">
            <h4>Name</h4>
            <Field name="name" type="text" className="form-control" />
            <ErrorMessage name="name" className="d-block invalid-feedback" component="span" />
          </FormGroup>
          <FormGroup as={Col} md={6} controlId="email">
            <h4>Email</h4>
            <Field name="email" type="text" className="form-control" />
            <ErrorMessage name="email" className="d-block invalid-feedback" component="span" />
          </FormGroup>
          <FormGroup as={Col} md={6} controlId="rollno">
            <h4>Roll no</h4>
            <Field name="rollno" type="number" className="form-control" />
            <ErrorMessage name="rollno" className="d-block invalid-feedback" component="span" />
          </FormGroup>
                <br></br>
          <Button variant="danger" size="lg" block="block" type="submit">
            {props.children}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default StudentForm;
