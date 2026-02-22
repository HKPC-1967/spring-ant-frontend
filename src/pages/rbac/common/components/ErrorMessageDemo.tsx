import { useLoading } from '@/api_core/components/LoadingContext';
import { errorMessage } from '@/services/ant-design-pro/api';
import { Button, Select } from 'antd';
import { useState } from 'react';

export default () => {
  const [errorShowType, setErrorShowType] = useState<number>(0);

  const { setIsLoading } = useLoading();

  const handleChange = (value: number) => {
    setErrorShowType(value);
  };
  const handleClick = async () => {
    setIsLoading(true);
    try {
      await errorMessage(errorShowType);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <h4>Demo 2: Error Message Types 错误消息类型</h4>
      <Select
        allowClear
        style={{ width: 200 }}
        placeholder="Select a error message"
        value={errorShowType}
        onChange={handleChange}
        options={[
          { value: 0, label: 'SILENT' },
          { value: 1, label: 'WARN_MESSAGE' },
          { value: 2, label: 'ERROR_MESSAGE' },
          { value: 3, label: 'NOTIFICATION' },
        ]}
      />
      <Button type="primary" onClick={handleClick}>
        Send
      </Button>
    </>
  );
};
