import React, {useState} from "react";
import axios from "axios";

const tokenString = localStorage.getItem('id_token');

export {readEmpProfilePic };

function readEmpProfilePic() {
    return Promise.resolve().then(() => {
        return  axios.get('/employees/604706c638c7f10c93f6c1a7/avatar', {
            headers: {
                Authorization: `Bearer ${tokenString}`,
            },

        })
            // .then((res) => {
            //     console.log(res.json)
            //         res.json()
            //     }
            // )
            .then((data) => {
                // console.log(img)
                var base64Flag = 'data:image/jpeg;base64,';
                // console.log(data)
                // var imageStr = this.arrayBufferToBase64(data.data);

                   // return  base64Flag + imageStr;
                return data.data;

    })
            .catch((err) => {
                console.log('Unable access ...');
            });

    });
}
