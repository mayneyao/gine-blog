import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import MyLink from './my-link'

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    pageButton: {
        margin: theme.spacing.unit,
        width: 50,
    },
    input: {
        display: 'none',
    },
    buttonGroup: {
        display: 'table',
        margin: '0 auto',
    },
})

function TextButtons (props) {
    const {classes, totalCount, currentPage, pageSize} = props
    const pageCount = Math.ceil(totalCount / pageSize)
    let allPage = []
    for (let page = 1; page <= pageCount; page++) {
        allPage.push(page)
    }
    return (
        <div className={classes.buttonGroup}>
            {
                currentPage === 1 ?
                    <Button className={classes.button} disabled
                            color="primary"
                    >
                        上一页
                    </Button> :
                    <MyLink to={`page/${currentPage - 1}`}>
                        <Button className={classes.button}
                                color="primary">
                            上一页
                        </Button>
                    </MyLink>
            }
            {
                allPage.map(
                    page => (
                        <MyLink to={`page/${page}`} key={page}>
                            <Button color="secondary"
                                    className={classes.pageButton}
                                    variant={page === currentPage
                                        ? 'outlined'
                                        : 'text'}
                            >
                                {page}
                            </Button>
                        </MyLink>
                    ))
            }
            {
                currentPage === pageCount ?
                    <Button className={classes.button} color="primary" disabled>
                        下一页
                    </Button> :
                    <MyLink to={`page/${currentPage + 1}`}>
                        <Button className={classes.button} color="primary">
                            下一页
                        </Button>
                    </MyLink>
            }
        </div>
    )
}

TextButtons.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TextButtons)
