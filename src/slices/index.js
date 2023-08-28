import pensionersReducer from "./admin/pensioners";
import parametersReducer from "./admin/parameters";
import branchesReducer from "./branches";
import sponsorsReducer from "./sponsors";
import uploadsReducer from "./upload";
import beneficiaryReducer from "./beneficiaries";
import departmentReducer from "./departments";
import userReducer from "./users";
import rolesReducer from "./roles";
import dashboardReducer from "./dashboard";



const reducers = {
    pensioners: pensionersReducer,
    parameters: parametersReducer,
    branches: branchesReducer,
    sponsors: sponsorsReducer,
    uploads: uploadsReducer,
    beneficiaries: beneficiaryReducer,
    departments: departmentReducer,
    users: userReducer,
    roles: rolesReducer,
    dashboard: dashboardReducer
}

export default reducers;