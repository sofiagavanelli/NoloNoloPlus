import { useState } from 'react';

export default function ClearToken() {
  const [token, setToken] = useState();

  const saveToken = userToken => {
    sessionStorage.clear();
    setToken(false);
  };
  return {
    ClearToken: saveToken,
    token
  }
}