import axios from 'axios';
const API_BASE_URL = 'http://10.0.2.2:3000/api';

export const signinemp = (email, password) => {
  return axios.post(
    `${API_BASE_URL}/employee/signinemp/`,
    {email, password},
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const updatepassword = (id, pass) => {
  return axios.put(
    `${API_BASE_URL}/employee/updatepasswordbyId`,
    {
      id,
      pass,
    },
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
export const updateoneemployee = (
  empId,
  name,
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
) => {
  return axios.put(
    `${API_BASE_URL}/employee/updateoneEmployeeById/${empId}`,
    {
      name,
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
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};
export const sendEmail = mailOptions => {
  // console.log(hrId, 'Hr');
  return axios.post(`${API_BASE_URL}/auth/sendEmail`, {mailOptions});
};
export const clockIn = (
  hrId,
  empId,
  name,
  email,
  phonenumber,
  department,
  designation,
) => {
  return axios.post(
    `${API_BASE_URL}/clockinout/clockin`,
    {
      hrId,
      empId,
      name,
      email,
      phonenumber,
      department,
      designation,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const clockOut = (cid, inTime) => {
  return axios.put(
    `${API_BASE_URL}/clockinout/clockout`,
    {cid, inTime},
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};

export const getidbyemail = email => {
  return axios.post(
    `${API_BASE_URL}/employee/getidbyemail`,
    {email},
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};
