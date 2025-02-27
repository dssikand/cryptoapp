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
    const {data} = await Base_URL.get(
      '/puzzle/active',
      params,
    );
    return data;
  } catch (e) {
    return e.response;
  }
 
};
export const CurrentUser = async params => {
  
  try {
    const {data} = await Base_URL.get(
      '/user/me',
      params,
    );
    return data;
  } catch (e) {
    return e.response;
  }
};
export const SubmitCode = async params => {
  
  try {
    const {data} = await Base_URL.post(
      '/user/me/mining-code',
      params,
    );
    return data;
  } catch (e) {
    return e.response;
  }
};
