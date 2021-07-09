import React from "react";

import Form from "react-bootstrap/Form";
import * as yup from "yup";
import { Formik } from "formik";
import { Button, Col, Row } from "react-bootstrap";

import { ReactComponent as SendIcon } from "content/assets/images/svgs/send-square.svg";

const ContactFormFormik = () => {

    const schema = yup.object().shape({
        firstName: yup.string().min(2, 'proszę wpisać dłuższe imię').max(50, 'imię wydaje się być zbyt długie :)').required('proszę wpisać imię'),
        email: yup.string().min(2, 'proszę wpisać dłuższy email').email('email nieprawidłowy').max(50, 'email nie jest zbyt długi? :)').required('adres e-mail jest wymagany'),
        message: yup.string().min(20, 'proszę wpisać dłuższą wiadomość').required('proszę wpisać treść wiadomości'),
        terms: yup.bool().required().oneOf([true], 'warunki muszą zostać zaakceptowane'),
    });

    return (
        <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
                firstName: '',
                email: '',
                message: '',
                terms: false,
            }}
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
                            <Form.Group controlId="validationFormik01">
                                <Form.Label><span>Imię</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback>Wszystko super!</Form.Control.Feedback>
                                {touched.firstName && errors.firstName ? (
                                    <div>{errors.firstName}</div>
                                ) : null}
                            </Form.Group>

                            <Form.Group controlId="validationFormik01">
                                <Form.Label><span>Email</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <Form.Control.Feedback>Wszystko super!</Form.Control.Feedback>
                                {touched.email && errors.email ? (
                                    <div>{errors.email}</div>
                                ) : null}
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label><span>Treść wiadomości</span></Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    as="textarea"
                                    type="text"
                                    name="message"
                                    rows={5} />
                                <Form.Control.Feedback>Dziękujemy za wiadomość!</Form.Control.Feedback>
                                {touched.message && errors.message ? (
                                    <div>{errors.message}</div>
                                ) : null}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="justify-content-end">
                        <Form.Group>
                            <Form.Check
                                required
                                name="terms"
                                label="Akceptuję zasady"
                                onChange={handleChange}
                                id="validationFormik0"
                            />
                            {touched.terms && errors.terms ? (
                                <div>{errors.terms}</div>
                            ) : null}
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-end">
                        <Button type="submit">Wyślij <SendIcon /></Button>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};

export default ContactFormFormik;