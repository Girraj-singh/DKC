import React, { useState } from 'react'
import FabricSection from './FabricSection';
import {
    Grid,
    TextField,
    Checkbox,
    Autocomplete,
    Button,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    IconButton,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const chinaFabric = ['BAG VOILE', 'WISTERIA VOLIE', 'SHEETING', 'WINDOWPANE GAUZ', 'FP001', 'WAFFEL'];
const majorFabric = ['BAG VOILE', 'WISTERIA VOLIE', 'SHEETING', 'WINDOWPANE GAUZ', 'FP001', 'WAFFEL'];
const TRIMS = ['LABEL COPPER', 'TAG', 'STICKER', 'POLY BAG', 'STITCHING THREAD'];
const ACCESORIES = ['WASHCARE LABEL', 'PRICE TAG', 'SIZE LABEL', ' BUTTON', 'ZIP', 'HOOK'];
const today = new Date().toISOString().split('T')[0];

const DkcForm = () => {
    const [open, setOpen] = useState(false);
    const [dkcFormData, setDkcFormData] = useState({startdate:today,enddate:today,productionPerDayPerMachine:'',totalOrderQuantity:'',fabricsection:[],chinaF:[],majorfabric:[],trims:[],accesories:[]});
  


    // console.log('vbvbnbv',dkcFormData);

   const handleChange = (field, value) => {
        // const { name, value } = event.target;
        setDkcFormData({ ...dkcFormData, [field]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data', dkcFormData);
    };



    return (
        <div style={{ border: "1px solid black", padding: "5px", borderRadius: "5px" }}>
            <h3>T&A DATA SUBMISSION FORM</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <Grid container rowSpacing={2} columnSpacing={2} direction={{ xs: "column", sm: "column", md: "row" }} >
                        <Grid item xs={3}>
                            <TextField
                                label="Start Date"
                                size='small'
                                type='date'
                                name="startdate"
                                value={dkcFormData.startdate}
                                defaultValue={today}
                                fullWidth
                                onChange={(event) =>handleChange('startdate', event.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />

                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="End Date"
                                size='small'
                                type='date'
                                name="enddate"
                                value={dkcFormData.enddate}
                                defaultValue={today}
                                fullWidth
                                onChange={(event) =>handleChange('enddate', event.target.value)}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Production Per Day Per Machine"
                                size='small'
                                type='number'
                                name="productionPerDayPerMachine"
                                value={dkcFormData.productionPerDayPerMachine}
                                onChange={(event) =>handleChange('productionPerDayPerMachine', event.target.value)}
                                fullWidth
                            // InputLabelProps={{shrink:true}}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="Total Order Quantity"
                                size='small'
                                type='number'
                                name="totalOrderQuantity"
                                value={dkcFormData.totalOrderQuantity}
                                onChange={(event) =>handleChange('totalOrderQuantity', event.target.value)}
                                fullWidth
                            // InputLabelProps={{shrink:true}}
                            />
                        </Grid>

                    </Grid>
                    <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: '10px' }}>Fabric Section</div>
                    <div style={{ backgroundColor: "#D7D3BF", padding: "5px", margin: "5px", borderRadius: '5px' ,marginBottom:'10px'}}>
                        <FabricSection  addData={(event) => handleChange('fabricsection', event)} />
                    </div>
                    <Grid container rowSpacing={2} columnSpacing={2} direction={{ xs: "column", sm: "column", md: "row" }} >
                        <Grid item xs={6} md={3} >
                            <FormLabel>Is China Fabric Present ?</FormLabel>
                            <RadioGroup
                                row
                                value={open}
                                onChange={() =>{setOpen(!open)}}
                                size="small"
                            >
                                <FormControlLabel value={false} control={<Radio />} label="NO" size="small" />
                                <FormControlLabel value={true} control={<Radio />} label="YES" size="small" />
                            </RadioGroup>
                        </Grid>
                            {/* China Fabric */}
                        <Grid item xs={6} md={4} style={{display:open?"":"none"}}>
                        <Autocomplete
                            multiple
                            options={chinaFabric}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            value={dkcFormData.chinaF}
                            onChange={(event, value) => handleChange('chinaF', value)}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
                                    {option}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} label="China Fabric" placeholder="Select china fabric" size="small" />
                            )}
                        />
                        </Grid>
                    
                     
                        {/* major Fabric */}
                        <Grid item xs={6} md={4} >
                        <Autocomplete
                            multiple
                            options={majorFabric}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            value={dkcFormData.majorfabric}
                            onChange={(event, value) => handleChange('majorfabric', value)}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
                                    {option}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} label="Major Fabric" placeholder="Select major fabric" size="small" />
                            )}
                        />
                        </Grid>
                        {/* trims */}
                        <Grid item xs={6} md={4} >
                        <Autocomplete
                            multiple
                            options={TRIMS}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            value={dkcFormData.trims}
                            onChange={(event, value) => handleChange('trims', value)}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
                                    {option}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} label="TRIMS" placeholder="Select TRIMS" size="small" />
                            )}
                        />
                        </Grid>
                        {/* ACCESORIES */}
                        <Grid item xs={6} md={4} >
                        <Autocomplete
                            multiple
                            options={ACCESORIES}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            value={dkcFormData.accesories}
                            onChange={(event, value) => handleChange('accesories', value)}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
                                    {option}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} label="Accesories" placeholder="Select accesories" size="small" />
                            )}
                        />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Button type="submit" variant="contained" size="medium" fullWidth>submit</Button>
                        </Grid>
                    </Grid>

                </div>



            </form>
        </div>
    )
}

export default DkcForm