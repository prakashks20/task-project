import actions from './actions';

const initValue = {
    playerList: [
        {
            id: '1',
            firstName: 'Player',
            lastName: '1',
            height: '185',
            position: [
                { key: 'pg', value: 'Point Guard' },
                { key: 'sg', value: 'Shooting Guard' },
            ],
        },
        {
            id: '2',
            firstName: 'Player',
            lastName: '2',
            height: '182',
            position: [
                { key: 'sg', value: 'Shooting Guard' },
                { key: 'sf', value: 'Small Forward' },
            ],
        },
        {
            id: '3',
            firstName: 'Player',
            lastName: '3',
            height: '184',
            position: [
                { key: 'sf', value: 'Small Forward' },
                { key: 'pf', value: 'Power Forward' },
            ],
        },
        {
            id: '4',
            firstName: 'Player',
            lastName: '4',
            height: '181',
            position: [
                { key: 'pf', value: 'Power Forward' },
                { key: 'c', value: 'Center' },
            ],
        },
        {
            id: '5',
            firstName: 'Player',
            lastName: '5',
            height: '183',
            position: [
                { key: 'c', value: 'Center' },
                { key: 'pg', value: 'Point Guard' },
                { key: 'sg', value: 'Shooting Guard' },
            ],
        },
    ],
    position: [
        { key: 'pg', value: 'Point Guard' },
        { key: 'sg', value: 'Shooting Guard' },
        { key: 'sf', value: 'Small Forward' },
        { key: 'pf', value: 'Power Forward' },
        { key: 'c', value: 'Center' },
    ]
}

const composeTeamReducer = (state = initValue, action) => {
    switch (action.type) {
        case actions.ADD_PLAYER: {
            let player = { ...action.payload, id: (state.playerList.length + 1).toString(), };
            return {
                ...state,
                playerList: [...state.playerList, player],
            };
        }
        default: return state;
    }
}

export default composeTeamReducer;