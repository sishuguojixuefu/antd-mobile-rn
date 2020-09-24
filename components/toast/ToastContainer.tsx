import React from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import Icon, { IconNames } from '../icon';
import { WithTheme, WithThemeStyles } from '../style';
import ToastStyles, { ToastStyle } from './style/index';

export interface ToastProps extends WithThemeStyles<ToastStyle> {
  content: string;
  duration?: number;
  onClose?: () => void;
  mask?: boolean;
  type?: string;
  onAnimationEnd?: () => void;
}

export default class ToastContainer extends React.Component<ToastProps, any> {
  static defaultProps = {
    duration: 3,
    mask: true,
    onClose() {
    },
  };

  anim: Animated.CompositeAnimation | null;
  private spinValue: Animated.Value;

  constructor(props: ToastProps) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
    };
    this.spinValue = new Animated.Value(0);
  }

  spin = () => {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1, // 最终值 为1，这里表示最大旋转 360度
      duration: 800,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(this.spin);
  };

  componentDidMount() {
    const { onClose, onAnimationEnd, type } = this.props;
    const duration = this.props.duration as number;
    const timing = Animated.timing;
    if (this.anim) {
      this.anim = null;
    }
    if (type === 'loading') {
      this.spin();
    }

    const animArr = [
      timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(duration * 1000),
    ];
    if (duration > 0) {
      animArr.push(
        timing(this.state.fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      );
    }
    this.anim = Animated.sequence(animArr);
    this.anim.start(() => {
      if (duration > 0) {
        this.anim = null;
        if (onClose) {
          onClose();
        }
        if (onAnimationEnd) {
          onAnimationEnd();
        }
      }
    });
  }

  componentWillUnmount() {
    if (this.anim) {
      this.anim.stop();
      this.anim = null;
    }
    if (this.spinValue) {
      this.spinValue.stopAnimation();
    }
  }

  render() {
    const { type = '', content, mask } = this.props;
    return (
      <WithTheme styles={this.props.styles} themeStyles={ToastStyles}>
        {styles => {
          const iconType: {
            [key: string]: IconNames;
          } = {
            success: 'check-circle',
            fail: 'close-circle',
            offline: 'frown',
          };

          let iconDom: React.ReactElement<any> | null = null;
          if (type === 'loading') {
            const spin = this.spinValue.interpolate({
              inputRange: [0, 1], // 输入值
              outputRange: ['0deg', '360deg'], // 输出值
            });
            return <View
              style={[styles.container]}
              pointerEvents={mask ? undefined : 'box-none'}
            >
              <View style={[styles.innerContainer]}>
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <Icon name="loading" size={30} color="#5E83FF" />
                </Animated.View>
              </View>
            </View>;
          } else if (type === 'info') {
            iconDom = null;
          } else {
            iconDom = (
              <Icon
                name={iconType[type]}
                style={styles.image}
                color="white"
                size={36}
              />
            );
          }

          return (
            <View
              style={[styles.container]}
              pointerEvents={mask ? undefined : 'box-none'}
            >
              <View style={[styles.innerContainer]}>
                <Animated.View style={{ opacity: this.state.fadeAnim }}>
                  <View
                    style={[
                      styles.innerWrap,
                      iconDom ? styles.iconToast : styles.textToast,
                    ]}
                  >
                    {iconDom}
                    <Text style={styles.content}>{content}</Text>
                  </View>
                </Animated.View>
              </View>
            </View>
          );
        }}
      </WithTheme>
    );
  }
}
