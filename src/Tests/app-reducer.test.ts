import { appReducer, initialStateType, RequestStatus, setErrorAC, setStatusAC } from '../State/app-reducer';


let startState: initialStateType;

beforeEach(() => { /* Весь этот код будет перезаписываться перед каждым тестом */
    startState = {
        status: RequestStatus.idle,
        error: null,
        isInitialized: false,
    };
})


test('correct status should be set', () => {

    const endState = appReducer(startState, setStatusAC({ status: RequestStatus.loading }));

    expect(endState.status).toBe(RequestStatus.loading);
});

test('correct Error should be set', () => {

    const endState = appReducer(startState, setErrorAC({ error: 'Errrrooor' }));

    expect(endState.error).toBe('Errrrooor');
});