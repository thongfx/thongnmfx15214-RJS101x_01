import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const postStaff = ( name, doB, salaryScale, startDate, departmentId, annualLeave, overTime ) => (dispatch) => {
  const newStaff = {
            name: name,
            doB: doB,
            salaryScale: salaryScale,
            startDate: startDate,
            departmentId: departmentId,
            annualLeave: annualLeave,
            overTime: overTime,
            salary: 3000,
            image: '/assets/images/alberto.png',
  }; 
  
    return fetch(baseUrl + 'staffs', {
        method: "POST",
        body: JSON.stringify(newStaff),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addStaffs(response)))
    .catch(error => { console.log('post comments', error.message); alert('Your could not posted new staff\nError: ' + error.message); });
};

export const deleteStaff = (staffid) => () => {
    return fetch(baseUrl + 'staffs/' + staffid, {
        method: "DELETE",
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .catch(error => { console.log('post comments', error.message); alert('You could not delete staff\nError: ' + error.message); });
};

export const patchStaff = ( staffId, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime ) => (dispatch) => {
  const updateStaff = {
            id: staffId,
            name: name,
            doB: doB,
            salaryScale: salaryScale,
            startDate: startDate,
            departmentId: departmentId,
            annualLeave: annualLeave,
            overTime: overTime,
  }; 
  console.log('newstaff', updateStaff);
    return fetch(baseUrl + 'staffs/', {
        method: "PATCH",
        body: JSON.stringify(updateStaff),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
      .then(response => response.json())
      .then(response => dispatch(addStaffs(response)))
      .catch(error => { console.log('patch comments', error.message); alert('Your could not patch staff\nError: ' + error.message); });
};

export const fetchStaffs = () => (dispatch) => {

    dispatch(staffsLoading());

    return fetch(baseUrl + 'staffs')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(staffs => dispatch(addStaffs(staffs)))
    .catch(error => dispatch(staffsFailed(error.message)));
}

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
});

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
});

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});

export const fetchDepartment = () => (dispatch) => {    
      dispatch(departmentLoading());

    return fetch(baseUrl + 'departments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(department => dispatch(addDepartment(department)))
    .catch(error => dispatch(departmentFailed(error.message)));
};
export const departmentLoading = () => ({
    type: ActionTypes.DEPARTMENT_LOADING
});

export const departmentFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENT_FAILED,
    payload: errmess
});

export const addDepartment = (department) => ({
    type: ActionTypes.ADD_DEPARTMENT,
    payload: department
});
