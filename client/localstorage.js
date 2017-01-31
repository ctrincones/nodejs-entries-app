export const loadUserData = () => {
  try  {
    const serializedData  = localStorage.getItem('userdata');
    if(serializedData === null){
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    return undefined;
  }
}

export const saveUserData = (UserData) => {
  try {
    const serializedData = JSON.stringify(UserData);
    localStorage.setItem('userdata',serializedData);
    console.log("token saved to localStorage");
  } catch (err) {
    console.log(err);
  }
}
