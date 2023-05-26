export default function headerGen(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return config;
}
