import React from 'react';
import classNames from 'classnames';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
  
class Banisher extends React.Component {
    state = {
        targetRef: React.createRef()
    }
 
    componentDidMount() {
        const { targetRef } = this.state;
        // 3. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav). 
        // Specifically, the target element is the one we would like to allow scroll on (NOT a parent of that element).
        // This is also the element to apply the CSS '-webkit-overflow-scrolling: touch;' if desired.
        const targetElement = targetRef.current; 
        disableBodyScroll(targetElement);
        targetElement.addEventListener('scroll', this.onScroll);
    }
    
    componentWillUnmount() {
        const { targetRef } = this.state;
        const targetElement = targetRef.current; 
        enableBodyScroll(targetElement);
        targetElement.removeEventListener('scroll', this.onScroll);
    }

    onScroll = e => {
        e.stopPropagation();
    }
    
    render() {  
        const { targetRef } = this.state;
        const { children, fullScreen = false, classes = '' } = this.props;
        const style = classNames({
            'scrollable': true,
            'scrollable--default': !fullScreen,
            'scrollable--full': fullScreen,
            [classes]: true
        });
        return (
            <div className={ style } ref={ targetRef }>
                { children }
            </div> 
        );
    }
}

export default Banisher;