// Default options for getting all users
export const getUsersOptions = {
    url: "http://localhost:8000/api/users",
    method: "GET",
    header: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8"
    }
  };
  
// Options for getting a single user by ID
export const getUserOptions = (id) => {
    return {
        url: `http://localhost:8000/api/users/${id}`,
        method: "GET",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        }
    };
};

// Options for creating a new user with Ethereum address
export const createUserOptions = (ethereumAddress) => {
    return {
        url: "http://localhost:8000/api/users",
        method: "POST",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: ethereumAddress
    };
};

// Options for deleting a user by ID
export const deleteUserOptions = (id) => {
    return {
        url: `http://localhost:8000/api/users/${id}`,
        method: "DELETE",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        }
    };
};

// Options for generating user access credentials using passphrase
export const generateUserAccessOptions = (userPassPhrase, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/access`,
        method: "GET",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: userPassPhrase
    };
};

// Options for listing objects/files for a user
export const listObjectsOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/list`,
        method: "GET",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

// Options for uploading identity verification documents
export const uploadIdentityOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/upload/identity`,
        method: "POST",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

// Options for uploading medical records
export const uploadRecordOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/upload/record`,
        method: "POST",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

// Options for downloading a single object/file
export const downloadObjectOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/download`,
        method: "POST",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

// Options for downloading multiple objects/files
export const downloadObjectsOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/downloads`,
        method: "POST",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

// Options for updating an object/file
export const updateObjectOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/update`,
        method: "PUT",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

// Options for deleting a single object/file
export const deleteObjectOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/delete`,
        method: "DELETE",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

// Options for deleting multiple objects/files
export const deleteObjectSOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/deletes`,
        method: "DELETE",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

// Options for sharing a single object/file
export const shareObjectOptions = (reqData, id) => {
    return {
        url: `http://localhost:8000/api/users/${id}/share`,
        method: "GET",
        header: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
        },
        data: reqData
    };
};

// Options for sharing multiple objects/files
export const shareObjectsOptions = (reqData, id) => {
return {
    url: `http://localhost:8000/api/users/${id}/shares`,
    method: "GET",
    header: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8"
    },
    data: reqData
};
};

// Options for revoking access to shared objects/files
export const revokeAccessGrantOptions = (reqData, id) => {
return {
    url: `http://localhost:8000/api/users/${id}/revoke`,
    method: "POST",
    header: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8"
    },
    data: reqData
};
};
