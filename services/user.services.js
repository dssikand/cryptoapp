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
