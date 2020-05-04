import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { injectIntl } from 'react-intl';

import { Card, Row, Col, Button, Icon, Typography, Layout } from 'antd';
import { FormikInput, FormikPassword } from '../../Components/Formik';
import AppActions from '../../Stores/App/AppActions';
import { bindActionCreators } from 'redux';

const { Text } = Typography;

class LoginScreen extends React.PureComponent {
  componentDidMount() {
    this.props.actions.appSetHeaderText('Login')
  }

  render() {
    const { intl, login_form } = this.props;

    return (
      <Layout className="LoginScreen">
        <Helmet>
          <title>CM | {intl.formatMessage({ id: 'login' })}</title>
        </Helmet>
        <Card className="card" title={intl.formatMessage({ id: 'login' })}>
          <Formik
            enableReinitialize
            initialValues={login_form}
            onSubmit={(values, formikBag) => {
              this.props.actions.appAuthenticate(formikBag, values.email, values.password);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().required(intl.formatMessage({ id: 'email_is_required' })),
              password: Yup.string().required(intl.formatMessage({ id: 'password_is_required' }))
            })}
          >
            {({
              // values,
              // handleChange,
              // errors,
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
                      addonBefore={<Icon type="user" />}
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
                      addonBefore={<Icon type="lock" />}
                    />
                  </Col>
                </Row>

                <Row type="flex" justify="start" gutter={[8, 8]}>
                  <Col span={3}>
                    <Button
                      type="primary"
                      className="btn-primary"
                      disabled={!isValid}
                      loading={isSubmitting}
                      onClick={handleSubmit}
                    >
                      {intl.formatMessage({ id: 'login' })}
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

const mapStateToProps = state => ({
  login_form: state.app.login_form
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...AppActions }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(LoginScreen));
