import React from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { parseImageUrl } from '../notion/api'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

dayjs.extend(relativeTime)


const styles = {
  card: {
    minWidth: 400,
    padding: '1em'
  },
};


class Moment extends React.Component {
  state = {
    modalIsOpen: false,
    currentIndex: 0
  }
  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
  }

  handleImageClick = (index) => {
    this.toggleModal()
    this.setState({ currentIndex: index })
  }
  render() {
    const { modalIsOpen, currentIndex } = this.state;

    const { images, content, time, classes } = this.props
    return (
      <div style={{ margin: '0 auto', maxWidth: 400, marginTop: '10px' }}>
        <Card className={classes.card}>
          <div>
            {
              dayjs(time).fromNow()
            }
          </div>
          <div>
            {content}
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'start'
          }}>
            {
              images.map((item, index) => <div style={{ width: 120, overflow: 'hidden', maxHeight: 100, padding: 5 }}>
                <img
                  src={parseImageUrl(item.src, 120)}
                  onClick={() => this.handleImageClick(index)}
                  style={{
                    cursor: 'pointer',
                    maxWidth: '100%',
                  }}
                />
              </div>)
            }

          </div>
        </Card>

        <ModalGateway>
          {modalIsOpen ? (
            <Modal onClose={this.toggleModal}>
              <Carousel
                views={images}
                currentIndex={currentIndex}
                frameProps={{ autoSize: 'height' }}
                styles={{
                  view: base => ({
                    ...base,
                    alignItems: 'center',
                    display: 'flex ',
                    maxWidth: '400px',
                    margin: '0 auto',
                    height: '100vh',
                    justifyContent: 'center',
                  })
                }}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    );
  }
}

export default withStyles(styles)(Moment);
