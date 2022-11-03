import {objectToFormData} from "object-to-formdata";
import domain from "../../constants/Domain";
import {imageProcessor} from "../../utilities/utilities";


export const loginSocial = (token, backend) => {
    const myObj = {
        grant_type: 'convert_token',
        client_id: 'JN8xQTpthEVoYErHcfipm9wMjksjWanBLLYSnKsz',
        client_secret: 'e6t0QLaoeC2PtUTyhWjwIXSfa76oBFVajZizbfpGZSmEcZ4zueDnubvaNKS65cwPpKbmQENS1iOBIv5I7UTy3mmnWyEFMCAKAH6bZ6n485XlGYA9YEih7Ar6uJAyiWCD',
        backend: backend,
        token: token
    };
    const formData = objectToFormData(myObj);
    return async (dispatch) => {
        try {
            const response = await fetch(`${domain}/houses/auth/convert-token`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            })
            if (response.status != 200) {
                throw new Error("Something went wrong");
            }

            const resData = await response.json();
            console.log(resData);

        } catch (err) {
            throw err
        }
    }
};


export const loginNormal = (username, password) => {
    const myObj = {
        username: username,
        password: password
    };
    const formData = objectToFormData(myObj);

    return async (dispatch) => {
        try {
            const response = await fetch(`${domain}/houses/token/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            })
            if (response.status != 200) {
                const resData = await response.json();
                if (resData.non_field_errors) {
                    throw new Error(resData.non_field_errors[0]);
                } else {
                    throw new Error("Something went wrong");
                }

            }

            const resData = await response.json();
            console.log(resData);

        } catch (err) {
            throw err
        }
    }

};

export const resetPassword = (email) => {
    const myObj = {
        email: email
    };
    const formData = objectToFormData(myObj);

    return async (dispatch) => {
        try {
            const response = await fetch(`${domain}/houses/users/reset_password/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            })
            if (response.status != 204) {
                const resData = await response.json();
                throw new Error(resData[0]);
            }


        } catch (err) {
            throw err
        }
    }

};

export const createUser = (username, email, firstName, lastName, image, password, re_password) => {

    const myObj = {
        username: username,
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
        re_password: re_password
    };
    const formData = objectToFormData(myObj);
    if (image) {
        const pic = imageProcessor(image);
        formData.append("picture", pic, pic.name);
    }

    return async (dispatch) => {
        try {
            const response = await fetch(`${domain}/houses/users/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            })
            if (response.status != 201) {
                const resData = await response.json();
                console.log(resData);
                if (resData.email) {
                    throw new Error(resData.email[0]);
                }
                if (resData.username) {
                    throw new Error(resData.username[0]);
                }
                if (resData.password) {
                    console.log(resData);
                    throw new Error(resData.password[0]);
                }
                if (resData.non_field_errors) {
                    throw new Error(resData.non_field_errors[0]);
                } else {
                    throw new Error('Something went terribly wrong.');
                }
            }

            const resData = await response.json();
            console.log(resData);

        } catch (err) {
            throw err
        }
    }

};
