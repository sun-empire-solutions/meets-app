import { User } from "firebase/auth";

const getUserInitials = (user: User): string => {
  const displayName = user?.providerData?.[0]?.displayName;
  if (displayName) {
    const names = displayName.split(" ");
    return names
      .map((name) => name.charAt(0))
      .join("")
      .substring(0, names.length == 1 ? 1 : 2);
  }
  const emailInitial = user?.providerData?.[0].email
    .substring(0, 2)
    .toUpperCase();
  return emailInitial;
};

export { getUserInitials };
