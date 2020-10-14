import bcrypt from "bcryptjs"

const users = [

    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("12345", 10),
        isAdmin: true
    },
    {
        name: "Navraj Kaler",
        email: "navraj@example.com",
        password: bcrypt.hashSync("12345", 10),
    },
    {
        name: "Simran Kaler",
        email: "simran@example.com",
        password: bcrypt.hashSync("12345", 10),
    },

]

export default users