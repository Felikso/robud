import React from "react";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";

import { ReactComponent as SendIcon } from "content/assets/images/svgs/send-square.svg";

const ContactForm = ({ contactForm }) => {

    const { acept, name, nameMin, nameMax, nameR, email, emailR, emailE, emailMin, emailMax, message, messageMin, messageR, termsR, confirmed, thanks, send } = contactForm[0];


    const succesSubmit = (values) => {
        console.log(values)
    }



    const schema = yup.object().shape({
        firstName: yup.string().min(2, nameMin || "proszę wpisać dłuższe imię").max(50, nameMax || 'imię wydaje się być zbyt długie :)').required(nameR || 'imię jest wymagane'),
        email: yup.string().min(2, emailMin || 'proszę wpisać dłuższy email').email(emailE || 'email nieprawidłowy').max(50, emailMax || 'email nie jest zbyt długi? :)').required(emailR || 'adres e-mail jest wymagany'),
        message: yup.string().min(20, messageMin || 'proszę wpisać dłuższą wiadomość').required(messageR || 'proszę wpisać treść wiadomości'),
        terms: yup.bool().required().oneOf([true], termsR || 'warunki muszą zostać zaakceptowane'),
    });

    const initialValues = {
        firstName: '',
        email: '',
        message: '',
        terms: false,
    }

    return (
        <Formik
            validationSchema={schema}
            /*             onSubmit={values => succesSubmit(values)} */
            onSubmit={async (values, { resetForm }) => {
                await succesSubmit(values)

                resetForm(initialValues)
            }}
            initialValues={initialValues}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                touched,
                errors,
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="validationName">
                                <Form.Label><span>{name}</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback>{confirmed}</Form.Control.Feedback>
                                {touched.firstName && errors.firstName ? (
                                    <div className="text-danger">{errors.firstName}</div>
                                ) : null}
                            </Form.Group>

                            <Form.Group controlId="validationEmail">
                                <Form.Label><span>{email}</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback>{confirmed}</Form.Control.Feedback>
                                {touched.email && errors.email ? (
                                    <div className="text-danger">{errors.email}</div>
                                ) : null}
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="validationMessage">
                                <Form.Label><span>{message}</span></Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    value={values.message}
                                    as="textarea"
                                    type="text"
                                    name="message"
                                    rows={5} />
                                <Form.Control.Feedback>{thanks}</Form.Control.Feedback>
                                {touched.message && errors.message ? (
                                    <div className="text-danger">{errors.message}</div>
                                ) : null}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-end">
                        <Form.Group>
                            <Form.Check
                                required
                                name="terms"
                                label={acept}
                                value={values.terms}
                                onChange={handleChange}
                                id="validationFormik0"
                            />
                            {touched.terms && errors.terms ? (
                                <div className="text-danger">{errors.terms}</div>
                            ) : null}
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-end">
                        <Button type="submit">{send}<SendIcon className="ml-3" /></Button>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};

ContactForm.propTypes = {
    contactForm: PropTypes.array,

};

ContactForm.defaultProps = {
    contactForm: null,

};

export default ContactForm;