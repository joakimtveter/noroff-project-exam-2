import { FormEvent, useState } from "react";
import { Autocomplete, Box, CircularProgress, IconButton, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useGetVenuesQuery } from "@/services/holidaze";


export default function SearchBox() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetVenuesQuery()

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        <Autocomplete
            options={data?.map((option) => {return {label: option.name, id: option.id}}) || []}
            loading={isLoading}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={(_e, value) => {
                navigate(`/venues/${value?.id}`);
            }}
            renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    {option.label}
                  </li>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    aria-label="Search for a venue"
                    placeholder="Search for a venue..."
                    type="search"
                    variant="outlined"
                    color="secondary"
                    size="medium"
                    onChange={(e) => setValue(e.target.value)}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <IconButton type="submit">
                                {isLoading && <CircularProgress size={24} color="secondary" /> }
                                 <SearchIcon color="secondary" />
                            </IconButton>
                        ),
                    }}
                    fullWidth
                    hiddenLabel
                />
            )}
        />
    </Box>
    {error && <Typography color="error">Error loading data. Please try again later.</Typography>}
</Box>
  )
}
