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
        onFieldValidate = (key, value) => {
            let selectCount = 0;
            if (value) {
                if (key === 'name') {
                    for (const val of selectedPlayer) {
                        if (val === value) {
                            selectCount += 1;
                        }
                    }
                } else if (key === 'role') {
                    for (const val of selectedPlayerRole) {
                        if (val === value) {
                            selectCount += 1;
                        }
                    }
                }
                return selectCount > 1;
            }
        },
        onValuesChange = (value, values) => {
            setSelectedPlayer(values.name);
            setSelectedPlayerRole(values.role);
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
                                    {
                                        validator: async (_, value) => {
                                            if (onFieldValidate('name', value)) {
                                                return Promise.reject("Player can be select only once");
                                            }
                                        },
                                    },
                                ]}
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
                                    {
                                        validator: async (_, value) => {
                                            if (!!onFieldValidate('role', value)) {
                                                return Promise.reject("Player role can be select only once");
                                            }
                                        },
                                    },
                                ]}
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
            for (let i = 1; i <= 5; i++) {
                player = playerList.find(data => data.id === values[`player${i}Name`]);
                if (player) {
                    player = {
                        ...player,
                        position: player.position.filter(data => data.key === values[`player${i}Role`]),
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