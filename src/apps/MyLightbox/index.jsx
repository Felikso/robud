import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import "./MyLightbox.css"

class MyLightbox extends Component {
    /*     static propTypes = {
            images: PropTypes.any,
        }; */
    constructor(props) {
        super(props)
        this.state = {
            showMyLightbox: false,
            selectedImage: 0,
        }
    }


    componentDidMount = () => {
        window.addEventListener('keyup', this.handleKeyUp, false)
    }

    componentWillUnmount = () => {
        window.removeEventListener('keyup', this.handleKeyUp, false)
    }

    handleClick = (e, index) => {
        e.preventDefault()
        const { State } = this.setState
        const { LightBox } = State.showMyLightbox
        State({ showMyLightbox: !LightBox, selectedImage: index })
    }

    closeModal = () => {
        this.setState({ showMyLightbox: false })
    }

    goBack = () => {
        const { State } = this.setState
        const { Img } = State.selectedImage
        State({ selectedImage: Img - 1 })
    }

    goForward = () => {
        const { State } = this.setState
        const { Img } = State.selectedImage
        State({ selectedImage: Img + 1 })
    }

    handleKeyUp = e => {
        e.preventDefault()
        const { State } = this.state
        const { SetState } = this.setState
        const { ThisImg } = State.selectedImage
        const { thisprop } = this.props
        const { keyCode } = e
        if (State.showMyLightbox) {
            if (keyCode === 37) {
                // Left Arrow Key
                if (ThisImg > 0) {
                    SetState({ selectedImage: ThisImg - 1 })
                }
            }
            if (keyCode === 39) {
                // Right Arrow Key



                if (ThisImg < thisprop.images.length - 1) {
                    SetState({ selectedImage: ThisImg + 1 })
                }
            }
            if (keyCode === 27) {
                // Escape key
                SetState({ showMyLightbox: false })
            }
        }
    }

    render() {
        const { images } = this.props
        const { showMyLightbox, selectedImage } = this.state
        return (
            <>
                <div className="gallery">
                    {images.map((img, i) => (
                        <div className="gallery-item " key={img.node.id}>
                            <a href={img.node.childImageSharp.gatsbyImageData.images.fallback.src} alt="Car Image" onClick={e => this.handleClick(e, i)}>
                                <GatsbyImage className="styled-image" image={img.node.childImageSharp.gatsbyImageData} />
                            </a>
                        </div>
                    ))}
                </div>

                <a role="button" tabIndex="0" styling="link" className="lightbox-modal" visible={showMyLightbox}
                    css={`
                opacity: ${props => (props.visible ? '1' : '0')};
                visibility: ${props => (props.visible ? 'visible' : 'hidden')};
                `}
                    onKeyUp={e => this.handleKeyDown(e)}>
                    <div className="lightbox-content">

                        {/* <GatsbyImage image={images[selectedImage].childImageSharp.gatsbyImageData} /> */}
                        <div className="controls">
                            <button type="button" onClick={this.closeModal}>Close</button>
                            <div className="left-right">
                                <button type="button" onClick={this.goBack} disabled={selectedImage === 0}>
                                    Previous
                                </button>
                                <button type="button" onClick={this.goForward} disabled={selectedImage === images.length - 1}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </a>
            </>
        )
    }
}

/* const StyledImg = styled(Img)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  height: 100%; // or whatever
  & > img {
    object-fit: cover !important; // or whatever
    object-position: 0% 0% !important; // or whatever
  }
`

const Gallery = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 1100px) {
    grid-template-columns: repeat(5, 1fr);
  }
  grid-gap: 15px;
  .gatsby-image-outer-wrapper {
    height: 100%;
  }
`

const GalleryItem = styled.div`
  position: relative;
`

const Button = styled.button``

const MyLightboxModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => (props.visible ? '1' : '0')};
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`
const MyLightboxContent = styled.div`
  margin: 15px;
  max-width: 700px;
  width: 100%;
`

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
`

const LeftRight = styled.div`
  button:first-child {
    margin-right: 10px;
  }
` */

MyLightbox.propTypes = {
    images: PropTypes.array.isRequired,
    thisprop: PropTypes.any,
}

MyLightbox.defaultProps = {
    thisprop: null,
}

export default MyLightbox