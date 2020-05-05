import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';

import { Card, Layout, Table, Row, Button, Col, Typography, Modal } from 'antd';
import { bindActionCreators } from 'redux';
import { Formik, Form, Field } from 'formik';
import AppActions from '../../Stores/App/AppActions';
import HomeActions from '../../Stores/Home/HomeActions';
import { FormikInput, FormikDatePicker } from '../../Components/Formik';

const { Text } = Typography;
const { confirm } = Modal;

class HomeScreen extends React.PureComponent {
  componentDidMount() {
    const { intl } = this.props;
    this.props.actions.appSetHeaderText(intl.formatMessage({ id: 'home' }));
    this.props.actions.homeFetchCustomers();
  }

  useOpenUpdateModal = record => {
    this.props.actions.homeSetHomeForm(record);
    this.props.actions.homeSetUpdateModal(true);
  };

  useOpenDeleteModal = record => {
    this.props.actions.homeSetHomeForm(record);
    this.props.actions.homeSetDeleteModal(true);
  };

  render() {
    const {
      intl,
      data,
      homeForm,
      isEditing,
      isUpdateModalVisible,
      isDeleteModalVisible
    } = this.props;
    const columns = [
      {
        key: 'name',
        title: `${intl.formatMessage({ id: 'name' })}`,
        dataIndex: 'name',
        width: '35%',
        editable: true
      },
      {
        key: 'email',
        title: `${intl.formatMessage({ id: 'email' })}`,
        dataIndex: 'email',
        width: '25%',
        editable: true
      },
      {
        key: 'dob',
        title: `${intl.formatMessage({ id: 'dob' })}`,
        dataIndex: 'dob',
        width: '15%',
        editable: true
      },
      {
        key: 'phone',
        title: `${intl.formatMessage({ id: 'phone' })}`,
        dataIndex: 'phone',
        width: '15%',
        editable: true
      },
      {
        key: 'action',
        title: `${intl.formatMessage({ id: 'action' })}`,
        width: '20%',
        dataIndex: 'action',
        render: (_, record) => {
          return (
            <Row>
              <Button className="btn-primary" onClick={() => this.useOpenUpdateModal(record)}>
                Edit
              </Button>
              <Button className="btn-danger" onClick={() => this.useOpenDeleteModal(record)}>
                Delete
              </Button>
            </Row>
          );
        }
      }
    ];
    return (
      <Layout className="HomeScreen">
        <Helmet>
          <title>CM | {intl.formatMessage({ id: 'home' })}</title>
        </Helmet>
        <Card title={intl.formatMessage({ id: 'home' })}>
          <Table
            bordered
            dataSource={data}
            columns={columns}
            rowClassName="editable-row"
            pagination={false}
          />
        </Card>
        <Modal
          title="Do you want to delete these customer?"
          visible={isDeleteModalVisible}
          onOk={() => this.props.actions.homeDeleteCustomer(homeForm.email)}
          onCancel={() => this.props.actions.homeSetDeleteModal(false)}
        />

        <Formik
          enableReinitialize
          initialValues={homeForm}
          onSubmit={(values, formikBag) => {
            // dispatch the action
            this.props.actions.homeUpdateCustomer(formikBag, values);
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
            <Modal
              title="Update Customer"
              visible={isUpdateModalVisible}
              onOk={handleSubmit}
              onCancel={() => this.props.actions.homeSetUpdateModal(false)}
            >
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
              </Form>
            </Modal>
          )}
        </Formik>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  data: state.home.data,
  homeForm: state.home.homeForm,
  isEditing: state.home.isEditing,
  isUpdateModalVisible: state.home.isUpdateModalVisible,
  isDeleteModalVisible: state.home.isDeleteModalVisible
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...AppActions, ...HomeActions }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(HomeScreen));
