const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
dotenv.config();

AdminBro.registerAdapter(AdminBroMongoose);
const User = require("../models/user.model");
const Plant = require("../models/plant.model");
const Info = require("../models/info.model");

const adminBro = new AdminBro({
  databeses: [mongoose],
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: {
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: true
            }
          }
        },
        actions: {
          new: {
            before: async request => {
              if (request.payload.password) {
                const salt = await bcrypt.genSalt(10);
                request.payload = {
                  ...request.payload,
                  password: await bcrypt.hash(request.payload.password, salt)
                };
              }
              return request;
            }
          }
        }
      }
    },
    Plant,
    Info
  ],
  rootPath: "/admin",
  dashboard: {
    component: AdminBro.bundle("../admin/dashboard.tsx")
  },
  branding: {
    companyName: "Plantify Admin",
    logo:
      "https://cdn3.iconfinder.com/data/icons/eco-flat-2/512/Eco_leaves_nature-512.png",
    softwareBrothers: false
  }
});

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;
