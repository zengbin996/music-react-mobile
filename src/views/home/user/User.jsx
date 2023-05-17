import React, { useState, useRef, useEffect } from 'react';
import { Form, Input, Button, Toast } from 'antd-mobile';
import axios from 'axios';

export default () => {
  const FormRef = useRef();
  const [countDown, setCountDown] = useState(0);
  let timer = null;

  //定时器
  useEffect(() => {
    if (countDown > 0) {
      timer = setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countDown]);

  //获取验证码
  const getAuthCode = () => {
    FormRef.current
      .validateFields(['phone'])
      .then(value => {
        setCountDown(180);
        axios.get(`/captcha/sent?phone=${value.phone}`).then(res => {
          if (res.data) {
            Toast.show({
              icon: 'success',
              content: '发送成功',
            });
          }
        });
      })
      .catch(() => {});
  };

  //登录
  const submitHandle = () => {
    FormRef.current
      .validateFields()
      .then(value => {
        axios.get(`/captcha/verify?phone=${value.phone}&captcha=${value.authCode}`).then(res => {
          if (res.data) {
            Toast.show({
              icon: 'success',
              content: '登录成功',
            });
          }
        });
      })
      .catch(() => {});
  };

  //获取登录状态
  useEffect(() => {
    // axios.get(`/login/status`).then((res) => {
    //   console.log(res)
    // })
  }, []);
  return (
    <div className="pt-2">
      <div>
        <p className="text-center">使用网易云音乐账号直接登录</p>
        <p className="text-center">请不要频繁获取验证码</p>
        <p className="text-center">由于网易云音乐登录接口调整,暂时请勿使用登录功能</p>

        <Form
          className="mt-4"
          layout="horizontal"
          ref={FormRef}
          initialValues={{
            phone: '',
          }}
          footer={
            <Button block type="submit" onClick={submitHandle} color="primary" size="middle">
              登录
            </Button>
          }
        >
          <Form.Header>手机号登录</Form.Header>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[{ required: true, message: '手机号不正确', pattern: /^1[3-9]\d{9}$/ }]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="authCode"
            label="验证码"
            rules={[{ required: true, message: '验证码不能为空' }]}
            extra={
              <Button block size="small" onClick={getAuthCode} disabled={countDown}>
                {countDown ? countDown + '秒后获取' : '获取验证码'}
              </Button>
            }
          >
            <Input placeholder="请输入验证码" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
