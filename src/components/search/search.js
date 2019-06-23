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
import config from '../../../config'
import notion from '../../notion/api'


const styles = theme => ({
    mydlg: {
        position: 'absolute',
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
        // 需要搭配后端 api 使用。构造自己的 url 格式
        const { getUrlBloackId, getFullBlockId } = notion
        const tableID = getFullBlockId(getUrlBloackId(config.blog.url))
        let url = `${config.blog.search.api}?table=${tableID}&query=${query}`
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
            <>
                <IconButton
                    color="inherit"
                    aria-label="Search"
                    variant="outlined"
                    onClick={this.handleClickOpen}
                    style={{
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
            </>
        );
    }
}
export default withStyles(styles)(FormDialog);
