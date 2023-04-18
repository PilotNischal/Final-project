export const getAccessTokenFromLocalStorage = () => {
  let user = JSON.parse(localStorage.getItem('willowdale'));
  return user;
};

export const setAccessTokenFromLocalStorage = (key) => {
  localStorage.setItem('willowdale', JSON.stringify(key));
};
export const getAdminAccessTokenFromLocalStorage = () => {
  let user = JSON.parse(localStorage.getItem('willowdaleadmin'));
  return user;
};

export const setAdminAccessTokenFromLocalStorage = (key) => {
  localStorage.setItem('willowdaleadmin', JSON.stringify(key));
};

export const setOtpTokenToLocalStorage = (otpToken) =>
  localStorage.setItem('otpTokenuserdgmp', otpToken);

export const getOtpTokenFromLocalStorage = () =>
  localStorage.getItem('otpTokenuserdgmp');

export const isOtpTokenRemoveFromLocalStorage = () => {
  localStorage.removeItem('otpToken');
  return !localStorage.getItem('optToken') ? true : false;
};

export const setUserDetailsToLocalStorage = (userDetails) =>
  localStorage.setItem('willowdale', JSON.stringify(userDetails));
export const setUserEmailToLocalStorage = (userDetails) =>
  localStorage.setItem('willowdaleemail', JSON.stringify(userDetails));
export const getUserEmailFromLocalStorage = () =>
  JSON.parse(localStorage.getItem('willowdaleemail'));

export const getUserFromLocalStorage = () => {
  let user = typeof window !== 'undefined' && getUserStringFromLocalStorage();
  return user ? user : null;
};
export const getUserStringFromLocalStorage = () => {
  let user =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('willowdaleadname'));
  return user ? user : null;
};

export const isRemoveUserFromLocalStorage = () => {
  localStorage.removeItem('willowdale');
  localStorage.removeItem('willowdaleadname');
  localStorage.removeItem('willowdalerefer');
  localStorage.removeItem('willowdaleprofile');
  localStorage.removeItem('willowdaleemail');
  localStorage.removeItem('otpTokenuserdgmp');
  localStorage.removeItem('willowdalephone');
  return !JSON.parse(localStorage.getItem('willowdale')) ? true : false;
};

export const doesUserExistInLocalStorage = () => {
  if (!getUserFromLocalStorage()) {
    window.location.href = '/signin';
    return;
  }
  return;
};

export const getUserIdFromLocalStorage = () => {
  const details = JSON.parse(localStorage?.getItem('willowdale'));

  return details?.user?._id;
};
export const getUserImageFromLocalStorage = () => {
  const profile =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('willowdaleprofile'))
      : '';
  return profile;
};
export const setUserImageToLocalStorage = (userImage) => {
  typeof window !== 'undefined' &&
    localStorage.setItem('willowdaleadprofile', JSON.stringify(userImage));
};
export const removeUserImageFromLocalStorage = () => {
  typeof window !== 'undefined' &&
    localStorage.removeItem('willowdaleadprofile');
};
export const setUserReferrer = (referrer) => {
  typeof window !== 'undefined' &&
    localStorage.setItem('willowdaleadrefer', JSON.stringify(referrer));
};
export const getUserRefererFromLocalStorage = () => {
  const profile =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('willowdaleadrefer'))
      : '';
  return profile;
};

export const getUsernameFromLocalstorage = () => {
  const profile =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('willowdaleadname'))
      : '';
  return profile;
};
export const getUserPhoneFromLocalstorage = () => {
  const profile =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('willowdaleadphone'))
      : '';
  return profile;
};
export const setUsernameToLocalStorage = (name) => {
  typeof window !== 'undefined' &&
    localStorage.setItem('willowdaleadname', JSON.stringify(name));
};
export const setUserphoneToLocalStorage = (name) => {
  typeof window !== 'undefined' &&
    localStorage.setItem('willowdaleadphone', JSON.stringify(name));
};

export const setUnverifiedEmailToLocalStorage = (email) => {
  localStorage.setItem('willowdale-unverified', JSON.stringify(email));
};
export const getUnverifiedEmailFromLocalstorage = () => {
  const resp = JSON.parse(localStorage.getItem('willowdale-unverified'));
  return resp;
};
export const setForgotEmailToLocalStorage = (email) => {
  localStorage.setItem('willowdale-unverified', JSON.stringify(email));
};
export const getForgotEmailFromLocalstorage = () => {
  const resp = JSON.parse(localStorage.getItem('willowdale-unverified'));
  return resp;
};

export const setAdminDetailsToLocalStorage = (AdminDetails) =>
  localStorage.setItem('willowdale', JSON.stringify(AdminDetails));

export const getAdminFromLocalStorage = () => {
  let Admin = typeof window !== 'undefined' && getAdminStringFromLocalStorage();
  return Admin ? Admin : null;
};
export const getAdminStringFromLocalStorage = () => {
  let Admin =
    typeof window !== 'undefined' &&
    JSON.parse(localStorage.getItem('willowdaleadminname'));
  return Admin ? Admin : null;
};
export const setAdminUsernameToLocalStorage = (name) => {
  typeof window !== 'undefined' &&
    localStorage.setItem('willowdaleadminname', JSON.stringify(name));
};
