export const getUsers = async page => {
  const users = await (
    await fetch(`https://randomuser.me/api/?page=${page}&results=5`)
  ).json();
  return users.results;
};