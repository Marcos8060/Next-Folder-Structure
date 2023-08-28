//------------------------ Backend APIs ----------------------//
export const API_URL = {
    /***************** PENSIONERS APIS **********************/
    GET_PENSIONERS: '/api/v1/Pensioners/pensioners',
    SEARCH_PENSIONER: '/api/v1/Pensioners/search',
    GET_PENSIONER: '/api/v1/Pensioners/pensionerdetails',
    ADD_PENSIONER: '/api/v1/Pensioners',
    UPDATE_PENSIONER: '/api/v1/Pensioners',
    DELETE_PENSIONER: '/api/v1/Pensioners',

    /***************** BANKS APIS **********************/
    GET_BANKS: 'api/v1/Parameter/banks',
    ADD_BANK: 'api/v1/Parameter/bank',
    UPDATE_BANK: 'api/v1/Parameter/bank',

    /***************** CYCLES APIS **********************/
    GET_CYCLES: 'api/v1/Parameter/cycles',
    GET_CYCLE: 'api/v1/Parameter/cyclesdata',
    ADD_CYCLE: 'api/v1/Parameter/bank',
    ACTIVATE_CYCLE: 'api/v1/Parameter/cycle/activate',

    /***************** BANK BRANCHES APIS **********************/
    GET_BANK_BRANCHES: 'api/v1/Parameter/bank',
    ADD_BANK_BRANCH: 'api/v1/Parameter/bankbranch',
    UPDATE_BANK_BRANCH: 'api/v1/Parameter/bankbranch',

    /***************** REGIONS APIS **********************/
    GET_REGIONS: 'api/v1/Parameter/regions',

    /***************** PENSIONER STATUS APIS **********************/
    GET_PENSIONER_STATUS: 'api/v1/Parameter/pensionerstatus',

    /***************** PENSIONER STATUS APIS **********************/
    GET_PENSIONER_TYPES: 'api/v1/Parameter/pensionertype',


    /***************** AUTHENTICATION APIS **********************/
    // LOGIN: '/api/v1/sponsorauth/login',
    LOGIN: '/api/v1/authentication/login',
    REFRESH_TOKEN: '/api/refresh',

    GET_BRANCHES: '/api/v1/branches/getbranches',
    GET_SPONSORS: '/api/v1/sponsor/getsponsor',
    ADD_SPONSOR: '/api/v1/sponsor/addsponsor',
    ADD_SPONSOR_USER: '/api/v1/sponsor/addsponsorusers',
    GET_SPONSOR_USER: '/api/v1/sponsor/getsponsorusers',
    UPLOAD_FILE: '/api/v1/uploadfile/uploadfile',
    SAVE_UPLOADED_FILE: '/api/v1/uploadfile/completeuploads',


    GET_SPONSORS_ACTIVE_BENEFICIARIES: '/api/v1/beneficiary/getbeneficiaries',
    GET_SPONSORS_REJECTED_BENEFICIARIES: '/api/v1/beneficiary/getfailedbeneficiaries',

    GET_FILE_UPLOADS: '/api/v1/uploadfile/getfileuploads',
    GET_FAILED_UPLOADS: '/api/v1/uploadfile/getfaileduploads',


    /***************** BANK BRANCHES APIS **********************/
    CREATE_DEPARTMENT: '/api/v1/branches/createdepartments',
    GET_DEPARTMENT: '/api/v1/branches/getdepartments',
    DELETE_DEPARTMENT: '/api/v1/branches/deletedepartment',
    UPDATE_DEPARTMENT: '/api/v1/branches/updatedepartment',
    GET_COUNTIES: '/api/v1/branches/getcounties',

    // USERS
    CREATE_USER: '/api/v1/adminusers/createuser',
    GET_USER: '/api/v1/adminusers/getusers',

    GET_BENEFICIARIES: '/api/v1/beneficiary/viewallbeneficiary',
    GET_FAILED_BENEFICIARIES: '/api/v1/beneficiary/getfailedbeneficiaries',

    /***************** ROLES APIS **********************/
    GET_ROLES: '/api/v1/account/getroles',
    GET_ROLE: '/api/v1/account/getrole',
    ADD_ROLE: '/api/v1/account/addrole',
    GET_PERMISSIONS: '/api/v1/account/getallpermissions',
    ADD_ROLE_PERMISSION: '/api/v1/account/addrolesandpermissions',

    GET_MENUS: 'api/v1/account/getmenus',
    GET_DASHBOARD: 'api/v1/branchdashboard/getdashbooard',

}


//------------------------ Application APIs ----------------------//
export const APP_API_URL = {

    GET_BRANCHES: '/api/branches',
    GET_SPONSORS: '/api/sponsors',
    GET_SPONSORS_BENEFICIARIES: '/api/sponsors/beneficiaries',
    ADD_SPONSOR: '/api/sponsors',
    ADD_DEPARTMENT: '/api/departments',
    DELETE_DEPARTMENT: '/api/departments',
    UPDATE_DEPARTMENT: '/api/departments/updatedepartment',
    GET_DEPARTMENT: '/api/departments',
    GET_COUNTIES: '/api/counties',
    ADD_USER: '/api/users',
    GET_USER: '/api/users/getusers',
    UPLOAD_FILE: '/api/upload',
    GET_BENEFICIARIES: '/api/beneficiaries',
    GET_FAILED_BENEFICIARIES: '/api/beneficiaries/inactive',

    GET_DASHBOARD: '/api/dashboard',

    SEARCH_PENSIONERS: '/api/admin/pensioners/search',

    /***************** PARAMETERS APIS **********************/
    GET_BANKS: '/api/admin/parameters/banks',
    GET_BANKS_BRANCHES: '/api/admin/parameters/bank-branches',
    GET_CYCLES: '/api/admin/parameters/cycles',
    GET_REGIONS: '/api/admin/parameters/regions',
    GET_PENSIONER_STATUS: '/api/admin/parameters/pensioner-status',
    GET_PENSIONER_TYPES: '/api/admin/parameters/pensioner-types',

    GET_FILE_UPLOADS: '/api/upload/uploads',
    GET_FAILED_UPLOADS: '/api/upload/failed',

    /***************** ROLES APIS **********************/
    GET_ROLES: '/api/roles',
    GET_PERMISSIONS: '/api/roles/permissions',
    GET_MENUS: '/api/menus',

    LOGIN: '/api/admin/login',
    REFRESH_TOKEN: '/api/admin/refresh-token',


}

export const API_METHODS = {
    GET:'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE'
}
