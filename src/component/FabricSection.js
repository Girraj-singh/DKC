import React, { useEffect, useState } from 'react';
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

const fabricNamedata = ['BAG VOILE', 'WISTERIA VOLIE', 'SHEETING', 'WINDOWPANE GAUZ', 'FP001', 'WAFFEL'];
const processOptions = ['DYEING', 'MOCK UP', 'PRINTING','LACES','SHIFFLY','WASHING'];
const stageOptions = ['FOB', 'TOP', 'PURCHASE','SUBMISSION','BULK','FABRIC AUDIT','PRODUCTION','WEB','SIZE SET'];

const FabricSection = (props) => {
    const [fabricSections, setFabricSections] = useState([
        {
            fabricname: [],
            perPieceRequirement: '',
            unit: 'M',
            process: [],
            stage: [],
            colors: [{ colorName: '', quantity: '' }],
        },
    ]);

    // console.log(fabricSections);

    // Handle field change
    const handleChange = (index, field, value) => {
        const updatedSections = [...fabricSections];
        updatedSections[index][field] = value;
        setFabricSections(updatedSections);
    };

    // Handle color change
    const handleColorChange = (sectionIndex, colorIndex, field, value) => {
        const updatedSections = [...fabricSections];
        updatedSections[sectionIndex].colors[colorIndex][field] = value;
        setFabricSections(updatedSections);
    };

    // Add new section
    const handleAddSection = () => {
        setFabricSections([
            ...fabricSections,
            {
                fabricname: [],
                perPieceRequirement: '',
                unit: 'M',
                process: [],
                stage: [],
                colors: [{ colorName: '', quantity: '' }],
            },
        ]);
    };

    // Remove section
    const handleRemoveSection = (index) => {
        const updatedSections = [...fabricSections];
        updatedSections.splice(index, 1);
        setFabricSections(updatedSections);
    };

    // Add new color
    const handleAddColor = (index) => {
        const updatedSections = [...fabricSections];
        updatedSections[index].colors.push({ colorName: '', quantity: '' });
        setFabricSections(updatedSections);
    };

    // Remove color
    const handleRemoveColor = (sectionIndex, colorIndex) => {
        const updatedSections = [...fabricSections];
        updatedSections[sectionIndex].colors.splice(colorIndex, 1);
        setFabricSections(updatedSections);
    };
    useEffect(() => {
        // console.log(fabricSections);
        const timeout = setTimeout(() => {
            props?.addData(fabricSections);
          }, 400); // Delay in milliseconds
        
          return () => clearTimeout(timeout);

    }, [fabricSections]);

    return (    
        <>
            {fabricSections.map((section, sectionIndex) => (
                <Grid
                    container
                    spacing={2}
                    key={sectionIndex}
                    sx={{ marginBottom: 4, padding: 3,margin:2, borderRadius: 5, border: '1px solid black',backgroundColor:'white',width:'97%' }}
                >
                    {/* Fabric Name */}
                    <Grid item xs={6} md={6}>
                        <Autocomplete
                            multiple
                            options={fabricNamedata}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            value={section.fabricname}
                            onChange={(event, value) => handleChange(sectionIndex, 'fabricname', value)}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} size="small" />
                                    {option}
                                </li>
                            )}
                            renderInput={(params) => <TextField {...params} label="Fabric Name" size="small" />}
                        />
                    </Grid>

                    {/* Per Piece Requirement */}
                    <Grid item xs={6} md={3}>
                        <TextField
                            label="Per Piece Requirement"
                            size="small"
                            fullWidth
                            value={section.perPieceRequirement}
                            onChange={(e) => handleChange(sectionIndex, 'perPieceRequirement', e.target.value)}
                        />
                    </Grid>

                    {/* Unit */}
                    <Grid item xs={6} md={3}>
                        <FormLabel>Choose Unit</FormLabel>
                        <RadioGroup
                            row
                            value={section.unit}
                            onChange={(e) => handleChange(sectionIndex, 'unit', e.target.value)}
                            size="small"
                        >
                            <FormControlLabel value="M" control={<Radio />} label="M"  size="small"/>
                            <FormControlLabel value="Kg" control={<Radio />} label="Kg" size="small"/>
                        </RadioGroup>
                    </Grid>

                    {/* Processes */}
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            multiple
                            options={processOptions}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            value={section.process}
                            onChange={(event, value) => handleChange(sectionIndex, 'process', value)}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
                                    {option}
                                </li>
                            )}
                            renderInput={(params) => <TextField {...params} label="Processes" size="small" />}
                        />
                    </Grid>

                    {/* Color and Quantity */}
                    <Grid item xs={12}>
                        <Typography variant="body1">Color and Quantity:</Typography>
                        {section.colors.map((color, colorIndex) => (
                            <Grid container spacing={2} key={colorIndex} sx={{ marginBottom: 2 }}>
                                <Grid item xs={5}>
                                    <TextField
                                        label="Color"
                                        size="small"
                                        fullWidth
                                        value={color.colorName}
                                        onChange={(e) =>
                                            handleColorChange(sectionIndex, colorIndex, 'colorName', e.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        label="Quantity"
                                        size="small"
                                        fullWidth
                                        value={color.quantity}
                                        onChange={(e) =>
                                            handleColorChange(sectionIndex, colorIndex, 'quantity', e.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    {section.colors.length > 1  && (
                                         <IconButton onClick={() => handleRemoveColor(sectionIndex, colorIndex)}>
                                        <RemoveIcon />
                                    </IconButton>
                                    )}
                                   
                                    {colorIndex === section.colors.length - 1 && (
                                        <IconButton onClick={() => handleAddColor(sectionIndex)}>
                                            <AddIcon />
                                        </IconButton>
                                    )}
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Stages to Be Skipped */}
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            multiple
                            options={stageOptions}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            value={section.stage}
                            onChange={(event, value) => handleChange(sectionIndex, 'stage', value)}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
                                    {option}
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} label="Stages to Be Skipped" size="small" />
                            )}
                        />
                    </Grid>

                    {/* Remove Section */}
                    <Grid item xs={12}>
                        {fabricSections.length > 1 && (
                            <Button variant="outlined" color="error" onClick={() => handleRemoveSection(sectionIndex)}>
                                Remove Fabric Section
                            </Button>
                        )}
                    </Grid>
                </Grid>
            ))}

            {/* Add More Fabric Section */}
            <div style={{display:"flex",justifyContent:"end"}}>
                  <Button variant="contained" color="success" onClick={handleAddSection} >
                Add More Fabrics
            </Button>
            </div>
          
        </>
    );
};

export default React.memo(FabricSection); 
