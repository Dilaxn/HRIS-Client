
import React, {useEffect, useState} from "react";
import axios from "axios";
export default function ProfilePic(props) {
    const [picture, setPicture] = useState(null);
    const [imgData, setImgData] = useState(new FormData());

    const onChangePicture  = (event) => {

      setPicture(event.target.files[0]);

        console.log(event.target.files[0])
    };
    const tokenString = localStorage.getItem('id_token');


    return (
        <div>

            <div>


                    <form>

                        <input id="myfile" type="file" onChange={onChangePicture} />
                            <button
                                onClick={() => {
                                    console.log(imgData)
                                    let data = new FormData();

                                    data.append('avatar', picture)

                                    return axios.patch('/api/employees/me/avatar', data, {
                                        headers: {
                                            Authorization: `Bearer ${tokenString}`,
                                            "Content-type": "multipart/form-data"
                                        }
                                    }).then(res => {
alert("SuccessFully Updated");
                                    })
                                        .catch(err=>alert("error"))
                                }}
                            >Upload!</button>
                    </form>
            </div>

        </div>
    );
}