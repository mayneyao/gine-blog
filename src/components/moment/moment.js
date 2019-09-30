import React from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { parseImageUrl } from 'notabase/src/utils'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Card from '../mui-override/Card';
import MomentMusicCard from './music'

dayjs.extend(relativeTime)


class Moment extends React.Component {
  state = {
    modalIsOpen: false,
    currentIndex: 0
  }
  formatItems = (images) => {
    return images.map(item => {
      if (item) {
        return { src: parseImageUrl(item) }
      }
    })
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
    const { data: { images, content, created_time, link, type } } = this.props
    let plink = undefined
    let parseImages = this.formatItems(images || [])

    if (link) {
      try {
        let l = new URL(link)
        plink = l.origin
      } catch (error) {
        console.log("错误的链接")
      }
    }
    return (
      <div style={{ margin: '0 auto', maxWidth: 400, marginTop: '10px' }} >
        <Card style={{
          minWidth: 400,
          padding: '1em'
        }}>
          <div>
            {
              dayjs(created_time).fromNow()
            }
          </div>
          <div>
            {content}
          </div>
          <div>
            {plink && <a href={link} target="_blank">{plink}</a>}
          </div>
          <div>
            {
              type === 'music' && <MomentMusicCard link={link} />
            }
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'start'
          }}>
            {
              parseImages.map((item, index) => <div style={{ width: 120, overflow: 'hidden', maxHeight: 100, padding: 5 }} key={item.src}>
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
                views={parseImages}
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

export default Moment;