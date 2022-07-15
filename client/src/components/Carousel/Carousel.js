import { PureComponent } from 'react';
import './Carousel.scss';
import Arrow from './icons/Arrow';
import { nanoid } from '@reduxjs/toolkit';


class Carousel extends PureComponent {

    state = {
        carouselOffset: 0
    }

    onImageSwitch = (type) => {
        let carouselOffset = this.state.carouselOffset;
        const imageQty = this.props.gallery.length - 1;

        if (type === 'prev') {
            if (carouselOffset > 0) {
                this.setState(({ carouselOffset }) => ({
                    carouselOffset: carouselOffset - 200
                }))
            } else if (carouselOffset === 0) {
                this.setState({ carouselOffset: imageQty * 200 })
            }
        } else if (type === 'next') {
            if (carouselOffset <= imageQty * 200 - 200) {
                this.setState(({ carouselOffset }) => ({
                    carouselOffset: carouselOffset + 200
                }))
            } else if (carouselOffset >= imageQty * 200) {
                this.setState({ carouselOffset: 0 })
            }
        }
    }


    render() {
        const { gallery } = this.props;
        const carouselOffset = this.state.carouselOffset;
        const trackWidth = gallery.length * 200;

        return (
            <div className='Carousel'>
                <ul className='Carousel__list' style={{ width: trackWidth, right: carouselOffset }}>
                    {
                        gallery.map(image => {
                            return <li key={nanoid()} className='Carousel__item'>
                                <img className='Carousel__image' src={image} alt="product" />
                            </li>
                        })
                    }
                </ul>
                {gallery.length > 1 && <div className='Carousel__switchers'>
                    <button type="button" className='Carousel__switcher' onClick={() => this.onImageSwitch('prev')}>
                        <Arrow />
                    </button>
                    <button className='Carousel__switcher Carousel__switcher-reversed' onClick={() => this.onImageSwitch('next')}>
                        <Arrow />
                    </button>
                </div>}
            </div>
        );
    }
}

export default Carousel;