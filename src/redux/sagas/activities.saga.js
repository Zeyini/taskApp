import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getActivities() {
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      // the config includes credentials which
      // allow the server session to recognize the user
      // If a user is logged in, this will return their information
      // from the server session (req.user)
      const response = yield axios.get('/api/actvitiesRouter', config);
      // now that the session has given us a user object
      // with an id and username set the client-side user object to let
      // the client-side code know the user is logged in
      console.log('In GET saga, here is stuff:', response.data);
      yield put({ type:'SET_ACTIVITIES', payload: response.data });
    } catch (error) {
      console.log('Activities GET failed', error);
    }
  }

//post saga
function* postactivities(action) {
  try {
      const config = {
        data: action.payload,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        
      };
      // the config includes credentials which
      // allow the server session to recognize the user
      // If a user is logged in, this will return their information
      // from the server session (req.user)
      const response = yield axios.post('/api/actvitiesRouter', config);
      // now that the session has given us a user object
      // with an id and username set the client-side user object to let
      // the client-side code know the user is logged in
      console.log('In POST saga, response: ', response.data);
      yield put({ type: 'GET_ACTIVITES', payload: response.data }); // bring dom in sync
      // yield put({ type: 'SETPOST_ACTIVITIES', payload: response.data }); // capture user inputs activityname/notes
    } catch (error) {
      console.log('Shelf POST failed', error);
    }
}

//update saga
function* updateprogress(action) {
  try {
      const config = {
        data: action.payload,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      // the config includes credentials which
      // allow the server session to recognize the user
      // If a user is logged in, this will return their information
      // from the server session (req.user)
      const response = yield axios.put('/api/actvitiesRouter', config);
      // now that the session has given us a user object
      // with an id and username set the client-side user object to let
      // the client-side code know the user is logged in
      console.log('In put saga, response: ', response.data);
      yield put({ type: 'GET_ACTIVITES', payload: response.data }); // bring dom in sync
      // yield put({ type: 'SETPOST_ACTIVITIES', payload: response.data }); // capture user inputs activityname/notes
    } catch (error) {
      console.log('Shelf POST failed', error);
    }
}

//delete comment saga
function* deletenote(action) {
  try {
      const config = {
        data: action.payload,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      // the config includes credentials which
      // allow the server session to recognize the user
      // If a user is logged in, this will return their information
      // from the server session (req.user)
      console.log('here is what we are sending to server',config)
      const response = yield axios.delete('/api/actvitiesRouter', config);
      
      // now that the session has given us a user object
      // with an id and username set the client-side user object to let
      // the client-side code know the user is logged in
      console.log('IN DELETE SAGA, response: ', response.data);
      yield put({ type: 'GET_ACTIVITES', payload: response.data }); // bring dom in sync
      // yield put({ type: 'SETPOST_ACTIVITIES', payload: response.data }); // capture user inputs activityname/notes
    } catch (error) {
      console.log('Shelf POST failed', error);
    }
}

//update status of MONDAY
function* updatestatus(action) {
  try {
      const config = {
        data: action.payload,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      // the config includes credentials which
      // allow the server session to recognize the user
      // If a user is logged in, this will return their information
      // from the server session (req.user)
      const response = yield axios.put('/api/actvitiesRouter/update-status-monday', config);
      // now that the session has given us a user object
      // with an id and username set the client-side user object to let
      // the client-side code know the user is logged in
      console.log('In put saga, response for STATUS: ', response.data);
      yield put({ type: 'GET_ACTIVITES', payload: response.data }); // bring dom in sync

      // yield put({ type: 'SETPOST_ACTIVITIES', payload: response.data }); // capture user inputs activityname/notes
    } catch (error) {
      console.log('Shelf POST failed', error);
    }
}
//update status of TUESDAY
function* updatestatusT(action) {
  try {
      const config = {
        data: action.payload,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      const response = yield axios.put('/api/actvitiesRouter/update-status-tuesday', config);
      console.log('In put saga, response for T STATUS: ', response.data);
      yield put({ type: 'GET_ACTIVITES', payload: response.data }); // bring dom in sync
    } catch (error) {
      console.log('tuesday update failed', error);
    }
}
//update status of WEDNESDAY
function* updatestatusW(action) {
  try {
      const config = {
        data: action.payload,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      const response = yield axios.put('/api/actvitiesRouter/update-status-wednesday', config);
      console.log('In put saga, response for T STATUS: ', response.data);
      yield put({ type: 'GET_ACTIVITES', payload: response.data }); // bring dom in sync
    } catch (error) {
      console.log('tuesday update failed', error);
    }
}
//update status of THURSDAY
function* updatestatusTH(action) {
  try {
      const config = {
        data: action.payload,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      const response = yield axios.put('/api/actvitiesRouter/update-status-thursday', config);
      console.log('In put saga, response for T STATUS: ', response.data);
      yield put({ type: 'GET_ACTIVITES', payload: response.data }); // bring dom in sync
    } catch (error) {
      console.log('tuesday update failed', error);
    }
}
//update status of FRIDAY
function* updatestatusF(action) {
  try {
      const config = {
        data: action.payload,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      const response = yield axios.put('/api/actvitiesRouter/update-status-friday', config);
      console.log('In put saga, response for T STATUS: ', response.data);
      yield put({ type: 'GET_ACTIVITES', payload: response.data }); // bring dom in sync
    } catch (error) {
      console.log('tuesday update failed', error);
    }
}
//update status of SATURDAY
function* updatestatusS(action) {
  try {
      const config = {
        data: action.payload,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      const response = yield axios.put('/api/actvitiesRouter/update-status-saturday', config);
      console.log('In put saga, response for T STATUS: ', response.data);
      yield put({ type: 'GET_ACTIVITES', payload: response.data }); // bring dom in sync
    } catch (error) {
      console.log('tuesday update failed', error);
    }
}
//update status of SUNDAY
function* updatestatusSU(action) {
  try {
      const config = {
        data: action.payload,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      const response = yield axios.put('/api/actvitiesRouter/update-status-sunday', config);
      console.log('In put saga, response for T STATUS: ', response.data);
      yield put({ type: 'GET_ACTIVITES', payload: response.data }); // bring dom in sync
    } catch (error) {
      console.log('tuesday update failed', error);
    }
}
function* activitiesSaga() {
    yield takeLatest('GET_ACTIVITES', getActivities);
    yield takeLatest('ADD_INPUT_POST', postactivities);
    yield takeLatest('UPDATE_PROGRESS', updateprogress);
    yield takeLatest('DELETE NOTE', deletenote);
    yield takeLatest('TOGGLE_STATUS_M', updatestatus);
    yield takeLatest('TOGGLE_STATUS_T', updatestatusT);
    yield takeLatest('TOGGLE_STATUS_W', updatestatusW);
    yield takeLatest('TOGGLE_STATUS_TH', updatestatusTH);
    yield takeLatest('TOGGLE_STATUS_F', updatestatusF);
    yield takeLatest('TOGGLE_STATUS_S', updatestatusS);
    yield takeLatest('TOGGLE_STATUS_SU', updatestatusSU);
  }



export default activitiesSaga;