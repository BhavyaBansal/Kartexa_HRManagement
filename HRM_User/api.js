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
  leavebalance,
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
      leavebalance,
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
