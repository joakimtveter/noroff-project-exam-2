import { FormEvent, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchField(): ReactElement {
    const navigate = useNavigate()
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        console.log(e)
        const term = new FormData(e.target as HTMLFormElement).get('search')?.toString() ?? ''
        navigate(`/venues?q=${encodeURIComponent(term)}`)
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                name="search"
                color={'primary'}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize={'large'} color={'primary'} />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    )
}
