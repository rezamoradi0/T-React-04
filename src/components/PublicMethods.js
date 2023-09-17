import axios from "axios";

export function SaveToLocal(key, value) {
  localStorage.setItem(key, value);
}
export function GetToLocal(key) {
  return localStorage.getItem(key);
}
export function RemvoeItemLocal(key) {
  return localStorage.removeItem(key);
}

/**
 * Get Persoanl Data
 * @returns Personal Info Object
 */
export async function GetPersonalData() {
  const userId = GetToLocal("userId");
  const userToken = GetToLocal("token");
  const userInfo = await axios
    .get(`http://localhost:3001/users/${userId}`)
    .then((res) => res.data);
  console.log(userInfo);
  if (userInfo.token == userToken) {
    return userInfo;
  } else {
    return { error: "some thing wrong" };
  }
}
/**
 * Get All Users Info
 * @returns AllUser In Site Object
 */
export async function GetAllUsers() {
  const allUsersObj = await axios
    .get(`http://localhost:3001/users/`)
    .then((res) => res.data);
  console.log(allUsersObj);
  return allUsersObj;
}

export async function RemoveSomeUser(id) {
  const userId = GetToLocal("userId");
  const userToken = GetToLocal("token");
  const userInfo = await axios
    .get(`http://localhost:3001/users/${userId}`)
    .then((res) => res.data)
    .catch((error) => "someError");
  if (userInfo.token == userToken && userInfo.type == "admin") {
    const targetInfo = await axios
      .get(`http://localhost:3001/users/${id}`)
      .then((res) => res.data)
      .catch(false);
    console.log(targetInfo);
    alert(id);
    if (targetInfo.type == "admin") return false;
    alert(targetInfo.type);
    const result = await axios
      .delete(`http://localhost:3001/users/${id}`)
      .catch(false);
    console.log("result of Delete : " + result);

    return result ? true : false;
  } else {
    return false;
  }
}
export async function GetAllTerms() {
  const termsData = await axios
    .get("http://localhost:3001/terms/")
    .then((res) => res.data)
    .catch((e) => false);
  if (termsData == false) return null;
  return termsData;
}

export async function RemoveSomeTerm(id) {
  const userId = GetToLocal("userId");
  const userToken = GetToLocal("token");
  const userInfo = await axios
    .get(`http://localhost:3001/users/${userId}`)
    .then((res) => res.data)
    .catch((error) => "someError");
  if (userInfo.token == userToken && userInfo.type == "admin") {
    const result = await axios
      .delete(`http://localhost:3001/terms/${id}`)
      .catch(false);
    console.log("result of Delete : " + result);

    return result ? true : false;
  }
  return false;
}

export async function AddNewStudent(studentObj) {
  
  const res = await axios
    .post("http://localhost:3001/users/", studentObj)
    .then((res) => res.data)
    .catch((error) => "error");
  return res;
}
