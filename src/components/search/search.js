import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Axios from "axios"
import _ from 'loadsh'
import SearchResults from './searchResult'
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
    mydlg: {
        position: 'fixed',
        top: 0,
    },
    progress: {
        margin: theme.spacing.unit * 0,
    },
})

class FormDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            query: "",
            blockData: {
                recordMap: {},
                results: []
            },
            isSearchStarted: false,
            loading: false
        };
        this.searchBlog = _.debounce(this.searchBlog, 800)
    }


    onSearchChange = (e) => {
        this.setState({
            query: e.target.value,
            loading: true
        }, () => {
            const { query } = this.state
            if (query.trim().length) {
                this.searchBlog(query)
            }
        })
    }
    searchBlog = async (query) => {
        let url = `https://api.gine.me/notion/search/${query}`
        let res = await Axios.get(url)
        this.setState({
            blockData: res.data,
            isSearchStarted: true,
            loading: false
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({
            query: "",
            open: false,
            blockData: {
                recordMap: {},
                results: []
            },
            isSearchStarted: false,
            loading: false
        });
    };
    cancelSearch = () => {
        this.setState({
            query: "",
            blockData: {
                recordMap: {},
                results: []
            },
            loading: false
        });
    }
    componentDidMount() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'p' && e.metaKey) {
                e.preventDefault()
                this.handleClickOpen()
            }
        })
    }

    render() {
        const { blockData, isSearchStarted, query, loading } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <IconButton variant="outlined" onClick={this.handleClickOpen} style={{
                    position: 'fixed',
                    top: 0,
                    right: 0
                }}>
                    <SearchIcon />
                </IconButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    id="mydlg"
                    fullWidth
                >
                    <DialogContent >
                        <TextField
                            autoFocus
                            value={query}
                            margin="dense"
                            id="chromecantguess"
                            onChange={this.onSearchChange}
                            placeholder="command+p 打开搜索栏"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {loading ? <CircularProgress className={classes.progress} size={20} color="" /> : <SearchIcon />}
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={this.cancelSearch}>
                                            <CloseIcon style={{ color: "gray" }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {blockData && isSearchStarted && <SearchResults data={blockData} />}
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
export default withStyles(styles)(FormDialog);
