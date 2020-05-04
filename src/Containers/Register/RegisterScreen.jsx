import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Button, Typography, Layout } from 'antd';
import { FormikInput, FormikDatePicker, FormikPassword } from '../../Components/Formik';
import AppActions from '../../Stores/App/AppActions';
import RegisterAction from '../../Stores/Register/RegisterAction';
import './RegisterScreenStyle.css';
import { bindActionCreators } from 'redux';

const { Text } = Typography;

class RegisterScreen extends React.PureComponent {
  componentDidMount() {
    const { appSetHeaderText, intl } = this.props;
    appSetHeaderText(intl.formatMessage({ id: 'register' }));
  }
  render() {
    const { intl, registerForm } = this.props;
    return (
      <Layout className="RegisterScreen">
        <Helmet>
          <title>CM | {intl.formatMessage({ id: 'register' })}</title>
        </Helmet>
        <Card className="card" title={intl.formatMessage({ id: 'register_form' })}>
          <Formik
            enableReinitialize
            initialValues={registerForm}
            onSubmit={(values, formikBag) => {
              // dispatch the action
              this.props.actions.registerPostForm(formikBag, values);
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required(intl.formatMessage({ id: 'name_is_required' })),
              email: Yup.string().required(intl.formatMessage({ id: 'email_is_required' })),
              dob: Yup.string().required(intl.formatMessage({ id: 'dob_is_required' })),
              address: Yup.string().required(intl.formatMessage({ id: 'address_is_required' })),
              phone: Yup.string().required(intl.formatMessage({ id: 'phone_is_required' }))
            })}
          >
            {({
              // values,
              // handleChange,
              errors,
              // setFieldTouched,
              // dirty,
              // touched,
              isSubmitting,
              isValid,
              handleSubmit
            }) => (
              <Form>
                <Row type="flex" justify="center" gutter={[0, 8]}>
                  <Col span={3}>
                    <Text strong>{intl.formatMessage({ id: 'name' })}</Text>
                  </Col>
                  <Col span={1}>
                    <Text strong>:</Text>
                  </Col>
                  <Col span={20}>
                    <Field
                      name="name"
                      component={FormikInput}
                      placeholder={intl.formatMessage({ id: 'name' })}
                    />
                  </Col>
                </Row>
                <Row type="flex" justify="center" gutter={[0, 8]}>
                  <Col span={3}>
                    <Text strong>{intl.formatMessage({ id: 'email' })}</Text>
                  </Col>
                  <Col span={1}>
                    <Text strong>:</Text>
                  </Col>
                  <Col span={20}>
                    <Field
                      name="email"
                      component={FormikInput}
                      placeholder={intl.formatMessage({ id: 'email' })}
                    />
                  </Col>
                </Row>
                <Row type="flex" justify="center" gutter={[0, 8]}>
                  <Col span={3}>
                    <Text strong>{intl.formatMessage({ id: 'dob' })}</Text>
                  </Col>
                  <Col span={1}>
                    <Text strong>:</Text>
                  </Col>
                  <Col span={20}>
                    <Field
                      name="dob"
                      component={FormikDatePicker}
                      placeholder={intl.formatMessage({ id: 'dob' })}
                    />
                  </Col>
                </Row>
                <Row type="flex" justify="center" gutter={[0, 8]}>
                  <Col span={3}>
                    <Text strong>{intl.formatMessage({ id: 'address' })}</Text>
                  </Col>
                  <Col span={1}>
                    <Text strong>:</Text>
                  </Col>
                  <Col span={20}>
                    <Field
                      name="address"
                      component={FormikInput}
                      placeholder={intl.formatMessage({ id: 'address' })}
                    />
                  </Col>
                </Row>
                <Row type="flex" justify="center" gutter={[0, 8]}>
                  <Col span={3}>
                    <Text strong>{intl.formatMessage({ id: 'phone' })}</Text>
                  </Col>
                  <Col span={1}>
                    <Text strong>:</Text>
                  </Col>
                  <Col span={20}>
                    <Field
                      name="phone"
                      component={FormikInput}
                      placeholder={intl.formatMessage({ id: 'phone' })}
                    />
                  </Col>
                </Row>
                <Row type="flex" justify="center" gutter={[0, 8]}>
                  <Col span={3}>
                    <Text strong>{intl.formatMessage({ id: 'password' })}</Text>
                  </Col>
                  <Col span={1}>
                    <Text strong>:</Text>
                  </Col>
                  <Col span={20}>
                    <Field
                      name="password"
                      component={FormikPassword}
                      placeholder={intl.formatMessage({ id: 'password' })}
                    />
                  </Col>
                </Row>
                <Row type="flex" justify="start" gutter={[8, 8]}>
                  <Col>
                    <Button
                      type="primary"
                      className="btn-primary"
                      disabled={!isValid}
                      loading={isSubmitting}
                      onClick={handleSubmit}
                      block
                    >
                      {intl.formatMessage({ id: 'register' })}
                    </Button>
                  </Col>
                  <Col>
                    <Button type="primary" className="btn-secondary" block>
                      <Link to='/login'>{intl.formatMessage({ id: 'go_to_login' })}</Link>
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Card>
      </Layout>
    );
  }
}

RegisterScreen.propTypes = {
  intl: PropTypes.object
};

const mapStateToProps = state => ({
  registerForm: state.register.registerForm
});

const mapDispatchToProps = dispatch => ({
  appSetHeaderText: text => dispatch(AppActions.appSetHeaderText(text)),
  actions: bindActionCreators({ ...RegisterAction }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(RegisterScreen));
