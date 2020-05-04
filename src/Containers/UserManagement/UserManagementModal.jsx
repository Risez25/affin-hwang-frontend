import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { injectIntl } from 'react-intl';
import { Modal, Row, Col, Typography } from 'antd';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { FormikInput, FormikSelect } from '../../Components/Formik';
import UserManagementActions from '../../Stores/UserManagement/UserManagementActions';
class UserManagementModal extends React.PureComponent {
  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  useOnChangePersona() {}
  render() {
    const {
      is_visible,
      intl,
      user_management_modal_form,
      is_loading,
      is_disable,
      personas,
      createUser,
      setOpenModal
    } = this.props;
    return (
      <div>
        <Formik
          enableReinitialize
          initialValues={user_management_modal_form}
          onSubmit={(values, formikBag) => {
            createUser(formikBag, values);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().required(intl.formatMessage({ id: 'email_is_required' })),
            persona: Yup.string().required(intl.formatMessage({ id: 'persona_is_required' }))
          })}
        >
          {({
            values,
            handleChange,
            // errors,
            // setFieldTouched,
            // dirty,
            // touched,
            isSubmitting,
            // isValid,
            handleSubmit,
            // handleReset,
            setFieldValue
          }) => (
            <Modal
              className="UserManagementModal"
              title={intl.formatMessage({ id: 'add_new_user' })}
              visible={is_visible}
              onOk={handleSubmit}
              //   confirmLoading={confirmLoading}
              onCancel={() => setOpenModal(false)}
            >
              <Form>
                <Row type="flex" justify="center" gutter={[8, 8]}>
                  <Col span={7}>
                    <Typography.Text>{intl.formatMessage({ id: 'name_caps' })}</Typography.Text>
                  </Col>
                  <Col span={1}>
                    <Typography.Text>:</Typography.Text>
                  </Col>
                  <Col span={15}>
                    <Field name="name" component={FormikInput} loading={is_loading} />
                  </Col>
                </Row>
                <Row type="flex" justify="center" gutter={[8, 8]}>
                  <Col span={7}>
                    <Typography.Text>{intl.formatMessage({ id: 'email_caps' })}</Typography.Text>
                  </Col>
                  <Col span={1}>
                    <Typography.Text>:</Typography.Text>
                  </Col>
                  <Col span={15}>
                    <Field name="email" component={FormikInput} loading={is_loading} />
                  </Col>
                </Row>
                <Row type="flex" justify="center" gutter={[8, 8]}>
                  <Col span={7}>
                    <Typography.Text>
                      {intl.formatMessage({ id: 'contact_no_caps' })}
                    </Typography.Text>
                  </Col>
                  <Col span={1}>
                    <Typography.Text>:</Typography.Text>
                  </Col>
                  <Col span={15}>
                    <Field name="contact_no" component={FormikInput} loading={is_loading} />
                  </Col>
                </Row>
                <Row type="flex" justify="center" gutter={[8, 8]}>
                  <Col span={7}>
                    <Typography.Text>{intl.formatMessage({ id: 'persona_caps' })}</Typography.Text>
                  </Col>
                  <Col span={1}>
                    <Typography.Text>:</Typography.Text>
                  </Col>
                  <Col span={15}>
                    <Field
                      name="persona"
                      component={FormikSelect}
                      showArrow
                      filterOption={false}
                      onSearch={this.handleSalesmanSearch}
                      notFoundContent={null}
                      loading={is_loading}
                      options={personas}
                      disabled={is_disable}
                    />
                  </Col>
                </Row>
              </Form>
            </Modal>
          )}
        </Formik>
      </div>
    );
  }
}

UserManagementModal.propTypes = {
  is_visible: PropTypes.bool,
  is_loading: PropTypes.bool,
  is_disable: PropTypes.bool,
  user_management_modal_form: PropTypes.object,
  personas: PropTypes.array,
  createUser: PropTypes.func,
  setOpenModal: PropTypes.func
};

const mapStateToProps = state => ({
  is_visible: state.userManagement.is_visible,
  is_loading: state.userManagement.is_loading,
  is_disable: state.userManagement.is_disable,
  user_management_modal_form: state.userManagement.user_management_modal_form,
  personas: state.app.personas
});

const mapDispatchToProps = dispatch => ({
  createUser: (formikBag, userValues) =>
    dispatch(UserManagementActions.userManagementCreateUser(formikBag, userValues)),
  setOpenModal: boolean => dispatch(UserManagementActions.userManagementOpenModal(boolean))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(UserManagementModal));
