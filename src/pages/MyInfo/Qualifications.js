import {FormControlLabel, Radio, RadioGroup, Switch, TextField} from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, {useState} from "react";
import MUIDataTable from "mui-datatables";
const datatableData = [
    ["Joe James", "Example Inc.", "Yonkers", "NY"],
    ["John Walsh", "Example Inc.", "Hartford", "CT"],
    ["Bob Herm", "Example Inc.", "Tampa", "FL"],
    ["James Houston", "Example Inc.", "Dallas", "TX"],
    ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
    ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
    ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
    ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
    ["Meral Elias", "Example Inc.", "Hartford", "CT"],
    ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
    ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
    ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
    ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
    ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
    ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
    ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
    ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

export default function Qualifications(props) {
    let [showForm, setShowForm] = useState(false);
    let [showForm2, setShowForm2] = useState(false);
    let [showForm3, setShowForm3] = useState(false);
    let [showForm4_1, setShowForm4_1] = useState(false);
    let [showForm4_2, setShowForm4_2] = useState(false);
    let [showForm4_3, setShowForm4_3] = useState(false);
    let [showForm4_4, setShowForm4_4] = useState(false);
    let [showForm4_5, setShowForm4_5] = useState(false);
    let [showForm4_6, setShowForm4_6] = useState(false);
    let [showForm5, setShowForm5] = useState(false);

    let showF = () => {
        setShowForm(!showForm);
    }

    let showF2 = () => {
        setShowForm2(!showForm2);
    }
    let showF3 = () => {
        setShowForm3(!showForm3);
    }
    let showF4_1 = () => {
        setShowForm4_1(!showForm4_1);
    }
    let showF4_2 = () => {
        setShowForm4_2(!showForm4_2);

    }
    let showF4_3 = () => {
        setShowForm4_3(!showForm4_3);
    }
    let showF4_4 = () => {
        setShowForm4_4(!showForm4_4);
    }
    let showF4_5 = () => {
        setShowForm4_5(!showForm4_5);
    }
    let showF4_6 = () => {
        setShowForm4_6(!showForm4_6);
    }
    let showF5 = () => {
        setShowForm5(!showForm5);
    }

    let value=props.value
    let  handleChange=props.handleChange
    return (
        <div>

            <div>
                <div>
                    <form>
                        {!showForm4_1 && (
                            <button onClick={showF4_1}> Add</button>)}
                        {showForm4_1 && (
                            <button onClick={showF4_1}> Cancel</button>)}
                    </form>

                    {showForm4_1 && (
                        <form>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <br/>
                            <button> Save</button>
                        </form>
                    )}
                </div>
                <MUIDataTable
                    title="Employee List"
                    data={datatableData}
                    columns={["Name", "Company", "City", "State"]}
                    options={{
                        filterType: "checkbox",
                    }}
                />
            </div>
            <div>
                <div>
                    <form>
                        {!showForm4_2 && (
                            <button onClick={showF4_2}> Add</button>)}
                        {showForm4_2 && (
                            <button onClick={showF4_2}> Cancel</button>)}
                    </form>

                    {showForm4_2 && (
                        <form>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <br/>
                            <button> Save</button>
                        </form>
                    )}
                </div>
                <MUIDataTable
                    title="Employee List"
                    data={datatableData}
                    columns={["Name", "Company", "City", "State"]}
                    options={{
                        filterType: "checkbox",
                    }}
                />
            </div>
            <div>
                <div>
                    <form>
                        {!showForm4_3 && (
                            <button onClick={showF4_3}> Add</button>)}
                        {showForm4_3 && (
                            <button onClick={showF4_3}> Cancel</button>)}
                    </form>

                    {showForm4_3 && (
                        <form>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <br/>
                            <button> Save</button>
                        </form>
                    )}
                </div>
                <MUIDataTable
                    title="Employee List"
                    data={datatableData}
                    columns={["Name", "Company", "City", "State"]}
                    options={{
                        filterType: "checkbox",
                    }}
                />
            </div>
            <div>
                <div>
                    <form>
                        {!showForm4_4 && (
                            <button onClick={showF4_4}> Add</button>)}
                        {showForm4_4 && (
                            <button onClick={showF4_4}> Cancel</button>)}
                    </form>

                    {showForm4_4 && (
                        <form>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <br/>
                            <button> Save</button>
                        </form>
                    )}
                </div>
                <MUIDataTable
                    title="Employee List"
                    data={datatableData}
                    columns={["Name", "Company", "City", "State"]}
                    options={{
                        filterType: "checkbox",
                    }}
                />
            </div>
            <div>
                <div>
                    <form>
                        {!showForm4_5 && (
                            <button onClick={showF4_5}> Add</button>)}
                        {showForm4_5 && (
                            <button onClick={showF4_5}> Cancel</button>)}
                    </form>

                    {showForm4_5 && (
                        <form>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <br/>
                            <button> Save</button>
                        </form>
                    )}
                </div>
                <MUIDataTable
                    title="Employee List"
                    data={datatableData}
                    columns={["Name", "Company", "City", "State"]}
                    options={{
                        filterType: "checkbox",
                    }}
                />
            </div>
            <div>
                <div>
                    <form>
                        {!showForm4_6 && (
                            <button onClick={showF4_6}> Add</button>)}
                        {showForm4_6 && (
                            <button onClick={showF4_6}> Cancel</button>)}
                    </form>

                    {showForm4_6 && (
                        <form>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <TextField style={{margin: "20px"}} id="outlined-search" label="Search field"
                                       type="search" variant="outlined"/>
                            <br/>
                            <button> Save</button>
                        </form>
                    )}
                </div>
                <MUIDataTable
                    title="Employee List"
                    data={datatableData}
                    columns={["Name", "Company", "City", "State"]}
                    options={{
                        filterType: "checkbox",
                    }}
                />
            </div>
        </div>
    );
}