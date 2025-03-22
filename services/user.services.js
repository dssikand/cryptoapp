import Base_URL from '.';

export const SignInUser = async params => {
  try {
    const {data} = await Base_URL.post('/user/passphrase/signin', params);
    return data;
  } catch (e) {
    return e.response;
  }
};

export const SignUpUser = async params => {
  try {
    const {data} = await Base_URL.post(
      '/user/me/finalize-registration',
      params,
    );
    return data;
  } catch (e) {
    return e.response;
  }
};
export const ActiveUser = async params => {
  try {
    const {data} = await Base_URL.get('/puzzle/active', params);
    return data;
  } catch (e) {
    return e.response;
  }
};
export const CurrentUser = async params => {
  try {
    const {data} = await Base_URL.get('/user/me', params);
    return data;
  } catch (e) {
    return e.response;
  }
};
export const SubmitCode = async params => {
  try {
    const {data} = await Base_URL.post('/user/me/mining-code', params);
    return data;
  } catch (e) {
    return e.response;
  }
};
export const LeaderBoard = async params => {
  try {
    const {data} = await Base_URL.get('/leaderboard', params);
    return data;
  } catch (e) {
    return e.response;
  }
};
export const FetchAnnouncement = async params => {
  try {
    const {data} = await Base_URL.get('/announcement?page=1&limit=10', params);
    return data;
  } catch (e) {
    return e.response;
  }
};
export const UserRegister = async params => {
  try {
    const {data} = await Base_URL.post(
      '/user/me/finalize-registration',
      params,
    );
    return data;
  } catch (e) {
    return e.response;
  }
};

export const checkReferalCode = async params => {
  try {
    const {data} = await Base_URL.post('/user/check-referral-code', params);
    return data;
  } catch (e) {
    return e.response;
  }
};

export const deleteUser = async params => {
  try {
    const {data} = await Base_URL.post('/user/me/update', {user:params});
    return data;
  } catch (e) {
    return e.response;
  }
};
