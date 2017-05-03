export default (allUsers, id) => {
  const currentUser = allUsers.filter(user => (
    user.id === id));
  return currentUser[0];
};
