"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const roleRoutes_1 = __importDefault(require("./Routes/roleRoutes"));
const roleGroupRoutes_1 = __importDefault(require("./Routes/roleGroupRoutes"));
const userRoleRoutes_1 = __importDefault(require("./Routes/userRoleRoutes"));
const authRoutes_1 = __importDefault(require("./Routes/authRoutes"));
const dashboardRoutes_1 = __importDefault(require("./Routes/dashboardRoutes"));
const utilityRoutes_1 = __importDefault(require("./Routes/utilityRoutes"));
const auth_1 = __importDefault(require("./middleWares/auth"));
const routesProtection_1 = __importDefault(require("./middleWares/routesProtection"));
const cors_1 = __importDefault(require("cors"));
const baseURL = process.env.BASE_URL;
var whitelist = ['http://localhost:3000'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 ) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(`${baseURL}/user`, auth_1.default, (0, routesProtection_1.default)('Manage Users'), userRoutes_1.default);
app.use(`${baseURL}/role`, auth_1.default, (0, routesProtection_1.default)('Manage Roles'), roleRoutes_1.default);
app.use(`${baseURL}/roleGroup`, auth_1.default, (0, routesProtection_1.default)('Manage Role Groups'), roleGroupRoutes_1.default);
app.use(`${baseURL}/userRole`, auth_1.default, (0, routesProtection_1.default)('Assign Roles'), userRoleRoutes_1.default);
app.use(`${baseURL}/dashboard`, dashboardRoutes_1.default);
app.use(`${baseURL}/utility`, utilityRoutes_1.default);
app.use(`${baseURL}/auth`, authRoutes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
