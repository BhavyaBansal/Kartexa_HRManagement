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

export const signin = (email, password) => {
  return axios.post(
    `${API_BASE_URL}/auth/signin/`,
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
  leavebalance,
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
      leavebalance,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
};
