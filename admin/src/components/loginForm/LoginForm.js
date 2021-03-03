import React, { useState } from 'react';
import { Input, Button } from 'antd';
import {
  MailOutlined,
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';

import "antd/dist/antd.css"
import styles from './Login.module.css'

function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({ name: "", email: "", password: "" })
  const onSubmitHandler = (e) => {
    e.preventDefault();
    Login(details);
  }
  return (
    <form>
      <div className={styles.formInner}>
        <h2 className={styles.titleName}>Login</h2>
        {(error !== " ") ? (<div className={styles.errorStyle}>{error}</div>) : ""}
        <div className={styles.formGroup}>
          <div className={styles.labelItem}>
            <label htmlFor="name">Name:</label>
          </div>

          <Input size="large" type="text" id="name" className={styles.inputItem} onChange={e => setDetails({ ...details, name: e.target.value })} value={details.name} prefix={<UserOutlined />} />
        </div>
        <div className={styles.formGroup}>
          <div className={styles.labelItem}>
            <label htmlFor="email">Email:</label>
          </div>

          <Input size="large" type="email" id="email" className={styles.inputItem} onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} prefix={<MailOutlined />} />
        </div>
        <div className={styles.formGroup}>
          <div className={styles.labelItem}>
            <label htmlFor="password">Password:</label>
          </div>

          <Input size="large" type="password" id="password" className={styles.inputItem} onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} prefix={<LockOutlined />} />
        </div>
        <Button type="primary" size="large" onClick={onSubmitHandler}>Login</Button>
      </div>
    </form>
  )
}

export default LoginForm;