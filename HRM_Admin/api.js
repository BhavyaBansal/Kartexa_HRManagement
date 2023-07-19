import axios from 'axios';
const API_BASE_URL = 'http://10.0.2.2:3000/api';
export const signup = (fullname, phonenumber, email, password) => {
  //   console.log(fullname, phonenumber, email, password);
  return axios.post(
    `${API_BASE_URL}/auth/signup/`,
    {
      fullname,
      phonenumber,
      email,
      password,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const signin = async (email, password) => {
  return axios.post(
    `${API_BASE_URL}/auth/signin/`,
    {email, password},
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
  // try {
  //   const signInres = axios.post(`${API_BASE_URL}/auth/signin/`, {
  //     email,
  //     password,
  //   });
  //   // if (signInres) {
  //   //   const token = signInres.token;
  //   //   await AsyncStorage.setItem('token', token);
  //   // }
  //   console.log(signInres);
  //   return signInres;
  // } catch (error) {
  //   console.log('Error inside signin method', error.message);
  // }
};

export const sendEmail = mailOptions => {
  // console.log(hrId, 'Hr');
  return axios.post(`${API_BASE_URL}/auth/sendEmail`, {mailOptions});
};

export const updatePassword = (email, password) => {
  return axios.put(
    `${API_BASE_URL}/auth/updatepassword`,
    {email, password},
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const addemployee = (
  hrId,
  name,
  email,
  temppassword,
  phonenumber,
  aadharnumber,
  pannumber,
  address,
  dateofbirth,
  gender,
  maritalstatus,
  emergencycontactname,
  emergencycontactnumber,
  accountnumber,
  ifsccode,
  department,
  designation,
  joiningdate,
  employmentstatus,
  probationenddate,
  confirmationdate,
  salary,
  managername,
  // leavebalance,
) => {
  return axios.post(
    `${API_BASE_URL}/employee/addemployee`,
    {
      hrId,
      name,
      email,
      temppassword,
      phonenumber,
      aadharnumber,
      pannumber,
      address,
      dateofbirth,
      gender,
      maritalstatus,
      emergencycontactname,
      emergencycontactnumber,
      accountnumber,
      ifsccode,
      department,
      designation,
      joiningdate,
      employmentstatus,
      probationenddate,
      confirmationdate,
      salary,
      managername,
      // leavebalance,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const getemployeedata = hrId => {
  // console.log(hrId, 'Hr');
  return axios.get(`${API_BASE_URL}/employee/getemployeedata/${hrId}`);
};
export const getemployeesobject = hrId => {
  // console.log(hrId, 'Hr');
  return axios.get(`${API_BASE_URL}/employee/getemployeesobject/${hrId}`);
};

export const deletedEmployee = empId => {
  // console.log(empId, 'Employee');
  return axios.delete(`${API_BASE_URL}/employee/deleteEmployee/${empId}`);
};

export const updateemployee = (
  empId,
  name,
  email,
  temppassword,
  phonenumber,
  department,
  designation,
  joiningdate,
  employmentstatus,
  probationenddate,
  confirmationdate,
  salary,
  managername,
  // leavebalance,
) => {
  return axios.put(
    `${API_BASE_URL}/employee/updateEmployeeById/${empId}`,
    {
      name,
      email,
      temppassword,
      phonenumber,
      department,
      designation,
      joiningdate,
      employmentstatus,
      probationenddate,
      confirmationdate,
      salary,
      managername,
      // leavebalance,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const getclockindetails = (date, hrId) => {
  // console.log(hrId+"Hello");
  return axios.get(`${API_BASE_URL}/clockinout/clockindetails/${date}${hrId}`);
};
export const getclockoutdetails = (date, hrId) => {
  return axios.get(`${API_BASE_URL}/clockinout/clockoutdetails/${date}${hrId}`);
};

export const checkforpassupdated = id => {
  return axios.post(
    `${API_BASE_URL}/employee/checkforpassupdated`,
    {id},
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const schedulemeet = (
  hrId,
  topic,
  description,
  goals,
  teamname,
  teamsize,
  date,
  time,
  duration,
  link,
  participants,
) => {
  return axios.post(
    `${API_BASE_URL}/meeting/schedulemeet`,
    {
      hrId,
      topic,
      description,
      goals,
      teamname,
      teamsize,
      date,
      time,
      duration,
      link,
      participants,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const getcurrentmonthleaves = (hrId, month, status) => {
  return axios.post(
    `${API_BASE_URL}/leave/getmonthleaves2`,
    {hrId, month, status},
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const updatestatusbyid = (leaveId, status) => {
  return axios.post(
    `${API_BASE_URL}/leave/updatestatusbyid`,
    {leaveId, status},
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const getoneemployeedata = empId => {
  // console.log(hrId, 'Hr');
  return axios.get(`${API_BASE_URL}/employee/getoneemployeedata/${empId}`);
};

export const updateLeavesById = (empId, type, noOfDays) => {
  return axios.post(
    `${API_BASE_URL}/employee/updateLeavesById`,
    {empId, type, noOfDays},
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const getallmeetinformat = hrId => {
  return axios.post(
    `${API_BASE_URL}/meeting/getallmeetinformat`,
    {hrId},
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const getalltimesheetsbydate = (hrId, date) => {
  return axios.post(
    `${API_BASE_URL}/timesheet/getalltimesheetsbydate`,
    {hrId, date},
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const addholiday = (hrId,reason,description,date) =>{
  return axios.post(
    `${API_BASE_URL}/holiday/addholiday`,
    {hrId, reason, description, date},
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
}