export type User = {
  email: string;
  role: "reader" |"writer" | "admin";
  name: string;
};


export const users: User[] = [
  {
    email: process.env.THE_ECHO_ADMIN_EMAIL || "",
    role: "admin",
    name: "Echo Admin",
  },

  {
    email: process.env.THE_ECHO_WRITER_EMAIL || "",
    role: "writer",
    name: "Student Writer",
  },
];