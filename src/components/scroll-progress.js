import React, { Component } from 'react'
import ScrollProgress from 'scrollprogress'
import Slider from '@material-ui/lab/Slider'
import NavigationIcon from '@material-ui/icons/Navigation'

export default class ScrollProgressComponent extends Component {
    handleChange = (event, value) => {
        // this.setState({progress: value})
        // let to = document.body.clientHeight *
        //     this.state.progress / 100
        // console.log(to)
        // document.documentElement.scrollTop = to
    }

    constructor (props) {
        super(props)
        this.state = {
            progress: 0,
        }
    }

    componentDidMount () {
        this.progressObserver = new ScrollProgress((x, y) => {
            this.setState({progress: y * 100})
        })
    }

    componentWillUnmount () {
        this.progressObserver.destroy()
    }

    render () {
        const style = {
            height: '3px',
            position: 'fixed',
            top: '1px',
            bottom: 0,
            zIndex: 100,
        }

        return (
            <Slider
                style={style}
                value={this.state.progress}
                min={0}
                max={100}
                onChange={this.handleChange}
                onDragEnd={this.handDragEnd}
                thumb={<NavigationIcon style={{width: 32, height: 32}}/>}
            />
        )
    }
}
