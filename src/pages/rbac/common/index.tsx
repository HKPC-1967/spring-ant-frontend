import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button, Spin, message } from 'antd';
import ErrorMessageDemo from './components/ErrorMessageDemo';
import { useLoading } from '@/api_core/components/LoadingContext';

export default () => {
  const { roleAdmin } = useAccess();

  const { isLoading } = useLoading();

  return (
    <PageContainer>
      <Spin spinning={isLoading}>
        <h4>Demo 1: Role Based Access Control (RBAC) 权限控制</h4>
        <Button
          type="primary"
          style={{ marginRight: 8 }}
          onClick={() =>
            message.info(
              <span>
                All Users can see this Common Button
                <br />
                所有用户都能看见这个Common Button
              </span>,
            )
          }
        >
          Common Button
        </Button>
        <Access accessible={roleAdmin}>
          <Button
            type="primary"
            onClick={() =>
              message.info(
                <span>
                  Only Admin can see this Admin Button
                  <br />
                  只有管理员才能看见这个Admin Button
                </span>,
              )
            }
          >
            Admin Button
          </Button>
        </Access>
        <div style={{ height: 26 }} />
        <ErrorMessageDemo />
      </Spin>
    </PageContainer>
  );
};
