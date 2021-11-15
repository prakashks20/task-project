import { Row, Col, Form, Select, Button, Modal } from 'antd';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../redux/quarter/actions';

const { Option } = Select, { success } = Modal;

const Quarter = () => {
    const [form] = Form.useForm(),
        dispatch = useDispatch(),
        [selectedPlayer, setSelectedPlayer] = useState([]),
        [selectedPlayerRole, setSelectedPlayerRole] = useState([]),
        playerList = useSelector(state => state.composeTeamReducer.playerList),
        onValuesChange = (value, values) => {
            setSelectedPlayer(values.name.filter(val => value));
            setSelectedPlayerRole(values.role.filter(val => value));
        },
        onValidate = (key, i) => {
            let count = 0, formObject = form.getFieldsValue();
            console.log({ formObject, selectedPlayer, selectedPlayerRole });
            if (formObject?.[key]) {
                for (let val of formObject?.[key]) {
                    if (val && formObject?.[key]?.[i] === val) {
                        count += 1;
                    }
                }
            }
            return count > 1;
        },
        elements = () => {
            let playerFormItem = [];
            for (let i = 0; i < 5; i++) {
                playerFormItem.push(
                    <Row className={'form-item-row'}>
                        <Col span={12} className={'form-item-col'}>
                            <Form.Item
                                name={['name', i]}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Player select is required'
                                    },
                                ]}
                                validateStatus={onValidate('name', i) ? 'error' : ''}
                                help={onValidate('name', i) ? 'Player role can be select only once' : ''}
                            >
                                <Select
                                    placeholder={'Select player'}
                                >
                                    {playerList.map(player =>
                                        <Option key={player.id} value={player.id}>
                                            {`${player.firstName} ${player.lastName}`}
                                        </Option>)
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12} className={'form-item-col'}>
                            <Form.Item
                                name={['role', i]}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Player role select is required'
                                    },
                                ]}
                                validateStatus={onValidate('role', i) ? 'error' : ''}
                                help={onValidate('role', i) ? 'Player role can be select only once' : ''}
                            >
                                <Select
                                    placeholder={'Select player role'}
                                >
                                    {playerList?.find(
                                        player => selectedPlayer[i] === player.id)?.position?.map(
                                            data => <Option key={data.key} value={data.key}>{data.value}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>)
            }
            return playerFormItem;
        },
        onFinish = (values) => {
            let data = { players: [] }, player;
            for (let i = 0; i < 5; i++) {
                player = playerList.find(data => data.id === values?.['name']?.[i]);
                if (player) {
                    player = {
                        ...player,
                        position: player.position.filter(data => data.key === values?.['role']?.[i]),
                    }
                }
                data = {
                    ...data,
                    players: [...data.players, player]
                };
            }
            dispatch({
                type: actions.ADD_QUARTER,
                payload: {
                    data,
                    quarter: 'first',
                }
            });
            success({
                onOk: () => form.resetFields(),
                content: <div>First Quarter details saved successfully.</div>,
                maskClosable: false,
            });
        };
    return (
        <Form form={form} name={'addQuarter'} id={'add-quarter-form'} onFinish={onFinish} onValuesChange={(value, values) => onValuesChange(value, values)}>
            {elements()}
            <Form.Item>
                <Button type={'primary'} htmlType={'submit'} >Save</Button>
            </Form.Item>
        </Form>
    )
}

export default Quarter;