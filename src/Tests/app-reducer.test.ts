import { appReducer, initialStateType, RequestStatus, setStatusAC } from '../State/app-reducer';


let startState: initialStateType;

beforeEach(() => { /* Весь этот код будет перезаписываться перед каждым тестом */
    startState =  {
        status: RequestStatus.idle,
    };
})


test('correct todolist should be removed', () => {

    const endState = appReducer(startState, setStatusAC(RequestStatus.loading));

    expect(endState.status).toBe(RequestStatus.loading);
});