import { FormEvent, useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";


export default function SearchBox() {
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('search:', value);
        navigate(`/venues?q=${value}`);
        setValue('');   
    }

  return (
    <Box component='section' sx={{paddingBlockStart: 2, paddingBlockEnd: 6, paddingInline: 4, backgroundColor: 'secondary.light', marginBlock: 4}}>
        <Box component='hgroup' sx={{marginBlockEnd: 4}}>
            <Typography component='h2' variant="h4" textAlign={'center'} marginBlock={1} >Find the perfect spot</Typography>        
            <Typography component='p' variant="subtitle1" textAlign={'center'} marginBlock={1} >Search for the perfect place to stay. It does not matter if it's for a weekend or a sebatical, we have the place for you!</Typography>        
        </Box>
        <Box component='form' onSubmit={handleSearch} sx={{maxWidth: '600px', marginInline: 'auto'}}>
            <TextField
                id="search"
                hiddenLabel={true}
                aria-label="Search for a venue"
                placeholder="Search for a venue..."
                type="search"
                variant="outlined"
                color="secondary"
                size="medium"
                fullWidth={true}
                onChange={(e) => setValue(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <IconButton type="submit">
                            <SearchIcon color="secondary"/>
                        </IconButton>
                    ),
                  }}
                />
        </Box>
    </Box>
  )
}
