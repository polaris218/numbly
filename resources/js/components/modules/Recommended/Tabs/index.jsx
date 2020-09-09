import React from 'react';
import classNames from 'classnames';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Item from './Item';
import TabPanner from '../helpers/panTabs';

class Tabs extends React.Component {
    state = {
        centered: false
    }

    componentDidMount() {
        const { wrap } = this;
        disableBodyScroll(wrap);
        wrap.addEventListener('scroll', this.onScroll);
        this.panner = new TabPanner(wrap);
    }
    
    componentWillUnmount() {
        const { wrap } = this;
        enableBodyScroll(wrap);
        wrap.removeEventListener('scroll', this.onScroll);
    }
    
    componentDidUpdate() {
        this.alignTabs();
    }

    alignTabs = () => {
        const { centered } = this.state;
        const { children, offsetWidth } = this.wrap;
        const childrenArray = Array.from(children);
        const contentWidth = childrenArray.reduce((total, current) => {
            return total += current.offsetWidth;
        }, 0);
        if (contentWidth < offsetWidth && !centered) {
            this.setState({
                centered: true
            });
            return;
        }
        if (contentWidth >= offsetWidth && centered) {
            this.setState({
                centered: false
            });
            return;
        }
    }

    onScroll = e => {
        e.stopPropagation();
    }

    onChange = hashtag => e => {
        const { onChange } = this.props;
        onChange(hashtag);
    }

    render() {
        const { centered } = this.state;
        const { hashtags, currentHashtag } = this.props;
        const wrapStyle = classNames({
            'recommended-tab-wrap': true,
            'recommended-tab-wrap--centered': centered
        });

        return (
            <div 
                className={ wrapStyle } 
                ref={ ref => this.wrap = ref }
            >
            {
                hashtags && hashtags.map((val, idx) => (
                    <Item 
                        key={ idx } 
                        text={ val.name } 
                        active={ currentHashtag === val.name } 
                        onClick={ this.onChange(val.name) }
                    />
                ))
            }
            </div>
        );
    }
}

export default Tabs;