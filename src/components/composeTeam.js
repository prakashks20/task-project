import { Button, Form, Input, InputNumber, Select, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import actions from '../redux/composeTeam/actions';

const { Option } = Select, { success } = Modal;

const ComposeTeam = () => {
    const dispatch = useDispatch(),
        [form] = Form.useForm(),
        position = useSelector((state)=> state.composeTeamReducer.position),
        onFinish = (values) => {
            const payload = {
                ...values,
                position: position.filter(data => values.position.includes(data.key)),
            };
            dispatch({
                type: actions.ADD_PLAYER,
                payload,
            });
            success({
                onOk: () => form.resetFields(),
                content: <div>Team player details saved successfully.</div>,
                maskClosable: false,
            });
        };
    return (
        <Form
            form={form}
            onFinish={onFinish} 
            name={'composeTeamPlayerForm'} 
            id={'compose-team-player-form'}
        >
            <Form.Item
                name={'firstName'}
                rules={[
                    {
                        required: true,
                        message: 'First name is required',
                    }
                ]}
            >
                <Input placeholder={'First Name'} />
            </Form.Item>
            <Form.Item
                name={'lastName'}
                rules={[
                    {
                        required: true,
                        message: 'Last name is required',
                    }
                ]}
            >
                <Input placeholder={'Last Name'} />
            </Form.Item>
            <Form.Item
                name={'height'}
                rules={[
                    {
                        required: true,
                        message: 'Height is required',
                    },
                    {
                        type: 'number',
                        min: 0,
                        message: 'Height must be a number',
                    }
                ]}
            >
                <InputNumber placeholder={'Height'} />
            </Form.Item>
            <Form.Item
                name={'position'}
                rules={[
                    {
                        required: true,
                        message: 'Position is required'
                    }
                ]}
            >
                <Select
                    mode="multiple"
                    placeholder="Position"
                    allowClear
                >
                    {position.map(data => <Option key={data.key} value={data.key}>{data.value}</Option>)}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button htmlType={'submit'} type={'primary'}>Save</Button>
            </Form.Item>
        </Form>
    );
};

export default ComposeTeam;