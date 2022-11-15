import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFigures} from './store/actions/figuresAction';
import { Container, Grid, FormControlLabel, Checkbox, Button, Menu, MenuItem, FormControl, Radio, RadioGroup, Slider, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';

function App() {
  const [checkedForm, setCheckedFormItems] = useState({
      circle: true,
      square: true
    });
  const [checkedColor, setCheckedColorItems] = useState({      
      green: true,
      yellow: true,
      red: true,
      blue: true
  });
  const dispatch = useDispatch();
  const figuresListData = useSelector(state => state.figuresList);
  const {loading, error, figures} = figuresListData;
  const [checkedDark, setCheckedDarkItems] = useState('all');
  const [itemsPerRow, setItemsPerRow] = useState(4);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeForm = (event) => {
    setCheckedFormItems({...checkedForm, [event.target.name] : event.target.checked });
  }
  const handleChangeColor = (event) => {
    setCheckedColorItems({...checkedColor, [event.target.name] : event.target.checked });
  }
  const handleChangeDark = (event) => {
    setCheckedDarkItems(event.target.value);
  } 
  const handleSliderChange = (event, newValue) => {
    setItemsPerRow(newValue);
  };
  useEffect(() => {
    dispatch(getFigures()) 
  }, [dispatch]);
  return (
      <Container maxWidth="sm" justify>        
        <Grid container spacing={2}>
          <Grid item>      
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MenuIcon/>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            > 
            <MenuItem>
              <Grid container direction={'column'}>
                <FormControlLabel control={
                  <Checkbox 
                    name={'green'}
                    checked={checkedColor['green']} 
                    onClick={handleChangeColor}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                } label="Зеленые" />
                <FormControlLabel control={
                  <Checkbox 
                    name={'yellow'}
                    checked={checkedColor['yellow']} 
                    onClick={handleChangeColor}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                } label="Желтые" />
                <FormControlLabel control={
                  <Checkbox 
                    name={'red'}
                    checked={checkedColor['red']} 
                    onClick={handleChangeColor}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                } label="Красные" />
                <FormControlLabel control={
                  <Checkbox 
                    name={'blue'}
                    checked={checkedColor['blue']} 
                    onClick={handleChangeColor}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                } label="Синие" />
                <FormControl>
                  <RadioGroup
                    aria-labelledby="radio-buttons-group-label"
                    defaultValue="all"
                    name="radio-buttons-group"
                    value={checkedDark}
                    onChange={handleChangeDark}
                  >
                    <FormControlLabel value="all" control={<Radio />} label="Все" />
                    <FormControlLabel value="dark" control={<Radio />} label="Темные" />
                    <FormControlLabel value="light" control={<Radio />} label="Светлые" />
                  </RadioGroup>
                </FormControl>
                <Typography id="input-slider" gutterBottom>
                  Колонок
                </Typography>
                <Slider
                    size="small"
                    aria-label="Small"
                    valueLabelDisplay="on"
                    value={itemsPerRow}
                    min={1}
                    max={4}
                    onChange={handleSliderChange}
                  />
              </Grid>
              </MenuItem>
            </Menu>
          </Grid>        
          <Grid item>
            <FormControlLabel  control={
              <Checkbox 
                name={'circle'}
                checked={checkedForm['circle']} 
                onClick={handleChangeForm}
                inputProps={{ 'aria-label': 'controlled' }}
                />
              } 
            label="Круги" />
          </Grid>
          <Grid item>    
            <FormControlLabel control={
              <Checkbox 
                name={'square'}
                checked={checkedForm['square']} 
                onClick={handleChangeForm}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            } label="Квадраты" />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {(loading && figures) ? "Loading..." : error ? error.message : figures.map((item, index) => {
            const checkItem = checkedForm[item.form] 
            && checkedColor[item.color] 
            && (checkedDark === 'all' || checkedDark === (item.dark ? 'dark' : 'light'))
            && checkedColor.hasOwnProperty(item.color)
            && checkedForm.hasOwnProperty(item.form);
            return (checkItem && 
              <Grid key={index} item justifyContent={'center'} xs={12 / itemsPerRow}>
                <div className={`figure form-${item.form} dark-${item.dark} color-${item.color}`}/>
              </Grid>
            )              
          })}
        </Grid>
      </Container>      
  );
}

export default App;
